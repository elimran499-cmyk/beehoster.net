import React, { useEffect, useMemo, useState } from 'react';
import { BeehosterLogo, BeeGlyph } from './BeehosterLogo';

const PLAY_MS = 1900;
const FADE_MS = 420;
/* Skipping is only offered after the sequence has actually started showing
   something. Without this, a pointer or wheel event that happens to land in
   the first moments — a mouse already held down, a trackpad still coasting,
   an autofocus scroll — dismissed the whole thing before it was visible, and
   the intro looked broken rather than fast. */
const SKIP_GRACE_MS = 420;

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

/* The swarm. Each bee gets its own entry vector and an arc midpoint that bends
   the flight — a straight interpolation reads as a sprite being moved rather
   than something flying. Depth comes from size, opacity and blur, so the swarm
   occupies space instead of sitting on one plane. */
const BEES = [
  { top: '20%', left: '17%', size: 'w-9 h-9',   from: ['-62vw', '-26vh'], mid: ['-22vw', '-20vh'], spin: '-46deg', delay: 120, depth: '' },
  { top: '26%', left: '80%', size: 'w-7 h-7',   from: ['58vw', '-30vh'],  mid: ['24vw', '-8vh'],   spin: '38deg',  delay: 190, depth: '' },
  { top: '72%', left: '24%', size: 'w-6 h-6',   from: ['-48vw', '36vh'],  mid: ['-18vw', '10vh'],  spin: '28deg',  delay: 250, depth: 'opacity-80' },
  { top: '76%', left: '74%', size: 'w-8 h-8',   from: ['52vw', '40vh'],   mid: ['14vw', '18vh'],   spin: '-30deg', delay: 160, depth: '' },
  { top: '46%', left: '90%', size: 'w-5 h-5',   from: ['50vw', '4vh'],    mid: ['20vw', '-14vh'],  spin: '20deg',  delay: 300, depth: 'opacity-70 blur-[1px]' },
  { top: '40%', left: '9%',  size: 'w-5 h-5',   from: ['-52vw', '10vh'],  mid: ['-20vw', '-12vh'], spin: '-22deg', delay: 330, depth: 'opacity-70 blur-[1px]' },
  { top: '12%', left: '52%', size: 'w-6 h-6',   from: ['6vw', '-42vh'],   mid: ['-10vw', '-18vh'], spin: '52deg',  delay: 220, depth: 'opacity-85' },
  { top: '86%', left: '48%', size: 'w-4 h-4',   from: ['-8vw', '44vh'],   mid: ['12vw', '16vh'],   spin: '-18deg', delay: 360, depth: 'opacity-60 blur-[1.5px]' },
];

/* Plays on every load. The only thing that suppresses it is a stated
   preference for reduced motion — no session flag, so a refresh always
   replays it. It is short and skippable enough to carry that. */
const shouldPlay =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
                animationDelay: `${60 + cell.dist * 90}ms`,
                transformOrigin: `${cell.x}px ${cell.y}px`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── The swarm arcing in ─────────────────────────────────────── */}
      {BEES.map((bee, i) => {
        const vars = {
          top: bee.top,
          left: bee.left,
          '--bee-from-x': bee.from[0],
          '--bee-from-y': bee.from[1],
          '--bee-mid-x': bee.mid[0],
          '--bee-mid-y': bee.mid[1],
          '--bee-spin': bee.spin,
        } as React.CSSProperties;

        return (
          <React.Fragment key={i}>
            {/* The streak burns off along the same path, just behind. */}
            <span
              aria-hidden="true"
              className="intro-trail absolute h-px w-24 origin-right rounded-full pointer-events-none"
              style={{
                ...vars,
                animationDelay: `${bee.delay}ms`,
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,209,102,0.55) 60%, rgba(255,236,190,0.9) 100%)',
              }}
            />

            {/* Outer element owns the flight; the inner one hovers once it has
                landed, so the two transforms never fight over the element. */}
            <span
              aria-hidden="true"
              className={`intro-bee absolute pointer-events-none ${bee.depth}`}
              style={{ ...vars, animationDelay: `${bee.delay}ms` }}
            >
              <span
                className="intro-bee-hover block"
                style={{ animationDelay: `${bee.delay + 780}ms` }}
              >
                <BeeGlyph
                  className={`${bee.size} text-[#FFD166] drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]`}
                />
              </span>
            </span>
          </React.Fragment>
        );
      })}

      {/* ── The mark landing in the empty centre cell ───────────────── */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <span
            className="intro-pulse absolute inset-0 rounded-full"
            style={{
              animationDelay: '470ms',
              boxShadow: '0 0 0 2px rgba(255,209,102,0.55), 0 0 60px 12px rgba(255,154,46,0.45)',
            }}
          />
          <BeehosterLogo
            className="intro-badge w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_18px_50px_rgba(0,0,0,0.75)]"
            style={{ animationDelay: '330ms' }}
          />
        </div>

        <p
          className="intro-word mt-6 text-2xl sm:text-3xl font-black text-[#FFF6E4]"
          style={{ animationDelay: '760ms' }}
        >
          <span className="text-[#FFD166]">BEE</span>HOSTER
        </p>

        <p
          className="intro-word mt-2 font-condensed uppercase text-[10px] sm:text-[11px] tracking-[0.32em] text-[#FFD166]/70"
          style={{ animationDelay: '900ms' }}
        >
          Eén korf · nooit stil
        </p>
      </div>
    </div>
  );
};
