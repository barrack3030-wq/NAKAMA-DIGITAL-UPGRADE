import React from 'react';
import { LucideIcon, FolderPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderPlus,
  actionText,
  actionHref,
  onActionClick
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 bg-white border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto my-8">
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mx-auto text-slate-500 mb-4 shadow-2xs">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <>
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  );
}
