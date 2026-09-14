import React from 'react';
import { Menu, Plus, Users, FolderPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkflowHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileNav: () => void;
}

export function WorkflowHeader({ title, subtitle, onOpenMobileNav }: WorkflowHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 -ml-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          {title && <h1 className="text-base font-semibold text-slate-900">{title}</h1>}
          {subtitle && <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/workflow/customers/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-lg shadow-2xs transition-colors"
        >
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Add</span> Customer
        </Link>
        <Link
          to="/workflow/projects/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </Link>
      </div>
    </header>
  );
}
