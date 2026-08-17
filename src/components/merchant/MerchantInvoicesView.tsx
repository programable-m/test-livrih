import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Banknote,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Language, Invoice } from '../../types';

interface MerchantInvoicesViewProps {
  lang: Language;
  invoices: Invoice[];
}

export const MerchantInvoicesView: React.FC<MerchantInvoicesViewProps> = ({
  lang,
  invoices,
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(invoices[0] || null);

  const totalCollected = invoices.reduce((acc, inv) => acc + inv.totalCollectedCod, 0);
  const totalNet = invoices.reduce((acc, inv) => acc + inv.netPayableToMerchant, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'الفواتير والتحويلات المالية (COD Settlements)' : 'Factures & Versements COD'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'سجل المدفوعات، التحويلات البنكية لـ RIB، وتفاصيل الاقتطاعات' : 'Historique des virements bancaires, factures et bordereaux de règlement'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(lang === 'ar' ? 'تم تسجيل طلب تسوية سريعة، سيتم التحويل في 2h' : 'Demande de virement express transmise au service financier')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'طلب تسوية فورية (Express Pay)' : 'Demander Virement Express'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'إجمالي المبالغ المحصلة (COD)' : 'Total Encaissé (COD)'}
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {totalCollected.toLocaleString()} MAD
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">100% sécurisé</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'صافي المبالغ المحولة لحسابكم' : 'Total Net Viré sur RIB'}
          </span>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {totalNet.toLocaleString()} MAD
          </div>
          <span className="text-[11px] text-slate-500">Attijariwafa Bank • RIB 24 digits</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">
            {lang === 'ar' ? 'دورة التحويل المعتمدة' : 'Délai moyen de versement'}
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            24 Heures
          </div>
          <span className="text-[11px] text-teal-600 font-medium">{lang === 'ar' ? 'تحويل يومي تلقائي' : 'Versement quotidien'}</span>
        </div>
      </div>

      {/* Invoices List and Detailed Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'بيانات التسوية الدورية' : 'Bordereaux de versement'}
          </h3>

          <div className="space-y-2.5">
            {invoices.map((inv) => {
              const isSelected = selectedInvoice?.id === inv.id;
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-sm block">
                        {inv.invoiceNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {inv.period}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        inv.status === 'PAYE'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {inv.status === 'PAYE'
                        ? (lang === 'ar' ? 'تم التحويل للبنك' : 'Viré sur compte')
                        : (lang === 'ar' ? 'قيد المعالجة' : 'En attente')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">{inv.parcelsDeliveredCount} {lang === 'ar' ? 'طرد تم تسليمه' : 'colis livrés'}</span>
                    <span className="font-black text-emerald-700 text-sm font-mono">
                      {inv.netPayableToMerchant} MAD
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Invoice View Paper */}
        <div className="lg:col-span-7">
          {selectedInvoice ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 print:border-none print:p-0">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                    Bordereau de Règlement COD
                  </div>
                  <h3 className="text-xl font-black font-mono text-slate-900">
                    {selectedInvoice.invoiceNumber}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ar' ? 'الفترة:' : 'Période :'} {selectedInvoice.period} • {selectedInvoice.issuedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'طباعة' : 'Imprimer'}</span>
                  </button>
                </div>
              </div>

              {/* Settlement Bank Voucher Details */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ar' ? 'بيانات التحويل البنكي الصادر:' : 'Référence Virement Bancaire :'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">{lang === 'ar' ? 'البنك المستلم:' : 'Banque :'}</span>
                    <span className="font-bold text-slate-800">{selectedInvoice.bankAccountRef || 'Attijariwafa Bank'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'ar' ? 'رقم عملية التحويل (Ref):' : 'Réf Transaction :'}</span>
                    <span className="font-mono font-bold text-slate-800">{selectedInvoice.bankTransactionRef || 'VIR-202604-09812'}</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">{lang === 'ar' ? 'مجموع المبالغ المحصلة (Total Encaissements COD):' : 'Total des montants encaissés (COD) :'}</span>
                  <span className="font-mono font-bold text-slate-900">+{selectedInvoice.totalCollectedCod} MAD</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 text-rose-700">
                  <span>{lang === 'ar' ? 'اقتطاع مصاريف التوصيل (Frais de livraison):' : 'Frais de livraison déduits :'}</span>
                  <span className="font-mono font-bold">-{selectedInvoice.totalShippingFees} MAD</span>
                </div>

                {selectedInvoice.totalReturnFees > 0 && (
                  <div className="flex justify-between py-2 border-b border-slate-100 text-rose-700">
                    <span>{lang === 'ar' ? 'اقتطاع مصاريف المرتجعات:' : 'Frais de retour déduits :'}</span>
                    <span className="font-mono font-bold">-{selectedInvoice.totalReturnFees} MAD</span>
                  </div>
                )}

                <div className="flex justify-between py-3.5 bg-emerald-50 px-4 rounded-xl text-emerald-950 font-bold border border-emerald-200">
                  <div>
                    <span className="text-xs block">{lang === 'ar' ? 'الصافي المحول لحساب التاجر (Net Viré):' : 'Montant Net Viré au Marchand :'}</span>
                    <span className="text-[10px] text-emerald-700 font-normal">{lang === 'ar' ? 'تم الإيداع بالحساب' : 'Virement exécuté'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-emerald-800">
                    {selectedInvoice.netPayableToMerchant} MAD
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-500">
              {lang === 'ar' ? 'اختر فاتورة لعرض التفاصيل' : 'Sélectionnez une facture pour voir le détail'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
