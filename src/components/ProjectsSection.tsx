import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Language } from '../types';
import { AlaminShowcase } from './AlaminShowcase';
import { AminCatalogShowcase } from './AminCatalogShowcase';

const ErpPosShowcase = lazy(() => import('./ErpPosShowcase').then(module => ({ default: module.ErpPosShowcase })));
const LidarSimulation = lazy(() => import('./LidarSimulation').then(module => ({ default: module.LidarSimulation })));
type ProjectFilter = 'all' | 'alamin' | 'catalog' | 'pos' | 'lidar';

export function ProjectsSection({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<ProjectFilter>('all');
  const [showOtherDemos, setShowOtherDemos] = useState(false);
  const filters: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: isAr ? 'الكل' : 'All' },
    { id: 'alamin', label: isAr ? 'موقع شركة الأمين' : 'Al-Amin Platform' },
    { id: 'catalog', label: isAr ? 'كتالوج الأمين' : 'Al-Amin Catalog' },
    { id: 'pos', label: isAr ? 'عرض نظام الفارس' : 'AL FARES demo' },
    { id: 'lidar', label: isAr ? 'محاكاة LiDAR' : 'LiDAR simulation' },
  ];
  const showDemos = activeProject === 'pos' || activeProject === 'lidar' || (activeProject === 'all' && showOtherDemos);

  return (
    <section id="portfolio" className="py-16 lg:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">{isAr ? '03. أعمال مختارة' : '03. Selected work'}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">{isAr ? 'مشاريعي على أرض الواقع' : 'A closer look at my work'}</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{isAr ? 'موقع الأمين للبرجولات والكتالوج الرقمي: لقطات حقيقية من المشاريع المنفذة، والتفاصيل متاحة عند الطلب.' : 'Al-Amin’s website and digital catalog — real screenshots from the delivered projects, with details available on request.'}</p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={isAr ? 'تصفية المشاريع' : 'Filter projects'}>
          {filters.map(filter => <button key={filter.id} type="button" aria-pressed={activeProject === filter.id} onClick={() => setActiveProject(filter.id)} className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${activeProject === filter.id ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'}`}>{filter.label}</button>)}
        </div>

        <motion.div key={activeProject} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-8">
          {(activeProject === 'all' || activeProject === 'alamin' || activeProject === 'catalog') && (
            <div className={activeProject === 'all' ? 'grid gap-6 md:grid-cols-2' : 'max-w-2xl'}>
              {(activeProject === 'all' || activeProject === 'alamin') && <AlaminShowcase lang={lang} />}
              {(activeProject === 'all' || activeProject === 'catalog') && <AminCatalogShowcase lang={lang} />}
            </div>
          )}
          {activeProject === 'all' && (
            <button type="button" aria-expanded={showOtherDemos} aria-controls="other-project-demos" onClick={() => setShowOtherDemos(value => !value)} className="min-h-11 text-sm text-slate-400 underline underline-offset-4 hover:text-amber-300">{isAr ? (showOtherDemos ? 'إخفاء العروض التوضيحية الأخرى' : 'عرض نظام الفارس ومحاكاة LiDAR') : (showOtherDemos ? 'Hide other interactive demos' : 'View AL FARES & LiDAR demos')}</button>
          )}
          <div id="other-project-demos" hidden={!showDemos}>
            {showDemos && <Suspense fallback={<p role="status" className="p-8 text-center text-sm text-slate-400">{isAr ? 'جاري تحميل العرض…' : 'Loading demo…'}</p>}>
              <div className="space-y-8">
                <p className="text-xs text-slate-400">{isAr ? 'عروض تفاعلية داخل البورتفوليو — وليست جزءاً من مشاريع العملاء أعلاه.' : 'Interactive portfolio demos — not part of the client projects above.'}</p>
                {(activeProject === 'all' || activeProject === 'pos') && <ErpPosShowcase lang={lang} />}
                {(activeProject === 'all' || activeProject === 'lidar') && <LidarSimulation lang={lang} />}
              </div>
            </Suspense>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
