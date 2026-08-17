import { useState, useEffect, useCallback } from 'react';
import { Invoice } from '../types';
import { InvoiceService } from '../services/invoiceService';

export function useInvoices(merchantId?: string) {
  const [invoices, setInvoices] = useState<Invoice[]>(() => InvoiceService.getInvoices(merchantId));

  const refresh = useCallback(() => {
    setInvoices(InvoiceService.getInvoices(merchantId));
  }, [merchantId]);

  useEffect(() => {
    refresh();
    const handleStorageChange = () => refresh();
    window.addEventListener('livrih_storage_change', handleStorageChange);
    return () => window.removeEventListener('livrih_storage_change', handleStorageChange);
  }, [refresh]);

  const generateInvoice = useCallback(
    (targetMerchantId: string, merchantName: string) => {
      const created = InvoiceService.generateInvoiceForMerchant(targetMerchantId, merchantName);
      refresh();
      return created;
    },
    [refresh]
  );

  const settleInvoice = useCallback(
    (invoiceId: string, paymentReference: string, bankTransactionRef?: string) => {
      const settled = InvoiceService.settleInvoice(invoiceId, paymentReference, bankTransactionRef);
      refresh();
      return settled;
    },
    [refresh]
  );

  return {
    invoices,
    refresh,
    generateInvoice,
    settleInvoice,
  };
}
