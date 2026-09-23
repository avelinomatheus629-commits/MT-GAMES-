import React from 'react';
import { Truck, ShieldCheck, CreditCard, Gamepad2 } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Frete rápido',
      description: 'Receba seus produtos com agilidade.',
      highlight: 'Envio no mesmo dia para pedidos até 14h',
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40',
      borderColor: 'border-purple-800/40',
    },
    {
      icon: ShieldCheck,
      title: 'Compra segura',
      description: 'Seus dados protegidos durante toda a compra.',
      highlight: 'Certificado SSL e checkout 100% criptografado',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40',
      borderColor: 'border-cyan-800/40',
    },
    {
      icon: CreditCard,
      title: 'Pagamento facilitado',
      description: 'Escolha a melhor forma de pagamento.',
      highlight: 'Pix com 5% de desconto ou até 12x no cartão',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-800/40',
    },
    {
      icon: Gamepad2,
      title: 'Produtos selecionados',
      description: 'Games e acessórios escolhidos para quem leva diversão a sério.',
      highlight: 'Origem oficial com garantia de fábrica',
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-800/40',
    },
  ];

  return (
    <section className="py-14 bg-[#0A0C16] border-y border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#121626] border ${item.borderColor} hover:border-slate-600 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
