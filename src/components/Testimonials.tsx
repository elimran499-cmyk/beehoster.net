import React from 'react';
import { TESTIMONIALS } from '../data/iptvData';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative z-10 py-24 border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full clay-card mb-4">
            <div className="flex text-[#B8790E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#B8790E]" />
              ))}
            </div>
            <span className="text-xs font-bold text-ink">4,9 / 5,0 sterren</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            Geliefd bij <span className="accent-gradient-text">14.000+ actieve klanten</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Echte ervaringen van sportliefhebbers en IPTV-kijkers in Nederland en België.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="relative clay-card clay-edge clay-card-hover p-6 rounded-3xl flex flex-col justify-between"
            >
              <div>
                {/* Header Rating & Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#B8790E]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B8790E]" />
                    ))}
                  </div>
                  <span className="text-xl" title={review.location}>{review.flag}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-ink flex items-center gap-1.5">
                    {review.name}
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" title="Geverifieerde klant" />
                    )}
                  </h4>
                  <span className="text-[11px] text-zinc-500">{review.location}</span>
                </div>

                <span className="text-[10px] font-bold text-[#FF5C3A] bg-[#FF5C3A]/10 px-2 py-1 rounded-lg border border-[#FF5C3A]/30">
                  {review.planPurchased}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Banner */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Geverifieerde reviews via onafhankelijke Trustpilot- en IPTV-fora</span>
        </div>

      </div>
    </section>
  );
};
