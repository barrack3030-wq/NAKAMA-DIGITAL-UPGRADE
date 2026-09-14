import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  FolderKanban,
  Check
} from 'lucide-react';
import { getAllTasks, updateWorkflowTask } from '../lib/workflowApi';
import { WorkflowTask } from '../lib/workflowTypes';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function Tasks() {
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'overdue' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [activeTab]);

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllTasks(activeTab);
      setTasks(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load task list.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (task: WorkflowTask) => {
    const nextCompleted = !task.completed;
    const completedAt = nextCompleted ? new Date().toISOString() : null;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: nextCompleted, completed_at: completedAt } : t
      )
    );

    try {
      await updateWorkflowTask(task.id, {
        completed: nextCompleted,
        completed_at: completedAt
      });
    } catch (err: any) {
      console.error(err);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      alert(`Could not update task: ${err.message}`);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(s) ||
      t.phase.toLowerCase().includes(s) ||
      (t.project?.project_name && t.project.project_name.toLowerCase().includes(s)) ||
      (t.project?.customer?.business_name &&
        t.project.customer.business_name.toLowerCase().includes(s))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tasks
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global production checklist across all active website projects
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Pending
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'today'
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Due Today
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('overdue')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'overdue'
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overdue
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks, phases or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <LoadingState message="Loading tasks overview..." />
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
          {error}
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={
            search
              ? 'No workflow checklist items matched your search query.'
              : 'There are no tasks in this view.'
          }
          icon={CheckSquare}
          actionText="View Projects"
          actionHref="/workflow/projects"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors ${
                task.completed ? 'bg-slate-50/30' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggleTask(task)}
                  className="mt-0.5 text-slate-400 hover:text-brand-600 transition-colors cursor-pointer shrink-0"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
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
                        ? 'line-through text-slate-400'
                        : 'text-slate-800 font-medium'
                    }`}
                  >
                    {task.title}
                  </span>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 flex-wrap">
                    <span className="font-semibold text-slate-600">
                      {task.phase}
                    </span>
                    {task.completed && task.completed_at && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600">Completed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Project badge and link */}
              {task.project && (
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <Link
                      to={`/workflow/projects/${task.project.id}`}
                      className="text-xs font-semibold text-slate-800 hover:text-brand-600 transition-colors block truncate max-w-[180px]"
                    >
                      {task.project.project_name}
                    </Link>
                    <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">
                      {task.project.customer?.business_name || 'Client'}
                    </span>
                  </div>

                  <Link
                    to={`/workflow/projects/${task.project.id}`}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Open project workflow"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
