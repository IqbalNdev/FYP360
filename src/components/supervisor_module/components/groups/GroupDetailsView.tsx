import React from 'react';
import { SupervisedProject, ActiveView } from '../../types';

interface GroupDetailsViewProps {
  project: SupervisedProject;
  projects: SupervisedProject[];
  onSelectProject: (projectId: string) => void;
  setActiveView: (view: ActiveView) => void;
  onPreviewDocument: (docName: string) => void;
}

export const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  project,
  projects,
  onSelectProject,
  setActiveView,
  onPreviewDocument,
}) => {
  return (
    <div className="w-full max-w-[940px] mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Top Action / Context Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('my-groups')}
            className="inline-flex items-center gap-2 text-[#475569] hover:text-[#002D71] transition-colors text-xs font-semibold group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>← All groups</span>
          </button>

          {/* Quick Group Selector Dropdown */}
          <select
            value={project.id}
            onChange={(e) => onSelectProject(e.target.value)}
            className="text-xs bg-white border border-[#E2E8F0] text-[#002D71] font-semibold py-1.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01B0F1] cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#475569] text-xs font-medium border border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[15px] text-[#01B0F1]">
              visibility
            </span>
            <span>Supervisor Read-Only View</span>
          </span>
        </div>
      </div>

      {/* Header Block */}
      <div className="bg-white rounded-[20px] p-7 shadow-sm border border-[#E2E8F0] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-bold text-[#FD7A12] tracking-wider uppercase">
              OFFICIAL PROJECT WORKSPACE · KIET
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold border border-[#16A34A]/20">
              <span
                className="material-symbols-outlined text-[16px] text-[#16A34A]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>{project.status}</span>
            </span>
          </div>
          <h1 className="text-3xl text-[#002D71] font-medium tracking-tight">
            {project.name}
          </h1>
        </div>

        {/* Metadata Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase">
              Project ID
            </span>
            <span className="text-xs font-semibold text-[#002D71]">
              {project.code}
            </span>
          </div>
          <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase">
              Project type
            </span>
            <span className="text-xs font-semibold text-[#1E293B]">
              {project.type}
            </span>
          </div>
          <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase">
              Domain
            </span>
            <span className="text-xs font-semibold text-[#1E293B] truncate">
              {project.domain}
            </span>
          </div>
          <div className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-1">
            <span className="text-xs font-bold text-[#475569] uppercase">
              Phase
            </span>
            <span className="text-xs font-semibold text-[#1E293B]">
              {project.phase}
            </span>
          </div>
        </div>
      </div>

      {/* Overview 2-Column Split: Description & Technology */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Project Description */}
        <div className="md:col-span-7 bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#01B0F1]">
                <span className="material-symbols-outlined text-[18px]">
                  subject
                </span>
              </div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Project description
              </h2>
            </div>
            <p className="text-sm text-[#1E293B] leading-relaxed mt-1">
              {project.description}
            </p>
          </div>
          <div className="pt-5 mt-4 flex items-center justify-between text-[#475569] text-xs border-t border-[#E2E8F0]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#16A34A]">
                verified
              </span>
              Curriculum Alignment Verified
            </span>
            <span className="text-[#475569]">Scope: 2 Academic Semesters</span>
          </div>
        </div>

        {/* Card 2: Technology */}
        <div className="md:col-span-5 bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF4EB] flex items-center justify-center text-[#FD7A12]">
                <span className="material-symbols-outlined text-[18px]">
                  code_blocks
                </span>
              </div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Technology
              </h2>
            </div>
            <p className="text-xs text-[#475569]">
              Approved technology stack for prototype development
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#E0F2FE] text-[#002D71] text-xs font-medium inline-flex items-center gap-1.5 border border-[#01B0F1]/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01B0F1]" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-5 mt-4 text-[#475569] text-xs flex items-center gap-1.5 border-t border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Stack changes require supervisor approval</span>
          </div>
        </div>
      </div>

      {/* Card 3: Project Team */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#002D71]">
              <span className="material-symbols-outlined text-[18px]">
                group
              </span>
            </div>
            <h2 className="text-lg font-medium text-[#002D71]">Project team</h2>
          </div>
          <span className="text-xs text-[#475569]">
            {project.team.length} Students Registered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.team.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('');
            return (
              <div
                key={member.id}
                className="bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-full font-bold text-sm flex items-center justify-center ${
                      member.isLead
                        ? 'bg-[#FFF4EB] text-[#FD7A12] border border-[#FD7A12]/30'
                        : 'bg-[#E0F2FE] text-[#002D71]'
                    }`}
                  >
                    {initials}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                      member.isLead
                        ? 'bg-[#FD7A12] text-white shadow-xs'
                        : 'bg-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#002D71] truncate">
                    {member.name}
                  </span>
                  <span className="text-xs text-[#475569]">{member.id}</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-[#475569] text-xs border-t border-[#E2E8F0]">
                  <span>{member.subrole}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.isLead ? 'bg-[#FD7A12]' : 'bg-[#01B0F1]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 4: Milestone Timeline */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF4EB] flex items-center justify-center text-[#FD7A12]">
              <span className="material-symbols-outlined text-[18px]">
                timeline
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#002D71]">
                Milestone timeline
              </h2>
              <p className="text-xs text-[#475569]">
                8-step milestone progression for FYP sequence
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('meetings-tasks')}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#002D71] text-white text-xs font-semibold hover:bg-[#003B8F] transition-colors shadow-sm cursor-pointer"
          >
            <span>Open tasks</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Horizontal 8-Step Timeline */}
        <div className="w-full overflow-x-auto pb-2 no-scrollbar">
          <div className="min-w-[760px] flex items-start justify-between relative pt-2">
            <div className="absolute top-[21px] left-6 right-6 h-0.5 bg-[#E2E8F0] -z-0" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </div>
              <span className="text-xs font-semibold text-[#002D71] mt-2">
                Proposal Foundation
              </span>
              <span className="text-[10px] text-[#16A34A] font-bold mt-0.5 uppercase">
                Complete
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </div>
              <span className="text-xs font-semibold text-[#002D71] mt-2">
                Literature & Req.
              </span>
              <span className="text-[10px] text-[#16A34A] font-bold mt-0.5 uppercase">
                Complete
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs animate-pulse">
                3
              </div>
              <span className="text-xs font-semibold text-[#DC2626] mt-2">
                System Design
              </span>
              <span className="text-[10px] text-[#DC2626] font-bold mt-0.5 uppercase">
                Overdue
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                4
              </div>
              <span className="text-xs font-semibold text-[#002D71] mt-2">
                Core Prototype
              </span>
              <span className="text-[10px] text-[#F59E0B] font-bold mt-0.5 uppercase">
                In progress
              </span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-medium ring-4 ring-white">
                5
              </div>
              <span className="text-xs text-[#475569] mt-2">Feature Completion</span>
              <span className="text-[10px] text-[#475569] mt-0.5 uppercase">
                Upcoming
              </span>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-medium ring-4 ring-white">
                6
              </div>
              <span className="text-xs text-[#475569] mt-2">Testing & Validation</span>
              <span className="text-[10px] text-[#475569] mt-0.5 uppercase">
                Upcoming
              </span>
            </div>

            {/* Step 7 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-medium ring-4 ring-white">
                7
              </div>
              <span className="text-xs text-[#475569] mt-2">Final Report</span>
              <span className="text-[10px] text-[#475569] mt-0.5 uppercase">
                Upcoming
              </span>
            </div>

            {/* Step 8 */}
            <div className="flex flex-col items-center text-center relative z-10 w-24">
              <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-xs font-medium ring-4 ring-white">
                8
              </div>
              <span className="text-xs text-[#475569] mt-2">Defense Readiness</span>
              <span className="text-[10px] text-[#475569] mt-0.5 uppercase">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 5: Documents */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#01B0F1]">
              <span className="material-symbols-outlined text-[18px]">
                folder_open
              </span>
            </div>
            <h2 className="text-lg font-medium text-[#002D71]">Documents</h2>
          </div>
          <span className="text-xs text-[#475569]">
            {project.documents.length} Assets Archival Ready
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {project.documents.map((doc, idx) => (
            <div
              key={idx}
              className="h-[72px] bg-[#F4F6F9] border border-[#E2E8F0] rounded-xl px-5 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs ${
                    doc.type === 'pdf' ? 'text-[#DC2626]' : 'text-[#002D71]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {doc.type === 'pdf' ? 'picture_as_pdf' : 'terminal'}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#002D71] truncate">
                    {doc.title}
                  </span>
                  <span className="text-xs text-[#475569] truncate">
                    {doc.status} {doc.size ? `· ${doc.size}` : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {doc.verified && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">
                      check
                    </span>{' '}
                    Verified
                  </span>
                )}
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-100 text-[#002D71] text-xs font-medium transition-colors shadow-xs"
                  >
                    <span>Open repository</span>
                    <span className="material-symbols-outlined text-[16px]">
                      open_in_new
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onPreviewDocument(doc.title)}
                    className="w-9 h-9 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-100 flex items-center justify-center text-[#475569] hover:text-[#002D71] transition-colors shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Notice */}
      <div className="bg-[#E0F2FE]/70 border border-[#01B0F1]/30 rounded-xl px-5 py-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-[#01B0F1] shrink-0">
          info
        </span>
        <p className="text-xs text-[#002D71] font-medium">
          Approved proposal is archived and verified in KIET Institutional Repository.
        </p>
      </div>
    </div>
  );
};
