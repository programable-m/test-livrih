import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  X,
} from 'lucide-react';
import { Language, ClaimTicket } from '../../types';

interface MerchantClaimsViewProps {
  lang: Language;
  claims: ClaimTicket[];
  onAddClaim: (claim: ClaimTicket) => void;
}

export const MerchantClaimsView: React.FC<MerchantClaimsViewProps> = ({
  lang,
  claims,
  onAddClaim,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [relatedTracking, setRelatedTracking] = useState('');
  const [category, setCategory] = useState<'RETARD_LIVRAISON' | 'COLIS_ENDOMMAGE' | 'REGLEMENT_COD' | 'AUTRE'>('RETARD_LIVRAISON');
  const [description, setDescription] = useState('');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim: ClaimTicket = {
      id: `clm-${Date.now()}`,
      ticketNumber: `REC-${Date.now().toString().slice(-5)}`,
      merchantId: 'u-merchant-1',
      merchantName: 'Atlas Fashion Store',
      trackingCode: relatedTracking || 'LIV-2025-98421',
      category,
      subject: ticketSubject,
      description,
      priority: 'MOYENNE',
      status: 'OUVERT',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      replies: [],
    };
    onAddClaim(newClaim);
    setIsModalOpen(false);
    setTicketSubject('');
    setRelatedTracking('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'مركز الدعم والشكايات (Service Réclamations)' : 'Assistance & Réclamations'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'فريق الدعم المخصص في خدمتكم 24/7 لمتابعة الشحنات والتحويلات' : 'Tickets de support technique, suivi des litiges et hotline prioritaire'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/212779063241?text=Bonjour,%20j'ai%20une%20demande%20d'assistance%20urgente%20sur%20mon%20compte%20marchand"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp (0779063241)</span>
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'فتح تذكرة جديدة' : 'Nouveau Ticket'}</span>
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 font-bold">{claim.id}</span>
                  <h3 className="text-sm font-bold text-slate-900">{claim.subject}</h3>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{lang === 'ar' ? 'رقم الشحنة:' : 'Colis :'} <strong className="font-mono text-slate-700">{claim.trackingCode}</strong></span>
                  <span>•</span>
                  <span>{claim.createdAt}</span>
                </div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  claim.status === 'RESOLU'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : claim.status === 'EN_COURS'
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {claim.status === 'RESOLU'
                  ? (lang === 'ar' ? 'تم الحل' : 'Résolu')
                  : claim.status === 'EN_COURS'
                  ? (lang === 'ar' ? 'قيد المعالجة من المشرف' : 'En cours')
                  : (lang === 'ar' ? 'مفتوح جديد' : 'Ouvert')}
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {claim.description}
            </p>

            {claim.resolutionNotes && (
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">{lang === 'ar' ? 'رد فريق خدمة عملاء livrih:' : 'Réponse du Support Client :'}</span>
                  <span>{claim.resolutionNotes}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'ar' ? 'فتح تذكرة دعم أو شكاية' : 'Créer un ticket d\'assistance'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'موضوع الشكاية' : 'Sujet'} *
                </label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder={lang === 'ar' ? 'استفسار عن موعد تسليم الشحنة' : 'Retard livraison client Casablanca'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'نوع الطلب' : 'Catégorie'}
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="RETARD_LIVRAISON">{lang === 'ar' ? 'تأخر في التسليم' : 'Retard de livraison'}</option>
                    <option value="REGLEMENT_COD">{lang === 'ar' ? 'استفسار عن تحويل COD' : 'Virement COD'}</option>
                    <option value="COLIS_ENDOMMAGE">{lang === 'ar' ? 'طرد متضرر' : 'Colis endommagé'}</option>
                    <option value="AUTRE">{lang === 'ar' ? 'طلب آخر' : 'Autre demande'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رقم التتبع المعني' : 'Code Suivi lié'}
                  </label>
                  <input
                    type="text"
                    value={relatedTracking}
                    onChange={(e) => setRelatedTracking(e.target.value)}
                    placeholder="LIV-98421-CAS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'التفاصيل والشرح' : 'Description du problème'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={lang === 'ar' ? 'يرجى كتابة تفاصيل الحالة مع رقم هاتف الزبون للتواصل السريع...' : 'Détails du problème...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال التذكرة' : 'Envoyer le ticket'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
