import { Language } from '../types';
import { WORK_EXPERIENCE } from '../data/cvData';
import { Calendar, Building, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';

export function ExperienceSection({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';

  return (
    <section id="experience" className="py-16 lg:py-20 border-b border-slate-800/80 bg-[#090d15]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Section Header */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
              {isAr ? '04. الخبرات المهنية' : '04. Work Experience'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {isAr ? 'المسيرة الوظيفية ومحطات العمل' : 'Professional Career Timeline'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'خبرة تصاعدية في شركة مايكرو إنجينيرنج مصر بدأت بتسمية البيانات وصولاً إلى فني مراقبة الجودة وضمان معايير الاعتماد.'
                : 'Progressive trajectory at Micro Engineering Egypt from data annotation to leading quality control audits.'}
            </p>
          </div>

          {/* Timeline Items */}
          <div className="lg:col-span-8 space-y-6">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <TiltCard key={idx} glowColor={idx === 0 ? 'cyan' : 'blue'} maxTilt={6}>
                <div className="p-6 rounded-2xl bg-[#0f1422]/95 border border-slate-800/90 hover:border-slate-700/80 transition-all space-y-4 shadow-lg backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">
                        {isAr ? exp.roleAr : exp.roleEn}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mt-0.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{isAr ? exp.companyAr : exp.companyEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-[#090d15] px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2 text-xs text-slate-300">
                    {(isAr ? exp.descriptionAr : exp.descriptionEn).map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
