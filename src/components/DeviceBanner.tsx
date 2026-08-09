import React, { useState } from 'react';
import { DEVICE_CATEGORIES } from '../data/iptvData';
import { Tv, Tv2, Smartphone, Laptop, Box, Monitor, CheckCircle2, Download } from 'lucide-react';
import { whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface DeviceBannerProps {
  onOpenOrderModal: (planId?: string) => void;
}

export const DeviceBanner: React.FC<DeviceBannerProps> = ({ onOpenOrderModal }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState('firestick');

  const selectedDevice = DEVICE_CATEGORIES.find(d => d.id === selectedDeviceId) || DEVICE_CATEGORIES[0];

  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'Tv2': return <Tv2 className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      case 'Box': return <Box className="w-6 h-6" />;
      case 'Monitor': return <Monitor className="w-6 h-6" />;
      default: return <Tv className="w-6 h-6" />;
    }
  };

  return (
    <section id="devices" className="relative z-10 py-16 border-y border-ink/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#B8790E] uppercase tracking-widest bg-[#FF5C3A]/10 px-3 py-1 rounded-full border border-[#FF5C3A]/30">
            WERKT OP ALLES
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Feilloos op <span className="text-[#B8790E]">al je apparaten</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Geniet van volledig 4K-streamen zonder extra hardware te kopen. BEEHOSTER werkt naadloos met alle bekende smart-tv's, streaming sticks en mediaspelers.
          </p>
        </div>

        {/* Device Badges Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {DEVICE_CATEGORIES.map((device) => {
            const isSelected = device.id === selectedDeviceId;
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDeviceId(device.id)}
                className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 relative ${
                  isSelected
                    ? 'clay-panel-accent text-ink translate-y-[-2px]'
                    : 'clay-card text-zinc-400 hover:text-ink'
                }`}
              >
                {device.badge && (
                  <span className="absolute -top-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FF5C3A] text-[#FFF6EF] shadow-md">
                    {device.badge}
                  </span>
                )}
                
                <div className={`p-3 rounded-xl mb-3 ${isSelected ? 'bg-[#FF5C3A] text-[#FFF6EF]' : 'bg-ink/8 text-zinc-300'}`}>
                  {getDeviceIcon(device.icon)}
                </div>

                <span className="text-xs sm:text-sm font-bold tracking-tight text-ink mb-1">
                  {device.name}
                </span>
                
                <span className="text-[11px] text-zinc-500 line-clamp-1">
                  {device.recommendedApps[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Device Deep Info Card */}
        <div className="relative clay-card clay-edge rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#FF5C3A]/20 text-[#B8790E] border border-[#FF5C3A]/40">
                  {getDeviceIcon(selectedDevice.icon)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink">{selectedDevice.name}</h3>
                  <p className="text-xs text-[#FF5C3A] font-medium">In 3 minuten ingesteld</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedDevice.description}
              </p>

              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Aanbevolen IPTV-apps:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDevice.recommendedApps.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 rounded-xl bg-ink/6 text-xs font-semibold text-zinc-200 border border-ink/10 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-ink/5 border border-ink/10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF5C3A]/10 flex items-center justify-center text-[#B8790E] mb-3">
                <Download className="w-6 h-6 text-[#FF5C3A]" />
              </div>
              <h4 className="text-base font-bold text-ink">Hulp nodig bij de installatie?</h4>
              <p className="text-xs text-zinc-400 mt-1 mb-4">
                Stuur ons een bericht — we lopen de installatie op je {selectedDevice.name} stap voor stap met je door.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <a
                  href={whatsAppLink(`Hoi BEEHOSTER! Ik heb hulp nodig bij de installatie op mijn ${selectedDevice.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-xs font-semibold text-zinc-100 clay-card hover:border-ink/30 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Installatiehulp</span>
                </a>
                <button
                  onClick={() => onOpenOrderModal('plan-12m')}
                  className="w-full py-2.5 text-xs font-bold text-[#FFF6EF] accent-button-gradient rounded-xl shadow-md"
                >
                  Nu starten
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
