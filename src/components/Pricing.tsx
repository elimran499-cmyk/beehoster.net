import React, { useState } from 'react';
import { PACKAGE_TIERS, DURATION_PACKS } from '../data/iptvData';
import { Check, ShieldCheck, Flame, Award, Monitor } from 'lucide-react';
import { BeeGlyph } from './BeehosterLogo';
import { whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

/* ── The pack ramp ────────────────────────────────────────────────────────
   One gradient spanning the whole row, pale wax → honey → deep amber. Each card
   renders only the slice of it that sits under that card, so the colour hands
   off from card to card instead of stepping between three flat tints — the row
   reads as a single comb, filling with honey as the commitment grows.

   Sampled rather than hardcoded so the ramp still spans the row correctly if a
   duration pack is ever added or removed. */
const RAMP_STOPS: [number, number, number][] = [
  [251, 243, 224], // wax   — shortest commitment
  [252, 233, 184], // honey
  [247, 210, 137], // amber — best deal
];

const sampleRamp = (t: number): string => {
  const span = RAMP_STOPS.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * span;
  const i = Math.min(Math.floor(scaled), span - 1);
  const local = scaled - i;
  const [r, g, b] = RAMP_STOPS[i].map((from, c) =>
    Math.round(from + (RAMP_STOPS[i + 1][c] - from) * local),
  );
  return `rgb(${r}, ${g}, ${b})`;
};

/* One feature line. `highlight` bolds the headline benefits. */
const FeatureRow: React.FC<{ feature: string; accent: boolean; highlight?: boolean; vip?: boolean }> = ({
  feature,
  accent,
  highlight = false,
  vip = false,
}) => (
  <div className="flex items-start gap-3 text-xs text-zinc-300">
    <span
      className={`mt-px w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
        vip
          ? 'bg-[#B8790E]/25 border-[#B8790E]/55 text-[#8A5A0A]'
          : accent
            ? 'bg-ink/15 border-ink/25 text-ink'
            : 'bg-ink/10 border-ink/15 text-zinc-200'
      }`}
    >
      <Check className="w-3 h-3 stroke-[3]" />
    </span>
    <span className={highlight ? 'font-semibold text-ink' : ''}>{feature}</span>
  </div>
);

export const Pricing: React.FC = () => {
  const [tier, setTier] = useState<'basic' | 'vip'>('basic');
  const [devices, setDevices] = useState<number>(1);

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tier) ?? PACKAGE_TIERS[0];
  const isVip = tier === 'vip';
  /* 0 at one screen, 1 at four — drives how golden the packs glow. */
  const goldLift = (devices - 1) / 3;

  const formatPrice = (val: number) => `€${val.toFixed(2)}`;

  return (
    <section id="pricing" className="relative z-10 py-28 overflow-hidden">

      {/* Local light behind the highlighted plan. It goes honey gold on the VIP
          tier and cool on Basis, matching whichever ramp the packs are using —
          so the whole section changes, not just the cards. */}
      <div
        className={`bloom w-[40rem] h-[38rem] top-16 right-[2%] opacity-70 transition-opacity duration-700 ${
          isVip ? 'bloom-vip' : 'bloom-warm'
        }`}
      />
      <div
        className={`bloom w-[36rem] h-[34rem] -bottom-40 left-[8%] opacity-70 transition-opacity duration-700 ${
          isVip ? 'bloom-vip' : 'bloom-ember'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block whitespace-nowrap text-[9px] sm:text-[11px] font-bold text-[#B8790E] uppercase tracking-[0.16em] sm:tracking-[0.25em] bg-ink/5 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-ink/15">
            Transparante prijzen • Geen verborgen kosten
          </span>
          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight">
            Kies je <span className="accent-gradient-text">pakket</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[13px] sm:text-base text-zinc-400 px-2">
            Kies een pakket, stuur ons een WhatsApp-bericht en je login staat binnen 5 minuten klaar. Altijd opzegbaar, geen contract.
          </p>

        </div>

        {/* ── Tier Switch: Basic / Premium VIP ─────────────────────── */}
        <div className="flex justify-center mb-4">
          <div className="relative inline-flex items-center gap-1 p-1 clay-panel clay-edge rounded-full">
            {PACKAGE_TIERS.map((t) => {
              const active = tier === t.id;
              const vipPill = t.id === 'vip' && active;
              return (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    vipPill
                      ? 'pill-vip shadow-lg shadow-[#FFB03A]/40'
                      : active
                        ? 'pill-light shadow-lg'
                        : 'text-zinc-400 hover:text-ink'
                  }`}
                >
                  {t.id === 'vip' && <BeeGlyph className={`w-4 h-4 ${active ? '' : 'opacity-70'}`} />}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIP announces itself with a swarm line rather than just a colour */}
        {isVip && (
          <div className="flex items-center justify-center gap-2.5 mb-8 animate-in fade-in slide-in-from-top-1 duration-500">
            <span className="flex items-center gap-1 text-[#B8790E]">
              {[0, 0.9, 1.8].map((delay) => (
                <BeeGlyph
                  key={delay}
                  className="w-4 h-4 animate-bee"
                  style={{ animationDelay: `${delay}s` }}
                  aria-hidden="true"
                />
              ))}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A5A0A]">
              Volledige korf — alles inbegrepen
            </span>
          </div>
        )}

        {/* ── Device Count. Phones get a 2×2 grid of full-width targets — the
               single scrolling pill row hid options 3 and 4 off-screen. ─── */}
        <div className="mb-10 sm:mb-12">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 mb-3">
            Hoeveel apparaten tegelijk?
          </p>

          <div className="grid grid-cols-2 gap-2 sm:hidden">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setDevices(n)}
                className={`py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  devices === n
                    ? isVip
                      ? 'pill-vip shadow-lg shadow-[#FFB03A]/30'
                      : 'pill-light shadow-lg'
                    : 'clay-panel clay-edge text-zinc-400'
                }`}
              >
                <Monitor className="w-4 h-4" />
                {n} {n === 1 ? 'apparaat' : 'apparaten'}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="relative inline-flex items-center gap-1 p-1 clay-panel clay-edge rounded-full">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setDevices(n)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    devices === n
                      ? isVip
                        ? 'pill-vip shadow-lg shadow-[#FFB03A]/30'
                        : 'pill-light shadow-lg'
                      : 'text-zinc-400 hover:text-ink'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  {n} {n === 1 ? 'apparaat' : 'apparaten'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Duration Packs ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {DURATION_PACKS.map((pack, i) => {
            const price = pack.prices[tier][devices - 1];
            const perMonth = price / pack.months;
            const best = pack.bestDeal;
            /* Each pack takes its slice of the shared ramp; VIP keeps its own
               deeper gold so the tiers still read apart. */
            const packCount = DURATION_PACKS.length;
            const rampSlice = `linear-gradient(100deg, ${sampleRamp(i / packCount)} 0%, ${sampleRamp(
              (i + 1) / packCount,
            )} 100%)`;

            /* Every other cell drops half a step, the way courses of comb
               interlock. Only from lg, where the three sit on one row. */
            const stagger = i % 2 === 1 ? 'lg:mt-10' : '';

            return (
              <div
                key={pack.id}
                className={`relative px-6 sm:px-8 pt-16 pb-16 flex flex-col transition-transform duration-500 hover:-translate-y-1 ${stagger} ${
                  best ? 'z-20' : ''
                }`}
              >
                {/* The cell itself. It lives on its own layer so the clip never
                    reaches the badge, and carries the clay lighting as layered
                    backgrounds — an inset box-shadow would be clipped away at
                    the pointed ends. */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 hex-cell ${best ? 'hex-cell-best' : ''}`}
                  style={{
                    background: [
                      'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 22%)',
                      'linear-gradient(0deg, rgba(168,126,52,0.20) 0%, rgba(168,126,52,0) 20%)',
                      isVip
                        ? 'linear-gradient(158deg, #FFF8E6 0%, #FFEFC9 46%, #FCE3AC 100%)'
                        : rampSlice,
                    ].join(', '),
                  }}
                />

                {/* Comb texture on every pack now, not just the best deal. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hex-cell honeycomb-tint opacity-[0.10] pointer-events-none"
                />
                {/* More screens, more honey: every extra device fills the cell
                    further. Clipped to the same silhouette so it can't spill
                    past the pointed ends. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hex-cell pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: goldLift,
                    background:
                      'linear-gradient(150deg, rgba(255,214,80,0.28) 0%, rgba(255,154,46,0.12) 45%, transparent 78%)',
                  }}
                />

                {/* VIP turns the whole grid into a hive: honeycomb on every
                    pack and a bee resting on each one, not just the best deal. */}
                {/* A bee resting on every cell, not just the best deal. */}
                <BeeGlyph
                  aria-hidden="true"
                  className={`absolute top-8 right-6 w-11 h-11 -rotate-12 pointer-events-none animate-bee ${
                    isVip ? 'text-[#B8790E]/25' : 'text-[#B8790E]/[0.18]'
                  }`}
                />

                {/* The hive dressing that marks out the best deal: honeycomb
                    tile, a bee resting in the corner, and a bee on the badge. */}
                {best && (
                  <>
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-[2rem] honeycomb-tint pointer-events-none ${
                        isVip ? 'opacity-[0.12]' : 'opacity-[0.07]'
                      }`}
                    />
                    <BeeGlyph
                      aria-hidden="true"
                      className={`absolute -top-1 right-3 w-24 h-24 rotate-12 pointer-events-none animate-bee ${
                        isVip ? 'text-[#B8790E]/[0.22]' : 'text-[#B8790E]/[0.16]'
                      }`}
                    />
                    {isVip && (
                      <BeeGlyph
                        aria-hidden="true"
                        className="absolute bottom-6 left-5 w-10 h-10 -rotate-[18deg] text-[#C98A12]/[0.14] pointer-events-none animate-bee"
                        style={{ animationDelay: '1.4s' }}
                      />
                    )}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
                        isVip ? 'pill-vip shadow-[#FFB03A]/50' : 'pill-light shadow-[#FF5C3A]/40'
                      }`}
                    >
                      <BeeGlyph className="w-3.5 h-3.5" />
                      Beste deal · -{pack.savePercent}%
                    </div>
                  </>
                )}

                {/* Duration + price */}
                <div className="relative z-10 text-center">
                  <p
                    className={`font-condensed uppercase text-xs sm:text-sm font-bold tracking-[0.28em] ${
                      'text-[#8A5A0A]'
                    }`}
                  >
                    {pack.label}
                  </p>
                  <p
                    className={`mt-3 text-5xl sm:text-[3.4rem] leading-none font-bold tracking-tight ${
                      isVip ? 'vip-gradient-text' : 'text-ink'
                    }`}
                  >
                    {formatPrice(price)}
                  </p>
                  <p className="mt-2.5 text-xs text-zinc-400">≈ {formatPrice(perMonth)} per maand</p>

                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-300">
                    <Monitor className="w-3.5 h-3.5 text-[#B8790E]" />
                    {devices} {devices === 1 ? 'apparaat inbegrepen' : 'apparaten inbegrepen'}
                  </p>
                </div>

                {/* CTA — straight into WhatsApp with the chosen pack, tier and
                    aantal apparaten already written in the message */}
                <a
                  href={whatsAppLink(
                    `Hoi BEEHOSTER! Ik wil graag het pakket ${activeTier.name} ${pack.label} bestellen ` +
                      `voor ${devices} ${devices === 1 ? 'apparaat' : 'apparaten'} (${formatPrice(price)}). ` +
                      `Kunnen jullie mij de betaalgegevens en activatiestappen sturen?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative z-10 mt-6 w-full py-4 text-sm font-bold rounded-full flex items-center justify-center gap-2 ${
                    isVip ? 'pill-vip shadow-lg shadow-[#FFB03A]/35' : 'pill-light'
                  }`}
                >
                  <WhatsAppIcon className={`w-4 h-4 ${isVip ? 'text-[#0E5B2A]' : 'text-[#25D366]'}`} />
                  {isVip ? 'Word VIP Nu' : 'Bestel Nu'}
                </a>

                <div className="relative z-10 my-6 h-px bg-ink/10" />

                {/* What's in the pack */}
                <div className="relative z-10 flex items-center gap-2.5 mb-5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isVip
                        ? 'bg-[#B8790E]/20 text-[#6B4008] border border-[#B8790E]/55'
                        : 'bg-[#C98A12]/15 text-[#8A5A0A] border border-[#C98A12]/35'
                    }`}
                  >
                    {activeTier.name}
                  </span>
                  <h3 className="text-sm font-bold text-ink">{activeTier.headline}</h3>
                </div>

                {/* Every feature, every screen — phones get the full pack, not
                    a four-line preview behind a toggle. */}
                <div className="relative z-10 space-y-3.5">
                  {activeTier.features.map((feature, idx) => (
                    <FeatureRow key={feature} feature={feature} accent={!!best} highlight={idx < 2} vip={isVip} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Talk-to-us banner */}
        <div className="relative mt-12 max-w-4xl mx-auto p-5 rounded-[2rem] clay-panel clay-edge specular overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/40">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">
                Weet je niet welk pakket bij je past?
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Stuur ons een WhatsApp-bericht — we zoeken samen de juiste looptijd en het aantal apparaten uit.
              </p>
            </div>
          </div>
          <a
            href={whatsAppLink('Hoi BEEHOSTER! Welk abonnement past het beste bij mij?')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-xs font-bold rounded-full pill-light flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Chat via WhatsApp
          </a>
        </div>

        {/* Security & Payment Footer info */}
        <div className="mt-10 text-center">
          <div className="relative inline-flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-zinc-400 clay-panel clay-edge px-6 sm:px-7 py-4 sm:py-3.5 rounded-3xl sm:rounded-full">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> Creditcard, PayPal, overboeking of crypto
            </span>
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#FF5C3A]" /> M3U- &amp; Xtream-login via de chat
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B8790E]" /> 7 dagen niet-goed-geld-terug
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
