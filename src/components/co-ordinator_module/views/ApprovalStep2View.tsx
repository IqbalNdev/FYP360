import React, { useState } from 'react';
import { AppView, ProposalItem } from '../types';

interface ApprovalStep2ViewProps {
  onNavigate: (view: AppView) => void;
  proposal?: ProposalItem;
  onShowToast?: (message: string) => void;
}

export const ApprovalStep2View: React.FC<ApprovalStep2ViewProps> = ({ onNavigate, proposal, onShowToast }) => {
  const [selectedJury, setSelectedJury] = useState<number[]>([1, 2]); // Dr. Sana Farooq and Dr. Imran Qureshi selected initially
  const [ackConflict3, setAckConflict3] = useState(false);

  const toggleMember = (id: number) => {
    if (selectedJury.includes(id)) {
      setSelectedJury(selectedJury.filter((x) => x !== id));
      if (id === 3) setAckConflict3(false);
    } else {
      if (id === 3) {
        setAckConflict3(true);
      }
      setSelectedJury([...selectedJury, id]);
    }
  };

  const handleAckConflictChange = (checked: boolean) => {
    setAckConflict3(checked);
    if (checked) {
      if (!selectedJury.includes(3)) {
        setSelectedJury([...selectedJury, 3]);
      }
    } else {
      setSelectedJury(selectedJury.filter((x) => x !== 3));
    }
  };

  const isComplete = selectedJury.length === 3;

  return (
    <div className="flex flex-col w-full pb-32 max-w-[940px] mx-auto">
      {/* Stepper Navigation */}
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#E2E8F0] mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 rounded-full bg-[#FFF1E5] flex items-center justify-center text-[#FD7A12]">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check
            </span>
          </div>
          <span className="font-label-lg text-[#002D71] font-medium text-xs sm:text-sm">
            1 Supervisor
          </span>
        </div>

        <div className="h-px w-8 sm:w-12 bg-[#e3e2e5]"></div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 rounded-full bg-[#FD7A12] flex items-center justify-center text-white font-bold text-xs">
            2
          </div>
          <span className="font-label-lg text-[#002D71] font-bold text-xs sm:text-sm">2 Jury</span>
          <span className="w-2 h-2 rounded-full bg-[#FD7A12] animate-pulse"></span>
        </div>

        <div className="h-px w-8 sm:w-12 bg-[#e3e2e5]"></div>

        <div className="flex items-center gap-2 sm:gap-3 opacity-60">
          <div className="w-7 h-7 rounded-full bg-[#e3e2e5] flex items-center justify-center text-[#64748B] font-bold text-xs">
            3
          </div>
          <span className="font-label-lg text-[#64748B] font-medium text-xs sm:text-sm">
            3 Timeline &amp; confirm
          </span>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="space-y-1">
          <span className="font-eyebrow text-[#FD7A12] tracking-wider uppercase block text-xs font-bold">
            APPROVAL · STEP 2 OF 3
          </span>
          <h1 className="font-headline-lg text-[#164783] text-[32px] sm:text-[36px] font-light tracking-tight leading-tight">
            Assign the jury
          </h1>
          <p className="font-body-md text-[#64748B] text-sm">
            Select 3 jury members. Conflict checks run automatically.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#FFF1E5] px-4 py-1.5 rounded-full text-[#FD7A12] self-start md:self-auto border border-[#FD7A12]/20 shadow-xs">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="font-label-lg text-xs font-semibold">
            {selectedJury.length} of 3 selected
          </span>
        </div>
      </div>

      {/* Automated Advisory Banner */}
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#E2E8F0] mb-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] text-[#FD7A12] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">policy</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-label-lg text-[#002D71] font-semibold text-xs sm:text-sm">
              Institutional Assessment Filter
            </span>
            <span className="bg-[#efedf0] px-2 py-0.5 rounded text-[11px] font-eyebrow text-[#64748B] uppercase font-bold">
              Advisory
            </span>
          </div>
          <p className="font-body-md text-[#64748B] text-xs mt-0.5 leading-relaxed">
            Profiles are cross-referenced with department records, active thesis supervisions, co-authored publications, and committee distribution balance rules.
          </p>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4 mb-6">
        {/* Candidate 1: Dr. Sana Farooq */}
        <label
          onClick={() => toggleMember(1)}
          className={`group block relative bg-white rounded-[20px] p-6 shadow-sm border transition-all cursor-pointer ${
            selectedJury.includes(1) ? 'border-[#FD7A12] ring-1 ring-[#FD7A12]' : 'border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <input
                type="checkbox"
                checked={selectedJury.includes(1)}
                onChange={() => {}} // handled by parent label
                className="w-5 h-5 rounded text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
              />
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EAF5FC] text-[#002D71] flex items-center justify-center font-semibold text-base shrink-0">
              SF
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-headline-sm text-[#002D71] group-hover:text-[#FD7A12] transition-colors text-base font-semibold">
                    Dr. Sana Farooq
                  </h2>
                  <p className="font-body-md text-[#64748B] text-xs">
                    Department of Software Engineering
                  </p>
                </div>
                <span className="bg-[#FFF1E5] text-[#FD7A12] text-xs px-2.5 py-1 rounded-full font-semibold">
                  Match 91%
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Machine Learning &amp; AI
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Computer Vision
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Software Architecture
                </span>
              </div>

              {/* Conflict check */}
              <div className="mt-4 pt-3 flex items-center gap-2 border-t border-[#E2E8F0]/60">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1E5] text-[#002D71] text-xs px-3 py-1.5 rounded-full font-semibold">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  No conflicts found
                </span>
                <span className="text-xs text-[#64748B]">· Verified against CS/SE registry</span>
              </div>
            </div>
          </div>
        </label>

        {/* Candidate 2: Dr. Imran Qureshi */}
        <label
          onClick={() => toggleMember(2)}
          className={`group block relative bg-white rounded-[20px] p-6 shadow-sm border transition-all cursor-pointer ${
            selectedJury.includes(2) ? 'border-[#FD7A12] ring-1 ring-[#FD7A12]' : 'border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <input
                type="checkbox"
                checked={selectedJury.includes(2)}
                onChange={() => {}}
                className="w-5 h-5 rounded text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
              />
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#efedf0] text-[#002D71] flex items-center justify-center font-semibold text-base shrink-0">
              IQ
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-headline-sm text-[#002D71] group-hover:text-[#FD7A12] transition-colors text-base font-semibold">
                    Dr. Imran Qureshi
                  </h2>
                  <p className="font-body-md text-[#64748B] text-xs">
                    Department of Computer Science
                  </p>
                </div>
                <span className="bg-[#FFF1E5] text-[#FD7A12] text-xs px-2.5 py-1 rounded-full font-semibold">
                  Match 88%
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Natural Language Processing
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Recommender Systems
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Data Engineering
                </span>
              </div>

              {/* Conflict check */}
              <div className="mt-4 pt-3 flex items-center gap-2 border-t border-[#E2E8F0]/60">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1E5] text-[#002D71] text-xs px-3 py-1.5 rounded-full font-semibold">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  No conflicts found
                </span>
                <span className="text-xs text-[#64748B]">· Verified against thesis cohort history</span>
              </div>
            </div>
          </div>
        </label>

        {/* Candidate 3: Dr. Hira Anwar (with Advisory Conflict) */}
        <div
          className={`bg-white rounded-[20px] p-6 shadow-sm border transition-all ${
            selectedJury.includes(3) ? 'border-[#FD7A12] ring-1 ring-[#FD7A12]' : 'border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <input
                type="checkbox"
                id="cand-3-check"
                checked={selectedJury.includes(3)}
                onChange={() => toggleMember(3)}
                className="w-5 h-5 rounded text-[#FD7A12] accent-[#FD7A12] cursor-pointer"
              />
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFF4DF] text-[#B26B00] flex items-center justify-center font-semibold text-base shrink-0">
              HA
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label
                    htmlFor="cand-3-check"
                    className="font-headline-sm text-[#002D71] hover:text-[#FD7A12] cursor-pointer transition-colors block text-base font-semibold"
                  >
                    Dr. Hira Anwar
                  </label>
                  <p className="font-body-md text-[#64748B] text-xs">
                    Department of Computer Science
                  </p>
                </div>
                <span className="bg-[#efedf0] text-[#1E293B] text-xs px-2.5 py-1 rounded-full font-medium">
                  Match 84%
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Information Retrieval
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Semantic Web
                </span>
                <span className="bg-[#efedf0] text-[#475569] text-xs px-2.5 py-1 rounded-lg">
                  Cloud Computing
                </span>
              </div>

              {/* Conflict warning & acknowledgement */}
              <div className="mt-4 pt-3 space-y-3 border-t border-[#E2E8F0]/60">
                <div className="inline-flex items-center gap-2 bg-[#FFF4DF] text-[#B26B00] text-xs px-3.5 py-2 rounded-xl font-medium">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  Possible conflict: supervised a group member in 2023
                </div>

                <div className="bg-[#f5f3f6] rounded-xl p-3 flex items-start gap-2.5 border border-[#E2E8F0]">
                  <input
                    type="checkbox"
                    id="ack-cand-3"
                    checked={ackConflict3}
                    onChange={(e) => handleAckConflictChange(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-[#FD7A12] text-[#FD7A12] cursor-pointer"
                  />
                  <label
                    htmlFor="ack-cand-3"
                    className="text-xs text-[#1E293B] select-none cursor-pointer leading-normal"
                  >
                    Acknowledge advisory conflict and proceed with nomination
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate 4: Disabled conflict block */}
        <div className="bg-white/70 rounded-[20px] p-6 opacity-60 cursor-not-allowed select-none border border-[#E2E8F0]">
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <input type="checkbox" disabled className="w-5 h-5 rounded cursor-not-allowed opacity-40" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e9e7eb] text-[#64748B] flex items-center justify-center font-semibold text-base shrink-0">
              OK
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-headline-sm text-[#64748B] text-base font-semibold">
                    Dr. Omar Khalid
                  </span>
                  <p className="font-body-md text-[#64748B] text-xs">
                    Department of Computer Science
                  </p>
                </div>
                <span className="bg-[#efedf0] text-[#64748B] text-xs px-2.5 py-1 rounded-full font-medium">
                  Match 75%
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-[#e9e7eb] text-[#64748B] text-xs px-2.5 py-1 rounded-lg">
                  Distributed Systems
                </span>
                <span className="bg-[#e9e7eb] text-[#64748B] text-xs px-2.5 py-1 rounded-lg">
                  Network Security
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0]/60">
                <span className="inline-flex items-center gap-2 bg-[#FDE8E6] text-[#C2392F] text-xs px-3.5 py-2 rounded-xl font-medium">
                  <span className="material-symbols-outlined text-[18px]">block</span>
                  Same research group as the supervisor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jury Coverage Balance Card */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-eyebrow text-[#64748B] uppercase text-xs font-bold">
              Jury Coverage Balance
            </span>
            <h3 className="font-headline-sm text-[#002D71] text-base font-semibold">
              Core Evaluation Metrics
            </h3>
          </div>
          <span className="bg-[#FFF1E5] text-[#FD7A12] font-eyebrow text-xs px-3 py-1 rounded-full uppercase font-bold border border-[#FD7A12]/20">
            Optimal Spread
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#f5f3f6] rounded-xl p-4 border border-[#E2E8F0]/60">
            <div className="flex justify-between items-center text-[#64748B] text-xs font-medium mb-2">
              <span>Methodology &amp; AI</span>
              <span className="text-[#002D71] font-semibold">96%</span>
            </div>
            <div className="w-full h-2 bg-[#efedf0] rounded-full overflow-hidden">
              <div className="h-full bg-[#FD7A12] rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>

          <div className="bg-[#f5f3f6] rounded-xl p-4 border border-[#E2E8F0]/60">
            <div className="flex justify-between items-center text-[#64748B] text-xs font-medium mb-2">
              <span>Systems &amp; Architecture</span>
              <span className="text-[#002D71] font-semibold">88%</span>
            </div>
            <div className="w-full h-2 bg-[#efedf0] rounded-full overflow-hidden">
              <div className="h-full bg-[#FD7A12] rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>

          <div className="bg-[#f5f3f6] rounded-xl p-4 border border-[#E2E8F0]/60">
            <div className="flex justify-between items-center text-[#64748B] text-xs font-medium mb-2">
              <span>Data Governance</span>
              <span className="text-[#002D71] font-semibold">74%</span>
            </div>
            <div className="w-full h-2 bg-[#efedf0] rounded-full overflow-hidden">
              <div className="h-full bg-[#FD7A12] rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Navigation Bar */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/95 backdrop-blur-md px-6 py-4 z-30 shadow-lg border-t border-[#E2E8F0]">
        <div className="max-w-[940px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('approval-step-1')}
            className="inline-flex items-center gap-2 px-4 h-12 bg-white hover:bg-[#f5f3f6] text-[#1E293B] text-xs font-medium rounded-xl border border-[#E2E8F0] transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${isComplete ? 'bg-[#FD7A12]' : 'bg-[#B26B00]'}`}
            ></span>
            <span className="font-body-md text-[#002D71] font-medium text-xs sm:text-sm">
              {isComplete
                ? '3 of 3 selected · Ready to proceed'
                : `${selectedJury.length} of 3 selected · ${3 - selectedJury.length} more required`}
            </span>
          </div>

          <button
            type="button"
            disabled={!isComplete}
            onClick={() => onNavigate('approval-step-3')}
            className={`inline-flex items-center gap-2 px-6 h-12 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer ${
              isComplete
                ? 'bg-[#002D71] hover:bg-[#164783]'
                : 'bg-[#002D71]/40 opacity-70 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalStep2View;
