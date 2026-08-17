import { StorageService } from './storage';
import { Parcel, ShipmentStatus, FailureReason, TrackingEvent, ProofOfDelivery, SystemStats } from '../types';

export interface CreateParcelInput {
  merchantId: string;
  merchantName?: string;
  merchantStoreName?: string;
  customerName: string;
  customerPhone: string;
  customerPhone2?: string;
  city: string;
  address: string;
  district?: string;
  productName?: string;
  productQuantity?: number;
  codAmount: number;
  openPackageAllowed?: boolean;
  serviceType?: 'STANDARD' | 'EXPRESS' | 'ECHANGE' | 'FRAGILE' | 'LIVRAISON_SIMPLE';
  notes?: string;
}

export interface ParcelFilters {
  status?: ShipmentStatus | 'ALL';
  city?: string;
  search?: string;
  merchantId?: string;
  driverId?: string;
  startDate?: string;
  endDate?: string;
}

const MOROCCAN_CITIES_FEES: Record<string, number> = {
  casablanca: 25,
  mohammedia: 25,
  rabat: 30,
  sale: 30,
  temara: 30,
  kenitra: 35,
  marrakech: 35,
  tanger: 35,
  fes: 35,
  meknes: 35,
  agadir: 40,
  oujda: 45,
  tetouan: 35,
  nador: 45,
  eljadida: 35,
  safi: 40,
  berrechid: 30,
  settat: 35,
  beni_mellal: 40,
  khouribga: 35,
  laayoune: 55,
  dakhla: 60,
};

export const ShipmentService = {
  getAllParcels(): Parcel[] {
    return StorageService.getParcels();
  },

  getParcelById(id: string): Parcel | null {
    const parcels = StorageService.getParcels();
    return parcels.find((p) => p.id === id || p.trackingCode === id) || null;
  },

  getParcelByTracking(trackingCode: string): Parcel | null {
    const normalized = trackingCode.trim().toUpperCase();
    const parcels = StorageService.getParcels();
    return (
      parcels.find((p) => p.trackingCode.toUpperCase() === normalized || p.id === normalized) || null
    );
  },

  getFilteredParcels(filters: ParcelFilters): Parcel[] {
    let parcels = StorageService.getParcels();

    if (filters.merchantId) {
      parcels = parcels.filter((p) => p.merchantId === filters.merchantId);
    }

    if (filters.driverId) {
      parcels = parcels.filter((p) => p.assignedDriverId === filters.driverId);
    }

    if (filters.status && filters.status !== 'ALL') {
      parcels = parcels.filter((p) => p.status === filters.status);
    }

    if (filters.city && filters.city !== 'ALL') {
      parcels = parcels.filter(
        (p) => p.city.toLowerCase() === filters.city!.toLowerCase()
      );
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      parcels = parcels.filter(
        (p) =>
          p.trackingCode.toLowerCase().includes(q) ||
          p.customerName.toLowerCase().includes(q) ||
          p.customerPhone.includes(q) ||
          (p.productName && p.productName.toLowerCase().includes(q)) ||
          p.city.toLowerCase().includes(q)
      );
    }

    return parcels;
  },

  createParcel(input: CreateParcelInput): Parcel {
    const parcels = StorageService.getParcels();
    const cityKey = input.city.toLowerCase().replace(/\s+/g, '_');
    const shippingFee = MOROCCAN_CITIES_FEES[cityKey] || 35;
    const returnFee = 15;
    const netPayable = Math.max(0, input.codAmount - shippingFee);

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = `${todayStr} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `LIV-${now.getFullYear()}-${randomSuffix}`;

    const initialHistory: TrackingEvent[] = [
      {
        id: `ev_${Date.now()}`,
        status: 'CREE',
        statusLabelAr: 'تم تسجيل الطلبية في النظام بنجاح وجاهزة للجمع',
        statusLabelFr: 'Colis créé et prêt pour le ramassage',
        statusLabelEn: 'Shipment created and ready for pickup',
        location: input.city,
        timestamp: timeStr,
        note: 'طلب شحن جديد عبر فضاء التاجر',
        actorName: input.merchantName || 'التاجر',
        actorRole: 'merchant',
      },
    ];

    const newParcel: Parcel = {
      id: `pcl_${Date.now()}`,
      trackingCode,
      merchantId: input.merchantId,
      merchantName: input.merchantName || 'متجر التاجر',
      merchantStoreName: input.merchantStoreName || 'متجر إلكتروني',
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerPhone2: input.customerPhone2,
      city: input.city,
      address: input.address,
      district: input.district,
      productName: input.productName || 'منتج تجارة إلكترونية',
      productQuantity: input.productQuantity || 1,
      codAmount: input.codAmount,
      openPackageAllowed: input.openPackageAllowed ?? true,
      serviceType: input.serviceType || 'STANDARD',
      notes: input.notes,
      status: 'CREE',
      deliveryAttempts: 0,
      history: initialHistory,
      shippingFee,
      returnFee,
      netPayableToMerchant: netPayable,
      isPaidToMerchant: false,
      createdAt: timeStr,
      updatedAt: timeStr,
      estimatedDeliveryDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
    };

    StorageService.setParcels([newParcel, ...parcels]);
    return newParcel;
  },

  updateParcelStatus(
    parcelId: string,
    newStatus: ShipmentStatus,
    options?: {
      location?: string;
      actorName?: string;
      actorRole?: 'merchant' | 'driver' | 'admin';
      note?: string;
      failureReason?: FailureReason;
      failureNotes?: string;
      cashCollected?: number;
      recipientName?: string;
      recipientCin?: string;
      signatureDataUrl?: string;
      assignedDriverId?: string;
      assignedDriverName?: string;
    }
  ): Parcel | null {
    const parcels = StorageService.getParcels();
    const index = parcels.findIndex((p) => p.id === parcelId || p.trackingCode === parcelId);
    if (index === -1) return null;

    const current = parcels[index];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = `${todayStr} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    let labelAr = `تم تحديث الحالة إلى ${newStatus}`;
    let labelFr = `Statut mis à jour : ${newStatus}`;
    let labelEn = `Status updated to ${newStatus}`;

    if (newStatus === 'EN_ATTENTE_RAMASSAGE') {
      labelAr = 'تم طلب الجمع من مستودع التاجر';
      labelFr = 'Demande de ramassage confirmée';
      labelEn = 'Pickup requested from merchant warehouse';
    } else if (newStatus === 'RAMASSE') {
      labelAr = 'تم استلام الطرد من التاجر بنجاح وتوجهه لمركز الفرز';
      labelFr = 'Colis ramassé chez l\'expéditeur';
      labelEn = 'Parcel collected from merchant';
    } else if (newStatus === 'AU_CENTRE_TRI') {
      labelAr = 'الوصول لمركز الفرز والتوزيع الإقليمي';
      labelFr = 'Arrivé au hub de tri et distribution';
      labelEn = 'Arrived at sorting & distribution hub';
    } else if (newStatus === 'EN_COURS_LIVRAISON') {
      labelAr = 'الطرد في جولة التوزيع مع المندوب للتسليم';
      labelFr = 'En cours de livraison avec le livreur';
      labelEn = 'Out for delivery with driver';
    } else if (newStatus === 'LIVRE') {
      labelAr = `تم التسليم للزبون بنجاح وقبض ${options?.cashCollected ?? current.codAmount} درهم`;
      labelFr = `Colis livré avec succès - ${options?.cashCollected ?? current.codAmount} MAD encaissés`;
      labelEn = `Delivered successfully - ${options?.cashCollected ?? current.codAmount} MAD collected`;
    } else if (newStatus === 'NON_LIVRE') {
      labelAr = `تعذر التسليم: ${options?.failureReason || 'الزبون غير متاح'}`;
      labelFr = `Échec de livraison : ${options?.failureReason || 'Non joignable'}`;
      labelEn = `Delivery attempt failed: ${options?.failureReason || 'Unreachable'}`;
    } else if (newStatus === 'RETOURNE') {
      labelAr = 'تمت إعادة الطرد لمستودع التاجر';
      labelFr = 'Colis retourné au marchand';
      labelEn = 'Parcel returned to merchant';
    }

    const newHistoryEvent: TrackingEvent = {
      id: `ev_${Date.now()}`,
      status: newStatus,
      statusLabelAr: labelAr,
      statusLabelFr: labelFr,
      statusLabelEn: labelEn,
      location: options?.location || current.city,
      timestamp: timeStr,
      note: options?.note || options?.failureNotes,
      actorName: options?.actorName || 'فريق العمليات',
      actorRole: options?.actorRole || 'admin',
    };

    let proofOfDelivery: ProofOfDelivery | undefined = current.proofOfDelivery;
    if (newStatus === 'LIVRE') {
      proofOfDelivery = {
        deliveryDate: timeStr,
        recipientName: options?.recipientName || current.customerName,
        recipientCin: options?.recipientCin,
        signatureDataUrl: options?.signatureDataUrl,
        cashCollected: options?.cashCollected ?? current.codAmount,
        driverName: options?.actorName,
      };
    }

    const updatedParcel: Parcel = {
      ...current,
      status: newStatus,
      updatedAt: timeStr,
      failureReason: newStatus === 'NON_LIVRE' ? options?.failureReason : current.failureReason,
      failureNotes: newStatus === 'NON_LIVRE' ? options?.failureNotes : current.failureNotes,
      deliveryAttempts:
        newStatus === 'NON_LIVRE' ? (current.deliveryAttempts || 0) + 1 : current.deliveryAttempts,
      assignedDriverId: options?.assignedDriverId || current.assignedDriverId,
      assignedDriverName: options?.assignedDriverName || current.assignedDriverName,
      proofOfDelivery,
      history: [newHistoryEvent, ...(current.history || [])],
    };

    parcels[index] = updatedParcel;
    StorageService.setParcels(parcels);
    return updatedParcel;
  },

  assignDriver(parcelId: string, driverId: string, driverName: string, driverPhone?: string): Parcel | null {
    const parcels = StorageService.getParcels();
    const index = parcels.findIndex((p) => p.id === parcelId);
    if (index === -1) return null;

    const current = parcels[index];
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    const newHistoryEvent: TrackingEvent = {
      id: `ev_${Date.now()}`,
      status: 'EN_COURS_LIVRAISON',
      statusLabelAr: `تم إسناد الطرد للمندوب ${driverName} للبدء في التوزيع`,
      statusLabelFr: `Assigné au livreur ${driverName} pour distribution`,
      statusLabelEn: `Assigned to driver ${driverName} for delivery`,
      location: current.city,
      timestamp: timeStr,
      actorName: 'لوحة التحكم المركزية',
      actorRole: 'admin',
    };

    const updated: Parcel = {
      ...current,
      status: 'EN_COURS_LIVRAISON',
      assignedDriverId: driverId,
      assignedDriverName: driverName,
      assignedDriverPhone: driverPhone,
      updatedAt: timeStr,
      history: [newHistoryEvent, ...(current.history || [])],
    };

    parcels[index] = updated;
    StorageService.setParcels(parcels);
    return updated;
  },

  getStats(merchantId?: string): SystemStats {
    let parcels = StorageService.getParcels();
    if (merchantId) {
      parcels = parcels.filter((p) => p.merchantId === merchantId);
    }

    const totalShipments = parcels.length;
    const deliveredCount = parcels.filter((p) => p.status === 'LIVRE' || p.status === 'PAYE').length;
    const inTransitCount = parcels.filter((p) =>
      ['CREE', 'EN_ATTENTE_RAMASSAGE', 'RAMASSE', 'AU_CENTRE_TRI', 'EN_COURS_LIVRAISON'].includes(
        p.status
      )
    ).length;
    const failedCount = parcels.filter((p) => p.status === 'NON_LIVRE').length;
    const returnedCount = parcels.filter((p) => p.status === 'RETOURNE').length;

    const deliveredParcels = parcels.filter((p) => p.status === 'LIVRE' || p.status === 'PAYE');
    const totalCodCollected = deliveredParcels.reduce((sum, p) => sum + (p.codAmount || 0), 0);
    const paidParcels = parcels.filter((p) => p.status === 'PAYE' || p.isPaidToMerchant);
    const totalCodPaid = paidParcels.reduce((sum, p) => sum + (p.netPayableToMerchant || 0), 0);
    const totalCodPending = totalCodCollected - totalCodPaid;

    const completedCount = deliveredCount + failedCount + returnedCount;
    const deliverySuccessRate =
      completedCount > 0 ? Math.round((deliveredCount / completedCount) * 1000) / 10 : 96.5;

    return {
      totalShipments,
      deliveredCount,
      inTransitCount,
      failedCount,
      returnedCount,
      totalCodCollected,
      totalCodPaid,
      totalCodPending: Math.max(0, totalCodPending),
      deliverySuccessRate,
    };
  },
};
