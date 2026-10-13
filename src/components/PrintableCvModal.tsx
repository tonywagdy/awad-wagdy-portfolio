import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/cvData';
import { X, Printer, Mail, Phone, MapPin } from 'lucide-react';

interface CvModalProps {
  lang: Language;
  onClose: () => void;
}

export function PrintableCvModal({ lang, onClose }: CvModalProps) {
  const isAr = lang === 'ar';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? 'معاينة السيرة الذاتية' : 'Resume preview'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className="cv-modal-overlay fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="cv-modal-sheet bg-[#121828] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Toolbar (Non-printable) */}
        <div className="px-5 py-3.5 bg-[#162035] border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400">
              {isAr ? 'معاينة السيرة الذاتية الرسمية' : 'Official Resume Preview (Printable)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={isAr ? 'إغلاق المعاينة' : 'Close preview'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 font-sans space-y-6 print:p-0 print:m-0" dir="ltr">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
              AWAD WAGDY AWAD
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              Full-Stack Software Engineer & Desktop Systems Specialist (Offline & Online) | Computer Vision & LiDAR QA Expert
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {PERSONAL_INFO.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                <Phone className="w-3.5 h-3.5" />
                <span className="tabular-nums font-bold">+20 120 233 2355</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Ain Shams, Cairo, Egypt
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Software Engineer and Quality Assurance professional specialized in two high-impact tracks: 
              <strong> Track 1 – Custom Desktop Systems & Full-Stack Web:</strong> Architecting and delivering robust standalone desktop applications (both 100% offline-first with zero-latency embedded SQLite databases and cloud-synchronized online systems) tailored for any enterprise or commercial business (e.g., AL FARES ERP & POS Suite), alongside high-converting commercial web platforms and digital interactive flipbooks (e.g., Al-Amin Pergolas official platform and catalog). 
              <strong> Track 2 – Computer Vision, LiDAR Point Clouds & Perception QA:</strong> Strengthening autonomous vehicle deep learning datasets through rigorous 2D/3D cuboid audits, LiDAR 3D point cloud labeling, and dense semantic segmentation validation at Micro Engineering Egypt.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-1">
              WORK EXPERIENCE
            </h2>

            {/* Exp 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">Quality Control Technician</span>
                  <span className="text-slate-600"> | MICRO ENGINEERING EGYPT</span>
                </div>
                <span className="font-mono text-slate-600 text-[11px]">10/2025 - Present</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc ps-4">
                <li>Checked annotation outputs for consistency with task instructions before final approval.</li>
                <li>Identified precision labeling errors and flagged ambiguous corner cases for engineering rework.</li>
                <li>Compared multi-sensor outputs against raw LiDAR 3D point clouds to verify spatial accuracy.</li>
                <li>Documented recurring quality error modes and shared benchmark reports with the team.</li>
              </ul>
            </div>

            {/* Exp 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">Data Labeling Quality Assurance Specialist</span>
                  <span className="text-slate-600"> | MICRO ENGINEERING EGYPT</span>
                </div>
                <span className="font-mono text-slate-600 text-[11px]">2024 - 09/2025</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc ps-4">
                <li>Audited and refined 2D/3D bounding boxes, LiDAR point cloud tracks, and semantic segmentation masks.</li>
                <li>Enforced quality inspection gates to maintain 99%+ accuracy across project batches.</li>
                <li>Validated 2D and 3D bounding box orientations, yaw angles, and bounding contours for vehicles and pedestrians.</li>
              </ul>
            </div>

            {/* Exp 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">Data Labeling Specialist</span>
                  <span className="text-slate-600"> | MICRO ENGINEERING EGYPT</span>
                </div>
                <span className="font-mono text-slate-600 text-[11px]">2023 - 2024</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc ps-4">
                <li>Annotated visual and sensor data for autonomous driving deep learning models.</li>
                <li>Executed scene classification, road free-space segmentation, and static/dynamic object tagging.</li>
              </ul>
            </div>
          </div>

          {/* Key Software Engineering Deliverables */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-1">
              KEY DELIVERED SOFTWARE SYSTEMS
            </h2>
            <div className="text-xs text-slate-700 space-y-1.5">
              <div>
                <strong>AL FARES ERP & POS Integrated Desktop Suite:</strong> Complete commercial desktop application built with 10 production modules: POS barcode cashier terminal, live profit & loss analytics, warehouse inventory balance audit, supplier purchases, customer debt accounts with credit limits, daily treasury disbursements, and automatic PDF receipt archiving. 100% offline-first.
              </div>
              <div>
                <strong>Al-Amin Pergolas Commercial Web Platform:</strong> Bespoke architectural showcase website featuring high-performance architectural galleries, responsive modern layout, and direct WhatsApp quote generation.
              </div>
              <div>
                <strong>Al-Amin Interactive Digital Flipbook Catalog:</strong> Interactive digital flipbook catalog application with realistic 3D book turning, wood frame design portfolio, lightbox zoom, and instant quote inquiry.
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-1">
              EDUCATION & CREDENTIALS
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="font-bold text-slate-900">Bachelor of Management Information Systems (MIS)</span>
                <span className="text-slate-600"> | Taibah Integrated Science Academy</span>
              </div>
              <span className="font-mono text-slate-600 text-[11px]">Graduated Jan 2022</span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-950 border-b border-slate-300 pb-1">
              CORE TECHNICAL SKILLS & TOOLS
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              <div><strong>Desktop & Web Development:</strong> Custom Desktop Apps (Offline & Online), SQLite Local Database, Role-Based Access Control (RBAC), POS Thermal ESC/POS Printers, Barcode Scanners, React, TypeScript, Tailwind CSS, REST APIs.</div>
              <div><strong>Computer Vision & QA:</strong> 3D LiDAR Point Clouds, 2D/3D Bounding Boxes, Semantic Segmentation, Sensor Fusion, Error Taxonomy, Dataset Benchmarking.</div>
              <div><strong>Platforms & Tools:</strong> CVAT, Labelbox, Scale AI, Apollo Auto, Git, GitHub, JIRA, Python Scripting.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
