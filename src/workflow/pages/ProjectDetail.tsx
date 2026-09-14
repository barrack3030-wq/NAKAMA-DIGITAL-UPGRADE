import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Clock,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Globe,
  Plus,
  Send,
  Calendar,
  AlertCircle,
  FileText,
  User,
  MessageSquare,
  Check
} from 'lucide-react';
import {
  getProject,
  updateProject,
  deleteProject,
  getWorkflowTasks,
  updateWorkflowTask,
  getProjectNotes,
  createProjectNote,
  deleteProjectNote
} from '../lib/workflowApi';
import {
  Project,
  Customer,
  WorkflowTask,
  ProjectNote,
  ProjectStatus,
  DEFAULT_WORKFLOW_PHASES
} from '../lib/workflowTypes';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { LoadingState } from '../components/LoadingState';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [notes, setNotes] = useState<ProjectNote[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Note state
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Collapsible phases (default all expanded or first 4 expanded)
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (id) {
      loadAllProjectData(id);
    }
  }, [id]);

  const loadAllProjectData = async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [projRes, tasksRes, notesRes] = await Promise.all([
        getProject(projectId),
        getWorkflowTasks(projectId),
        getProjectNotes(projectId)
      ]);

      setProject(projRes.project);
      setCustomer(projRes.customer);
      setTasks(tasksRes);
      setNotes(notesRes);

      // Expand all phases by default
      const expanded: Record<string, boolean> = {};
      DEFAULT_WORKFLOW_PHASES.forEach((p) => {
        expanded[p.phase] = true;
      });
      setExpandedPhases(expanded);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load project details.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };

  // Instant status change
  const handleStatusChange = async (newStatus: ProjectStatus) => {
    if (!project || !id) return;
    try {
      const updated = await updateProject(id, { status: newStatus });
      setProject((prev) => (prev ? { ...prev, status: updated.status } : null));
    } catch (err: any) {
      alert(`Could not update status: ${err.message}`);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = async (task: WorkflowTask) => {
    const nextCompleted = !task.completed;
    const completedAt = nextCompleted ? new Date().toISOString() : null;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, completed: nextCompleted, completed_at: completedAt }
          : t
      )
    );

    try {
      await updateWorkflowTask(task.id, {
        completed: nextCompleted,
        completed_at: completedAt
      });
    } catch (err: any) {
      console.error(err);
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
      alert(`Error updating task: ${err.message}`);
    }
  };

  // Add Task Note inline
  const handleUpdateTaskNote = async (task: WorkflowTask, noteContent: string) => {
    try {
      await updateWorkflowTask(task.id, { notes: noteContent });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, notes: noteContent } : t))
      );
    } catch (err: any) {
      alert(`Error saving task note: ${err.message}`);
    }
  };

  // Add Project Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !id) return;

    setIsSubmittingNote(true);
    try {
      const newNote = await createProjectNote(id, newNoteContent.trim());
      setNotes((prev) => [newNote, ...prev]);
      setNewNoteContent('');
    } catch (err: any) {
      alert(`Could not save note: ${err.message}`);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteProjectNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err: any) {
      alert(`Could not delete note: ${err.message}`);
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteProject(id);
      navigate('/workflow/projects');
    } catch (err: any) {
      alert(`Failed to delete project: ${err.message}`);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading workflow tasks & project data..." />;
  }

  if (error || !project) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-rose-600 mb-4">{error || 'Project not found.'}</p>
        <Link
          to="/workflow/projects"
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  // Group tasks by phase
  const tasksByPhase: Record<string, WorkflowTask[]> = {};
  DEFAULT_WORKFLOW_PHASES.forEach((p) => {
    tasksByPhase[p.phase] = [];
  });
  tasks.forEach((t) => {
    if (!tasksByPhase[t.phase]) {
      tasksByPhase[t.phase] = [];
    }
    tasksByPhase[t.phase].push(t);
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/workflow/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          {project.preview_url && (
            <a
              href={project.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Preview</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
          {project.production_url && (
            <a
              href={project.production_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-2xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Production</span>
              <ExternalLink className="w-3 h-3 text-emerald-500" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-600" />
              <span>GitHub</span>
            </a>
          )}
          <Link
            to={`/workflow/projects/${project.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit</span>
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Project Overview Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {project.project_name}
              </h1>
              <StatusBadge priority={project.priority} size="md" />
            </div>

            {/* Customer name (clickable) */}
            {customer && (
              <p className="text-sm font-medium text-slate-600 mt-1.5 flex items-center gap-1.5">
                <span>Client:</span>
                <Link
                  to={`/workflow/customers/${customer.id}`}
                  className="font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{customer.business_name} ({customer.customer_name})</span>
                </Link>
              </p>
            )}

            <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span>{project.project_type}</span>
              {project.domain && (
                <>
                  <span>•</span>
                  <span className="font-mono text-slate-700">{project.domain}</span>
                </>
              )}
              {project.deadline && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target: {project.deadline}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick status dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              Current Status:
            </span>
            <select
              value={project.status}
              onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer shadow-2xs"
            >
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

        {/* Large Workflow Progress Bar */}
        <div className="pt-6 border-t border-slate-100">
          <ProgressBar
            completed={completedTasks}
            total={totalTasks}
            size="lg"
            showFraction={true}
          />
        </div>
      </div>

      {/* Main Grid: Workflow Checklist (Left) & Project Notes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Workflow Checklist: 11 Phases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-slate-900">
              Workflow Checklist
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const allOpen: Record<string, boolean> = {};
                  DEFAULT_WORKFLOW_PHASES.forEach((p) => { allOpen[p.phase] = true; });
                  setExpandedPhases(allOpen);
                }}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-800"
              >
                Expand all
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => setExpandedPhases({})}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-800"
              >
                Collapse all
              </button>
            </div>
          </div>

          {DEFAULT_WORKFLOW_PHASES.map((phaseDef) => {
            const phaseTasks = tasksByPhase[phaseDef.phase] || [];
            const isExpanded = Boolean(expandedPhases[phaseDef.phase]);
            const completedCount = phaseTasks.filter((t) => t.completed).length;
            const isPhaseComplete = phaseTasks.length > 0 && completedCount === phaseTasks.length;

            return (
              <div
                key={phaseDef.phase}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                {/* Phase Accordion Header */}
                <button
                  type="button"
                  onClick={() => togglePhase(phaseDef.phase)}
                  className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/60 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isPhaseComplete
                          ? 'bg-emerald-500 text-white'
                          : completedCount > 0
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPhaseComplete ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span>{completedCount}</span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900">
                      {phaseDef.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        isPhaseComplete
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {completedCount} / {phaseTasks.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Phase Tasks List */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100">
                    {phaseTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 transition-colors flex items-start justify-between gap-3 group ${
                          task.completed ? 'bg-slate-50/30' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggleTask(task)}
                            className="mt-0.5 shrink-0 text-slate-400 hover:text-brand-600 transition-colors cursor-pointer"
                            aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <span
                              onClick={() => handleToggleTask(task)}
                              className={`text-xs sm:text-sm cursor-pointer select-none ${
                                task.completed
                                  ? 'line-through text-slate-400 font-normal'
                                  : 'text-slate-800 font-medium'
                              }`}
                            >
                              {task.title}
                            </span>

                            {/* Timestamp */}
                            {task.completed && task.completed_at && (
                              <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  Done {new Date(task.completed_at).toLocaleString([], {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </p>
                            )}

                            {/* Inline Note for task */}
                            <div className="mt-2">
                              <input
                                type="text"
                                placeholder="Add notes for this task..."
                                defaultValue={task.notes || ''}
                                onBlur={(e) => {
                                  if (e.target.value !== (task.notes || '')) {
                                    handleUpdateTaskNote(task, e.target.value);
                                  }
                                }}
                                className="w-full text-xs text-slate-600 bg-transparent placeholder:text-slate-300 border-b border-transparent focus:border-slate-300 focus:bg-slate-50/70 focus:outline-none px-1 py-0.5 rounded transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Notes Section (Right Column) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <span>Project Notes</span>
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Log client requests, design discussions, and revision logs.
            </p>

            {/* Note form */}
            <form onSubmit={handleAddNote} className="space-y-3 mb-6">
              <textarea
                rows={3}
                required
                placeholder="Write a project note or revision requirement..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmittingNote || !newNoteContent.trim()}
                className="w-full py-2 px-3 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmittingNote ? 'Saving...' : 'Add Note'}</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No notes recorded for this project yet.
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5 relative group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-600">
                        {note.created_by || 'Team'}
                      </span>
                      <span>
                        {new Date(note.created_at || '').toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {note.content}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-300 hover:text-rose-600 p-1 transition-colors self-end text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Project Technical Quick Specs */}
          {project.notes && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Project Scope Specification
              </h3>
              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {project.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Project Modal */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.project_name}"? All 69 workflow checklist tasks and notes will be permanently erased.`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteProject}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
