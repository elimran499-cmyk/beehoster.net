import React from 'react';
import { Server, Film, MessagesSquare } from 'lucide-react';
import { BeeGlyph } from './BeehosterLogo';

/* The brand's introduction. The bee metaphor only earns its place if it maps
   onto something real, so each cell pairs a hive idea with the fact it stands
   for — the korf is load balancing, the honing is the catalogue, the zwerm is
   support. Without that pairing it would just be decoration on a server
   company. */
const CELLS = [
  {
    icon: Server,
    name: 'De korf',
    stat: '99,99%',
    statLabel: 'uptime',
    body: 'Je stream komt niet van één machine, maar van servers die het werk onderling verdelen. Valt er één weg, dan merk je er niets van.',
  },
  {
    icon: Film,
    name: 'De honing',
    stat: '280.000+',
    statLabel: 'zenders & films',
    body: 'Alles wat de korf verzamelt komt bij jou terecht: live tv, sport, PPV en een filmbibliotheek die elke week wordt aangevuld.',
  },
  {
    icon: MessagesSquare,
    name: 'De zwerm',
    stat: '24/7',
    statLabel: 'in de chat',
    body: 'Geen ticketsysteem dat je drie dagen laat wachten. Je stuurt een bericht en er antwoordt iemand die je installatie kent.',
  },
];

export const Intro: React.FC = () => (
  <section id="intro" className="relative z-10 py-24 sm:py-28 overflow-hidden">

    {/* Comb ground, faint enough to read as texture rather than pattern */}
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 honeycomb-tint opacity-[0.06]" />
      <div className="bloom bloom-warm w-[34rem] h-[30rem] -top-24 -right-24 opacity-50" />
      <div className="bloom bloom-vip w-[28rem] h-[26rem] -bottom-32 -left-24 opacity-40" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center">

        {/* ── The story ─────────────────────────────────────────────── */}
        <div className="relative">
          <BeeGlyph
            aria-hidden="true"
            className="absolute -top-10 -left-2 w-10 h-10 -rotate-12 text-[#C98A12]/25 animate-bee pointer-events-none"
          />

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C98A12]/35 bg-[#C98A12]/[0.08] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A5A0A]">
            <BeeGlyph className="w-3.5 h-3.5" aria-hidden="true" />
            Waarom BEEHOSTER
          </span>

          <h2 className="mt-5 font-display uppercase text-ink leading-[0.92] tracking-tight text-[clamp(2.4rem,7vw,3.75rem)]">
            <span className="block">Eén korf.</span>
            <span className="block accent-gradient-text">Nooit stil.</span>
          </h2>

          <p className="mt-6 font-editorial text-base sm:text-lg leading-relaxed text-zinc-300 max-w-xl border-l border-[#FF5C3A]/40 pl-4 sm:pl-5">
            Een bijenvolk werkt omdat niemand er alleen staat. Valt er één werkster weg, dan neemt de rest
            het over en gaat de korf gewoon door.
          </p>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-400 max-w-xl">
            Zo hebben we onze servers ook opgezet. Niet één machine die het in zijn eentje moet redden,
            maar een korf die het werk verdeelt — daarom hapert het niet op de avond dat heel Nederland
            tegelijk naar de wedstrijd kijkt. Dat is de hele reden dat er een bij op ons logo staat.
          </p>
        </div>

        {/* ── The comb ──────────────────────────────────────────────── */}
        {/* Three cells, the middle one dropped half a step so they interlock
            the way courses of comb do. Below lg they stack, where a stagger
            would just read as a broken margin. */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 lg:gap-4">
          {CELLS.map((cell, i) => {
            const Icon = cell.icon;
            return (
              <li key={cell.name} className={i === 1 ? 'sm:mt-10' : ''}>
                {/* Capped and centred on phones. Left to fill the column a
                    single cell became a 340px slab, which reads as a panel
                    rather than as one cell of comb. */}
                <div className="relative w-40 mx-auto sm:w-auto aspect-square sm:aspect-[0.86] flex">
                  {/* The cell face. Its own layer so the clip can't reach the
                      text, same reason as the pricing packs. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 hex-tile"
                    style={{
                      background: [
                        'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 26%)',
                        'linear-gradient(0deg, rgba(168,126,52,0.18) 0%, rgba(168,126,52,0) 24%)',
                        'linear-gradient(158deg, #FFFDF7 0%, #FFF4DC 52%, #FCE9BE 100%)',
                      ].join(', '),
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-4 py-8 w-full">
                    <span className="w-10 h-10 rounded-2xl bg-[#C98A12]/15 border border-[#C98A12]/30 text-[#B8790E] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="font-display text-[1.6rem] sm:text-[1.35rem] lg:text-[1.6rem] leading-none tracking-tight vip-gradient-text">
                      {cell.stat}
                    </p>
                    <p className="mt-1.5 font-condensed uppercase text-[9px] tracking-[0.16em] text-[#8A5A0A]">
                      {cell.statLabel}
                    </p>
                  </div>
                </div>

                {/* The explanation sits under its cell rather than inside it —
                    a hexagon crops long text badly at every width. */}
                <div className="mt-3 text-center px-1">
                  <p className="font-condensed uppercase text-[11px] tracking-[0.22em] text-[#B8790E]">
                    {cell.name}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{cell.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  </section>
);
