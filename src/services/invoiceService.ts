import { StorageService } from './storage';
import { Invoice, Parcel } from '../types';

export const InvoiceService = {
  getInvoices(merchantId?: string): Invoice[] {
    const invoices = StorageService.getInvoices();
    if (!merchantId) return invoices;
    return invoices.filter((inv) => inv.merchantId === merchantId);
  },

  getInvoiceById(id: string): Invoice | null {
    const invoices = StorageService.getInvoices();
    return invoices.find((inv) => inv.id === id || inv.invoiceNumber === id) || null;
  },

  generateInvoiceForMerchant(merchantId: string, merchantName: string): Invoice | null {
    const parcels = StorageService.getParcels();
    const merchantParcels = parcels.filter(
      (p) => p.merchantId === merchantId && (p.status === 'LIVRE' || p.status === 'RETOURNE') && !p.isPaidToMerchant
    );

    if (merchantParcels.length === 0) return null;

    const delivered = merchantParcels.filter((p) => p.status === 'LIVRE');
    const returned = merchantParcels.filter((p) => p.status === 'RETOURNE');

    const totalCollectedCod = delivered.reduce((acc, p) => acc + (p.codAmount || 0), 0);
    const totalShippingFees = delivered.reduce((acc, p) => acc + (p.shippingFee || 35), 0);
    const totalReturnFees = returned.reduce((acc, p) => acc + (p.returnFee || 15), 0);
    const netPayable = Math.max(0, totalCollectedCod - totalShippingFees - totalReturnFees);

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const invoiceNum = `FACT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: invoiceNum,
      merchantId,
      merchantName,
      period: `Semaine ${Math.ceil(now.getDate() / 7)} - ${now.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}`,
      date: dateStr,
      totalParcels: merchantParcels.length,
      deliveredParcelsCount: delivered.length,
      returnedParcelsCount: returned.length,
      totalCollectedCod,
      totalShippingFees,
      totalReturnFees,
      netPayableToMerchant: netPayable,
      status: 'EN_ATTENTE_VALIDATION',
      paymentMethod: 'VIREMENT_BANCAIRE',
      parcelIds: merchantParcels.map((p) => p.id),
    };

    // Mark parcels as associated with this invoice
    const updatedParcels = parcels.map((p) => {
      if (merchantParcels.some((mp) => mp.id === p.id)) {
        return { ...p, invoiceId: newInvoice.id, isPaidToMerchant: false };
      }
      return p;
    });

    StorageService.setParcels(updatedParcels);
    const invoices = StorageService.getInvoices();
    StorageService.setInvoices([newInvoice, ...invoices]);

    return newInvoice;
  },

  settleInvoice(invoiceId: string, paymentReference: string, bankTransactionRef?: string): Invoice | null {
    const invoices = StorageService.getInvoices();
    const index = invoices.findIndex((inv) => inv.id === invoiceId);
    if (index === -1) return null;

    const current = invoices[index];
    const updated: Invoice = {
      ...current,
      status: 'PAYE',
      paymentReference,
      bankTransactionRef: bankTransactionRef || `VIR-MAROC-${Date.now().toString().slice(-6)}`,
    };

    invoices[index] = updated;
    StorageService.setInvoices(invoices);

    // Update associated parcels to PAYE
    const parcels = StorageService.getParcels();
    const updatedParcels = parcels.map((p) => {
      if (p.invoiceId === invoiceId || (current.parcelIds && current.parcelIds.includes(p.id))) {
        return {
          ...p,
          status: 'PAYE' as const,
          isPaidToMerchant: true,
        };
      }
      return p;
    });
    StorageService.setParcels(updatedParcels);

    return updated;
  },
};
