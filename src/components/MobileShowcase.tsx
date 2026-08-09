import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { films, type FilmCard } from './Hero';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsAppLink } from '../data/contact';

/* Phone masthead. Instead of the desktop hero's two-column split, the phone
   gets full-bleed panels stacked edge to edge, each one a single claim over a
   moving wall of posters. The panels overlap on a swept curve, so scrolling
   reads as one continuous surface rather than a stack of boxes. */

/* Asymmetric top radii. The horizontal radius is huge and the vertical one tiny,
   which is what turns a corner rounding into a wide, tilted sweep across the
   panel's top edge. */
const CURVE_LEFT = '78% 26% 0 0 / 7.5% 3.5% 0 0';

/* Deal a rotated copy of the catalogue into columns, so the two panels are
   running different films past each other rather than the same three stacks. */
const dealColumns = (offset: number, columns = 3): FilmCard[][] => {
  const rotated = [...films.slice(offset), ...films.slice(0, offset)];
  return Array.from({ length: columns }, (_, col) => rotated.filter((_, i) => i % columns === col));
};

const COLUMN_DURATIONS = ['48s', '64s', '56s'];

/* Artwork bed — columns of posters drifting in alternating directions under a
   scrim heavy enough to keep the display type legible. Each column holds its
   list twice so the -50% translate loops seamlessly; five posters per column
   keeps that half taller than the panel, which is what stops a gap appearing at
   the wrap point. */
const PosterBed: React.FC<{ columns: FilmCard[][]; tilt: string; eager?: boolean }> = ({
  columns,
  tilt,
  eager = false,
}) => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
    <div className={`absolute -inset-[14%] flex gap-2.5 ${tilt} scale-[1.15] opacity-[0.82]`}>
      {columns.map((column, col) => (
        <div key={col} className="flex-1 overflow-hidden">
          <div
            className={`flex flex-col gap-2.5 ${col % 2 ? 'animate-scroll-down' : 'animate-scroll-up'}`}
            style={{ '--scroll-duration': COLUMN_DURATIONS[col % 3] } as React.CSSProperties}
          >
            {[...column, ...column].map((film, i) => (
              <div
                key={`${film.id}-${i}`}
                className={`shrink-0 aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-b ${film.gradient}`}
              >
                {film.poster && (
                  <img
                    src={film.poster}
                    alt=""
                    /* Only the first panel's opening posters are worth blocking
                       on — the duplicate half exists purely for the loop. */
                    loading={eager && i < column.length ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Vertical scrim, then a soft pool of dark that sits only under the centred
        type — the artwork has to stay legible either side of it, or the panel
        reads as a flat black box rather than a photograph. */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#14070F]/70 via-[#14070F]/25 to-[#14070F]/88" />
    <div className="absolute inset-0 bg-[radial-gradient(62%_38%_at_50%_50%,rgba(20,7,15,0.86)_0%,rgba(20,7,15,0.42)_58%,transparent_100%)]" />
    <div className="absolute inset-0 film-grain opacity-[0.09] mix-blend-overlay" />
  </div>
);

/* One full-height panel. The first sits flush at the top of the page; the rest
   ride up over their predecessor so the curved edge cuts into it. */
const Panel: React.FC<{
  curve?: string;
  first?: boolean;
  background: React.ReactNode;
  children: React.ReactNode;
}> = ({ curve, first = false, background, children }) => (
  <div
    className={`relative flex flex-col items-center justify-center text-center px-6 overflow-hidden ${
      first ? 'min-h-[94svh] pt-28 pb-20' : 'min-h-[82svh] -mt-16 pt-24 pb-24'
    }`}
    style={
      first
        ? undefined
        : {
            borderRadius: curve,
            /* A lit hairline along the swept edge, plus a shadow the panel casts
               upward onto the one it overlaps — without the cast shadow the two
               near-black fields meet with nothing to separate them. */
            boxShadow: 'inset 0 1.5px 0 rgba(255,214,180,0.42), 0 -22px 44px rgba(0,0,0,0.6)',
          }
    }
  >
    {background}
    <div className="relative z-10 w-full max-w-sm">{children}</div>
  </div>
);

/* Shared type treatment — the claim, then a quiet lowercase line under it. */
const PanelHeading: React.FC<{ title: React.ReactNode; sub: string }> = ({ title, sub }) => (
  <>
    <h2 className="font-display uppercase text-white leading-[0.88] tracking-tight text-[clamp(2.9rem,14.5vw,4.25rem)] drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]">
      {title}
    </h2>
    <p className="mt-3.5 font-editorial text-[15px] leading-snug text-[#D8CBD0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
      {sub}
    </p>
  </>
);

export const MobileShowcase: React.FC = () => (
  <section className="sm:hidden relative bg-page">

    {/* ── 1 · Live channels ─────────────────────────────────────────── */}
    <Panel first background={<PosterBed columns={dealColumns(0)} tilt="-rotate-6" eager />}>
      <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#FFE600]/45 bg-[#FFE600]/10 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFE9A8]">
        Officiële BEEHOSTER-website
      </span>

      <PanelHeading
        title={
          <>
            <span className="block">80.000+</span>
            <span className="block accent-gradient-text">Zenders</span>
          </>
        }
        sub="alle sport, film &amp; ppv — live"
      />

      {/* The one hard CTA above the fold. Everything else on the phone leans on
          the dock's raised order button. */}
      <div className="mt-8 flex flex-col items-stretch gap-2.5">
        {/* Straight down to the packs, same as the desktop hero and the rail —
            it used to open the order modal, so the phone was the one place
            this button did something different. */}
        <a
          href="#pricing"
          className="px-6 py-3.5 rounded-full accent-button-gradient text-[#FFF6EF] text-[14px] font-bold shadow-xl shadow-[#FF5C3A]/25 active:scale-[0.97] transition-transform flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 shrink-0 fill-[#FFF6EF]" />
          Abonnement nemen
          <span className="bg-black/20 px-1.5 py-0.5 rounded-lg text-[9px] tracking-wider uppercase font-extrabold">
            Bespaar 55%
          </span>
        </a>

        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-3.5 rounded-full clay-panel clay-edge text-[14px] font-semibold text-zinc-100 active:scale-[0.97] transition-transform flex items-center justify-center gap-2.5"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          Bestel via WhatsApp
        </a>
      </div>
    </Panel>

    {/* ── 2 · On-demand library ─────────────────────────────────────── */}
    <Panel
      curve={CURVE_LEFT}
      background={
        <>
          <PosterBed columns={dealColumns(8)} tilt="rotate-[7deg]" />
          {/* Last panel, so it fades out rather than butting up against the
              section below on a hard line. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#F2EDE8]"
          />
        </>
      }
    >
      <PanelHeading
        title={
          <>
            <span className="block">200.000+</span>
            <span className="block accent-gradient-text">Films</span>
          </>
        }
        sub="series &amp; films, altijd in 4K UHD"
      />
      <a
        href="#channels"
        className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full clay-panel clay-edge relative text-[13px] font-semibold text-zinc-100 active:scale-[0.97] transition-transform"
      >
        Bekijk de catalogus
        <ArrowRight className="w-4 h-4 shrink-0 text-[#FFD166]" />
      </a>
    </Panel>

  </section>
);
