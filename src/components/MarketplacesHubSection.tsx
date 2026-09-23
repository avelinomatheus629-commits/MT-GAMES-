import React from 'react';
import { ExternalLink, ShoppingCart, MessageCircle, MapPin, Award, CheckCircle } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/officialLinks';

export const MarketplacesHubSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0B0E1A] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#121629] via-[#141A33] to-[#121629] border border-purple-900/40 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/50 text-xs font-semibold text-purple-300">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Canais Oficiais Verificados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Compre também em nossos canais parceiros e marketplaces
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Seja pelo nosso site próprio com desconto no Pix, ou pelos maiores marketplaces do Brasil com cupons da plataforma, estamos sempre prontos para te atender.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5511961997080"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atendimento WhatsApp (11) 96199-7080</span>
              </a>
            </div>
          </div>

          {/* Cards for all 7 channels with immediate redirection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0D101C] hover:bg-[#181D33] border border-slate-800 hover:border-purple-500/60 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                      {link.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {link.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-purple-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Canal Oficial</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-white font-medium underline underline-offset-2">
                    Acessar
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
