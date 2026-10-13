import { useState } from 'react';
import { 
  ShoppingCart, 
  Barcode, 
  CreditCard, 
  Banknote, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  FileText,
  DollarSign,
  LayoutDashboard,
  Boxes,
  Warehouse,
  ShoppingBag,
  Users,
  Truck,
  Receipt,
  BarChart3,
  ShieldAlert,
  Settings,
  ChevronDown,
  Globe,
  Search,
  Upload,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { DesktopModule, Language } from '../types';

interface CartItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  qty: number;
  barcode: string;
}

export function PosSimulator({ lang: globalLang }: { lang: Language }) {
  // Simulator internal language toggle (defaults to match global or user preference)
  const [simLang, setSimLang] = useState<'ar' | 'en'>(globalLang === 'ar' ? 'ar' : 'en');
  const isAr = simLang === 'ar';

  // Active desktop module from user's 12 screenshots
  const [activeModule, setActiveModule] = useState<DesktopModule>('pos');

  // User role switch: Store Owner vs Cashier
  const [currentUser, setCurrentUser] = useState<'owner' | 'cashier'>('owner');

  // POS State
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'pos-1', name: 'خانق 6*1/8 (صيني)', nameEn: 'Throttle Fitting 6*1/8 (CN)', price: 23, qty: 1, barcode: '628799033136' },
    { id: 'pos-2', name: 'خانق 4*1/8 (صيني)', nameEn: 'Throttle Fitting 4*1/8 (CN)', price: 22, qty: 1, barcode: '628799033135' },
    { id: 'pos-3', name: 'خانق 5*6 (صيني)', nameEn: 'Throttle Fitting 5*6 (CN)', price: 26, qty: 1, barcode: '628799033134' },
    { id: 'pos-4', name: 'خانق عدل 6 (صيني)', nameEn: 'Straight Throttle 6 (CN)', price: 41, qty: 1, barcode: '628799033129' },
  ]);
  const [posSearch, setPosSearch] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'credit' | 'split'>('cash');
  const [cashReceived, setCashReceived] = useState<number>(112);
  const [invoiceIssued, setInvoiceIssued] = useState(false);
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [openingBalance, setOpeningBalance] = useState('500');
  const [expenseToast, setExpenseToast] = useState(false);
  const [backupToast, setBackupToast] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;
  const change = Math.max(0, cashReceived - total);

  // Real products from Screenshot 2
  const POS_ITEMS = [
    { id: '1', name: 'خانق 12*1/4 (صيني)', nameEn: 'Throttle 12*1/4 (CN)', price: 33, stock: 4, barcode: '628799033143' },
    { id: '2', name: 'خانق 10*1/4 (صيني)', nameEn: 'Throttle 10*1/4 (CN)', price: 33, stock: 6, barcode: '628799033142' },
    { id: '3', name: 'خانق 8*1/4 (صيني)', nameEn: 'Throttle 8*1/4 (CN)', price: 33, stock: 8, barcode: '628799033141' },
    { id: '4', name: 'خانق 6*1/4 (صيني)', nameEn: 'Throttle 6*1/4 (CN)', price: 33, stock: 10, barcode: '628799033140' },
    { id: '5', name: 'خانق 12*1/8 (صيني)', nameEn: 'Throttle 12*1/8 (CN)', price: 33, stock: 2, barcode: '628799033139' },
    { id: '6', name: 'خانق 10*1/8 (صيني)', nameEn: 'Throttle 10*1/8 (CN)', price: 33, stock: 4, barcode: '628799033138' },
    { id: '7', name: 'خانق 8*1/8 (صيني)', nameEn: 'Throttle 8*1/8 (CN)', price: 23, stock: 12, barcode: '628799033137' },
    { id: '8', name: 'خانق 6*1/8 (صيني)', nameEn: 'Throttle 6*1/8 (CN)', price: 23, stock: 10, barcode: '628799033136' },
    { id: '9', name: 'خانق 4*1/8 (صيني)', nameEn: 'Throttle 4*1/8 (CN)', price: 22, stock: 2, barcode: '628799033135' },
    { id: '10', name: 'خانق 5*6 (صيني)', nameEn: 'Throttle 5*6 (CN)', price: 26, stock: 2, barcode: '628799033134' },
    { id: '11', name: 'خانق 5*4 (صيني)', nameEn: 'Throttle 5*4 (CN)', price: 26, stock: 28, barcode: '628799033133' },
    { id: '12', name: 'خانق عدل 12 (صيني)', nameEn: 'Straight Throttle 12', price: 41, stock: 2, barcode: '628799033132' },
    { id: '13', name: 'خانق عدل 10 (صيني)', nameEn: 'Straight Throttle 10', price: 41, stock: 6, barcode: '628799033131' },
    { id: '14', name: 'خانق عدل 8 (صيني)', nameEn: 'Straight Throttle 8', price: 41, stock: 14, barcode: '628799033130' },
    { id: '15', name: 'خانق عدل 6 (صيني)', nameEn: 'Straight Throttle 6', price: 41, stock: 12, barcode: '628799033129' },
    { id: '16', name: 'محبس 1/2 (إيطالي)', nameEn: 'Valve 1/2 (Italy)', price: 55, stock: 4, barcode: '628799033128' },
    { id: '17', name: 'محبس 1/2 (صيني)', nameEn: 'Valve 1/2 (CN)', price: 38, stock: 6, barcode: '628799033127' },
    { id: '18', name: 'محبس 1/4 (إيطالي)', nameEn: 'Valve 1/4 (Italy)', price: 45, stock: 0, barcode: '628799033126' }, // Out of stock
    { id: '19', name: 'محبس 1/4 (صيني)', nameEn: 'Valve 1/4 (CN)', price: 28, stock: 4, barcode: '628799033125' },
    { id: '20', name: 'محبس T 12*1/2 (صيني)', nameEn: 'T Valve 12*1/2 (CN)', price: 65, stock: 14, barcode: '628799033124' },
  ];

  const addToCart = (item: typeof POS_ITEMS[0]) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { id: item.id, name: item.name, nameEn: item.nameEn, price: item.price, qty: 1, barcode: item.barcode }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const completePayment = () => {
    setInvoiceIssued(true);
    setTimeout(() => {
      setIsPaymentOpen(false);
      setCart([]);
      setInvoiceIssued(false);
    }, 2200);
  };

  const MODULES_LIST: { id: DesktopModule; nameAr: string; nameEn: string; icon: typeof ShoppingCart }[] = [
    { id: 'pos', nameAr: 'نقطة البيع (الكاشير)', nameEn: 'POS Cashier', icon: ShoppingCart },
    { id: 'dashboard', nameAr: 'لوحة التحكم', nameEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', nameAr: 'المنتجات والأصناف', nameEn: 'Products', icon: Boxes },
    { id: 'inventory', nameAr: 'المخازن والمستودعات', nameEn: 'Inventory', icon: Warehouse },
    { id: 'purchases', nameAr: 'المشتريات والتوريد', nameEn: 'Purchases', icon: ShoppingBag },
    { id: 'customers', nameAr: 'العملاء والديون', nameEn: 'Customers', icon: Users },
    { id: 'suppliers', nameAr: 'الموردين والحسابات', nameEn: 'Suppliers', icon: Truck },
    { id: 'expenses', nameAr: 'المصروفات والخزينة', nameEn: 'Expenses', icon: Receipt },
    { id: 'reports', nameAr: 'التقارير المالية', nameEn: 'Reports', icon: BarChart3 },
    { id: 'users', nameAr: 'المستخدمين والصلاحيات', nameEn: 'Users & Roles', icon: ShieldAlert },
    { id: 'settings', nameAr: 'إعدادات النظام', nameEn: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#0b101d] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl text-slate-100 font-sans w-full max-w-full" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Desktop Window Chrome Header - Fully Responsive */}
      <div className="bg-[#090d18] px-3 sm:px-4 py-2 border-b border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block"></span>
          </div>
          <div className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5 truncate">
            <span className="text-amber-400 font-bold shrink-0">AL FARES ERP & POS</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden md:inline truncate">{isAr ? 'نظام الفارس المتكامل لإدارة المتاجر والمخازن' : 'Integrated Retail Store & Warehouse Management'}</span>
          </div>
        </div>

        {/* Top Header Controls matching real software */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap shrink-0">
          {/* User switcher (Owner vs Cashier) */}
          <button
            onClick={() => setCurrentUser(prev => prev === 'owner' ? 'cashier' : 'owner')}
            className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              currentUser === 'owner'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
            }`}
            title={isAr ? 'تبديل المستخدم لفحص صلاحيات الأمان' : 'Switch user to test RBAC security profiles'}
          >
            <span>{currentUser === 'owner' ? '👑' : '👤'}</span>
            <span className="truncate">
              {currentUser === 'owner' 
                ? (isAr ? 'المدير العام' : 'Owner') 
                : (isAr ? 'الكاشير' : 'Cashier')}
            </span>
            <span className="text-[9px] opacity-75">
              ({isAr ? 'تبديل' : 'Switch'})
            </span>
          </button>

          {/* Language Switcher inside Simulator */}
          <button
            onClick={() => setSimLang(prev => prev === 'ar' ? 'en' : 'ar')}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3 h-3" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {/* Shift indicator button */}
          <button
            onClick={() => setShowShiftModal(true)}
            className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
              isShiftOpen 
                ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
            }`}
          >
            <Clock className="w-3 h-3 shrink-0" />
            <span>
              {isShiftOpen 
                ? (isAr ? 'الوردية مفتوحة' : 'Shift Active') 
                : (isAr ? 'فتح وردية' : 'Open Shift')}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Module Switcher Bar (Visible on screens < md) */}
      <div className="md:hidden bg-[#090e1a] border-b border-slate-800 p-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none max-w-full">
        {MODULES_LIST.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                activeModule === m.id
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'bg-[#0f1424] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isAr ? m.nameAr : m.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Main Desktop Application Shell (Sidebar + Workspace) */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px] bg-[#0c1222] w-full max-w-full">
        {/* Desktop Sidebar (Hidden on mobile) */}
        <aside className="hidden md:flex md:col-span-3 lg:col-span-2.5 bg-[#090e1a] border-e border-slate-800 p-3 space-y-1 select-none flex-col justify-between">
          <div className="space-y-1">
            {/* Store Brand Lockup */}
            <div className="p-3 mb-2 rounded-xl bg-[#10172a] border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-sm shadow-md">
                AL
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-xs font-bold text-slate-100 truncate">
                  {isAr ? 'مؤسسة الفارس' : 'AL FARES Group'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {isAr ? 'نظام ERP & POS متكامل' : 'Full ERP & POS Suite'}
                </div>
              </div>
            </div>

            {/* Warehouse Dropdown */}
            <div className="px-3 py-1.5 mb-2 rounded-lg bg-[#0e1424] border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Warehouse className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? 'المستودع الرئيسي' : 'Main Warehouse'}</span>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </div>

            {/* 10 Navigation Items matching User's Screenshots */}
            <nav className="space-y-0.5">
              <button
                onClick={() => setActiveModule('pos')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeModule === 'pos' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isAr ? 'نقطة البيع (الكاشير)' : 'POS Cashier Terminal'}</span>
                </span>
                <span className="text-[10px] font-mono px-1 rounded bg-black/30">F1</span>
              </button>

              <button
                onClick={() => setActiveModule('dashboard')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'dashboard' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isAr ? 'لوحة التحكم' : 'Live Dashboard'}</span>
              </button>

              <button
                onClick={() => setActiveModule('products')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'products' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>{isAr ? 'المنتجات والأصناف' : 'Products & Catalog'}</span>
              </button>

              <button
                onClick={() => setActiveModule('inventory')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'inventory' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Warehouse className="w-4 h-4" />
                <span>{isAr ? 'المخازن والمستودعات' : 'Warehouses & Stock'}</span>
              </button>

              <button
                onClick={() => setActiveModule('purchases')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'purchases' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAr ? 'المشتريات والتوريد' : 'Purchases & Supply'}</span>
              </button>

              <button
                onClick={() => setActiveModule('customers')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'customers' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{isAr ? 'العملاء والديون' : 'Customers & Debts'}</span>
              </button>

              <button
                onClick={() => setActiveModule('suppliers')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'suppliers' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{isAr ? 'الموردين والحسابات' : 'Suppliers & Payables'}</span>
              </button>

              <button
                onClick={() => setActiveModule('expenses')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'expenses' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>{isAr ? 'المصروفات والخزينة' : 'Expenses & Treasury'}</span>
              </button>

              <button
                onClick={() => setActiveModule('reports')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'reports' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{isAr ? 'التقارير المالية' : 'Financial Reports'}</span>
              </button>

              <button
                onClick={() => setActiveModule('users')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'users' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{isAr ? 'المستخدمين والصلاحيات' : 'Users & Permissions'}</span>
              </button>

              <button
                onClick={() => setActiveModule('settings')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeModule === 'settings' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{isAr ? 'إعدادات النظام' : 'System Settings'}</span>
              </button>
            </nav>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
            {isAr ? 'نظام أوفلاين 100% · قاعدة بيانات محلية' : '100% Offline · Local SQLite'}
          </div>
        </aside>

        {/* Dynamic Workspace Container based on Selected Module */}
        <div className="col-span-1 md:col-span-9 lg:col-span-9.5 p-3 sm:p-5 lg:p-6 overflow-y-auto max-h-[750px] scrollbar-thin min-w-0 max-w-full w-full">
          {/* Cashier Permission Notice if Cashier tries to access restricted modules */}
          {currentUser === 'cashier' && (activeModule === 'reports' || activeModule === 'settings' || activeModule === 'users') ? (
            <div className="h-full min-h-[420px] flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-2xl bg-[#090e1a] border border-rose-500/30">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Lock className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-lg font-bold text-slate-100">
                  {isAr ? 'تم حجب هذه الشاشة لحماية خصوصية صاحب المتجر' : 'Access Restricted by Role Security Profile'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'تم تعيين حسابك بصلاحية (كاشير مبيعات فقط). صلاحيات الاطلاع على تقارير الأرباح وتكاليف الشراء وإعدادات النظام محجوبة حصراً لصاحب المتجر (المدير العام).'
                    : 'Your session is authenticated as Cashier (Sales Only). Financial margin reports, purchase cost ledgers, and system configurations are restricted to General Manager.'}
                </p>
              </div>
              <button
                onClick={() => setCurrentUser('owner')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>👑</span>
                <span>{isAr ? 'تبديل الحساب إلى (صاحب المحل / المدير العام)' : 'Switch to Owner / General Manager Mode'}</span>
              </button>
            </div>
          ) : null}

          {/* 1. MODULE: POS CASHIER TERMINAL (Screenshot 2) */}
          {(currentUser === 'owner' || (currentUser === 'cashier' && activeModule !== 'reports' && activeModule !== 'settings' && activeModule !== 'users')) && activeModule === 'pos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Product Catalog Grid (Right / Center) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Search Bar matching Screenshot 2 */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={posSearch}
                      onChange={(e) => setPosSearch(e.target.value)}
                      placeholder={isAr ? 'امسح الباركود أو ابحث بالاسم...' : 'Scan barcode or search product name...'}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[#0e1526] border border-slate-700/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <Barcode className="w-4 h-4 text-blue-400 absolute start-3 top-3" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
                    <span>||||</span>
                    <span>{isAr ? 'بحث / إدخال' : 'Scan / Input'}</span>
                  </div>
                </div>

                {/* Category Pills matching Screenshot 2 */}
                <div className="flex items-center gap-2 pb-1 overflow-x-auto text-xs">
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold whitespace-nowrap cursor-pointer">
                    {isAr ? 'جميع الأقسام' : 'All Categories'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 hover:text-slate-200 whitespace-nowrap cursor-pointer">
                    {isAr ? 'عام' : 'General'}
                  </span>
                </div>

                {/* 20 Authentic Products Grid from Screenshot 2 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-[500px] overflow-y-auto pe-1 scrollbar-thin">
                  {POS_ITEMS.filter(p => p.name.includes(posSearch) || p.nameEn.toLowerCase().includes(posSearch.toLowerCase()) || p.barcode.includes(posSearch)).map((product) => {
                    const isOutOfStock = product.stock === 0;
                    return (
                      <div
                        key={product.id}
                        onClick={() => !isOutOfStock && addToCart(product)}
                        className={`p-3 rounded-xl border text-start transition-all relative flex flex-col justify-between ${
                          isOutOfStock 
                            ? 'bg-[#150f14] border-rose-900/40 opacity-70 cursor-not-allowed' 
                            : 'bg-[#0f1629] border-slate-800/80 hover:border-blue-500/60 hover:bg-[#131d36] cursor-pointer'
                        }`}
                      >
                        {/* Stock Badge matching Screenshot 2 */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                            isOutOfStock 
                              ? 'bg-rose-500 text-white' 
                              : product.stock <= 4 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                : 'bg-slate-800 text-slate-300'
                          }`}>
                            {isOutOfStock ? (isAr ? 'خلصان (0 حبة)' : 'Out of Stock') : `${product.stock} ${isAr ? 'حبة' : 'units'}`}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        </div>

                        {/* Title & Barcode */}
                        <div className="space-y-1 mb-3">
                          <div className="text-xs font-bold text-slate-100 line-clamp-1">
                            {isAr ? product.name : product.nameEn}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {product.barcode}
                          </div>
                        </div>

                        {/* Price & Add Action */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                          <span className="text-xs font-black font-mono text-blue-400">
                            {product.price.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                          <button
                            disabled={isOutOfStock}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isOutOfStock ? 'bg-slate-800 text-slate-600' : 'bg-blue-600 text-white hover:bg-blue-500'
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shopping Cart Drawer (Left side matching Screenshot 2) */}
              <div className="lg:col-span-4 bg-[#0e1526] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Cart Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-slate-100">
                        {isAr ? 'سلة المشتريات' : 'Current Order Cart'}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono font-bold">
                        {cart.reduce((s, i) => s + i.qty, 0)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <button 
                        onClick={() => setCart([])}
                        className="p-1 hover:text-rose-400 cursor-pointer" 
                        title={isAr ? 'مسح السلة' : 'Clear Cart'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                        {isAr ? 'جملة' : 'Wholesale'}
                      </button>
                    </div>
                  </div>

                  {/* Customer Select */}
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#0a0f1d] border border-slate-800 text-[11px] flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isAr ? 'عميل نقدي عام (نقداً)' : 'General Walk-in Customer (Cash)'}</span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pe-1 scrollbar-thin">
                    {cart.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500">
                        {isAr ? 'السلة فارغة، اختر منتجات لإضافتها' : 'Cart is empty. Click items to add.'}
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="p-2.5 rounded-xl bg-[#0a0f1d] border border-slate-800/80 flex items-center justify-between gap-2">
                          <div className="leading-tight overflow-hidden">
                            <div className="text-xs font-bold text-slate-200 truncate">
                              {isAr ? item.name : item.nameEn}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {item.price.toFixed(2)} × {item.qty} = {(item.price * item.qty).toFixed(2)} {isAr ? 'ج.م' : 'EGP'}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-mono font-bold text-slate-100">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs cursor-pointer"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-5 h-5 rounded bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 flex items-center justify-center text-xs ms-1 cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Cart Bottom Summary & F10 Button */}
                <div className="border-t border-slate-800 pt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span className="font-mono font-bold text-slate-200">{subtotal.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>

                  <div className="flex items-center justify-between text-base font-black text-slate-100">
                    <span>{isAr ? 'الإجمالي النهائي:' : 'Final Total:'}</span>
                    <span className="font-mono text-emerald-400 text-xl">{total.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>

                  {/* Green F10 Button matching Screenshot 2 */}
                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      setCashReceived(total);
                      setIsPaymentOpen(true);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      cart.length === 0 
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 font-black'
                    }`}
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isAr ? 'إتمام الدفع وطباعة الفاتورة (F10)' : 'Complete Sale & Print Invoice (F10)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. MODULE: DASHBOARD (Screenshot 9) */}
          {activeModule === 'dashboard' && (
            <div className="space-y-5">
              {/* Top Banner with Quick Actions matching Screenshot 9 */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isAr ? 'لوحة التحكم والإحصائيات الحية · جاهز ومتصل محلياً' : 'Live Analytics Dashboard · Local SQLite Online'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {isAr ? 'نظام الفارس لإدارة المتاجر والمخازن' : 'AL FARES Store & Warehouse Suite'}
                  </h3>
                  <p className="text-xs text-blue-100 mt-1">
                    {isAr ? 'متابعة فورية للمبيعات، الأرباح، المخزون، والديون' : 'Real-time sales tracking, accounting yields, stock logistics, and debt ledger'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveModule('pos')}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isAr ? 'فاتورة بيع سريعة (F1)' : 'Quick Sale POS (F1)'}</span>
                  </button>
                  <button
                    onClick={() => setActiveModule('products')}
                    className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إضافة منتج جديد' : 'New Product'}</span>
                  </button>
                  <button
                    onClick={() => setActiveModule('expenses')}
                    className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تسجيل مصروف' : 'Record Expense'}</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Strip matching Screenshot 9 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-[#0e1526] border border-blue-500/30 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'صافي أرباح السنة الحالية' : 'Net Annual Profit'}</div>
                  <div className="text-2xl font-black font-mono text-blue-400">3,616.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'مبيعات السنة: 16,320.00 ج.م' : 'Year Sales: 16,320.00 EGP'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'صافي أرباح الشهر الحالي' : 'Net Monthly Profit'}</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">3,616.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'مبيعات الشهر: 16,320.00 ج.م' : 'Month Sales: 16,320.00 EGP'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'صافي أرباح اليوم' : "Today's Net Profit"}</div>
                  <div className="text-2xl font-black font-mono text-rose-400">-35.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'بعد خصم التكلفة والمصاريف' : 'Net of cost & expenses'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'مبيعات اليوم' : "Today's Gross Sales"}</div>
                  <div className="text-2xl font-black font-mono text-slate-100">165.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? '3 فاتورة اليوم' : '3 Invoices Today'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'إجمالي ديون العملاء' : 'Customer Receivables'}</div>
                  <div className="text-xl font-black font-mono text-amber-400">3,385.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'ديون وذمم مستحقة من العملاء' : 'Active customer credit'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'مستحقات الموردين' : 'Supplier Payables'}</div>
                  <div className="text-xl font-black font-mono text-emerald-400">0.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'مبالغ مستحقة السداد للموردين' : 'All supplier dues settled'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-rose-500/20 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'تنبيهات نواقص المخزون' : 'Stock Deficit Alerts'}</div>
                  <div className="text-xl font-black font-mono text-rose-400">83 {isAr ? 'صنف' : 'SKUs'}</div>
                  <div className="text-[10px] text-rose-300 font-mono cursor-pointer hover:underline" onClick={() => setActiveModule('inventory')}>
                    {isAr ? 'عرض نواقص المستودع ↗' : 'View low stock list ↗'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'إجمالي مبيعات السنة' : 'Total Annual Turnover'}</div>
                  <div className="text-xl font-black font-mono text-slate-100">16,320.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'إيرادات السنة الكاملة' : 'Full year revenue'}</div>
                </div>
              </div>

              {/* Two Tables from Screenshot 9: Deficit Alerts & Stagnant Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reorder Deficit Table */}
                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>{isAr ? 'نواقص تحتاج إعادة طلب (83 صنف)' : 'Items Needing Reorder (83)'}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">83</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {[
                      { name: 'خرطوم مرن 6 (صيني)', left: '0' },
                      { name: 'خرطوم مرن 5 (صيني)', left: '0' },
                      { name: 'خرطوم مرن 2 (صيني)', left: '0' },
                      { name: 'خرطوم مرن 1.5 (صيني)', left: '0' },
                      { name: 'خرطوم هواء 4م (أبيض)', left: '0' },
                    ].map((row, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-[#0a0f1d] flex items-center justify-between">
                        <span className="text-slate-300">{row.name}</span>
                        <span className="text-[11px] font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/40">
                          {isAr ? `باقي ${row.left}` : `Stock: ${row.left}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-[11px] text-rose-400 hover:underline cursor-pointer pt-1">
                    {isAr ? 'و 78 صنف آخر... عرض شاشة المخزون' : '+78 more items... view inventory'}
                  </div>
                </div>

                {/* Stagnant Goods Table */}
                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <Clock className="w-4 h-4" />
                      <span>{isAr ? 'أصناف راكدة (بلا بيع 60 يوماً)' : 'Stagnant Stock (No sales in 60d)'}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">100</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {[
                      { name: 'خرطوم هواء 6م (أبيض)', balance: '400 رصيد' },
                      { name: 'خرطوم هواء 5م (أزرق)', balance: '144 رصيد' },
                      { name: 'عدلة 12*1/4 (صيني)', balance: '132 رصيد' },
                      { name: 'خرطوم هواء 8م (صيني أبيض)', balance: '128 رصيد' },
                      { name: 'خرطوم هواء 8م (أسود)', balance: '128 رصيد' },
                    ].map((row, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-[#0a0f1d] flex items-center justify-between">
                        <span className="text-slate-300">{row.name}</span>
                        <span className="text-[11px] font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950/40">
                          {row.balance}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-[11px] text-blue-400 hover:underline cursor-pointer pt-1">
                    {isAr ? 'و 95 صنف آخر' : '+95 more stagnant items'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MODULE: PRODUCTS & CATALOG (Screenshot 3) */}
          {activeModule === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-blue-400" />
                    <span>{isAr ? 'إدارة المنتجات وقائمة الأصناف' : 'Products & Catalog Management'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'إدارة الأسعار، التكاليف، الباركود، والحدود الدنيا للمخزون' : 'Manage retail pricing, wholesale cost, barcodes, and inventory thresholds'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إضافة منتج جديد' : 'Add New Product'}</span>
                  </button>
                  <button className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>{isAr ? 'استيراد من إكسيل (Excel / CSV)' : 'Import Excel / CSV'}</span>
                  </button>
                </div>
              </div>

              {/* Product Table from Screenshot 3 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'الباركود' : 'Barcode'}</th>
                      <th className="p-3 text-start">{isAr ? 'اسم الصنف' : 'Item Name'}</th>
                      <th className="p-3 text-start">{isAr ? 'القسم' : 'Category'}</th>
                      <th className="p-3 text-start">{isAr ? 'المتوفر بالمخزن' : 'In-Stock'}</th>
                      <th className="p-3 text-start">{isAr ? 'التكلفة' : 'Cost'}</th>
                      <th className="p-3 text-start">{isAr ? 'سعر البيع' : 'Sale Price'}</th>
                      <th className="p-3 text-start">{isAr ? 'الربح المتوقع' : 'Expected Profit'}</th>
                      <th className="p-3 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {[
                      { code: '628799036204', sku: 'SKU-9036-204', name: 'مسدس رش ك (صيني)', stock: '0 حبة (خلصان)', cost: '1,200.00', sale: '1,500.00', profit: '+300.00' },
                      { code: '628799036203', sku: 'SKU-9036-203', name: 'مسدس عداد تزويد (صيني)', stock: '1 حبة', cost: '120.00', sale: '175.00', profit: '+55.00' },
                      { code: '628799036202', sku: 'SKU-9036-202', name: 'مسدس حديد م (صيني)', stock: '0 حبة (خلصان)', cost: '95.00', sale: '150.00', profit: '+55.00' },
                      { code: '628799036201', sku: 'SKU-9036-201', name: 'مسدس حديد (صيني)', stock: '0 حبة (خلصان)', cost: '50.00', sale: '100.00', profit: '+50.00' },
                      { code: '628799036200', sku: 'SKU-9036-200', name: 'مسدس هواء (صيني)', stock: '0 حبة (خلصان)', cost: '45.00', sale: '75.00', profit: '+30.00' },
                      { code: '628799036199', sku: 'SKU-9036-199', name: 'مسدس هواء كبير (صيني)', stock: '4 حبة', cost: '60.00', sale: '90.00', profit: '+30.00' },
                      { code: '628799035198', sku: 'SKU-9035-198', name: 'طقم مسدس (صيني)', stock: '0 حبة (خلصان)', cost: '1,000.00', sale: '1,500.00', profit: '+500.00' },
                      { code: '628799035197', sku: 'SKU-9035-197', name: 'دباسة 5سم (داهو)', stock: '0 حبة (خلصان)', cost: '1,375.00', sale: '1,500.00', profit: '+125.00' },
                      { code: '628799035196', sku: 'SKU-9035-196', name: 'دبوس F50 (صيني)', stock: '3 حبة', cost: '140.00', sale: '175.00', profit: '+35.00' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 text-slate-400">{row.code}</td>
                        <td className="p-3 font-sans">
                          <div className="font-bold text-slate-100">{row.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{row.sku}</div>
                        </td>
                        <td className="p-3 font-sans text-slate-400">{isAr ? 'عام' : 'General'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.stock.includes('خلصان') 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {row.stock}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{row.cost} {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-3 text-blue-400 font-bold">{row.sale} {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-3 text-emerald-400 font-bold">{row.profit} {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-slate-400">
                            <button className="p-1 hover:text-blue-400" title="Print Barcode"><Printer className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-amber-400" title="Edit"><FileText className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-rose-400" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. MODULE: WAREHOUSES & INVENTORY (Screenshot 4) */}
          {activeModule === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-amber-400" />
                    <span>{isAr ? 'إدارة المستودعات وحركات المخزون' : 'Warehouses & Inventory Movements'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'متابعة أرصدة الفروع، المناقلات المخزنية، والتسويات الجردية' : 'Branch balances, inter-warehouse transfers, and stock reconciliations'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">
                    {isAr ? 'أرصدة المستودع' : 'Warehouse Balances'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
                    {isAr ? 'تحويل بضاعة بين المخازن' : 'Transfer Goods'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
                    {isAr ? 'تسوية وجرد المخزون' : 'Inventory Audit'}
                  </span>
                </div>
              </div>

              {/* Table from Screenshot 4 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'الصنف' : 'Item'}</th>
                      <th className="p-3 text-start">{isAr ? 'الباركود' : 'Barcode'}</th>
                      <th className="p-3 text-start">{isAr ? 'القسم' : 'Category'}</th>
                      <th className="p-3 text-start">{isAr ? 'الرصيد في المستودع الحالي' : 'Current Warehouse Balance'}</th>
                      <th className="p-3 text-start">{isAr ? 'الحد الأدنى للتنبيه' : 'Min Alert Threshold'}</th>
                      <th className="p-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {[
                      { name: 'مسدس رش ك (صيني)', barcode: '628799036204', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'مسدس عداد تزويد (صيني)', barcode: '628799036203', balance: '1 حبة', min: '5 حبة', status: 'أوشك على النفاد', statusColor: 'bg-amber-600/30 text-amber-300 border border-amber-600/50' },
                      { name: 'مسدس حديد م (صيني)', barcode: '628799036202', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'مسدس حديد (صيني)', barcode: '628799036201', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'مسدس هواء (صيني)', barcode: '628799036200', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'مسدس هواء كبير (صيني)', barcode: '628799036199', balance: '4 حبة', min: '5 حبة', status: 'أوشك على النفاد', statusColor: 'bg-amber-600/30 text-amber-300 border border-amber-600/50' },
                      { name: 'طقم مسدس (صيني)', barcode: '628799035198', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'دباسة 5سم (داهو)', barcode: '628799035197', balance: '0 حبة', min: '5 حبة', status: 'خلصان (0 حبة)', statusColor: 'bg-rose-500 text-white' },
                      { name: 'دبوس F50 (صيني)', barcode: '628799035196', balance: '3 حبة', min: '5 حبة', status: 'أوشك على النفاد', statusColor: 'bg-amber-600/30 text-amber-300 border border-amber-600/50' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 font-sans font-bold text-slate-100">{row.name}</td>
                        <td className="p-3 text-slate-400">{row.barcode}</td>
                        <td className="p-3 font-sans text-slate-400">{isAr ? 'عام' : 'General'}</td>
                        <td className="p-3 font-bold text-slate-200">{row.balance}</td>
                        <td className="p-3 text-slate-400">{row.min}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. MODULE: PURCHASES & SUPPLY (Screenshot 1) */}
          {activeModule === 'purchases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-indigo-400" />
                    <span>{isAr ? 'فواتير المشتريات والتوريد' : 'Purchase Invoices & Supply Orders'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'فواتير المشتريات، توريد البضاعة للمستودع، وتحديث أرصدة الموردين' : 'Supplier billing, stock supply receipts, and payable balancing'}
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? '+ فاتورة شراء جديدة' : '+ New Purchase Order'}</span>
                </button>
              </div>

              {/* Purchase Table from Screenshot 1 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'رقم الفاتورة' : 'Invoice #'}</th>
                      <th className="p-3 text-start">{isAr ? 'المورد' : 'Supplier'}</th>
                      <th className="p-3 text-start">{isAr ? 'فاتورة المورد' : 'Supplier Ref #'}</th>
                      <th className="p-3 text-start">{isAr ? 'طريقة السداد' : 'Payment'}</th>
                      <th className="p-3 text-start">{isAr ? 'الإجمالي' : 'Total'}</th>
                      <th className="p-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                      <th className="p-3 text-center">{isAr ? 'مرتجع' : 'Return'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-blue-400">PUR-000001</td>
                      <td className="p-3 font-sans font-bold text-slate-100">{isAr ? 'شركة التوزيع المتحدة للتجارة' : 'United Trading Co.'}</td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-slate-300 font-sans">{isAr ? 'نقداً' : 'Cash'}</td>
                      <td className="p-3 font-bold text-slate-100">47,250.00 {isAr ? 'ج.م' : 'EGP'}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40">
                          {isAr ? 'تم الدفع والتوريد' : 'Paid & Supplied'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">2026/10/11</td>
                      <td className="p-3 text-center">
                        <button className="p-1 hover:text-amber-400 text-slate-500" title="Return">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. MODULE: CUSTOMERS & RECEIVABLES (Screenshot 7) */}
          {activeModule === 'customers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span>{isAr ? 'دليل العملاء وحسابات الذمم والديون' : 'Customer Directory & Credit Accounts'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'سجلات العملاء، حسابات الآجل، حدود الائتمان، وسندات التحصيل' : 'Customer credit ceilings, aging debt balances, statements, and receipt vouchers'}
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? '+ إضافة عميل جديد' : '+ New Customer'}</span>
                </button>
              </div>

              {/* Table from Screenshot 7 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'كود العميل' : 'Customer Code'}</th>
                      <th className="p-3 text-start">{isAr ? 'اسم العميل' : 'Customer Name'}</th>
                      <th className="p-3 text-start">{isAr ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="p-3 text-start">{isAr ? 'حد الائتمان' : 'Credit Limit'}</th>
                      <th className="p-3 text-start">{isAr ? 'الرصيد الحالي' : 'Current Balance'}</th>
                      <th className="p-3 text-center">{isAr ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {[
                      { code: 'CUST-1001', name: 'عميل نقدي عام (نقداً)', phone: '0500000000', limit: '0.00', balance: '0.00 ج.م', status: 'خالص (0.00)', isDebt: false },
                      { code: 'CUST-2737', name: 'عوض وجدى', phone: '01202332355', limit: '5,000.00', balance: '3,009.00 ج.م', status: 'مطلوب منه (مدين)', isDebt: true },
                      { code: 'CUST-5211', name: 'مايكل', phone: '0123345554', limit: '5,000.00', balance: '0.00 ج.م', status: 'خالص (0.00)', isDebt: false },
                      { code: 'CUST-3738', name: 'gdfbd', phone: '-', limit: '5,000.00', balance: '360.00 ج.م', status: 'مطلوب منه (مدين)', isDebt: true },
                      { code: 'CUST-4542', name: 'وجدى', phone: '01225321164', limit: '5,000.00', balance: '16.00 ج.م', status: 'مطلوب منه (مدين)', isDebt: true },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 text-blue-400 font-bold">{row.code}</td>
                        <td className="p-3 font-sans font-bold text-slate-100">{row.name}</td>
                        <td className="p-3 text-slate-400">{row.phone}</td>
                        <td className="p-3 text-slate-400">{row.limit} {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-3">
                          <div className={`font-bold ${row.isDebt ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {row.balance}
                          </div>
                          <div className="text-[10px] text-slate-500 font-sans">
                            {row.status}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 font-sans">
                            {row.isDebt && (
                              <button className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[11px] font-bold">
                                {isAr ? 'سند قبض' : 'Collect'}
                              </button>
                            )}
                            <button className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-[11px]">
                              {isAr ? 'كشف حساب' : 'Statement'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. MODULE: SUPPLIERS & PAYABLES (Screenshot 6) */}
          {activeModule === 'suppliers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-500" />
                    <span>{isAr ? 'دليل الموردين ومستحقاتهم' : 'Suppliers Directory & Payables'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'سجلات الموردين، حسابات التوريد الآجل، وسندات صرف المستحقات' : 'Supplier directory, credit supply ledger, and payment vouchers'}
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? '+ إضافة مورد جديد' : '+ New Supplier'}</span>
                </button>
              </div>

              {/* Table from Screenshot 6 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'كود المورد' : 'Supplier Code'}</th>
                      <th className="p-3 text-start">{isAr ? 'اسم المورد' : 'Supplier Name'}</th>
                      <th className="p-3 text-start">{isAr ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="p-3 text-start">{isAr ? 'الرقم الضريبي' : 'Tax ID'}</th>
                      <th className="p-3 text-start">{isAr ? 'مستحقات المورد' : 'Payable Dues'}</th>
                      <th className="p-3 text-center">{isAr ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {[
                      { code: 'SUPP-1001', name: 'شركة التوزيع المتحدة للتجارة', phone: '0533344455', tax: '300112233400003', dues: '0.00 ج.م (خالص)' },
                      { code: 'SUPP-1002', name: 'مؤسسة نجد للتوريدات العالمية', phone: '0555566677', tax: '300887766500003', dues: '0.00 ج.م (خالص)' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 text-blue-400 font-bold">{row.code}</td>
                        <td className="p-3 font-sans font-bold text-slate-100">{row.name}</td>
                        <td className="p-3 text-slate-400">{row.phone}</td>
                        <td className="p-3 text-slate-400">{row.tax}</td>
                        <td className="p-3 text-emerald-400 font-bold">{row.dues}</td>
                        <td className="p-3 text-center">
                          <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-sans text-[11px]">
                            {isAr ? 'كشف حساب' : 'Statement'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. MODULE: EXPENSES & TREASURY (Screenshot 8) */}
          {activeModule === 'expenses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-rose-500" />
                    <span>{isAr ? 'المصروفات اليومية وإدارة النقدية' : 'Daily Expenses & Treasury Register'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'تسجيل المصروفات التشغيلية والنثرية وإدارتها حسب البنود' : 'Record operational expenses and store overhead disbursements'}
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setExpenseToast(true);
                    setTimeout(() => setExpenseToast(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? '+ تسجيل مصروف جديد' : '+ Record Expense'}</span>
                </button>
              </div>

              {/* Toast banner matching Screenshot 8 */}
              {expenseToast && (
                <div className="p-3 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'تم تسجيل المصروف بنجاح' : 'Expense recorded successfully into cash ledger'}</span>
                </div>
              )}

              {/* Big High-Contrast Total Expenses Card matching Screenshot 8 */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-rose-700 text-white shadow-xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-rose-100">
                    {isAr ? 'إجمالي المصروفات المسجلة' : 'Total Recorded Expenses'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono">
                    400.00 {isAr ? 'ج.م' : 'EGP'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-black">
                  $
                </div>
              </div>

              {/* Expense Table from Screenshot 8 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'البند' : 'Expense Item'}</th>
                      <th className="p-3 text-start">{isAr ? 'المبلغ' : 'Amount'}</th>
                      <th className="p-3 text-start">{isAr ? 'طريقة الدفع' : 'Payment Method'}</th>
                      <th className="p-3 text-start">{isAr ? 'رقم السند' : 'Voucher #'}</th>
                      <th className="p-3 text-start">{isAr ? 'البيان والتفاصيل' : 'Notes'}</th>
                      <th className="p-3 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                      <th className="p-3 text-center">{isAr ? 'حذف' : 'Delete'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-sans font-bold text-slate-100">{isAr ? 'إيجار المحل والمستودع' : 'Shop & Warehouse Rent'}</td>
                      <td className="p-3 font-black text-rose-400">400.00 {isAr ? 'ج.م' : 'EGP'}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-slate-800 text-slate-300">
                          {isAr ? 'نقداً من الصندوق' : 'Cash from Drawer'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-slate-400">2026/10/13</td>
                      <td className="p-3 text-center">
                        <button className="p-1 hover:text-rose-400 text-slate-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. MODULE: FINANCIAL REPORTS (Screenshot 11) */}
          {activeModule === 'reports' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <span>{isAr ? 'التقارير المالية والأرباح السنوية' : 'Financial Reports & Profit Margins'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'تحليل الأرباح والخسائر، هوامش الربح الصافية، وتكلفة البضاعة المباعة' : 'Net profit margins, P&L statements, and 12-month revenue analytics'}
                  </p>
                </div>

                {/* Filter Tabs matching Screenshot 11 */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer whitespace-nowrap">
                    {isAr ? 'صافي أرباح الشهر والسنة' : 'Month & Year Net Profit'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer whitespace-nowrap">
                    {isAr ? 'تقرير الأرباح والخسائر' : 'P&L Statement'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer whitespace-nowrap">
                    {isAr ? 'تقرير تقييم المخزون' : 'Stock Valuation'}
                  </span>
                </div>
              </div>

              {/* 4 Cards from Screenshot 11 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-start space-y-1">
                  <div className="text-xs text-emerald-300 font-semibold">{isAr ? 'صافي أرباح الشهر الحالي' : 'Current Month Net Profit'}</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">3,216.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-emerald-200 font-mono">{isAr ? 'مبيعات الشهر: 16,320.00 ج.م' : 'Month Sales: 16,320.00'}</div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-600/40 text-start space-y-1">
                  <div className="text-xs text-blue-300 font-semibold">{isAr ? 'صافي أرباح السنة الحالية' : 'Current Year Net Profit'}</div>
                  <div className="text-2xl font-black font-mono text-blue-400">3,216.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-blue-200 font-mono">{isAr ? 'مبيعات السنة: 16,320.00 ج.م' : 'Year Sales: 16,320.00'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'هامش الربح السنوي الصافي' : 'Net Annual Margin'}</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">19.7%</div>
                  <div className="text-[10px] text-slate-500">{isAr ? 'نسبة العائد الصافي من إجمالي المبيعات' : 'Yield from gross turnover'}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 text-start space-y-1">
                  <div className="text-xs text-slate-400">{isAr ? 'صافي أرباح اليوم' : "Today's Net Profit"}</div>
                  <div className="text-2xl font-black font-mono text-rose-400">-435.00 {isAr ? 'ج.م' : 'EGP'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{isAr ? 'مبيعات اليوم: 165.00 ج.م' : 'Sales: 165.00 EGP'}</div>
                </div>
              </div>

              {/* Monthly Breakdown Table from Screenshot 11 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] p-4 space-y-3">
                <div className="text-xs font-bold text-slate-200">
                  {isAr ? 'تفصيل المبيعات والتكاليف وصافي الأرباح شهرياً (خلال العام)' : 'Monthly Sales, COGS & Net Profits Breakdown (Yearly)'}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-2.5 text-start">{isAr ? 'الشهر' : 'Month'}</th>
                        <th className="p-2.5 text-start">{isAr ? 'إجمالي المبيعات' : 'Gross Sales'}</th>
                        <th className="p-2.5 text-start">{isAr ? 'تكلفة البضاعة المباعة' : 'COGS'}</th>
                        <th className="p-2.5 text-start">{isAr ? 'صافي الربح الفعلي' : 'Actual Net Profit'}</th>
                        <th className="p-2.5 text-start">{isAr ? 'نسبة هامش الربح' : 'Margin %'}</th>
                        <th className="p-2.5 text-start">{isAr ? 'مؤشر الأداء' : 'Performance'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                      {Array.from({ length: 9 }, (_, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 text-slate-400">
                          <td className="p-2 font-sans font-bold text-slate-300">{isAr ? `شهر ${i + 1}` : `Month ${i + 1}`}</td>
                          <td className="p-2">0.00 {isAr ? 'ج.م' : 'EGP'}</td>
                          <td className="p-2">0.00 {isAr ? 'ج.م' : 'EGP'}</td>
                          <td className="p-2 text-slate-500">+0.00 {isAr ? 'ج.م' : 'EGP'}</td>
                          <td className="p-2">0%</td>
                          <td className="p-2">
                            <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div className="w-0 h-full bg-emerald-500"></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* Active Month 10 from Screenshot 11 */}
                      <tr className="bg-emerald-950/20 font-bold">
                        <td className="p-2 font-sans text-emerald-400">{isAr ? 'شهر 10 (أكتوبر)' : 'Month 10 (Oct)'}</td>
                        <td className="p-2 text-slate-100">16,320.00 {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-2 text-slate-400">12,704.00 {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-2 text-emerald-400">+3,216.00 {isAr ? 'ج.م' : 'EGP'}</td>
                        <td className="p-2 text-emerald-400 font-bold">19.7%</td>
                        <td className="p-2">
                          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div className="w-[19.7%] h-full bg-emerald-400"></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 10. MODULE: USERS & PERMISSIONS (Screenshot 10) */}
          {activeModule === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-purple-400" />
                    <span>{isAr ? 'المستخدمين والصلاحيات الدقيقة' : 'Users & Granular Role Permissions'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'إدارة الحسابات، صلاحيات الكاشير وصاحب المحل، كلمات المرور ورموز PIN' : 'Manage operator accounts, role boundaries, fast PINs, and audit logs'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs">
                    {isAr ? 'المستخدمين (2)' : 'Users (2)'}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#0e1526] border border-slate-800 text-slate-400 text-xs cursor-pointer">
                    {isAr ? 'سجل نشاط العمليات (Audit Log)' : 'Audit Log'}
                  </span>
                </div>
              </div>

              {/* Two Role Explanation Cards matching Screenshot 10 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <span>👑</span>
                    <span>{isAr ? 'صاحب المحل (المدير العام)' : 'Store Owner (General Manager)'}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr 
                      ? 'يمتلك كامل الصلاحيات دون أي قيود: الاطلاع على تقارير الأرباح والخسائر، فواتير الشراء، المصروفات والخزينة، حركة المخازن، إدارة المستخدمين، وإعدادات النظام.'
                      : 'Holds unrestricted system authorization: Access to real-time profit & loss reports, wholesale invoices, treasury balances, inventory adjustments, and system settings.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-600/40 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isAr ? 'كاشير المحل (صلاحيات البيع فقط)' : 'Store Cashier (Sales Only)'}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr 
                      ? 'مخصص لعمليات البيع وإصدار الفواتير وطباعتها والبحث عن الأصناف والأسعار. محجوب عنه تماماً الوصول إلى تقارير الأرباح والمصروفات وإعدادات المحل لحماية الخصوصية.'
                      : 'Restricted strictly to checkout, barcode lookup, invoice printing, and returns. Shielded completely from profit margins, purchase costs, and executive configurations.'}
                  </p>
                </div>
              </div>

              {/* Users Table from Screenshot 10 */}
              <div className="rounded-xl border border-slate-800 bg-[#0e1526] overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090e1a] text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">{isAr ? 'الاسم الكامل' : 'Full Name'}</th>
                      <th className="p-3 text-start">{isAr ? 'اسم المستخدم' : 'Username'}</th>
                      <th className="p-3 text-start">{isAr ? 'الدور والصلاحية' : 'Role'}</th>
                      <th className="p-3 text-start">{isAr ? 'رمز PIN السريع' : 'Quick PIN'}</th>
                      <th className="p-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-3 text-start">{isAr ? 'الصلاحيات الممنوحة' : 'Granted Permissions'}</th>
                      <th className="p-3 text-center">{isAr ? 'التحكم' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-sans font-bold text-slate-100 flex items-center gap-1.5">
                        <span>👑</span>
                        <span>{isAr ? 'صاحب المحل (المدير العام)' : 'Store Owner (General Manager)'}</span>
                      </td>
                      <td className="p-3 text-amber-400 font-bold">mina</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {isAr ? 'مدير عام (كامل الصلاحيات)' : 'General Manager (Full)'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 tracking-widest">••••</td>
                      <td className="p-3 font-sans text-emerald-400 font-bold">{isAr ? 'نشط ومفعل' : 'Active'}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          ✨ {isAr ? 'كامل صلاحيات النظام (10 من 10)' : 'Full System Permissions (10/10)'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button className="px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-[11px]">
                          {isAr ? 'تعديل والصلاحيات' : 'Edit Permissions'}
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-sans font-bold text-slate-100 flex items-center gap-1.5">
                        <span>👤</span>
                        <span>{isAr ? 'كاشير المحل (مبيعات)' : 'Store Cashier (Sales)'}</span>
                      </td>
                      <td className="p-3 text-indigo-400 font-bold">cashier</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {isAr ? 'كاشير / بائع' : 'Cashier / Seller'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 tracking-widest">••••</td>
                      <td className="p-3 font-sans text-emerald-400 font-bold">{isAr ? 'نشط ومفعل' : 'Active'}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                          🛒 {isAr ? '4 صلاحية مفعلة (البيع والأصناف)' : '4 Active Permissions (Sales & POS)'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button className="px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-[11px]">
                          {isAr ? 'تعديل والصلاحيات' : 'Edit Permissions'}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 11. MODULE: SYSTEM SETTINGS (Screenshot 12) */}
          {activeModule === 'settings' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  <span>{isAr ? 'إعدادات النظام والنسخ الاحتياطي' : 'System Settings & Automated Backups'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr ? 'تخصيص الفواتير، مسارات حفظ ملفات PDF التلقائية، ونسخ قاعدة بيانات SQLite' : 'Thermal receipt branding, automated local PDF backup path, and SQLite snapshots'}
                </p>
              </div>

              {/* Tax-Free Status Callout matching Screenshot 12 */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  {isAr 
                    ? 'النظام يعمل بنظام التجارة المباشرة المعفية من الضرائب (Tax-Free Direct Commerce). كافة الحسابات والأرباح والمبيعات صافية 100%.'
                    : 'System operates under Tax-Free Direct Commerce. All revenue, ledger profits, and customer invoices are 100% net.'}
                </span>
              </div>

              {/* Customizing Printed Invoices matching Screenshot 12 */}
              <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>{isAr ? 'تخصيص الفاتورة المطبوعة' : 'Thermal Receipt Customization'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">{isAr ? 'الترويسة الترحيبية أعلى الفاتورة' : 'Header Welcome Message'}</label>
                    <input
                      type="text"
                      defaultValue={isAr ? 'أهلاً بكم في متجر الفارس - نسعد بخدمتكم' : 'Welcome to AL FARES Store - Glad to serve you'}
                      className="w-full p-2.5 rounded-lg bg-[#0a0f1d] border border-slate-700 text-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">{isAr ? 'ملاحظات وشروط أسفل الفاتورة' : 'Footer Terms & Conditions'}</label>
                    <input
                      type="text"
                      defaultValue={isAr ? 'البضاعة المباعة ترد وتستبدل خلال 14 يوماً بالفاتورة الأصلية' : 'Goods returnable within 14 days with original receipt'}
                      className="w-full p-2.5 rounded-lg bg-[#0a0f1d] border border-slate-700 text-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SQLite Database Backup matching Screenshot 12 */}
              <div className="p-4 rounded-xl bg-[#0e1526] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'النسخ الاحتياطي والأمان (SQLite Database)' : 'Local SQLite Database Backup'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setBackupToast(true);
                      setTimeout(() => setBackupToast(false), 3000);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إنشاء نسخة احتياطية للبيانات الآن' : 'Backup Database Now'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isAr 
                    ? 'يتم حفظ ملف SQLite كامل بجميع الفواتير والمخزون وحركات الصندوق في مجلد data محلياً على جهاز العميل.' 
                    : 'Generates a single self-contained SQLite snapshot file with all invoices, inventory logs, and ledgers in the local data directory.'}
                </p>
                {backupToast && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'تم إنشاء نسخة SQLite بنجاح في مجلد data' : 'SQLite snapshot generated successfully in local data folder'}</span>
                  </div>
                )}
              </div>

              {/* PDF Auto-Backup Directory matching Screenshot 12 */}
              <div className="p-4 rounded-xl bg-[#0e1526] border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>{isAr ? 'النسخ الاحتياطي التلقائي لفواتير المبيعات (PDF Invoices Auto-Backup)' : 'Automated PDF Invoices Archiving'}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-400 text-[10px] font-bold">
                    {isAr ? 'مُفعل تلقائياً' : 'Auto-Enabled'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#090e1a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-slate-400 text-[11px]">{isAr ? 'مجلد حفظ فواتير PDF على القرص الصلب:' : 'Local Disk PDF Storage Directory:'}</div>
                    <div className="font-mono text-blue-400 text-xs select-all">
                      📁 D:\AL_FARES gimi\invoices_pdf_backup
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      📄 {isAr ? '26 فاتورة محفوظة حتى الآن' : '26 Saved PDF Invoices'}
                    </span>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer">
                      <span>{isAr ? 'فتح مجلد فواتير PDF' : 'Open PDF Folder'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment & Invoice Modal (F10) */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f1629] border border-slate-700 p-6 space-y-5 shadow-2xl text-start">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-slate-100">
                  {isAr ? 'إتمام عملية البيع وإصدار الفاتورة' : 'Settle Payment & Issue Official Receipt'}
                </h3>
              </div>
              <button 
                onClick={() => setIsPaymentOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {invoiceIssued ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-lg font-bold text-slate-100">
                  {isAr ? 'تم إصدار الفاتورة بنجاح!' : 'Invoice Issued & Printed Successfully!'}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {isAr ? 'تم حفظ نسخة PDF تلقائياً في: D:\\AL_FARES gimi\\invoices_pdf_backup' : 'Saved PDF backup to: D:\\AL_FARES gimi\\invoices_pdf_backup'}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Total display */}
                <div className="p-4 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{isAr ? 'المبلغ المطلوب سداده:' : 'Amount Due:'}</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">{total.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      paymentMethod === 'cash' ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>{isAr ? 'نقداً (كاش)' : 'Cash'}</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      paymentMethod === 'card' ? 'bg-blue-600/30 text-blue-300 border-blue-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isAr ? 'فيزا / بطاقة' : 'Card'}</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      paymentMethod === 'credit' ? 'bg-amber-600/30 text-amber-300 border-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>{isAr ? 'آجل (ذمم)' : 'Customer Debt'}</span>
                  </button>
                </div>

                {/* Cash denominations */}
                {paymentMethod === 'cash' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{isAr ? 'المبلغ المستلم من العميل:' : 'Cash Tendered:'}</span>
                      <span className="font-mono text-slate-200 font-bold">{cashReceived} {isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[10, 20, 50, 100, 200, 500].map(val => (
                        <button
                          key={val}
                          onClick={() => setCashReceived(prev => prev + val)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
                        >
                          +{val}
                        </button>
                      ))}
                      <button
                        onClick={() => setCashReceived(total)}
                        className="px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 text-xs font-bold cursor-pointer"
                      >
                        {isAr ? 'المبلغ بالضبط' : 'Exact'}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{isAr ? 'الباقي المستحق للعميل:' : 'Change Due:'}</span>
                      <span className="font-mono font-bold text-amber-400 text-base">{change.toFixed(2)} {isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={completePayment}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة الفاتورة وحفظ نسخة PDF (Enter)' : 'Confirm & Print Invoice (Enter)'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shift Startup Modal */}
      {showShiftModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0f1629] border border-slate-700 p-6 space-y-4 shadow-2xl text-start">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'فتح وردية جديدة وضبط الصندوق' : 'Open Shift & Balance Cash Drawer'}</span>
              </h3>
              <button onClick={() => setShowShiftModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                {isAr ? 'سجل الرصيد الافتتاحي في درج النقدية لتوثيق الوردية:' : 'Record starting cash balance in register for audit trail:'}
              </p>
              <div className="space-y-1">
                <label className="text-slate-400">{isAr ? 'الرصيد الافتتاحي (عهدة الكاش):' : 'Starting Drawer Balance (EGP):'}</label>
                <input
                  type="number"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#090e1a] border border-slate-700 text-slate-100 font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400">{isAr ? 'ملاحظات الوردية:' : 'Shift Handover Notes:'}</label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: تسليم وردية صباحية' : 'e.g., Morning Shift Handover'}
                  className="w-full p-2.5 rounded-xl bg-[#090e1a] border border-slate-700 text-slate-100"
                />
              </div>

              <button
                onClick={() => {
                  setIsShiftOpen(true);
                  setShowShiftModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تأكيد وفتح الوردية رسمياً' : 'Confirm & Open Shift'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
