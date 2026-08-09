import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/iptvData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FaqProps {
  onOpenOrderModal: (planId?: string) => void;
}

/* Support lands in WhatsApp, so the callout links straight out instead of
   routing through the order panel. */
export const FaqSection: React.FC<FaqProps> = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [filterCategory, setFilterCategory] = useState<string>('Alles');

  const categories = ['Alles', 'Bestellen', 'Activatie & snelheid', 'Apparaten', 'Zenders & VOD', 'Betalen'];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    if (filterCategory === 'Alles') return true;
    return faq.category === filterCategory;
  });

  return (
    <section id="faq" className="relative z-10 py-24 border-t border-ink/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#B8790E] uppercase tracking-widest bg-[#FF5C3A]/10 px-3.5 py-1 rounded-full border border-[#FF5C3A]/30">
            VEELGESTELDE VRAGEN
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
            Vragen? <span className="accent-gradient-text">Wij hebben de antwoorden</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Alles over ons IPTV-abonnement, het instellen van je apparaat en de snelle activatie.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-[#FF5C3A] text-[#FFF6EF] shadow-md'
                  : 'clay-card text-zinc-400 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? 'clay-panel-accent border-[#FF9A2E]/60'
                    : 'clay-card hover:border-ink/25'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-ink flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-[#FF5C3A]' : 'text-zinc-500'}`} />
                    {faq.question}
                  </span>
                  
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FF5C3A] text-[#FFF6EF]' : 'bg-ink/8 text-zinc-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-zinc-300 leading-relaxed border-t border-ink/5 animate-in fade-in duration-200">
                    <p className="pl-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="relative mt-12 p-6 rounded-3xl clay-card clay-edge specular overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 shrink-0">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-ink">Staat jouw vraag er niet tussen?</h4>
              <p className="text-xs text-zinc-400">Ons supportteam is 24/7 bereikbaar via WhatsApp en helpt je direct verder.</p>
            </div>
          </div>

          <a
            href={whatsAppLink('Hoi BEEHOSTER! Ik heb een vraag over jullie IPTV-abonnementen.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-xs font-bold text-[#FFFFFF] bg-[#25D366] rounded-xl shadow-lg shadow-[#25D366]/30 flex items-center gap-2 hover:scale-[1.03] transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
