import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/iptvData';
import { WHATSAPP_DISPLAY, whatsAppLink } from '../data/contact';
import { X, ShieldCheck, Copy, Check, Clock, Zap } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface OrderModalProps {
  isOpen: boolean;
  initialPlanId?: string;
  onClose: () => void;
}

/* Ordering happens in the chat, not in a checkout form — this panel only
   gathers enough context to open WhatsApp with the message already written. */
export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, initialPlanId = 'plan-12m', onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPlan =
    PRICING_PLANS.find((p) => p.id === selectedPlanId) ?? PRICING_PLANS[PRICING_PLANS.length - 1];

  const message =
    `Hoi BEEHOSTER! Ik wil graag het pakket ${currentPlan.name} bestellen ` +
    `(${currentPlan.durationLabel} — €${currentPlan.price.toFixed(2)}). ` +
    `Kunnen jullie mij de betaalgegevens en activatiestappen sturen?`;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(WHATSAPP_DISPLAY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="relative w-full max-w-lg clay-panel-accent rounded-3xl overflow-hidden my-8">

        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-4 bg-[#FAF4EE] border-b border-ink/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-[#25D366] text-[#FFFFFF] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="text-sm font-bold text-ink uppercase tracking-wider truncate">
              Bestellen via WhatsApp
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-ink/10 border border-ink/15 text-zinc-300 hover:text-ink hover:bg-ink/20 transition-colors shrink-0"
            aria-label="Venster sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">

          {/* Step 1: Plan */}
          <div>
            <label className="text-xs font-bold text-[#B8790E] uppercase tracking-wider block mb-2.5">
              Welk abonnement?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRICING_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlanId === plan.id
                      ? 'clay-panel-accent text-ink'
                      : 'clay-card text-zinc-400 hover:text-ink'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-ink">{plan.name}</span>
                    {plan.bestValue && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#FF5C3A] text-[#FFF6EF]">
                        BEST
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-black text-[#B8790E]">€{plan.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* The message that will land in the chat */}
          <div className="p-4 rounded-2xl bg-[#1F0D18] border border-ink/10">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
              Dit bericht openen we in WhatsApp
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">"{message}"</p>
          </div>

          {/* Primary action */}
          <a
            href={whatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 text-sm font-extrabold text-[#FFFFFF] bg-[#25D366] rounded-2xl shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Verder in WhatsApp</span>
          </a>

          {/* The number itself, for anyone who'd rather save it */}
          <div className="p-4 rounded-2xl clay-card flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Onze WhatsApp-lijn</span>
              <span className="text-base font-bold text-ink tracking-wide">{WHATSAPP_DISPLAY}</span>
            </div>
            <button
              onClick={handleCopyNumber}
              className="shrink-0 px-3.5 py-2 text-xs font-bold text-zinc-200 border border-ink/15 rounded-xl hover:text-ink hover:bg-ink/5 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Gekopieerd' : 'Kopiëren'}
            </button>
          </div>

          {/* Reassurance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-zinc-400">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF5C3A] shrink-0" /> Actief in 5 minuten
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8790E] shrink-0" /> 24/7 antwoord
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" /> 7 dagen geld terug
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
