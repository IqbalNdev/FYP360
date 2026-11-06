import React from 'react';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F52]/50 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[24px] max-w-3xl w-full p-6 shadow-2xl border border-[#E2E8F0] z-10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">
                picture_as_pdf
              </span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#002D71]">
                {documentTitle}
              </h2>
              <p className="text-xs text-[#475569]">
                Official submission deliverable · 24 pages · Turnitin index 4%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Downloading ${documentTitle}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#002D71] hover:bg-slate-50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                download
              </span>
              <span>Download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:bg-slate-100 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Mock PDF Document Page Preview */}
        <div className="flex-1 overflow-y-auto bg-[#F4F6F9] p-6 rounded-xl border border-[#E2E8F0] flex flex-col items-center custom-scroll max-h-[60vh]">
          <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 border border-[#E2E8F0] text-[#1E293B] flex flex-col gap-5">
            <div className="border-b border-slate-200 pb-4 text-center">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#475569]">
                KIET Group of Institutions · Department of Computer Science
              </span>
              <h1 className="text-xl font-bold text-[#002D71] mt-2">
                System Architecture & Database Specification
              </h1>
              <p className="text-xs text-[#475569] mt-1">
                Final Year Project Technical Deliverable (FYP1 — Milestone 3)
              </p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#475569]">
              <h2 className="text-sm font-semibold text-[#002D71] border-b border-slate-100 pb-1">
                1. System Architecture Overview
              </h2>
              <p className="text-[#1E293B]">
                The system follows a decoupled microservice-ready modular architecture utilizing React 19 for the student web interface, FastAPI as the high-throughput asynchronous application gateway, and PostgreSQL as the primary relational persistence layer.
              </p>

              {/* Architecture Diagram Mockup */}
              <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-lg my-3 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-4 w-full">
                  <div className="px-3 py-2 bg-[#E0F2FE] border border-[#01B0F1]/40 rounded text-center text-[11px] font-semibold text-[#002D71]">
                    Client Web UI (React)
                  </div>
                  <span className="text-[#475569]">⇄</span>
                  <div className="px-3 py-2 bg-[#FFF4EB] border border-[#FD7A12]/30 rounded text-center text-[11px] font-semibold text-[#FD7A12]">
                    REST & WebSocket Gateway
                  </div>
                  <span className="text-[#475569]">⇄</span>
                  <div className="px-3 py-2 bg-[#DCFCE7] border border-[#16A34A]/30 rounded text-center text-[11px] font-semibold text-[#16A34A]">
                    Inference & PostgreSQL
                  </div>
                </div>
                <span className="text-[10px] text-[#475569] italic mt-1">
                  Figure 1.1: Multi-tiered High-Level Data Flow Topology
                </span>
              </div>

              <h2 className="text-sm font-semibold text-[#002D71] border-b border-slate-100 pb-1 mt-4">
                2. Relational Entity Relationship & Schema
              </h2>
              <p className="text-[#1E293B]">
                Strict third-normal-form (3NF) relational tables encompass StudentProfiles, CareerPaths, AcademicTranscripts, SkillMatrices, and RecommendedMilestones with indexed foreign key relationships.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-[#475569]">
              <span>Team Lead: Ayesha Khan (2021-CS-042)</span>
              <span>Page 1 of 24</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              verified
            </span>
            Originality verified by KIET Turnitin institutional license (4%)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 h-10 rounded-xl bg-[#002D71] hover:bg-[#003B8F] text-white text-xs font-semibold cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
