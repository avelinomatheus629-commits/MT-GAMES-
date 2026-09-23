import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck, Sparkles, Flame } from 'lucide-react';
import { heroImage } from '../data/products';

interface HeroSectionProps {
  onBuyNow: () => void;
  onExploreProducts: () => void;
  onSpecialOfferClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuyNow,
  onExploreProducts,
  onSpecialOfferClick,
}) => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background ambient neon glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141828] border border-purple-800/40 text-xs font-semibold text-purple-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sua Loja Gamer Oficial · Produtos Lacrados com Garantia Nacional</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              O próximo nível da sua diversão começa aqui.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Consoles, jogos e acessórios para transformar sua experiência gamer. As melhores marcas com envio expresso para todo o Brasil.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBuyNow}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-lg shadow-purple-950/60 hover:shadow-purple-700/50 transition-all cursor-pointer active:scale-98"
              >
                <span>Comprar agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#131726] hover:bg-[#1A2035] border border-slate-700 hover:border-purple-500/60 text-slate-200 hover:text-white font-semibold text-base transition-all cursor-pointer active:scale-98"
              >
                <span>Explorar produtos</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Frete Expresso</p>
                  <p className="text-slate-400 text-[11px]">Envio em até 24h</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">100% Original</p>
                  <p className="text-slate-400 text-[11px]">Nota Fiscal & Garantia</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Até 12x Sem Juros</p>
                  <p className="text-slate-400 text-[11px]">Ou 5% OFF no Pix</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Card with High-Res Generated Image & Live Offer Spotlight */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 bg-[#121626] shadow-2xl shadow-purple-950/50 group">
              
              {/* Image Container with Fallback Protection */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-900">
                <img
                  src={heroImage}
                  alt="Setup gamer profissional com consoles e periféricos de última geração"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/20 to-transparent" />
              </div>

              {/* Floating Highlight Banner */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-purple-500/40 text-xs font-bold text-purple-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Destaque da Temporada</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white font-extrabold text-xs shadow-md">
                  Pronta Entrega
                </span>
              </div>

              {/* Interactive Offer Spotlight Strip */}
              <div className="p-5 bg-gradient-to-b from-[#121626] to-[#0D101C] border-t border-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-purple-300 font-semibold tracking-wide uppercase">
                      Oferta Especial do Dia
                    </p>
                    <h3 className="text-base font-bold text-white truncate">
                      PlayStation 5 Slim + Controle Extra
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm line-through text-slate-500">R$ 3.999,00</span>
                      <span className="text-lg font-extrabold text-emerald-400 tabular-nums">R$ 3.299,00</span>
                      <span className="text-[11px] font-bold text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-700/50">
                        18% OFF
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onSpecialOfferClick}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-950 transition-all cursor-pointer"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
