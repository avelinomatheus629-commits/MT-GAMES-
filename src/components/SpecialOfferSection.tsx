import React, { useState, useEffect } from 'react';
import { Clock, ShoppingCart, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { specialOfferImage } from '../data/products';
import { Product } from '../types';

interface SpecialOfferSectionProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  // Real JavaScript countdown timer targeting midnight / end of promotional cycle
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target end of current day (23:59:59)
      const target = new Date();
      target.setHours(23, 59, 59, 999);
      
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const offerProduct: Product = {
    id: 'special-bundle-ps5-pro',
    name: 'Mega Bundle Gamer PlayStation 5 Slim 1TB + 2 Jogos Blockbuster + DualSense Midnight',
    category: 'Consoles',
    originalPrice: 4799.00,
    promoPrice: 3699.00,
    discountPercent: 23,
    rating: 5.0,
    reviewsCount: 382,
    image: specialOfferImage,
    badge: 'Oferta Relâmpago',
    description: 'Edição definitiva com console PS5 Slim 1TB, 2 controles DualSense sem fio e 2 grandes sucessos em mídia física para começar a jogar com máxima imersão.',
    specs: {
      'Console': 'PS5 Slim 1TB SSD Ultra High Speed',
      'Controles': '2x DualSense (Branco Original + Midnight Black)',
      'Jogos Inclusos': 'Marvel Spider-Man 2 + God of War Ragnarök',
      'Garantia': '12 meses oficial Sony Brasil',
    },
    inStock: true,
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="ofertas-especiais" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#090A10] via-[#101424] to-[#090A10]">
      {/* Visual neon ambient background */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-700/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-700/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Pill */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold text-xs tracking-widest uppercase mb-3 shadow-md shadow-purple-900/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>OFERTA GAMER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Seu próximo jogo está aqui.
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Preço exclusivo do dia com frete expresso gratuito para todo o Brasil. Aproveite enquanto durar o lote promocional!
          </p>
        </div>

        {/* Hero Spotlight Card */}
        <div className="bg-[#121626]/90 border border-purple-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/40 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Product Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-[#0A0C14] border border-slate-700/70 aspect-[4/3] group">
                <img
                  src={specialOfferImage}
                  alt="Mega Bundle Gamer PS5 Slim com dois controles e jogos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-red-950 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ECONOMIA DE R$ 1.100,00</span>
                </div>
              </div>

              {/* Verified Trust Markers */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-[#161B2E] p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-xs font-bold text-white">100% Lacrado</span>
                  <span className="text-[10px] text-slate-400">Origem Sony Oficial</span>
                </div>
                <div className="bg-[#161B2E] p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-xs font-bold text-white">Garantia 1 Ano</span>
                  <span className="text-[10px] text-slate-400">Com Nota Fiscal</span>
                </div>
                <div className="bg-[#161B2E] p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-xs font-bold text-emerald-400">Frete Grátis</span>
                  <span className="text-[10px] text-slate-400">Envio Expresso</span>
                </div>
              </div>
            </div>

            {/* Right Column: Offer Details & Countdown Timer */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Edição Limitada · Apenas 7 unidades restantes
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1 leading-snug">
                  Mega Bundle PlayStation 5 Slim 1TB + 2 Jogos + DualSense Extra
                </h3>
              </div>

              {/* Functional JavaScript Countdown Timer */}
              <div className="p-4 rounded-2xl bg-[#0B0E1A] border border-purple-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Oferta expira em:</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="bg-[#181E33] border border-purple-600/40 text-white font-mono font-bold text-xl sm:text-2xl w-14 h-12 rounded-xl flex items-center justify-center tabular-nums shadow-inner">
                      {pad(timeLeft.hours)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase font-medium">Horas</span>
                  </div>
                  <span className="text-xl font-bold text-purple-400 mb-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="bg-[#181E33] border border-purple-600/40 text-white font-mono font-bold text-xl sm:text-2xl w-14 h-12 rounded-xl flex items-center justify-center tabular-nums shadow-inner">
                      {pad(timeLeft.minutes)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase font-medium">Minutos</span>
                  </div>
                  <span className="text-xl font-bold text-purple-400 mb-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="bg-[#181E33] border border-amber-500/60 text-amber-400 font-mono font-bold text-xl sm:text-2xl w-14 h-12 rounded-xl flex items-center justify-center tabular-nums shadow-inner">
                      {pad(timeLeft.seconds)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase font-medium">Segundos</span>
                  </div>
                </div>
              </div>

              {/* Price & Savings Display */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base line-through text-slate-400">
                    {formatCurrency(offerProduct.originalPrice)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    {offerProduct.discountPercent}% DE DESCONTO
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    {formatCurrency(offerProduct.promoPrice)}
                  </span>
                  <span className="text-xs sm:text-sm text-emerald-400 font-semibold">à vista no Pix</span>
                </div>

                <p className="text-xs text-slate-400">
                  ou até <strong className="text-slate-200">10x de {formatCurrency(offerProduct.promoPrice / 10)}</strong> sem juros no cartão de crédito
                </p>
              </div>

              {/* What comes in the box list */}
              <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Console PlayStation 5 Slim 1TB SSD com leitor de disco removível</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2 Controles sem fio DualSense com feedback háptico</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2 Jogos Físicos de Sucesso inclusos no pacote promocional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cabo HDMI 2.1 de ultra velocidade + Cabo de energia oficial</span>
                </li>
              </ul>

              {/* Buttons: Aproveitar oferta & Carrinho */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onBuyNow(offerProduct)}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-purple-950/70 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Zap className="w-5 h-5" />
                  <span>Aproveitar oferta</span>
                </button>

                <button
                  onClick={() => onAddToCart(offerProduct)}
                  className="py-4 px-5 rounded-xl bg-[#181E33] hover:bg-[#202845] border border-slate-700 hover:border-purple-500 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4 text-purple-400" />
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
