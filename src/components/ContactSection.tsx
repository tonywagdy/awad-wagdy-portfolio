import { useState } from 'react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  MessageSquare, 
  Send, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

interface ContactProps {
  lang: Language;
  preselectedService?: string;
}

export function ContactSection({ lang, preselectedService }: ContactProps) {
  const isAr = lang === 'ar';
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [projectType, setProjectType] = useState(preselectedService || (isAr ? 'برنامج ديسكتوب مخصص (أوفلاين/أونلاين)' : 'Custom Desktop App (Offline/Online)'));
  const [details, setDetails] = useState('');
  const [formSent, setFormSent] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    const flashCopied = () => {
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2500);
      }
    };
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API can be unavailable outside secure contexts; fall back to a hidden textarea.
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch { /* Copying unavailable. */ }
      document.body.removeChild(textarea);
    }
    flashCopied();
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = isAr 
      ? `مرحباً أستاذ عوض، أنا ${name || 'عميل'}، رقم هاتفي ${phoneInput || 'غير محدد'}. أود الاستفسار بخصوص مشروع: (${projectType}). التفاصيل: ${details || 'أرغب بمناقشة التفاصيل معكم'}.`
      : `Hello Awad, I am ${name || 'Client'}, phone: ${phoneInput || 'N/A'}. Inquiring regarding: (${projectType}). Details: ${details || 'Looking to discuss details'}.`;
    
    const url = `https://wa.me/201202332355?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
            {isAr ? '07. التواصل السريع وبدء العمل' : "07. Let's Connect & Build"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            {isAr ? 'لنبدأ العمل معاً.' : "Let's work together."}
          </h2>
          <p className="text-sm text-slate-400">
            {isAr
              ? 'هل تحتاج برنامج ديسكتوب مخصص (أوفلاين أو أونلاين)، موقع ويب تجاري لشركتك، أو تدقيق بيانات ذكاء اصطناعي؟ تواصل معي مباشرة.'
              : 'Looking to engineer custom desktop software (offline or cloud-synced), a modern commercial web platform, or rigorous computer vision data QA? Reach out directly.'}
          </p>
        </div>

        {/* 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400" />
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </span>
              <span>Primary</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-mono font-bold text-slate-100 truncate">
                {PERSONAL_INFO.email}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الإيميل' : 'Copy Email')}</span>
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white"
                title={isAr ? 'إرسال إيميل' : 'Send Email'}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Phone / WhatsApp Card - FIXED LTR DISPLAY TO NEVER RENDER BACKWARDS */}
          <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                {isAr ? 'الهاتف والواتساب' : 'Phone / WhatsApp'}
              </span>
              <span className="text-emerald-400 font-mono">Direct</span>
            </div>
            <div>
              {/* Forced strict LTR with bidi isolate to prevent backwards flipping */}
              <div 
                dir="ltr" 
                style={{ unicodeBidi: 'isolate' }}
                className="text-xs sm:text-sm font-mono font-bold text-slate-100 tracking-wider tabular-nums select-all text-start"
              >
                +20 120 233 2355
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرقم' : 'Copy Phone')}</span>
              </button>
              <a
                href={isAr ? PERSONAL_INFO.whatsappUrlAr : PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-emerald-600/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-5 rounded-2xl bg-[#0f1422] border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {isAr ? 'الموقع الجغرافي' : 'Location'}
              </span>
              <span>Available</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-100">
                {isAr ? PERSONAL_INFO.locationAr : PERSONAL_INFO.locationEn}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>{isAr ? 'العمل عن بعد أو حضورياً' : 'Remote & On-site'}</span>
              <span className="text-amber-400">Cairo UTC+3</span>
            </div>
          </div>
        </div>

        {/* Interactive Consultation / Project Request Form */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-[#0e1320] border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-100">
              {isAr ? 'طلب استشارة أو عرض سعر مشروع فوري' : 'Request Instant Project Consultation'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? 'أدخل بياناتك وسيتم توجيه رسالة مباشرة للواتساب للتواصل السريع والمباشر' : 'Provide brief details to launch a direct conversation on WhatsApp'}
            </p>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">{isAr ? 'الاسم الكريم:' : 'Your Name:'}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'مثال: م. أحمد' : 'e.g., Alex Johnson'}
                  className="w-full p-2.5 rounded-xl bg-[#090d18] border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">{isAr ? 'رقم الهاتف / الواتساب:' : 'Phone / WhatsApp:'}</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+20 1xx xxx xxxx"
                  className="w-full p-2.5 rounded-xl bg-[#090d18] border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono text-start"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">{isAr ? 'نوع الخدمة أو المشروع المطلوب:' : 'Service or Project Type:'}</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#090d18] border border-slate-700/80 text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value={isAr ? 'برنامج ديسكتوب مخصص (أوفلاين/أونلاين)' : 'Custom Desktop App (Offline/Online)'}>
                  {isAr ? 'برنامج ديسكتوب مخصص (أوفلاين أو أونلاين لأي نشاط)' : 'Custom Desktop Application (Offline or Online for Any Industry)'}
                </option>
                <option value={isAr ? 'موقع ويب متكامل ونظام تجاري' : 'Custom Web Platform'}>
                  {isAr ? 'موقع ويب متكامل لشركة أو نشاط تجاري (مثل الأمين للبرجولات)' : 'Commercial Full-Stack Website (e.g. Al-Amin Pergolas)'}
                </option>
                <option value={isAr ? 'كتالوج رقمي تفاعلي (Flipbook)' : 'Digital Flipbook Catalog'}>
                  {isAr ? 'كتالوج رقمي تفاعلي للمنتجات والأعمال (Flipbook Catalog)' : 'Interactive Digital Flipbook Catalog & Gallery'}
                </option>
                <option value={isAr ? 'تدقيق وضمان جودة رؤية الحاسوب والـ LiDAR' : 'LiDAR & Computer Vision QA'}>
                  {isAr ? 'تدقيق بيانات رؤية الحاسوب وسحابة نقاط LiDAR للسيارات ذاتية القيادة' : 'Computer Vision & 3D LiDAR Perception Data QA'}
                </option>
                <option value={isAr ? 'استشارة برمجية أو متطلب آخر' : 'Other Consultation'}>
                  {isAr ? 'استشارة برمجية أو متطلب تقني آخر' : 'General Technical Consultation or Other'}
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">{isAr ? 'تفاصيل الفكرة أو المتطلبات:' : 'Project Details & Scope:'}</label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={isAr ? 'اكتب نبذة عن المتطلبات التي تحتاجها في البرنامج أو الموقع...' : 'Briefly describe your requirements, key features, or timeline...'}
                className="w-full p-2.5 rounded-xl bg-[#090d18] border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال الرسالة وبدء المحادثة عبر واتساب' : 'Launch WhatsApp Direct Discussion'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
