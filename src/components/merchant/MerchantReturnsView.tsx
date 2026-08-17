import React, { useState } from 'react';
import {
  RotateCcw,
  AlertTriangle,
  Package,
  Printer,
  Search,
  CheckCircle2,
  Phone,
  FileSpreadsheet,
} from 'lucide-react';
import { Language, Parcel, ReturnItem } from '../../types';
import { translations } from '../../i18n/translations';

interface MerchantReturnsViewProps {
  lang: Language;
  parcels?: Parcel[];
  returns?: ReturnItem[];
}

export const MerchantReturnsView: React.FC<MerchantReturnsViewProps> = ({
  lang,
  parcels = [],
  returns = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[lang];

  const safeParcels = Array.isArray(parcels) ? parcels : [];
  const safeReturns = Array.isArray(returns) ? returns : [];

  const returnedParcels = safeParcels.filter(
    (p) => p.status === 'NON_LIVRE' || p.status === 'RETOURNE'
  );

  const filteredReturns = returnedParcels.filter(
    (p) =>
      (p.trackingCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'إدارة الطرود غير المسلمة والمرتجعات' : 'Gestion des Retours & Colis Non Livrés'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'متابعة أسباب الرفض، محاولات الاتصال، وبيانات إرجاع السلع (Bons de Retour)' : 'Motifs de non-livraison, reprogrammation et réceptions des retours'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'طباعة بيان الإرجاع (Bon de Retour)' : 'Imprimer Bon de Retour'}</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'إجمالي المرتجعات المسجلة' : 'Total Colis en Retour'}
          </span>
          <div className="text-2xl font-black text-rose-700 font-mono mt-1">
            {returnedParcels.length}
          </div>
          <span className="text-[11px] text-slate-500">Taux de retour: ~2.8%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'أكثر أسباب عدم التسليم تكراراً' : 'Motif principal'}
          </span>
          <div className="text-sm font-bold text-slate-900 mt-1">
            {lang === 'ar' ? 'الزبون يطلب تأجيل الموعد' : 'Client demande report'}
          </div>
          <span className="text-[11px] text-teal-600 font-semibold">{lang === 'ar' ? 'إعادة المحاولة مجاناً' : 'Reprogrammation en cours'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'مستودع حفظ المرتجعات' : 'Hub de regroupement'}
          </span>
          <div className="text-sm font-bold text-slate-900 mt-1">
            Hub Casablanca Sidi Maarouf
          </div>
          <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'تسليم أسبوعي للتاجر' : 'Rapatriement hebdomadaire'}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {lang === 'ar' ? 'لائحة الشحنات غير المسلمة والمرتجعة' : 'Liste détaillée des colis non livrés'}
          </h3>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute ltr:left-3 rtl:right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث في المرتجعات...' : 'Filtrer les retours...'}
              className="w-full text-xs ltr:pl-8 rtl:pr-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-4 text-start">{lang === 'ar' ? 'رقم التتبع' : 'Code'}</th>
              <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الزبون والمدينة' : 'Client & Ville'}</th>
              <th className="py-3 px-4 text-start">{lang === 'ar' ? 'السلعة والمبلغ' : 'Produit & Montant'}</th>
              <th className="py-3 px-4 text-start">{lang === 'ar' ? 'سبب عدم التسليم' : 'Motif d\'échec'}</th>
              <th className="py-3 px-4 text-start">{lang === 'ar' ? 'ملاحظة المندوب' : 'Note Livreur'}</th>
              <th className="py-3 px-4 text-center">{lang === 'ar' ? 'إعادة البرمجة' : 'Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReturns.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  {lang === 'ar' ? 'لا توجد مرتجعات حالياً' : 'Aucun retour en cours'}
                </td>
              </tr>
            ) : (
              filteredReturns.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {parcel.trackingCode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{parcel.customerName}</div>
                    <div className="text-[11px] text-slate-500">{parcel.city} • {parcel.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{parcel.productName}</div>
                    <div className="font-mono text-emerald-800 font-bold">{parcel.codAmount} MAD</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      {parcel.failureReason ? (t.reasons[parcel.failureReason] || parcel.failureReason) : (lang === 'ar' ? 'غير محدد' : 'Non spécifié')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-600 max-w-[200px]">
                    {parcel.failureNotes || (lang === 'ar' ? 'الهاتف يرن دون رد' : 'Numéro injoignable')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => alert(lang === 'ar' ? 'تمت إعادة برمجة محاولة التوصيل ليوم الغد!' : 'Nouvelle tentative programmée pour demain !')}
                      className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-lg text-[11px] transition-colors"
                    >
                      {lang === 'ar' ? 'إعادة المحاولة' : 'Reprogrammer'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
