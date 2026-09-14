import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Building2, Calendar, CheckCircle2, Globe, Instagram, Mail, MapPin, MessageCircle, Phone, Send, User } from 'lucide-react';

const SUPABASE_URL = 'https://efgstmzapyytidkhkxfh.supabase.co';
const INTAKE_URL = `${SUPABASE_URL}/functions/v1/customer-intake`;

const initialForm = {
  customer_name: '',
  business_name: '',
  business_category: '',
  whatsapp: '',
  phone: '',
  email: '',
  instagram: '',
  address: '',
  website: '',
  google_maps: '',
  project_type: 'Company Profile',
  budget: '',
  start_date: '',
  deadline: '',
  target_audience: '',
  website_goal: '',
  domain_requirement: '',
  reference_websites: '',
  required_features: '',
  available_assets: '',
  notes: '',
  website_trap: ''
};

export default function CustomerIntake() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (name: string, value: string) => setForm((current) => ({ ...current, [name]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Could not submit the form.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-12 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 sm:p-10 text-center shadow-2xl">
          <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Nakama Digital</p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">Thank you — we received your information.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Your customer profile has been added to our workflow and is ready for review.</p>
          <button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Submit another response <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-5 py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">Nakama Digital</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Client Project Intake</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">Please share your business and website requirements. This information will be added directly to our project workflow so our team can prepare the next step.</p>
        </div>
      </header>

      <form onSubmit={submit} className="max-w-4xl mx-auto px-5 py-8 sm:py-10 space-y-6">
        {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex gap-3"><AlertCircle className="w-5 h-5 shrink-0" /><span>{error}</span></div>}

        <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={<Building2 className="w-4 h-4" />} title="Your business" subtitle="Basic information we need to create your customer profile." />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Your name" name="customer_name" value={form.customer_name} onChange={update} required icon={<User className="w-4 h-4" />} placeholder="Your full name" />
            <Field label="Business / brand name" name="business_name" value={form.business_name} onChange={update} required icon={<Building2 className="w-4 h-4" />} placeholder="Business or brand name" />
            <Field label="Business category" name="business_category" value={form.business_category} onChange={update} placeholder="e.g. Cafe, school, travel, UMKM" />
            <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={update} icon={<MessageCircle className="w-4 h-4" />} placeholder="08xxxxxxxxxx" />
            <Field label="Phone" name="phone" value={form.phone} onChange={update} icon={<Phone className="w-4 h-4" />} placeholder="Phone number" />
            <Field label="Email" name="email" value={form.email} onChange={update} type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@example.com" />
            <Field label="Instagram" name="instagram" value={form.instagram} onChange={update} icon={<Instagram className="w-4 h-4" />} placeholder="@yourbusiness" />
            <Field label="Website" name="website" value={form.website} onChange={update} type="url" icon={<Globe className="w-4 h-4" />} placeholder="https://..." />
            <div className="sm:col-span-2"><TextArea label="Business address" name="address" value={form.address} onChange={update} icon={<MapPin className="w-4 h-4" />} placeholder="Your business address" /></div>
            <div className="sm:col-span-2"><Field label="Google Maps link" name="google_maps" value={form.google_maps} onChange={update} type="url" placeholder="Paste your Google Maps link" /></div>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <SectionTitle icon={<Send className="w-4 h-4" />} title="Website project" subtitle="Tell us what you are looking to build." />
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField label="Project type" name="project_type" value={form.project_type} onChange={update} options={['Landing Page', 'Company Profile', 'E-Commerce / Catalog', 'Custom Web Application', 'Redesign / Upgrade']} />
            <Field label="Budget / estimated value" name="budget" value={form.budget} onChange={update} placeholder="e.g. IDR 15,000,000" />
            <Field label="Preferred start date" name="start_date" value={form.start_date} onChange={update} type="date" icon={<Calendar className="w-4 h-4" />} />
            <Field label="Target deadline" name="deadline" value={form.deadline} onChange={update} type="date" icon={<Calendar className="w-4 h-4" />} />
            <div className="sm:col-span-2"><TextArea label="Who is your target audience?" name="target_audience" value={form.target_audience} onChange={update} placeholder="Who should the website attract or serve?" /></div>
            <div className="sm:col-span-2"><TextArea label="What is the main goal of the website?" name="website_goal" value={form.website_goal} onChange={update} placeholder="For example: generate WhatsApp enquiries, showcase services, sell products, build credibility" /></div>
            <Field label="Domain requirement" name="domain_requirement" value={form.domain_requirement} onChange={update} placeholder="Existing domain or new domain needed?" />
            <Field label="Reference websites" name="reference_websites" value={form.reference_websites} onChange={update} placeholder="Links to websites you like" />
            <div className="sm:col-span-2"><TextArea label="Required pages / features" name="required_features" value={form.required_features} onChange={update} placeholder="e.g. Home, About, Services, Gallery, Blog, WhatsApp button" /></div>
            <div className="sm:col-span-2"><TextArea label="Assets you already have" name="available_assets" value={form.available_assets} onChange={update} placeholder="Logo, photos, menu, brand colors, copy, social media, etc." /></div>
            <div className="sm:col-span-2"><TextArea label="Additional notes" name="notes" value={form.notes} onChange={update} placeholder="Anything else our team should know?" rows={5} /></div>
          </div>
        </section>

        <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={form.website_trap} onChange={(e) => update('website_trap', e.target.value)} className="absolute -left-[9999px] opacity-0" />

        <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div><h2 className="font-bold">Ready to send?</h2><p className="mt-1 text-sm text-slate-300">Your information will be added directly to our customer workflow.</p></div>
          <button disabled={submitting} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-60 px-6 py-3 text-sm font-bold transition-colors">{submitting ? 'Sending...' : 'Submit information'}<ArrowRight className="w-4 h-4" /></button>
        </div>
      </form>
    </main>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return <div className="mb-6"><div className="flex items-center gap-2 text-brand-600"><span className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">{icon}</span><h2 className="text-lg font-bold text-slate-900">{title}</h2></div><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>;
}

function Field({ label, name, value, onChange, placeholder, type = 'text', required = false, icon }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; placeholder?: string; type?: string; required?: boolean; icon?: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold text-slate-700 mb-2">{label}{required && <span className="text-rose-500"> *</span>}</span><div className="relative">{icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}<input required={required} type={type} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} className={`w-full ${icon ? 'pl-9' : 'px-3.5'} pr-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`} /></div></label>;
}

function TextArea({ label, name, value, onChange, placeholder, rows = 3, icon }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; placeholder?: string; rows?: number; icon?: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold text-slate-700 mb-2">{label}</span><div className="relative">{icon && <span className="absolute left-3 top-3 text-slate-400">{icon}</span>}<textarea value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} rows={rows} className={`w-full ${icon ? 'pl-9' : 'px-3.5'} pr-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y`} /></div></label>;
}

function SelectField({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; options: string[] }) {
  return <label className="block"><span className="block text-xs font-semibold text-slate-700 mb-2">{label}</span><select value={value} onChange={(e) => onChange(name, e.target.value)} className="w-full px-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
