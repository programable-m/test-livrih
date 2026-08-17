import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Printer,
  Download,
  Eye,
  Phone,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Truck,
  Package,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Language, Parcel, ShipmentStatus } from '../../types';
import { translations } from '../../i18n/translations';

interface MerchantParcelsViewProps {
  lang: Language;
  parcels: Parcel[];
  onOpenNewParcel: () => void;
  onSelectParcelForLabel: (parcel: Parcel) => void;
  onSelectParcelForTracking: (code: string) => void;
}

export const MerchantParcelsView: React.FC<MerchantParcelsViewProps> = ({
  lang,
  parcels = [],
  onOpenNewParcel,
  onSelectParcelForLabel,
  onSelectParcelForTracking,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang];
  const safeParcels = Array.isArray(parcels) ? parcels : [];

  const statusFilters = [
    { id: 'ALL', label: lang === 'ar' ? 'جميع الشحنات' : 'Tous les colis', count: safeParcels.length },
    { id: 'CREE', label: t.statuses.CREE, count: safeParcels.filter((p) => p.status === 'CREE').length },
    { id: 'RAMASSE', label: t.statuses.RAMASSE, count: safeParcels.filter((p) => p.status === 'RAMASSE').length },
    { id: 'EN_COURS_LIVRAISON', label: t.statuses.EN_COURS_LIVRAISON, count: safeParcels.filter((p) => p.status === 'EN_COURS_LIVRAISON').length },
    { id: 'LIVRE', label: t.statuses.LIVRE, count: safeParcels.filter((p) => p.status === 'LIVRE').length },
    { id: 'NON_LIVRE', label: t.statuses.NON_LIVRE, count: safeParcels.filter((p) => p.status === 'NON_LIVRE').length },
    { id: 'RETOURNE', label: t.statuses.RETOURNE, count: safeParcels.filter((p) => p.status === 'RETOURNE').length },
    { id: 'PAYE', label: t.statuses.PAYE, count: safeParcels.filter((p) => p.status === 'PAYE').length },
  ];

  const filteredParcels = safeParcels.filter((p) => {
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    const matchesSearch =
      (p.trackingCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.customerPhone || '').includes(searchQuery) ||
      (p.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.productName || p.productDescription || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'LIVRE':
      case 'PAYE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'EN_COURS_LIVRAISON':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'AU_CENTRE_TRI':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'RAMASSE':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'NON_LIVRE':
      case 'RETOURNE':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Code Suivi,Client,Telephone,Ville,Article,Montant COD,Frais Livraison,Statut,Date']
        .concat(
          filteredParcels.map(
            (p) =>
              `${p.trackingCode},"${p.customerName}",${p.customerPhone},${p.city},"${p.productName}",${p.codAmount},${p.shippingFee},${p.status},${p.createdAt}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `livrih_colis_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'إدارة ومتابعة الشحنات' : 'Gestion des Expéditions'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'تتبع لحظي، طباعة البوليصات، ومعالجة المرتجعات' : 'Suivi en direct, étiquettes thermiques et règlements COD'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تصدير Excel/CSV' : 'Exporter CSV'}</span>
          </button>

          <button
            onClick={onOpenNewParcel}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طرد جديد' : 'Nouveau Colis'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Status Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {statusFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatus === tab.id ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث برقم التتبع، اسم الزبون، الهاتف، أو المدينة...' : 'Rechercher par n° de suivi, nom client, tél, ville...'}
            className="w-full text-xs ltr:pl-9 rtl:pr-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'رقم التتبع' : 'Code Suivi'}</th>
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'الزبون المستلم' : 'Destinataire'}</th>
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'المدينة والحي' : 'Ville & Quartier'}</th>
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'السلعة' : 'Produit'}</th>
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'مبلغ COD' : 'Montant COD'}</th>
              <th className="py-3.5 px-4 text-start">{lang === 'ar' ? 'الحالة اللوجستية' : 'Statut'}</th>
              <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredParcels.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  {lang === 'ar' ? 'لا توجد شحنات مطابقة للبحث' : 'Aucun colis trouvé'}
                </td>
              </tr>
            ) : (
              filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-emerald-50/30 transition-colors">
                  {/* Tracking Code */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <button
                      onClick={() => onSelectParcelForTracking(parcel.trackingCode)}
                      className="hover:text-emerald-600 hover:underline flex items-center gap-1 text-slate-900"
                    >
                      <span>{parcel.trackingCode}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-normal block font-sans">
                      {parcel.createdAt}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{parcel.customerName}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1" dir="ltr">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{parcel.customerPhone}</span>
                    </div>
                  </td>

                  {/* City */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{parcel.city}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                      {parcel.district || parcel.address}
                    </div>
                  </td>

                  {/* Product */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 truncate max-w-[160px]">
                      {parcel.productName || parcel.productDescription}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Qté: {parcel.productQuantity || parcel.piecesCount || 1} • {parcel.weightKg || 0.5}kg
                    </div>
                  </td>

                  {/* COD */}
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-black text-emerald-800 text-sm">
                      {parcel.codAmount} MAD
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Frais: {parcel.shippingFee} MAD
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(parcel.status)}`}>
                      {t.statuses[parcel.status] || parcel.status}
                    </span>
                    {parcel.failureReason && (
                      <div className="text-[10px] text-rose-700 font-medium mt-0.5 max-w-[150px] truncate">
                        ⚠️ {t.reasons[parcel.failureReason] || parcel.failureReason}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Print Label */}
                      <button
                        onClick={() => onSelectParcelForLabel(parcel)}
                        title={lang === 'ar' ? 'طباعة البوليصة' : 'Imprimer étiquette'}
                        className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* View Tracking */}
                      <button
                        onClick={() => onSelectParcelForTracking(parcel.trackingCode)}
                        title={lang === 'ar' ? 'تتبع مسار الشحنة' : 'Suivre le colis'}
                        className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* WhatsApp Client link */}
                      <a
                        href={`https://wa.me/212${parcel.customerPhone.replace(/^0/, '')}?text=Bonjour%20${encodeURIComponent(parcel.customerName)},%20votre%20commande%20chez%20${encodeURIComponent(parcel.merchantStoreName)}%20est%20en%20cours%20de%20traitement%20avec%20le%20code%20de%20suivi%20${parcel.trackingCode}`}
                        target="_blank"
                        rel="noreferrer"
                        title={lang === 'ar' ? 'مراسلة الزبون عبر WhatsApp' : 'Contacter client WhatsApp'}
                        className="p-1.5 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-800 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
