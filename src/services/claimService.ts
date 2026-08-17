import { StorageService } from './storage';
import { ClaimTicket } from '../types';

export interface CreateClaimInput {
  merchantId: string;
  merchantName: string;
  trackingCode: string;
  category: ClaimTicket['category'];
  subject: string;
  description: string;
  priority?: ClaimTicket['priority'];
}

export const ClaimService = {
  getClaims(merchantId?: string): ClaimTicket[] {
    const claims = StorageService.getClaims();
    if (!merchantId) return claims;
    return claims.filter((c) => c.merchantId === merchantId);
  },

  createClaim(input: CreateClaimInput): ClaimTicket {
    const claims = StorageService.getClaims();
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    const ticketNumber = `REC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newClaim: ClaimTicket = {
      id: `clm_${Date.now()}`,
      ticketNumber,
      merchantId: input.merchantId,
      merchantName: input.merchantName,
      trackingCode: input.trackingCode,
      category: input.category,
      subject: input.subject,
      description: input.description,
      priority: input.priority || 'MOYENNE',
      status: 'OUVERT',
      createdAt: dateStr,
      updatedAt: dateStr,
      replies: [
        {
          id: `rep_${Date.now()}`,
          senderName: input.merchantName,
          isSupport: false,
          message: input.description,
          timestamp: dateStr,
        },
      ],
    };

    StorageService.setClaims([newClaim, ...claims]);
    return newClaim;
  },

  replyToClaim(claimId: string, message: string, senderName: string, isSupport: boolean): ClaimTicket | null {
    const claims = StorageService.getClaims();
    const index = claims.findIndex((c) => c.id === claimId);
    if (index === -1) return null;

    const current = claims[index];
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    const newReply = {
      id: `rep_${Date.now()}`,
      senderName,
      isSupport,
      message,
      timestamp: dateStr,
    };

    const updated: ClaimTicket = {
      ...current,
      updatedAt: dateStr,
      status: isSupport ? 'EN_COURS' : current.status,
      replies: [...(current.replies || []), newReply],
    };

    claims[index] = updated;
    StorageService.setClaims(claims);
    return updated;
  },

  resolveClaim(claimId: string, resolutionNotes: string): ClaimTicket | null {
    const claims = StorageService.getClaims();
    const index = claims.findIndex((c) => c.id === claimId);
    if (index === -1) return null;

    const current = claims[index];
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    const updated: ClaimTicket = {
      ...current,
      status: 'RESOLU',
      resolutionNotes,
      updatedAt: dateStr,
    };

    claims[index] = updated;
    StorageService.setClaims(claims);
    return updated;
  },
};
