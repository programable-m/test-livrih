import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { Language } from '../../types';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'returns' | null;
  onClose: () => void;
  lang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, lang }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      titleAr: 'سياسة الخصوصية وحماية المعطيات الشخصية',
      titleFr: 'Politique de Confidentialité & Protection des Données',
      titleEn: 'Privacy Policy & Data Protection',
      icon: ShieldCheck,
      bodyAr: `تلتزم شركة livrih بحماية خصوصية مستخدميها وتطبيق مقتضيات القانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي بالمغرب.
      
      1. **جمع المعطيات:** نجمع فقط المعلومات الضرورية لإتمام عمليات التوصيل والتحصيل المالي (الاسم، الهاتف، العنوان، والبيانات البنكية لتحويل مبالغ COD).
      2. **أمن البيانات:** جميع الاتصالات محمية ببروتوكول التشفير SSL/HTTPS، ولا يتم بيع أو مشاركة بيانات الزبائن مع أي طرف ثالث لأغراض إشهارية.
      3. **حقوق المستخدم:** يحق للتاجر أو الزبون طلب تعديل أو حذف بياناته بالتواصل مع الإدارة عبر contact@livrih.com.`,
      bodyFr: `livrih s'engage à protéger vos données personnelles conformément à la loi marocaine n° 09-08. Nous collectons uniquement les informations nécessaires au traitement logistique et financier. Vos données ne sont jamais cédées à des tiers.`,
      bodyEn: `livrih respects your privacy in compliance with Moroccan law 09-08. We strictly collect operational data needed for delivery fulfillment and COD settlements.`,
    },
    terms: {
      titleAr: 'الشروط والأحكام العامة للخدمة (CGU)',
      titleFr: 'Conditions Générales d\'Utilisation (CGU)',
      titleEn: 'Terms and Conditions',
      icon: FileText,
      bodyAr: `1. **التسجيل واستخدام المنصة:** استخدام منصة livrih متاح لجميع التجار القانونيين وأصحاب المتاجر الإلكترونية في المغرب.
      2. **التسعير والرسوم:** تطبق الأسعار المعلنة في جدول الأسعار الرسمي دون أي رسوم اشتراك شهري خفية.
      3. **تسوية مبالغ الدفع عند الاستلام (COD):** يتم تحويل المبالغ المحصلة إلى الحساب البنكي (RIB) للتاجر خلال 24 إلى 48 ساعة بعد تسليم الشحنة.
      4. **المسؤولية والتأمين:** تضمن المنصة سلامة الطرود من وقت الاستلام (Ramassage) حتى التسليم أو الإرجاع.`,
      bodyFr: `Conditions régissant l'utilisation des services de transport, stockage et encaissement COD de livrih au Maroc. Versements sous 24-48h ouvrées.`,
      bodyEn: `General terms governing shipping, warehousing, and Cash on Delivery settlements by livrih in Morocco.`,
    },
    returns: {
      titleAr: 'سياسة تدبير المرتجعات (Politique de Retours)',
      titleFr: 'Politique de Gestion des Retours',
      titleEn: 'Returns Policy',
      icon: RotateCcw,
      bodyAr: `1. **محاولات التسليم:** يلتزم الموزع بإجراء محاولتين للاتصال بالزبون قبل تسجيل حالة تعذر التسليم.
      2. **أسباب الإرجاع:** يتم تسجيل سبب الإلغاء أو الرفض بدقة على المنصة لإتاحة المتابعة للتاجر.
      3. **إعادة الطرد للتاجر:** يتم تسليم الطرود المرتجعة للتاجر أسبوعياً أو عند طلبها عبر فضاء التاجر مرفقة ببيان إرجاع رسمي (Bon de Retour).
      4. **رسوم المرتجع:** تطبق الرسوم الرمزية المحددة في جدول الأسعار على الطرود المرتجعة فقط.`,
      bodyFr: `Procédure de traitement des échecs de livraison et rapatriement des colis non livrés aux marchands avec Bon de Retour officiel.`,
      bodyEn: `Standard operating procedures for undelivered parcels, retry attempts, and weekly return manifest dispatches.`,
    },
  };

  const item = contentMap[type];
  const Icon = item.icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'ar' ? item.titleAr : lang === 'fr' ? item.titleFr : item.titleEn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
          {lang === 'ar' ? item.bodyAr : lang === 'fr' ? item.bodyFr : item.bodyEn}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            {lang === 'ar' ? 'فهمت وأوافق' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  );
};
