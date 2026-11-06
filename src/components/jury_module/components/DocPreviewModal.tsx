import React from 'react';
import { ProjectDocument } from '../types';

interface DocPreviewModalProps {
  doc: ProjectDocument | null;
  onClose: () => void;
}

export const DocPreviewModal: React.FC<DocPreviewModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card-surface rounded-[24px] max-w-2xl w-full p-6 shadow-2xl border border-card-border flex flex-col gap-4 max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                {doc.type === 'repo' ? 'code' : 'description'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] font-semibold text-primary">
                {doc.name}
              </span>
              <span className="text-[12px] text-muted-text">{doc.size} · {doc.date}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-muted-text transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Document Content Simulation */}
        <div className="bg-surface-container border border-card-border rounded-xl p-6 overflow-y-auto font-mono text-[13px] leading-relaxed text-on-surface-variant flex flex-col gap-4 custom-scroll">
          <div className="flex items-center justify-between border-b border-dashed border-outline-variant pb-2 text-[11px] text-muted-text">
            <span>KIET EXAMINATION ARCHIVE // DEFENSE DOSSIER</span>
            <span>VERIFIED DIGITAL WATERMARK</span>
          </div>

          <div className="text-[14px] font-sans font-medium text-primary">
            Document Executive Abstract & Verification Header
          </div>

          <p className="font-sans text-[13px] text-on-surface">
            Official submission under KIET Capstone Defense Guidelines. All benchmarks, architecture specifications, dataset descriptions, and algorithmic formulation have been verified by the respective supervisor and archived for jury evaluation.
          </p>

          <div className="bg-card-surface p-4 rounded-lg border border-card-border font-mono text-[12px] text-muted-text flex flex-col gap-1">
            <div>SHA256: 4b29f0e19a6d0c9e782f913d09a25b12847c13a0e1</div>
            <div>File Status: Institutional Approved (Version Locked)</div>
            <div>Access Level: Authorized FYP Defense Jury Only</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] text-muted-text flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            Watermarked with Juror ID: FAC-SE-2018-019
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-card-border bg-card-surface text-on-surface-variant text-[13px] font-medium hover:bg-surface-container transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="h-10 px-4 rounded-xl bg-kiet-navy text-white text-[13px] font-medium hover:bg-sidebar-navy-gradient transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-kiet-cyan">download</span>
              <span>Download file</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
