export type Language = 'ar' | 'en';

export type DesktopModule = 
  | 'pos'
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'purchases'
  | 'customers'
  | 'suppliers'
  | 'expenses'
  | 'reports'
  | 'users'
  | 'settings';

export interface ProjectScreenshot {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: DesktopModule;
  badge: string;
  badgeAr: string;
  highlights: string[];
  highlightsAr: string[];
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  featuresAr: string[];
  featuresEn: string[];
}

export interface ExperienceItem {
  period: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  descriptionAr: string[];
  descriptionEn: string[];
  skills: string[];
}

export interface SkillCategory {
  titleAr: string;
  titleEn: string;
  skills: {
    name: string;
    level?: string;
    badge?: string;
  }[];
}
