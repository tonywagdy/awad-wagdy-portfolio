import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { ArrowUp } from 'lucide-react';

export function Footer({ lang, onOpenCvModal }: { lang: Language; onOpenCvModal: () => void }) {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-10 bg-[#080b13] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <span className="font-bold text-slate-200">
              {isAr ? PERSONAL_INFO.nameAr : PERSONAL_INFO.nameEn}
            </span>
            <p className="text-slate-500 text-[11px]">
              {isAr 
                ? 'مهندس برمجيات ومطور برامج ديسكتوب (أوفلاين وأونلاين) وتطبيقات ويب متكاملة · أخصائي جودة رؤية الحاسوب' 
                : 'Full-Stack Software Engineer & Desktop Systems Specialist (Offline & Online) · Computer Vision & LiDAR QA'}
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-slate-400">
            <button
              onClick={onOpenCvModal}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              {isAr ? 'السيرة الذاتية (CV)' : 'Resume (CV)'}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title={isAr ? 'الرجوع للأعلى' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} {isAr ? 'عوض وجدي عوض. جميع الحقوق محفوظة.' : 'Awad Wagdy Awad. All rights reserved.'}
          </span>
          <div className="flex items-center gap-2 font-mono">
            <span>Ain Shams, Cairo</span>
            <span>·</span>
            <span>twagdy067@gmail.com</span>
            <span>·</span>
            <span dir="ltr" style={{ unicodeBidi: 'isolate' }} className="tabular-nums font-bold text-slate-400">
              +20 120 233 2355
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
