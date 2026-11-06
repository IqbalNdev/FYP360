import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockSupervisedProjectsList } from '../../data/mockData';
import {
  FolderGit2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  ArrowRight,
  FileText,
  Layers,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const SupervisedProjectsScreen: React.FC = () => {
  const { setCurrentScreen, setActiveMilestoneId, setActiveSubmissionId, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'progress' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('FYP-CS-2025-004');

  const selectedProject =
    mockSupervisedProjectsList.find((p) => p.id === selectedProjectId) ||
    mockSupervisedProjectsList[0];

  const filteredProjects = mockSupervisedProjectsList.filter((p) => {
    const matches =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matches) return false;

    if (activeTab === 'progress') return p.status === 'In Progress';
    if (activeTab === 'pending') return p.status === 'Pending Review' || p.status === 'Needs Action';
    if (activeTab === 'completed') return p.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            SUPERVISION ROSTER · SPRING SEMESTER 2025
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">My Supervised Projects</h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF5FC] text-[#002D71] border border-[#01B0F1]/20">
              5 Assigned Projects
            </span>
          </div>
          <p className="text-sm text-[#64748B] mt-0.5">
            View and manage your assigned Final Year Projects.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project title or student/group name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-white text-[#002D71] shadow-xs' : 'text-slate-600'
            }`}
          >
            All (5)
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'progress' ? 'bg-white text-[#002D71] shadow-xs' : 'text-slate-600'
            }`}
          >
            In Progress (2)
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'pending' ? 'bg-white text-[#002D71] shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending Review (2)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'completed' ? 'bg-white text-[#002D71] shadow-xs' : 'text-slate-600'
            }`}
          >
            Completed (1)
          </button>
        </div>
      </div>

      {/* Main Grid: Cohort Table + Right Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Projects Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#002D71]" />
                <h3 className="text-sm font-bold text-[#1E293B]">Assigned Projects Cohort</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredProjects.length} of {mockSupervisedProjectsList.length} Projects
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-[#1E293B] font-semibold">
                  <tr>
                    <th className="py-3 px-4">PROJECT DETAILS</th>
                    <th className="py-3 px-4">STUDENT / GROUP</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4">LAST UPDATED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((proj) => {
                    const isSelected = proj.id === selectedProject.id;

                    return (
                      <tr
                        key={proj.id}
                        onClick={() => setSelectedProjectId(proj.id)}
                        className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-50 font-medium' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-mono text-[11px] text-slate-500">{proj.id}</div>
                          <div className="font-bold text-slate-900 line-clamp-1">{proj.title}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{proj.lead}</div>
                          <div className="text-[11px] text-slate-500">{proj.membersCount} Members</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              proj.status === 'Completed'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : proj.status === 'Needs Action' || proj.status === 'Needs Revision'
                                ? 'bg-[#FDE8E6] text-[#C2392F]'
                                : proj.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-sky-50 text-[#01B0F1]'
                            }`}
                          >
                            • {proj.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                          {proj.lastUpdated}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Click any row to inspect deliverables & submit assessments.</span>
            <span className="font-semibold text-[#002D71]">5 cohorts allocated this term</span>
          </div>
        </div>

        {/* Right: Inspector Drawer Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-500">{selectedProject.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-[#01B0F1]">
                • {selectedProject.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-[#1E293B]">{selectedProject.title}</h2>
            <div className="text-[11px] text-[#002D71] font-semibold mt-0.5">
              • {selectedProject.department.toUpperCase()}
            </div>
          </div>

          {/* Project Cohort */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              PROJECT COHORT
            </span>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900">Lead: {selectedProject.lead}</div>
              <div className="text-slate-600 mt-1">
                Members: {selectedProject.members.join(', ')}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Dept. of Computer Science & Software Engineering
              </div>
            </div>
          </div>

          {/* Assigned Supervisor */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              ASSIGNED SUPERVISOR
            </span>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-xs shrink-0">
                DR
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">Dr. Ahmed Rahman</div>
                <div className="text-slate-500">Associate Professor, Primary Advisor</div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              PROJECT DESCRIPTION / SCOPE
            </span>
            <p className="text-xs text-[#475569] leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {selectedProject.description}
            </p>
          </div>

          {/* Action Boxes */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => setCurrentScreen('supervisor-milestones')}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#002D71] hover:bg-slate-50/50 flex items-center justify-between text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#002D71]/10 text-[#002D71] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    View Full Project & Milestones
                  </div>
                  <div className="text-[11px] text-slate-500">
                    8 Milestones · Assign Tasks & Inspect Files
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setActiveSubmissionId('sub-042');
                setCurrentScreen('supervisor-submissions');
              }}
              className="w-full py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Submitted Files</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
