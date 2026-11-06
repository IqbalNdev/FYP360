import React, { useState, useMemo } from 'react';
import { AppView } from '../types';
import { mockProjects } from '../mockData';

interface GroupsProjectsViewProps {
  onNavigate: (view: AppView) => void;
  onShowToast?: (message: string) => void;
}

export const GroupsProjectsView: React.FC<GroupsProjectsViewProps> = ({ onNavigate, onShowToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.supervisor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPhase =
        phaseFilter === 'all' ||
        (phaseFilter === 'p1' && p.phase.includes('1')) ||
        (phaseFilter === 'p2' && p.phase.includes('2')) ||
        (phaseFilter === 'p3' && p.phase.includes('3'));

      return matchSearch && matchPhase;
    });
  }, [searchQuery, phaseFilter]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Context Block */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FD7A12]"></span>
          <span className="font-eyebrow text-[#FD7A12] uppercase tracking-wider text-xs font-bold">
            PROJECT DIRECTORY
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
          <div>
            <h1 className="font-headline-lg text-[#164783] text-[32px] sm:text-[36px] tracking-tight font-light leading-tight">
              Groups &amp; Projects
            </h1>
            <p className="font-body-md text-[#64748B] text-sm mt-1 max-w-3xl leading-relaxed">
              Overview of all active academic capstone projects, supervisory allocations, jury assignments, and milestone progress.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="px-4 py-2 rounded-xl bg-[#FFF1E5] text-[#FD7A12] text-xs font-medium flex items-center gap-2 shadow-xs border border-[#FD7A12]/20">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>AY 2024–2025 Cohort</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="p-6 rounded-[20px] bg-white shadow-sm border border-[#E2E8F0] relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] tracking-wider font-bold">
              Total Projects
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#164783]">
              <span className="material-symbols-outlined text-[20px]">folder_managed</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71]">42</span>
            <span className="font-body-md text-[#64748B] text-sm font-normal">active</span>
          </div>
          <div className="mt-2 text-xs text-[#64748B] flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
            <span>100% enrollment registered</span>
          </div>
        </div>

        {/* Supervisors */}
        <div className="p-6 rounded-[20px] bg-white shadow-sm border border-[#E2E8F0] relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] tracking-wider font-bold">
              Supervisors
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] flex items-center justify-center text-[#FD7A12]">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71]">18</span>
            <span className="font-body-md text-[#64748B] text-sm font-normal">faculty</span>
          </div>
          <div className="mt-2 text-xs text-[#64748B] flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
            <span>Avg. 2.3 groups / supervisor</span>
          </div>
        </div>

        {/* Jury Assigned */}
        <div className="p-6 rounded-[20px] bg-white shadow-sm border border-[#E2E8F0] relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] tracking-wider font-bold">
              Jury Assigned
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FFF1E5] flex items-center justify-center text-[#002D71]">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#002D71]">36 / 42</span>
            <span className="font-body-md text-[#64748B] text-sm font-normal">confirmed</span>
          </div>
          <div className="mt-2 text-xs text-[#B26B00] flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B26B00]"></span>
            <span>6 panels pending confirmation</span>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="p-6 rounded-[20px] bg-white shadow-sm border border-[#E2E8F0] relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-[#64748B] uppercase text-[11px] tracking-wider font-bold">
              Needs Attention
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FDE8E6] flex items-center justify-center text-[#C2392F]">
              <span className="material-symbols-outlined text-[20px]">priority_high</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-big-number text-[32px] font-semibold text-[#C2392F]">5</span>
            <span className="font-body-md text-[#C2392F] text-sm font-medium">projects at risk</span>
          </div>
          <div className="mt-2 text-xs text-[#64748B] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#E8705A]">flag</span>
            <span>Action required before M3 audit</span>
          </div>
        </div>
      </div>

      {/* Interactive Filters & Controls Row */}
      <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-sm placeholder:text-[#64748B] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent focus:border-[#FD7A12] transition-all"
            placeholder="Search project title, ID, student or supervisor..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Phase Filter */}
          <div className="relative min-w-[210px] flex-1 md:flex-initial">
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="w-full h-[48px] px-4 pr-10 appearance-none rounded-xl bg-[#F4F6F9] text-[#1E293B] text-xs font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 cursor-pointer border border-transparent transition-all"
            >
              <option value="all">All Phases</option>
              <option value="p1">Phase 1 (Proposal &amp; Design)</option>
              <option value="p2">Phase 2 (Development)</option>
              <option value="p3">Phase 3 (Evaluation &amp; Defense)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#64748B]">
              <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
            </div>
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={() => alert('Exporting full project cohort matrix (CSV/PDF) generated.')}
            className="h-[48px] px-4 rounded-xl bg-[#F4F6F9] hover:bg-[#efedf0] text-[#002D71] text-xs font-medium flex items-center gap-1.5 transition-colors border border-[#E2E8F0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Export</span>
          </button>

          {/* Assign Jury Button */}
          <button
            type="button"
            onClick={() => onNavigate('approval-step-2')}
            className="h-[48px] px-4 rounded-xl bg-[#164783] hover:bg-[#002D71] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ml-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Assign Jury</span>
            <span className="material-symbols-outlined text-[16px] -mr-1">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-[#f5f3f6] text-[#64748B] font-eyebrow text-[11px] uppercase tracking-wider h-[52px] border-b border-[#E2E8F0]">
                <th className="pl-6 pr-4 font-semibold" scope="col">PROJECT</th>
                <th className="px-4 font-semibold" scope="col">SUPERVISOR</th>
                <th className="px-4 font-semibold" scope="col">JURY</th>
                <th className="px-4 font-semibold text-center" scope="col">MILESTONE</th>
                <th className="px-4 font-semibold min-w-[150px]" scope="col">PROGRESS %</th>
                <th className="px-4 font-semibold" scope="col">HEALTH</th>
                <th className="pr-6 pl-4 text-right font-semibold" scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 text-[#1E293B] text-sm">
              {filteredProjects.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`h-[76px] hover:bg-[#F4F6F9]/50 transition-colors group ${
                    idx % 2 === 1 ? 'bg-[#F4F6F9]/20' : ''
                  }`}
                >
                  {/* Project */}
                  <td className="pl-6 pr-4 py-3">
                    <div className="flex flex-col max-w-[280px]">
                      <span className="text-sm text-[#002D71] font-semibold line-clamp-1 group-hover:text-[#FD7A12] transition-colors">
                        {p.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-[#64748B] font-mono tracking-tight">
                          {p.id}
                        </span>
                        <span className="text-[#CBD5E1] text-[10px]">•</span>
                        <span className="text-[11px] text-[#64748B]">Lead: {p.leadName}</span>
                      </div>
                    </div>
                  </td>

                  {/* Supervisor */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full ${
                          p.supervisor.avatarBg || 'bg-[#EAF5FC]'
                        } text-[#002D71] text-[11px] font-semibold flex items-center justify-center`}
                      >
                        {p.supervisor.initials}
                      </div>
                      <span className="text-xs text-[#1E293B] font-medium">{p.supervisor.name}</span>
                    </div>
                  </td>

                  {/* Jury */}
                  <td className="px-4 py-3">
                    {p.jury.assigned ? (
                      <div className="flex items-center gap-1.5 text-[#1E293B] text-xs font-medium">
                        <span className="truncate max-w-[130px]">{p.jury.leadJury}</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#efedf0] text-[#64748B] text-[10px] font-semibold tracking-wide">
                          +{p.jury.additionalCount} more
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigate('approval-step-2')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-[11px] font-medium hover:bg-[#FFF4DF]/80 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">person_add</span>
                        Not assigned
                      </button>
                    )}
                  </td>

                  {/* Milestone */}
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#efedf0] text-[#002D71] text-xs font-semibold">
                      {p.milestone}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1 w-full max-w-[130px]">
                      <div className="flex items-center justify-between text-xs text-[#64748B]">
                        <span className={`font-semibold ${p.phase === 'Overdue' ? 'text-[#C2392F]' : 'text-[#1E293B]'}`}>
                          {p.progress}%
                        </span>
                        <span className="text-[10px]">{p.phase}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#efedf0] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            p.health === 'At Risk'
                              ? 'bg-[#C2392F]'
                              : p.health === 'Watch'
                              ? 'bg-[#B26B00]'
                              : 'bg-[#FD7A12]'
                          }`}
                          style={{ width: `${p.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Health */}
                  <td className="px-4 py-3">
                    {p.health === 'On Track' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1E5] text-[#FD7A12] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
                        On Track
                      </span>
                    )}
                    {p.health === 'Watch' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B26B00]"></span>
                        Watch
                      </span>
                    )}
                    {p.health === 'At Risk' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2392F]"></span>
                        At Risk
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="pr-6 pl-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate('proposal-review')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#002D71] hover:bg-[#F4F6F9] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Open</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0]">
          <span className="text-xs text-[#64748B]">
            Showing 1 to {filteredProjects.length} of 42 projects
          </span>
          <div className="flex items-center gap-1 select-none">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="h-9 px-3 rounded-lg text-[#64748B] hover:bg-[#F4F6F9] text-xs disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer border border-[#E2E8F0]"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors shadow-xs ${
                currentPage === 1
                  ? 'bg-[#164783] text-white'
                  : 'text-[#1E293B] hover:bg-[#F4F6F9] border border-[#E2E8F0]'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors shadow-xs ${
                currentPage === 2
                  ? 'bg-[#164783] text-white'
                  : 'text-[#1E293B] hover:bg-[#F4F6F9] border border-[#E2E8F0]'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors shadow-xs ${
                currentPage === 3
                  ? 'bg-[#164783] text-white'
                  : 'text-[#1E293B] hover:bg-[#F4F6F9] border border-[#E2E8F0]'
              }`}
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className="h-9 px-3 rounded-lg text-[#002D71] hover:bg-[#F4F6F9] text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer border border-[#E2E8F0]"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Advisory Notice */}
      <div className="p-4 rounded-[16px] bg-[#FFF1E5] flex items-start gap-4 border border-[#FD7A12]/20">
        <div className="w-8 h-8 rounded-lg bg-white text-[#FD7A12] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <span className="material-symbols-outlined text-[18px]">info</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#002D71]">
            Institutional Advisory • Jury Harmonization Notice
          </span>
          <p className="text-xs text-[#002D71]/80 leading-relaxed mt-0.5">
            Projects categorized under &quot;Watch&quot; or &quot;At Risk&quot; will be scheduled for formal internal progress review prior to defense clearance. Panels with pending jury invitations must be finalized by 5:00 PM next Friday to ensure adherence to academic senate deadlines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupsProjectsView;
