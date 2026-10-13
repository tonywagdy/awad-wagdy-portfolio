import { Language } from '../types';
import { RealProjectCard } from './RealProjectCard';

export function AlaminShowcase({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  return <RealProjectCard
    lang={lang}
    title={isAr ? 'موقع الأمين للبرجولات' : 'Al-Amin Pergolas Website'}
    category={isAr ? 'موقع شركة' : 'Business website'}
    description={isAr ? 'موقع لعرض خدمات وأعمال شركة الأمين للبرجولات، بمعرض صور قابل للتصفية، ومقارنة قبل وبعد، والتواصل عبر WhatsApp للاستفسار عن التصميم.' : 'A website showcasing Al-Amin’s pergolas and services, with a filterable photo gallery, before-and-after comparisons, and design inquiries through WhatsApp.'}
    image="/projects/alamin.jpg"
    technologies={['React', 'TypeScript', 'Tailwind CSS', 'Firebase']}
  />;
}
