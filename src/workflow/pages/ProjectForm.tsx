import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import {
  FolderKanban,
  User,
  Calendar,
  DollarSign,
  Globe,
  Github,
  Link2,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { createProject, getProject, updateProject, getCustomers } from '../lib/workflowApi';
import { Project, Customer } from '../lib/workflowTypes';

export function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const preselectedCustomerId = searchParams.get('customerId');
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Partial<Project>>({
    customer_id: preselectedCustomerId || '',
    project_name: '',
    project_type: 'Company Profile',
    status: 'Discovery',
    priority: 'Normal',
    budget: '',
    start_date: new Date().toISOString().split('T')[0],
    deadline: '',
    preview_url: '',
    production_url: '',
    github_url: '',
    domain: '',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomersList();
    if (id) {
      loadExistingProject(id);
    }
  }, [id]);

  const loadCustomersList = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
      if (!formData.customer_id && data.length > 0 && !preselectedCustomerId) {
        setFormData((prev) => ({ ...prev, customer_id: data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadExistingProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { project } = await getProject(projectId);
      setFormData(project);
    } catch (err: any) {
      setError(err.message || 'Failed to load project details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.project_name?.trim()) {
      setError('Project name is required.');
      return;
    }

    if (!formData.customer_id) {
      setError('Please select or create a customer first.');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        await updateProject(id, formData);
        navigate(`/workflow/projects/${id}`);
      } else {
        const created = await createProject(formData);
        navigate(`/workflow/projects/${created.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the project.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading project configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <div>
        <Link
          to="/workflow/projects"
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {isEditing ? 'Edit Project' : 'New Website Project'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {isEditing
            ? 'Update project deliverables, URLs, and production status.'
            : 'Initialize project with automatic 11-phase workflow checklist.'}
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project core parameters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-brand-600" />
            <span>Project Parameters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="project_name"
                required
                placeholder="e.g. Kopi Karsa Modern Redesign"
                value={formData.project_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Client / Customer <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="customer_id"
                  required
                  value={formData.customer_id || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="">-- Select Client --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.business_name} ({c.customer_name})
                    </option>
                  ))}
                </select>
              </div>
              {customers.length === 0 && (
                <p className="text-[11px] text-amber-600 mt-1">
                  No customers found.{' '}
                  <Link to="/workflow/customers/new" className="underline font-medium">
                    Create a customer first
                  </Link>
                  .
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Project Type
              </label>
              <select
                name="project_type"
                value={formData.project_type || 'Company Profile'}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Company Profile">Company Profile</option>
                <option value="E-Commerce / Catalog">E-Commerce / Catalog</option>
                <option value="Custom Web Application">Custom Web Application</option>
                <option value="Redesign / Upgrade">Redesign / Upgrade</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Initial Status
              </label>
              <select
                name="status"
                value={formData.status || 'Discovery'}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Discovery">Discovery</option>
                <option value="Assets">Assets</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="SEO">SEO</option>
                <option value="Deployment">Deployment</option>
                <option value="Waiting Client">Waiting Client</option>
                <option value="Revision">Revision</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority || 'Normal'}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Budget / Contract Value
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g. IDR 12,000,000"
                  value={formData.budget || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Target Deadline
              </label>
              <div className="relative max-w-sm">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* URLs & Deployment links */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-600" />
            <span>Domains & Project Links</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Domain Name
              </label>
              <input
                type="text"
                name="domain"
                placeholder="e.g. kopikarsa.com"
                value={formData.domain || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Preview URL
              </label>
              <div className="relative">
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="preview_url"
                  placeholder="https://preview.domain.com"
                  value={formData.preview_url || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Production URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="production_url"
                  placeholder="https://www.kopikarsa.com"
                  value={formData.production_url || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="github_url"
                  placeholder="https://github.com/org/repo"
                  value={formData.github_url || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
            Project Scope & Specifications
          </h2>
          <textarea
            name="notes"
            rows={3}
            placeholder="Special technical requirements, master prompts, design references, or hosting credentials..."
            value={formData.notes || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/workflow/projects"
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isEditing ? 'Save Changes' : 'Create Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
