import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FolderKanban,
  Clock,
  RefreshCw,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Plus,
  AlertCircle
} from 'lucide-react';
import { getDashboardData, DashboardMetrics } from '../lib/workflowApi';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function WorkflowDashboard() {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load dashboard metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingState message="Loading dashboard overview..." />;

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
        <div>
          <h4 className="font-semibold text-sm">Failed to load dashboard</h4>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={loadData} className="mt-3 px-3 py-1.5 text-xs font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  const {
    totalCustomers,
    activeProjects,
    waitingClientProjects,
    inRevisionProjects,
    completedProjects,
    activeProjectList,
    upcomingDeadlines,
    recentActivity
  } = data || {
    totalCustomers: 0,
    activeProjects: 0,
    waitingClientProjects: 0,
    inRevisionProjects: 0,
    completedProjects: 0,
    activeProjectList: [],
    upcomingDeadlines: [],
    recentActivity: []
  };

  const isWorkspaceEmpty = totalCustomers === 0 && activeProjects === 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Good morning, Nakama Digital</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your clients, projects and website production workflow.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard label="Total Customers" value={totalCustomers} icon={Users} accentColor="text-blue-600" />
        <StatCard label="Active Projects" value={activeProjects} icon={FolderKanban} accentColor="text-brand-600" />
        <StatCard label="Waiting Client" value={waitingClientProjects} icon={Clock} accentColor="text-amber-600" />
        <StatCard label="In Revision" value={inRevisionProjects} icon={RefreshCw} accentColor="text-orange-600" />
        <StatCard label="Completed" value={completedProjects} icon={CheckCircle2} accentColor="text-emerald-600" />
      </div>

      {isWorkspaceEmpty ? (
        <EmptyState title="No projects or customers yet" description="Get started by creating your first client and setting up their website production workflow." actionText="Add First Customer" actionHref="/workflow/customers/new" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div><h2 className="text-base font-semibold text-slate-900">Active Projects</h2><p className="text-xs text-slate-500 mt-0.5">Live production status and workflow progress</p></div>
                <Link to="/workflow/projects" className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"><span>View all</span><ArrowUpRight className="w-3.5 h-3.5" /></Link>
              </div>
              {activeProjectList.length === 0 ? <p className="text-sm text-slate-500 py-6 text-center">No active projects currently in progress.</p> : <div className="divide-y divide-slate-100">{activeProjectList.map((project) => { const tasksCount = project.tasks_count || 0; const completedCount = project.completed_tasks_count || 0; return <div key={project.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"><div className="min-w-0 flex-1"><div className="flex items-center gap-2.5 flex-wrap"><Link to={`/workflow/projects/${project.id}`} className="text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors">{project.project_name}</Link><StatusBadge status={project.status} size="sm" /></div><p className="text-xs text-slate-500 mt-1 truncate">Client: {project.customer?.business_name || project.customer?.customer_name || 'Direct'}</p><div className="mt-3 max-w-xs"><ProgressBar completed={completedCount} total={tasksCount} size="sm" showFraction={false} /></div></div><div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">{project.deadline && <div className="text-right"><span className="block text-[11px] uppercase tracking-wider text-slate-400">Deadline</span><span className="text-xs font-medium text-slate-700">{project.deadline}</span></div>}<Link to={`/workflow/projects/${project.id}`} className="p-2 rounded-lg text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-50 transition-colors" title="Open project workflow"><ArrowUpRight className="w-4 h-4" /></Link></div></div>; })}</div>}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Recent Activity</h2>
              {recentActivity.length === 0 ? <p className="text-sm text-slate-500 py-4 text-center">No activity recorded yet.</p> : <div className="space-y-3">{recentActivity.map((activity) => <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-xs"><div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0" /><div className="flex-1 min-w-0"><p className="font-semibold text-slate-900 truncate">{activity.title}</p><p className="text-slate-500 truncate mt-0.5">{activity.description}</p></div><span className="text-slate-400 text-[11px] shrink-0">{new Date(activity.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></div>)}</div>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-600" /><h2 className="text-base font-semibold text-slate-900">Upcoming Deadlines</h2></div></div>
              {upcomingDeadlines.length === 0 ? <p className="text-sm text-slate-500 py-6 text-center">No upcoming deadlines scheduled.</p> : <div className="space-y-3">{upcomingDeadlines.map((p) => <Link key={p.id} to={`/workflow/projects/${p.id}`} className="block p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all group"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">{p.project_name}</p><p className="text-[11px] text-slate-500 truncate mt-0.5">{p.customer?.business_name || 'Client'}</p></div><StatusBadge status={p.status} size="sm" /></div><div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100/80"><span>Target Launch</span><span className="font-semibold text-slate-800">{p.deadline}</span></div></Link>)}</div>}
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-semibold">Standard 11-Phase Workflow</h3>
              <p className="mt-1 text-xs text-brand-100 leading-relaxed">Every project automatically launches with our complete 69-point checklist covering discovery, AI development, responsive testing, and handover.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"><Link to="/workflow/projects/new" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-medium hover:bg-brand-50 transition-colors shadow-2xs"><Plus className="w-3.5 h-3.5" /><span>Launch New Project</span></Link></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkflowDashboard;
