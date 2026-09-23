import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRight, Flame } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (category: typeof CATEGORIES[0]) => {
    if (category.id === 'ofertas') {
      const offerSection = document.getElementById('ofertas-especiais');
      if (offerSection) {
        offerSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onSelectCategory(category.name);
    const catalog = document.getElementById('produtos');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-16 bg-[#0B0D17] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>Navegue por Departamentos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Encontre seu próximo jogo
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Selecione uma categoria para conferir os melhores preços, lançamentos e periféricos para elevar seu gameplay.
          </p>
        </div>

        {/* Categories Grid (7 cards as requested) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => {
            const isOffer = cat.id === 'ofertas';

            return (
              <div
                key={cat.id}
                className={`relative group rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 border ${
                  isOffer
                    ? 'bg-gradient-to-b from-amber-950/30 to-[#141829] border-amber-600/40 hover:border-amber-400'
                    : 'bg-[#121626] border-slate-800/90 hover:border-purple-600/60 hover:shadow-lg hover:shadow-purple-950/40 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1A2035] border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {isOffer ? <Flame className="w-6 h-6 text-amber-400" /> : cat.icon}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{cat.count}</span>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                    {cat.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Explore Action Button */}
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isOffer
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-950'
                      : 'bg-[#1A2035] hover:bg-purple-600 text-slate-200 hover:text-white border border-slate-700/80 hover:border-purple-500'
                  }`}
                >
                  <span>Explorar</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
