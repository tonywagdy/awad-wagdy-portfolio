import { useState } from 'react';
import { 
  Monitor, 
  Layers, 
  TrendingUp, 
  FileCheck2, 
  Users, 
  Package, 
  Clock, 
  Maximize2, 
  Play, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Database,
  Printer,
  Boxes,
  Lock,
  Cpu
} from 'lucide-react';
import { ERP_POS_SCREENSHOTS } from '../data/cvData';
import { DesktopModule, Language } from '../types';
import { PosSimulator } from './PosSimulator';

export function ErpPosShowcase({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  const [activeModuleView, setActiveModuleView] = useState<string>('simulator');

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Top Banner / Case Study Header */}
      <div className="bg-[#101628] border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden w-full max-w-full">
        <div className="absolute top-0 end-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-amber-400 font-semibold">
                {isAr ? 'مشروع ديسكتوب حقيقي تم تسليمه لعميل' : 'Delivered Client Desktop Software System'}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">
                {isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">
                {isAr ? 'قيد التشغيل الفعلي' : 'Live In Active Production'}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-black text-slate-100 tracking-tight">
              {isAr ? 'نظام الفارس المتكامل لإدارة المتاجر والمخازن والكاشير' : 'AL FARES ERP & POS Integrated Desktop Suite'}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'نظام ديسكتوب مؤسسي متكامل تم تطويره خصيصاً لعميل لإدارة عملياته التجارية والمخزنية بالكامل. يعمل بنظام أوفلاين 100% مع قاعدة بيانات SQLite محلية فائقة السرعة، ويشمل نقطة بيع سريعة تدعم قارئ الباركود والطابعات الحرارية، حسابات الأرباح اللحظية، دليل الموردين والعملاء والذمم، وتوليد الفواتير بصيغة PDF وأرشفتها آلياً.'
                : 'A comprehensive, mission-critical desktop suite engineered for a commercial client to manage retail operations, warehouse inventory, and multi-user roles. Architected with a 100% offline-first embedded SQLite engine for zero-latency queries, featuring hotkey POS checkout, live financial accounting, supplier payables, customer credit ledgers, and automated local PDF receipt archiving.'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1 font-mono">
              <span className="text-blue-400 font-semibold">
                {isAr 
                  ? 'التقنيات: ديسكتوب مستقل · قاعدة بيانات SQLite محلية · طابعات حرارية ESC/POS · قارئات الباركود' 
                  : 'Architecture: Standalone Desktop · Embedded SQLite · ESC/POS Thermal Printing · Barcode Scanners'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="p-4 rounded-xl bg-[#090d18] border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-500">{isAr ? 'الشاشات المنجزة:' : 'Production Modules:'}</span>
                <span className="font-bold text-amber-400">10 {isAr ? 'شاشات متكاملة' : 'Core Modules'}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-500">{isAr ? 'الأمان والاستقرار:' : 'Reliability:'}</span>
                <span className="text-emerald-400">{isAr ? 'يعمل بدون إنترنت 100%' : '100% Offline Capable'}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-500">{isAr ? 'إدارة الصلاحيات:' : 'Role Security:'}</span>
                <span className="text-blue-400">{isAr ? 'صاحب المحل / كاشير' : 'Owner / Cashier RBAC'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-start gap-2.5">
            <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-200">{isAr ? 'قاعدة بيانات محلية سريعة' : 'Embedded Local Database'}</div>
              <div className="text-[11px] text-slate-400">{isAr ? 'استعلامات فورية بدون بطء' : 'Zero network latency queries'}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-start gap-2.5">
            <Printer className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-200">{isAr ? 'طابعات فواتير وأرشفة PDF' : 'Thermal POS & PDF Archive'}</div>
              <div className="text-[11px] text-slate-400">{isAr ? 'حفظ تلقائي للفواتير' : 'Automated local PDF backup'}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-200">{isAr ? 'صلاحيات دقيقة وأمان' : 'Granular Role Security'}</div>
              <div className="text-[11px] text-slate-400">{isAr ? 'حجب الأرباح عن الكاشير' : 'Cost & margin shielding'}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-start gap-2.5">
            <Boxes className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-200">{isAr ? 'جرد وتنبيهات النواقص' : 'Inventory & Reorders'}</div>
              <div className="text-[11px] text-slate-400">{isAr ? 'تتبع 100+ صنف راكد ونواقص' : 'Audit logs & reorder triggers'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Desktop Simulator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300 font-bold">
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
            <span>{isAr ? 'المحاكي التفاعلي المباشر للبرنامج (انقر على القائمة الجانبية لتصفح جميع الشاشات الـ 10):' : 'Interactive Live Desktop Simulator (Click sidebar icons to test all 10 modules):'}</span>
          </span>
          <span className="text-amber-400 hidden sm:inline">
            {isAr ? 'جرب إضافة منتجات للسلة، إتمام البيع، وتبديل المستخدم' : 'Try adding items, completing sale, and switching user'}
          </span>
        </div>

        <PosSimulator lang={lang} />
      </div>

      {/* Production Architecture & Engineering Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'معمارية برامج الديسكتوب المتخصصة' : 'Desktop Architecture Capabilities'}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isAr
              ? 'أقوم بتصميم وهندسة برامج الديسكتوب بمختلف أنواعها: الأنظمة المستقلة ذات قواعد البيانات المحلية (SQLite) لضمان العمل المستمر حتى في حال انقطاع الإنترنت، وكذلك الأنظمة المتصلة سحابياً لمزامنة البيانات بين الفروع المتعددة وتكاملات الـ API.'
              : 'Engineered for high-throughput reliability: From offline-first single-binary applications with embedded SQLite databases ensuring uninterrupted operation during network outages, to cloud-synchronized multi-branch distributed desktop platforms.'}
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>{isAr ? 'قواعد بيانات مدمجة سريعة الاستعلامات مع نسخ احتياطي بنقرة واحدة' : 'Embedded local storage with single-click full database backup'}</li>
            <li>{isAr ? 'تكامل عتادي مع طابعات الإيصالات الحرارية وقوارئ الباركود والموازين' : 'Hardware integration with ESC/POS thermal printers & barcode scanners'}</li>
            <li>{isAr ? 'أرشفة آلية للتقارير والفواتير بصيغة PDF في مجلدات النظام المحلية' : 'Automated background archiving of invoices into local system directories'}</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'الأمان وإدارة صلاحيات المستخدمين (RBAC)' : 'Multi-Tier Security & Privacy Isolation'}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isAr
              ? 'تطبيق معايير أمان صارمة تفصل بين صلاحيات صاحب العمل/المدير العام وبين الكاشير أو موظفي المبيعات، مع حجب تكاليف الشراء وهوامش الأرباح الإجمالية وإعدادات النظام لحماية أسرار المتجر.'
              : 'Strict separation of duty protocols: General Managers possess unrestricted access to profit calculations and supplier invoices, while Cashiers operate in a protected sandbox shielded from profit margins, purchase costs, and system configurations.'}
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>{isAr ? 'دخول سريع برمز PIN لكل كاشير مع توثيق بداية ونهاية الوردية' : 'Rapid 4-digit PIN authentication with shift opening & drawer balancing'}</li>
            <li>{isAr ? 'سجل تدقيق كامل (Audit Log) لجميع العمليات والخصومات والمرتجعات' : 'Audit logs tracking all transactions, bill discounts, and inventory returns'}</li>
            <li>{isAr ? 'حسابات ديون العملاء مع حدود ائتمان صارمة تمنع تجاوز السقف المحدد' : 'Customer receivable ledgers with enforced credit ceilings and account statements'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
