import React, { useState } from 'react';
import {
  X,
  Plus,
  Package,
  MapPin,
  Phone,
  User,
  DollarSign,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { Language, Parcel, CityTarif } from '../../types';
import { MOROCCAN_CITIES_TARIFS } from '../../data/mockData';

interface MerchantNewParcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddParcel: (newParcel: any) => void;
}

export const MerchantNewParcelModal: React.FC<MerchantNewParcelModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddParcel,
}) => {
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  // Single form
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [cityId, setCityId] = useState('casablanca');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [codAmount, setCodAmount] = useState(350);
  const [weightKg, setWeightKg] = useState(1);
  const [openAllowed, setOpenAllowed] = useState(true);
  const [fragile, setFragile] = useState(false);
  const [notes, setNotes] = useState('');

  // Bulk simulation
  const [bulkSheetUrl, setBulkSheetUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessCount, setSyncSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const selectedCity = MOROCCAN_CITIES_TARIFS.find((c) => c.id === cityId) || MOROCCAN_CITIES_TARIFS[0];

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const timeStr = `${today} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `LIV-${now.getFullYear()}-${randomDigits}`;

    const shippingFee = selectedCity.deliveryPrice;
    const returnFee = selectedCity.returnPrice;
    const netPayable = Math.max(0, Number(codAmount) - shippingFee);

    const parcel: Parcel = {
      id: `p-${Date.now()}`,
      trackingCode,
      merchantId: 'u-merchant-1',
      merchantStoreName: 'Atlas Fashion Store',
      customerName: recipientName,
      customerPhone: recipientPhone,
      city: selectedCity.nameFr,
      district: district || selectedCity.nameFr,
      address: address || 'Centre-ville',
      productName: productName || 'Pack Article',
      productQuantity: productQuantity || 1,
      codAmount: Number(codAmount),
      shippingFee,
      returnFee,
      netPayableToMerchant: netPayable,
      isPaidToMerchant: false,
      serviceType: fragile ? 'FRAGILE' : 'STANDARD',
      status: 'CREE',
      openPackageAllowed: openAllowed,
      weightKg: Number(weightKg),
      notes: notes,
      createdAt: timeStr,
      updatedAt: timeStr,
      estimatedDeliveryDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
      history: [
        {
          id: `h-${Date.now()}`,
          status: 'CREE',
          statusLabelAr: 'تم تسجيل الطلب وجاري التحضير للجمع',
          statusLabelFr: 'Colis créé - En attente de ramassage',
          statusLabelEn: 'Parcel created - Pending pickup',
          location: selectedCity.nameFr,
          timestamp: timeStr,
        },
      ],
    };

    onAddParcel(parcel);
    onClose();
  };

  const handleBulkSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccessCount(5);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {lang === 'ar' ? 'إنشاء وتجهيز شحنة جديدة' : 'Nouveau Colis à Expédier'}
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold block">
                {lang === 'ar' ? 'أدخل تفاصيل المستلم وسيتم طباعة البوليصة تلقائياً' : 'Génération automatique de bordereau'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setMode('single')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'single' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'طرد فردي (Single Parcel)' : 'Colis Unique'}
          </button>
          <button
            onClick={() => setMode('bulk')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === 'bulk' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'استيراد مجمع (Google Sheets / Excel)' : 'Import Fichier / Sheets'}
          </button>
        </div>

        {mode === 'single' ? (
          <form onSubmit={handleSingleSubmit} className="space-y-4 text-xs">
            {/* Recipient Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'معلومات الزبون المستلم:' : 'Coordonnées du destinataire :'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'اسم الزبون الكامل:' : 'Nom complet :'}
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="سفيان البقالي"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'رقم الهاتف (WhatsApp):' : 'Téléphone destinataire :'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="0661234567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'المدينة (Destination):' : 'Ville de destination :'}
                  </label>
                  <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                  >
                    {MOROCCAN_CITIES_TARIFS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'ar' ? c.nameAr : c.nameFr} ({c.deliveryPrice} MAD - {c.slaHours})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'الحي / المنطقة:' : 'Quartier / District :'}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="المعاريف، سيدي عثمان..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  {lang === 'ar' ? 'العنوان التفصيلي:' : 'Adresse complète de livraison :'}
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="شارع المسيرة، إقامة الهدى، الطابق 2، شقة 4"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Product & COD Financials */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'تفاصيل الطلب ومبلغ الدفع عند الاستلام (COD):' : 'Montant COD & Colis :'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'اسم المنتج:' : 'Article :'}
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="حذاء رياضي جلد"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'المبلغ المطلوب قبضة (MAD):' : 'Montant COD (MAD) :'}
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={codAmount}
                    onChange={(e) => setCodAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {lang === 'ar' ? 'الوزن التقريبي (kg):' : 'Poids (Kg) :'}
                  </label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={openAllowed}
                    onChange={(e) => setOpenAllowed(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>{lang === 'ar' ? 'السماح بفتح ومعاينة الطرد' : 'Autoriser l\'ouverture du colis'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={fragile}
                    onChange={(e) => setFragile(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>{lang === 'ar' ? 'طرد قابل للكسر (Fragile)' : 'Colis Fragile'}</span>
                </label>
              </div>

              {/* Note */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">
                  {lang === 'ar' ? 'ملاحظات للسائق الموزع:' : 'Instructions particulières au livreur :'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="الاتصال قبل الوصول، التسليم في المساء بعد 17:00..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Summary Banner */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between font-bold">
              <span className="text-slate-600">
                {lang === 'ar' ? `تكلفة التوصيل (${selectedCity.nameFr}):` : `Frais de livraison (${selectedCity.nameFr}) :`}
              </span>
              <span className="text-slate-900">{selectedCity.deliveryPrice} MAD</span>
              <span className="text-emerald-700">
                {lang === 'ar' ? 'الصافي لك:' : 'Net à percevoir :'} {Math.max(0, codAmount - selectedCity.deliveryPrice)} MAD
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'حفظ وطباعة البوليصة' : 'Enregistrer et Générer le Bordereau'}</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'ar' ? 'الربط التلقائي عبر Google Sheets' : 'Synchronisation Google Sheets'}</span>
              </div>
              <p className="text-emerald-700 text-[11px] leading-relaxed">
                {lang === 'ar'
                  ? 'ضع رابط جدول Google Sheets أو ملف Excel الخاص بك وسيتم استيراد كافة الطلبات وتوليد أرقام التتبع تلقائياً.'
                  : 'Collez l\'URL de votre feuille Google Sheets publique pour synchroniser vos commandes en un clic.'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">
                {lang === 'ar' ? 'رابط جدول الطلبيات (Google Sheets URL):' : 'Lien Google Sheets :'}
              </label>
              <input
                type="url"
                value={bulkSheetUrl}
                onChange={(e) => setBulkSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono text-[11px]"
              />
            </div>

            {syncSuccessCount !== null && (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {lang === 'ar'
                    ? `تم استيراد ${syncSuccessCount} شحنات بنجاح!`
                    : `${syncSuccessCount} colis synchronisés avec succès !`}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleBulkSync}
              disabled={isSyncing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isSyncing
                  ? (lang === 'ar' ? 'جاري الاستيراد والتحقق...' : 'Synchronisation en cours...')
                  : (lang === 'ar' ? 'استيراد الشحنات الآن' : 'Importer les commandes')}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
