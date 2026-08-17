import React from 'react';
import {
  PackageCheck,
  Truck,
  Search,
  Banknote,
  Boxes,
  RotateCcw,
  Code,
  MessageSquareShare,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ServicesSectionProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onOpenRegister }) => {
  const t = translations[lang];

  const serviceCards = [
    {
      icon: PackageCheck,
      title: t.services.ramassage.title,
      desc: t.services.ramassage.desc,
      color: 'from-emerald-500 to-teal-600',
      badge: lang === 'ar' ? 'مجاناً 100%' : '100% Gratuit',
    },
    {
      icon: Truck,
      title: t.services.livraison.title,
      desc: t.services.livraison.desc,
      color: 'from-teal-500 to-emerald-600',
      badge: '24h - 48h',
    },
    {
      icon: Search,
      title: t.services.tracking.title,
      desc: t.services.tracking.desc,
      color: 'from-blue-500 to-cyan-600',
      badge: 'Live GPS',
    },
    {
      icon: Banknote,
      title: t.services.cod.title,
      desc: t.services.cod.desc,
      color: 'from-amber-500 to-yellow-600',
      badge: '24h Virement',
    },
    {
      icon: Boxes,
      title: t.services.stockage.title,
      desc: t.services.stockage.desc,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Fulfillment',
    },
    {
      icon: RotateCcw,
      title: t.services.retours.title,
      desc: t.services.retours.desc,
      color: 'from-rose-500 to-red-600',
      badge: lang === 'ar' ? 'إرجاع منتظم' : 'Suivi Retours',
    },
    {
      icon: Code,
      title: t.services.integrations.title,
      desc: t.services.integrations.desc,
      color: 'from-slate-700 to-slate-900',
      badge: 'REST API & Sheets',
    },
    {
      icon: MessageSquareShare,
      title: t.services.loyalty.title,
      desc: t.services.loyalty.desc,
      color: 'from-green-600 to-emerald-700',
      badge: 'WhatsApp Bot',
    },
  ];

  return (
    <section id="services-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>{t.services.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.subtitle}
          </h2>
        </div>

        {/* 8 Service Cards Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold group-hover:text-emerald-800">
                  <span>{lang === 'ar' ? 'معرفة المزيد' : 'En savoir plus'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-xl sm:text-2xl font-black">
              {lang === 'ar' ? 'جاهز لرفع نسبة تسليم متجرك في المغرب؟' : 'Prêt à propulser vos livraisons au Maroc ?'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              {lang === 'ar'
                ? 'انضم إلى مئات التجار الذين يثقون في livrih لإيصال شحناتهم واسترجاع أموالهم في 24 ساعة.'
                : 'Rejoignez des centaines d\'e-commerçants qui nous font confiance pour leur logistique et leurs virements COD.'}
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
          >
            {t.hero.startBtn}
          </button>
        </div>
      </div>
    </section>
  );
};
