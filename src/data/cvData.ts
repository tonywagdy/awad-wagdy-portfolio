import { ExperienceItem, ProjectScreenshot, ServiceItem, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  nameAr: 'عوض وجدي عوض',
  nameEn: 'Awad Wagdy Awad',
  titleAr: 'مهندس برمجيات متخصص في تطوير برامج الديسكتوب (أوفلاين وأونلاين) وتطبيقات الويب المتكاملة | أخصائي جودة رؤية الحاسوب والـ LiDAR',
  titleEn: 'Full-Stack Software Engineer & Desktop Systems Specialist (Offline & Online) | Computer Vision & LiDAR QA Expert',
  email: 'twagdy067@gmail.com',
  phone: '01202332355',
  phoneFormatted: '+20 120 233 2355',
  whatsappUrl: 'https://wa.me/201202332355?text=Hello%20Awad,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you',
  whatsappUrlAr: 'https://wa.me/201202332355?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D9%88%D8%B6%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9',
  locationAr: 'عين شمس، القاهرة، مصر',
  locationEn: 'Ain Shams, Cairo, Egypt',
  experienceYears: '2+',
  educationDegreeAr: 'بكالوريوس نظم معلومات إدارية',
  educationDegreeEn: 'Bachelor of Management Information Systems (MIS)',
  educationCollegeAr: 'أكاديمية طيبة المتكاملة للعلوم (يناير 2022)',
  educationCollegeEn: 'Taibah Integrated Science Academy (Graduated Jan 2022)',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'desktop-development',
    titleAr: 'تطوير كافة برامج الديسكتوب المخصصة (أوفلاين وأونلاين)',
    titleEn: 'Custom Desktop Applications Engineering (Offline & Online Systems)',
    taglineAr: 'أنظمة مؤسسية متقدمة تعمل بكفاءة مطلقة بدون إنترنت أو متصلة سحابياً',
    taglineEn: 'Mission-Critical Desktop Software for Any Business, Enterprise or Clinic',
    descriptionAr: 'متخصص في تصميم وهندسة كافة أنواع برامج الديسكتوب للشركات والأنشطة التجارية والمؤسسات. تشمل الأنظمة المستقلة ذات قواعد البيانات المحلية (SQLite / Embedded DBs) سريعة الاستجابة وفائقة الأمان والتي تعمل بدون إنترنت بنسبة 100%، أو الأنظمة الهجينة المتصلة بالسحابة للمزامنة بين الفروع وتعدد المستخدمين والصلاحيات والربط مع الأجهزة الطرفية (قارئات الباركود، الطابعات الحرارية، الموازين الإلكترونية).',
    descriptionEn: 'Specialized in architecting and delivering high-performance desktop applications for any enterprise, trade, medical, logistics, or corporate workflow. From standalone offline-first systems powered by embedded local databases (SQLite) ensuring zero latency and 100% offline continuity, to online cloud-synchronized multi-branch desktop platforms with granular role-based permissions (RBAC) and direct POS hardware communication.',
    icon: 'Monitor',
    featuresAr: [
      'برامج ديسكتوب مخصصة لأي نشاط (شركات تجارية، مستودعات، مصانع، عيادات، خدمات)',
      'تشغيل أوفلاين كامل (Offline-First) بقواعد بيانات محلية فائقة السرعة والاستقرار',
      'إمكانية الربط السحابي (Cloud Sync) للمزامنة اللحظية بين الفروع والشبكات الداخلية',
      'إدارة دقيقة للمستخدمين والصلاحيات (صاحب العمل / المدير / الكاشير / موظف المبيعات)',
      'تكامل مباشر مع العتاد والأجهزة (طابعات الفواتير الحرارية، أجهزة الباركود، والموازين)',
      'تقارير مالية ومحاسبية تفصيلية، كشوف حسابات، وأرشفة تلقائية للفواتير بصيغة PDF'
    ],
    featuresEn: [
      'Custom desktop software tailored to any domain (Enterprise ERP, Retail, Clinics, Supply Chain)',
      'True Offline-First capability with zero-latency local database storage & instant queries',
      'Optional cloud-sync & multi-branch replication for distributed business networks',
      'Granular multi-role security (Owner, Admin, Manager, Cashier, Auditor) with PIN protection',
      'Seamless hardware communication (ESC/POS thermal printers, barcode scanners, scales)',
      'Comprehensive financial reporting, double-entry ledgers, and automated PDF archiving'
    ]
  },
  {
    id: 'web-development',
    titleAr: 'تصميم وبرمجة مواقع ويب متكاملة لأي نشاط تجاري أو خدمي',
    titleEn: 'Modern Full-Stack Web Development & Commercial Platforms',
    taglineAr: 'من الفكرة حتى النشر بلوحة تحكم وأعلى درجات السرعة والـ SEO',
    taglineEn: 'High-Converting Corporate Websites, Portfolios & Interactive Catalogs',
    descriptionAr: 'أصمم وأطور مواقع ويب متكاملة فائقة السرعة والتجاوب تناسب أي شركة أو نشاط تجاري (مثل موقع شركة الأمين للبرجولات والكتالوج الرقمي التفاعلي). واجهات أنيقة ومخصصة بدون قوالب جاهزة مكررة، متوافقة 100% مع الهواتف الذكية مع تهيئة قوية لمحركات البحث والتكامل مع الواتساب والمدفوعات.',
    descriptionEn: 'Crafting bespoke, high-converting commercial websites and interactive web platforms for businesses and brands (e.g., Al-Amin Pergolas official platform and digital flipbook catalog). Exceptional responsive UI/UX, 95+ Lighthouse performance, technical SEO, and direct customer engagement integrations.',
    icon: 'Globe',
    featuresAr: [
      'تصميم واجهات برمجية فريدة تعكس هوية العلامة التجارية بأعلى معايير الجمال',
      'تجاوب كامل وانسيابي مع شاشات الهواتف والأجهزة اللوحية والحواسيب',
      'كتالوجات رقمية ومعارض أعمال تفاعلية مع تصفية ذكية وبحث لحظي',
      'سرعة فائقة وتهيئة احترافية لمحركات البحث (SEO) لظهور الموقع في النتائج الأولى',
      'لوحات تحكم سهلة لإدارة المحتوى والمنتجات واستقبال طلبات عروض الأسعار'
    ],
    featuresEn: [
      'Custom bespoke UI architecture aligned with modern luxury design principles',
      '100% responsive across mobile, tablet, and ultra-wide desktop viewports',
      'Interactive digital catalogs, flipbook viewers, and instant categorization filters',
      'Lighthouse 95+ performance scores and structured SEO schema markup',
      'Intuitive admin dashboards for seamless catalog updates and lead tracking'
    ]
  },
  {
    id: 'cv-annotation-qa',
    titleAr: 'تدقيق وضمان جودة بيانات رؤية الحاسوب والـ LiDAR',
    titleEn: 'Computer Vision, 3D LiDAR Point Cloud & AI Quality Assurance',
    taglineAr: 'دقة متناهية لمعايرة نماذج القيادة الذاتية والذكاء الاصطناعي',
    taglineEn: 'Rigorous Benchmarking & Verification for Autonomous Vehicle Perception',
    descriptionAr: 'خبرة عملية متخصصة في مراجعة وتدقيق مجموعات بيانات السيارات ذاتية القيادة ورؤية الحاسوب بشركة مايكرو إنجينيرنج مصر. فحص وتصحيح الصناديق المحيطة 2D/3D Bounding Boxes، سحابة نقاط الـ LiDAR ثلاثية الأبعاد، والتقطيع الدلالي (Semantic Segmentation) بأعلى معايير الدقة والاتساق.',
    descriptionEn: 'Proven operational track record at Micro Engineering Egypt auditing and validating autonomous vehicle perception datasets. Rigorous inspection of 2D/3D bounding boxes, 3D LiDAR point clouds, and dense semantic segmentation masks across industry-standard annotation platforms.',
    icon: 'Scan',
    featuresAr: [
      'تدقيق سحابة نقاط الـ LiDAR ثلاثية الأبعاد (3D Point Cloud Audits)',
      'مراجعة الصناديق المحيطة 2D/3D Bounding Boxes للمركبات والمشاة والعوائق',
      'فحص ومراجعة أقنعة التقطيع الدلالي بالبكسل (Pixel-Level Semantic Segmentation)',
      'تحليل جذري لأخطاء التسمية (Root-Cause Taxonomy) وضمان مطابقة تعليمات المهام',
      'خبرة عملية في منصات CVAT و Labelbox و Scale AI و Apollo Auto'
    ],
    featuresEn: [
      '3D LiDAR point cloud temporal sequence audits and spatial calibration',
      '2D & 3D bounding box verification for vehicles, pedestrians, and obstacles',
      'Pixel-level semantic segmentation boundary tuning and occlusion handling',
      'Error taxonomy root-cause analysis and dataset benchmark standardization',
      'Hands-on proficiency across CVAT, Labelbox, Scale AI, and Apollo Auto'
    ]
  }
];

export const ERP_POS_SCREENSHOTS: ProjectScreenshot[] = [
  {
    id: 'pos',
    title: 'POS Cashier & Barcode Terminal',
    titleAr: 'نقطة البيع (الكاشير السريع والباركود)',
    description: 'Ultra-fast cashier screen with hotkeys (F1-F10), barcode reader input, active shift verification, stock status badges (In-Stock, Low, Out-of-Stock), and split payment settlement.',
    descriptionAr: 'شاشة الكاشير السريعة تدعم قارئ الباركود، التحقق من فتح الوردية، مؤشرات المخزن الملونة (متوفر، أوشك على النفاد، خلصان)، وسلة مشتريات ديناميكية بضغطة زر F10.',
    category: 'pos',
    badge: 'Core Terminal',
    badgeAr: 'نقطة البيع الرئيسية',
    highlights: ['Barcode scanner input & instant product lookup', 'Out-of-stock color badges (خلصان 0 حبة, 2 حبة, 10 حبة)', 'Keyboard hotkeys (F1 POS, F10 Complete Sale & Print)'],
    highlightsAr: ['إدخال فوري بالباركود والبحث اللحظي', 'مؤشرات فورية لحالة المخزن مع الرصيد المتبقي', 'اختصارات سريعة بلوحة المفاتيح F1-F10']
  },
  {
    id: 'dashboard',
    title: 'Live Analytical Dashboard & KPIs',
    titleAr: 'لوحة التحكم والإحصائيات الحية',
    description: 'Executive command center tracking real-time daily, monthly, and annual net profits, sales totals, customer debts, supplier dues, reorder deficit alerts, and stagnant inventory.',
    descriptionAr: 'لوحة إحصائية لحظية تتابع صافي أرباح اليوم والشهر والسنة بدقة محاسبية، إجمالي الإيرادات، ديون العملاء، تنبيهات 83 صنف بحاجة لإعادة الطلب، و100 صنف راكد.',
    category: 'dashboard',
    badge: 'Live Analytics',
    badgeAr: 'مؤشرات أداء حية',
    highlights: ['Net Annual Profit (3,616.00 EGP) & Annual Sales (16,320.00 EGP)', '83 Reorder deficit alert items (خرطوم مرن صيني, etc.)', 'Stagnant inventory tracking (100 items with zero sales in 60 days)'],
    highlightsAr: ['صافي أرباح حية ومبيعات إجمالية بدقة محاسبية', '83 صنفاً في تنبيهات النواقص وإعادة الطلب', 'متابعة 100 صنف راكد لم تُباع خلال 60 يوماً']
  },
  {
    id: 'products',
    title: 'Products Catalog & Cost Margins',
    titleAr: 'المنتجات والأصناف وهوامش الربح',
    description: 'Catalog directory showing product barcodes, SKUs, wholesale purchase costs, retail selling prices, real-time expected profits per unit (+300.00 EGP), and Excel/CSV bulk import.',
    descriptionAr: 'دليل المنتجات يوضح الباركود، SKU، تكلفة الشراء، سعر البيع، الربح المتوقع لكل قطعة (+300.00 ج.م، +55.00 ج.م)، مع استيراد سريع من ملفات Excel و CSV.',
    category: 'products',
    badge: 'Catalog & Costs',
    badgeAr: 'الأصناف والتكاليف',
    highlights: ['Automatic expected profit calculation per SKU', 'Bulk import via Excel / CSV format', 'Barcode label generation & inventory levels'],
    highlightsAr: ['حساب آلي للربح المتوقع لكل قطعة', 'استيراد جماعي للأصناف من إكسيل', 'طباعة ملصقات الباركود وتعديل الأسعار']
  },
  {
    id: 'inventory',
    title: 'Warehouses & Stock Balance Audit',
    titleAr: 'المخازن والمستودعات وحركات الجرد',
    description: 'Multi-warehouse stock balances, inter-warehouse transfers, inventory audit adjustments, minimum warning thresholds (e.g. 5 units alert), and item depletion flags.',
    descriptionAr: 'متابعة أرصدة المستودع الرئيسي، التحويل بين المخازن، تسوية وجرد المخزون، وتنبيهات الحد الأدنى (5 حبات) مع رصد الأصناف التي أوشكت على النفاد.',
    category: 'inventory',
    badge: 'Warehouses',
    badgeAr: 'المخازن والجرد',
    highlights: ['Multi-warehouse transfer records', 'Minimum alert limit (5 units warning threshold)', 'Stock adjustment & audit logs'],
    highlightsAr: ['سجل التحويلات بين المستودعات', 'تنبيه الحد الأدنى 5 حبات لمنع نفاذ البضاعة', 'تسوية وجرد المخزون وسجل الحركات']
  },
  {
    id: 'purchases',
    title: 'Purchase Invoices & Supply Orders',
    titleAr: 'فواتير المشتريات والتوريد',
    description: 'Supplier purchase order ledger tracking invoice numbers (PUR-000001), supplier identities, cash/credit settlement methods, totals (47,250.00 EGP), and return processing.',
    descriptionAr: 'سجل فواتير المشتريات وتوريد البضاعة للمستودع مع رقم الفاتورة (PUR-000001)، اسم المورد، طريقة السداد، الإجمالي (47,250.00 ج.م)، وتحديث أرصدة المخازن آلياً.',
    category: 'purchases',
    badge: 'Supply Chain',
    badgeAr: 'المشتريات والتوريد',
    highlights: ['PUR invoice indexing & supplier association', 'Automatic inventory stock incrementing upon supply', 'Return transaction action handlers'],
    highlightsAr: ['ربط الفاتورة بالمورد وتحديث الرصيد', 'زيادة كميات المخزن تلقائياً عند التوريد', 'إمكانية إرجاع الفواتير وتعديل الدفع']
  },
  {
    id: 'customers',
    title: 'Customer Directory & Credit Accounts',
    titleAr: 'دليل العملاء وحسابات الذمم والديون',
    description: 'Customer credit ledger with assigned credit ceilings (5,000.00 EGP), debit balances (مطلوب منه مدين / خالص), one-click statement of accounts, and cash receipt vouchers.',
    descriptionAr: 'دليل شامل للعملاء يحدد حدود الائتمان (5,000 ج.م)، الأرصدة المدينة الحالية (عوض وجدى: 3,009.00 ج.م، مايكل: 0.00 ج.م)، مع إصدار سندات قبض وكشوف حسابات.',
    category: 'customers',
    badge: 'CRM & Debts',
    badgeAr: 'العملاء والديون',
    highlights: ['Customer credit limit enforcement (5,000 EGP ceiling)', 'Debit balance status flags (مطلوب منه / خالص)', 'Instant Receipt Voucher (سند قبض) and Statement of Account'],
    highlightsAr: ['تحديد سقف الائتمان لمنع تراكم الديون', 'مؤشرات الأرصدة المستحقة للتحصيل', 'إصدار فوري لسندات القبض وكشوف الحساب']
  },
  {
    id: 'suppliers',
    title: 'Suppliers Directory & Payables',
    titleAr: 'دليل الموردين ومستحقاتهم',
    description: 'Supplier directory with codes (SUPP-1001, SUPP-1002), corporate names, tax registration numbers, contact numbers, outstanding dues (0.00 EGP settled), and statement exports.',
    descriptionAr: 'سجل الموردين المعتمدين مع الأكواد (SUPP-1001)، الأرقام الضريبية، أرقام الهواتف، ومتابعة المستحقات الآجلة وسندات صرف المستحقات وكشوف الحسابات.',
    category: 'suppliers',
    badge: 'Suppliers',
    badgeAr: 'الموردين والحسابات',
    highlights: ['Tax registration & contact directory', 'Payable dues tracking & zero-balance confirmations', 'Supplier account statement export'],
    highlightsAr: ['توثيق الأرقام الضريبية والهواتف', 'متابعة الديون المستحقة للموردين', 'طباعة كشف حساب مفصل لكل مورد']
  },
  {
    id: 'expenses',
    title: 'Expenses & Daily Cash Treasury',
    titleAr: 'المصروفات والخزينة اليومية',
    description: 'Expense management system logging shop rent, operational costs, cash drawer disbursements, and immediate cash balance adjustments with real-time success feedback.',
    descriptionAr: 'تسجيل المصروفات اليومية وإدارة النقدية ونثرية المحل (إيجار المحل والمستودع: 400.00 ج.م) مع خصمها المباشر من الصندوق وتأثيرها على صافي أرباح اليوم.',
    category: 'expenses',
    badge: 'Cash Register',
    badgeAr: 'المصروفات والخزينة',
    highlights: ['Single-click expense logging with categorized ledger', 'Direct deduction from cash drawer register', 'Immediate profit reconciliation feedback'],
    highlightsAr: ['تسجيل بنود المصاريف والإيجار والنثريات', 'خصم فوري من رصيد درج النقدية', 'تأثير لحظي على حساب الأرباح الصافية']
  },
  {
    id: 'reports',
    title: 'Financial Reports & Profit Margins',
    titleAr: 'التقارير المالية والأرباح السنوية',
    description: 'Detailed financial analytics featuring annual profit margins (19.7%), P&L statements, monthly revenue vs COGS breakdown table, inventory valuation, and debt aging reports.',
    descriptionAr: 'تقارير مالية تفصيلية تشمل هامش الربح السنوي الصافي (19.7%)، جدول تفصيلي لكل شهر من شهور السنة الـ 12 يوضح المبيعات، تكلفة البضاعة، وصافي الربح المحقق.',
    category: 'reports',
    badge: 'Financial P&L',
    badgeAr: 'التقارير المحاسبية',
    highlights: ['Net Profit Margin tracking (19.7% annual yield)', '12-Month revenue vs Cost of Goods Sold (COGS) breakdown', 'Date-range filtration and inventory valuation audits'],
    highlightsAr: ['هامش الربح السنوي الصافي 19.7%', 'جدول تحليلي للمبيعات وتكلفة البضاعة لكل شهر', 'فلترة بالتواريخ وتقارير أعمار الديون']
  },
  {
    id: 'users',
    title: 'Users & Granular Role Permissions',
    titleAr: 'المستخدمين والصلاحيات الدقيقة',
    description: 'Role-based access control separating General Manager / Store Owner (10/10 full permissions) from Cashier / Seller (4/10 sales-only permissions), with quick PIN codes and audit logs.',
    descriptionAr: 'نظام أمان دقيق يفصل بين صاحب المحل (المدير العام: كامل الصلاحيات 10 من 10) والكاشير (صلاحيات البيع فقط 4 من 10 محجوب عنه تقارير الأرباح والإعدادات)، ورموز PIN سريعة.',
    category: 'users',
    badge: 'RBAC Security',
    badgeAr: 'الصلاحيات والأمان',
    highlights: ['Owner vs Cashier distinct operational profiles', 'Profit reporting and cost concealment for sales staff', 'Quick 4-digit PIN authentication & system audit log'],
    highlightsAr: ['فصل صلاحيات الكاشير عن صاحب المحل', 'حجب تقارير الأرباح وتكاليف الشراء عن البائعين', 'دخول برمز PIN سريع وسجل كامل للعمليات']
  },
  {
    id: 'settings',
    title: 'System Settings & Automated Backups',
    titleAr: 'إعدادات النظام والنسخ الاحتياطي',
    description: 'Configuration module featuring Tax-Free Direct Commerce mode, custom thermal receipt header/footer messages, SQLite local database backup, and automatic PDF invoices directory.',
    descriptionAr: 'إعدادات النظام تدعم التجارة المباشرة المعفية من الضرائب، تخصيص ترويسة وشروط الفواتير المطبوعة، نسخ احتياطي لقاعدة بيانات SQLite، وحفظ فواتير PDF تلقائياً في مجلد مخصص.',
    category: 'settings',
    badge: 'System Config',
    badgeAr: 'إعدادات وأمان',
    highlights: ['Thermal receipt custom greeting and terms', 'Single-click full SQLite database backup to local folder', 'Automated PDF Invoices backup directory (D:\\AL_FARES gimi\\invoices_pdf_backup)'],
    highlightsAr: ['تخصيص نصوص وترويسة الفواتير المطبوعة', 'نسخ احتياطي كامل لقاعدة بيانات SQLite محلياً', 'مجلد آلي لحفظ نسخ PDF لجميع الفواتير الصادرة']
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    period: '10/2025 - Present',
    roleAr: 'فني مراقبة الجودة (Quality Control Technician)',
    roleEn: 'Quality Control Technician',
    companyAr: 'مايكرو إنجينيرنج مصر (MICRO ENGINEERING EGYPT)',
    companyEn: 'MICRO ENGINEERING EGYPT',
    descriptionAr: [
      'فحص مخرجات التسمية والتدقيق للتأكد من مطابقتها لتعليمات المهام قبل الاعتماد النهائي.',
      'اكتشاف أخطاء التسمية الدقيقة ووضع علامات على الحالات غير الواضحة لإعادة العمل وتصحيحها.',
      'مقارنة المخرجات مع المواد والمستشعرات المصدرية لتأكيد دقة واكتمال التغطية.',
      'توثيق مشاكل الجودة المتكررة ومشاركة النتائج والتقارير مع الفريق للتحسين المستمر.'
    ],
    descriptionEn: [
      'Performed exhaustive quality control audits on computer vision annotations against task guidelines.',
      'Flagged borderline corner cases, misaligned bounding boxes, and occlusions for engineering rework.',
      'Cross-checked sensor fusion inputs with ground-truth LiDAR 3D point cloud streams.',
      'Documented recurring labeling failure modes and benchmarked team quality KPIs.'
    ],
    skills: ['Quality Assurance', 'LiDAR 3D Point Clouds', 'CVAT', 'Error Taxonomy', 'Sensor Fusion', 'Autonomous Driving']
  },
  {
    period: '2024 - 09/2025',
    roleAr: 'أخصائي ضمان جودة تسمية البيانات (Data Labeling QA)',
    roleEn: 'Data Labeling Quality Assurance Specialist',
    companyAr: 'مايكرو إنجينيرنج مصر (MICRO ENGINEERING EGYPT)',
    companyEn: 'MICRO ENGINEERING EGYPT',
    descriptionAr: [
      'تدقيق وتحسين الصناديق المحيطة ثنائية وثلاثية الأبعاد (2D/3D Bounding Boxes)، وتسميات سحابة نقاط الـ LiDAR، وأقنعة التقطيع الدلالي لتعزيز دقة مجموعات بيانات القيادة الذاتية.',
      'تطبيق تدابير مراقبة جودة صارمة عبر جميع مشاريع التسمية لضمان أعلى معايير الاتساق والشمولية.',
      'مراجعة الصناديق المحيطة للمركبات والمشاة والعوائق للتأكد من اتساقها مع معايير المشروع.'
    ],
    descriptionEn: [
      'Audited and refined 2D/3D cuboids, LiDAR point clouds, and semantic segmentation masks for autonomous vehicle ML models.',
      'Enforced strict quality inspection gates to maintain 99%+ benchmark precision across all project batches.',
      'Validated spatial orientations, yaw angles, and boundary contours for dynamic road agents.'
    ],
    skills: ['2D/3D Bounding Boxes', 'Semantic Segmentation', 'Point Cloud QA', 'Scale AI', 'Dataset Benchmarking']
  },
  {
    period: '2023 - 2024',
    roleAr: 'أخصائي تسمية بيانات (Data Labeling Specialist)',
    roleEn: 'Data Labeling Specialist',
    companyAr: 'مايكرو إنجينيرنج مصر (MICRO ENGINEERING EGYPT)',
    companyEn: 'MICRO ENGINEERING EGYPT',
    descriptionAr: [
      'تسمية البيانات البصرية وبيانات المستشعرات لتدريب نماذج الذكاء الاصطناعي، مع التركيز على مشاريع السيارات ذاتية القيادة لدعم خوارزميات التعلم الآلي.',
      'العمل على تصنيف المشاهد وتحديد الكائنات الحية والمتحركة والثابتة بدقة عالية.'
    ],
    descriptionEn: [
      'Annotated high-throughput multi-camera video streams and radar/LiDAR feeds for deep learning models.',
      'Classified road elements, drivable free space, traffic signs, and pedestrian trajectories.'
    ],
    skills: ['Data Annotation', 'Object Detection', 'Autonomous Vehicles', 'Labelbox', 'Apollo Auto']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleAr: 'تطوير برامج الديسكتوب (أوفلاين وأونلاين)',
    titleEn: 'Desktop Systems Engineering (Offline & Online)',
    skills: [
      { name: 'Custom Desktop Apps for Any Industry', badge: 'Expert' },
      { name: 'Offline-First Architecture & SQLite', badge: 'Production' },
      { name: 'Cloud Sync & Multi-Branch Networking', badge: 'Production' },
      { name: 'Thermal ESC/POS Printers & Barcode Scanners', badge: 'Hardware' },
      { name: 'Role-Based Access Control (RBAC & PIN)', badge: 'Security' },
      { name: 'Automated PDF Archiving & Database Backups', badge: 'Production' }
    ]
  },
  {
    titleAr: 'تطوير الويب المتكامل والواجهات الحديثة',
    titleEn: 'Full-Stack Web Development & Platforms',
    skills: [
      { name: 'Custom Commercial Websites & Portfolios', badge: 'Production' },
      { name: 'Interactive Catalogs & Digital Flipbooks', badge: 'Production' },
      { name: 'React 19, TypeScript & Modern Tailwind CSS', badge: 'Expert' },
      { name: 'Lighthouse 95+ Performance & SEO Optimization', badge: 'Advanced' },
      { name: 'REST APIs, State Architecture & Vite', badge: 'Advanced' },
      { name: 'Direct WhatsApp Leads & E-Commerce Flow', badge: 'Production' }
    ]
  },
  {
    titleAr: 'جودة بيانات رؤية الحاسوب والـ LiDAR',
    titleEn: 'Computer Vision & 3D LiDAR Perception QA',
    skills: [
      { name: '3D LiDAR Point Cloud Verification', badge: 'Specialist' },
      { name: '2D / 3D Bounding Box Spatial Audits', badge: 'Specialist' },
      { name: 'Dense Semantic Segmentation QA', badge: 'Advanced' },
      { name: 'Autonomous Vehicle Dataset Benchmarking', badge: 'Specialist' },
      { name: 'Sensor Fusion & Multi-Camera Alignment', badge: 'Advanced' },
      { name: 'Error Taxonomy & Root-Cause Mitigation', badge: 'Expert' }
    ]
  },
  {
    titleAr: 'المنصات والأدوات المستخدمة',
    titleEn: 'Platforms, Dev Tools & Workflows',
    skills: [
      { name: 'CVAT & Apollo Auto', badge: 'Primary' },
      { name: 'Scale AI & Labelbox', badge: 'Proficient' },
      { name: 'Git & GitHub Version Control', badge: 'Daily' },
      { name: 'JIRA & Agile Project Workflows', badge: 'Daily' },
      { name: 'Python Data Scripting', badge: 'Practical' },
      { name: 'Linux & Node.js Runtime', badge: 'Practical' }
    ]
  }
];
