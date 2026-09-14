import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { WorkflowSidebar } from './WorkflowSidebar';
import { WorkflowHeader } from './WorkflowHeader';
import { AlertCircle, Database, Key, X } from 'lucide-react';
import { LoadingState } from './LoadingState';

export function WorkflowLayout() {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoadingAuth(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/workflow/login', { replace: true, state: { from: location } });
      } else {
        setSessionUser(session.user);
      }
      setIsLoadingAuth(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/workflow/login', { replace: true });
      } else {
        setSessionUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // If Supabase credentials are not configured yet, show the polite setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-5">
            <Database className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Supabase Configuration Required
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            The Nakama Digital Workflow agency workspace requires Supabase connection credentials to securely store client records and project checklists with Row Level Security (RLS).
          </p>

          <div className="mt-6 space-y-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs font-mono text-slate-700">
            <div className="flex items-center gap-2 text-slate-800 font-semibold font-sans mb-1">
              <Key className="w-4 h-4 text-brand-600" />
              <span>Required Environment Variables:</span>
            </div>
            <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
            <div>VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-publishable-key</div>
          </div>

          <div className="mt-6 text-xs text-slate-500 space-y-2">
            <p>
              1. Add your project URL and publishable key into your environment settings or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">.env</code>.
            </p>
            <p>
              2. Run the SQL schema provided in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">supabase/schema.sql</code> in your Supabase SQL Editor.
            </p>
            <p>
              3. Create your agency admin account under Supabase Auth (Users &gt; Add User).
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <a
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              &larr; Back to Public Website
            </a>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingState message="Verifying Nakama Digital credentials..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">
        <WorkflowSidebar userEmail={sessionUser?.email} />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="absolute top-3 right-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <WorkflowSidebar
              userEmail={sessionUser?.email}
              onNavigate={() => setIsMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <WorkflowHeader
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
