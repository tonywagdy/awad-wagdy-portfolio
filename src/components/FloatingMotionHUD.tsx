import { useState, useEffect, useRef } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface FloatingMotionHUDProps {
  lang: Language;
  onOpenContact: () => void;
}

const circumference = 2 * Math.PI * 18;

export function FloatingMotionHUD({ lang, onOpenContact }: FloatingMotionHUDProps) {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<SVGCircleElement>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (progressRef.current) progressRef.current.style.strokeDashoffset = String(circumference * (1 - progress));
      setIsVisible(window.scrollY > 300 && total > 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(document.documentElement);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
  };
  const focusStyle = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} inert={!isVisible} aria-hidden={!isVisible} className={`fixed end-4 sm:end-6 z-40 flex items-center gap-2.5 transition-[opacity,transform] duration-200 motion-reduce:transition-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`} style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
      <button type="button" onClick={onOpenContact} className={`${focusStyle} hidden sm:flex min-h-12 items-center gap-2 px-4 rounded-full bg-slate-900/95 hover:bg-slate-800 text-amber-400 border border-amber-400/25 text-xs font-semibold shadow-xl shadow-black/20 backdrop-blur-md transition-colors motion-reduce:transition-none`}>
        <MessageCircle aria-hidden="true" className="w-4 h-4" /><span className="text-slate-200">{isAr ? 'تواصل معي' : 'Get in touch'}</span>
      </button>
      <button type="button" onClick={scrollToTop} aria-label={isAr ? 'العودة للأعلى' : 'Back to top'} title={isAr ? 'العودة للأعلى' : 'Back to top'} className={`${focusStyle} relative w-12 h-12 rounded-full bg-slate-900/95 hover:bg-slate-800 border border-slate-700/80 text-amber-400 flex items-center justify-center shadow-xl shadow-black/20 backdrop-blur-md transition-colors motion-reduce:transition-none`}>
        <svg aria-hidden="true" viewBox="0 0 48 48" className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0">
          <circle cx="24" cy="24" r="18" strokeWidth="2" stroke="currentColor" className="text-slate-800" fill="none" />
          <circle ref={progressRef} cx="24" cy="24" r="18" strokeWidth="2" stroke="currentColor" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference} strokeLinecap="round" />
        </svg>
        <ArrowUp aria-hidden="true" className="w-4 h-4 text-slate-200" />
      </button>
    </div>
  );
}
