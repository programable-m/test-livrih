import React, { useState } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Key,
  Bell,
  Save,
  CheckCircle2,
  Copy,
  Code,
  ShieldCheck,
} from 'lucide-react';
import { Language, User as UserType } from '../../types';

interface MerchantSettingsViewProps {
  lang: Language;
  currentUser: UserType;
}

export const MerchantSettingsView: React.FC<MerchantSettingsViewProps> = ({
  lang,
  currentUser,
}) => {
  const [storeName, setStoreName] = useState(currentUser.storeName || 'Atlas Fashion Store');
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [city, setCity] = useState(currentUser.city);
  const [address, setAddress] = useState(currentUser.address || 'Boulevard d\'Anfa, Casablanca');

  // Moroccan Bank RIB state (24 numeric digits standard)
  const [bankName, setBankName] = useState(currentUser.bankName || 'Attijariwafa Bank');
  const [bankRib, setBankRib] = useState(currentUser.bankRib || '007780001234567890123456');

  // API Token
  const [apiKey] = useState('liv_live_99a8b7c6d5e4f3a2b1c0morocco2026');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          {lang === 'ar' ? 'إعدادات الحساب والمتجر' : 'Paramètres du Compte & Boutique'}
        </h2>
        <p className="text-xs text-slate-500">
          {lang === 'ar' ? 'بيانات التاجر، الحساب البنكي (RIB) ومفاتيح الربط البرمجي API' : 'Informations de facturation, RIB bancaire et clés API'}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Store & Profile Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'بيانات المتجر وموقع الاستلام' : 'Informations Boutique & Ramassage'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'اسم المتجر / البراند' : 'Nom de l\'enseigne'}
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'اسم المسؤول' : 'Nom du gérant'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'الهاتف (WhatsApp)' : 'Numéro de téléphone'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Adresse e-mail'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'مدينة المستودع الرئيسي' : 'Ville du Hub/Entrepôt'}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'عنوان الجمع والرمساج الدائم' : 'Adresse exacte de ramassage'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Moroccan Bank RIB Settings for COD Transfer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'الحساب البنكي لتحويل مبالغ الدفع عند الاستلام (RIB 24 Chiffres)' : 'Coordonnées Bancaires (RIB de versement COD)'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'اسم البنك' : 'Banque'}
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Attijariwafa Bank">Attijariwafa Bank</option>
                <option value="Banque Populaire (BP)">Banque Populaire (BP)</option>
                <option value="Bank of Africa (BMCE)">Bank of Africa (BMCE)</option>
                <option value="CIH Bank">CIH Bank</option>
                <option value="BMCI">BMCI</option>
                <option value="Crédit du Maroc">Crédit du Maroc</option>
                <option value="Crédit Agricole du Maroc (CAM)">Crédit Agricole du Maroc (CAM)</option>
                <option value="CFG Bank">CFG Bank</option>
                <option value="Al Barid Bank">Al Barid Bank</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'رقم الحساب البنكي الكامل (RIB 24 رقماً)' : 'Numéro RIB (24 chiffres)'}
              </label>
              <input
                type="text"
                maxLength={24}
                value={bankRib}
                onChange={(e) => setBankRib(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold tracking-widest text-emerald-800"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'يتم تحويل أموال الـ COD تلقائياً إلى هذا الحساب البنكي خلال 24 ساعة من تسليم كل طرد.'
                : 'Les versements de vos encaissements COD sont effectués automatiquement sur ce compte sous 24h.'}
            </span>
          </div>
        </div>

        {/* API & Webhooks Integration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'مفاتيح الربط البرمجي (API & Webhooks)' : 'Intégration API & Webhooks'}</span>
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'ar' ? 'مفتاح الـ API الخاص بمتجركم (Secret Key)' : 'Clé API Secrète'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl font-mono text-[11px] text-slate-700"
              />
              <button
                type="button"
                onClick={handleCopyKey}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copié !') : (lang === 'ar' ? 'نسخ' : 'Copier')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Enregistrer les modifications'}</span>
          </button>

          {isSaved && (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تم الحفظ بنجاح' : 'Modifications enregistrées !'}</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
