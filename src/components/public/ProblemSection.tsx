import React from 'react';
import { AlertTriangle, Clock, Banknote, RefreshCcw, HelpCircle } from 'lucide-react';
import { Language } from '../../types';

interface ProblemSectionProps {
  lang: Language;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ lang }) => {
  const problems = [
    {
      icon: Banknote,
      title: lang === 'ar' ? 'تأخر تسوية أموال الدفع عند الاستلام (COD)' : lang === 'fr' ? 'Retards de règlement COD' : 'Delayed COD Settlements',
      desc: lang === 'ar' 
        ? 'الانتظار لأسابيع لاسترجاع أموال مبيعاتك يجمّد رأس مال متجرك ويوقف حملاتك الإعلانية.'
        : lang === 'fr'
        ? 'Attendre des semaines pour récupérer votre argent bloque votre trésorerie et vos campagnes.'
        : 'Waiting weeks for cash on delivery freezes your working capital and halts your ad scaling.',
    },
    {
      icon: RefreshCcw,
      title: lang === 'ar' ? 'ارتفاع نسبة المرتجعات غير المبررة' : lang === 'fr' ? 'Taux de retour élevé et injustifié' : 'High Unjustified Return Rates',
      desc: lang === 'ar'
        ? 'عدم تواصل الموزع مع الزبون أو تسجيل "غير متاح" دون محاولة حقيقية يسبب خسارة تكلفة الشحن.'
        : lang === 'fr'
        ? 'Livreurs qui n\'appellent pas les clients ou marquent "injoignable" sans réel effort.'
        : 'Drivers who give up without trying or mark unreachable, costing you shipping fees.',
    },
    {
      icon: Clock,
      title: lang === 'ar' ? 'غياب التتبع الدقيق والشفافية' : lang === 'fr' ? 'Manque de traçabilité et de suivi' : 'Lack of Real Tracking & Visibility',
      desc: lang === 'ar'
        ? 'عدم معرفة موقع الطرد الحقيقي يثير قلق الزبون ويزيد من رسائل الاستفسار على خدمة العملاء.'
        : lang === 'fr'
        ? 'Ne pas savoir où est le colis génère de l\'anxiété client et surcharge votre support.'
        : 'Not knowing the exact parcel whereabouts stresses buyers and overwhelms support channels.',
    },
    {
      icon: AlertTriangle,
      title: lang === 'ar' ? 'فواتير معقدة ورسوم مخفية' : lang === 'fr' ? 'Factures opaques et frais cachés' : 'Opaque Billing & Hidden Charges',
      desc: lang === 'ar'
        ? 'صعوبة مطابقة الطرود المسلمة مع المبالغ المحولة واقتطاعات غير واضحة تضيع حساباتك.'
        : lang === 'fr'
        ? 'Difficulté à rapprocher les colis livrés avec les montants virés et retenues imprévues.'
        : 'Hard to reconcile delivered parcels with bank transfers and unexpected deductions.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar' ? 'التحديات اللوجستية التي تواجه التجارة الإلكترونية' : lang === 'fr' ? 'Les freins du e-commerce au Maroc' : 'The E-commerce Logistics Bottleneck'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'ar' 
              ? 'هل تعاني من مشاكل التوصيل واسترجاع أموالك؟' 
              : lang === 'fr' 
              ? 'Fatigué des retards et des problèmes de trésorerie ?' 
              : 'Struggling with Delivery Delays and Cash Flow?'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'أغلب المتاجر الإلكترونية في المغرب لا تخسر بسبب جودة المنتجات، بل بسبب ضعف الشريك اللوجستي وتأخر تحصيل مستحقاتها.'
              : lang === 'fr'
              ? 'La majorité des boutiques en ligne au Maroc ne souffrent pas de leurs produits, mais de la défaillance de la livraison et du COD.'
              : 'Most Moroccan online stores struggle not from product issues, but from weak delivery partnerships and late COD cashflow.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-5 font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {prob.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
