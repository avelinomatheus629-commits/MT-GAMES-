import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { OfficialChannelsBar } from './components/OfficialChannelsBar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { SpecialOfferSection } from './components/SpecialOfferSection';
import { ProductsSection } from './components/ProductsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { MarketplacesHubSection } from './components/MarketplacesHubSection';
import { SocialProofSection } from './components/SocialProofSection';
import { NewsletterSection } from './components/NewsletterSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { AuthModal } from './components/AuthModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

const CART_STORAGE_KEY = 'gamer_store_cart_v1';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
    return [];
  });

  // Search, filter, and sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [policyModal, setPolicyModal] = useState({ isOpen: false, title: '', content: '' });

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3200);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`"${product.name.slice(0, 32)}..." adicionado ao carrinho!`);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removido do carrinho.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleApplyCoupon = (code: string) => {
    if (code === 'GAMER10') {
      setCouponCode('GAMER10');
      setCouponDiscount(10);
      showToast('Cupom GAMER10 aplicado! 10% de desconto.');
      return true;
    }
    if (code === 'PRIMEIRACOMPRA') {
      setCouponCode('PRIMEIRACOMPRA');
      setCouponDiscount(15);
      showToast('Cupom PRIMEIRACOMPRA aplicado! 15% de desconto.');
      return true;
    }
    return false;
  };

  // Build unique categories list
  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(PRODUCTS.map((p) => p.category)));
    return ['Todos', ...cats];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'Todos') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          Object.values(p.specs).some((val) => val.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.promoPrice - b.promoPrice);
        break;
      case 'price_desc':
        result.sort((a, b) => b.promoPrice - a.promoPrice);
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'relevance':
      default:
        // Featured products first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Official Verified Marketplaces & Channels Bar */}
      <OfficialChannelsBar />

      {/* Main Header / Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection('produtos');
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero / Primeira Seção */}
        <HeroSection
          onBuyNow={() => scrollToSection('produtos')}
          onExploreProducts={() => scrollToSection('categorias')}
          onSpecialOfferClick={() => scrollToSection('ofertas-especiais')}
        />

        {/* 2. Categorias ("Encontre seu próximo jogo") */}
        <CategoriesSection
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
            scrollToSection('produtos');
          }}
        />

        {/* 3. Oferta Especial ("OFERTA GAMER" com contador regressivo JS) */}
        <SpecialOfferSection
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* 4. Produtos em Destaque ("Mais vendidos" com filtros e busca) */}
        <ProductsSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoriesList={categoriesList}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={setQuickViewProduct}
        />

        {/* 5. Benefícios da Loja */}
        <BenefitsSection />

        {/* 6. Hub Oficial de Marketplaces & Redes Sociais */}
        <MarketplacesHubSection />

        {/* 7. Prova Social ("O que nossos clientes dizem") */}
        <SocialProofSection />

        {/* 8. Newsletter ("Fique por dentro das novidades") */}
        <NewsletterSection />

        {/* 9. Perguntas Frequentes (FAQ Expansível) */}
        <FaqSection />
      </main>

      {/* Rodapé Profissional */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPolicyModal={(title, content) =>
          setPolicyModal({ isOpen: true, title, content })
        }
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        couponDiscount={couponDiscount}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        couponDiscount={couponDiscount}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Informational / Policy Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ ...policyModal, isOpen: false })}
        title={policyModal.title}
        content={policyModal.content}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

    </div>
  );
}
