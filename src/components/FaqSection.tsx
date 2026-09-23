import React, { useState } from 'react';
import { FAQS } from '../data/products';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  // First item open by default for immediate affordance
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-[#0B0D18] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Respostas transparentes sobre envios, pagamentos, garantias e atendimento.
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#131728] border-purple-600/50 shadow-lg shadow-purple-950/20'
                    : 'bg-[#101322] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg bg-[#181D33] text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick WhatsApp Support Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-[#121626] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-sm">Ainda tem alguma dúvida?</h4>
            <p className="text-xs text-slate-400">Nosso time gamer está pronto para te responder no WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/5511961997080"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap shadow-md shadow-emerald-950"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp: (11) 96199-7080</span>
          </a>
        </div>

      </div>
    </section>
  );
};
