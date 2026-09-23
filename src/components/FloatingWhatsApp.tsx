import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Atendimento rápido via WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/5511961997080?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20produtos%20da%20loja%20gamer."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp (11) 96199-7080"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/70 hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-semibold">Tire dúvidas no WhatsApp</span>
        <span className="sm:hidden font-semibold">WhatsApp</span>
      </a>
    </aside>
  );
};
