import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  Customer,
  Project,
  WorkflowTask,
  ProjectNote,
  DEFAULT_WORKFLOW_PHASES
} from './workflowTypes';

function checkSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your environment variables.'
    );
  }
  return supabase;
}

// ==========================================
// CUSTOMERS
// ==========================================

export async function getCustomers(search?: string, statusFilter?: string): Promise<Customer[]> {
  const client = checkSupabase();
  let query = client
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'All') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;

  let customers: Customer[] = data || [];
  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    customers = customers.filter((c) =>
      (c.customer_name && c.customer_name.toLowerCase().includes(s)) ||
      (c.business_name && c.business_name.toLowerCase().includes(s)) ||
      (c.email && c.email.toLowerCase().includes(s)) ||
      (c.phone && c.phone.toLowerCase().includes(s)) ||
      (c.whatsapp && c.whatsapp.toLowerCase().includes(s))
    );
  }

  return customers;
}

export async function getCustomer(id: string): Promise<{ customer: Customer; projects: Project[] }> {
  const client = checkSupabase();
  const { data: customer, error: customerErr } = await client
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (customerErr) throw customerErr;

  const { data: projects, error: projectsErr } = await client
    .from('projects')
    .select('*')
    .eq('customer_id', id)
    .order('created_at', { ascending: false });

  if (projectsErr) throw projectsErr;

  return { customer, projects: projects || [] };
}

export async function createCustomer(
  customerData: Partial<Customer>
): Promise<Customer> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('customers')
    .insert([customerData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(
  id: string,
  customerData: Partial<Customer>
): Promise<Customer> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('customers')
    .update({ ...customerData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomer(id: string): Promise<void> {
  const client = checkSupabase();
  const { error } = await client.from('customers').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// PROJECTS & WORKFLOW INITIALIZATION
// ==========================================

export async function getProjects(search?: string, statusFilter?: string): Promise<Project[]> {
  const client = checkSupabase();
  let query = client
    .from('projects')
    .select(`
      *,
      customer:customers(id, customer_name, business_name),
      workflow_tasks(id, completed)
    `)
    .order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'All') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;

  let projects: Project[] = (data || []).map((p: any) => {
    const tasks = p.workflow_tasks || [];
    const completedTasks = tasks.filter((t: any) => t.completed).length;
    return {
      ...p,
      tasks_count: tasks.length,
      completed_tasks_count: completedTasks
    };
  });

  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    projects = projects.filter((p) =>
      (p.project_name && p.project_name.toLowerCase().includes(s)) ||
      (p.customer?.customer_name && p.customer.customer_name.toLowerCase().includes(s)) ||
      (p.customer?.business_name && p.customer.business_name.toLowerCase().includes(s))
    );
  }

  return projects;
}

export async function getProject(id: string): Promise<{ project: Project; customer: Customer }> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('projects')
    .select(`
      *,
      customer:customers(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return { project: data, customer: data.customer };
}

export async function createProject(
  projectData: Partial<Project>
): Promise<Project> {
  const client = checkSupabase();

  // 1. Insert Project
  const { data: newProject, error: projectErr } = await client
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (projectErr) throw projectErr;

  // 2. Automatically generate the 11 workflow phases and all tasks!
  const tasksToInsert: Array<{
    project_id: string;
    phase: string;
    title: string;
    sort_order: number;
    completed: boolean;
  }> = [];

  let sortIndex = 0;
  for (const phaseDef of DEFAULT_WORKFLOW_PHASES) {
    for (const taskTitle of phaseDef.tasks) {
      sortIndex++;
      tasksToInsert.push({
        project_id: newProject.id,
        phase: phaseDef.phase,
        title: taskTitle,
        sort_order: sortIndex,
        completed: false
      });
    }
  }

  if (tasksToInsert.length > 0) {
    const { error: tasksErr } = await client
      .from('workflow_tasks')
      .insert(tasksToInsert);

    if (tasksErr) {
      console.error('Error auto-generating workflow tasks:', tasksErr);
    }
  }

  return newProject;
}

export async function updateProject(
  id: string,
  projectData: Partial<Project>
): Promise<Project> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const client = checkSupabase();
  const { error } = await client.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// WORKFLOW TASKS
// ==========================================

export async function getWorkflowTasks(projectId: string): Promise<WorkflowTask[]> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('workflow_tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function updateWorkflowTask(
  id: string,
  updates: { completed?: boolean; completed_at?: string | null; notes?: string | null }
): Promise<WorkflowTask> {
  const client = checkSupabase();
  const updatePayload: Record<string, any> = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await client
    .from('workflow_tasks')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllTasks(filter: 'all' | 'today' | 'overdue' | 'completed' = 'all'): Promise<WorkflowTask[]> {
  const client = checkSupabase();
  const query = client
    .from('workflow_tasks')
    .select(`
      *,
      project:projects (
        id,
        project_name,
        status,
        deadline,
        customer:customers (
          id,
          customer_name,
          business_name
        )
      )
    `)
    .order('sort_order', { ascending: true });

  const { data, error } = await query;
  if (error) throw error;

  let tasks: WorkflowTask[] = data || [];
  const todayStr = new Date().toISOString().split('T')[0];

  if (filter === 'completed') {
    tasks = tasks.filter((t) => t.completed);
  } else if (filter === 'today') {
    tasks = tasks.filter((t) => !t.completed && t.project?.deadline === todayStr);
  } else if (filter === 'overdue') {
    tasks = tasks.filter((t) => !t.completed && t.project?.deadline && t.project.deadline < todayStr);
  } else {
    // Incomplete tasks by default for 'all' manager view or all tasks
    // Let's return incomplete first, then completed
  }

  return tasks;
}

// ==========================================
// PROJECT NOTES
// ==========================================

export async function getProjectNotes(projectId: string): Promise<ProjectNote[]> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('project_notes')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createProjectNote(
  projectId: string,
  content: string,
  createdBy?: string
): Promise<ProjectNote> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('project_notes')
    .insert([
      {
        project_id: projectId,
        content,
        created_by: createdBy || 'Team'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProjectNote(
  id: string,
  content: string
): Promise<ProjectNote> {
  const client = checkSupabase();
  const { data, error } = await client
    .from('project_notes')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProjectNote(id: string): Promise<void> {
  const client = checkSupabase();
  const { error } = await client.from('project_notes').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// DASHBOARD METRICS & SUMMARY
// ==========================================

export interface DashboardMetrics {
  totalCustomers: number;
  activeProjects: number;
  waitingClientProjects: number;
  inRevisionProjects: number;
  completedProjects: number;
  activeProjectList: Project[];
  upcomingDeadlines: Project[];
  recentActivity: Array<{
    id: string;
    type: 'project' | 'customer' | 'note';
    title: string;
    description: string;
    date: string;
  }>;
}

export async function getDashboardData(): Promise<DashboardMetrics> {
  const client = checkSupabase();

  const [customersRes, projectsRes, notesRes] = await Promise.all([
    client.from('customers').select('*').order('created_at', { ascending: false }),
    client
      .from('projects')
      .select(`
        *,
        customer:customers(id, customer_name, business_name),
        workflow_tasks(id, completed)
      `)
      .order('created_at', { ascending: false }),
    client
      .from('project_notes')
      .select('*, project:projects(project_name)')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  if (customersRes.error) throw customersRes.error;
  if (projectsRes.error) throw projectsRes.error;

  const customers: Customer[] = customersRes.data || [];
  const rawProjects: any[] = projectsRes.data || [];

  const projects: Project[] = rawProjects.map((p) => {
    const tasks = p.workflow_tasks || [];
    const completedTasks = tasks.filter((t: any) => t.completed).length;
    return {
      ...p,
      tasks_count: tasks.length,
      completed_tasks_count: completedTasks
    };
  });

  const activeProjects = projects.filter((p) => p.status !== 'Completed');
  const waitingClientProjects = projects.filter((p) => p.status === 'Waiting Client').length;
  const inRevisionProjects = projects.filter((p) => p.status === 'Revision').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;

  // Upcoming deadlines (projects with deadlines, sorted nearest first)
  const upcomingDeadlines = [...projects]
    .filter((p) => p.status !== 'Completed' && Boolean(p.deadline))
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1))
    .slice(0, 5);

  // Recent activity
  const recentActivity: DashboardMetrics['recentActivity'] = [];

  // Recent projects
  projects.slice(0, 3).forEach((p) => {
    recentActivity.push({
      id: `proj-${p.id}`,
      type: 'project',
      title: p.project_name,
      description: `Project ${p.status.toLowerCase()} for ${p.customer?.business_name || 'Client'}`,
      date: p.created_at || new Date().toISOString()
    });
  });

  // Recent customers
  customers.slice(0, 2).forEach((c) => {
    recentActivity.push({
      id: `cust-${c.id}`,
      type: 'customer',
      title: c.business_name,
      description: `New client added (${c.customer_name})`,
      date: c.created_at || new Date().toISOString()
    });
  });

  // Sort activity by date
  recentActivity.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    totalCustomers: customers.length,
    activeProjects: activeProjects.length,
    waitingClientProjects,
    inRevisionProjects,
    completedProjects,
    activeProjectList: activeProjects.slice(0, 5),
    upcomingDeadlines,
    recentActivity
  };
}
