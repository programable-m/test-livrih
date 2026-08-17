import React, { useState } from 'react';
import {
  Truck,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Banknote,
  TrendingUp,
} from 'lucide-react';
import { Language } from '../../types';

interface HeroSectionProps {
  lang: Language;
  onTrack: (code: string) => void;
  onOpenAuth: (tab?: 'login' | 'register') => void;
  setActiveView: (view: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onTrack,
  onOpenAuth,
  setActiveView,
}) => {
  const [trackingInput, setTrackingInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onTrack(trackingInput.trim());
    }
  };

  const sampleCodes = ['LIV-2025-98421', 'LIV-2025-77210', 'LIV-2025-63102', 'LIV-2025-55190'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-600/15 via-teal-500/10 to-emerald-700/15 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute -top-24 ltr:-right-24 rtl:-left-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'المنصة اللوجستية الأولى للتجارة الإلكترونية في المغرب 🇲🇦'
                  : lang === 'fr'
                  ? 'La plateforme logistique e-commerce au Maroc 🇲🇦'
                  : 'Morocco\'s Dedicated E-commerce Logistics Platform 🇲🇦'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] text-white">
              {lang === 'ar' ? (
                <>
                  كبّر تجارتك، <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    ونحن نتكفل بالتوصيل.
                  </span>
                </>
              ) : lang === 'fr' ? (
                <>
                  Développez vos ventes, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    on s'occupe de la livraison.
                  </span>
                </>
              ) : (
                <>
                  Scale your store, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    we handle your deliveries.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {lang === 'ar'
                ? 'شحن، COD، تتبع وإدارة طلبات التجارة الإلكترونية في المغرب من منصة واحدة.'
                : lang === 'fr'
                ? 'Expéditions, encaissement COD, suivi en temps réel et gestion de commandes e-commerce au Maroc depuis une seule plateforme.'
                : 'Shipping, COD collection, live tracking, and e-commerce order management across Morocco from a single platform.'}
            </p>

            {/* Interactive Tracking Box */}
            <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/15 shadow-2xl max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'أدخل رقم التتبع (مثال: LIV-2025-98421)...'
                        : lang === 'fr'
                        ? 'Entrez votre n° de suivi (ex: LIV-2025-98421)...'
                        : 'Enter tracking code (e.g. LIV-2025-98421)...'
                    }
                    className="w-full text-xs sm:text-sm ltr:pl-9 rtl:pr-9 py-3 bg-slate-900/90 text-white rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'تتبع شحنتك' : lang === 'fr' ? 'Suivre mon colis' : 'Track Parcel'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>

              {/* Sample Code chips */}
              <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/10 text-[11px] text-slate-300 flex-wrap">
                <span className="text-slate-400">
                  {lang === 'ar' ? 'أكواد تجريبية سريعة:' : lang === 'fr' ? 'Exemples de suivi :' : 'Sample codes:'}
                </span>
                {sampleCodes.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setTrackingInput(code);
                      onTrack(code);
                    }}
                    className="px-2 py-0.5 bg-slate-800/80 hover:bg-emerald-900/50 hover:text-emerald-300 border border-slate-700 rounded text-[11px] font-mono transition-colors cursor-pointer"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear 2 CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'ابدأ الآن مجاناً' : lang === 'fr' ? 'Commencer maintenant' : 'Get Started Now'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActiveView('pricing')}
                className="px-5 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'حاسبة الأسعار والتغطية' : lang === 'fr' ? 'Tarifs & Zones' : 'Tariffs & Zones'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-900/95 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ● livrih.com • Maroc
                </div>
              </div>

              {/* Snapshot 1: Active Parcel Lifecycle */}
              <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">LIV-2025-98421</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-[10px] rounded-md">
                    {lang === 'ar' ? 'تم التسليم وقبض المبلغ' : 'Livré & Encaissé'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">سفيان البقالي • Casablanca</div>
                    <div className="text-xs text-slate-400">حذاء جلدي فاخر (مقاس 43)</div>
                  </div>
                  <div className="text-end">
                    <div className="text-base font-black text-emerald-400">690 MAD</div>
                    <div className="text-[10px] text-slate-400">COD نقداً</div>
                  </div>
                </div>
              </div>

              {/* Snapshot 2: Settlement Status */}
              <div className="p-3.5 bg-slate-800/40 rounded-2xl border border-slate-700/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{lang === 'ar' ? 'تسوية أسبوعية منتظمة' : 'Virement COD Régulier'}</div>
                    <div className="text-[10px] text-slate-400">Attijariwafa Bank • RIB vérifié</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-xs">24h Express</span>
              </div>

              {/* Footer reassurance */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'ar' ? 'نظام تتبع مباشر ومسار موثق' : 'Traçabilité transparente'}
                </span>
                <span className="text-emerald-400 font-semibold">{lang === 'ar' ? 'جمع مجاني يومي' : 'Ramassage offert'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
