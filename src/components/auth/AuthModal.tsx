import React, { useState } from 'react';
import {
  X,
  Truck,
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  Building2,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserRole } from '../../types';
import { MOROCCAN_CITIES_TARIFS } from '../../data/mockData';
import { AuthService } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTab?: 'login' | 'register';
  onLoginSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTab = 'login',
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'demo'>(initialTab);
  const [errorMessage, setErrorMessage] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regStep, setRegStep] = useState<'form' | 'otp' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [monthlyParcels, setMonthlyParcels] = useState('100 - 300 colis / mois');
  const [otpCode, setOtpCode] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginEmail.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف' : 'Veuillez saisir votre email ou téléphone');
      return;
    }

    const res = AuthService.login({ email: loginEmail, phone: loginEmail });
    if (res.success && res.user) {
      onLoginSuccess(res.user.role);
      onClose();
    } else {
      setErrorMessage(
        lang === 'ar'
          ? 'تعذر العثور على الحساب. يمكنك تجربة الدخول بالوضع التجريبي (Explore Demo) أو التسجيل كتاجر جديد.'
          : 'Compte introuvable. Vous pouvez utiliser le mode Démo ou créer un compte.'
      );
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !storeName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setRegStep('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = AuthService.registerMerchant({
      fullName,
      storeName,
      phone,
      email,
      city,
      monthlyParcelsTarget: monthlyParcels,
    });

    if (res.success) {
      setRegStep('success');
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      setTimeout(() => {
        onLoginSuccess('merchant');
        onClose();
      }, 1800);
    }
  };

  const handleQuickDemoAccess = (role: UserRole) => {
    AuthService.switchRole(role);
    onLoginSuccess(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                livrih<span className="text-emerald-600">.</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold block">
                {lang === 'ar' ? 'بوابة المنصة اللوجستية' : 'Portail d\'accès Livrih'}
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

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
          </button>
          <button
            onClick={() => { setTab('register'); setRegStep('form'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'register' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'حساب تاجر جديد' : 'Créer un compte'}
          </button>
          <button
            onClick={() => { setTab('demo'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              tab === 'demo' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'تجربة النظام' : 'Mode Démo'}
          </button>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Login Tab */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">
                {lang === 'ar' ? 'البريد الإلكتروني أو رقم الهاتف:' : 'Email ou Téléphone :'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-3" />
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="contact@atlasfashion.ma"
                  className="w-full ltr:pl-9 rtl:pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-bold text-slate-700">
                  {lang === 'ar' ? 'كلمة المرور:' : 'Mot de passe :'}
                </label>
                <a href="#contact" onClick={onClose} className="text-[11px] text-emerald-600 hover:underline">
                  {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Mot de passe oublié ?'}
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full ltr:pl-9 rtl:pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{lang === 'ar' ? 'دخول إلى حسابي' : 'Se connecter'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div className="pt-3 border-t border-slate-100 text-center">
              <span className="text-slate-500 text-xs">
                {lang === 'ar' ? 'ليس لديك حساب بعد؟' : 'Vous n\'avez pas de compte ?'}{' '}
              </span>
              <button
                type="button"
                onClick={() => setTab('register')}
                className="text-emerald-700 font-bold hover:underline"
              >
                {lang === 'ar' ? 'سجل كتاجر الآن' : 'Inscrivez-vous'}
              </button>
            </div>
          </form>
        )}

        {/* Register Tab */}
        {tab === 'register' && (
          <div className="space-y-4 text-xs">
            {regStep === 'form' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'الاسم الكامل:' : 'Nom complet :'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="أمين التازي"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'اسم المتجر / العلامة:' : 'Nom de la boutique :'}
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Atlas Fashion Store"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'رقم الهاتف (WhatsApp):' : 'Téléphone / WhatsApp :'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0661234567"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email pro :'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amine@store.ma"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'مدينة المستودع الرئيسي:' : 'Ville du siège / Stock :'}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    >
                      {MOROCCAN_CITIES_TARIFS.map((c) => (
                        <option key={c.id} value={c.nameFr}>
                          {lang === 'ar' ? c.nameAr : c.nameFr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      {lang === 'ar' ? 'معدل شحن الطرود المتوقع:' : 'Volume mensuel estimé :'}
                    </label>
                    <select
                      value={monthlyParcels}
                      onChange={(e) => setMonthlyParcels(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    >
                      <option value="50 - 150 colis / mois">50 - 150 {lang === 'ar' ? 'طرد / شهر' : 'colis / mois'}</option>
                      <option value="150 - 500 colis / mois">150 - 500 {lang === 'ar' ? 'طرد / شهر' : 'colis / mois'}</option>
                      <option value="500 - 2000 colis / mois">500 - 2000 {lang === 'ar' ? 'طرد / شهر' : 'colis / mois'}</option>
                      <option value="+2000 colis / mois">+2000 {lang === 'ar' ? 'طرد / شهر' : 'colis / mois'}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <span>{lang === 'ar' ? 'متابعة وتأكيد الحساب' : 'Continuer'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>
            )}

            {regStep === 'otp' && (
              <form onSubmit={handleOtpVerify} className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {lang === 'ar' ? 'تأكيد رقم الهاتف' : 'Vérification du numéro'}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">
                    {lang === 'ar'
                      ? `أرسلنا رمز التحقق إلى الرقم ${phone}`
                      : `Code de validation envoyé au ${phone}`}
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-48 mx-auto text-center text-xl font-mono tracking-widest px-4 py-2 border-2 border-emerald-500 rounded-xl focus:outline-hidden"
                  autoFocus
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تأكيد ودخول فضاء التاجر' : 'Confirmer et démarrer'}</span>
                </button>
              </form>
            )}

            {regStep === 'success' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {lang === 'ar' ? 'تم إنشاء حسابك بنجاح! 🎉' : 'Compte activé avec succès ! 🎉'}
                </h4>
                <p className="text-slate-500 text-xs">
                  {lang === 'ar'
                    ? 'جاري نقلك مباشرة إلى لوحة تحكم التاجر...'
                    : 'Redirection vers votre espace marchand...'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Demo Mode Tab (Explicitly separated and explained) */}
        {tab === 'demo' && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ar' ? 'استكشاف المنصة التجريبي (Explore Demo)' : 'Mode Démonstration'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {lang === 'ar'
                  ? 'يتيح لك هذا الخيار تجربة كافة أدوار المنصة (تاجر، سائق توزيع، أو مشرف العمليات) ببيانات تجريبية تفاعلية.'
                  : 'Ce mode vous permet d\'explorer les différents espaces (Marchand, Livreur, Admin) avec des données de test interactives.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoAccess('merchant')}
                className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-start transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-700">
                    {lang === 'ar' ? 'فضاء التاجر (Merchant Portal)' : 'Espace Marchand'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'ar' ? 'إنشاء الشحنات، التتبع، فواتير COD، والمرتجعات' : 'Création colis, suivi, factures COD & retours'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoAccess('driver')}
                className="p-3 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-200 rounded-xl text-start transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-teal-700">
                    {lang === 'ar' ? 'تطبيق السائق (Driver App)' : 'Application Livreur Mobile'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'ar' ? 'جولة التوزيع، تأكيد التسليم وإثبات القبض' : 'Tournée de livraison, preuve de dépôt & COD'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoAccess('admin')}
                className="p-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 border border-slate-200 rounded-xl text-start transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900">
                    {lang === 'ar' ? 'لوحة تحكم العمليات (Admin Ops)' : 'Supervision Centrale Ops'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'ar' ? 'إسناد السائقين، تسوية الفواتير، ومتابعة المراكز' : 'Dispatching, génération virements & gestion hubs'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
