import React, { useState, useEffect } from 'react';
import { Language, UserRole } from './types';
import { StorageService } from './services/storage';
import { useAuth } from './hooks/useAuth';
import { useShipments } from './hooks/useShipments';
import { useInvoices } from './hooks/useInvoices';
import { useClaims } from './hooks/useClaims';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { LegalModal } from './components/public/LegalModal';

// Public Landing Page Components
import { HeroSection } from './components/public/HeroSection';
import { TrustIndicators } from './components/public/TrustIndicators';
import { ProblemSection } from './components/public/ProblemSection';
import { SolutionSection } from './components/public/SolutionSection';
import { HowItWorks } from './components/public/HowItWorks';
import { MerchantPreview } from './components/public/MerchantPreview';
import { ServicesSection } from './components/public/ServicesSection';
import { PricingCalculator } from './components/public/PricingCalculator';
import { SocialProof } from './components/public/SocialProof';
import { FAQSection } from './components/public/FAQSection';
import { FinalCTA } from './components/public/FinalCTA';
import { TrackingSection } from './components/public/TrackingSection';
import { AgencyLocator } from './components/public/AgencyLocator';
import { BlogSection } from './components/public/BlogSection';
import { CareersSection } from './components/public/CareersSection';
import { ContactSection } from './components/public/ContactSection';

// Authenticated Role Views
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { DriverPanel } from './components/driver/DriverPanel';
import { AdminPanel } from './components/admin/AdminPanel';

export function App() {
  // Localization State
  const [lang, setLang] = useState<Language>(() => StorageService.getSavedLanguage());

  // Authentication & RBAC Hook
  const { currentUser, currentRole, logout, switchRole } = useAuth();

  // Data Hooks
  const { parcels, createParcel, updateStatus } = useShipments();
  const { invoices } = useInvoices(currentUser?.role === 'merchant' ? currentUser.id : undefined);
  const { claims, createClaim } = useClaims(currentUser?.role === 'merchant' ? currentUser.id : undefined);

  // Navigation View (for public browsing)
  const [activeView, setActiveView] = useState<string>('home');

  // Modals & Tracking Search
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'returns' | null>(null);
  const [trackingSearchCode, setTrackingSearchCode] = useState<string>('');

  // Handle Document Direction, Language & Title
  useEffect(() => {
    StorageService.setSavedLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      document.title = 'livrih | شريكك اللوجستي لنمو تجارتك الإلكترونية في المغرب';
    } else if (lang === 'fr') {
      document.title = 'livrih | Plateforme Logistique & Livraison Express au Maroc';
    } else {
      document.title = 'livrih | Moroccan Express Logistics & COD Delivery';
    }
  }, [lang]);

  // Auth triggers
  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    if (role === 'merchant') setActiveView('merchant');
    else if (role === 'driver') setActiveView('driver');
    else if (role === 'admin') setActiveView('admin');
  };

  const handleTrackSubmit = (code: string) => {
    setTrackingSearchCode(code);
    setActiveView('tracking');
    const el = document.getElementById('tracking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const citiesTarifs = StorageService.getCitiesTarifs();
  const agencies = StorageService.getAgencies();
  const allUsers = StorageService.getUsers();

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white ${lang === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        currentRole={currentRole}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={handleOpenAuth}
        onTrackSubmit={handleTrackSubmit}
        onLogout={logout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* Authenticated Role: Merchant Dashboard */}
        {currentRole === 'merchant' && currentUser && activeView === 'merchant' && (
          <MerchantDashboard
            lang={lang}
            currentUser={currentUser}
            parcels={parcels.filter((p) => p.merchantId === currentUser.id || !p.merchantId || p.merchantId === 'usr_001')}
            invoices={invoices}
            returns={StorageService.getReturns()}
            claims={claims}
            onAddParcel={createParcel}
            onAddClaim={createClaim}
            onLogout={logout}
            onTrackCode={handleTrackSubmit}
          />
        )}

        {/* Authenticated Role: Driver App */}
        {currentRole === 'driver' && currentUser && activeView === 'driver' && (
          <DriverPanel
            lang={lang}
            currentUser={currentUser}
            parcels={parcels}
            onUpdateParcelStatus={updateStatus}
            onLogout={logout}
          />
        )}

        {/* Authenticated Role: Admin Operations Center */}
        {currentRole === 'admin' && currentUser && activeView === 'admin' && (
          <AdminPanel
            lang={lang}
            currentUser={currentUser}
            parcels={parcels}
            users={allUsers}
            onLogout={logout}
          />
        )}

        {/* Public Views */}
        {(currentRole === 'guest' || !['merchant', 'driver', 'admin'].includes(activeView)) && (
          <>
            {/* View: Home (Optimized High-Conversion Sequence) */}
            {activeView === 'home' && (
              <>
                <HeroSection
                  lang={lang}
                  onTrack={handleTrackSubmit}
                  onOpenAuth={handleOpenAuth}
                  setActiveView={setActiveView}
                />
                <TrustIndicators lang={lang} />
                <ProblemSection lang={lang} />
                <SolutionSection lang={lang} onOpenAuth={() => handleOpenAuth('register')} />
                <HowItWorks lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
                <MerchantPreview lang={lang} onOpenAuth={() => handleOpenAuth('register')} />
                <ServicesSection lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
                <PricingCalculator
                  lang={lang}
                  cities={citiesTarifs}
                  onOpenRegister={() => handleOpenAuth('register')}
                />
                <SocialProof lang={lang} />
                <FAQSection lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
                <FinalCTA
                  lang={lang}
                  onOpenAuth={() => handleOpenAuth('register')}
                  setActiveView={setActiveView}
                />
              </>
            )}

            {/* View: Tracking */}
            {activeView === 'tracking' && (
              <TrackingSection
                lang={lang}
                parcels={parcels}
                initialTrackingCode={trackingSearchCode}
              />
            )}

            {/* View: Pricing */}
            {activeView === 'pricing' && (
              <PricingCalculator
                lang={lang}
                cities={citiesTarifs}
                onOpenRegister={() => handleOpenAuth('register')}
              />
            )}

            {/* View: Services */}
            {activeView === 'services' && (
              <>
                <ServicesSection lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
                <HowItWorks lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
              </>
            )}

            {/* View: How it works */}
            {activeView === 'howItWorks' && (
              <>
                <HowItWorks lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
                <FAQSection lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
              </>
            )}

            {/* View: Agencies */}
            {activeView === 'agencies' && (
              <AgencyLocator
                lang={lang}
                agencies={agencies}
                onContactAgency={(agency) => {
                  setActiveView('contact');
                }}
              />
            )}

            {/* View: FAQ */}
            {activeView === 'faq' && (
              <FAQSection lang={lang} onOpenRegister={() => handleOpenAuth('register')} />
            )}

            {/* View: Blog */}
            {activeView === 'blog' && (
              <BlogSection lang={lang} />
            )}

            {/* View: Careers */}
            {activeView === 'careers' && (
              <CareersSection lang={lang} />
            )}

            {/* View: Contact */}
            {activeView === 'contact' && (
              <ContactSection lang={lang} />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        setActiveView={setActiveView}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Authentication Modal with Real RBAC + Demo exploration option */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
        initialTab={authInitialTab}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Legal & Privacy Policy Modal */}
      {legalModalType && (
        <LegalModal
          type={legalModalType}
          lang={lang}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </div>
  );
}
