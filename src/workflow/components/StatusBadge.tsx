import React from 'react';
import { ProjectStatus, ProjectPriority } from '../lib/workflowTypes';

interface StatusBadgeProps {
  status?: ProjectStatus | string;
  priority?: ProjectPriority | string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, priority, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  if (priority) {
    let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
    if (priority === 'Urgent') {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (priority === 'High') {
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (priority === 'Normal') {
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (priority === 'Low') {
      colorClasses = 'bg-slate-50 text-slate-600 border-slate-200';
    }

    return (
      <span className={`inline-flex items-center rounded-md border font-medium ${sizeClasses} ${colorClasses}`}>
        {priority}
      </span>
    );
  }

  if (status) {
    let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
    switch (status) {
      case 'Discovery':
        colorClasses = 'bg-sky-50 text-sky-700 border-sky-200';
        break;
      case 'Assets':
        colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        break;
      case 'Design':
        colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'Development':
        colorClasses = 'bg-brand-50 text-brand-700 border-brand-200';
        break;
      case 'Testing':
        colorClasses = 'bg-teal-50 text-teal-700 border-teal-200';
        break;
      case 'SEO':
        colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200';
        break;
      case 'Deployment':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'Waiting Client':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Revision':
        colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
        break;
      case 'Completed':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300';
        break;
      default:
        colorClasses = 'bg-gray-50 text-gray-700 border-gray-200';
    }

    return (
      <span className={`inline-flex items-center rounded-md border ${sizeClasses} ${colorClasses}`}>
        {status}
      </span>
    );
  }

  return null;
}
