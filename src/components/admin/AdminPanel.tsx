import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Users,
  Building2,
  Package,
  Banknote,
  TrendingUp,
  MapPin,
  Search,
  Plus,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import { Language, Parcel, User, CityTarif, Agency } from '../../types';
import { MOROCCAN_CITIES_TARIFS, INITIAL_AGENCIES } from '../../data/mockData';

interface AdminPanelProps {
  lang: Language;
  currentUser: User;
  parcels: Parcel[];
  users: User[];
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lang,
  currentUser,
  parcels = [],
  users = [],
  onLogout,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'parcels' | 'drivers' | 'merchants' | 'tarifs'>('overview');
  const [tarifs, setTarifs] = useState<CityTarif[]>(MOROCCAN_CITIES_TARIFS);
  const [searchQuery, setSearchQuery] = useState('');

  const safeParcels = Array.isArray(parcels) ? parcels : [];
  const safeUsers = Array.isArray(users) ? users : [];

  const totalDelivered = safeParcels.filter((p) => p.status === 'LIVRE' || p.status === 'PAYE');
  const totalVolumeMad = deliveredParcelsTotal(safeParcels);

  function deliveredParcelsTotal(list: Parcel[]) {
    const safeList = Array.isArray(list) ? list : [];
    return safeList
      .filter((p) => p.status === 'LIVRE' || p.status === 'PAYE')
      .reduce((acc, p) => acc + (p.codAmount || 0), 0);
  }

  const driversList = safeUsers.filter((u) => u.role === 'driver');
  const merchantsList = safeUsers.filter((u) => u.role === 'merchant');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white">livrih<span className="text-teal-400">.</span></span>
                <span className="text-[10px] text-teal-400 font-mono block">Administration Hub</span>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setAdminTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                adminTab === 'overview' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{lang === 'ar' ? 'نظرة عامة والنشاط اللحظي' : 'Supervision Nationale'}</span>
            </button>

            <button
              onClick={() => setAdminTab('parcels')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                adminTab === 'parcels' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>{lang === 'ar' ? 'مراقبة جميع الطرود' : 'Tous les Colis'}</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full">{parcels.length}</span>
            </button>

            <button
              onClick={() => setAdminTab('drivers')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                adminTab === 'drivers' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أسطول الموزعين والسائقين' : 'Livreurs & Flotte'}</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full">{driversList.length}</span>
            </button>

            <button
              onClick={() => setAdminTab('merchants')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                adminTab === 'merchants' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>{lang === 'ar' ? 'التجار وحسابات RIB' : 'Marchands & RIBs'}</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full">{merchantsList.length}</span>
            </button>

            <button
              onClick={() => setAdminTab('tarifs')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                adminTab === 'tarifs' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إدارة تسعيرة المدن (Tarifs)' : 'Grille Tarifaire Villes'}</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-rose-400 bg-slate-800/80 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'ar' ? 'خروج' : 'Déconnexion'}</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
        {adminTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {lang === 'ar' ? 'لوحة القيادة المركزية لشبكة livrih المغرب' : 'Tour de Contrôle - livrih Maroc'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Casablanca Hub Central • 80+ Villes connectées en direct
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono">
                ● 24/7 Operations Live
              </div>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-semibold">{lang === 'ar' ? 'إجمالي الطرود بالشبكة' : 'Volume Total Colis'}</span>
                <div className="text-3xl font-black text-white font-mono">{parcels.length}</div>
                <div className="text-[11px] text-teal-400">+12% cette semaine</div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-semibold">{lang === 'ar' ? 'مجموع مبالغ الـ COD' : 'Flux COD Encaissé'}</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">{totalVolumeMad.toLocaleString()} MAD</div>
                <div className="text-[11px] text-emerald-400">Versements 24h à jour</div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-semibold">{lang === 'ar' ? 'الموزعون النشطون الآن' : 'Livreurs sur le terrain'}</span>
                <div className="text-3xl font-black text-teal-400 font-mono">{driversList.length}</div>
                <div className="text-[11px] text-slate-400">Casablanca, Rabat, Tanger...</div>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-semibold">{lang === 'ar' ? 'التجار المعتمدون' : 'Marchands Actifs'}</span>
                <div className="text-3xl font-black text-white font-mono">{merchantsList.length}</div>
                <div className="text-[11px] text-emerald-400">100% KYC vérifiés</div>
              </div>
            </div>

            {/* Hubs Overview Cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                {lang === 'ar' ? 'حالة المراكز والوكالات الجهوية (Hubs)' : 'Statut des Agences Régionales'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INITIAL_AGENCIES.slice(0, 3).map((agency) => (
                  <div key={agency.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-sm">{agency.nameFr}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-mono">
                        Opérationnel
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{agency.address}</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>Responsable: {agency.managerName}</span>
                      <span className="font-mono text-emerald-400">{agency.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminTab === 'parcels' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">{lang === 'ar' ? 'قاعدة بيانات جميع الشحنات' : 'Registre Global des Colis'}</h2>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-slate-700 text-slate-400 font-bold">
                    <th className="py-3 px-4 text-start">Code Suivi</th>
                    <th className="py-3 px-4 text-start">Marchand</th>
                    <th className="py-3 px-4 text-start">Client</th>
                    <th className="py-3 px-4 text-start">Ville</th>
                    <th className="py-3 px-4 text-start">Montant COD</th>
                    <th className="py-3 px-4 text-start">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {parcels.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{p.trackingCode}</td>
                      <td className="py-3 px-4 text-slate-300 font-semibold">{p.merchantStoreName}</td>
                      <td className="py-3 px-4 text-slate-300">{p.customerName}</td>
                      <td className="py-3 px-4 text-slate-300">{p.city}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{p.codAmount} MAD</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-200">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'drivers' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">{lang === 'ar' ? 'فريق الموزعين' : 'Équipe des Livreurs'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {driversList.map((driver) => (
                <div key={driver.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-sm">{driver.name}</h4>
                      <span className="text-xs text-teal-400 font-semibold">{driver.city}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                      En tournée
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Tél: {driver.phone} • {driver.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'merchants' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">{lang === 'ar' ? 'التجار وحسابات التحويل البنكي' : 'E-commerçants & RIB'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {merchantsList.map((merchant) => (
                <div key={merchant.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-sm">{merchant.storeName || merchant.name}</h4>
                      <span className="text-xs text-slate-400">{merchant.name} • {merchant.city}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded-md">
                      Virement 24h
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-500 block text-[10px]">RIB BANCAIRE VÉRIFIÉ:</span>
                    <span className="font-mono text-emerald-400 font-bold">{merchant.bankRib || '007780001234567890123456'}</span>
                    <span className="text-slate-400 block text-[10px]">{merchant.bankName || 'Attijariwafa Bank'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'tarifs' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">{lang === 'ar' ? 'إعدادات أسعار التوصيل للمدن' : 'Gestion des Tarifs par Ville'}</h2>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-slate-700 text-slate-400 font-bold">
                    <th className="py-3 px-4 text-start">Ville (FR)</th>
                    <th className="py-3 px-4 text-start">Ville (AR)</th>
                    <th className="py-3 px-4 text-start">Zone</th>
                    <th className="py-3 px-4 text-start">Tarif Livraison</th>
                    <th className="py-3 px-4 text-start">Tarif Retour</th>
                    <th className="py-3 px-4 text-start">Délai SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tarifs.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{t.nameFr}</td>
                      <td className="py-3 px-4 font-bold text-slate-300">{t.nameAr}</td>
                      <td className="py-3 px-4 text-slate-400">{t.zone}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{t.deliveryPrice} MAD</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{t.returnPrice} MAD</td>
                      <td className="py-3 px-4 font-mono text-teal-400">{t.slaHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
