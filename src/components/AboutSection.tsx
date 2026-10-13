import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { ShieldCheck, Eye, Cpu } from 'lucide-react';
import { TiltCard } from './TiltCard';

export function AboutSection({ lang, onOpenContact }: { lang: Language; onOpenContact: () => void }) {
  const isAr = lang === 'ar';

  return (
    <section id="about" className="py-16 lg:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Label */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
              {isAr ? '01. نبذة مهنية وتخصصية' : '01. Professional Bio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {isAr ? 'عن خبراتي ومنهجيتي في العمل' : 'Precision Engineering & QA Mindset'}
            </h2>
            <p className="text-xs text-slate-400">
              {isAr ? 'دمج دقة فحص بيانات الذكاء الاصطناعي مع قوة بناء أنظمة الديسكتوب والويب' : 'Uniting AI data verification rigor with desktop systems & web engineering'}
            </p>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-8 space-y-6 text-sm text-slate-300 leading-relaxed">
            <p>
              {isAr ? (
                <>
                  أعمل كمهندس برمجيات ومحترف في <strong>ضمان ومراقبة جودة البيانات (Data QA)</strong>، وأجمع بين مسارين تقنيين متكاملين يدعم كل منهما الآخر بأعلى درجات الدقة والاحترافية.
                </>
              ) : (
                <>
                  I am a <strong>Software Engineer and Computer Vision Quality Assurance specialist</strong> who bridges industrial data verification rigor with full-scale software system delivery.
                </>
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <TiltCard glowColor="amber" maxTilt={7} className="h-full">
                <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 space-y-2 h-full shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                    <Cpu className="w-4 h-4" />
                    <span>{isAr ? 'المسار الأول: تطوير برامج الديسكتوب (أوفلاين وأونلاين)' : 'Track 1: Custom Desktop Applications (Offline & Online)'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr
                      ? 'متخصص في بناء وتطوير كافة برامج الديسكتوب لأي نشاط تجاري أو خدمي أو مؤسسي. يشمل ذلك الأنظمة المستقلة التي تعمل بدون إنترنت 100% بقواعد بيانات SQLite محلية فائقة السرعة، أو الأنظمة المتصلة سحابياً للمزامنة وتعدد الصلاحيات (مثل نظام الفارس ERP & POS).'
                      : 'Specialized in architecting and delivering high-performance desktop software for any commercial or enterprise domain—from standalone 100% offline-first applications with embedded SQLite engines to cloud-synchronized multi-branch distributed systems.'}
                  </p>
                </div>
              </TiltCard>

              <TiltCard glowColor="cyan" maxTilt={7} className="h-full">
                <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 space-y-2 h-full shadow-lg">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                    <Eye className="w-4 h-4" />
                    <span>{isAr ? 'المسار الثاني: جودة بيانات رؤية الحاسوب والـ LiDAR والويب' : 'Track 2: Autonomous Vision QA & Full-Stack Web'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr
                      ? 'تدقيق وتطوير مجموعات بيانات السيارات ذاتية القيادة (2D/3D Bounding Boxes، سحابة نقاط LiDAR ثلاثية الأبعاد، والتقطيع الدلالي) بشركة مايكرو إنجينيرنج مصر، وتصميم مواقع ويب متكاملة وكتالوجات رقمية للشركات (مثل موقع وكتالوج الأمين للبرجولات).'
                      : 'Auditing 3D LiDAR point clouds, 2D/3D bounding boxes, and semantic segmentation masks for autonomous vehicle ML models at Micro Engineering Egypt, alongside developing bespoke commercial websites and interactive catalogs.'}
                  </p>
                </div>
              </TiltCard>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-cyan-500/5 to-transparent border border-amber-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-3 shadow-md">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block mb-0.5">
                  {isAr ? 'فلسفة العمل: عقلية تدقيق الجودة (QA Mindset)' : 'Core Engineering Philosophy: The QA Mindset'}
                </strong>
                <span>
                  {isAr
                    ? 'أطبّق نفس المعايير الصارمة التي أستخدمها في تدقيق بيانات سيارات القيادة الذاتية (الدقة، الاتساق، الانتباه لأدق التفاصيل، واكتشاف الحالات الحدية Edge Cases) في بناء وتصميم البرمجيات، مما يضمن خلو التطبيقات من الأخطاء وثباتها التام في بيئة العمل الحقيقية.'
                    : 'I apply the exact same uncompromising rigor demanded by autonomous driving perception benchmarks—zero error margins, edge-case mitigation, and mathematical consistency—directly into software architecture, delivering robust, high-performance desktop and web applications.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
