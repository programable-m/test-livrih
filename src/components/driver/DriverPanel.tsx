import React, { useState } from 'react';
import {
  Truck,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Scan,
  MapPin,
  Clock,
  Banknote,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Language, Parcel, User, FailureReason } from '../../types';
import { translations } from '../../i18n/translations';

interface DriverPanelProps {
  lang: Language;
  currentUser: User;
  parcels: Parcel[];
  onUpdateParcelStatus: (
    parcelId: string,
    status: any,
    details?: { failureReason?: FailureReason; failureNotes?: string; cashCollected?: number; recipientName?: string }
  ) => void;
  onLogout: () => void;
}

export const DriverPanel: React.FC<DriverPanelProps> = ({
  lang,
  currentUser,
  parcels = [],
  onUpdateParcelStatus,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'tournee' | 'delivered' | 'failed'>('tournee');
  const [selectedParcelForDelivery, setSelectedParcelForDelivery] = useState<Parcel | null>(null);
  const [selectedParcelForFailure, setSelectedParcelForFailure] = useState<Parcel | null>(null);

  // Delivery confirmation inputs
  const [recipientNameInput, setRecipientNameInput] = useState('');
  const [cashCollectedInput, setCashCollectedInput] = useState<number>(0);

  // Failure inputs
  const [failureReason, setFailureReason] = useState<FailureReason>('CLIENT_INJOIGNABLE');
  const [failureNotes, setFailureNotes] = useState('');

  const t = translations[lang];
  const safeParcels = Array.isArray(parcels) ? parcels : [];

  // Driver parcels for current city / assigned driver
  const driverParcels = safeParcels.filter(
    (p) => p.assignedDriverId === currentUser.id || p.city === currentUser.city || p.status === 'EN_COURS_LIVRAISON'
  );

  const pendingParcels = driverParcels.filter(
    (p) => p.status !== 'LIVRE' && p.status !== 'PAYE' && p.status !== 'RETOURNE'
  );

  const deliveredParcels = driverParcels.filter(
    (p) => p.status === 'LIVRE' || p.status === 'PAYE'
  );

  const totalCashCollectedToday = deliveredParcels.reduce((acc, p) => acc + (p.codAmount || 0), 0);

  const handleOpenDeliveryModal = (parcel: Parcel) => {
    setSelectedParcelForDelivery(parcel);
    setRecipientNameInput(parcel.customerName);
    setCashCollectedInput(parcel.codAmount);
  };

  const handleConfirmDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcelForDelivery) return;

    onUpdateParcelStatus(selectedParcelForDelivery.id, 'LIVRE', {
      cashCollected: cashCollectedInput,
      recipientName: recipientNameInput,
    });

    setSelectedParcelForDelivery(null);
  };

  const handleConfirmFailure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcelForFailure) return;

    onUpdateParcelStatus(selectedParcelForFailure.id, 'NON_LIVRE', {
      failureReason,
      failureNotes,
    });

    setSelectedParcelForFailure(null);
    setFailureNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      {/* Mobile Top App Bar */}
      <header className="bg-slate-950 border-b border-slate-800 p-4 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">livrih Driver App</div>
            <div className="text-[11px] text-slate-400 font-mono">
              {currentUser.name} • {currentUser.city}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 rounded-xl"
          title={lang === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Driver Daily Stats Cards */}
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'ar' ? 'طرود الجولة اليومية' : 'Tournée du jour'}
            </span>
            <div className="text-xl font-black text-white font-mono">
              {pendingParcels.length} <span className="text-xs text-slate-400 font-normal">{lang === 'ar' ? 'متبقي' : 'restants'}</span>
            </div>
          </div>

          <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">
              {lang === 'ar' ? 'تم التسليم' : 'Colis Livrés'}
            </span>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {deliveredParcels.length}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
            <span className="text-[11px] text-emerald-400 block font-bold">
              {lang === 'ar' ? 'المبلغ المحصل نقداً' : 'Cash Encaissé (COD)'}
            </span>
            <div className="text-xl font-black text-emerald-300 font-mono">
              {totalCashCollectedToday.toLocaleString()} MAD
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-slate-950 p-1 rounded-xl text-xs font-bold border border-slate-800">
          <button
            onClick={() => setActiveTab('tournee')}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === 'tournee'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? `قيد التوزيع (${pendingParcels.length})` : `À Livrer (${pendingParcels.length})`}
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === 'delivered'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? `تم التسليم (${deliveredParcels.length})` : `Livrés (${deliveredParcels.length})`}
          </button>
        </div>

        {/* Parcels List */}
        <div className="space-y-3">
          {(activeTab === 'tournee' ? pendingParcels : deliveredParcels).map((parcel) => (
            <div
              key={parcel.id}
              className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 shadow-md space-y-3"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400 block">
                    {parcel.trackingCode}
                  </span>
                  <h3 className="font-bold text-white text-base">
                    {parcel.customerName}
                  </h3>
                </div>

                <div className="text-end">
                  <span className="text-lg font-black font-mono text-emerald-400 block">
                    {parcel.codAmount} MAD
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {parcel.openPackageAllowed ? (lang === 'ar' ? '✓ فتح الطرد مسموح' : '✓ Ouvrir autorisé') : (lang === 'ar' ? 'طرد مغلق' : 'Colis scellé')}
                  </span>
                </div>
              </div>

              {/* Address & Product */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{parcel.city}</strong> - {parcel.district}, {parcel.address}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span>{parcel.productName} (Qté: {parcel.productQuantity})</span>
                  <span className="text-slate-400">Marchand: {parcel.merchantStoreName}</span>
                </div>
              </div>

              {/* Action Buttons for Pending Parcels */}
              {activeTab === 'tournee' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Phone Call */}
                  <a
                    href={`tel:${parcel.customerPhone}`}
                    className="py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'ar' ? 'اتصال بالزبون' : 'Appeler'}</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/212${parcel.customerPhone.replace(/^0/, '')}?text=Bonjour%20${encodeURIComponent(parcel.customerName)},%20c'est%20le%20livreur%20livrih%20avec%20votre%20colis%20(${parcel.trackingCode})`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Mark Failed */}
                  <button
                    onClick={() => setSelectedParcelForFailure(parcel)}
                    className="py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تعذر التسليم' : 'Échec / Non Livré'}</span>
                  </button>

                  {/* Mark Delivered */}
                  <button
                    onClick={() => handleOpenDeliveryModal(parcel)}
                    className="py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تأكيد التسليم والقبض' : 'Livré (Encaisser)'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation of Delivery Modal */}
      {selectedParcelForDelivery && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'تأكيد تسليم الطرد وقبض المبلغ' : 'Validation de la livraison'}</span>
              </h3>
              <button onClick={() => setSelectedParcelForDelivery(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmDelivery} className="space-y-3.5">
              <div>
                <label className="block text-slate-400 mb-1">{lang === 'ar' ? 'اسم المستلم الفعلي' : 'Nom du réceptionnaire'}</label>
                <input
                  type="text"
                  required
                  value={recipientNameInput}
                  onChange={(e) => setRecipientNameInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{lang === 'ar' ? 'المبلغ المقبوض نقداً (MAD)' : 'Montant COD Encaissé (MAD)'}</label>
                <input
                  type="number"
                  required
                  value={cashCollectedInput}
                  onChange={(e) => setCashCollectedInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-emerald-400 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg font-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all"
              >
                {lang === 'ar' ? 'تسجيل التسليم في النظام فوراً' : 'Confirmer la livraison'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation of Failure Modal */}
      {selectedParcelForFailure && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{lang === 'ar' ? 'تسجيل سبب تعذر التسليم' : 'Motif de non-livraison'}</span>
              </h3>
              <button onClick={() => setSelectedParcelForFailure(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmFailure} className="space-y-3.5">
              <div>
                <label className="block text-slate-400 mb-1">{lang === 'ar' ? 'سبب عدم التسليم' : 'Motif d\'échec'}</label>
                <select
                  value={failureReason}
                  onChange={(e: any) => setFailureReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="CLIENT_INJOIGNABLE">{t.reasons.CLIENT_INJOIGNABLE}</option>
                  <option value="CLIENT_DEMANDE_REPORT">{t.reasons.CLIENT_DEMANDE_REPORT}</option>
                  <option value="CLIENT_REFUSE_COMMANDE">{t.reasons.CLIENT_REFUSE_COMMANDE}</option>
                  <option value="CLIENT_REFUSE_PAYER">{t.reasons.CLIENT_REFUSE_PAYER}</option>
                  <option value="ADRESSE_INCOMPLETE">{t.reasons.ADRESSE_INCOMPLETE}</option>
                  <option value="HORS_ZONE">{t.reasons.HORS_ZONE}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{lang === 'ar' ? 'ملاحظات إضافية للمشرف والتاجر' : 'Note explicative'}</label>
                <textarea
                  rows={3}
                  value={failureNotes}
                  onChange={(e) => setFailureNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: الهاتف يرن بدون إجابة، أرسلت رسالة واتساب' : 'Détails...'}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-all"
              >
                {lang === 'ar' ? 'حفظ حالة عدم التسليم' : 'Enregistrer le motif'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
