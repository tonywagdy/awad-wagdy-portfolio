import { Language } from '../types';
import { RealProjectCard } from './RealProjectCard';

export function AminCatalogShowcase({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  return <RealProjectCard
    lang={lang}
    title={isAr ? 'كتالوج الأمين للبرجولات' : 'Al-Amin Pergolas Catalog'}
    category={isAr ? 'كتالوج تفاعلي' : 'Interactive catalog'}
    description={isAr ? 'كتالوج لتصفح أعمال الأمين بتقليب الصفحات أو العرض الشبكي، مع البحث والتصفية، وتكبير الصور وتنزيلها، والاستفسار عن التصميم عبر WhatsApp.' : 'A catalog for browsing Al-Amin’s work in a page-flip or grid view, with search and filters, image zoom and downloads, and WhatsApp design inquiries.'}
    image="/projects/catalog.jpg"
    technologies={['React', 'JavaScript', 'Vite', 'react-pageflip']}
  />;
}
