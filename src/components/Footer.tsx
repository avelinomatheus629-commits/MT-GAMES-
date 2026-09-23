import React from 'react';
import { Gamepad2, ShieldCheck, Heart, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/officialLinks';

interface FooterProps {
  onNavigate: (sectionId: string, category?: string) => void;
  onOpenPolicyModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicyModal }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    if (type === 'sobre') {
      onOpenPolicyModal(
        'Sobre Nós - MT Games',
        'A MT Games é apaixonada por videogames e tecnologia de ponta. Fundada com o objetivo de entregar a melhor experiência de compra gamer do Brasil, trabalhamos exclusivamente com consoles, jogos e acessórios 100% originais, lacrados e com garantia oficial de fábrica. Nosso compromisso é com a agilidade, segurança e satisfação de cada jogador.'
      );
    } else if (type === 'privacidade') {
      onOpenPolicyModal(
        'Política de Privacidade',
        'Seus dados pessoais são tratados com total sigilo e proteção, em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD). Utilizamos criptografia de ponta a ponta (SSL 256 bits) para processamento de pagamentos. Nunca vendemos ou compartilhamos suas informações com terceiros para fins publicitários.'
      );
    } else if (type === 'termos') {
      onOpenPolicyModal(
        'Termos de Uso',
        'Ao navegar e realizar compras em nossa plataforma, você concorda com nossos termos de prestação de serviços. Todos os preços e promoções estão sujeitos a disponibilidade de estoque e alteração sem aviso prévio. Garantimos a entrega de produtos autênticos com nota fiscal eletrônica.'
      );
    } else if (type === 'trocas') {
      onOpenPolicyModal(
        'Trocas e Devoluções',
        'Garantimos seu direito de arrependimento em até 7 (sete) dias corridos após o recebimento, com frete de devolução gratuito e estorno integral. Em caso de defeito de fabricação dentro do prazo de garantia legal ou contratual, oferecemos troca expressa ou assistência técnica autorizada.'
      );
    }
  };

  return (
    <footer id="contato" className="bg-[#06070B] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-950">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl text-white tracking-wider">
                  MT Games
                </span>
                <span className="text-[11px] text-purple-400 font-medium">
                  Seu universo gamer em um só lugar.
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sua loja online especializada em videogames de última geração, consoles lacrados, mídias físicas e periféricos de alta performance com envio seguro para todo o Brasil.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: <strong>(11) 96199-7080</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>E-mail: contato@mtgames.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Atendimento de Seg. a Sáb. das 09h às 20h</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos', 'Consoles')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Consoles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos', 'Jogos')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Jogos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos', 'Acessórios gamer')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Acessórios Gamer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ofertas-especiais')}
                  className="hover:text-amber-400 transition-colors text-left font-semibold text-amber-300"
                >
                  Ofertas Gamer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institucional & Políticas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#sobre"
                  onClick={(e) => handleLinkClick(e, 'sobre')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ofertas-especiais')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Ofertas
                </button>
              </li>
              <li>
                <a
                  href="#privacidade"
                  onClick={(e) => handleLinkClick(e, 'privacidade')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Política de privacidade
                </a>
              </li>
              <li>
                <a
                  href="#termos"
                  onClick={(e) => handleLinkClick(e, 'termos')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Termos de uso
                </a>
              </li>
              <li>
                <a
                  href="#trocas"
                  onClick={(e) => handleLinkClick(e, 'trocas')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Trocas e devoluções
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  onClick={() => onNavigate('contato')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Redes & Lojas Oficiais (Strictly with user provided links) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Redes & Marketplaces
            </h4>
            <ul className="space-y-2">
              {OFFICIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-purple-300 transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Payment Methods & Security Seals */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Payment Methods Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-slate-400 text-xs font-semibold mr-2">Formas de pagamento:</span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-bold text-emerald-400">
              PIX (5% OFF)
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-medium text-slate-300">
              Visa
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-medium text-slate-300">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-medium text-slate-300">
              Elo
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-medium text-slate-300">
              Hipercard
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131728] border border-slate-800 text-[11px] font-medium text-slate-300">
              Boleto Bancário
            </span>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente 100% Criptografado SSL</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {currentYear} MT Games - Todos os direitos reservados. CNPJ: 45.123.890/0001-92.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido para gamers exigentes</span>
            <Heart className="w-3 h-3 text-purple-500 fill-purple-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
