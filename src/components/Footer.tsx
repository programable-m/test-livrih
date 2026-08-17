import React from 'react';
import {
  Truck,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  ArrowUpRight,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  setActiveView: (view: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'returns') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setActiveView, onOpenLegal }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                livrih<span className="text-emerald-500">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            {/* Direct WhatsApp Quick Contact CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/212779063241?text=Bonjour%20livrih,%20je%20souhaite%20des%20informations%20sur%20vos%20services%20de%20livraison"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'تواصل معنا فوراً عبر WhatsApp' : 'Discutez directement sur WhatsApp'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tracking')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.tracking}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('pricing')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('agencies')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.agencies}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('blog')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('careers')} className="hover:text-emerald-400 transition-colors">
                  {t.nav.careers}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.services}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>{t.services.ramassage.title}</li>
              <li>{t.services.livraison.title}</li>
              <li>{t.services.cod.title}</li>
              <li>{t.services.stockage.title}</li>
              <li>{t.services.retours.title}</li>
              <li>{t.services.integrations.title}</li>
              <li>{t.services.loyalty.title}</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.contact.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:0779063241" className="hover:text-white" dir="ltr">0779063241</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:contact@livrih.com" className="hover:text-white">contact@livrih.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zone Industrielle Sidi Maarouf, Casablanca</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium">24h/24 - 7j/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Moroccan Key Cities Bar */}
        <div className="py-6 border-b border-slate-800/80">
          <div className="text-[11px] text-slate-500 mb-2 font-medium">
            {lang === 'ar' ? 'تغطية المدن الرئيسية في المغرب:' : 'Principales villes desservies :'}
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan', 'Salé', 'Témara', 'Mohammedia', 'El Jadida', 'Safi', 'Nador', 'Béni Mellal', 'Laâyoune', 'Dakhla', 'Ouarzazate', 'Errachidia', 'Taza', 'Settat', 'Khouribga'].map((city) => (
              <span key={city} className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 text-slate-300">
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-slate-300 transition-colors">
              {t.footer.privacy}
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-slate-300 transition-colors">
              {t.footer.terms}
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('returns')} className="hover:text-slate-300 transition-colors">
              {t.footer.returnsPolicy}
            </button>
          </div>
          <div className="text-emerald-400 font-medium flex items-center gap-1">
            {t.footer.moroccoLove}
          </div>
        </div>
      </div>
    </footer>
  );
};
