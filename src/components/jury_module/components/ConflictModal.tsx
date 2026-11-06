import React, { useState } from 'react';

interface ConflictModalProps {
  isOpen: boolean;
  projectTitle: string;
  projectId: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  isOpen,
  projectTitle,
  projectId,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('Supervisory relationship with student/co-author');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card-surface rounded-[24px] max-w-lg w-full p-7 shadow-2xl border border-card-border flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-danger-bg text-danger-text flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">shield_person</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-[20px] font-semibold text-primary">
              Declare Conflict of Interest
            </h3>
            <p className="text-[13px] text-muted-text mt-0.5">
              {projectId} · {projectTitle}
            </p>
          </div>
        </div>

        <p className="text-[14px] text-on-surface-variant leading-relaxed">
          In accordance with KIET Academic Integrity Code, declaring a conflict will immediately excuse you from this evaluation panel and notify the FYP Coordinator for reassignment.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-on-surface">Reason for recusal</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-11 px-3 bg-surface-container border border-card-border rounded-xl text-[14px] text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange cursor-pointer"
          >
            <option>Supervisory relationship with student/co-author</option>
            <option>Direct relative or personal relationship</option>
            <option>Prior collaborative patent or research grant</option>
            <option>Departmental scheduling overlap</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-on-surface">Optional remarks for Coordinator</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Provide context or advise appropriate alternate specialization..."
            className="w-full h-20 p-3 bg-surface-container border border-card-border rounded-xl text-[13px] text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-5 rounded-xl border border-card-border bg-card-surface hover:bg-surface-container text-on-surface-variant text-[13px] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            className="h-11 px-5 rounded-xl bg-danger-text hover:bg-danger-text/90 text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Confirm & Excuse from Jury
          </button>
        </div>
      </div>
    </div>
  );
};
