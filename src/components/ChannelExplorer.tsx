import React, { useState } from 'react';
import { SAMPLE_CHANNELS } from '../data/iptvData';
import { ChannelItem } from '../types';
import { Sparkles, Radio } from 'lucide-react';

interface ChannelExplorerProps {
  onOpenOrderModal: (planId?: string) => void;
}

/* Generated monogram logo — a small color-coded wordmark tile so every channel
   has a "logo" without pulling in real broadcaster artwork. Colors cycle
   through the accent palette based on the channel id. */
const LOGO_GRADIENTS = [
  'from-[#FF5C3A] to-[#FF9A2E]',
  'from-[#B8790E] to-[#FF5C3A]',
  'from-[#FF3D8B] to-[#FF5C3A]',
  'from-[#A855F7] to-[#FF3D8B]',
  'from-[#22D3EE] to-[#A855F7]',
  'from-[#FF9A2E] to-[#B8790E]',
];

const ChannelLogo: React.FC<{ channel: ChannelItem; className?: string; textClassName?: string }> = ({
  channel,
  className = 'w-9 h-9 rounded-xl',
  textClassName = 'text-[10px]',
}) => {
  const [artworkFailed, setArtworkFailed] = useState(false);
  const showArtwork = channel.logo && !artworkFailed;

  /* Most broadcaster marks are dark ink drawn for light backgrounds, so the
     plate is white by default and flips dark for the few light-ink marks. */
  if (showArtwork) {
    return (
      <span
        className={`relative flex items-center justify-center overflow-hidden shrink-0 border ${
          channel.logoTone === 'light' ? 'bg-black/80 border-white/25' : 'bg-white border-white/40'
        } ${className}`}
      >
        <img
          src={channel.logo}
          alt={`Logo van ${channel.name}`}
          loading="lazy"
          onError={() => setArtworkFailed(true)}
          className="w-full h-full object-contain p-1"
        />
        <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow">{channel.flag}</span>
      </span>
    );
  }

  const gradient = LOGO_GRADIENTS[Number(channel.id) % LOGO_GRADIENTS.length];
  return (
    <span
      className={`relative bg-gradient-to-br ${gradient} border border-ink/15 flex items-center justify-center overflow-hidden shrink-0 ${className}`}
    >
      <span className={`font-display uppercase tracking-tight text-[#FFF6EF] ${textClassName}`}>
        {channel.logoText}
      </span>
      <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow">{channel.flag}</span>
    </span>
  );
};

/* One tile on the drifting rails — the broadcaster mark on its own. */
const ChannelChip: React.FC<{ channel: ChannelItem }> = ({ channel }) => (
  <ChannelLogo
    channel={channel}
    className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl"
    textClassName="text-sm"
  />
);

export const ChannelExplorer: React.FC<ChannelExplorerProps> = ({ onOpenOrderModal }) => {
  const half = Math.ceil(SAMPLE_CHANNELS.length / 2);
  /* Each half of a marquee track must be wider than the viewport or the loop
     leaves gaps — the logo chips are narrow, so repeat the list three times. */
  const repeat = <T,>(items: T[]) => [...items, ...items, ...items];
  const railTop = repeat(SAMPLE_CHANNELS.slice(0, half));
  const railBottom = repeat(SAMPLE_CHANNELS.slice(half));

  return (
    <section id="channels" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#B8790E] uppercase tracking-widest bg-[#FF5C3A]/10 px-3.5 py-1 rounded-full border border-[#FF5C3A]/30">
            80.000+ LIVE ZENDERS & 95.000+ VOD
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            Ontdek ons <span className="accent-gradient-text">complete zender- en film</span>aanbod
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Elke zender streamt in origineel 4K Ultra HD en 60FPS, zonder compressie.
          </p>
        </div>

      </div>

      {/* ── Live Channel Rails: one drifting left, one drifting right ─────── */}
      <div className="relative mb-14 space-y-4">
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee gap-3 items-stretch" style={{ '--marquee-duration': '52s' } as React.CSSProperties}>
            {[...railTop, ...railTop].map((channel, i) => (
              <ChannelChip key={`t-${channel.id}-${i}`} channel={channel} />
            ))}
          </div>
        </div>

        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee-reverse gap-3 items-stretch" style={{ '--marquee-duration': '60s' } as React.CSSProperties}>
            {[...railBottom, ...railBottom].map((channel, i) => (
              <ChannelChip key={`b-${channel.id}-${i}`} channel={channel} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#FFF3EC] via-[#FFE9DC] to-[#FFF3EC] border border-[#FF5C3A]/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FF5C3A]/20 text-[#B8790E] border border-[#FF5C3A]/40 shrink-0">
              <Radio className="w-6 h-6 animate-pulse text-[#FF5C3A]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-ink">Zoek je een zenderlijst per land of het PPV-programma?</h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Wij stellen M3U-playlists op maat samen voor Nederlandse, Belgische, Duitse, Franse, Britse, Amerikaanse, Spaanse, Turkse, Arabische en Latijnse zenders.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenOrderModal('plan-12m')}
            className="shrink-0 px-6 py-3 text-xs font-bold text-[#FFF6EF] accent-button-gradient rounded-xl shadow-lg shadow-[#FF5C3A]/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-[#FFF6EF]" />
            <span>Vraag de volledige zenderlijst aan</span>
          </button>
        </div>

      </div>
    </section>
  );
};
