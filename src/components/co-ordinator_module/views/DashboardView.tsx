import React from 'react';
import { AppView, ProposalItem } from '../types';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
  onSelectProposal?: (proposal: ProposalItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onSelectProposal }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="flex flex-col">
          <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-widest text-[12px] mb-1">
            SPRING SEMESTER 2025 · KIET
          </span>
          <h1 className="font-headline-lg text-[#002D71] text-[32px] sm:text-[36px] font-light tracking-tight">
            Good morning, Dr. Hussain.
          </h1>
          <p className="font-body-lg text-[#64748B] text-sm sm:text-base mt-1 font-normal">
            12 proposals are waiting for your review.
          </p>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => onNavigate('proposal-review')}
            className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-[14px] bg-[#002D71] hover:bg-[#164783] text-white font-label-lg transition-colors shadow-sm cursor-pointer select-none"
          >
            <span>Review next proposal</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Groups */}
        <div
          onClick={() => onNavigate('groups-projects')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              TOTAL GROUPS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#002D71]">
              <span className="material-symbols-outlined text-[20px]">folder_shared</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71] tracking-tight">
              48
            </span>
          </div>
        </div>

        {/* Pending Proposals */}
        <div
          onClick={() => onNavigate('proposals')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              PENDING PROPOSALS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FFF4DF] flex items-center justify-center text-[#B26B00]">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71] tracking-tight">
              12
            </span>
          </div>
        </div>

        {/* Unassigned Groups */}
        <div
          onClick={() => onNavigate('groups-projects')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              UNASSIGNED GROUPS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FFF4DF] flex items-center justify-center text-[#B26B00]">
              <span className="material-symbols-outlined text-[20px]">person_off</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71] tracking-tight">
              5
            </span>
          </div>
        </div>

        {/* At-Risk Projects */}
        <div
          onClick={() => onNavigate('risk-monitor')}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] font-bold tracking-wider">
              AT-RISK PROJECTS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FDE8E6] flex items-center justify-center text-[#C2392F]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#C2392F] tracking-tight">
              7
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Pending Actions Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-5">
              <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-widest text-[11px] block mb-1">
                COORDINATOR ACTIONS
              </span>
              <h2 className="font-headline-sm text-[#002D71] text-lg font-semibold tracking-tight">
                Pending actions
              </h2>
              <p className="font-body-md text-[#64748B] text-sm mt-0.5 font-normal">
                Urgent tasks requiring departmental action.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onNavigate('proposals')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-[#FD7A12] text-white text-[11px] font-bold leading-none">
                    12
                  </span>
                  <span className="font-body-md text-[#1E293B] font-medium text-sm">
                    12 proposals awaiting review
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#CBD5E1] group-hover:text-[#002D71] transition-colors text-[20px]">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('groups-projects')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-[#FFF4DF] text-[#B26B00] text-[11px] font-bold leading-none">
                    5
                  </span>
                  <span className="font-body-md text-[#1E293B] font-medium text-sm">
                    5 groups need a supervisor
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#CBD5E1] group-hover:text-[#002D71] transition-colors text-[20px]">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('groups-projects')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-[#FFF4DF] text-[#B26B00] text-[11px] font-bold leading-none">
                    3
                  </span>
                  <span className="font-body-md text-[#1E293B] font-medium text-sm">
                    3 groups need a jury
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#CBD5E1] group-hover:text-[#002D71] transition-colors text-[20px]">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('evaluation')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors group cursor-pointer text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold leading-none">
                    Ready
                  </span>
                  <span className="font-body-md text-[#1E293B] font-medium text-sm">
                    FYP1 results ready to publish
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#CBD5E1] group-hover:text-[#002D71] transition-colors text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Supervisor Workload Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-5">
              <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-widest text-[11px] block mb-1">
                FACULTY ALLOCATION
              </span>
              <h2 className="font-headline-sm text-[#002D71] text-lg font-semibold tracking-tight">
                Supervisor workload
              </h2>
              <p className="font-body-md text-[#64748B] text-sm mt-0.5 font-normal">
                Advisory faculty supervision capacity limit is 5 groups.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* Dr. Ahmed Rahman */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#002D71] font-medium text-sm">
                    Dr. Ahmed Rahman
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FFF4DF] text-[#B26B00] text-[12px] font-medium leading-normal">
                    4/5 capacity
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2 w-full">
                  <div className="h-full rounded-full bg-[#FD7A12]"></div>
                  <div className="h-full rounded-full bg-[#FD7A12]"></div>
                  <div className="h-full rounded-full bg-[#FD7A12]"></div>
                  <div className="h-full rounded-full bg-[#FD7A12]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                </div>
              </div>

              {/* Dr. Sana Farooq */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#002D71] font-medium text-sm">
                    Dr. Sana Farooq
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#DFF5FD] text-[#002D71] text-[12px] font-medium leading-normal">
                    3/5 capacity
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2 w-full">
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                </div>
              </div>

              {/* Dr. Bilal Chaudhry */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#002D71] font-medium text-sm">
                    Dr. Bilal Chaudhry
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FDE8E6] text-[#C2392F] text-[12px] font-medium leading-normal">
                    Full capacity
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2 w-full">
                  <div className="h-full rounded-full bg-[#C2392F]"></div>
                  <div className="h-full rounded-full bg-[#C2392F]"></div>
                  <div className="h-full rounded-full bg-[#C2392F]"></div>
                  <div className="h-full rounded-full bg-[#C2392F]"></div>
                  <div className="h-full rounded-full bg-[#C2392F]"></div>
                </div>
              </div>

              {/* Dr. Farah Siddiqui */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#002D71] font-medium text-sm">
                    Dr. Farah Siddiqui
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#DFF5FD] text-[#002D71] text-[12px] font-medium leading-normal">
                    2/5 capacity
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2 w-full">
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                </div>
              </div>

              {/* Dr. Omar Khalid */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-[#002D71] font-medium text-sm">
                    Dr. Omar Khalid
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#DFF5FD] text-[#002D71] text-[12px] font-medium leading-normal">
                    1/5 capacity
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 h-2 w-full">
                  <div className="h-full rounded-full bg-[#01B0F1]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                  <div className="h-full rounded-full bg-[#E2E8F0]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Academic Focus: Domain Trends */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-5">
              <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-widest text-[11px] block mb-1">
                ACADEMIC FOCUS
              </span>
              <h2 className="font-headline-sm text-[#002D71] text-lg font-semibold tracking-tight">
                Domain trends
              </h2>
              <p className="font-body-md text-[#64748B] text-sm mt-0.5 font-normal">
                Distribution across registered project domains.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              {/* Donut Chart SVG */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg aria-hidden="true" className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#CBD5E1" strokeDasharray="389.5" strokeDashoffset="0" strokeWidth="16" />
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#B26B00" strokeDasharray="389.5" strokeDashoffset="23.37" strokeWidth="16" />
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#164783" strokeDasharray="389.5" strokeDashoffset="54.53" strokeWidth="16" />
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#01B0F1" strokeDasharray="389.5" strokeDashoffset="101.27" strokeWidth="16" />
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#002D71" strokeDasharray="389.5" strokeDashoffset="155.8" strokeWidth="16" />
                  <circle cx="80" cy="80" fill="transparent" r="62" stroke="#FD7A12" strokeDasharray="389.5" strokeDashoffset="241.49" strokeWidth="16" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-big-number text-[32px] font-semibold text-[#002D71] leading-none">
                    48
                  </span>
                  <span className="font-label-md text-[#64748B] uppercase text-[11px] font-semibold tracking-wider mt-1">
                    TOTAL
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 w-full">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FD7A12]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">AI/ML</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">38%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#002D71]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">Web &amp; Mobile</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">22%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#01B0F1]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">IoT</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">14%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#164783]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">Cybersecurity</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">12%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B26B00]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">Data Science</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">8%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F6F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span>
                    <span className="font-body-md text-[#1E293B] text-sm font-medium">Other</span>
                  </div>
                  <span className="font-label-md text-[#64748B] text-xs font-semibold">6%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Early Intervention: At-Risk Projects */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <span className="font-eyebrow text-[#FD7A12] uppercase font-bold tracking-widest text-[11px] block mb-1">
                  EARLY INTERVENTION
                </span>
                <h2 className="font-headline-sm text-[#002D71] text-lg font-semibold tracking-tight">
                  At-risk projects
                </h2>
                <p className="font-body-md text-[#64748B] text-sm mt-0.5 font-normal">
                  Projects flagged by automated milestone tracking.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {/* At-risk 1 */}
                <div
                  onClick={() => onNavigate('risk-monitor')}
                  className="p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-body-md text-[#002D71] text-sm font-medium leading-snug truncate">
                      Autonomous Drone Navigation in GPS-Denied Environments
                    </span>
                    <span className="font-label-md text-[#64748B] text-xs mt-0.5">
                      Dr. Bilal Chaudhry · Group 14
                    </span>
                  </div>
                  <span className="inline-flex items-center whitespace-nowrap self-start sm:self-center px-2.5 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-[11px] font-semibold leading-none">
                    Overdue milestone (18 days)
                  </span>
                </div>

                {/* At-risk 2 */}
                <div
                  onClick={() => onNavigate('risk-monitor')}
                  className="p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-body-md text-[#002D71] text-sm font-medium leading-snug truncate">
                      Blockchain-Based Electronic Health Record Exchange
                    </span>
                    <span className="font-label-md text-[#64748B] text-xs mt-0.5">
                      Dr. Ahmed Rahman · Group 29
                    </span>
                  </div>
                  <span className="inline-flex items-center whitespace-nowrap self-start sm:self-center px-2.5 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-[11px] font-semibold leading-none">
                    2 missed submissions
                  </span>
                </div>

                {/* At-risk 3 */}
                <div
                  onClick={() => onNavigate('risk-monitor')}
                  className="p-3.5 rounded-xl bg-[#F4F6F9] hover:bg-[#F1F5F9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-body-md text-[#002D71] text-sm font-medium leading-snug truncate">
                      Smart Campus Energy Monitor &amp; Forecast Engine
                    </span>
                    <span className="font-label-md text-[#64748B] text-xs mt-0.5">
                      Dr. Sana Farooq · Group 08
                    </span>
                  </div>
                  <span className="inline-flex items-center whitespace-nowrap self-start sm:self-center px-2.5 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-[11px] font-semibold leading-none">
                    Schedule delay (42%)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 flex items-center justify-start border-t border-[#E2E8F0]/60">
              <button
                type="button"
                onClick={() => onNavigate('risk-monitor')}
                className="inline-flex items-center gap-1.5 font-label-lg text-[#002D71] hover:text-[#FD7A12] font-semibold transition-colors cursor-pointer text-sm"
              >
                <span>View all 7 at-risk projects</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
