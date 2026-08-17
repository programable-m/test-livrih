import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FileText,
  RotateCcw,
  LifeBuoy,
  Settings,
  Truck,
  TrendingUp,
  Banknote,
  CheckCircle2,
  Clock,
  Printer,
  FileSpreadsheet,
  LogOut,
  Bell,
  Sparkles,
  Search,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Language, Parcel, Invoice, ReturnItem, ClaimTicket, User } from '../../types';
import { MerchantParcelsView } from './MerchantParcelsView';
import { MerchantInvoicesView } from './MerchantInvoicesView';
import { MerchantReturnsView } from './MerchantReturnsView';
import { MerchantClaimsView } from './MerchantClaimsView';
import { MerchantSettingsView } from './MerchantSettingsView';
import { MerchantNewParcelModal } from './MerchantNewParcelModal';
import { MerchantLabelModal } from './MerchantLabelModal';

interface MerchantDashboardProps {
  lang: Language;
  currentUser: User;
  parcels: Parcel[];
  invoices: Invoice[];
  returns: ReturnItem[];
  claims: ClaimTicket[];
  onAddParcel: (p: Parcel) => void;
  onAddClaim: (c: ClaimTicket) => void;
  onLogout: () => void;
  onTrackCode: (code: string) => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  lang,
  currentUser,
  parcels = [],
  invoices = [],
  returns = [],
  claims = [],
  onAddParcel,
  onAddClaim,
  onLogout,
  onTrackCode,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'parcels' | 'invoices' | 'returns' | 'claims' | 'settings'>('overview');
  const [isNewParcelOpen, setIsNewParcelOpen] = useState(false);
  const [selectedLabelParcel, setSelectedLabelParcel] = useState<Parcel | null>(null);
  const [pickupRequested, setPickupRequested] = useState(false);

  const safeParcels = Array.isArray(parcels) ? parcels : [];
  const safeInvoices = Array.isArray(invoices) ? invoices : [];
  const safeReturns = Array.isArray(returns) ? returns : [];
  const safeClaims = Array.isArray(claims) ? claims : [];

  // Computed Metrics
  const totalParcels = safeParcels.length;
  const deliveredParcels = safeParcels.filter((p) => p.status === 'LIVRE' || p.status === 'PAYE');
  const inTransitParcels = safeParcels.filter((p) => p.status === 'EN_COURS_LIVRAISON' || p.status === 'RAMASSE' || p.status === 'AU_CENTRE_TRI');
  const deliveryRate = totalParcels > 0 ? Math.round((deliveredParcels.length / totalParcels) * 100) : 0;
  const totalCodCollected = deliveredParcels.reduce((acc, p) => acc + (p.codAmount || 0), 0);

  const handleRequestPickup = () => {
    setPickupRequested(true);
    setTimeout(() => setPickupRequested(false), 4000);
  };

  const navItems = [
    { id: 'overview', labelAr: 'لوحة التحكم', labelFr: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'parcels', labelAr: 'الشحنات والطرود', labelFr: 'Mes Colis', count: totalParcels, icon: Package },
    { id: 'invoices', labelAr: 'الفواتير والـ COD', labelFr: 'Factures & COD', count: safeInvoices.length, icon: Banknote },
    { id: 'returns', labelAr: 'إدارة المرتجعات', labelFr: 'Retours', count: safeReturns.length, icon: RotateCcw },
    { id: 'claims', labelAr: 'الشكايات والدعم', labelFr: 'Réclamations', count: safeClaims.filter((c) => c.status === 'OUVERT').length, icon: LifeBuoy },
    { id: 'settings', labelAr: 'الإعدادات و RIB', labelFr: 'Paramètres & RIB', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-slate-300 flex flex-col justify-between shrink-0 border-r rtl:border-r-0 rtl:border-l border-slate-800">
        <div>
          {/* Logo & Store Pill */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  livrih<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">Espace Marchand</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <div className="text-[11px] font-bold text-white truncate">
                {currentUser.storeName || 'Atlas Fashion Store'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                RIB: {currentUser.bankName || 'Attijariwafa'}
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1.5 text-xs font-bold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{lang === 'ar' ? item.labelAr : item.labelFr}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isActive ? 'bg-white text-emerald-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={() => setIsNewParcelOpen(true)}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة طرد جديد' : 'Nouveau Colis'}</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Pickup Request Banner (if triggered) */}
        {pickupRequested && (
          <div className="mb-6 p-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>
                {lang === 'ar'
                  ? 'تم إرسال طلب الرمساج لمندوب livrih! موعد الجمع اليوم بين 14:00 و 17:00'
                  : 'Demande de ramassage confirmée ! Un livreur passera aujourd\'hui entre 14h et 17h.'}
              </span>
            </div>
            <span className="text-xs bg-slate-950 text-white px-3 py-1 rounded-lg">
              {lang === 'ar' ? 'تم التثبيت' : 'Confirmé'}
            </span>
          </div>
        )}

        {/* Dynamic Views */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Welcome Bar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'ar' ? `مرحباً بك، ${currentUser.name}` : `Bienvenue, ${currentUser.name}`}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar' ? 'إليك الملخص اللوجستي والمالي لمتجرك اليوم' : 'Synthèse de vos expéditions et versements COD'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleRequestPickup}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'ar' ? 'طلب جمع الطرود (Ramassage)' : 'Demander Ramassage'}</span>
                </button>

                <button
                  onClick={() => setIsNewParcelOpen(true)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إضافة شحنة' : 'Nouveau Colis'}</span>
                </button>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>{lang === 'ar' ? 'إجمالي الطرود' : 'Total Expéditions'}</span>
                  <Package className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {totalParcels}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>{inTransitParcels.length} {lang === 'ar' ? 'في الطريق' : 'en cours de livraison'}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>{lang === 'ar' ? 'نسبة التسليم الناجح' : 'Taux de Livraison'}</span>
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-3xl font-black text-emerald-700 font-mono">
                  {deliveryRate}%
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${deliveryRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>{lang === 'ar' ? 'مبالغ الـ COD المحصلة' : 'Encaissements COD'}</span>
                  <Banknote className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {totalCodCollected.toLocaleString()} <span className="text-xs font-sans">MAD</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  {deliveredParcels.length} {lang === 'ar' ? 'طرد مقبوض' : 'colis encaissés'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>{lang === 'ar' ? 'موعد التحويل القادم' : 'Prochain Virement'}</span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {lang === 'ar' ? 'اليوم في 16:30' : 'Aujourd\'hui 16h30'}
                </div>
                <div className="text-[11px] text-slate-400">
                  RIB: Attijariwafa Bank
                </div>
              </div>
            </div>

            {/* Quick Parcels Table Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-extrabold text-slate-900">
                  {lang === 'ar' ? 'آخر الشحنات المسجلة' : 'Derniers colis enregistrés'}
                </h3>
                <button
                  onClick={() => setActiveTab('parcels')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'عرض جميع الطرود' : 'Voir tout'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-3 px-4 text-start">{lang === 'ar' ? 'رقم التتبع' : 'Code'}</th>
                      <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الزبون' : 'Client'}</th>
                      <th className="py-3 px-4 text-start">{lang === 'ar' ? 'المدينة' : 'Ville'}</th>
                      <th className="py-3 px-4 text-start">{lang === 'ar' ? 'المبلغ' : 'Montant COD'}</th>
                      <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
                      <th className="py-3 px-4 text-center">{lang === 'ar' ? 'البوليصة' : 'Label'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parcels.slice(0, 5).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          <button
                            onClick={() => onTrackCode(p.trackingCode)}
                            className="hover:text-emerald-600 hover:underline"
                          >
                            {p.trackingCode}
                          </button>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{p.customerName}</td>
                        <td className="py-3 px-4 text-slate-600">{p.city}</td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">{p.codAmount} MAD</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setSelectedLabelParcel(p)}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parcels' && (
          <MerchantParcelsView
            lang={lang}
            parcels={parcels}
            onOpenNewParcel={() => setIsNewParcelOpen(true)}
            onSelectParcelForLabel={(p) => setSelectedLabelParcel(p)}
            onSelectParcelForTracking={(code) => onTrackCode(code)}
          />
        )}

        {activeTab === 'invoices' && (
          <MerchantInvoicesView lang={lang} invoices={invoices} />
        )}

        {activeTab === 'returns' && (
          <MerchantReturnsView lang={lang} parcels={parcels} returns={returns} />
        )}

        {activeTab === 'claims' && (
          <MerchantClaimsView lang={lang} claims={claims} onAddClaim={onAddClaim} />
        )}

        {activeTab === 'settings' && (
          <MerchantSettingsView lang={lang} currentUser={currentUser} />
        )}
      </main>

      {/* New Parcel Modal */}
      <MerchantNewParcelModal
        isOpen={isNewParcelOpen}
        onClose={() => setIsNewParcelOpen(false)}
        lang={lang}
        onAddParcel={onAddParcel}
      />

      {/* Printable Label Modal */}
      <MerchantLabelModal
        parcel={selectedLabelParcel}
        onClose={() => setSelectedLabelParcel(null)}
        lang={lang}
      />
    </div>
  );
};
