import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/formatters';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => boolean;
  couponDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  couponCode,
  onApplyCoupon,
  couponDiscount,
}) => {
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.promoPrice * item.quantity,
    0
  );

  const discountAmount = (subtotal * couponDiscount) / 100;
  const freeShippingThreshold = 299.00;
  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = subtotal === 0 || hasFreeShipping ? 0 : 29.90;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;

    const success = onApplyCoupon(inputCoupon.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setInputCoupon('');
    } else {
      setCouponError('Cupom inválido. Tente usar "GAMER10"');
    }
  };

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D101C] border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#111526]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white text-base">Seu Carrinho Gamer</h3>
              <span className="text-xs bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)} itens
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-[#141829] border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Truck className="w-4 h-4 text-cyan-400" />
                {hasFreeShipping ? (
                  <strong className="text-emerald-400">Você ganhou Frete Grátis! 🎉</strong>
                ) : (
                  <span>
                    Faltam <strong className="text-purple-300">{formatCurrency(freeShippingThreshold - subtotal)}</strong> para Frete Grátis
                  </span>
                )}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#161B2E] border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Seu carrinho está vazio</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Explore nossos consoles, jogos e periféricos e adicione itens para começar a jogar!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
                >
                  Ver Produtos
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-[#121626] border border-slate-800 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0 border border-slate-700"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white text-xs leading-snug truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[10px] text-purple-400 uppercase font-semibold mt-0.5">
                      {item.product.category}
                    </p>
                    <p className="font-extrabold text-white text-sm mt-1 tabular-nums">
                      {formatCurrency(item.product.promoPrice)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg bg-[#0B0D17]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-200 tabular-nums">
                      {formatCurrency(item.product.promoPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#111526] border-t border-slate-800 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {couponDiscount > 0 ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      Cupom <strong>{couponCode}</strong> aplicado ({couponDiscount}% OFF)
                    </span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      -{formatCurrency(discountAmount)}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Cupom: tente GAMER10"
                      className="flex-1 bg-[#0A0C16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 uppercase focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-[#1D243A] hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium tabular-nums">{formatCurrency(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto do cupom ({couponDiscount}%):</span>
                    <span className="font-medium tabular-nums">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete estimado:</span>
                  <span className="text-white font-medium">
                    {hasFreeShipping ? (
                      <strong className="text-emerald-400">Grátis</strong>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total:</span>
                  <span className="text-lg font-extrabold text-emerald-400 font-display tabular-nums">
                    {formatCurrency(total)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 text-right">
                  ou 10x de {formatCurrency(total / 10)} sem juros
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-purple-950/60 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Finalizar compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compra 100% protegida com envio assegurado</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
