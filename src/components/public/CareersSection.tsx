import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  X,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { Language, JobOpening } from '../../types';
import { translations } from '../../i18n/translations';

interface CareersSectionProps {
  lang: Language;
  jobs: JobOpening[];
}

export const CareersSection: React.FC<CareersSectionProps> = ({ lang, jobs }) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCity, setApplicantCity] = useState('');

  const t = translations[lang];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
      setApplicantCity('');
    }, 2500);
  };

  return (
    <section id="careers-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.careers.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.careers.subtitle}
          </h2>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {lang === 'ar' ? job.titleAr : lang === 'fr' ? job.titleFr : job.titleEn}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
                    {job.contractType}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {job.city}
                  </span>
                  <span>•</span>
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{t.careers.experience}: {job.experienceRequired}</span>
                </div>

                <p className="text-xs text-slate-600">
                  {lang === 'ar' ? job.descriptionAr : job.descriptionFr}
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer"
              >
                {t.careers.applyNow}
              </button>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-600">
                    {t.careers.modalTitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {lang === 'ar' ? selectedJob.titleAr : selectedJob.titleFr}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950">
                    {lang === 'ar' ? 'تم استلام ترشحكم!' : 'Candidature enregistrée !'}
                  </h4>
                  <p className="text-xs text-emerald-800">{t.careers.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{t.careers.fullName}</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Ahmed Benali"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">{t.careers.phone}</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="0612345678"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">{t.careers.city}</label>
                      <input
                        type="text"
                        required
                        value={applicantCity}
                        onChange={(e) => setApplicantCity(e.target.value)}
                        placeholder="Casablanca"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{t.careers.email}</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="ahmed@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{t.careers.cvUpload}</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-[11px] text-slate-600 block">
                        {lang === 'ar' ? 'انقر لرفع ملف الـ CV (PDF, Word)' : 'Cliquez pour charger votre CV (PDF, DOCX)'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all mt-2"
                  >
                    {t.careers.submitApplication}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
