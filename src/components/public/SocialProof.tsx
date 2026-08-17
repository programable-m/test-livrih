import React from 'react';
import { Star, CheckCircle, TrendingUp, Quote } from 'lucide-react';
import { Language } from '../../types';

interface SocialProofProps {
  lang: Language;
}

export const SocialProof: React.FC<SocialProofProps> = ({ lang }) => {
  const testimonials = [
    {
      store: 'Atlas Fashion (Casablanca)',
      owner: 'أمين التازي',
      category: 'الملابس والأزياء الجاهزة',
      result: '+34% نسبة نجاح التوصيل',
      quote: lang === 'ar'
        ? 'منذ انضمامنا إلى Livrih تخلصنا تماماً من مشكلة تأخر تسوية أموال الدفع عند الاستلام. التسوية البنكية منتظمة، وتطبيق السائقين قلل المرتجعات بشكل واضح.'
        : lang === 'fr'
        ? 'Depuis notre passage chez Livrih, nous recevons nos fonds COD sans retard. L\'application des livreurs a nettement réduit notre taux de retour.'
        : 'Since switching to Livrih, our COD cash flow is always on schedule. The driver verification system reduced our return rates significantly.',
    },
    {
      store: 'Maison Cuir (Fès)',
      owner: 'رشيد الفاسي',
      category: 'الصناعة الجلدية والحقائب',
      result: 'توصيل 24h لكافة مدن الشمال والوسط',
      quote: lang === 'ar'
        ? 'خدمة الجمع المجاني من ورشتنا في فاس والتوزيع السريع في الدار البيضاء والرباط ومراكش ساعدتنا على مضاعفة مبيعاتنا خلال الأشهر الماضية.'
        : lang === 'fr'
        ? 'Le ramassage gratuit à Fès et la livraison rapide sur Casablanca et Rabat nous ont permis de doubler nos commandes en ligne.'
        : 'Free pickup at our Fes workshop and fast distribution to Casablanca and Rabat helped us double our e-commerce sales.',
    },
    {
      store: 'Moroccan Botanics (Marrakech)',
      owner: 'سارة العلمي',
      category: 'مستحضرات العناية الطبيعية',
      result: 'فواتير شفافة وتتبع مباشر',
      quote: lang === 'ar'
        ? 'أفضل ميزة في Livrih هي الشفافية التامة. كل درهم مسجل ومطابق مع إيصالات التوصيل، وزبائننا معجبون بسرعة وصول الطرود والتتبع المباشر.'
        : lang === 'fr'
        ? 'Une transparence exemplaire. Les bordereaux sont clairs au centime près, et nos clients adorent le suivi en temps réel.'
        : 'Exemplary transparency. Settlement sheets match to the penny, and our buyers love the real-time tracking links.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>{lang === 'ar' ? 'شركاء النجاح والتجار' : lang === 'fr' ? 'Témoignages Marchands' : 'Merchant Success Stories'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'ar'
              ? 'تجار يثقون في Livrih لتكبير مبيعاتهم'
              : lang === 'fr'
              ? 'Ils développent leur e-commerce avec Livrih'
              : 'E-commerce Brands Scaling with Livrih'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'قصص حقيقية لتجار وبائعين في المغرب حققوا استقراراً مالياً ونمواً في المبيعات مع خدماتنا اللوجستية.'
              : lang === 'fr'
              ? 'Des retours d\'expérience concrets de boutiques marocaines qui ont sécurisé leur logistique.'
              : 'Real insights from Moroccan merchants who secured their cashflow and logistics.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {item.result}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-emerald-500/20" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.store}</div>
                  <div className="text-xs text-slate-500">{item.owner} • {item.category}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
