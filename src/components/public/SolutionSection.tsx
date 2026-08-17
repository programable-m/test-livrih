import React from 'react';
import { CheckCircle2, Zap, ShieldCheck, Smartphone, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface SolutionSectionProps {
  lang: Language;
  onOpenAuth: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ lang, onOpenAuth }) => {
  const solutions = [
    {
      title: lang === 'ar' ? 'تسوية COD سريعة ومجدولة' : lang === 'fr' ? 'Règlements COD réguliers & rapides' : 'Fast & Scheduled COD Payouts',
      desc: lang === 'ar'
        ? 'تحويلات بنكية مباشرة لحسابك البنكي المغربي مع إشعار بالتحويل وكشف حساب مفصل لكل طرد تم تسليمه.'
        : lang === 'fr'
        ? 'Virements bancaires directs vers votre compte marocain avec bordereau détaillé de chaque colis livré.'
        : 'Direct bank transfers to your Moroccan bank account with detailed per-parcel settlement sheets.',
    },
    {
      title: lang === 'ar' ? 'تطبيق ذكي للسائقين لتقليل الإرجاع' : lang === 'fr' ? 'Application chauffeur anti-retours' : 'Smart Driver App to Minimize Returns',
      desc: lang === 'ar'
        ? 'يطلب من السائق إجراء 3 محاولات تواصل موثقة، مع توجيه ذكي عبر الخرائط لضمان الوصول الفعلي للزبون.'
        : lang === 'fr'
        ? 'Processus strict de 3 tentatives d\'appel documentées et géolocalisation pour garantir la livraison.'
        : 'Enforces 3 verified call attempts and map-guided routing before any failed status is allowed.',
    },
    {
      title: lang === 'ar' ? 'تتبع فوري وإشعارات واتساب' : lang === 'fr' ? 'Suivi en temps réel & WhatsApp' : 'Real-time Tracking & WhatsApp Alerts',
      desc: lang === 'ar'
        ? 'رابط تتبع مباشر لزبائنك مع تفاصيل الموزع، مما يرفع ثقة المشتري ويقلل استفسارات الدعم الفني.'
        : lang === 'fr'
        ? 'Lien de tracking transparent pour vos clients avec contact livreur, réduisant vos tickets de support.'
        : 'Transparent tracking link for your customers showing driver contact, boosting buyer trust.',
    },
    {
      title: lang === 'ar' ? 'فواتير واضحة بدون رسوم خفية' : lang === 'fr' ? 'Facturation claire sans frais cachés' : 'Clear Invoices & No Hidden Fees',
      desc: lang === 'ar'
        ? 'أسعار توصيل ثابتة ومحددة سلفاً لكل مدينة، مع كشف أسبوعي يطابق كل درهم تم تحصيله بدقة.'
        : lang === 'fr'
        ? 'Grille tarifaire fixe par ville, avec récapitulatif comptable hebdomadaire clair et auditable.'
        : 'Fixed per-city delivery tariffs with weekly audit sheets matching every collected dirham.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {lang === 'ar' ? 'حلول Livrih المبتكرة' : lang === 'fr' ? 'La Solution Livrih' : 'The Livrih Advantage'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'ar' ? (
                <>
                  منظومة لوجستية متكاملة مصممة خصيصاً{' '}
                  <span className="text-emerald-600">لنمو مبيعاتك وأرباحك</span>
                </>
              ) : lang === 'fr' ? (
                <>
                  Une infrastructure logistique conçue pour{' '}
                  <span className="text-emerald-600">sécuriser votre croissance</span>
                </>
              ) : (
                <>
                  An all-in-one logistics infrastructure designed to{' '}
                  <span className="text-emerald-600">scale your profits</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'طورنا Livrih لتكون شريكك الاستراتيجي في المغرب: منصة موحدة تربطك بالسائقين، تتابع الشحنات بدقة، وتضمن وصول أموالك في الوقت المحدد.'
                : lang === 'fr'
                ? 'Livrih réunit expéditions express, chauffeurs professionnels, et gestion financière transparente pour vos commandes e-commerce.'
                : 'Livrih unifies express shipping, professional drivers, and automated COD payouts under one reliable portal.'}
            </p>

            <div className="space-y-4 pt-2">
              {solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'ابدأ الآن مجاناً' : lang === 'fr' ? 'Ouvrir mon compte marchand' : 'Get Started for Free'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Right Feature Showcase Graphic */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-bold font-mono text-slate-300">livrih.com / Smart Engine</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                  {lang === 'ar' ? 'نظام حي ومباشر' : 'Live System'}
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-xs text-slate-400 mb-1">
                    {lang === 'ar' ? 'متوسط مدة التوصيل' : 'Délai moyen'}
                  </div>
                  <div className="text-2xl font-black text-emerald-400">24h - 48h</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {lang === 'ar' ? 'في كبرى المدن المغربية' : 'Grandes villes du Maroc'}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-xs text-slate-400 mb-1">
                    {lang === 'ar' ? 'دورة تسوية COD' : 'Cycle de virement'}
                  </div>
                  <div className="text-2xl font-black text-teal-300">24h</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {lang === 'ar' ? 'عبر تحويل بنكي مباشر' : 'Par virement bancaire'}
                  </div>
                </div>
              </div>

              {/* Sample Activity Timeline Box */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 space-y-3">
                <div className="text-xs font-bold text-slate-300">
                  {lang === 'ar' ? 'مسار الشحنة التلقائي:' : 'Traçabilité transparente :'}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">{lang === 'ar' ? 'طلب جمع مجاني تم تسجيله' : 'Ramassage planifié chez le marchand'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">{lang === 'ar' ? 'استلام الطرد ونقله لمركز الفرز' : 'Arrivée au hub régional'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">{lang === 'ar' ? 'تسليم بنجاح مع إثبات وقبض المبلغ' : 'Livré au client final & COD encaissé'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
