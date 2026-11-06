import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 right-10 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-kiet-navy text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <span className="material-symbols-outlined text-kiet-cyan text-[20px]">
        check_circle
      </span>
      <span className="font-label-lg text-[13px] font-medium text-white tracking-wide">
        {message}
      </span>
    </div>
  );
};
