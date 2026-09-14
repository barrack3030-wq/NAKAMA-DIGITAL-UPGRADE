import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Globe,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  FolderKanban,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { getCustomer, deleteCustomer } from '../lib/workflowApi';
import { Customer, Project } from '../lib/workflowTypes';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { LoadingState } from '../components/LoadingState';

export function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadDetails(id);
    }
  }, [id]);

  const loadDetails = async (customerId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomer(customerId);
      setCustomer(data.customer);
      setProjects(data.projects);
    } catch (err: any) {
      setError(err.message || 'Failed to load customer profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteCustomer(id);
      navigate('/workflow/customers');
    } catch (err: any) {
      alert(`Delete failed: ${err.message || 'Unknown error'}`);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading client account details..." />;
  }

  if (error || !customer) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-rose-600 mb-4">{error || 'Customer not found.'}</p>
        <Link
          to="/workflow/customers"
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/workflow/customers"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/workflow/customers/${customer.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Customer</span>
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Delete</span>
          </button>
          <Link
            to={`/workflow/projects/new?customerId=${customer.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {customer.business_name}
              </h1>
              <StatusBadge status={customer.status || 'Discovery'} size="md" />
            </div>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Contact Person: <span className="text-slate-900 font-semibold">{customer.customer_name}</span>
            </p>
            {customer.business_category && (
              <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
                {customer.business_category}
              </span>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs text-slate-500">
            {customer.deadline && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Target: <strong className="text-slate-700">{customer.deadline}</strong></span>
              </div>
            )}
            {customer.budget && (
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Budget: <strong className="text-slate-700">{customer.budget}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Contact info grid */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
              WhatsApp
            </span>
            {customer.whatsapp ? (
              <a
                href={`https://wa.me/${customer.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{customer.whatsapp}</span>
              </a>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
              Email
            </span>
            {customer.email ? (
              <a
                href={`mailto:${customer.email}`}
                className="inline-flex items-center gap-1 text-slate-700 hover:text-brand-600"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{customer.email}</span>
              </a>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
              Instagram
            </span>
            {customer.instagram ? (
              <a
                href={`https://instagram.com/${customer.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-pink-600 hover:underline"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{customer.instagram}</span>
              </a>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
              Website
            </span>
            {customer.website ? (
              <a
                href={customer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-600 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="truncate">{customer.website}</span>
              </a>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>
        </div>

        {/* Address and Google Maps */}
        {(customer.address || customer.google_maps) && (
          <div className="mt-4 pt-4 border-t border-slate-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{customer.address || 'Address registered'}</span>
            </div>
            {customer.google_maps && (
              <a
                href={customer.google_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>View Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Internal notes */}
        {customer.notes && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
              Internal Client Notes
            </span>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 whitespace-pre-line leading-relaxed">
              {customer.notes}
            </p>
          </div>
        )}
      </div>

      {/* Associated Projects Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Website Projects
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Production workflows linked to {customer.business_name}
            </p>
          </div>
          <Link
            to={`/workflow/projects/new?customerId=${customer.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
            <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 mb-3">
              No website projects have been created for this client yet.
            </p>
            <Link
              to={`/workflow/projects/new?customerId=${customer.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch First Project</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.map((p) => (
              <div
                key={p.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/workflow/projects/${p.id}`}
                      className="text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors"
                    >
                      {p.project_name}
                    </Link>
                    <StatusBadge status={p.status} size="sm" />
                    <StatusBadge priority={p.priority} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {p.project_type} • Deadline: {p.deadline || 'No deadline'}
                  </p>
                </div>

                <Link
                  to={`/workflow/projects/${p.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 self-start sm:self-auto"
                >
                  <span>Open Workflow</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Customer"
        message={`Are you sure you want to permanently delete ${customer.customer_name} (${customer.business_name}) and all associated project data? This cannot be undone.`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
