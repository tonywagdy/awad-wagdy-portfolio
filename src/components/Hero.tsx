import { useState } from 'react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { ArrowDown, ArrowUpRight, FileDown, Monitor, Globe, Scan, MapPin, Check, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TiltCard } from './TiltCard';

interface HeroProps {
  lang: Language;
  onOpenContact: () => void;
  onOpenCvModal: () => void;
}

export function Hero({ lang, onOpenContact, onOpenCvModal }: HeroProps) {
  const isAr = lang === 'ar';
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const disciplines = [
    { icon: Monitor, label: isAr ? 'أنظمة الديسكتوب' : 'Desktop systems', title: 'AL FARES', subtitle: isAr ? 'نظام متكامل لإدارة أعمالك' : 'Business operations, connected.', tags: ['ERP / POS', 'SQLite', 'Offline-first'], code: ['const system = {', '  architecture: "offline-first",', '  storage: "SQLite",', '  modules: ["sales", "inventory"],', '  designedFor: "your business"', '};'], detail: isAr ? 'المبيعات · المخزون · التقارير' : 'Sales · Inventory · Reporting' },
    { icon: Globe, label: isAr ? 'تجارب الويب' : 'Web experiences', title: 'AL-AMIN', subtitle: isAr ? 'تجربة رقمية تعكس هوية شركتك' : 'A digital home for a real brand.', tags: ['Responsive', 'React', 'Digital catalog'], code: ['const experience = {', '  interface: "responsive",', '  content: "brand-first",', '  catalog: "interactive",', '  designedFor: "your audience"', '};'], detail: isAr ? 'مواقع تجارية · كتالوجات تفاعلية' : 'Commercial websites · Interactive catalogs' },
    { icon: Scan, label: isAr ? 'رؤية الحاسوب' : 'Vision & LiDAR', title: 'SPATIAL QA', subtitle: isAr ? 'دقة التفاصيل تصنع الفارق' : 'Precision in every dimension.', tags: ['3D LiDAR', 'CVAT', 'Vision QA'], code: ['const perception = {', '  data: "3D point clouds",', '  review: "bounding boxes",', '  focus: "annotation quality",', '  designedFor: "autonomous AV"', '};'], detail: isAr ? 'سحابة النقاط · مراجعة البيانات' : 'Point clouds · Dataset verification' },
  ];
  const selected = disciplines[active];
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: reduceMotion ? 0 : 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65, delay } });

  return (
    <section id="home" className="hero-section relative overflow-hidden border-b border-white/8">
      <div className="hero-grid" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.12fr_1fr] gap-14 lg:gap-16 items-center py-16 sm:py-24 lg:py-28">
          <div className="min-w-0">
            <motion.div {...reveal(0)} className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/5 px-3.5 py-2 text-xs text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
              {isAr ? 'هندسة برمجيات. اهتمام بالتفاصيل.' : 'ENGINEERED WITH PURPOSE. BUILT WITH CARE.'}
            </motion.div>
            <motion.p {...reveal(0.08)} className="mt-8 mb-4 text-sm sm:text-base text-slate-400">
              {isAr ? 'أهلاً، أنا ' : 'Hello, I’m '}<span className="text-slate-100 font-semibold">{isAr ? PERSONAL_INFO.nameAr : PERSONAL_INFO.nameEn}</span>
            </motion.p>
            <motion.h1 {...reveal(0.15)} className="hero-title font-extrabold text-white">
              {isAr ? <>أحوّل الأفكار إلى<br /><span className="hero-gradient">تجارب استثنائية.</span></> : <>Turning ideas into<br /><span className="hero-gradient">digital experiences.</span></>}
            </motion.h1>
            <motion.p {...reveal(0.23)} className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              {isAr ? 'أصمّم وأطوّر مواقع ويب مميزة وأنظمة ديسكتوب مصممة لاحتياجات عملك، مع خبرة في ضمان جودة بيانات رؤية الحاسوب والـ LiDAR.' : 'I build thoughtful web experiences and custom desktop software that make business simpler. With a sharp eye for computer vision & LiDAR quality.'}
            </motion.p>
            <motion.div {...reveal(0.3)} className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="premium-button premium-button-primary">{isAr ? 'اكتشف أعمالي' : 'Explore my work'}<ArrowUpRight size={18} className="rtl:-scale-x-100" /></a>
              <button onClick={onOpenContact} className="premium-button premium-button-secondary">{isAr ? 'خلينا نبني مشروعك' : 'Let’s build something'}<span className="text-amber-300">↗</span></button>
            </motion.div>
            <motion.div {...reveal(0.38)} className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-7 text-xs text-slate-400">
              <button onClick={onOpenCvModal} className="inline-flex items-center gap-2 hover:text-white transition-colors py-2"><FileDown size={15} />{isAr ? 'السيرة الذاتية' : 'View résumé'}</button>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            </motion.div>
          </div>

          <motion.div {...reveal(0.25)} className="relative min-w-0">
            <div className="studio-glow" aria-hidden="true" />
            <TiltCard maxTilt={6} scale={1.01} glowColor="amber" className="rounded-3xl">
              <div className="studio-panel relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl" dir="ltr">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                  <div className="flex gap-1.5" aria-hidden="true"><i className="size-2 rounded-full bg-[#ff6258]/80" /><i className="size-2 rounded-full bg-[#ffbf48]/80" /><i className="size-2 rounded-full bg-[#40c96b]/80" /></div>
                  <span className="text-[10px] uppercase tracking-[.18em] text-slate-500 font-mono">awad / engineering studio</span>
                  <Code2 size={15} className="text-slate-500" />
                </div>
                <figure className="relative m-0 aspect-[5/4] overflow-hidden border-b border-amber-300/15" aria-label={isAr ? 'صورة عوض وجدي' : 'Portrait of Awad Wagdy'}>
                  <img src="/awad-portrait.webp" width={900} height={1000} fetchPriority="high" alt={isAr ? 'عوض وجدي — مهندس برمجيات' : 'Awad Wagdy — Software Engineer'} className="h-full w-full object-cover object-[50%_20%]" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101521] via-transparent to-transparent" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-2xl border border-white/15" />
                  <figcaption className="absolute bottom-5 inset-x-6 flex items-end justify-between gap-3" dir={isAr ? 'rtl' : 'ltr'}>
                    <div><p className="text-[10px] font-mono uppercase tracking-[.22em] text-amber-200 mb-1">Behind the work</p><p className="text-xl font-bold text-white">{isAr ? PERSONAL_INFO.nameAr : PERSONAL_INFO.nameEn}</p></div>
                    <span className="text-[10px] text-amber-100 border border-amber-200/25 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5">{isAr ? 'مهندس برمجيات' : 'Software Engineer'}</span>
                  </figcaption>
                </figure>
                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between mb-7"><span className="text-[10px] tracking-[.2em] font-mono text-amber-300">SELECTED EXPERTISE</span><span className="text-[10px] font-mono text-slate-500">0{active + 1} / 03</span></div>
                  <AnimatePresence mode="wait">
                    <motion.div key={active} id="expertise-panel" role="tabpanel" aria-labelledby={`expertise-tab-${active}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center gap-4"><div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-3 text-amber-300"><selected.icon size={27} /></div><div><h2 className="text-xl sm:text-2xl font-bold tracking-tight">{selected.title}</h2><p className="text-xs text-slate-400 mt-1" dir={isAr ? 'rtl' : 'ltr'}>{selected.subtitle}</p></div></div>
                      <div className="flex flex-wrap gap-2 mt-5">{selected.tags.map(tag => <span key={tag} className="text-[10px] px-2.5 py-1.5 border border-white/10 rounded-md text-slate-300">{tag}</span>)}</div>
                      <div className="mt-6 flex items-center gap-2 text-xs text-slate-400" dir={isAr ? 'rtl' : 'ltr'}><Check size={14} className="text-emerald-400 shrink-0" />{selected.detail}</div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div role="tablist" aria-label={isAr ? 'مجالات التخصص' : 'Expertise areas'} className="grid grid-cols-3 border-t border-white/8" dir={isAr ? 'rtl' : 'ltr'}>
                  {disciplines.map((item, index) => <button key={index} id={`expertise-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="expertise-panel" tabIndex={active === index ? 0 : -1} onKeyDown={event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (active + ((event.key === 'ArrowRight') !== isAr ? 1 : 2)) % 3; setActive(next); document.getElementById(`expertise-tab-${next}`)?.focus(); } }} onClick={() => setActive(index)} className={`py-4 px-2 text-[10px] sm:text-xs transition-colors border-t-2 ${active === index ? 'text-amber-200 bg-amber-400/5 border-amber-400' : 'text-slate-500 hover:text-slate-200 border-transparent'}`}>{item.label}</button>)}
                </div>
              </div>
            </TiltCard>
            <div className="mt-5 flex justify-center items-center gap-2 text-[10px] font-mono tracking-wider text-slate-500"><span className="w-6 h-px bg-amber-400/40" />{isAr ? 'حلول عملية. تفاصيل مدروسة.' : 'REAL SYSTEMS. THOUGHTFUL DETAILS.'}<span className="w-6 h-px bg-amber-400/40" /></div>
          </motion.div>
        </div>
        <motion.div {...reveal(0.45)} className="hero-bottom grid grid-cols-2 md:grid-cols-4 border-t border-white/10 py-7 gap-6 text-sm">
          {[['2+', isAr ? 'سنوات خبرة في الجودة' : 'Years in quality assurance'], ['Offline / Online', isAr ? 'أنظمة مصممة لعملك' : 'Purpose-built desktop systems'], ['2D / 3D', isAr ? 'رؤية الحاسوب و LiDAR' : 'Computer vision & LiDAR']].map(([value, label]) => <div key={value}><div className="font-semibold text-slate-200 mb-1 font-mono" dir="ltr">{value}</div><div className="text-xs text-slate-500">{label}</div></div>)}
          <a href="#about" className="flex items-center gap-3 md:justify-end text-slate-400 hover:text-amber-300 transition-colors text-xs"><span>{isAr ? 'اكتشف المزيد' : 'Scroll to discover'}</span><span className="border border-white/15 rounded-full p-3"><ArrowDown size={16} /></span></a>
        </motion.div>
      </div>
    </section>
  );
}
