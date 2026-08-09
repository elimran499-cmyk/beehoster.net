import React from 'react';
import { FEATURE_GRID } from '../data/iptvData';
import { Film, Zap, Clock, Tv, ShieldAlert, Headphones, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Headphones': return <Headphones className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <section id="features" className="relative z-10 py-24 border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#B8790E] uppercase tracking-widest bg-[#FF5C3A]/10 px-3.5 py-1 rounded-full border border-[#FF5C3A]/30">
            WAAROM BEEHOSTER
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            Gebouwd voor <span className="accent-gradient-text">nul buffering</span> en topkwaliteit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Wij draaien redundante 10Gbps glasvezelservers in Europa en Noord-Amerika, zodat elke 4K-uitzending vloeiend blijft.
          </p>
        </div>

        {/* 3x2 Bento Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_GRID.map((feature, idx) => (
            <div
              key={feature.id}
              className="clay-card clay-edge clay-card-hover p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Subtle Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5C3A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FF5C3A]/15 transition-all" />

              <div className="w-12 h-12 rounded-2xl bg-[#FF5C3A]/10 border border-[#FF5C3A]/30 text-[#B8790E] flex items-center justify-center mb-6 shadow-lg shadow-[#FF5C3A]/10 group-hover:scale-110 group-hover:bg-[#FF5C3A] group-hover:text-[#FFF6EF] transition-all duration-300">
                {getFeatureIcon(feature.icon)}
              </div>

              <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-[#B8790E] transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 pt-4 border-t border-ink/5 flex items-center gap-2 text-xs font-semibold text-[#FF5C3A]">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C3A]" />
                <span>Inbegrepen bij alle abonnementen</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
