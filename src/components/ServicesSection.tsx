import { Language } from '../types';
import { SERVICES_LIST } from '../data/cvData';
import { Globe, Monitor, Scan, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ lang, onSelectService }: ServicesProps) {
  const isAr = lang === 'ar';

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Monitor': return Monitor;
      case 'Scan': return Scan;
      default: return Globe;
    }
  };

  const getServiceGlowColor = (idx: number): 'amber' | 'blue' | 'cyan' => {
    if (idx === 0) return 'amber';
    if (idx === 1) return 'blue';
    return 'cyan';
  };

  return (
    <section id="services" className="py-16 lg:py-20 border-b border-slate-800/80 bg-[#090d15]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
            {isAr ? '02. الخدمات والحلول البرمجية' : '02. Services & Engineering'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {isAr ? 'ما الذي يمكنني تصميمه وبرمجته لك؟' : 'What I Build & Deliver'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {isAr
              ? 'أقدم حلولاً برمجية متكاملة مصممة خصيصاً لتلبية متطلبات عملك؛ سواء كنت تحتاج موقع ويب مميز لخدمتك، أو برنامج ديسكتوب احترافي لإدارة محلك ومخزنك، أو تدقيق عالي الدقة لبيانات رؤية الحاسوب.'
              : 'End-to-end bespoke digital systems: custom high-converting web platforms, offline-first retail desktop cashier software, and autonomous vehicle vision QA.'}
          </p>
        </div>

        {/* 3 Services Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <TiltCard key={service.id} glowColor={getServiceGlowColor(idx)} maxTilt={6} className="h-full">
                <div className="rounded-2xl bg-[#0f1422] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group h-full shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                        {isAr ? service.titleAr : service.titleEn}
                      </h3>
                      <p className="text-xs text-amber-400/90 font-mono mt-1">
                        {isAr ? service.taglineAr : service.taglineEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? service.descriptionAr : service.descriptionEn}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-400 block font-mono">
                        {isAr ? 'أهم المزايا والمخرجات:' : 'Key Deliverables:'}
                      </span>
                      {(isAr ? service.featuresAr : service.featuresEn).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => onSelectService(isAr ? service.titleAr : service.titleEn)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 hover:border-amber-500 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <span>{isAr ? 'اطلب هذا المشروع الآن' : 'Request This Solution'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
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
