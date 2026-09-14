import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading workspace data...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Loader2 className="w-8 h-8 text-brand-600 animate-spin mb-3 stroke-[2]" />
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center space-x-4 py-4 border-b border-slate-100">
      <div className="rounded-md bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
      </div>
    </div>
  );
}
