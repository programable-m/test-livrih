import React from 'react';
import {
  UserPlus,
  PackageCheck,
  Truck,
  Banknote,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../../types';

interface HowItWorksProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang, onOpenRegister }) => {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      titleAr: 'افتح حسابك وسجل شحناتك',
      titleFr: 'Créez votre compte & ajoutez vos colis',
      titleEn: 'Create your account & add parcels',
      descAr: 'تسجيل مجاني في أقل من دقيقتين، استيراد مباشر من Google Sheets أو إضافة الطرود يدوياً بنقرة واحدة.',
      descFr: 'Inscription gratuite en 2 minutes, import automatique de vos commandes depuis Google Sheets ou Shopify.',
      descEn: 'Free signup in 2 minutes, instant sync from Google Sheets or Shopify with one-click label printing.',
    },
    {
      num: '02',
      icon: PackageCheck,
      titleAr: 'جمع مجاني للطرود من مقركم',
      titleFr: 'Ramassage gratuit à votre porte',
      titleEn: 'Free parcel pickup from your premises',
      descAr: 'يصل مندوب livrih لاستلام الطرود من مستودعكم أو متجركم مع إشعار استلام رقمي فوري.',
      descFr: 'Notre livreur collecte vos colis chez vous chaque après-midi sans aucun frais de déplacement.',
      descEn: 'Our courier collects your packages daily from your warehouse or home with no pickup fee.',
    },
    {
      num: '03',
      icon: Truck,
      titleAr: 'توصيل سريع وتأكيد مع الزبون',
      titleFr: 'Livraison express & suivi direct',
      titleEn: 'Express delivery & customer confirmation',
      descAr: 'توصيل الشحنة في 24 ساعة، اتصال هاتفي مسبق مع الزبون، وتحديث فوري لحالة الطرد بنظام التتبع.',
      descFr: 'Acheminement rapide en 24h avec appel préalable au client et suivi en temps réel par WhatsApp.',
      descEn: '24h dispatch with courier phone call and live WhatsApp status updates to the customer.',
    },
    {
      num: '04',
      icon: Banknote,
      titleAr: 'تحصيل الأموال وتسوية في 24h',
      titleFr: 'Encaissement COD & Virement en 24h',
      titleEn: 'Cash collection & 24h Bank Transfer',
      descAr: 'نقبض المبلغ من الزبون نقداً ونحوله مباشرة لحسابكم البنكي مرفقاً بفاتورة رقمية دقيقة.',
      descFr: 'Collecte sécurisée du montant et versement sur votre RIB sous 24h avec facture détaillée.',
      descEn: 'Reliable cash collection and daily settlement transferred to your bank RIB in 24 hours.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'كيف تعمل منصة livrih؟' : 'Comment fonctionne livrih ?'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar'
              ? '4 خطوات بسيطة من تجهيز الطلب إلى استلام أموالك'
              : '4 étapes simples de la préparation à l\'encaissement'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'ar'
              ? 'صممنا دورة عمل سريعة ومرنة لتمكينك من التركيز على زيادة مبيعاتك دون القلق بشأن التوصيل'
              : 'Un flux logistique fluide pensé pour maximiser votre taux de livraison et votre trésorerie.'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-300">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {lang === 'ar' ? step.titleAr : lang === 'fr' ? step.titleFr : step.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'ar' ? step.descAr : lang === 'fr' ? step.descFr : step.descEn}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تأكيد مباشر' : 'Process garanti'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
