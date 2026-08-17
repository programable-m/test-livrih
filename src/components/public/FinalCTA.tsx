import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { Language } from '../../types';

interface FinalCTAProps {
  lang: Language;
  onOpenAuth: () => void;
  setActiveView: (view: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ lang, onOpenAuth, setActiveView }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4" />
          <span>
            {lang === 'ar' ? 'ابدأ الآن بدون أي اشتراك شهري أو التزام' : lang === 'fr' ? 'Sans engagement & Sans abonnement' : 'No Monthly Fees & No Commitment'}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
          {lang === 'ar' ? (
            <>
              جاهز لتكبير تجارتك الإلكترونية{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                بخدمة توصيل موثوقة؟
              </span>
            </>
          ) : lang === 'fr' ? (
            <>
              Prêt à accélérer vos ventes avec une{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                logistique d'excellence ?
              </span>
            </>
          ) : (
            <>
              Ready to scale your store with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                reliable e-commerce delivery?
              </span>
            </>
          )}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {lang === 'ar'
            ? 'سجل حسابك في دقيقتين، اطلب أول جمع مجاني لطردك، وتابع حركة الشحنات وتسوية أموالك بكل سهولة.'
            : lang === 'fr'
            ? 'Inscrivez-vous en 2 minutes, programmez votre premier ramassage et encaissez vos ventes en toute sérénité.'
            : 'Sign up in 2 minutes, schedule your first free pickup, and collect your COD earnings with confidence.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenAuth}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 text-sm sm:text-base font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'افتح حساب تاجر مجاناً' : lang === 'fr' ? 'Créer mon compte gratuitement' : 'Create Free Merchant Account'}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>

          <button
            onClick={() => setActiveView('pricing')}
            className="px-6 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-bold rounded-2xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'استعراض الأسعار والمدن' : lang === 'fr' ? 'Consulter la grille tarifaire' : 'View Pricing & Tariffs'}</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {lang === 'ar' ? 'جمع مجاني يومي من باب مقرك' : lang === 'fr' ? 'Ramassage gratuit' : 'Free daily pickup'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {lang === 'ar' ? 'تسوية COD عبر تحويل بنكي' : lang === 'fr' ? 'Virement bancaire COD 24h' : '24h Bank transfers'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {lang === 'ar' ? 'تتبع مباشر ورسائل إشعار' : lang === 'fr' ? 'Suivi en temps réel' : 'Real-time tracking'}
          </span>
        </div>
      </div>
    </section>
  );
};
