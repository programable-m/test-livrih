import React, { useState } from 'react';
import {
  Calculator,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Package,
} from 'lucide-react';
import { Language, CityTarif } from '../../types';
import { translations } from '../../i18n/translations';
import { MOROCCAN_CITIES_TARIFS } from '../../data/mockData';

interface PricingCalculatorProps {
  lang: Language;
  cities?: CityTarif[];
  onOpenRegister?: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  lang,
  cities = MOROCCAN_CITIES_TARIFS,
  onOpenRegister,
}) => {
  const [fromCity, setFromCity] = useState('casablanca');
  const [toCity, setToCity] = useState('rabat');
  const [packageWeight, setPackageWeight] = useState(1);
  const [codAmount, setCodAmount] = useState(450);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');

  const t = translations[lang];
  const safeCities = Array.isArray(cities) && cities.length > 0 ? cities : MOROCCAN_CITIES_TARIFS;

  // Calculate pricing
  const destinationTarif = safeCities.find((c) => c.id === toCity) || safeCities[0] || MOROCCAN_CITIES_TARIFS[0];
  
  // Extra weight fee (> 3kg adds 5 MAD per extra kg)
  const extraWeightFee = packageWeight > 3 ? Math.ceil(packageWeight - 3) * 5 : 0;
  const totalDeliveryFee = (destinationTarif?.deliveryPrice || 35) + extraWeightFee;
  const netEstimated = Math.max(0, codAmount - totalDeliveryFee);

  // Filter cities table
  const filteredCities = safeCities.filter((city) => {
    const matchesSearch =
      city.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.nameAr.includes(searchQuery) ||
      city.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.zone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone = selectedZone === 'ALL' || city.zone.includes(selectedZone);
    return matchesSearch && matchesZone;
  });

  return (
    <section id="pricing-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.pricing.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.pricing.subtitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'ar'
              ? 'احسب تكلفة التوصيل الصافية ومدة التسليم لجميع المدن والمناطق المغربية بدون رسوم خفية'
              : 'Simulez vos frais de livraison réels et les délais SLA pour toutes les villes du Maroc'}
          </p>
        </div>

        {/* Dynamic Calculator Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-emerald-400">
                <Sliders className="w-5 h-5" />
                <span>{t.pricing.calcTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* From City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.pricing.fromCity}
                  </label>
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full bg-slate-800/90 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {lang === 'ar' ? city.nameAr : city.nameFr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.pricing.toCity}
                  </label>
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full bg-slate-800/90 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {lang === 'ar' ? city.nameAr : city.nameFr} ({city.deliveryPrice} MAD)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Weight */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>{t.pricing.weightLabel}</span>
                    <span className="text-emerald-400 font-mono">{packageWeight} Kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0.5 Kg</span>
                    <span>10 Kg</span>
                    <span>20 Kg</span>
                  </div>
                </div>

                {/* COD Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {t.pricing.codLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={codAmount}
                      onChange={(e) => setCodAmount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800/90 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                    />
                    <span className="absolute ltr:right-3 rtl:left-3 top-2.5 text-xs text-slate-400 font-bold">
                      MAD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Box */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                {lang === 'ar' ? 'ملخص التكلفة والتسوية:' : 'Estimation Tarif & Versement :'}
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-300">{t.pricing.calculatedFee}</span>
                  <span className="text-lg font-black text-emerald-400">
                    {totalDeliveryFee} MAD
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-300">{t.pricing.slaDelivery}</span>
                  <span className="font-bold text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-500/30">
                    ⚡ {destinationTarif.slaHours}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-300">
                    {lang === 'ar' ? 'رسوم المرتجع في حال الإلغاء' : 'Frais de retour si annulé'}
                  </span>
                  <span className="font-bold text-slate-300">{destinationTarif.returnPrice} MAD</span>
                </div>

                <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-[11px] text-slate-300 block">{t.pricing.netEstimated}</span>
                    <span className="text-xs text-slate-400">
                      {lang === 'ar' ? 'يتم تحويله لحسابكم في 24h' : 'Viré sous 24h ouvrées'}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {netEstimated} MAD
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                {lang === 'ar' ? 'ابدأ الشحن بهذا السعر الآن' : 'Commencer à expédier'}
              </button>
            </div>
          </div>
        </div>

        {/* Moroccan City Tariffs Searchable Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {lang === 'ar' ? 'جدول تغطية المدن والأسعار الشامل' : 'Grille tarifaire par ville'}
              </h3>
              <p className="text-xs text-slate-500">
                {filteredCities.length} {lang === 'ar' ? 'مدينة مسجلة بنظام livrih' : 'villes desservies'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Zone Filter Chips */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setSelectedZone('ALL')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedZone === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  {t.pricing.allZones}
                </button>
                <button
                  onClick={() => setSelectedZone('Zone 1')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedZone === 'Zone 1' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Zone 1 (24h)
                </button>
                <button
                  onClick={() => setSelectedZone('Zone 2')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedZone === 'Zone 2' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Zone 2 (48h)
                </button>
                <button
                  onClick={() => setSelectedZone('Zone 3')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedZone === 'Zone 3' ? 'bg-white text-purple-700 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Zone 3 (Sud)
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.pricing.searchPlaceholder}
                  className="text-xs ltr:pl-9 rtl:pr-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 w-52 sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.city}</th>
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.zone}</th>
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.deliveryFee}</th>
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.returnFee}</th>
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.sla}</th>
                  <th className="py-3.5 px-4 text-start">{t.pricing.tableHeaders.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCities.map((city) => (
                  <tr key={city.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lang === 'ar' ? city.nameAr : city.nameFr}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({city.nameFr})</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {city.zone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">
                      {city.deliveryPrice} MAD
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-500">
                      {city.returnPrice} MAD
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        {city.slaHours}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {t.pricing.activeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
