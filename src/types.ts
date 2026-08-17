export type Language = 'ar' | 'fr' | 'en';

export type UserRole = 'merchant' | 'driver' | 'admin' | 'guest';

export type ShipmentStatus =
  | 'CREE'                  // Created
  | 'EN_ATTENTE_RAMASSAGE'  // Pickup Requested
  | 'RAMASSE'               // Picked Up
  | 'AU_CENTRE_TRI'         // Hub Sorting
  | 'EN_COURS_LIVRAISON'    // Out for Delivery
  | 'LIVRE'                 // Delivered & COD Collected
  | 'NON_LIVRE'             // Failed Delivery Attempt
  | 'RETOURNE'              // Returned to Merchant
  | 'ECHANGE_EFFECTUE'      // Exchanged
  | 'PAYE';                 // COD Settled / Invoiced

export type FailureReason =
  | 'CLIENT_INJOIGNABLE'
  | 'NUMERO_ERRONE'
  | 'ADRESSE_INCOMPLETE'
  | 'CLIENT_ABSENT'
  | 'REFUS_CLIENT'
  | 'REPORTE_PAR_CLIENT'
  | 'COLIS_NON_CONFORME'
  | 'HORS_ZONE'
  | 'CLIENT_REFUSE_PAYER';

export interface CityTarif {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  zone: string;
  deliveryPrice: number; // in MAD
  returnPrice: number;   // in MAD
  slaHours: string;      // e.g. "24h", "24h-48h", "48h-72h"
  isActive: boolean;
  hubLocation: string;
}

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  statusLabelAr: string;
  statusLabelFr: string;
  statusLabelEn: string;
  location: string;
  timestamp: string;
  note?: string;
  actorName?: string;
  actorRole?: UserRole;
}

export interface ProofOfDelivery {
  recipientName: string;
  recipientCin?: string;
  deliveryDate: string;
  signatureDataUrl?: string;
  cashCollected: number;
  driverName?: string;
}

export interface Parcel {
  id: string;
  trackingCode: string; // e.g. LIV-2025-98421
  merchantId: string;
  merchantName?: string;
  merchantStoreName?: string;
  merchantPhone?: string;
  
  // Recipient info
  customerName: string;
  customerPhone: string;
  customerPhone2?: string;
  customerEmail?: string;
  city: string;
  address: string;
  district?: string;
  
  // Order details
  productName?: string;
  productDescription?: string;
  productQuantity?: number;
  piecesCount?: number;
  weightKg?: number;
  codAmount: number; // in MAD
  serviceType?: 'STANDARD' | 'EXPRESS' | 'ECHANGE' | 'FRAGILE' | 'LIVRAISON_SIMPLE';
  notes?: string;
  openPackageAllowed: boolean;
  
  // Status & Lifecycle
  status: ShipmentStatus;
  failureReason?: FailureReason;
  failureNotes?: string;
  deliveryAttempts?: number;
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedDriverPhone?: string;
  history: TrackingEvent[];
  
  // Financials
  shippingFee: number;
  returnFee: number;
  netPayableToMerchant: number;
  invoiceId?: string;
  isPaidToMerchant: boolean;
  
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryDate?: string;
  proofOfDelivery?: ProofOfDelivery;
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  fullName?: string;
  storeName?: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  ice?: string;
  rc?: string;
  rib?: string;
  bankName?: string;
  monthlyParcelsTarget?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. FACT-2025-0091
  merchantId: string;
  merchantName: string;
  merchantStoreName?: string;
  merchantRib?: string;
  merchantBank?: string;
  bankAccountRef?: string;
  period: string;
  date: string;
  totalParcels: number;
  deliveredParcelsCount: number;
  returnedParcelsCount: number;
  totalCollectedCod: number;
  totalShippingFees: number;
  totalReturnFees: number;
  netPayableToMerchant: number;
  status: 'PAYE' | 'EN_COURS_VIREMENT' | 'EN_ATTENTE_VALIDATION';
  paymentReference?: string;
  bankTransactionRef?: string;
  paymentMethod: 'VIREMENT_BANCAIRE' | 'CASH_EXPRESS' | 'CHEQUE';
  parcelIds: string[];
}

export interface ReturnItem {
  id: string;
  returnNumber: string;
  parcelId: string;
  trackingCode: string;
  customerName: string;
  city: string;
  codAmount: number;
  returnReason: FailureReason;
  returnStatus: 'EN_ATTENTE_RETOUR' | 'AU_HUB' | 'RETOURNE_AU_CLIENT' | 'RECEPTIONNE';
  dateCreated: string;
  dateCompleted?: string;
  returnFee: number;
}

export interface ClaimTicket {
  id: string;
  ticketNumber: string;
  merchantId: string;
  merchantName: string;
  trackingCode: string;
  category: 'RETARD_LIVRAISON' | 'COLIS_ENDOMMAGE' | 'REGLEMENT_COD' | 'PROBLEME_VIREMENT' | 'CHANGEMENT_ADRESSE' | 'AUTRE';
  subject: string;
  description: string;
  priority: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'URGENTE';
  status: 'OUVERT' | 'EN_COURS' | 'RESOLU' | 'FERMEE';
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
  replies: {
    id: string;
    senderName: string;
    isSupport: boolean;
    message: string;
    timestamp: string;
  }[];
}

export interface Agency {
  id: string;
  nameAr: string;
  nameFr: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  isMainHub: boolean;
  latitude: number;
  longitude: number;
  managerName: string;
}

export interface JobOpening {
  id: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  city: string;
  department: string;
  contractType: 'CDI' | 'CDD' | 'Freelance / Auto-entrepreneur' | 'Stage';
  experienceRequired: string;
  descriptionAr: string;
  descriptionFr: string;
  requirements: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  excerptAr: string;
  excerptFr: string;
  excerptEn: string;
  contentAr: string;
  contentFr: string;
  contentEn: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  coverImage: string;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'pricing' | 'cod' | 'tracking' | 'returns';
  questionAr: string;
  questionFr: string;
  questionEn: string;
  answerAr: string;
  answerFr: string;
  answerEn: string;
}

export interface SystemStats {
  totalShipments: number;
  deliveredCount: number;
  inTransitCount: number;
  failedCount: number;
  returnedCount: number;
  totalCodCollected: number;
  totalCodPaid: number;
  totalCodPending: number;
  deliverySuccessRate: number;
}
