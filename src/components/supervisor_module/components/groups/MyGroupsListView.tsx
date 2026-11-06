import React from 'react';
import { SupervisedProject, ActiveView } from '../../types';

interface MyGroupsListViewProps {
  projects: SupervisedProject[];
  onSelectProject: (projectId: string) => void;
  setActiveView: (view: ActiveView) => void;
}

export const MyGroupsListView: React.FC<MyGroupsListViewProps> = ({
  projects,
  onSelectProject,
  setActiveView,
}) => {
  return (
    <div className="w-full max-w-[1040px] mx-auto p-10 pb-16 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#FD7A12] uppercase tracking-wider">
            FACULTY ROSTER · KIET
          </span>
          <h1 className="text-4xl text-[#002D71] font-light tracking-tight mt-1">
            Supervised Groups
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Overview of student capstone groups assigned to your supervision for 2024–2025.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] rounded-xl text-xs font-semibold text-[#16A34A] border border-[#16A34A]/20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          4 of 5 Allocation Active
        </div>
      </div>

      {/* Grid of groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              onSelectProject(project.id);
              setActiveView('group-details');
            }}
            className="bg-white rounded-[20px] p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#01B0F1]/50 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#475569] uppercase tracking-wide">
                  {project.code}
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${
                    project.status === 'Approved'
                      ? 'bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20'
                      : project.status === 'New Assigned'
                      ? 'bg-[#E0F2FE] text-[#002D71] border-[#01B0F1]/30'
                      : 'bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/20'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-[#002D71] group-hover:text-[#FD7A12] transition-colors leading-snug">
                {project.name}
              </h2>
              <p className="text-xs text-[#475569] mt-2 line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#475569]">
                <span>Team Lead: <strong className="text-[#002D71]">{project.leadName}</strong></span>
                <span>{project.team.length} members</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      project.healthStatus === 'Healthy'
                        ? 'bg-[#16A34A]'
                        : project.healthStatus === 'Watch'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#DC2626]'
                    }`}
                    style={{ width: `${project.milestoneProgress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#002D71]">
                  {project.milestoneProgress}%
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#475569]">
                  {project.currentMilestone}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FD7A12] group-hover:translate-x-0.5 transition-transform">
                  Open workspace
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
