import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showFraction?: boolean;
}

export function ProgressBar({
  completed,
  total,
  size = 'md',
  showLabel = true,
  showFraction = false
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  return (
    <div className="w-full">
      {(showLabel || showFraction) && (
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
          {showFraction ? (
            <span className="font-medium text-slate-700">
              {completed} of {total} tasks completed
            </span>
          ) : (
            <span className="text-slate-500">Progress</span>
          )}
          {showLabel && (
            <span className="font-semibold text-slate-900">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses}`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            percentage === 100
              ? 'bg-emerald-500'
              : percentage >= 50
              ? 'bg-brand-600'
              : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
