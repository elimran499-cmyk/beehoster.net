import React, { useState } from 'react';
import { AmbientLights } from './components/AmbientLights';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { MobileShowcase } from './components/MobileShowcase';
import { DeviceBanner } from './components/DeviceBanner';
import { ChannelExplorer } from './components/ChannelExplorer';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { FaqSection } from './components/FaqSection';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { WHATSAPP_DISPLAY, whatsAppLink } from './data/contact';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlanId, setModalPlanId] = useState<string>('plan-12m');

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) {
      setModalPlanId(planId);
    }
    setIsModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-page text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Shared neon light field behind every section */}
      <AmbientLights />
      
      {/* Floating rail navigation */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* From sm up the page clears the rail's collapsed width so the nav never
          covers copy — the rail expands over the page, not into it. Phones get
          their full width back; the dock sits at the bottom instead. */}
      <main className="relative z-10 flex-grow sm:pr-[5.5rem] lg:pr-24">
        
        {/* Hero Section. Two separate builds: phones get the stacked full-bleed
            panels, sm and up gets the editorial split. The wrapper owns the
            #hero id so navigation and the scroll spy work either way. */}
        <div id="hero">
          <MobileShowcase />
          <Hero onOpenOrderModal={handleOpenOrderModal} />
        </div>

        {/* Who we are, before what we sell — the bee metaphor mapped onto the
            things it actually stands for. */}
        <Intro />

        {/* Channel & VOD Explorer — the catalogue answers the first question a
            visitor has, so it leads straight out of the hero */}
        <ChannelExplorer onOpenOrderModal={handleOpenOrderModal} />

        {/* Subscription Pricing Plans */}
        <Pricing />

        {/* Compatible Devices Banner */}
        <DeviceBanner onOpenOrderModal={handleOpenOrderModal} />

        {/* 3x2 Bento Key Features Grid */}
        <Features />

        {/* Verified Testimonials */}
        <Testimonials />

        {/* Blog — internal links into the static article pages */}
        <Blog />

        {/* FAQ Accordion Section */}
        <FaqSection onOpenOrderModal={handleOpenOrderModal} />

      </main>

      {/* Footer — extra bottom room on phones so the dock never sits on the
          legal text */}
      <div className="pb-24 sm:pb-0 sm:pr-[5.5rem] lg:pr-24">
        <Footer onOpenOrderModal={handleOpenOrderModal} />
      </div>

      {/* Floating WhatsApp Contact — hidden on phones, where the bottom dock
          already carries a WhatsApp button */}
      <div className="hidden sm:block fixed bottom-6 left-6 z-40">
        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Neem contact op via WhatsApp: ${WHATSAPP_DISPLAY}`}
          className="p-3.5 rounded-full bg-[#25D366] text-[#FFFFFF] shadow-xl shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-ink/25"
          title={`WhatsApp-support 24/7 — ${WHATSAPP_DISPLAY}`}
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        initialPlanId={modalPlanId}
        onClose={handleCloseOrderModal}
      />

    </div>
  );
}
