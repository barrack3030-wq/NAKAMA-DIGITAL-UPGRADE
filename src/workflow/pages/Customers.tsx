import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { Customer } from '../lib/workflowTypes';
import { getCustomers, deleteCustomer } from '../lib/workflowApi';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Delete modal state
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, [statusFilter]);

  const loadCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomers(search, statusFilter);
      setCustomers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load customers.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCustomers();
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCustomer(customerToDelete.id);
      setCustomerToDelete(null);
      await loadCustomers();
    } catch (err: any) {
      alert(`Error deleting customer: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Customers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage agency client accounts, contact details, and project history
          </p>
        </div>
        <Link
          to="/workflow/customers/new"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, business, WhatsApp, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </form>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 shrink-0">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Discovery">Discovery</option>
            <option value="Development">Development</option>
            <option value="Waiting Client">Waiting Client</option>
            <option value="Revision">Revision</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState message="Loading client database..." />
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
          {error}
        </div>
      ) : customers.length === 0 ? (
        <EmptyState
          title="No customers found"
          description={
            search
              ? 'No client accounts match your search filters.'
              : 'Start by adding your first client to begin tracking website projects.'
          }
          icon={Users}
          actionText={search ? 'Clear Search' : 'Add Customer'}
          onActionClick={search ? () => { setSearch(''); loadCustomers(); } : undefined}
          actionHref={search ? undefined : '/workflow/customers/new'}
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
              <thead className="bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Customer</th>
                  <th scope="col" className="px-6 py-3.5">Business</th>
                  <th scope="col" className="px-6 py-3.5">Category</th>
                  <th scope="col" className="px-6 py-3.5">WhatsApp</th>
                  <th scope="col" className="px-6 py-3.5">Project</th>
                  <th scope="col" className="px-6 py-3.5">Status</th>
                  <th scope="col" className="px-6 py-3.5">Deadline</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      <Link
                        to={`/workflow/customers/${c.id}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {c.customer_name}
                      </Link>
                      {c.email && (
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {c.email}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {c.business_name}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {c.business_category || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.whatsapp ? (
                        <a
                          href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{c.whatsapp}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {c.project_type || 'Website'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={c.status || 'Discovery'} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {c.deadline || '—'}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/workflow/customers/${c.id}`}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/workflow/customers/${c.id}?edit=true`}
                          className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Customer"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setCustomerToDelete(c)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {customers.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      to={`/workflow/customers/${c.id}`}
                      className="text-sm font-semibold text-slate-900 hover:text-brand-600"
                    >
                      {c.customer_name}
                    </Link>
                    <p className="text-xs font-medium text-slate-600 mt-0.5">
                      {c.business_name}
                    </p>
                    {c.business_category && (
                      <span className="inline-block text-[11px] text-slate-400 mt-0.5">
                        {c.business_category}
                      </span>
                    )}
                  </div>
                  <StatusBadge status={c.status || 'Discovery'} size="sm" />
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  {c.whatsapp && (
                    <a
                      href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{c.whatsapp}</span>
                    </a>
                  )}
                  {c.deadline && (
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{c.deadline}</span>
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {c.project_type || 'Website'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/workflow/customers/${c.id}`}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                    >
                      View Detail
                    </Link>
                    <button
                      onClick={() => setCustomerToDelete(c)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(customerToDelete)}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.customer_name} (${customerToDelete?.business_name})? This will permanently remove the client and all associated website projects.`}
        confirmText="Delete Client"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCustomerToDelete(null)}
      />
    </div>
  );
}
