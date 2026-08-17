import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  User,
  ExternalLink,
  Search,
  Building2,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { Language, Agency } from '../../types';
import { translations } from '../../i18n/translations';
import { INITIAL_AGENCIES } from '../../data/mockData';

interface AgencyLocatorProps {
  lang: Language;
  agencies?: Agency[];
  onContactAgency?: (agency: Agency) => void;
}

export const AgencyLocator: React.FC<AgencyLocatorProps> = ({
  lang,
  agencies = INITIAL_AGENCIES,
  onContactAgency,
}) => {
  const safeAgencies = Array.isArray(agencies) && agencies.length > 0 ? agencies : INITIAL_AGENCIES;
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAgency, setActiveAgency] = useState<Agency>(safeAgencies[0] || INITIAL_AGENCIES[0]);

  const t = translations[lang];

  const citiesList = ['ALL', ...Array.from(new Set(safeAgencies.map((a) => a.city)))];

  const filteredAgencies = safeAgencies.filter((agency) => {
    const matchesCity = selectedCity === 'ALL' || agency.city === selectedCity;
    const matchesSearch =
      agency.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.nameAr.includes(searchQuery) ||
      agency.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesSearch;
  });

  return (
    <section id="agencies-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.agencies.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.agencies.subtitle}
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
          {/* City Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
            {citiesList.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap ${
                  selectedCity === city
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {city === 'ALL' ? t.agencies.allCities : city}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.agencies.searchCity}
              className="w-full text-xs ltr:pl-9 rtl:pr-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Grid & Map simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Agencies List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredAgencies.map((agency) => {
              const isSelected = activeAgency.id === agency.id;
              return (
                <div
                  key={agency.id}
                  onClick={() => setActiveAgency(agency)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">
                          {lang === 'ar' ? agency.nameAr : agency.nameFr}
                        </h3>
                        {agency.isMainHub && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300">
                            {t.agencies.mainHub}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">{agency.city}</span>
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${agency.latitude},${agency.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      title={t.agencies.directions}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{agency.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <a href={`tel:${agency.phone}`} className="hover:text-emerald-700 font-semibold" dir="ltr">
                        {agency.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{agency.workingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{t.agencies.manager}: {agency.managerName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Visual Simulator */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 sticky top-28 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4" />
                  {lang === 'ar' ? 'الموقع الجغرافي النشط' : 'Localisation Agence'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  GPS: {activeAgency.latitude}, {activeAgency.longitude}
                </span>
              </div>

              {/* Map Preview Graphic */}
              <div className="h-64 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-950 relative flex items-center justify-center border border-slate-700 overflow-hidden">
                {/* Geometric grid styling representing Moroccan map */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Agency Pin */}
                <div className="relative z-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50 animate-bounce">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="bg-slate-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-bold text-white shadow-xl">
                    {lang === 'ar' ? activeAgency.nameAr : activeAgency.nameFr}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <div className="font-bold text-white text-sm">
                  {lang === 'ar' ? activeAgency.nameAr : activeAgency.nameFr}
                </div>
                <p className="text-slate-400">{activeAgency.address}</p>
                <div className="flex justify-between items-center pt-2 text-[11px]">
                  <span className="text-emerald-400 font-bold">{activeAgency.workingHours}</span>
                  <a
                    href={`https://maps.google.com/?q=${activeAgency.latitude},${activeAgency.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold underline"
                  >
                    <span>{t.agencies.directions}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
