import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    business: '',
    type: t.contact.typeOptions[0],
    budget: t.contact.budgetOptions[4],
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let text = t.contact.waTemplate;
    text = text.replace('{name}', formData.name)
               .replace('{whatsapp}', formData.whatsapp)
               .replace('{business}', formData.business)
               .replace('{type}', formData.type)
               .replace('{budget}', formData.budget)
               .replace('{message}', formData.message);

    window.open(`https://wa.me/6285820830530?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24">
      {/* Electric blue diffuse light behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {t.contact.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-500/5 border border-white/60"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">{t.contact.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">{t.contact.whatsapp}</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="business" className="text-sm font-medium text-gray-700">{t.contact.business}</label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  required
                  value={formData.business}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium text-gray-700">{t.contact.type}</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900 appearance-none cursor-pointer"
                >
                  {t.contact.typeOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium text-gray-700">{t.contact.budget}</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900 appearance-none cursor-pointer"
              >
                {t.contact.budgetOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors bg-white/80 backdrop-blur-sm text-gray-900 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-900 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors duration-300 flex justify-center shadow-lg shadow-brand-900/10"
            >
              {t.contact.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
