import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { GraduationCap, Languages, Award, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';

export function EducationLanguages({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-16 lg:py-20 border-b border-slate-800/80 bg-[#090d15]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Section Header */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
              {isAr ? '06. التعليم واللغات' : '06. Education & Languages'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {isAr ? 'المؤهل الأكاديمي واللغات' : 'Academic Credentials'}
            </h2>
            <p className="text-xs text-slate-400">
              {isAr ? 'الخلفية الأكاديمية والقدرات اللغوية في التواصل والتوثيق' : 'Formal academic foundation and multilingual communication'}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <TiltCard glowColor="amber" maxTilt={8}>
              <div className="p-6 rounded-2xl bg-[#0f1422]/95 border border-slate-800/90 h-full shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                    <GraduationCap className="w-4 h-4" />
                    <span>{isAr ? 'المؤهل الجامعي' : 'Degree & Major'}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">01/2022</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {isAr ? PERSONAL_INFO.educationDegreeAr : PERSONAL_INFO.educationDegreeEn}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-mono mt-1">
                    {isAr ? PERSONAL_INFO.educationCollegeAr : PERSONAL_INFO.educationCollegeEn}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr
                    ? 'دراسة شاملة لنظم المعلومات الإدارية، قواعد البيانات، تحليل النظم، وهندسة البرمجيات التجارية وإدارة المشاريع التقنية.'
                    : 'Comprehensive degree covering Management Information Systems, database architecture, systems analysis, and enterprise software engineering.'}
                </p>
              </div>
            </TiltCard>

            {/* Languages Card */}
            <TiltCard glowColor="cyan" maxTilt={8}>
              <div className="p-6 rounded-2xl bg-[#0f1422]/95 border border-slate-800/90 h-full shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                    <Languages className="w-4 h-4" />
                    <span>{isAr ? 'اللغات والتواصل' : 'Language Fluency'}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">2 Languages</span>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-100 font-bold">{isAr ? 'اللغة العربية' : 'Arabic'}</span>
                      <span className="text-xs font-mono text-amber-400">{isAr ? 'اللغة الأم' : 'Native'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-100 font-bold">{isAr ? 'اللغة الإنجليزية' : 'English'}</span>
                      <span className="text-xs font-mono text-cyan-400">{isAr ? 'جيد جداً (تقني وعام)' : 'Professional Working'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-cyan-400 h-1.5 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                  {isAr
                    ? 'كتابة وتوثيق المواصفات التقنية وقراءة المراجع الهندسية والتواصل اليومي بكفاءة.'
                    : 'Fluent technical documentation, specification writing, and client communication.'}
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
