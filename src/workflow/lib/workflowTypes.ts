export type ProjectStatus =
  | 'Discovery'
  | 'Assets'
  | 'Design'
  | 'Development'
  | 'Testing'
  | 'SEO'
  | 'Deployment'
  | 'Waiting Client'
  | 'Revision'
  | 'Completed';

export type ProjectPriority = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface Customer {
  id: string;
  customer_name: string;
  business_name: string;
  business_category?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  address?: string | null;
  website?: string | null;
  google_maps?: string | null;
  project_type?: string | null;
  budget?: string | null;
  start_date?: string | null;
  deadline?: string | null;
  status?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  customer_id: string;
  project_name: string;
  project_type: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  budget?: string | null;
  start_date?: string | null;
  deadline?: string | null;
  preview_url?: string | null;
  production_url?: string | null;
  github_url?: string | null;
  domain?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  customer?: Customer;
  tasks_count?: number;
  completed_tasks_count?: number;
}

export interface WorkflowTask {
  id: string;
  project_id: string;
  phase: string;
  title: string;
  completed: boolean;
  completed_at?: string | null;
  notes?: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  project?: {
    id: string;
    project_name: string;
    status: ProjectStatus;
    deadline?: string | null;
    customer?: {
      id: string;
      customer_name: string;
      business_name: string;
    };
  };
}

export interface ProjectNote {
  id: string;
  project_id: string;
  content: string;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowPhaseDefinition {
  phase: string;
  tasks: string[];
}

export const DEFAULT_WORKFLOW_PHASES: WorkflowPhaseDefinition[] = [
  {
    phase: 'PHASE 1 — CLIENT & DISCOVERY',
    tasks: [
      'Customer data collected',
      'Business information collected',
      'Phone / WhatsApp verified',
      'Address verified',
      'Google Maps checked',
      'Social media collected',
      'Domain requirement confirmed',
      'Target audience defined',
      'Website goal defined'
    ]
  },
  {
    phase: 'PHASE 2 — ASSET COLLECTION',
    tasks: [
      'Logo collected',
      'Original photos collected',
      'Menu collected',
      'Brand colors collected',
      'Reference websites collected',
      'Design screenshots collected',
      'Website content collected'
    ]
  },
  {
    phase: 'PHASE 3 — DESIGN DIRECTION',
    tasks: [
      'Reference analyzed',
      'Layout identified',
      'Color system defined',
      'Typography defined',
      'Image placement defined',
      'Mobile design direction defined',
      'CTA direction defined'
    ]
  },
  {
    phase: 'PHASE 4 — AI DEVELOPMENT',
    tasks: [
      'Master prompt prepared',
      'Google AI Studio initial build completed',
      'Reference design implemented',
      'Real client content inserted',
      'Original client images inserted',
      'Components cleaned',
      'Code reviewed'
    ]
  },
  {
    phase: 'PHASE 5 — RESPONSIVE',
    tasks: [
      'Desktop checked',
      'Laptop checked',
      'Tablet checked',
      'Mobile checked',
      '375px checked',
      '390px checked',
      '430px checked',
      'Horizontal overflow checked'
    ]
  },
  {
    phase: 'PHASE 6 — FUNCTIONAL TEST',
    tasks: [
      'Navigation tested',
      'Buttons tested',
      'Phone links tested',
      'WhatsApp tested',
      'Google Maps tested',
      'Forms tested',
      'Images tested',
      'External links tested',
      'Console errors checked'
    ]
  },
  {
    phase: 'PHASE 7 — SEO',
    tasks: [
      'SEO title',
      'Meta description',
      'H1',
      'H2/H3 structure',
      'Image alt text',
      'Open Graph',
      'Canonical URL',
      'Sitemap',
      'Robots.txt',
      'Structured data'
    ]
  },
  {
    phase: 'PHASE 8 — PERFORMANCE',
    tasks: [
      'Images compressed',
      'Lazy loading checked',
      'PageSpeed checked',
      'Lighthouse checked',
      'Mobile performance checked'
    ]
  },
  {
    phase: 'PHASE 9 — CLIENT REVIEW',
    tasks: [
      'Preview sent',
      'Client feedback received',
      'Revision 1',
      'Revision 2',
      'Final approval'
    ]
  },
  {
    phase: 'PHASE 10 — DEPLOYMENT',
    tasks: [
      'GitHub updated',
      'Production build tested',
      'Domain configured',
      'HTTPS checked',
      'Final production test'
    ]
  },
  {
    phase: 'PHASE 11 — HANDOVER',
    tasks: [
      'Domain information',
      'Website access',
      'Social media links',
      'Website URL',
      'Maintenance information',
      'Backup',
      'Project completed'
    ]
  }
];
