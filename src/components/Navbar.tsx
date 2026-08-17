import React, { useState } from 'react';
import {
  Truck,
  Globe,
  PhoneCall,
  User as UserIcon,
  Menu,
  X,
  Search,
  ChevronDown,
  LogIn,
  LogOut,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import { Language, UserRole, User } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentUser: User | null;
  currentRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onTrackSubmit: (code: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  currentUser,
  currentRole,
  activeView,
  setActiveView,
  onOpenAuth,
  onTrackSubmit,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = translations[lang];

  const handleTrackFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      onTrackSubmit(quickTrackInput.trim());
      setIsQuickTrackOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'howItWorks', label: t.nav.howItWorks },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'services', label: t.nav.services },
    { id: 'tracking', label: t.nav.tracking },
    { id: 'agencies', label: t.nav.agencies },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {lang === 'ar'
                ? 'خدمة لوجستية متكاملة لجميع مدن المغرب 🇲🇦'
                : lang === 'fr'
                ? 'Service logistique e-commerce partout au Maroc 🇲🇦'
                : 'Morocco-wide E-commerce Express Logistics 🇲🇦'}
            </span>
            <span className="text-slate-600">|</span>
            <a href="tel:0779063241" className="hover:text-white flex items-center gap-1 transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr">0779063241</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">contact@livrih.com</span>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {currentRole === 'merchant' && (lang === 'ar' ? 'فضاء التاجر المتصل' : 'Espace Marchand')}
                {currentRole === 'driver' && (lang === 'ar' ? 'جلسة السائق المتصل' : 'Session Livreur')}
                {currentRole === 'admin' && (lang === 'ar' ? 'لوحة تحكم العمليات المركزية' : 'Centre d\'opérations')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (currentRole === 'merchant') setActiveView('merchant');
                else if (currentRole === 'driver') setActiveView('driver');
                else if (currentRole === 'admin') setActiveView('admin');
                else setActiveView('home');
              }}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-0.5">
                  livrih<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  Logistics & COD Maroc
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links (for Guest view) */}
          {currentRole === 'guest' ? (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeView === item.id
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => {
                  if (currentRole === 'merchant') setActiveView('merchant');
                  else if (currentRole === 'driver') setActiveView('driver');
                  else if (currentRole === 'admin') setActiveView('admin');
                }}
                className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-200 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                <span>
                  {currentRole === 'merchant' && (lang === 'ar' ? 'لوحة تحكم المتجر' : 'Tableau de bord')}
                  {currentRole === 'driver' && (lang === 'ar' ? 'جولة التوصيل اليومية' : 'Feuille de route')}
                  {currentRole === 'admin' && (lang === 'ar' ? 'مركز العمليات والمراقبة' : 'Supervision Ops')}
                </span>
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="text-xs text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'زيارة الموقع الرئيسي' : 'Voir le site'}
              </button>
            </div>
          )}

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Track Input Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsQuickTrackOpen(!isQuickTrackOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-200 cursor-pointer"
                title={t.nav.tracking}
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span className="hidden xl:inline">{lang === 'ar' ? 'تتبع سريع' : 'Suivi rapide'}</span>
              </button>

              {isQuickTrackOpen && (
                <div className="absolute top-12 ltr:right-0 rtl:left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <form onSubmit={handleTrackFormSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="LIV-2025-98421"
                      value={quickTrackInput}
                      onChange={(e) => setQuickTrackInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      {lang === 'ar' ? 'تتبع' : 'OK'}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-11 ltr:right-0 rtl:left-0 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  <button
                    onClick={() => { setLang('ar'); setIsLangMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between cursor-pointer ${
                      lang === 'ar' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>العربية (RTL)</span>
                    <span>🇲🇦</span>
                  </button>
                  <button
                    onClick={() => { setLang('fr'); setIsLangMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between cursor-pointer ${
                      lang === 'fr' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Français</span>
                    <span>🇫🇷</span>
                  </button>
                  <button
                    onClick={() => { setLang('en'); setIsLangMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between cursor-pointer ${
                      lang === 'en' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    <span>🇬🇧</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Account Actions */}
            {currentRole === 'guest' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  {t.nav.login}
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'ابدأ الآن' : lang === 'fr' ? 'S\'inscrire' : 'Get Started'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser?.storeName || currentUser?.name}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">{currentRole}</div>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title={t.nav.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold border border-slate-200"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Quick Track Input in Mobile */}
          <form onSubmit={handleTrackFormSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder={lang === 'ar' ? 'تتبع طردك (LIV-2025-98421)...' : 'N° de suivi...'}
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="flex-1 text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              {lang === 'ar' ? 'تتبع' : 'OK'}
            </button>
          </form>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-start px-3 py-2.5 rounded-xl text-xs font-bold ${
                  activeView === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth or Profile in Mobile */}
          {currentRole === 'guest' ? (
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => { onOpenAuth('login'); setIsMobileMenuOpen(false); }}
                className="flex-1 py-3 text-center text-xs font-bold text-slate-700 border border-slate-300 rounded-xl"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setIsMobileMenuOpen(false); }}
                className="flex-1 py-3 text-center text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                {lang === 'ar' ? 'ابدأ الآن' : 'S\'inscrire'}
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  if (currentRole === 'merchant') setActiveView('merchant');
                  else if (currentRole === 'driver') setActiveView('driver');
                  else if (currentRole === 'admin') setActiveView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>
                  {currentRole === 'merchant' && (lang === 'ar' ? 'فضاء التاجر' : 'Espace Marchand')}
                  {currentRole === 'driver' && (lang === 'ar' ? 'تطبيق السائق' : 'Application Livreur')}
                  {currentRole === 'admin' && (lang === 'ar' ? 'لوحة الإدارة' : 'Espace Admin')}
                </span>
              </button>

              <button
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-red-50 text-red-700 text-xs font-bold rounded-xl text-center"
              >
                {t.nav.logout}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
