import { useState } from 'react';
import { ImageOff, Lock } from 'lucide-react';
import { Language } from '../types';

interface RealProjectCardProps {
  lang: Language;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
}

export function RealProjectCard({ lang, title, category, description, image, technologies }: RealProjectCardProps) {
  const isAr = lang === 'ar';
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111620] transition-colors hover:border-amber-400/30" aria-label={title}>
      <div className="relative aspect-[36/25] overflow-hidden bg-slate-900">
        {imageFailed ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-sm text-slate-400"><ImageOff aria-hidden="true" size={28} />{isAr ? 'الصورة مش متاحة حالياً' : 'Screenshot unavailable'}</span>
        ) : (
          <img src={image} alt={isAr ? `لقطة شاشة من ${title}` : `Screenshot of ${title}`} width={1440} height={1000} loading="lazy" decoding="async" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px]"><span className="font-semibold text-amber-300">{category}</span><span className="text-slate-400">{isAr ? 'مشروع منفذ فعلياً' : 'Delivered project'}</span></div>
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
        <ul aria-label={isAr ? 'التقنيات المستخدمة' : 'Technologies used'} className="mt-5 mb-6 flex flex-wrap gap-2">
          {technologies.map(technology => <li key={technology} className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-slate-300" dir="ltr">{technology}</li>)}
        </ul>
        <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-slate-500">
          <Lock aria-hidden="true" size={14} className="shrink-0" />
          <span>{isAr ? 'تفاصيل وروابط المشروع متاحة عند الطلب' : 'Project details & links available on request'}</span>
        </div>
      </div>
    </article>
  );
}
