-- ==============================================================================
-- NAKAMA DIGITAL WORKFLOW - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_category TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    instagram TEXT,
    address TEXT,
    website TEXT,
    google_maps TEXT,
    project_type TEXT,
    budget TEXT,
    start_date DATE,
    deadline DATE,
    status TEXT DEFAULT 'Discovery',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    project_name TEXT NOT NULL,
    project_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Discovery',
    priority TEXT NOT NULL DEFAULT 'Normal',
    budget TEXT,
    start_date DATE,
    deadline DATE,
    preview_url TEXT,
    production_url TEXT,
    github_url TEXT,
    domain TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. WORKFLOW TASKS TABLE
CREATE TABLE IF NOT EXISTS public.workflow_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    phase TEXT NOT NULL,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROJECT NOTES TABLE
CREATE TABLE IF NOT EXISTS public.project_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_customers_customer_name ON public.customers(customer_name);
CREATE INDEX IF NOT EXISTS idx_customers_business_name ON public.customers(business_name);
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(status);

CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON public.projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_deadline ON public.projects(deadline);

CREATE INDEX IF NOT EXISTS idx_workflow_tasks_project_id ON public.workflow_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_workflow_tasks_sort_order ON public.workflow_tasks(sort_order);
CREATE INDEX IF NOT EXISTS idx_workflow_tasks_completed ON public.workflow_tasks(completed);

CREATE INDEX IF NOT EXISTS idx_project_notes_project_id ON public.project_notes(project_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - RESTRICTED TO AUTHENTICATED USERS ONLY
-- ==============================================================================
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_notes ENABLE ROW LEVEL SECURITY;

-- CUSTOMERS POLICIES
CREATE POLICY "Authenticated users can select customers"
    ON public.customers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert customers"
    ON public.customers FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
    ON public.customers FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
    ON public.customers FOR DELETE
    TO authenticated
    USING (true);

-- PROJECTS POLICIES
CREATE POLICY "Authenticated users can select projects"
    ON public.projects FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert projects"
    ON public.projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
    ON public.projects FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
    ON public.projects FOR DELETE
    TO authenticated
    USING (true);

-- WORKFLOW TASKS POLICIES
CREATE POLICY "Authenticated users can select tasks"
    ON public.workflow_tasks FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert tasks"
    ON public.workflow_tasks FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update tasks"
    ON public.workflow_tasks FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tasks"
    ON public.workflow_tasks FOR DELETE
    TO authenticated
    USING (true);

-- PROJECT NOTES POLICIES
CREATE POLICY "Authenticated users can select project notes"
    ON public.project_notes FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert project notes"
    ON public.project_notes FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update project notes"
    ON public.project_notes FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete project notes"
    ON public.project_notes FOR DELETE
    TO authenticated
    USING (true);

-- ==============================================================================
-- AUTOMATIC TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER on_customer_updated
    BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_project_updated
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_workflow_task_updated
    BEFORE UPDATE ON public.workflow_tasks
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_project_note_updated
    BEFORE UPDATE ON public.project_notes
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
