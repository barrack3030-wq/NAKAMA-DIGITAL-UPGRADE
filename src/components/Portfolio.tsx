import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolio';
import { Language } from '../locales';

export default function Portfolio() {
  const { t, language } = useLanguage();
  const currentLang = language as Language;
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

  return <section id="portfolio" className="relative py-16 lg:py-24 border-y border-white/50 bg-white/20 backdrop-blur-sm">
    <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-400/10 blur-[150px] rounded-full pointer-events-none -z-10" />
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:.8,ease:[.16,1,.3,1]}}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-900 mb-4">{t.portfolio.title}</h2>
          <p className="text-lg text-gray-500 max-w-xl">{t.portfolio.desc}</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:.8,delay:.2,ease:[.16,1,.3,1]}}>
          <a href="#contact" className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-800 transition-colors group">{t.portfolio.viewAll}<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/></a>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {portfolioData.map((item,index)=>{
          const Wrapper: React.ElementType = item.link ? 'a' : 'div';
          return <motion.div key={item.id} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:.8,delay:index*.1,ease:[.16,1,.3,1]}} className={`group ${item.link?'cursor-pointer':''} ${index%2!==0?'md:mt-16 lg:mt-24':''}`}>
            <Wrapper href={item.link || undefined} target={item.link?'_blank':undefined} rel={item.link?'noopener noreferrer':undefined} className="block">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 aspect-[4/3] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {item.image ? <img src={asset(item.image)} alt={item.title[currentLang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" /> : <><div className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:scale-105 transition-transform duration-700 ease-out`} /><div className="absolute inset-x-4 bottom-0 h-4/5 bg-white/40 backdrop-blur-md rounded-t-xl border border-white/50 shadow-xl translate-y-8 group-hover:translate-y-4 transition-transform duration-500 ease-out flex flex-col p-6"><div className="w-1/2 h-6 bg-white/80 rounded-md mb-4"/><div className="w-full h-32 bg-white/50 rounded-md"/></div></>}
              </div>
              <div><div className="text-sm font-medium text-brand-600 mb-2">{item.category[currentLang]}</div><h3 className="text-2xl font-semibold text-brand-900 group-hover:text-brand-600 transition-colors flex items-center gap-2">{item.title[currentLang]}{item.link&&<ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"/>}</h3></div>
            </Wrapper>
          </motion.div>;
        })}
      </div>
    </div>
  </section>;
}
