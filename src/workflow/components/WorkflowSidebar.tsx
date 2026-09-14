import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WorkflowSidebarProps {
  userEmail?: string;
  onNavigate?: () => void;
}

export function WorkflowSidebar({ userEmail, onNavigate }: WorkflowSidebarProps) {
  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      window.location.href = '/workflow/login';
    }
  };

  const navItems = [
    { to: '/workflow', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/workflow/customers', label: 'Customers', icon: Users, end: false },
    { to: '/workflow/projects', label: 'Projects', icon: FolderKanban, end: false },
    { to: '/workflow/tasks', label: 'Tasks', icon: CheckSquare, end: false },
    { to: '/workflow/settings', label: 'Settings', icon: Settings, end: false }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
              NAKAMA DIGITAL
            </span>
            <span className="block text-sm font-semibold tracking-tight text-slate-900">
              WORKFLOW
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 stroke-[2] ${
                      isActive ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Shortcuts
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <span>Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold text-slate-900 truncate">
              {userEmail || 'Team Member'}
            </p>
            <p className="text-[11px] text-slate-400 truncate">Internal Agency</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
