import { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, MessageSquare } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenContact: () => void;
}

const sections = ['about', 'services', 'portfolio', 'experience', 'skills'] as const;
const focusStyle = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0D13]';

export function Navbar({ lang, onToggleLang, onOpenContact }: NavbarProps) {
  const isAr = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const labels = isAr ? ['نبذة عني', 'الخدمات', 'الأعمال', 'الخبرات', 'المهارات'] : ['About', 'Services', 'Portfolio', 'Experience', 'Skills'];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
      // Use the fixed header line rather than intersection ratios for tall sections.
      let current = '';
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 150) current = id;
      }
      setActiveSection(previous => previous === current ? previous : current);
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMobileMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  const links = (mobile = false) => sections.map((id, index) => (
    <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}
      onClick={() => setMobileMenuOpen(false)}
      className={`${focusStyle} relative rounded-lg whitespace-nowrap transition-colors motion-reduce:transition-none ${mobile ? 'block px-4 py-3' : 'px-2 py-3'} ${activeSection === id ? 'text-amber-300 bg-amber-400/10' : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'}`}>
      {labels[index]}
      {!mobile && activeSection === id && <span aria-hidden="true" className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-amber-400" />}
    </a>
  ));

  return (
    <header ref={headerRef} dir={isAr ? 'rtl' : 'ltr'} className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0D13]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-3 lg:gap-5">
          <a href="#" aria-label={isAr ? 'عوض وجدي عوض — الرئيسية' : 'Awad Wagdy Awad — Home'} onClick={() => setMobileMenuOpen(false)} className={`${focusStyle} flex min-w-0 items-center gap-2.5 rounded-lg`}>
            <span aria-hidden="true" className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-xs font-black text-amber-300" dir="ltr">AW<span className="sr-only">.</span></span>
            <span className="text-sm sm:text-base font-bold tracking-tight text-slate-100">{isAr ? 'عوض وجدي عوض' : 'Awad Wagdy Awad'}<span className="text-amber-400">.</span></span>
          </a>
          <nav aria-label={isAr ? 'التنقل الرئيسي' : 'Primary navigation'} className="hidden lg:flex items-center gap-1 xl:gap-3 text-xs font-semibold">{links()}</nav>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={onToggleLang} aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'} className={`${focusStyle} flex min-h-11 items-center gap-1.5 rounded-xl border border-white/10 px-2.5 text-xs font-semibold text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition-colors motion-reduce:transition-none`}>
              <Globe aria-hidden="true" className="w-4 h-4 text-amber-400" /><span lang={isAr ? 'en' : 'ar'}>{isAr ? 'EN' : 'العربية'}</span>
            </button>
            <button type="button" onClick={onOpenContact} className={`${focusStyle} hidden sm:flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-4 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors motion-reduce:transition-none`}>
              <MessageSquare aria-hidden="true" className="w-4 h-4" /><span>{isAr ? 'لنتحدث' : "Let's Talk"}</span>
            </button>
            <button ref={toggleRef} type="button" onClick={() => setMobileMenuOpen(open => !open)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={isAr ? (mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة') : (mobileMenuOpen ? 'Close menu' : 'Open menu')} className={`${focusStyle} lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-slate-200 hover:bg-white/5`}>
              {mobileMenuOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" inert={!mobileMenuOpen} aria-hidden={!mobileMenuOpen} className={`grid lg:hidden transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="min-h-0 overflow-hidden">
            <nav aria-label={isAr ? 'التنقل عبر الهاتف' : 'Mobile navigation'} className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/10 py-3 space-y-1 text-sm font-semibold">
              {links(true)}
              <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenContact(); }} className={`${focusStyle} w-full rounded-xl bg-amber-400 px-4 py-3 text-slate-950 font-bold`}>{isAr ? 'تواصل معي' : 'Start a conversation'}</button>
            </nav>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/5"><div ref={progressRef} className="h-full bg-amber-400" style={{ transform: 'scaleX(0)', transformOrigin: isAr ? 'right' : 'left' }} /></div>
    </header>
  );
}
