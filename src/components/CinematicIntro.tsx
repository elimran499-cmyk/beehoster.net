import React, { useEffect, useMemo, useState } from 'react';
import { BeehosterLogo, BeeGlyph } from './BeehosterLogo';

const PLAY_MS = 2500;
const FADE_MS = 620;
/* Skipping is only offered after the sequence has actually started showing
   something. Without this, a pointer or wheel event that happens to land in
   the first moments — a mouse already held down, a trackpad still coasting,
   an autofocus scroll — dismissed the whole thing before it was visible, and
   the intro looked broken rather than fast. */
const SKIP_GRACE_MS = 700;
const SEEN_KEY = 'bh-intro-seen';

/* The comb that builds itself around the logo. Axial coordinates out to two
   rings; the centre cell is left empty because that's where the badge lands.
   Each cell's delay comes from its distance from the centre, so the comb grows
   outward from the mark rather than all at once. */
const RINGS = 2;
const HEX_W = Math.sqrt(3);
const HEX_H = 1.5;

interface Cell {
  x: number;
  y: number;
  dist: number;
}

const buildComb = (): Cell[] => {
  const cells: Cell[] = [];
  for (let q = -RINGS; q <= RINGS; q++) {
    for (let r = Math.max(-RINGS, -q - RINGS); r <= Math.min(RINGS, -q + RINGS); r++) {
      const dist = (Math.abs(q) + Math.abs(r) + Math.abs(-q - r)) / 2;
      if (dist === 0) continue; // the badge occupies the middle
      cells.push({ x: HEX_W * (q + r / 2), y: HEX_H * r, dist });
    }
  }
  return cells;
};

/* Where each bee flies in from. Kept off-screen in their own direction so they
   converge on the mark instead of appearing in place. */
const BEES = [
  { top: '18%', left: '16%', size: 'w-9 h-9', from: ['-60vw', '-30vh'], spin: '-40deg', delay: 620 },
  { top: '24%', left: '82%', size: 'w-7 h-7', from: ['55vw', '-26vh'], spin: '35deg', delay: 760 },
  { top: '74%', left: '22%', size: 'w-6 h-6', from: ['-45vw', '34vh'], spin: '25deg', delay: 880 },
  { top: '78%', left: '76%', size: 'w-8 h-8', from: ['50vw', '38vh'], spin: '-28deg', delay: 700 },
  { top: '48%', left: '90%', size: 'w-5 h-5', from: ['48vw', '6vh'], spin: '18deg', delay: 980 },
];

/* Decided at module scope, and deliberately NOT in a useState initializer:
   StrictMode invokes initializers twice, so the second call would read the
   "seen" flag the first call had just written and conclude the sequence had
   already played — the intro never appeared in development.

   Returning within the same tab session skips it either way. A title sequence
   is charming once and an obstacle every time after. */
const shouldPlay = ((): boolean => {
  if (typeof window === 'undefined') return false;
  /* ?intro=replay forces it, for showing the sequence to someone without
     having to open a fresh tab. Checked before the reduced-motion guard is
     irrelevant — an explicit request still respects that preference. */
  const forced = new URLSearchParams(window.location.search).get('intro') === 'replay';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (forced) return true;
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* Private mode can throw on sessionStorage; play it rather than break. */
  }
  return true;
})();

export const CinematicIntro: React.FC = () => {
  const [visible, setVisible] = useState(shouldPlay);
  const [leaving, setLeaving] = useState(false);

  const comb = useMemo(buildComb, []);

  useEffect(() => {
    if (!visible) return;

    let skippable = false;
    const allow = window.setTimeout(() => { skippable = true; }, SKIP_GRACE_MS);

    /* isTrusted keeps synthetic events from scripts and automation from
       counting as someone asking to skip. */
    const dismiss = (event?: Event) => {
      if (event && (!skippable || !event.isTrusted)) return;
      setLeaving(true);
    };

    /* Guaranteed to end on its own, and skippable by any gesture someone
       reaching for the page would make. */
    const auto = window.setTimeout(() => dismiss(), PLAY_MS);
    window.addEventListener('pointerdown', dismiss);
    window.addEventListener('keydown', dismiss);
    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchstart', dismiss, { passive: true });

    /* The page must not scroll underneath while the curtain is up, or you
       land mid-site when it lifts. */
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(auto);
      window.clearTimeout(allow);
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchstart', dismiss);
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  useEffect(() => {
    if (!leaving) return;
    const done = window.setTimeout(() => setVisible(false), FADE_MS);
    return () => window.clearTimeout(done);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden flex items-center justify-center ${
        leaving ? 'intro-curtain-out' : ''
      }`}
      style={{
        background:
          'radial-gradient(120% 100% at 50% 45%, #6B3F06 0%, #3A2205 42%, #1E1103 72%, #140B02 100%)',
      }}
    >
      {/* Comb texture on the field itself, so the dark isn't flat */}
      <div className="absolute inset-0 honeycomb-tint opacity-[0.10]" />

      {/* ── The comb assembling ─────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="-9 -9 18 18"
          className="w-[min(150vw,150vh)] h-[min(150vw,150vh)] overflow-visible"
        >
          <defs>
            <linearGradient id="bh-intro-cell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD98A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#C98A12" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {comb.map((cell, i) => (
            <polygon
              key={i}
              className="intro-cell"
              points="0,-1 0.866,-0.5 0.866,0.5 0,1 -0.866,0.5 -0.866,-0.5"
              transform={`translate(${cell.x} ${cell.y})`}
              fill="url(#bh-intro-cell)"
              stroke="#FFC65A"
              strokeOpacity="0.32"
              strokeWidth="0.045"
              style={{
                animationDelay: `${140 + cell.dist * 190}ms`,
                transformOrigin: `${cell.x}px ${cell.y}px`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── Bees converging ─────────────────────────────────────────── */}
      {BEES.map((bee, i) => (
        <BeeGlyph
          key={i}
          className={`intro-bee absolute ${bee.size} text-[#FFD166] drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]`}
          style={
            {
              top: bee.top,
              left: bee.left,
              animationDelay: `${bee.delay}ms`,
              '--bee-from-x': bee.from[0],
              '--bee-from-y': bee.from[1],
              '--bee-spin': bee.spin,
            } as React.CSSProperties
          }
        />
      ))}

      {/* ── The mark landing in the empty centre cell ───────────────── */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <span
            className="intro-pulse absolute inset-0 rounded-full"
            style={{
              animationDelay: '820ms',
              boxShadow: '0 0 0 2px rgba(255,209,102,0.55), 0 0 60px 12px rgba(255,154,46,0.45)',
            }}
          />
          <BeehosterLogo
            className="intro-badge w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_18px_50px_rgba(0,0,0,0.75)]"
            style={{ animationDelay: '620ms' }}
          />
        </div>

        <p
          className="intro-word mt-6 text-2xl sm:text-3xl font-black text-[#FFF6E4]"
          style={{ animationDelay: '1180ms' }}
        >
          <span className="text-[#FFD166]">BEE</span>HOSTER
        </p>

        <p
          className="intro-word mt-2 font-condensed uppercase text-[10px] sm:text-[11px] tracking-[0.32em] text-[#FFD166]/70"
          style={{ animationDelay: '1380ms' }}
        >
          Eén korf · nooit stil
        </p>
      </div>
    </div>
  );
};
