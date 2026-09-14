import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Database,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LogOut,
  Layers,
  FileCode2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { DEFAULT_WORKFLOW_PHASES } from '../lib/workflowTypes';

export function Settings() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUserEmail(session.user.email || null);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      window.location.href = '/workflow/login';
    }
  };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const maskedKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    ? `${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.substring(0, 8)}••••••••••••••••`
    : 'Not configured';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Workspace Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Internal configuration, security policies, and workflow automation definitions
        </p>
      </div>

      {/* Security & Authentication status */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security & Authentication</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Signed in User
            </span>
            <p className="font-semibold text-slate-800">{userEmail || 'Team Member'}</p>
            <p className="text-slate-500 text-[11px]">Role: Agency Admin</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Row Level Security (RLS)
            </span>
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Enforced for Authenticated Users</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              No public anonymous reads or writes permitted.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out of Workspace</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-600" />
          <span>Supabase Infrastructure</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <span className="block font-medium text-slate-700">Connection Status</span>
              <span className="text-[11px] text-slate-500">
                {isSupabaseConfigured
                  ? 'Successfully connected to remote Supabase project'
                  : 'Credentials missing in environment variables'}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-md font-semibold text-xs ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isSupabaseConfigured ? 'Connected' : 'Missing Config'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="block font-medium text-slate-700">Project Endpoint URL</span>
            <code className="block font-mono text-[11px] text-slate-600 truncate">
              {supabaseUrl || 'VITE_SUPABASE_URL not defined'}
            </code>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="block font-medium text-slate-700">Publishable Key</span>
            <code className="block font-mono text-[11px] text-slate-600 truncate">
              {maskedKey}
            </code>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-500">
          <p>
            Database schema file: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">supabase/schema.sql</code>
          </p>
        </div>
      </div>

      {/* Standard Workflow Engine Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-600" />
          <span>Automated 11-Phase Production Workflow</span>
        </h2>
        <p className="text-xs text-slate-500">
          When any new website project is created, Nakama Digital Workflow automatically provisions all 11 production phases and 69 standard QA checklist items.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {DEFAULT_WORKFLOW_PHASES.map((p, idx) => (
            <div
              key={p.phase}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 text-xs"
            >
              <span className="font-semibold text-slate-800 block">
                {idx + 1}. {p.phase.replace(/PHASE \d+ — /, '')}
              </span>
              <span className="text-[11px] text-slate-500">
                {p.tasks.length} standard tasks
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
