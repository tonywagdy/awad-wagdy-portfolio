/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationLanguages } from './components/EducationLanguages';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrintableCvModal } from './components/PrintableCvModal';
import { Global3DBackground } from './components/Global3DBackground';
import { InteractiveCursor } from './components/InteractiveCursor';
import { FloatingMotionHUD } from './components/FloatingMotionHUD';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try { return localStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en'; }
    catch { return 'en'; }
  });
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try { localStorage.setItem('portfolio-language', lang); } catch { /* Storage may be unavailable in private contexts. */ }
  }, [lang]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.firstElementChild?.classList.add('section-enter');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('main > section:not(#home)').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const scrollToContact = (service?: string) => {
    if (service) {
      setPreselectedService(service);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="app-shell min-h-screen bg-[#0B0D13] text-slate-100 selection:bg-amber-500/25 selection:text-amber-300 relative isolate">
      <a href="#main-content" className="skip-link">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
      {/* Global Interactive 3D Ambient Canvas Background */}
      <Global3DBackground />

      {/* Dynamic Cursor Light Aura Follower */}
      <InteractiveCursor />

      {/* Floating HUD with scroll progress & quick action */}
      <FloatingMotionHUD lang={lang} onOpenContact={() => scrollToContact()} />

      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenContact={() => scrollToContact()}
      />

      <main id="main-content" tabIndex={-1} className="relative z-10">
        <Hero
          lang={lang}
          onOpenContact={() => scrollToContact()}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        <AboutSection
          lang={lang}
          onOpenContact={() => scrollToContact()}
        />

        <ServicesSection
          lang={lang}
          onSelectService={(serviceName) => scrollToContact(serviceName)}
        />

        <ProjectsSection
          lang={lang}
        />

        <ExperienceSection
          lang={lang}
        />

        <SkillsSection
          lang={lang}
        />

        <EducationLanguages
          lang={lang}
        />

        <ContactSection
          lang={lang}
          preselectedService={preselectedService}
        />
      </main>

      <Footer
        lang={lang}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {isCvModalOpen && (
        <PrintableCvModal
          lang={lang}
          onClose={() => setIsCvModalOpen(false)}
        />
      )}
    </div>
    </MotionConfig>
  );
}
