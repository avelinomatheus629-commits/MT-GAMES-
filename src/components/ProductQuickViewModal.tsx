import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Check, Zap } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0D101D] border border-purple-900/40 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#080A12] aspect-square md:aspect-auto flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[320px] w-full object-contain rounded-xl"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
              -{product.discountPercent}% OFF
            </span>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-emerald-400">Em Estoque</span>
              </div>

              <h3 className="font-bold text-lg text-white leading-snug">
                {product.name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-300 font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-slate-500">({product.reviewsCount} avaliações)</span>
              </div>

              {/* Pricing */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-xs line-through text-slate-500">
                  {formatCurrency(product.originalPrice)}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white font-display tabular-nums">
                    {formatCurrency(product.promoPrice)}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">à vista no Pix</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  ou 10x de {formatCurrency(product.promoPrice / 10)} sem juros
                </p>
              </div>

              {/* Specs */}
              <div className="mt-4 space-y-1 text-xs text-slate-300">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-medium text-white text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onBuyNow(product);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Comprar Agora</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-[#161B2E] border border-slate-700 hover:border-purple-500 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-purple-400" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
