import React from 'react';
import { X, Printer, Package, Truck, QrCode, ShieldCheck } from 'lucide-react';
import { Language, Parcel } from '../../types';

interface MerchantLabelModalProps {
  parcel: Parcel | null;
  onClose: () => void;
  lang: Language;
}

export const MerchantLabelModal: React.FC<MerchantLabelModalProps> = ({
  parcel,
  onClose,
  lang,
}) => {
  if (!parcel) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 print:p-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden when printing) */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'بوليصة الشحن الرسمية (Bordereau A6)' : 'Bordereau d\'expédition officiel'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'طباعة البوليصة' : 'Imprimer'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable A6/Thermal Label Area */}
        <div className="border-2 border-dashed border-slate-900 rounded-2xl p-5 bg-white text-slate-900 space-y-4 font-sans print:border-solid print:m-0 print:rounded-none">
          {/* Top Company & City Routing Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-lg font-black tracking-tighter">
                <Truck className="w-5 h-5 text-slate-900" />
                <span>livrih<span className="text-emerald-600">.</span>ma</span>
              </div>
              <span className="text-[10px] text-slate-600 block">Express Delivery Morocco</span>
            </div>

            <div className="text-end">
              <div className="text-2xl font-black font-mono tracking-tight uppercase bg-slate-900 text-white px-3 py-1 rounded-md">
                {parcel.city}
              </div>
              <span className="text-[10px] text-slate-600 font-mono block mt-0.5">HUB ROUTE #01</span>
            </div>
          </div>

          {/* Barcode & Tracking Code */}
          <div className="text-center py-2 border-b-2 border-slate-900 space-y-1">
            {/* Visual Barcode bars */}
            <div className="h-12 w-full flex items-center justify-center gap-1 px-4">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 3, 1, 2, 4, 1, 3].map((w, i) => (
                <div
                  key={i}
                  className="bg-slate-900 h-full"
                  style={{ width: `${w * 2}px` }}
                ></div>
              ))}
            </div>
            <div className="font-mono text-base font-black tracking-widest text-slate-950">
              {parcel.trackingCode}
            </div>
          </div>

          {/* Recipient Box */}
          <div className="border border-slate-900 p-3 rounded-lg space-y-1.5 bg-slate-50/50">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              DESTINATAIRE / الزبون المستلم:
            </div>
            <div className="font-extrabold text-base text-slate-950">
              {parcel.customerName}
            </div>
            <div className="font-mono font-bold text-sm text-slate-900" dir="ltr">
              TEL: {parcel.customerPhone}
            </div>
            <div className="text-xs text-slate-800">
              <span className="font-bold">{parcel.city}</span> - {parcel.district}, {parcel.address}
            </div>
          </div>

          {/* Merchant / Sender & Product */}
          <div className="grid grid-cols-2 gap-3 text-xs border-b-2 border-slate-900 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 block">EXPÉDITEUR:</span>
              <span className="font-bold text-slate-900 block">{parcel.merchantStoreName}</span>
              <span className="text-[11px] text-slate-600 block">ID: {parcel.merchantId}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 block">ARTICLE & QUANTITÉ:</span>
              <span className="font-bold text-slate-900 block">{parcel.productName}</span>
              <span className="text-[11px] text-slate-600 block">Qté: {parcel.productQuantity} • Poids: {parcel.weightKg}kg</span>
            </div>
          </div>

          {/* COD Collection Amount (Large Display) */}
          <div className="bg-slate-950 text-white p-3 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                MONTANT COD À ENCAISSER / مبلغ التحصيل:
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                {parcel.openPackageAllowed ? '✓ Ouvrir avant paiement autorisé' : 'Colis scellé'}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {parcel.codAmount} MAD
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-[10px] text-slate-500 font-medium pt-1">
            Service Client livrih: 0779063241 • www.livrih.com • Date: {parcel.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};
