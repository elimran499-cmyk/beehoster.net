import React from 'react';
import { ShieldCheck, Lock, ArrowUp, Heart, BadgeCheck, Instagram, Facebook } from 'lucide-react';
import { BeehosterLogo } from './BeehosterLogo';
import { WHATSAPP_DISPLAY, whatsAppLink, SOCIALS } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenOrderModal: (planId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-ink/10 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ink/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <BeehosterLogo className="w-10 h-10 shrink-0" />
              <span className="text-2xl font-black text-ink"><span className="text-[#C98A12]">BEE</span>HOSTER</span>
            </a>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              BEEHOSTER is een IPTV-aanbieder met 80.000+ live tv-zenders in 4K UHD, sportuitzendingen en video-on-demand, draaiend op Anti-Freeze™ 9.0-servers wereldwijd.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Gegarandeerd 99,9% uptime dankzij onze ULA-serverarchitectuur</span>
            </div>

            {/* Official-site notice: one site, one number, everything else is
                a reseller — worth stating plainly next to the real contact. */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-[#C98A12]/35 bg-[#C98A12]/[0.07]">
              <BadgeCheck className="w-5 h-5 shrink-0 text-[#C98A12] mt-px" />
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                <span className="font-bold text-ink">Officiële BEEHOSTER-website.</span> Dit is ons enige
                officiële kanaal — wij bestellen en ondersteunen uitsluitend via {WHATSAPP_DISPLAY}. Andere
                sites of nummers zijn niet van ons.
              </p>
            </div>

            {/* Orders and support both run through this one line */}
            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 text-ink hover:bg-[#25D366]/20 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Bestellen & support</span>
                <span className="text-sm font-bold tracking-wide">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>

            {/* Social profiles. Named with the handle rather than just an icon,
                because on a site whose whole trust story is "this is the
                official channel", a visitor needs to see which account to look
                for — an unlabelled glyph proves nothing. */}
            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.map(({ name, handle, url }) => {
                const Icon = name === 'Instagram' ? Instagram : Facebook;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`BEEHOSTER op ${name}: ${handle}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-[#C98A12]/30 bg-[#C98A12]/[0.07] text-ink hover:bg-[#C98A12]/15 hover:border-[#C98A12]/50 transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-[#C98A12]" />
                    <span className="text-xs font-semibold tracking-wide">{handle}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Snelle links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-[#B8790E] transition-colors">Start</a></li>
              <li><a href="#channels" className="hover:text-[#B8790E] transition-colors">Zenders & VOD</a></li>
              <li><a href="#features" className="hover:text-[#B8790E] transition-colors">Waarom BEEHOSTER</a></li>
              <li><a href="#pricing" className="hover:text-[#B8790E] transition-colors">Abonnementen</a></li>
              <li><a href="#blog" className="hover:text-[#B8790E] transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-[#B8790E] transition-colors">FAQ & support</a></li>
            </ul>
          </div>

          {/* Supported Devices */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Geschikte apparaten</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-zinc-400">Amazon Firestick 4K</span></li>
              <li><span className="text-zinc-400">Samsung & LG smart-tv</span></li>
              <li><span className="text-zinc-400">Android TV & box</span></li>
              <li><span className="text-zinc-400">Apple TV & iPhone</span></li>
              <li><span className="text-zinc-400">MAG-box & Formuler</span></li>
              <li><span className="text-zinc-400">Windows & macOS</span></li>
            </ul>
          </div>

          {/* How ordering actually works now that everything runs through chat */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Zo bestel je</h4>
            <ol className="space-y-3 text-xs">
              {[
                'Stuur ons een WhatsApp-bericht met het pakket dat je wilt',
                'Betaal zoals het jou uitkomt — iDEAL, PayPal, kaart, overboeking of crypto',
                'Je login staat binnen 5 minuten in de chat',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="mt-px w-5 h-5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-zinc-400 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:text-ink transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Start de chat →
            </a>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="py-6 border-b border-ink/10 text-[11px] text-zinc-500 leading-relaxed">
          <p className="font-semibold text-zinc-400 mb-1">DISCLAIMER & JURIDISCHE INFORMATIE:</p>
          <p>
            BEEHOSTER biedt abonnementen op software voor het beheren van streamingservers en het ordenen van playlists. BEEHOSTER host, bewaart of verzendt zelf geen auteursrechtelijk beschermde videobestanden op eigen servers. Alle geïndexeerde streams zijn afkomstig van publiek toegankelijke mediaservers. Controleer vóór je abonnement of dit is toegestaan volgens de regels voor digitale media in jouw land.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} BEEHOSTER IPTV. Alle rechten voorbehouden.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-ink/8 border border-ink/15 text-zinc-300 hover:text-ink hover:border-[#FF9A2E] transition-colors flex items-center gap-1.5"
            >
              <span>Terug naar boven</span>
              <ArrowUp className="w-4 h-4 text-[#FF5C3A]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
