import React from 'react';
import { ShieldCheck, Landmark, Truck, Clock4, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface TrustIndicatorsProps {
  lang: Language;
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ lang }) => {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {/* Trust 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {lang === 'ar' ? 'تغطية 80+ مدينة' : lang === 'fr' ? 'Couverture 80+ Villes' : '80+ Moroccan Cities'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ar' ? 'شبكة توزيع وطنية شاملة' : lang === 'fr' ? 'Réseau national intégré' : 'Comprehensive national network'}
              </div>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {lang === 'ar' ? 'تسوية بنكية مؤكدة' : lang === 'fr' ? 'Virements Bancaires 24h' : 'Secure 24h Bank Payouts'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ar' ? 'كافة البنوك المغربية' : lang === 'fr' ? 'Toutes banques marocaines' : 'All Moroccan major banks'}
              </div>
            </div>
          </div>

          {/* Trust 3 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {lang === 'ar' ? 'تحصيل COD موثوق' : lang === 'fr' ? 'Gestion COD Sécurisée' : 'Safe COD Collection'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ar' ? 'إيصالات وفواتير شفافة' : lang === 'fr' ? 'Reçus & traçabilité stricte' : 'Transparent receipts & audits'}
              </div>
            </div>
          </div>

          {/* Trust 4 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Clock4 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {lang === 'ar' ? 'جمع مجاني يومي' : lang === 'fr' ? 'Ramassage Gratuit' : 'Free Daily Pickup'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ar' ? 'من باب مقرك أو مستودعك' : lang === 'fr' ? 'À votre porte ou entrepôt' : 'From your doorstep'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
