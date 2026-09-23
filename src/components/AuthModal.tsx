import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoggedIn(true);
    setTimeout(() => {
      onClose();
      setLoggedIn(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#0D101D] border border-purple-900/40 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {loggedIn ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Login realizado com sucesso!</h3>
            <p className="text-xs text-slate-400">Bem-vindo(a) de volta à sua conta gamer.</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-600/40 flex items-center justify-center mx-auto mb-3 text-purple-400">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white">
                {isRegister ? 'Criar Conta Gamer' : 'Entrar na Loja'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isRegister
                  ? 'Cadastre-se para acompanhar pedidos e receber ofertas'
                  : 'Acesse seus pedidos, cupons e lista de desejos'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full bg-[#121626] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-[#121626] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121626] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
              >
                <span>{isRegister ? 'Criar Minha Conta' : 'Acessar Conta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              {isRegister ? (
                <p>
                  Já tem uma conta?{' '}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-purple-400 hover:underline font-semibold"
                  >
                    Entrar agora
                  </button>
                </p>
              ) : (
                <p>
                  Ainda não tem conta?{' '}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-purple-400 hover:underline font-semibold"
                  >
                    Cadastre-se gratuitamente
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
