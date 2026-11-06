import React, { useState } from 'react';
import { AppView, ProposalItem } from '../types';

interface ApprovalStep1ViewProps {
  onNavigate: (view: AppView) => void;
  proposal?: ProposalItem;
  onShowToast?: (message: string) => void;
}

export const ApprovalStep1View: React.FC<ApprovalStep1ViewProps> = ({ onNavigate, proposal, onShowToast }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState<number>(1);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({ 1: true });
  const [overrideReason, setOverrideReason] = useState('');

  const toggleExplanation = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const supervisors = [
    {
      id: 1,
      name: 'Dr. Ahmed Rahman',
      dept: 'Department of Computer Science',
      initials: 'AR',
      match: 92,
      topPick: true,
      domainMatch: 95,
      workload: '4 of 5 groups',
      workloadPercent: 80,
      workloadColor: 'bg-[#B26B00]',
      experience: 90,
      disabled: false,
      explanation:
        'Strong overlap with machine learning and recommender systems; capacity available. Historical completion rate is 98% with aligned departmental prerequisites.',
    },
    {
      id: 2,
      name: 'Dr. Farah Siddiqui',
      dept: 'Department of Software Engineering',
      initials: 'FS',
      match: 85,
      topPick: false,
      domainMatch: 82,
      workload: '2 of 5 groups',
      workloadPercent: 40,
      workloadColor: 'bg-[#FD7A12]',
      experience: 88,
      disabled: false,
      explanation:
        'Extensive architectural supervision record. Lower concurrent group load provides optimal availability for regular milestones.',
    },
    {
      id: 3,
      name: 'Dr. Omar Khalid',
      dept: 'Department of Computer Science',
      initials: 'OK',
      match: 78,
      topPick: false,
      domainMatch: 72,
      workload: '1 of 5 groups',
      workloadPercent: 20,
      workloadColor: 'bg-[#FD7A12]',
      experience: 85,
      disabled: false,
      explanation:
        'Strong general computing foundation with focus on foundational architectures. Light current load facilitates deep hands-on oversight.',
    },
    {
      id: 4,
      name: 'Dr. Bilal Chaudhry',
      dept: 'Department of Computer Science',
      initials: 'BC',
      match: 0,
      topPick: false,
      domainMatch: 0,
      workload: '5 of 5 groups allocated',
      workloadPercent: 100,
      workloadColor: 'bg-[#C2392F]',
      experience: 0,
      disabled: true,
      explanation: 'Supervisory cap reached. No capacity remaining.',
    },
  ];

  const currentSupervisor = supervisors.find((s) => s.id === selectedSupervisor);

  return (
    <div className="flex flex-col w-full pb-32 max-w-[940px] mx-auto">
      {/* Top Stepper Component */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] mb-6">
        <div className="grid grid-cols-3 relative items-center">
          {/* Connecting Track Line Base */}
          <div className="absolute left-[16.66%] right-[16.66%] top-[20px] h-[3px] bg-[#efedf0] -z-0"></div>
          {/* Active Track Line to Step 2 */}
          <div className="absolute left-[16.66%] w-[33.33%] top-[20px] h-[3px] bg-[#FD7A12]/40 -z-0"></div>

          {/* Step 1 (Active) */}
          <div className="flex flex-col items-center text-center relative z-10 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#FD7A12] text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-4 ring-[#FFF1E5]">
              1
            </div>
            <span className="mt-2.5 font-label-lg font-semibold text-[#002D71] text-xs">Supervisor</span>
            <span className="font-label-md text-[#FD7A12] font-medium text-[11px]">In Progress</span>
          </div>

          {/* Step 2 (Pending) */}
          <div className="flex flex-col items-center text-center relative z-10 opacity-70">
            <div className="w-10 h-10 rounded-full bg-[#efedf0] text-[#64748B] flex items-center justify-center font-medium text-sm">
              2
            </div>
            <span className="mt-2.5 font-label-lg text-[#64748B] text-xs">Jury</span>
            <span className="font-label-md text-[#74777f] font-normal text-[11px]">Pending</span>
          </div>

          {/* Step 3 (Pending) */}
          <div className="flex flex-col items-center text-center relative z-10 opacity-70">
            <div className="w-10 h-10 rounded-full bg-[#efedf0] text-[#64748B] flex items-center justify-center font-medium text-sm">
              3
            </div>
            <span className="mt-2.5 font-label-lg text-[#64748B] text-xs">Timeline &amp; confirm</span>
            <span className="font-label-md text-[#74777f] font-normal text-[11px]">Pending</span>
          </div>
        </div>
      </div>

      {/* Header & Advisory Notice */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="space-y-1.5">
          <span className="font-eyebrow text-[#FD7A12] uppercase block tracking-wider text-xs font-bold">
            APPROVAL · STEP 1 OF 3
          </span>
          <h1 className="font-headline-lg text-[#002D71] text-[32px] sm:text-[36px] font-light tracking-tight">
            Assign a supervisor
          </h1>
          <p className="font-body-lg text-[#64748B] text-sm sm:text-base">
            Ranked recommendations are advisory. You make the final decision.
          </p>
        </div>

        {/* Human Authority Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-full bg-[#FFF1E5] text-[#002D71] font-medium text-xs border border-[#FD7A12]/20 shadow-xs">
          <span className="material-symbols-outlined text-[18px] text-[#FD7A12]">verified_user</span>
          <span>Human Decision Authority</span>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-4 mb-6">
        {supervisors.map((s) => {
          if (s.disabled) {
            return (
              <div
                key={s.id}
                className="bg-[#f5f3f6]/70 rounded-[20px] p-6 opacity-75 cursor-not-allowed select-none border border-[#E2E8F0]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#e3e2e5] text-[#64748B] flex items-center justify-center font-semibold text-lg shrink-0">
                      {s.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-[#64748B] font-semibold truncate text-base">
                          {s.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E6] text-[#C2392F]">
                          <span className="material-symbols-outlined text-[13px]">block</span>
                          At capacity 5/5
                        </span>
                      </div>
                      <p className="font-body-md text-[#64748B] text-xs mt-0.5">{s.dept}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 sm:self-center self-end">
                    <div className="text-right">
                      <span className="font-eyebrow text-[#64748B] block uppercase text-[10px]">
                        Status
                      </span>
                      <span className="font-headline-sm text-[#C2392F] font-semibold text-sm">
                        Max Load
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                      <div className="w-6 h-6 rounded-full border-2 border-[#CBD5E1] bg-[#efedf0] flex items-center justify-center"></div>
                      <span className="font-label-lg font-medium text-[#64748B] text-xs">Select</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-[#E2E8F0]/40">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="text-[#64748B]">Supervisory Cap Reached</span>
                    <span className="font-semibold text-[#C2392F]">5 of 5 groups allocated</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#efedf0] overflow-hidden">
                    <div className="h-full bg-[#C2392F] rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            );
          }

          const isSelected = selectedSupervisor === s.id;

          return (
            <div
              key={s.id}
              onClick={() => setSelectedSupervisor(s.id)}
              className={`bg-white rounded-[20px] p-6 shadow-sm transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'border-[#FD7A12] ring-2 ring-[#FD7A12]'
                  : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center font-semibold text-lg shrink-0 ${
                      s.topPick ? 'bg-[#FFF1E5] text-[#FD7A12]' : 'bg-[#EAF5FC] text-[#164783]'
                    }`}
                  >
                    {s.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-headline-sm text-[#002D71] font-semibold truncate text-base">
                        {s.name}
                      </h3>
                      {s.topPick && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF1E5] text-[#FD7A12]">
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            auto_awesome
                          </span>
                          Top Pick
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-[#64748B] text-xs mt-0.5">{s.dept}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:self-center self-end">
                  <div className="text-right">
                    <span className="font-eyebrow text-[#64748B] block uppercase text-[10px]">
                      Compatibility
                    </span>
                    <span
                      className={`font-headline-md font-semibold tracking-tight text-xl ${
                        s.topPick ? 'text-[#FD7A12]' : 'text-[#002D71]'
                      }`}
                    >
                      Match {s.match}%
                    </span>
                  </div>

                  <label className="cursor-pointer flex items-center gap-2 select-none">
                    <input
                      type="radio"
                      name="supervisor_choice"
                      checked={isSelected}
                      onChange={() => setSelectedSupervisor(s.id)}
                      className="peer sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-xs ${
                        isSelected
                          ? 'border-[#FD7A12] bg-[#FD7A12]'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="font-label-lg font-medium text-[#002D71] text-xs">Select</span>
                  </label>
                </div>
              </div>

              {/* Metric Bars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-5 border-t border-[#E2E8F0]/60">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
                    <span className="text-[#64748B]">Domain match</span>
                    <span className="font-semibold text-[#002D71]">{s.domainMatch}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#efedf0] overflow-hidden">
                    <div
                      className="h-full bg-[#FD7A12] rounded-full transition-all duration-500"
                      style={{ width: `${s.domainMatch}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
                    <span className="text-[#64748B]">Workload</span>
                    <span className="font-semibold text-[#002D71]">{s.workload}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#efedf0] overflow-hidden">
                    <div
                      className={`h-full ${s.workloadColor} rounded-full transition-all duration-500`}
                      style={{ width: `${s.workloadPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
                    <span className="text-[#64748B]">Experience</span>
                    <span className="font-semibold text-[#002D71]">{s.experience}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#efedf0] overflow-hidden">
                    <div
                      className="h-full bg-[#164783] rounded-full transition-all duration-500"
                      style={{ width: `${s.experience}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Expansion Toggle & Panel */}
              <div className="mt-4 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExplanation(s.id);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FD7A12] hover:text-[#002D71] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedCards[s.id] ? 'expand_less' : 'expand_more'}
                  </span>
                  <span>Explain recommendation</span>
                </button>

                {expandedCards[s.id] && (
                  <div className="mt-3 p-4 rounded-xl bg-[#FFF1E5] flex items-start gap-3 text-[#002D71] border border-[#FD7A12]/20">
                    <span className="material-symbols-outlined text-[20px] text-[#FD7A12] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                    <div className="space-y-0.5 text-xs">
                      <span className="font-eyebrow text-[#FD7A12] uppercase block tracking-wider text-[10px] font-bold">
                        ADVISORY SYNTHESIS
                      </span>
                      <p className="text-[#002D71] leading-relaxed">{s.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Override Reason Card */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0]">
        <div className="flex items-start gap-3 mb-4">
          <span className="material-symbols-outlined text-[#B26B00] mt-0.5 text-[22px]">policy</span>
          <div>
            <label htmlFor="override-reason" className="font-label-lg font-semibold text-[#002D71] text-sm block">
              Override reason{' '}
              <span className={`text-xs ${selectedSupervisor === 1 ? 'text-[#64748B] font-normal' : 'text-[#B26B00] font-semibold'}`}>
                {selectedSupervisor === 1
                  ? '(optional for top recommendation)'
                  : '(required if you choose a different supervisor)'}
              </span>
            </label>
            <p className="font-body-md text-[#64748B] text-xs mt-0.5">
              Institutional quality standards require formal rationales whenever an alternative supervisor is appointed over the highest compatibility match.
            </p>
          </div>
        </div>

        <textarea
          id="override-reason"
          rows={3}
          value={overrideReason}
          onChange={(e) => setOverrideReason(e.target.value)}
          placeholder="Specify clinical, research focus, or laboratory equipment alignment reasons..."
          className="w-full rounded-xl bg-[#f5f3f6] border border-[#E2E8F0] p-3.5 text-xs text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#FD7A12] focus:bg-white transition-all resize-none"
        ></textarea>

        <div className="flex items-center gap-2 mt-3 text-[#64748B] text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">verified</span>
          <span>Logged for audit. Stored immutably with final thesis panel records.</span>
        </div>
      </div>

      {/* Sticky Bottom Confirmation Bar */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] py-4 px-6 z-30 shadow-lg">
        <div className="max-w-[940px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('proposal-review')}
            className="px-5 py-2.5 rounded-[14px] bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-[#f5f3f6] text-xs font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#64748B] hidden sm:inline">
              Selected: {currentSupervisor?.name} (Match {currentSupervisor?.match}%)
            </span>
            <button
              type="button"
              onClick={() => onNavigate('approval-step-2')}
              className="px-6 py-2.5 rounded-[14px] bg-[#002D71] text-white hover:bg-[#164783] text-xs font-semibold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Continue</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalStep1View;
