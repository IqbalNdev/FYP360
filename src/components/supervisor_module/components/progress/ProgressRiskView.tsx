import React from 'react';
import { SupervisedProject, ActiveView } from '../../types';

interface ProgressRiskViewProps {
  projects: SupervisedProject[];
  onSelectProject: (projectId: string) => void;
  setActiveView: (view: ActiveView) => void;
  onOpenRiskReasons: (project: SupervisedProject) => void;
}

export const ProgressRiskView: React.FC<ProgressRiskViewProps> = ({
  projects,
  onSelectProject,
  setActiveView,
  onOpenRiskReasons,
}) => {
  return (
    <div className="mx-auto w-full max-w-[940px] p-10 pb-16 flex flex-col gap-6">
      {/* Header Section */}
      <section className="flex flex-col gap-2">
        <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider">
          PROJECT MONITORING · KIET
        </span>
        <h1 className="text-4xl text-[#002D71] font-light tracking-tight">
          Progress & Risk
        </h1>
        <p className="text-[15px] text-[#475569]">
          Rule-based health scores for your groups. They support, but never replace, your academic judgement.
        </p>
      </section>

      {/* Advisory Cyan Banner */}
      <section className="bg-[#E0F2FE]/70 border border-[#01B0F1]/30 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-[#01B0F1]/20 flex items-center justify-center shrink-0 text-[#01B0F1]">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <p className="text-sm font-medium text-[#002D71] truncate">
            Health scores are calculated via institutional assessment criteria.
          </p>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 text-[#002D71] border border-[#01B0F1]/30 shrink-0">
            ADVISORY
          </span>
        </div>
      </section>

      {/* Summary Stat Tiles (4-column Grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: Healthy */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              Healthy
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
              <span className="material-symbols-outlined text-[16px]">
                check_circle
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl text-[#002D71] font-semibold">1</span>
            <span className="text-xs text-[#16A34A] font-semibold">Group</span>
          </div>
        </div>

        {/* Tile 2: Watch */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              Watch
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B]">
              <span className="material-symbols-outlined text-[16px]">
                visibility
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl text-[#002D71] font-semibold">2</span>
            <span className="text-xs text-[#B45309] font-semibold">Groups</span>
          </div>
        </div>

        {/* Tile 3: At risk */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              At risk
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
              <span className="material-symbols-outlined text-[16px]">
                warning
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl text-[#002D71] font-semibold">1</span>
            <span className="text-xs text-[#DC2626] font-semibold">Group</span>
          </div>
        </div>

        {/* Tile 4: Missed check-ins */}
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              Missed check-ins
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
              <span className="material-symbols-outlined text-[16px]">
                event_busy
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl text-[#002D71] font-semibold">2</span>
            <span className="text-xs text-[#475569] font-medium">Total</span>
          </div>
        </div>
      </section>

      {/* Group Health Table Card */}
      <section className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-lg font-medium text-[#002D71]">Group health</h2>
            <p className="text-sm text-[#475569] mt-0.5">4 groups monitored</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#475569] bg-[#F4F6F9] border border-[#E2E8F0] px-3 py-1.5 rounded-lg font-medium">
              Threshold: KIET Standard
            </span>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 lg:-mx-8">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#F4F6F9] text-[#475569] text-[11px] uppercase tracking-wider border-b border-[#E2E8F0]">
                <th className="py-3 pl-6 lg:pl-8 pr-4 font-semibold">Group</th>
                <th className="py-3 px-4 font-semibold">Milestone completion</th>
                <th className="py-3 px-4 font-semibold text-center">On-time rate</th>
                <th className="py-3 px-4 font-semibold text-center">Overdue tasks</th>
                <th className="py-3 px-4 font-semibold text-center">Missed check-ins</th>
                <th className="py-3 px-4 font-semibold">Health score</th>
                <th className="py-3 pr-6 lg:pr-8 pl-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-sm">
              {projects.map((proj) => (
                <tr
                  key={proj.id}
                  className="hover:bg-[#F4F6F9]/60 transition-colors"
                >
                  <td className="py-4 pl-6 lg:pl-8 pr-4">
                    <div className="flex flex-col min-w-0">
                      <span
                        onClick={() => {
                          onSelectProject(proj.id);
                          setActiveView('group-details');
                        }}
                        className="font-medium text-[#002D71] hover:text-[#FD7A12] cursor-pointer transition-colors leading-snug"
                      >
                        {proj.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[#475569] text-xs">
                        <span>{proj.code}</span>
                        <span>·</span>
                        <span>Lead: {proj.leadName}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 w-44">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            proj.healthStatus === 'At risk'
                              ? 'bg-[#DC2626]'
                              : proj.healthStatus === 'Watch'
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#16A34A]'
                          }`}
                          style={{ width: `${proj.milestoneProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#002D71] shrink-0 w-8 text-right">
                        {proj.milestoneProgress}%
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center font-medium text-[#002D71]">
                    {proj.onTimeRate}%
                  </td>

                  <td className="py-4 px-4 text-center">
                    {proj.overdueTasks > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold">
                        {proj.overdueTasks}
                      </span>
                    ) : (
                      <span className="font-medium text-[#475569]">0</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-center">
                    {proj.missedCheckIns > 0 ? (
                      <span
                        className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full text-xs font-semibold ${
                          proj.healthStatus === 'At risk'
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : 'bg-[#FEF3C7] text-[#B45309]'
                        }`}
                      >
                        {proj.missedCheckIns}
                      </span>
                    ) : (
                      <span className="font-medium text-[#475569]">0</span>
                    )}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        proj.healthStatus === 'Healthy'
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : proj.healthStatus === 'Watch'
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          proj.healthStatus === 'Healthy'
                            ? 'bg-[#16A34A]'
                            : proj.healthStatus === 'Watch'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#DC2626]'
                        }`}
                      />
                      {proj.healthScore} {proj.healthStatus}
                    </span>
                  </td>

                  <td className="py-4 pr-6 lg:pr-8 pl-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenRiskReasons(proj)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#FD7A12] hover:text-[#EA6800] transition-colors cursor-pointer"
                    >
                      <span>View reasons</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deadline records requiring attention Card */}
      <section className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-lg font-medium text-[#002D71]">
            Deadline records requiring attention
          </h2>
          <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569] text-xs font-medium">
            2 recorded
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Item 1: Literature review late */}
          <div
            onClick={() => setActiveView('submission-review')}
            className="flex items-center justify-between p-4 rounded-xl bg-[#F4F6F9] hover:bg-slate-100 transition-colors cursor-pointer border border-[#E2E8F0]"
          >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#475569] shrink-0 shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[#002D71] truncate">
                  Submit literature review and requirements
                </span>
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#475569] mt-0.5">
                  <span>Milestone 2 · Deadline Sep 11, 2026, 5:00 PM</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="text-[#01B0F1] font-medium truncate">
                    AI-Powered Student Career Guidance System
                  </span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-medium shrink-0 ml-3">
              Submitted late
            </span>
          </div>

          {/* Item 2: Architecture package overdue */}
          <div
            onClick={() => setActiveView('submission-review')}
            className="flex items-center justify-between p-4 rounded-xl bg-[#F4F6F9] hover:bg-slate-100 transition-colors cursor-pointer border border-[#E2E8F0]"
          >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#475569] shrink-0 shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[20px]">
                  alarm
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[#002D71] truncate">
                  Complete system architecture package
                </span>
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#475569] mt-0.5">
                  <span>Milestone 3 · Deadline Oct 17, 2026, 5:00 PM</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="text-[#01B0F1] font-medium truncate">
                    AI-Powered Student Career Guidance System
                  </span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-medium shrink-0 ml-3">
              Overdue
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
