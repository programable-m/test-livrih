import { useState, useEffect, useCallback } from 'react';
import { ClaimTicket } from '../types';
import { ClaimService, CreateClaimInput } from '../services/claimService';

export function useClaims(merchantId?: string) {
  const [claims, setClaims] = useState<ClaimTicket[]>(() => ClaimService.getClaims(merchantId));

  const refresh = useCallback(() => {
    setClaims(ClaimService.getClaims(merchantId));
  }, [merchantId]);

  useEffect(() => {
    refresh();
    const handleStorageChange = () => refresh();
    window.addEventListener('livrih_storage_change', handleStorageChange);
    return () => window.removeEventListener('livrih_storage_change', handleStorageChange);
  }, [refresh]);

  const createClaim = useCallback(
    (input: CreateClaimInput) => {
      const created = ClaimService.createClaim(input);
      refresh();
      return created;
    },
    [refresh]
  );

  const replyToClaim = useCallback(
    (claimId: string, message: string, senderName: string, isSupport: boolean) => {
      const updated = ClaimService.replyToClaim(claimId, message, senderName, isSupport);
      refresh();
      return updated;
    },
    [refresh]
  );

  const resolveClaim = useCallback(
    (claimId: string, resolutionNotes: string) => {
      const resolved = ClaimService.resolveClaim(claimId, resolutionNotes);
      refresh();
      return resolved;
    },
    [refresh]
  );

  return {
    claims,
    refresh,
    createClaim,
    replyToClaim,
    resolveClaim,
  };
}
