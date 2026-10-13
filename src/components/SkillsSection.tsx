import { Language } from '../types';
import { SKILL_CATEGORIES } from '../data/cvData';
import { TiltCard } from './TiltCard';

export function SkillsSection({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';

  return (
    <section id="skills" className="py-16 lg:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
            {isAr ? '05. المهارات والقدرات الأساسية' : '05. Core Skills Matrix'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {isAr ? 'المصفوفة التقنية والأدوات التشغيلية' : 'Technical Proficiency & Platforms'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {isAr
              ? 'مجموعة متكاملة من مهارات تدقيق جودة مجسات القيادة الذاتية وهندسة تطبيقات الويب والديسكتوب.'
              : 'Categorized technical capabilities across autonomous vehicle sensor audits and modern full-stack engineering.'}
          </p>
        </div>

        {/* 4 Categorized Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const glow = (['amber', 'blue', 'cyan', 'emerald'] as const)[idx % 4];
            return (
              <TiltCard key={idx} glowColor={glow} maxTilt={9}>
                <div className="p-6 rounded-2xl bg-[#0f1422]/95 border border-slate-800/90 hover:border-slate-700/80 flex flex-col justify-between h-full shadow-lg backdrop-blur-sm transition-all space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                      <h3 className="font-bold text-slate-100">
                        {isAr ? category.titleAr : category.titleEn}
                      </h3>
                      <span className="text-slate-500 font-mono">0{idx + 1}</span>
                    </div>

                    <div className="pt-3 space-y-2.5">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 font-medium">{skill.name}</span>
                          {skill.badge && (
                            <span className="text-[11px] font-mono text-amber-400/90 font-medium">
                              {skill.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
