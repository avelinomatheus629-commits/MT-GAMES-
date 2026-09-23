import React, { useState } from 'react';
import { ShoppingBag, Search, User, Sparkles, Menu, X, Gamepad2, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0C14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wider group-hover:text-purple-300 transition-colors">
                  MT Games
                </span>
                <span className="text-[10px] text-purple-300/80 font-medium tracking-wide uppercase">
                  Seu universo gamer
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('inicio')}
              className="hover:text-purple-400 transition-colors py-1 hover:underline underline-offset-8"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Consoles')}
              className="hover:text-purple-400 transition-colors py-1 hover:underline underline-offset-8"
            >
              Consoles
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Jogos')}
              className="hover:text-purple-400 transition-colors py-1 hover:underline underline-offset-8"
            >
              Jogos
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Acessórios gamer')}
              className="hover:text-purple-400 transition-colors py-1 hover:underline underline-offset-8"
            >
              Acessórios
            </button>
            <button
              onClick={() => handleNavClick('ofertas-especiais')}
              className="text-amber-400 hover:text-amber-300 transition-colors py-1 flex items-center gap-1 font-semibold"
            >
              <span>Ofertas</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>
            <button
              onClick={() => handleNavClick('contato')}
              className="hover:text-purple-400 transition-colors py-1 hover:underline underline-offset-8"
            >
              Contato
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-md mx-2">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  const catalog = document.getElementById('produtos');
                  if (catalog && e.target.value.length > 1) {
                    catalog.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder="O que você está procurando?"
                className="w-full bg-[#121624] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Action Zone: Entrar, Ver Ofertas, Carrinho, Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Login Button */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>Entrar</span>
            </button>

            {/* Ver Ofertas CTA */}
            <button
              onClick={() => handleNavClick('ofertas-especiais')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-md shadow-purple-900/40 hover:shadow-purple-700/50 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver ofertas</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir carrinho de compras"
              className="relative p-2.5 rounded-xl bg-[#141828] border border-slate-700/70 hover:border-purple-500 text-slate-200 hover:text-white transition-all cursor-pointer group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-[11px] h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow-lg shadow-purple-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
              className="p-2.5 rounded-xl bg-[#141828] border border-slate-700/70 text-slate-200 lg:hidden hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Field */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="O que você está procurando?"
              className="w-full bg-[#121624] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D101C] border-b border-slate-800 px-6 py-5 space-y-4">
          <div className="flex flex-col gap-2 font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Início</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Consoles')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Consoles</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Jogos')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Jogos</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('produtos', 'Acessórios gamer')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Acessórios</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('ofertas-especiais')}
              className="flex items-center justify-between p-2 rounded-lg bg-purple-950/40 text-amber-300 font-semibold text-left"
            >
              <span>Ofertas Especiais</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Dúvidas Frequentes (FAQ)</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('contato')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left"
            >
              <span>Contato & Suporte</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-200 font-medium flex items-center justify-center gap-2 hover:bg-slate-800"
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>Entrar na Minha Conta</span>
            </button>
            <button
              onClick={() => handleNavClick('ofertas-especiais')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-900/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ver Ofertas Gamer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
