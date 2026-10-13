import { useState } from 'react';
import { 
  Eye, 
  ZoomIn, 
  X, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  Camera, 
  Radar, 
  Crosshair, 
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Language } from '../types';

export function LidarSimulation({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  const [activeView, setActiveView] = useState<'fusion' | 'pointcloud'>('fusion');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const VIEWS_DATA = {
    fusion: {
      src: '/lidar_sensor_fusion.png',
      badgeAr: 'دمج الحساسات المباشر (كاميرات + LiDAR)',
      badgeEn: 'Multi-Sensor Fusion (Surround Cameras + 3D LiDAR)',
      titleAr: 'واجهة دمج الكاميرات المحيطية مع سحابة نقاط الـ LiDAR',
      titleEn: 'Surround HD Cameras & 3D LiDAR Point Cloud Synchronized View',
      descAr: 'تزامن كامل بين 4 كاميرات محيطية للسيارة (أمامية، علوية، جانبية، وخلفية) مع سحابة نقاط الـ LiDAR ومخروط إسقاط شعاع الحساس (Ray Projection) للتدقيق المليمتري.',
      descEn: 'Full temporal synchronization across 4 surround vehicle cameras and dense 3D LiDAR point cloud returns with active sensor frustum ray projection.'
    },
    pointcloud: {
      src: '/lidar_point_cloud_3d.png',
      badgeAr: 'سحابة نقاط الـ LiDAR ثلاثية الأبعاد',
      badgeEn: 'High-Density 3D LiDAR Point Cloud',
      titleAr: 'المسح الليزري ثلاثي الأبعاد مع التدرج اللوني للارتفاعات',
      titleEn: 'Dense 3D Laser Returns with Elevation & Intensity Colormap',
      descAr: 'سحابة نقاط مجسمة بزاوية رؤية واسعة تُظهر حلقات مسح الأسفلت المركزية، كتل المركبات، والمباني الملونة حسب شدة الارتفاع لفحص حدود الصناديق المحيطية بدقة تامة.',
      descEn: 'Wide-angle 3D laser returns displaying concentric road scan rings, vehicle bounding clusters, and elevation-colorized structures for strict audit.'
    }
  };

  const currentView = VIEWS_DATA[activeView];

  // Interactive QA inspection hotspots
  const HOTSPOTS = [
    {
      id: 'cameras',
      view: 'fusion',
      top: '42%',
      left: '12%',
      titleAr: 'الكاميرات المحيطية المتزامنة',
      titleEn: 'Surround HD Camera Feeds',
      descAr: '4 كاميرات عالية الدقة لمطابقة الأجسام وتفاصيل الرؤية بالنهار وغروب الشمس مع وقت التقاط شعاع الليزر بالملي ثانية.',
      descEn: '4 calibrated HD feeds verified for millisecond frame synchronization with laser returns.'
    },
    {
      id: 'frustum',
      view: 'fusion',
      top: '48%',
      left: '46%',
      titleAr: 'شعاع إسقاط الحساس (Sensor Ray)',
      titleEn: 'Camera Frustum Ray Casting',
      descAr: 'إسقاط هندسي مباشر يربط مركز الكاميرا المفعلة (الإطار الأزرق) بموقع السيارة في سحابة النقاط للتحقق من عدم وجود إزاحة.',
      descEn: 'Geometric ray projection linking active camera frame to LiDAR coordinates to detect calibration drift.'
    },
    {
      id: 'vehicles',
      view: 'pointcloud',
      top: '45%',
      left: '48%',
      titleAr: 'كتل نقاط المركبات والتقاطع',
      titleEn: 'Vehicle Point Clusters',
      descAr: 'تدقيق نقاط الليزر المنعكسة من هياكل السيارات لمنع تسرب النقاط خارج الصناديق ثلاثية الأبعاد (3D Bounding Boxes).',
      descEn: 'LiDAR points on vehicle hulls audited to ensure zero point leakage outside 3D bounding volumes.'
    },
    {
      id: 'road',
      view: 'pointcloud',
      top: '65%',
      left: '35%',
      titleAr: 'حلقات مسح سطح الطريق (Road Rings)',
      titleEn: 'Concentric Road Surface Rings',
      descAr: 'حلقات ليزر دائرية متحدة المركز لتدقيق استواء الأسفلت وعزل نقاط الأرض عن العوائق الثابتة والمتحركة.',
      descEn: 'Concentric rings used to validate ground plane segmentation and separate road surface from obstacles.'
    }
  ];

  const visibleHotspots = HOTSPOTS.filter(h => h.view === activeView);

  return (
    <div className="bg-[#0f1424] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 relative overflow-hidden w-full max-w-full">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30">
              {isAr ? 'بيانات حقيقية للقيادة الذاتية' : 'Real Autonomous Vehicle Dataset'}
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-300 font-mono">Multi-Sensor Fusion</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-emerald-400 font-semibold">{isAr ? 'تدقيق وضمان الجودة (QA)' : 'QA Benchmark'}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            {isAr ? 'منظومة تدقيق بيانات القيادة الذاتية ورؤية الحاسوب والـ LiDAR' : 'Autonomous Vehicles Multi-Sensor Fusion & 3D LiDAR QA'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'بيئة العمل المعتمدة لتدقيق بيانات السيارات ذاتية القيادة: دمج ومطابقة الكاميرات المحيطية مع سحابة نقاط الـ LiDAR ثلاثية الأبعاد بدقة مليمتيرية، وفحص الصناديق المحيطة لضمان أمان نماذج الرؤية الحاسوبية.'
              : 'Production-grade perception QA benchmark: temporal synchronization between surround cameras and 3D LiDAR point clouds with millimeter-level bounding box verification.'}
          </p>
        </div>

        {/* View Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090d16] border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveView('fusion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'fusion'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isAr ? 'دمج الكاميرات + LiDAR' : 'Sensor Fusion'}</span>
          </button>

          <button
            onClick={() => setActiveView('pointcloud')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'pointcloud'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>{isAr ? 'سحابة نقاط 3D' : '3D Point Cloud'}</span>
          </button>
        </div>
      </div>

      {/* Main Real Image Stage */}
      <div className="rounded-xl border border-slate-800 bg-[#070a12] overflow-hidden shadow-2xl relative group">
        {/* Top Viewport Header Bar */}
        <div className="bg-[#101626] px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-cyan-400 font-bold text-[11px] truncate">
              {isAr ? currentView.badgeAr : currentView.badgeEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="px-2.5 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ZoomIn className="w-3 h-3 text-cyan-400" />
              <span>{isAr ? 'تكبير وفحص' : 'Zoom Inspect'}</span>
            </button>
          </div>
        </div>

        {/* Real Image Container */}
        <div className="relative aspect-[16/9] sm:aspect-[21/10] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={currentView.src}
            alt={currentView.titleAr}
            className="w-full h-full object-contain select-none cursor-pointer"
            onClick={() => setIsZoomModalOpen(true)}
          />

          {/* Interactive Inspection Hotspots */}
          {visibleHotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute z-20"
              style={{ top: hotspot.top, left: hotspot.left }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
                }}
                className="w-6 h-6 -ml-3 -mt-3 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-cyan-500/50 cursor-pointer ring-4 ring-cyan-400/20 transition-transform hover:scale-110 animate-bounce"
                title={isAr ? hotspot.titleAr : hotspot.titleEn}
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>

              {/* Hotspot Popover Tooltip */}
              {activeHotspot === hotspot.id && (
                <div 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 sm:w-64 p-3 rounded-xl bg-[#090d18]/95 border border-cyan-500/60 backdrop-blur-md shadow-2xl text-xs space-y-1 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>{isAr ? hotspot.titleAr : hotspot.titleEn}</span>
                    <button 
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr ? hotspot.descAr : hotspot.descEn}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* HUD Telemetry Overlay on Image */}
          <div className="absolute bottom-3 start-3 bg-[#080d18]/85 border border-slate-800/80 rounded-lg p-2.5 text-[11px] font-mono text-slate-300 pointer-events-none backdrop-blur-sm hidden sm:block space-y-0.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Activity className="w-3 h-3" />
              <span>SENSOR_TELEMETRY_SYNC</span>
            </div>
            <div className="text-[10px] text-slate-400">FPS: 60 · Laser Density: 128,000 pts/sec</div>
            <div className="text-[10px] text-emerald-400">QA Status: 99.8% Tolerance Passed</div>
          </div>
        </div>

        {/* Description Banner below image */}
        <div className="p-3.5 bg-[#0a0f1d] border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="space-y-0.5">
            <div className="font-bold text-slate-200">
              {isAr ? currentView.titleAr : currentView.titleEn}
            </div>
            <p className="text-[11px] text-slate-400 max-w-3xl leading-relaxed">
              {isAr ? currentView.descAr : currentView.descEn}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono shrink-0">
            <Info className="w-3.5 h-3.5" />
            <span>{isAr ? 'انقر على علامات + للاستكشاف' : 'Click + for details'}</span>
          </div>
        </div>
      </div>

      {/* Audit Protocols & Quality Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-[#090d15] border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'التزامن الزمني للحساسات' : 'Multi-Sensor Temporal Sync'}</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isAr
              ? 'مطابقة إطارات الكاميرات المحيطية مع سحابة نقاط الـ LiDAR بنفس التوقيت الزمني بدقة الملي ثانية لمنع أي اهتزاز حركي.'
              : 'Verifying temporal alignment between surround camera video frames and LiDAR laser sweeps at millisecond precision.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#090d15] border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'محاذاة الصناديق 3D Bounding' : 'Strict 3D Bounding QA'}</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isAr
              ? 'ضبط زوايا الـ Yaw والـ Pitch والـ Roll بدقة صفر تسامح، ومنع خروج أي نقطة ليزر حقيقية خارج حجم الصندوق الثلاثي.'
              : 'Zero tolerance Yaw, Pitch & Roll calibration, ensuring all vehicle point cloud clusters remain tightly bound.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#090d15] border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'استمرارية التتبع (Tracking)' : 'Multi-Frame Tracklets'}</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {isAr
              ? 'تتبع الكائنات المتحركة (Object IDs) عبر المشاهد المتتابعة دون انقطاع أو تبديل للمعرف حتى مع وجود حجب مؤقت (Occlusion).'
              : 'Maintaining persistent object identities across consecutive time steps through severe occlusion and cornering.'}
          </p>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[92vh] w-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Bar */}
            <div className="flex items-center justify-between pb-3 text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span className="font-bold">{isAr ? currentView.titleAr : currentView.titleEn}</span>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white hover:text-cyan-400 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image View */}
            <div className="relative overflow-auto max-h-[82vh] rounded-xl border border-slate-800 bg-black flex items-center justify-center p-1">
              <img
                src={currentView.src}
                alt={currentView.titleAr}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
