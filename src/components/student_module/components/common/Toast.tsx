import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        let borderColor = 'border-emerald-200';
        let bgColor = 'bg-white';

        if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#FD7A12] shrink-0" />;
          borderColor = 'border-amber-200';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-[#C2392F] shrink-0" />;
          borderColor = 'border-rose-200';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-[#01B0F1] shrink-0" />;
          borderColor = 'border-sky-200';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border ${borderColor} ${bgColor} shadow-lg shadow-slate-900/5 transition-all duration-200`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium text-slate-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
