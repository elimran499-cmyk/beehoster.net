import React, { useState, useEffect } from 'react';
import { Home, Tag, Sparkles, HelpCircle, ChevronLeft, ChevronRight, MonitorSmartphone, Tv, BookOpen, AtSign, Instagram, Facebook } from 'lucide-react';
import { BeehosterLogo, BeeGlyph } from './BeehosterLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WHATSAPP_DISPLAY, whatsAppLink, SOCIALS } from '../data/contact';

interface NavbarProps {
  onOpenOrderModal: (planId?: string) => void;
}

const navLinks = [
  { name: 'Start', href: '#hero', id: 'hero', icon: Home },
  { name: 'Zenders', href: '#channels', id: 'channels', icon: Tv },
  { name: 'Prijzen', href: '#pricing', id: 'pricing', icon: Tag },
  { name: 'Apparaten', href: '#devices', id: 'devices', icon: MonitorSmartphone },
  { name: 'Voordelen', href: '#features', id: 'features', icon: Sparkles },
  { name: 'Blog', href: '#blog', id: 'blog', icon: BookOpen },
  { name: 'FAQ', href: '#faq', id: 'faq', icon: HelpCircle },
];

/* The three bubbles the Contact slot fans out, ordered bottom-up: WhatsApp
   sits nearest the thumb because it's the one that actually takes an order.
   Each keeps its own platform colour rather than the site's honey — these are
   badges people recognise by colour before they read them. */
const DOCK_CHANNELS = [
  {
    name: 'Facebook',
    handle: SOCIALS[1].handle,
    href: SOCIALS[1].url,
    icon: Facebook,
    fill: '#1877F2',
    glow: 'rgba(24,119,242,0.55)',
  },
  {
    name: 'Instagram',
    handle: SOCIALS[0].handle,
    href: SOCIALS[0].url,
    icon: Instagram,
    fill: 'linear-gradient(45deg, #F09433 0%, #DC2743 50%, #BC1888 100%)',
    glow: 'rgba(220,39,67,0.5)',
  },
  {
    name: 'WhatsApp',
    handle: WHATSAPP_DISPLAY,
    href: whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.'),
    icon: WhatsAppIcon,
    fill: '#25D366',
    glow: 'rgba(37,211,102,0.5)',
  },
];

/* The phone dock carries three of the seven, two either side of the raised
   order button, with Contact taking the fourth slot. Start lost its place to
   it: the wordmark in the top bar already scrolls you home, so it was the
   cheapest thing here to give up. Everything else is a scroll away. */
const dockLinks = [navLinks[1], navLinks[2], navLinks[6]];

/* Floating vertical rail. Collapsed it's a column of icons; expanded it grows
   labels out to the right. The active section rides a white pill, so the rail
   doubles as a position indicator while you scroll. */
export const Navbar: React.FC<NavbarProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  /* The top bar swaps menu → wordmark on scroll. Desktop lets go of the menu
     the moment you move, since the rail carries navigation from there; phones
     hold on until the hero is genuinely behind you, because the dock sits at
     the other end of the screen. */
  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.matchMedia('(min-width: 640px)').matches;
      const hero = document.getElementById('hero');
      const threshold = isDesktop ? 24 : hero ? hero.offsetHeight * 0.55 : 200;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!contactOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-dock]')) setContactOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contactOpen]);

  /* Scroll spy — whichever section owns the most of the viewport wins. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    {/* ── TOP BAR: the menu while you're still in the hero, swapping to the
           wordmark once you scroll past it. Same behaviour on phone and
           desktop — only the sizing differs. ──────────────────────────── */}
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none sm:pr-[5.5rem] lg:pr-24">
      {/* Both states stay mounted and cross-fade, so the swap is one continuous
          movement rather than a hard cut. */}
      <div className="relative flex justify-center px-3 pt-3 sm:pt-4">
        {/* Hero state — brand parked top-left on desktop */}
        <a
          href="#hero"
          aria-hidden={scrolled}
          className={`flex absolute left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 lg:left-8 top-3 sm:top-4 items-center gap-2.5 px-4 py-2 rounded-full brand-plate transition-all duration-500 ease-out ${
            scrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
        >
          {/* Bees circling the wordmark */}
          <BeeGlyph
            aria-hidden="true"
            className="absolute -top-2.5 -right-1.5 w-4 h-4 text-[#C98A12] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '1.8s' }}
            className="absolute -bottom-2 right-9 w-3 h-3 text-[#B8790E]/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '3.4s' }}
            className="absolute -top-3 left-10 w-2.5 h-2.5 text-[#C98A12]/70 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '2.6s' }}
            className="absolute -bottom-2.5 left-6 w-3 h-3 text-[#C98A12]/60 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '4.6s' }}
            className="absolute -top-2 right-16 w-2.5 h-2.5 text-[#B8790E]/55 animate-bee-fly pointer-events-none"
          />
          <BeehosterLogo className="w-10 h-10 shrink-0" />
          <span className="text-base font-black tracking-wide text-ink leading-none">
            <span className="text-[#C98A12]">BEE</span>HOSTER
          </span>
        </a>

        {/* Hero state — menu. Centred in the flow on phones, parked top-right
            on desktop opposite the brand. */}
        <nav
          aria-label="Sectiemenu"
          aria-hidden={scrolled}
          className={`hidden sm:flex max-w-full items-center gap-1 p-1 rounded-full clay-nav overflow-x-auto no-scrollbar transition-all duration-500 ease-out sm:absolute sm:right-4 lg:right-8 sm:top-4 ${
            scrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold text-zinc-200 whitespace-nowrap hover:text-[#B8790E] hover:bg-ink/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Scrolled state — the wordmark, centred */}
        <a
          href="#hero"
          aria-hidden={!scrolled}
          className={`absolute left-1/2 -translate-x-1/2 top-3 sm:top-4 flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full brand-plate transition-all duration-500 ease-out ${
            scrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          {/* Bees circling the wordmark */}
          <BeeGlyph
            aria-hidden="true"
            className="absolute -top-2.5 -right-1.5 w-4 h-4 text-[#C98A12] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '1.8s' }}
            className="absolute -bottom-2 right-9 w-3 h-3 text-[#B8790E]/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '3.4s' }}
            className="absolute -top-3 left-10 w-2.5 h-2.5 text-[#C98A12]/70 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '2.6s' }}
            className="absolute -bottom-2.5 left-6 w-3 h-3 text-[#C98A12]/60 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '4.6s' }}
            className="absolute -top-2 right-16 w-2.5 h-2.5 text-[#B8790E]/55 animate-bee-fly pointer-events-none"
          />
          <BeehosterLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
          <span className="text-sm sm:text-base font-black tracking-wide text-ink leading-none">
            <span className="text-[#C98A12]">BEE</span>HOSTER
          </span>
        </a>
      </div>
    </header>

    {/* ── PHONES: horizontal dock. A left rail ate ~14% of a phone's width for
           navigation nobody uses while reading, so the same glass language moves
           to the bottom, where the thumb already is. Four labelled destinations
           around a raised order button — every item keeps its label, so the dock
           reads at a glance instead of asking you to decode icons.
           Apparaten, Voordelen and Blog stay reachable by scrolling; crowding
           seven slots into a phone's width made all of them unreadable. ──── */}
    <nav
      data-dock
      className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-sm"
      aria-label="Hoofdnavigatie"
    >
      {/* Three separate bubbles fanning up out of the Contact slot, each in its
          own brand colour so it's recognisable before the label is read. They
          stagger on the way out and unstagger on the way back, which is what
          makes them read as popping out of the button rather than a panel
          fading in. */}
      <div
        id="dock-contact"
        aria-hidden={!contactOpen}
        className="absolute bottom-full right-1 mb-3 flex flex-col items-end gap-2.5"
      >
        {DOCK_CHANNELS.map((channel, i) => {
          const Icon = channel.icon;
          /* Nearest the button leaves first and comes back last, so the fan
             opens outward and collapses inward. */
          const delay = contactOpen
            ? (DOCK_CHANNELS.length - 1 - i) * 55
            : i * 40;

          return (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setContactOpen(false)}
              tabIndex={contactOpen ? undefined : -1}
              aria-label={`${channel.name}: ${channel.handle}`}
              style={{ transitionDelay: `${delay}ms` }}
              className={`flex items-center gap-2.5 origin-bottom-right transition-all duration-300 ease-out ${
                contactOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
              }`}
            >
              <span className="px-3 py-1.5 rounded-full clay-nav flex flex-col leading-tight text-right">
                <span className="text-[11px] font-bold text-ink whitespace-nowrap">{channel.name}</span>
                <span className="text-[10px] text-zinc-400 whitespace-nowrap">{channel.handle}</span>
              </span>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-[#FFFFFF] border-2 border-[#FFFFFF]/80 shadow-xl active:scale-95 transition-transform"
                style={{ background: channel.fill, boxShadow: `0 10px 22px -6px ${channel.glow}` }}
              >
                <Icon className="w-6 h-6" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="relative flex items-end justify-between px-2 pt-2 pb-1.5 rounded-[1.75rem] clay-nav">
        {dockLinks.map((link, i) => {
          const Icon = link.icon;
          const active = activeId === link.id;

          return (
            <React.Fragment key={link.name}>
              {/* The order button breaks the run in half and sits proud of the
                  dock — it's the only action here, the rest is navigation. */}
              {i === 2 && (
                <a
                  href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bestel via WhatsApp"
                  className="shrink-0 -mt-9 flex flex-col items-center gap-1"
                >
                  <span className="w-14 h-14 rounded-full bg-[#25D366] text-[#FFFFFF] flex items-center justify-center border-[3px] border-[#FFFFFF]/80 shadow-xl shadow-[#25D366]/35 active:scale-95 transition-transform">
                    <WhatsAppIcon className="w-7 h-7" />
                  </span>
                  <span className="text-[9px] font-bold tracking-wide text-ink">Bestel</span>
                  {/* Matches the active-dot row on the others, so every label
                      shares a baseline. */}
                  <span className="h-1 w-1" />
                </a>
              )}

              <a
                href={link.href}
                onClick={() => setContactOpen(false)}
                aria-current={active ? 'true' : undefined}
                className={`flex-1 flex flex-col items-center gap-1 py-1 transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-zinc-400'
                }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span className={`text-[9px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>
                  {link.name}
                </span>
                {/* Active marker — a dot rather than a pill, so the labels keep
                    a common baseline. */}
                <span
                  className={`h-1 w-1 rounded-full transition-colors ${active ? 'bg-[#B8790E]' : 'bg-transparent'}`}
                />
              </a>
            </React.Fragment>
          );
        })}

        {/* Contact — the one dock slot that opens something instead of going
            somewhere, so it's a button and carries aria-expanded. */}
        <button
          type="button"
          onClick={() => setContactOpen((open) => !open)}
          aria-expanded={contactOpen}
          aria-controls="dock-contact"
          className={`flex-1 flex flex-col items-center gap-1 py-1 transition-colors duration-300 ${
            contactOpen ? 'text-ink' : 'text-zinc-400'
          }`}
        >
          <AtSign className="w-[18px] h-[18px] shrink-0" />
          <span className={`text-[9px] tracking-wide ${contactOpen ? 'font-bold' : 'font-medium'}`}>
            Contact
          </span>
          <span
            className={`h-1 w-1 rounded-full transition-colors ${contactOpen ? 'bg-[#B8790E]' : 'bg-transparent'}`}
          />
        </button>
      </div>
    </nav>

    {/* ── TABLET & DESKTOP: floating vertical rail ─────────────────────── */}
    <nav
      id="navbar"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="hidden sm:block fixed right-4 top-1/2 -translate-y-1/2 z-50"
      aria-label="Hoofdnavigatie"
    >
      <div
        className={`flex flex-col gap-1 p-2 rounded-[2rem] clay-nav transition-[width] duration-300 ease-out ${
          expanded ? 'w-[15rem]' : 'w-[3.75rem]'
        }`}
      >
        {/* Brand + collapse control */}
        <div className="flex items-center gap-2 mb-0.5">
          <a
            href="#hero"
            className="shrink-0 hover:scale-105 transition-transform"
            aria-label="BEEHOSTER startpagina"
          >
            <BeehosterLogo className="w-9 h-9 sm:w-10 sm:h-10" />
          </a>

          {expanded && (
            <>
              <span className="text-sm font-black tracking-wide text-ink truncate">
                <span className="text-[#C98A12]">BEE</span>HOSTER
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="ml-auto w-7 h-7 rounded-full bg-ink/10 border border-ink/15 text-zinc-300 hover:text-ink flex items-center justify-center shrink-0"
                aria-label="Menu inklappen"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Section links */}
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = activeId === link.id;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setExpanded(false)}
              aria-current={active ? 'true' : undefined}
              className={`flex items-center gap-2.5 rounded-full p-1 transition-colors duration-200 ${
                active ? 'bg-ink text-[#FFF6EF] shadow-lg shadow-[#7A6054]/30' : 'text-zinc-300 hover:bg-ink/10'
              }`}
            >
              <span
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${
                  active ? 'bg-black/10' : 'bg-ink/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              {expanded && <span className="text-sm font-semibold truncate pr-2">{link.name}</span>}
            </a>
          );
        })}

        <div className="h-px bg-ink/10 my-1 mx-1" />

        {/* Contact + order */}
        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-full p-1 text-zinc-300 hover:bg-ink/10 transition-colors"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-4 h-4" />
          </span>
          {expanded && <span className="text-sm font-semibold truncate pr-2">WhatsApp</span>}
        </a>

        <a
          href="#pricing"
          onClick={() => setExpanded(false)}
          className="flex items-center gap-2.5 rounded-full p-1 text-[#FFF6EF] accent-button-gradient shadow-lg shadow-[#FF5C3A]/25 hover:scale-[1.02] transition-transform"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 fill-[#FFF6EF]" />
          </span>
          {expanded && <span className="text-sm font-bold truncate pr-2">Abonnement nemen</span>}
        </a>

        {/* Expand affordance — only shown while collapsed */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-0.5 mx-auto w-7 h-7 rounded-full bg-ink/10 border border-ink/15 text-zinc-300 hover:text-ink flex items-center justify-center"
            aria-label="Menu uitklappen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </nav>
    </>
  );
};
