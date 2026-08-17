import React, { useState, useEffect } from 'react';
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User as UserIcon,
  Phone,
  Truck,
  Printer,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Receipt,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language, Parcel } from '../../types';
import { translations } from '../../i18n/translations';
import { ShipmentService } from '../../services/shipmentService';

interface TrackingSectionProps {
  lang: Language;
  parcels?: Parcel[];
  initialTrackingCode?: string;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  lang,
  initialTrackingCode = '',
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingCode || '');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    if (initialTrackingCode) {
      setSearchInput(initialTrackingCode);
      const found = ShipmentService.getParcelByTracking(initialTrackingCode);
      setSelectedParcel(found);
      setHasSearched(true);
    }
  }, [initialTrackingCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setHasSearched(true);
    const found = ShipmentService.getParcelByTracking(searchInput.trim());
    setSelectedParcel(found);
  };

  const sampleCodes = ['LIV-2025-98421', 'LIV-2025-77210', 'LIV-2025-63102', 'LIV-2025-55190'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVRE':
      case 'PAYE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'EN_COURS_LIVRAISON':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'AU_CENTRE_TRI':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'RAMASSE':
      case 'EN_ATTENTE_RAMASSAGE':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'NON_LIVRE':
      case 'RETOURNE':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  // Safe phone masking for consumer privacy
  const maskPhone = (phoneStr?: string) => {
    if (!phoneStr || phoneStr.length < 6) return phoneStr || '';
    return `${phoneStr.slice(0, 3)}****${phoneStr.slice(-3)}`;
  };

  return (
    <section id="tracking-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Package className="w-3.5 h-3.5" />
            <span>{t.tracking.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {t.tracking.subtitle}
          </h2>
        </div>

        {/* Tracking Input Card */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.tracking.inputLabel + ' (ex: LIV-2025-98421)...'}
                className="w-full text-sm sm:text-base px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{t.tracking.trackAction}</span>
            </button>
          </form>

          {/* Sample quick buttons */}
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 flex-wrap">
            <span>{t.tracking.sampleCodes}</span>
            {sampleCodes.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchInput(code);
                  const found = ShipmentService.getParcelByTracking(code);
                  setSelectedParcel(found);
                  setHasSearched(true);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result View */}
        {hasSearched && selectedParcel && (
          <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden space-y-6 animate-in fade-in">
            {/* Top Status Header */}
            <div className="p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-mono">
                  {lang === 'ar' ? 'رقم التتبع الموحد' : 'Code de Suivi'}
                </div>
                <div className="text-2xl font-black font-mono tracking-wider text-emerald-400">
                  {selectedParcel.trackingCode}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-black border ${getStatusBadge(
                    selectedParcel.status
                  )}`}
                >
                  {selectedParcel.status === 'LIVRE' && (lang === 'ar' ? 'تم التسليم بنجاح' : 'Livré')}
                  {selectedParcel.status === 'PAYE' && (lang === 'ar' ? 'تم التسليم وتسوية المبلغ' : 'Livré & Payé')}
                  {selectedParcel.status === 'EN_COURS_LIVRAISON' && (lang === 'ar' ? 'في جولة التوزيع' : 'En livraison')}
                  {selectedParcel.status === 'AU_CENTRE_TRI' && (lang === 'ar' ? 'بمركز الفرز' : 'Au centre de tri')}
                  {selectedParcel.status === 'RAMASSE' && (lang === 'ar' ? 'تم استلامه من التاجر' : 'Ramassé')}
                  {selectedParcel.status === 'EN_ATTENTE_RAMASSAGE' && (lang === 'ar' ? 'في انتظار الجمع' : 'En attente ramassage')}
                  {selectedParcel.status === 'CREE' && (lang === 'ar' ? 'تم تسجيل الطلبية' : 'Colis enregistré')}
                  {selectedParcel.status === 'NON_LIVRE' && (lang === 'ar' ? 'تعذر التسليم' : 'Échec de livraison')}
                  {selectedParcel.status === 'RETOURNE' && (lang === 'ar' ? 'مرتجع للتاجر' : 'Retourné')}
                </span>

                <button
                  onClick={() => window.print()}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors cursor-pointer"
                  title={t.tracking.printReceipt}
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-500 font-semibold">{t.tracking.city} & {t.tracking.receiver}</div>
                <div className="font-bold text-slate-900 text-sm">{selectedParcel.city}</div>
                <div className="text-slate-600">{selectedParcel.customerName} ({maskPhone(selectedParcel.customerPhone)})</div>
                <div className="text-[11px] text-slate-500">{selectedParcel.district || selectedParcel.address}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-500 font-semibold">{t.tracking.codAmount}</div>
                <div className="font-black text-emerald-600 text-base">{selectedParcel.codAmount} MAD</div>
                <div className="text-slate-600 font-medium">{selectedParcel.productName || 'طرد تجارة إلكترونية'}</div>
                <div className="text-[11px] text-slate-500">
                  {selectedParcel.openPackageAllowed
                    ? (lang === 'ar' ? '✓ مسموح بفتح الطرد للمعاينة' : '✓ Ouverture autorisée')
                    : (lang === 'ar' ? 'غير مسموح بفتح الطرد' : 'Ouverture non autorisée')}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-500 font-semibold">{t.tracking.driverContact}</div>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedParcel.assignedDriverName || (lang === 'ar' ? 'فريق التوزيع livrih' : 'Équipe livrih')}
                </div>
                <div className="text-slate-600">
                  {selectedParcel.assignedDriverPhone ? maskPhone(selectedParcel.assignedDriverPhone) : '0779063241'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  {selectedParcel.deliveryAttempts ? `${selectedParcel.deliveryAttempts} ${lang === 'ar' ? 'محاولات تواصل' : 'tentative(s)'}` : (lang === 'ar' ? 'أول محاولة مجدولة' : '1ère tentative')}
                </div>
              </div>
            </div>

            {/* Proof of Delivery Card (If Delivered) */}
            {selectedParcel.proofOfDelivery && (
              <div className="mx-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950">
                      {lang === 'ar' ? 'إثبات التسليم المؤكد (Proof of Delivery)' : 'Preuve de livraison validée'}
                    </div>
                    <div className="text-emerald-700 text-[11px]">
                      {lang === 'ar' ? 'تم الاستلام بواسطة:' : 'Réceptionné par :'} {selectedParcel.proofOfDelivery.recipientName} • {selectedParcel.proofOfDelivery.deliveryDate}
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <div className="font-black text-emerald-900 text-sm">{selectedParcel.proofOfDelivery.cashCollected} MAD</div>
                  <div className="text-[10px] text-emerald-700 font-bold">{lang === 'ar' ? 'تم القبض نقداً' : 'Encaissé'}</div>
                </div>
              </div>
            )}

            {/* Tracking History Timeline */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{t.tracking.timelineTitle}</span>
              </h3>

              <div className="relative border-s-2 border-slate-200 ltr:ms-3.5 rtl:ms-0 ltr:ps-5 rtl:pe-5 space-y-6">
                {(selectedParcel.history || []).map((ev, idx) => (
                  <div key={ev.id || idx} className="relative group">
                    {/* Dot */}
                    <div
                      className={`absolute -start-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        idx === 0 ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                      }`}
                    ></div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'ar' ? ev.statusLabelAr : lang === 'fr' ? ev.statusLabelFr : ev.statusLabelEn}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{ev.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ev.location}</span>
                        {ev.actorName && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-slate-600">{ev.actorName}</span>
                          </>
                        )}
                      </div>

                      {ev.note && (
                        <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg mt-1">
                          {ev.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasSearched && !selectedParcel && (
          <div className="bg-white p-8 rounded-3xl text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.tracking.notFound}</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {lang === 'ar'
                ? 'يرجى التأكد من كتابة كود التتبع كاملاً بما في ذلك الشرطات مثل LIV-2025-98421 أو التواصل مع خدمة العملاء.'
                : 'Veuillez vérifier le numéro saisi (ex: LIV-2025-98421) ou contacter le service support.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
