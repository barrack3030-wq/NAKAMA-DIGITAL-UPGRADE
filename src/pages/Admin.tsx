import React, { useMemo, useState } from 'react';
import { ArrowLeft, ImagePlus, Save, Trash2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFile, rawUrl, uploadFile, upsertTextFile } from '../admin/githubApi';

interface PortfolioItem { id: string; title: { id: string; en: string }; category: { id: string; en: string }; color: string; image?: string; link?: string; }

function decodeBase64(value: string) {
  const binary = atob(value.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function parsePortfolio(source: string): PortfolioItem[] {
  const match = source.match(/export const portfolioData:\s*PortfolioItem\[\]\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('Format portfolio.ts tidak dikenali.');
  return JSON.parse(match[1]);
}

export default function Admin() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem('nakama_github_token') || '');
  const [logoWidth, setLogoWidth] = useState(150);
  const [logoPath, setLogoPath] = useState('uploads/logo/logo.svg');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [status, setStatus] = useState('Masukkan token lalu klik Load current data.');
  const authenticated = useMemo(() => token.trim().length > 10, [token]);

  const loadCurrentData = async () => {
    if (!authenticated) return setStatus('Masukkan GitHub token terlebih dahulu.');
    try {
      const [portfolio, config] = await Promise.all([getFile(token, 'src/data/portfolio.ts'), getFile(token, 'src/data/siteConfig.ts')]);
      const portfolioSource = decodeBase64(String(portfolio.content || ''));
      const configSource = decodeBase64(String(config.content || ''));
      setItems(parsePortfolio(portfolioSource));
      const widthMatch = configSource.match(/logoWidth['\"]?\s*[:=]\s*(\d+)/);
      const pathMatch = configSource.match(/logoPath['\"]?\s*[:=]\s*['\"]([^'\"]+)/);
      if (widthMatch) setLogoWidth(Number(widthMatch[1]));
      if (pathMatch) setLogoPath(pathMatch[1]);
      sessionStorage.setItem('nakama_github_token', token);
      setStatus('Data saat ini berhasil dimuat.');
    } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
  };

  const saveLogo = async () => {
    if (!authenticated) return setStatus('Masukkan GitHub token terlebih dahulu.');
    try {
      let finalPath = logoPath;
      if (logoFile) {
        const ext = logoFile.name.split('.').pop()?.toLowerCase() || 'png';
        const filename = ext === 'svg' ? 'logo.svg' : `logo.${ext}`;
        finalPath = `uploads/logo/${filename}`;
        await uploadFile(token, finalPath, logoFile, 'Update website logo');
        setLogoPath(finalPath);
      }
      const config = `export interface SiteConfig {\n  brandName: string;\n  logoPath: string;\n  logoWidth: number;\n}\n\nexport const siteConfig: SiteConfig = ${JSON.stringify({ brandName: 'Nakama Digital', logoPath: finalPath, logoWidth: Number(logoWidth) }, null, 2)};\n`;
      await upsertTextFile(token, 'src/data/siteConfig.ts', config, 'Update logo settings from CMS');
      sessionStorage.setItem('nakama_github_token', token);
      setStatus('Logo berhasil disimpan.');
    } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
  };

  const addPortfolio = () => setItems(prev => [...prev, { id: crypto.randomUUID(), title: { id: '', en: '' }, category: { id: '', en: '' }, color: 'from-blue-500/20 to-brand-500/5', image: '', link: '' }]);
  const updateItem = (index: number, patch: Partial<PortfolioItem>) => setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item));
  const updateNested = (index: number, key: 'title' | 'category', lang: 'id' | 'en', value: string) => setItems(prev => prev.map((item, i) => i === index ? { ...item, [key]: { ...item[key], [lang]: value } } : item));

  const uploadPortfolioImage = async (index: number, file: File) => {
    if (!authenticated) return setStatus('Masukkan GitHub token terlebih dahulu.');
    const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
    const path = `public/assets/portfolio/${Date.now()}-${safe}`;
    try {
      await uploadFile(token, path, file, `Upload portfolio image: ${safe}`);
      updateItem(index, { image: `assets/portfolio/${path.split('/').pop()}` });
      setStatus('Gambar portfolio berhasil diupload. Klik Save portfolio untuk menyimpan data.');
    } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
  };

  const savePortfolio = async () => {
    if (!authenticated) return setStatus('Masukkan GitHub token terlebih dahulu.');
    try {
      const source = `export interface PortfolioItem {\n  id: string;\n  title: { id: string; en: string };\n  category: { id: string; en: string };\n  color: string;\n  image?: string;\n  link?: string;\n}\n\nexport const portfolioData: PortfolioItem[] = ${JSON.stringify(items, null, 2)};\n`;
      await upsertTextFile(token, 'src/data/portfolio.ts', source, 'Update portfolio from CMS');
      sessionStorage.setItem('nakama_github_token', token);
      setStatus('Portfolio berhasil disimpan.');
    } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
  };

  return <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10"><div className="max-w-6xl mx-auto">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><div><p className="text-blue-400 text-xs font-bold tracking-[.18em]">NAKAMA DIGITAL CMS</p><h1 className="text-3xl font-bold mt-2">Website settings & portfolio</h1></div><button onClick={()=>navigate('/')} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15"><ArrowLeft size={16}/> Back to website</button></div>
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8"><div className="flex flex-col md:flex-row md:items-end gap-4"><div className="flex-1"><h2 className="text-xl font-semibold mb-2">1. GitHub connection</h2><p className="text-slate-400 text-sm mb-4">Gunakan GitHub Personal Access Token dengan akses Contents: Read and Write untuk repository ini. Token hanya disimpan di session browser.</p><input value={token} onChange={e=>setToken(e.target.value)} type="password" placeholder="github_pat_..." className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-blue-400" /></div><button onClick={loadCurrentData} className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15">Load current data</button></div></section>
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 mb-8"><h2 className="text-xl font-semibold mb-6">2. Logo</h2><div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start"><div className="space-y-4"><label className="block text-sm text-slate-300">Upload logo</label><label className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-dashed border-white/15 bg-black/20 cursor-pointer hover:border-blue-400"><Upload size={17}/><span>{logoFile?.name || 'Pilih SVG, PNG, JPG, atau WEBP'}</span><input type="file" accept="image/svg+xml,image/png,image/jpeg,image/webp" hidden onChange={e=>setLogoFile(e.target.files?.[0] || null)}/></label><label className="block text-sm text-slate-300">Logo width: <b>{logoWidth}px</b></label><input type="range" min="60" max="320" value={logoWidth} onChange={e=>setLogoWidth(Number(e.target.value))} className="w-full"/><div className="flex gap-3"><input value={logoPath} onChange={e=>setLogoPath(e.target.value)} className="flex-1 rounded-2xl bg-black/30 border border-white/10 px-4 py-3"/><button onClick={saveLogo} className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 inline-flex items-center gap-2"><Save size={16}/> Save logo</button></div></div><div className="rounded-3xl bg-white min-h-40 p-6 flex items-center justify-center"><img src={rawUrl(logoPath)} style={{width:`${logoWidth}px`,maxWidth:'100%'}} alt="Logo preview"/></div></div></section>
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6"><div className="flex items-center justify-between gap-4 mb-6"><div><h2 className="text-xl font-semibold">3. Portfolio manager</h2><p className="text-sm text-slate-400">Upload gambar dan isi URL eksternal. Saat card diklik, user langsung diarahkan ke URL tersebut.</p></div><button onClick={addPortfolio} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"><ImagePlus size={16}/> Add portfolio</button></div><div className="space-y-6">{items.map((item,index)=><article key={item.id} className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="grid lg:grid-cols-[220px_1fr] gap-6"><div className="space-y-3"><div className="aspect-[4/3] rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center">{item.image?<img src={rawUrl(`public/${item.image}`)} className="w-full h-full object-cover"/>:<span className="text-slate-500 text-sm">No image</span>}</div><label className="block text-center px-4 py-2 rounded-xl border border-white/10 cursor-pointer hover:border-blue-400 text-sm"><Upload size={15} className="inline mr-2"/>Upload image<input type="file" accept="image/*" hidden onChange={e=>{const f=e.target.files?.[0];if(f)void uploadPortfolioImage(index,f);}}/></label></div><div className="grid sm:grid-cols-2 gap-4"><input placeholder="Title Indonesia" value={item.title.id} onChange={e=>updateNested(index,'title','id',e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><input placeholder="Title English" value={item.title.en} onChange={e=>updateNested(index,'title','en',e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><input placeholder="Category Indonesia" value={item.category.id} onChange={e=>updateNested(index,'category','id',e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><input placeholder="Category English" value={item.category.en} onChange={e=>updateNested(index,'category','en',e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><input placeholder="External URL, contoh https://client.com" value={item.link||''} onChange={e=>updateItem(index,{link:e.target.value})} className="sm:col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><input placeholder="Image path" value={item.image||''} onChange={e=>updateItem(index,{image:e.target.value})} className="sm:col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3"/><button onClick={()=>setItems(prev=>prev.filter((_,i)=>i!==index))} className="sm:col-span-2 justify-self-start text-red-300 hover:text-red-200 inline-flex items-center gap-2"><Trash2 size={15}/> Remove</button></div></div></article>)}</div><div className="mt-6 flex items-center justify-between gap-4"><span className="text-sm text-slate-400">{status}</span><button onClick={savePortfolio} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 inline-flex items-center gap-2"><Save size={16}/> Save portfolio</button></div></section>
  </div></div>;
}
