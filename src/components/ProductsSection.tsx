import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Star, ShoppingCart, Eye, Sparkles, Filter, ArrowUpDown } from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categoriesList: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  categoriesList,
  sortBy,
  onSortChange,
  searchQuery,
  onClearSearch,
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  return (
    <section id="produtos" className="py-16 bg-[#08090E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Catálogo Completo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Mais vendidos
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Os consoles mais procurados, lançamentos em mídia física e periféricos de elite para o seu setup.
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#121626] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="relevance" className="bg-[#121626]">Mais Populares</option>
                <option value="price_asc" className="bg-[#121626]">Menor Preço</option>
                <option value="price_desc" className="bg-[#121626]">Maior Preço</option>
                <option value="discount" className="bg-[#121626]">Maior Desconto</option>
                <option value="rating" className="bg-[#121626]">Melhores Avaliações</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#101320] border border-slate-800 rounded-xl">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Active Notification */}
        {searchQuery && (
          <div className="mb-6 p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between">
            <p className="text-xs text-purple-200">
              Mostrando resultados para: <strong className="text-white">"{searchQuery}"</strong> ({products.length} encontrados)
            </p>
            <button
              onClick={onClearSearch}
              className="text-xs text-purple-400 hover:text-white underline"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-[#101320] rounded-2xl border border-slate-800 p-8">
            <Filter className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhum produto encontrado</h3>
            <p className="text-sm text-slate-400 mb-4">
              Não encontramos produtos para os critérios de busca ou filtros selecionados.
            </p>
            <button
              onClick={() => {
                onClearSearch();
                onSelectCategory('Todos');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#101424] rounded-2xl border border-slate-800/90 hover:border-purple-600/50 hover:shadow-xl hover:shadow-purple-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top: Image & Badges */}
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0D18]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101424] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Discount percentage tag */}
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-purple-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md">
                    -{product.discountPercent}%
                  </span>

                  {/* Optional highlight badge */}
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => onQuickView(product)}
                    title="Visualização rápida"
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#0D101C]/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-purple-600 hover:border-purple-500 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body: Info & Prices */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category (unboxed metadata per design guidelines) */}
                    <div className="flex items-center gap-2 text-[11px] text-purple-400 font-bold uppercase tracking-wider mb-1.5">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400 font-normal">Pronta Entrega</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition-colors cursor-pointer line-clamp-2 mb-2.5"
                    >
                      {product.name}
                    </h3>

                    {/* Star Rating and Reviews */}
                    <div className="flex items-center gap-1.5 mb-4 text-xs">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold ml-1 text-slate-200">{product.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-500">({product.reviewsCount} avaliações)</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs line-through text-slate-500">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mt-0.5 mb-1">
                      <span className="text-2xl font-extrabold text-white font-display tabular-nums tracking-tight">
                        {formatCurrency(product.promoPrice)}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">à vista no Pix</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-4">
                      ou 10x de {formatCurrency(product.promoPrice / 10)} sem juros
                    </p>

                    {/* Action Buttons: Comprar & Adicionar ao carrinho */}
                    <div className="grid grid-cols-5 gap-2">
                      <button
                        onClick={() => onBuyNow(product)}
                        className="col-span-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <span>Comprar</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        title="Adicionar ao carrinho"
                        className="col-span-1 py-2.5 rounded-xl bg-[#181D30] hover:bg-[#222A46] border border-slate-700 hover:border-purple-500 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4 text-purple-400" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
