import React from 'react';
import { OFFICIAL_LINKS } from '../data/officialLinks';
import { ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

export const OfficialChannelsBar: React.FC = () => {
  return (
    <div className="bg-[#0D101C] border-b border-purple-950/40 py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-medium text-slate-200">Lojas Oficiais & Canais Verificados:</span>
          <span className="hidden lg:inline text-slate-400">Compre com segurança em nossos marketplaces ou fale direto no WhatsApp</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {OFFICIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Acessar ${link.name} oficial`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#161B2B] hover:bg-purple-900/40 text-slate-300 hover:text-purple-300 border border-slate-800/80 hover:border-purple-600/50 transition-all font-medium group"
            >
              {link.id === 'googlemaps' ? (
                <MapPin className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
              ) : null}
              <span>{link.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
