import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockSupervisedProjectsList } from '../../data/mockData';
import {
  FolderGit2,
  FileCheck2,
  Clock,
  ArrowRight,
  Search,
  User,
  Building,
  Mail,
  BookOpen,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SupervisorDashboard: React.FC = () => {
  const {
    currentUser,
    setCurrentScreen,
    setActiveSubmissionId,
    setHandbookOpen,
    switchRole
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockSupervisedProjectsList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Top Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            SPRING SEMESTER 2025
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Good morning, Dr. Rahman.
          </h1>
          <p className="text-sm text-[#475569] mt-0.5">
            You have <strong className="text-[#C2392F]">3 student submissions</strong> awaiting
            your review and 5 assigned FYP groups.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('supervisor-submissions')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Quick Review (3)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              ASSIGNED PROJECTS
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-[#002D71]">5</span>
              <span className="text-xs font-semibold text-slate-700">Active Groups</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">18 Students across 5 Capstone Projects</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#002D71] flex items-center justify-center shrink-0">
            <FolderGit2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              PENDING REVIEWS
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-[#C2392F]">3</span>
              <span className="text-xs font-semibold text-slate-700">Deliverables</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Requires supervisor feedback and sign-off
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C2392F] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              UPCOMING DEADLINE
            </div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              Oct 17 <span className="text-xs font-normal text-slate-500">5:00 PM</span>
            </div>
            <div className="text-[11px] text-[#FD7A12] font-semibold mt-1">
              Milestone 3: Architecture & System Design
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FD7A12] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Two Column Grid: Projects List + Supervisor Profile Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: My Supervised Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#1E293B]">My Supervised Projects</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 font-mono">
                {mockSupervisedProjectsList.length}
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter projects by title, lead..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002D71] w-full sm:w-60"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredProjects.map((p) => {
              let statusBadge = (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                  {p.status}
                </span>
              );

              if (p.status === 'Needs Action') {
                statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDE8E6] text-[#C2392F]">
                    • Needs Action
                  </span>
                );
              } else if (p.status === 'In Review') {
                statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-[#01B0F1]">
                    • In Review
                  </span>
                );
              } else if (p.status === 'Approved') {
                statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                    • Approved
                  </span>
                );
              } else if (p.status === 'Needs Revision') {
                statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF4DF] text-[#B26B00]">
                    • Needs Revision
                  </span>
                );
              }

              return (
                <div
                  key={p.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E2E8F0] text-[#002D71] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {p.lead.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 hover:text-[#002D71] cursor-pointer">
                        {p.title}
                      </h4>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">{p.id}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Lead: <strong className="text-slate-800">{p.lead}</strong> · {p.membersCount} Members ·{' '}
                        <span className="text-[#002D71] font-semibold">{p.milestone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {statusBadge}
                    <button
                      onClick={() => {
                        if (p.id === 'FYP-CS-2025-042') {
                          setActiveSubmissionId('sub-042');
                          setCurrentScreen('supervisor-submissions');
                        } else {
                          setCurrentScreen('supervisor-projects');
                        }
                      }}
                      className="px-3 py-1 text-xs font-semibold text-[#002D71] hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Supervisor Profile & Guidelines */}
        <div className="space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#002D71] text-white flex items-center justify-center font-bold text-base shrink-0">
                AR
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Dr. Ahmed Rahman</h4>
                <div className="text-xs text-slate-600">Associate Professor</div>
                <div className="text-xs text-slate-500">Dept. of Computer Science & SE</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Academic Year</span>
                <span className="font-mono font-semibold text-slate-800">2024 — 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Office Location</span>
                <span className="text-slate-800 font-medium">Tech Block Room 304</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Institutional Email</span>
                <span className="font-mono text-[#002D71] text-[11px]">a.rahman@university.edu</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">SUPERVISION CAPACITY</span>
                <span className="font-mono font-bold text-slate-900">5 / 6 Projects</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#002D71] w-[83%]" />
              </div>
              <div className="text-[10px] text-slate-400 mt-1">1 vacancy remaining</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setCurrentScreen('student-settings')}
                className="text-[#002D71] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Manage Profile</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={() => switchRole('student')}
                className="text-[#C2392F] font-semibold hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Switch Role</span>
              </button>
            </div>
          </div>

          {/* Handbook Guidelines Card */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#002D71]" />
              <h4 className="text-xs font-bold text-slate-900">Need Supervisor Guidelines?</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review university capstone marking standards, revision protocols, and viva rubrics.
            </p>
            <button
              onClick={() => setHandbookOpen(true)}
              className="text-xs font-bold text-[#002D71] hover:text-[#01B0F1] flex items-center gap-1 mt-2"
            >
              <span>Open Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
