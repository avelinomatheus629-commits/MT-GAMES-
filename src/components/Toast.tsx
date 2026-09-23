import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141A2E] border border-purple-500/50 text-white shadow-2xl shadow-purple-950/80 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="text-xs sm:text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
