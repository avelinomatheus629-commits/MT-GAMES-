import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#08090E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-400" />
            <span>Avaliações Reais de Compradores</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Veja a experiência de quem já equipou o setup conosco e recebeu consoles e jogos com total tranquilidade.
          </p>
        </div>

        {/* 4 Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#111524] border border-slate-800 hover:border-purple-600/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{review.name}</span>
                    {review.verified && (
                      <span title="Comprador verificado" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block">{review.location}</span>
                  <span className="text-[10px] text-purple-300 font-medium block truncate max-w-[170px]">
                    Comprou: {review.productPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
