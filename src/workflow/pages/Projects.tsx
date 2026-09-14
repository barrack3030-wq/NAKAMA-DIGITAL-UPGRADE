import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Search,
  Plus,
  Trash2,
  Edit,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Project } from '../lib/workflowTypes';
import { getProjects, deleteProject } from '../lib/workflowApi';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Delete modal state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [statusFilter]);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjects(search, statusFilter);
      setProjects(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load projects.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProjects();
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      await loadProjects();
    } catch (err: any) {
      alert(`Error deleting project: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Projects
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track website deliverables, workflow progress, and live deployments
          </p>
        </div>
        <Link
          to="/workflow/projects/new"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, client, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </form>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 shrink-0">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Discovery">Discovery</option>
            <option value="Assets">Assets</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="SEO">SEO</option>
            <option value="Deployment">Deployment</option>
            <option value="Waiting Client">Waiting Client</option>
            <option value="Revision">Revision</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState message="Loading projects and checklists..." />
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
          {error}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            search
              ? 'No website projects matched your criteria.'
              : 'Create a project to start the production workflow.'
          }
          icon={FolderKanban}
          actionText={search ? 'Clear Search' : 'Create Project'}
          onActionClick={search ? () => { setSearch(''); loadProjects(); } : undefined}
          actionHref={search ? undefined : '/workflow/projects/new'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const totalTasks = project.tasks_count || 0;
            const completedTasks = project.completed_tasks_count || 0;

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Status & Priority Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <StatusBadge status={project.status} size="sm" />
                    <StatusBadge priority={project.priority} size="sm" />
                  </div>

                  {/* Project Title */}
                  <Link
                    to={`/workflow/projects/${project.id}`}
                    className="block text-base font-semibold text-slate-900 group-hover:text-brand-600 transition-colors"
                  >
                    {project.project_name}
                  </Link>

                  {/* Client name */}
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    Client:{' '}
                    <span className="text-slate-800 font-medium">
                      {project.customer?.business_name || project.customer?.customer_name || 'Direct'}
                    </span>
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <ProgressBar
                      completed={completedTasks}
                      total={totalTasks}
                      size="sm"
                      showFraction={true}
                    />
                  </div>
                </div>

                {/* Footer details */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.deadline || 'No deadline'}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/workflow/projects/${project.id}?edit=true`}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit project settings"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProjectToDelete(project)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to={`/workflow/projects/${project.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors ml-1"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Project Modal */}
      <ConfirmDialog
        isOpen={Boolean(projectToDelete)}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.project_name}"? All associated workflow tasks and production notes will be permanently erased.`}
        confirmText="Delete Project"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
}
