import React, { useState, useMemo } from 'react';
import { AppView, ProposalItem } from '../types';
import { mockProposals } from '../mockData';

interface ProposalsViewProps {
  onNavigate: (view: AppView) => void;
  onSelectProposal?: (proposal: ProposalItem) => void;
}

export const ProposalsView: React.FC<ProposalsViewProps> = ({
  onNavigate,
  onSelectProposal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [sortBy, setSortBy] = useState('submitted');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProposals = useMemo(() => {
    return mockProposals.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ideas.some((idea) =>
          idea.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchStatus =
        statusFilter === 'all' || p.status === statusFilter;

      const matchDomain =
        domainFilter === 'all' ||
        (domainFilter === 'ai' && p.topDomain.includes('AI')) ||
        (domainFilter === 'iot' && p.topDomain.includes('IoT')) ||
        (domainFilter === 'health' && p.topDomain.includes('Health')) ||
        (domainFilter === 'sec' && p.topDomain.includes('Cyber')) ||
        (domainFilter === 'web' && p.topDomain.includes('Web'));

      return matchSearch && matchStatus && matchDomain;
    });
  }, [searchQuery, statusFilter, domainFilter]);

  const handleReviewClick = (p: ProposalItem) => {
    if (onSelectProposal) {
      onSelectProposal(p);
    }
    onNavigate('proposal-review');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Advisory Banner */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#FFF1E5] rounded-2xl px-6 py-4 shadow-sm border border-[#FD7A12]/20">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#FD7A12] shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-[#002D71] font-semibold text-sm leading-tight">
              Institutional Plagiarism &amp; Overlap Engine Active
            </span>
            <span className="font-body-md text-[#64748B] text-xs leading-normal mt-0.5">
              Similarity metrics cross-reference 10 years of institutional archives and national FYP repositories. All overlap scores are marked as advisory.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="font-eyebrow text-[#FD7A12] uppercase text-[10px] bg-white px-2.5 py-1 rounded-full shadow-xs border border-[#FD7A12]/20 font-bold">
            Fall 2024 Evaluation Batch
          </span>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-eyebrow text-[#FD7A12] text-xs tracking-widest uppercase font-bold">
              PROPOSAL REVIEW
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
            <span className="font-label-md text-[#64748B] uppercase text-[11px] tracking-wider">
              Queue Stage 1
            </span>
          </div>
          <h1 className="font-headline-lg text-[#002D71] text-[36px] font-light tracking-tight leading-none mb-2">
            Proposals
          </h1>
          <p className="font-body-md text-sm text-[#64748B]">
            Review each group's three project ideas.
          </p>
        </div>

        {/* Quick Overview Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8705A] animate-pulse"></span>
            <span className="font-label-lg text-[#002D71] font-semibold text-sm">12</span>
            <span className="font-body-md text-[#64748B] text-xs">proposals pending review</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-[#E2E8F0] text-xs font-label-md text-[#64748B]">
            <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">history</span>
            <span>Deadline: Nov 05, 2024</span>
          </div>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-sm placeholder:text-[#64748B] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 transition-all border border-transparent focus:border-[#FD7A12]"
            placeholder="Search group lead, project title, or ID..."
          />
        </div>

        {/* Filter Dropdowns & Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none h-[48px] pl-4 pr-10 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-xs font-medium cursor-pointer focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent transition-all"
            >
              <option value="all">Status: All (Pending, Revision, Approved)</option>
              <option value="pending">Status: Pending (4)</option>
              <option value="revision">Status: Revision requested (1)</option>
              <option value="approved">Status: Approved (2)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Domain Filter */}
          <div className="relative">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="appearance-none h-[48px] pl-4 pr-10 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-xs font-medium cursor-pointer focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent transition-all"
            >
              <option value="all">Domain: All Domains</option>
              <option value="ai">AI / Machine Learning</option>
              <option value="iot">IoT / Embedded Systems</option>
              <option value="health">Healthcare / AI</option>
              <option value="sec">Cybersecurity</option>
              <option value="web">Web &amp; Mobile / AR</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none h-[48px] pl-4 pr-10 rounded-xl bg-[#F4F6F9] text-[#1E293B] text-xs font-medium cursor-pointer focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FD7A12]/30 border border-transparent transition-all"
            >
              <option value="submitted">Sort: Submission Date</option>
              <option value="similarity">Sort: Highest Similarity</option>
              <option value="id">Sort: FYP ID</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px] pointer-events-none">
              sort
            </span>
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={() => {
              alert('Exporting proposal batch summary (CSV/PDF) generated under departmental policy.');
            }}
            className="h-[48px] px-4 rounded-xl bg-[#002D71] text-white text-xs font-medium flex items-center gap-2 hover:bg-[#164783] transition-colors shadow-sm ml-auto lg:ml-0 cursor-pointer"
            title="Export batch proposal summary"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Proposals Table Card */}
      <div className="bg-white rounded-[20px] shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1040px]">
            <thead>
              <tr className="bg-[#f5f3f6] text-[#64748B] font-eyebrow text-[11px] uppercase tracking-wider select-none border-b border-[#E2E8F0]">
                <th className="py-4 px-6 font-bold w-[210px]" scope="col">
                  GROUP
                </th>
                <th className="py-4 px-6 font-bold w-[340px]" scope="col">
                  PROPOSED IDEAS
                </th>
                <th className="py-4 px-6 font-bold w-[180px]" scope="col">
                  TOP DOMAIN
                </th>
                <th className="py-4 px-6 font-bold w-[160px]" scope="col">
                  HIGHEST SIMILARITY %
                </th>
                <th className="py-4 px-6 font-bold w-[100px]" scope="col">
                  SUBMITTED
                </th>
                <th className="py-4 px-6 font-bold w-[150px]" scope="col">
                  STATUS
                </th>
                <th className="py-4 px-6 font-bold text-right w-[110px]" scope="col">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 text-[#1E293B] text-sm">
              {filteredProposals.map((proposal, idx) => (
                <tr
                  key={proposal.id}
                  className={`group hover:bg-[#f5f3f6]/60 transition-colors duration-150 align-top ${
                    idx % 2 === 1 ? 'bg-[#F4F6F9]/30' : ''
                  }`}
                >
                  {/* Group Lead & ID */}
                  <td className="py-5 px-6">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${
                          proposal.avatarBg || 'bg-[#164783]'
                        } ${
                          proposal.id === 'FYP-CS-2025-031' ? 'text-[#C2392F]' : 'text-white'
                        } text-xs font-semibold flex items-center justify-center shrink-0 tracking-wide mt-0.5`}
                      >
                        {proposal.leadInitials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-[#002D71] group-hover:text-[#FD7A12] transition-colors truncate">
                          {proposal.leadName}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-mono tracking-tight mt-0.5">
                          {proposal.id}
                        </span>
                        <span className="text-[11px] text-[#64748B] mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">group</span>
                          {proposal.memberCount} members
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Proposed Ideas */}
                  <td className="py-5 px-6">
                    <ol className="space-y-1.5 text-xs text-[#1E293B]">
                      {proposal.ideas.map((idea, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1.5">
                          <span
                            className={`font-mono text-[11px] shrink-0 mt-0.5 ${
                              iIdx === 0
                                ? 'text-[#FD7A12] font-semibold'
                                : 'text-[#64748B]'
                            }`}
                          >
                            {iIdx + 1}.
                          </span>
                          <span
                            className={`line-clamp-1 ${
                              iIdx === 0
                                ? 'font-medium text-[#002D71]'
                                : 'text-[#64748B]'
                            }`}
                          >
                            {idea.title}
                            {idea.isPrimary && (
                              <span className="inline-block text-[10px] text-[#FD7A12] bg-[#FFF1E5] px-1.5 py-0.5 rounded font-semibold ml-1">
                                Primary
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </td>

                  {/* Top Domain */}
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#efedf0] text-xs font-medium text-[#002D71]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
                      {proposal.topDomain}
                    </span>
                  </td>

                  {/* Similarity % */}
                  <td className="py-5 px-6">
                    <div className="flex flex-col items-start gap-1">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          proposal.similarity > 80
                            ? 'bg-[#FDE8E6] text-[#C2392F]'
                            : proposal.similarity > 50
                            ? 'bg-[#FFF4DF] text-[#B26B00]'
                            : 'bg-[#FFF1E5] text-[#FD7A12]'
                        }`}
                      >
                        <span>{proposal.similarity}%</span>
                      </div>
                      <span className="font-eyebrow text-[#64748B] uppercase text-[9px] tracking-wider px-1 bg-[#efedf0] rounded">
                        advisory
                      </span>
                    </div>
                  </td>

                  {/* Submitted Date */}
                  <td className="py-5 px-6">
                    <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">
                      {proposal.submitted}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-5 px-6">
                    {proposal.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4DF] text-[#B26B00] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B26B00]"></span>
                        Pending
                      </span>
                    )}
                    {proposal.status === 'revision' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8E6] text-[#C2392F] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2392F]"></span>
                        Revision requested
                      </span>
                    )}
                    {proposal.status === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E5] text-[#FD7A12] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
                        Approved
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleReviewClick(proposal)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#002D71] hover:text-[#FD7A12] group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      Review <span className="text-sm">→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#f5f3f6] select-none border-t border-[#E2E8F0]">
          <div className="text-xs text-[#64748B]">
            Showing <span className="font-medium text-[#1E293B]">1</span> to{' '}
            <span className="font-medium text-[#1E293B]">{filteredProposals.length}</span> of{' '}
            <span className="font-medium text-[#1E293B]">12</span> pending proposals
          </div>
          {/* Pagination Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="h-8 px-3 rounded-lg bg-white text-[#64748B] text-xs font-medium opacity-50 cursor-not-allowed flex items-center gap-1 shadow-xs border border-[#E2E8F0]"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-[#002D71] text-white'
                    : 'bg-white hover:bg-[#efedf0] text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center ${
                  currentPage === 2
                    ? 'bg-[#002D71] text-white'
                    : 'bg-white hover:bg-[#efedf0] text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                2
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className="h-8 px-3 rounded-lg bg-white hover:bg-[#efedf0] text-[#002D71] text-xs font-medium transition-colors flex items-center gap-1 shadow-xs border border-[#E2E8F0] cursor-pointer"
            >
              <span>Next page</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Protocol Guidance Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFF1E5] text-[#FD7A12] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">rule</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#002D71]">Tri-Proposal Protocol</span>
            <span className="text-[11px] text-[#64748B] leading-relaxed mt-1">
              Each group provides 3 distinct ideas. Coordinators endorse exactly 1 primary path before supervisor assignment.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFF4DF] text-[#B26B00] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#002D71]">Similarity Advisory (&gt;70%)</span>
            <span className="text-[11px] text-[#64748B] leading-relaxed mt-1">
              High overlap triggers automated cross-batch flagging. Revisions may require narrowing scope or replacing duplicate modules.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#164783] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#002D71]">Review Window Notice</span>
            <span className="text-[11px] text-[#64748B] leading-relaxed mt-1">
              Faculty committee approval lock occurs on Friday 17:00 PKT. Unreviewed groups will automatically defer to round two.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalsView;
