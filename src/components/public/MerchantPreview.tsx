import React, { useState } from 'react';
import { Package, TrendingUp, Banknote, RefreshCcw, Search, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface MerchantPreviewProps {
  lang: Language;
  onOpenAuth: () => void;
}

export const MerchantPreview: React.FC<MerchantPreviewProps> = ({ lang, onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState<'kpi' | 'shipments' | 'invoices'>('shipments');

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Package className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'فضاء التاجر المتقدم' : lang === 'fr' ? 'Espace Marchand Dédié' : 'Merchant Portal Preview'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {lang === 'ar'
              ? 'كل ما تحتاجه لإدارة شحناتك وأموالك في شاشة واحدة'
              : lang === 'fr'
              ? 'Contrôlez vos expéditions et votre trésorerie en direct'
              : 'Everything you need to manage shipments and cashflow'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'لوحة تحكم ذكية، سهلة، وسريعة مصممة خصيصاً لمتاجر التجارة الإلكترونية، بائعي إنستغرام، والشركات.'
              : lang === 'fr'
              ? 'Un tableau de bord intuitif conçu pour les e-commerçants, vendeurs Instagram et marques marocaines.'
              : 'An intuitive dashboard tailored for Moroccan e-commerce stores, Instagram sellers, and brands.'}
          </p>
        </div>

        {/* Dashboard Frame Container */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
          {/* Top Mock Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white">
                M
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {lang === 'ar' ? 'متجر أطلس فاشن (Atlas Fashion)' : 'Atlas Fashion Store'}
                </div>
                <div className="text-xs text-slate-400">ID: MC-2025-001 • Casablanca</div>
              </div>
            </div>

            {/* View Switchers */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('shipments')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'shipments' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ar' ? 'الطرود والشحنات' : 'Colis récents'}
              </button>
              <button
                onClick={() => setActiveTab('kpi')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'kpi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ar' ? 'الإحصائيات' : 'Statistiques'}
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'invoices' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ar' ? 'فواتير COD' : 'Factures & Virements'}
              </button>
            </div>
          </div>

          {/* KPI Snapshot Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">{lang === 'ar' ? 'إجمالي الطرود' : 'Total Colis'}</div>
              <div className="text-xl sm:text-2xl font-black text-white">1,480</div>
              <div className="text-[11px] text-emerald-400 font-semibold">{lang === 'ar' ? 'هذا الشهر' : 'Ce mois-ci'}</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">{lang === 'ar' ? 'تم التسليم بنجاح' : 'Livrés avec succès'}</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">1,428</div>
              <div className="text-[11px] text-emerald-300 font-semibold">96.5% {lang === 'ar' ? 'نسبة التسليم' : 'Taux'}</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">{lang === 'ar' ? 'مبالغ COD المحصلة' : 'Total COD Encaissé'}</div>
              <div className="text-xl sm:text-2xl font-black text-teal-300">542,800 MAD</div>
              <div className="text-[11px] text-teal-400 font-semibold">{lang === 'ar' ? 'تم تحصيلها نقداً' : 'Encaissés'}</div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">{lang === 'ar' ? 'مستحقات جاهزة للتحويل' : 'Solde Disponible'}</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">48,250 MAD</div>
              <div className="text-[11px] text-amber-300 font-semibold">{lang === 'ar' ? 'في دورة التحويل الحالية' : 'Prochain virement 24h'}</div>
            </div>
          </div>

          {/* Dynamic Tab Body */}
          {activeTab === 'shipments' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-300 text-start">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3 text-start">{lang === 'ar' ? 'رقم التتبع' : 'Code'}</th>
                    <th className="py-3 px-3 text-start">{lang === 'ar' ? 'الزبون والمدينة' : 'Client & Ville'}</th>
                    <th className="py-3 px-3 text-start">{lang === 'ar' ? 'قيمة الطلب (COD)' : 'Montant COD'}</th>
                    <th className="py-3 px-3 text-start">{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
                    <th className="py-3 px-3 text-start">{lang === 'ar' ? 'الصافي لك' : 'Net'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="py-3 px-3 font-mono font-bold text-white">LIV-2025-98421</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">سفيان البقالي</div>
                      <div className="text-[11px] text-slate-400">Casablanca • Maarif</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-400">690 MAD</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
                        {lang === 'ar' ? 'تم التسليم وقبض المبلغ' : 'Livré & Encaissé'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">665 MAD</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-mono font-bold text-white">LIV-2025-77210</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">فاطمة الزهراء العلمي</div>
                      <div className="text-[11px] text-slate-400">Rabat • Agdal</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-teal-300">450 MAD</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-full text-[10px] font-bold">
                        {lang === 'ar' ? 'في جولة التوزيع' : 'En livraison'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">420 MAD</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-mono font-bold text-white">LIV-2025-63102</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">ياسين بنجلون</div>
                      <div className="text-[11px] text-slate-400">Marrakech • Guéliz</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-400">890 MAD</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
                        {lang === 'ar' ? 'تم التسليم وقبض المبلغ' : 'Livré & Encaissé'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">855 MAD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'kpi' && (
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>{lang === 'ar' ? 'توزيع الشحنات حسب المدن المغربية' : 'Répartition par région'}</span>
                <span className="text-emerald-400 font-bold">Casablanca (42%) • Rabat (24%) • Marrakech (18%)</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full flex overflow-hidden">
                <div className="bg-emerald-500 w-[42%]" title="Casablanca"></div>
                <div className="bg-teal-400 w-[24%]" title="Rabat"></div>
                <div className="bg-amber-400 w-[18%]" title="Marrakech"></div>
                <div className="bg-blue-400 w-[16%]" title="Autres villes"></div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-semibold text-slate-400">
                <span>{lang === 'ar' ? 'رقم الفاتورة' : 'N° Facture'}</span>
                <span>{lang === 'ar' ? 'تاريخ التسوية' : 'Date de virement'}</span>
                <span>{lang === 'ar' ? 'المبلغ الصافي المحول' : 'Montant Viré'}</span>
                <span>{lang === 'ar' ? 'الحالة' : 'Statut'}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-white">
                <span className="font-mono font-bold">FACT-2025-0091</span>
                <span className="text-slate-400">2025-05-12</span>
                <span className="font-bold text-emerald-400">34,150 MAD</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                  {lang === 'ar' ? 'تم التحويل للبنك' : 'Viré (Attijariwafa)'}
                </span>
              </div>
            </div>
          )}

          {/* Bottom CTA Inside Preview */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {lang === 'ar'
                ? 'جاهز لتجربة لوحة التحكم بنفسك؟ افتح حسابك في دقيقتين.'
                : 'Prêt à tester l\'interface ? Créez votre compte en 2 minutes.'}
            </div>
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>{lang === 'ar' ? 'افتح حساب تاجر مجاناً' : 'Ouvrir mon compte'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
