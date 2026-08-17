import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Search,
} from 'lucide-react';
import { Language, FaqItem } from '../../types';
import { translations } from '../../i18n/translations';
import { FAQ_DATA } from '../../data/mockData';

interface FAQSectionProps {
  lang: Language;
  faqItems?: FaqItem[];
  onOpenRegister?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, faqItems = FAQ_DATA, onOpenRegister }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.faq.all },
    { id: 'general', label: t.faq.general },
    { id: 'pricing', label: t.faq.pricing },
    { id: 'cod', label: t.faq.cod },
    { id: 'tracking', label: t.faq.tracking },
    { id: 'returns', label: t.faq.returns },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const safeFaqItems = Array.isArray(faqItems) ? faqItems : FAQ_DATA;

  const filteredFaq = safeFaqItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="faq-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.faq.subtitle}
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaq.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:border-emerald-300"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 text-start flex justify-between items-center gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {lang === 'ar' ? item.questionAr : lang === 'fr' ? item.questionFr : item.questionEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white animate-in fade-in duration-200">
                    {lang === 'ar' ? item.answerAr : lang === 'fr' ? item.answerFr : item.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <h4 className="text-sm font-bold text-emerald-950">{t.faq.stillHaveQuestions}</h4>
            <p className="text-xs text-emerald-800">{t.faq.contactTeam}</p>
          </div>
          <a
            href="https://wa.me/212779063241?text=Bonjour,%20j'ai%20une%20question%20sur%20vos%20services%20de%20livraison"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp (0779063241)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
