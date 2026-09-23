import React, { useState } from 'react';
import { CartItem, OrderCustomerInfo } from '../types';
import { formatCurrency, formatCPF, formatPhone, formatCEP } from '../utils/formatters';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, FileText, ArrowRight, Copy, Check, MessageCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  couponDiscount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  couponDiscount,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: 'SP',
    paymentMethod: 'pix',
    installments: 1,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.promoPrice * item.quantity,
    0
  );
  const discountAmount = (subtotal * couponDiscount) / 100;
  const shippingCost = subtotal >= 299 ? 0 : 29.90;
  const pixDiscount = formData.paymentMethod === 'pix' ? (subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal - discountAmount - pixDiscount + shippingCost);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Nome completo é obrigatório';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'E-mail válido é obrigatório';
    if (!formData.cpf.trim() || formData.cpf.length < 11) errors.cpf = 'CPF válido é obrigatório';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Telefone para contato é obrigatório';
    if (!formData.zipCode.trim() || formData.zipCode.length < 8) errors.zipCode = 'CEP válido é obrigatório';
    if (!formData.street.trim()) errors.street = 'Endereço de entrega é obrigatório';
    if (!formData.number.trim()) errors.number = 'Número é obrigatório';
    if (!formData.city.trim()) errors.city = 'Cidade é obrigatória';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate real-looking random order ID
    const generatedOrder = `MT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    onClearCart();
  };

  const fakePixCode = `00020126580014br.gov.bcb.pix0136e4f30129-92c1-4ba2-8022-491290342302520400005303986540${total.toFixed(2)}5802BR5915MT GAMES LTDA6009SAO PAULO62070503***6304E8F2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(fakePixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de realizar o pedido #${orderNumber} no site no valor de ${formatCurrency(total)}. Gostaria de confirmar meu pedido!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0D101D] border border-purple-900/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-[#111528] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                {step === 'form' ? 'Checkout Seguro' : 'Pedido Confirmado!'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 'form' ? 'Preencha seus dados para entrega e selecione a forma de pagamento' : 'Parabéns pela sua compra! Seu universo gamer está a caminho.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleFinishOrder} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Dados do Cliente */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Dados Pessoais & Contato</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Matheus Avelino"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">E-mail para Confirmação *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@exemplo.com"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.email && <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CPF *</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.cpf && <p className="text-[11px] text-red-400 mt-1">{formErrors.cpf}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Celular *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    placeholder="(11) 90000-0000"
                    maxLength={15}
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.phone && <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Endereço de Entrega */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Endereço de Entrega</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CEP *</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: formatCEP(e.target.value) })}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.zipCode && <p className="text-[11px] text-red-400 mt-1">{formErrors.zipCode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Logradouro / Rua *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="Ex: Av. Paulista"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.street && <p className="text-[11px] text-red-400 mt-1">{formErrors.street}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Número *</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="Ex: 1000"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.number && <p className="text-[11px] text-red-400 mt-1">{formErrors.number}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Complemento</label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    placeholder="Apto 42, Bloco B"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cidade *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="São Paulo"
                    className="w-full bg-[#141829] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.city && <p className="text-[11px] text-red-400 mt-1">{formErrors.city}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Forma de Pagamento */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Forma de Pagamento</span>
              </h4>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    formData.paymentMethod === 'pix'
                      ? 'bg-purple-950/50 border-purple-500 text-white shadow-md'
                      : 'bg-[#121626] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">Pix Instantâneo</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">5% de Desconto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    formData.paymentMethod === 'credit_card'
                      ? 'bg-purple-950/50 border-purple-500 text-white shadow-md'
                      : 'bg-[#121626] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold">Cartão de Crédito</span>
                  <span className="text-[10px] text-slate-400">Até 12x Sem Juros</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'boleto' })}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    formData.paymentMethod === 'boleto'
                      ? 'bg-purple-950/50 border-purple-500 text-white shadow-md'
                      : 'bg-[#121626] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold">Boleto Bancário</span>
                  <span className="text-[10px] text-slate-400">Vencimento 3 dias</span>
                </button>
              </div>

              {/* Conditional Payment Details */}
              {formData.paymentMethod === 'pix' && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300">
                  <p className="font-bold text-emerald-400 mb-1">Aprovação imediata no Pix!</p>
                  <p>Após clicar em Finalizar Pedido, o QR Code e o código Pix Copia e Cola serão disponibilizados instantaneamente.</p>
                </div>
              )}

              {formData.paymentMethod === 'credit_card' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#121626] border border-slate-800">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-[#0A0C16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Validade (MM/AA)</label>
                    <input
                      type="text"
                      placeholder="12/29"
                      className="w-full bg-[#0A0C16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      className="w-full bg-[#0A0C16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary in Checkout */}
            <div className="p-4 rounded-xl bg-[#111526] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} itens):</span>
                <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto de Cupom:</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              {pixDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto 5% Pix:</span>
                  <span>-{formatCurrency(pixDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Frete:</span>
                <span className="text-white font-medium">{shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Valor Final:</span>
                <span className="text-emerald-400 text-lg tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-purple-950/70 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Confirmar e Finalizar Pedido</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          /* Step 2: Confirmation / Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                Pedido Gerado com Sucesso
              </span>
              <h4 className="text-2xl font-display font-extrabold text-white mt-1">
                {orderNumber}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Enviamos os detalhes da confirmação e rastreamento para <strong>{formData.email || 'seu e-mail'}</strong>.
              </p>
            </div>

            {/* Pix code if Pix selected */}
            {formData.paymentMethod === 'pix' && (
              <div className="p-5 rounded-2xl bg-[#121626] border border-slate-800 max-w-md mx-auto space-y-4">
                <p className="text-xs font-bold text-white">Código Pix Copia e Cola:</p>
                <div className="bg-[#0A0C16] p-3 rounded-xl border border-slate-700 text-[11px] font-mono text-slate-300 break-all text-left">
                  {fakePixCode}
                </div>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix'}</span>
                </button>
              </div>
            )}

            {/* WhatsApp confirmation direct button */}
            <div className="max-w-md mx-auto space-y-3">
              <a
                href={`https://wa.me/5511961997080?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar Pedido via WhatsApp (11) 96199-7080</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#181D33] hover:bg-[#222A46] text-slate-200 font-semibold text-xs border border-slate-700"
              >
                Continuar Navegando na Loja
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
