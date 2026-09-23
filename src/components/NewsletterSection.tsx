import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Por favor, digite um e-mail válido.');
      return;
    }

    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#08090E] via-[#0E1222] to-[#08090E] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-purple-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121626]/90 border border-purple-900/40 shadow-2xl text-center">
          
          <div className="w-12 h-12 rounded-2xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center mx-auto mb-4 text-purple-300">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Fique por dentro das novidades
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Receba ofertas, lançamentos e novidades do mundo gamer.
          </p>

          {submitted ? (
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold">
                Inscrição confirmada! Você receberá nossos cupons exclusivos.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#090B14] border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <span>Quero receber</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 text-left px-1">{error}</p>
              )}

              <p className="text-[11px] text-slate-400 text-center pt-2">
                Respeitamos sua privacidade. Cancele o recebimento quando quiser.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
