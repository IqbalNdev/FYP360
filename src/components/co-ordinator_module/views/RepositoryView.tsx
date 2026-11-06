import { useState } from 'react';
import { initialRepositoryProjects } from '../mockData';
import { RepositoryProject } from '../types';

interface RepositoryViewProps {
  onShowToast: (message: string) => void;
}

export default function RepositoryView({ onShowToast }: RepositoryViewProps) {
  const [projects] = useState<RepositoryProject[]>(initialRepositoryProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<RepositoryProject | null>(null);

  const filteredProjects = projects.filter((p) => {
    const pTags = p.tags || p.technologies || [];
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pTags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = yearFilter === 'All' || p.year.toString() === yearFilter;
    const matchesDomain = domainFilter === 'All' || p.domain.toLowerCase().includes(domainFilter.toLowerCase());
    return matchesSearch && matchesYear && matchesDomain;
  });

  return (
    <div className="flex flex-col w-full max-w-[1040px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase font-bold tracking-widest block">
            KNOWLEDGE BASE
          </span>
          <h1 className="font-headline-lg text-[#002D71] font-light tracking-tight">
            Repository
          </h1>
          <p className="font-body-lg text-[#64748B]">
            Official project archive for originality verification.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E2E8F0] shadow-xs">
          <span className="material-symbols-outlined text-[18px] text-[#FD7A12]">history_edu</span>
          <span className="font-label-md text-xs text-[#64748B]">
            <strong className="text-[#002D71]">148</strong> archived projects indexed
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-[20px] p-4 shadow-xs border border-[#E2E8F0] flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined text-[20px] text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search project title, keywords, or abstract..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#faf9fc] text-[#1E293B] placeholder-[#64748B] text-sm focus:outline-none focus:bg-white border border-[#E2E8F0] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Year select */}
          <div className="relative w-1/2 md:w-36">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full h-11 px-3 pr-8 rounded-xl bg-[#faf9fc] text-[#1E293B] text-xs font-medium border border-[#E2E8F0] appearance-none cursor-pointer focus:outline-none"
            >
              <option value="All">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Domain select */}
          <div className="relative w-1/2 md:w-44">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full h-11 px-3 pr-8 rounded-xl bg-[#faf9fc] text-[#1E293B] text-xs font-medium border border-[#E2E8F0] appearance-none cursor-pointer focus:outline-none"
            >
              <option value="All">All Domains</option>
              <option value="AI">AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="IoT">IoT</option>
              <option value="Blockchain">Blockchain</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Repository Cards List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-[20px] p-8 text-center border border-[#E2E8F0] text-[#64748B]">
            <span className="material-symbols-outlined text-[40px] text-[#CBD5E1] mb-2">find_in_page</span>
            <p className="font-body-md font-medium text-[#002D71]">No repository projects found</p>
            <p className="text-xs text-[#64748B] mt-1">Try resetting search filters or keywords.</p>
          </div>
        ) : (
          filteredProjects.map((proj) => {
            const tags = proj.tags || proj.technologies || [];
            return (
              <div
                key={proj.id}
                className="bg-white rounded-[20px] p-6 shadow-xs hover:shadow-sm transition-all border border-[#E2E8F0] flex flex-col gap-3 group"
              >
                {/* Top Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-headline-sm text-[#164783] font-semibold group-hover:text-[#FD7A12] transition-colors">
                      {proj.title}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EAF5FC] text-[#002D71] font-label-md text-xs font-medium">
                      {proj.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF1E5] text-[#FD7A12] font-label-md text-xs font-medium">
                      {proj.domain}
                    </span>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E5] text-[#002D71] font-label-md text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">verified_user</span>
                      <span>{proj.matchScore}% match · Search relevance (Advisory)</span>
                    </span>
                  </div>
                </div>

                {/* Abstract */}
                <p className="font-body-md text-[#475569] leading-relaxed text-sm">
                  {proj.abstract}
                </p>

                {/* Technology Chips & Navigation Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#F4F6F9]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tags.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-[#F4F6F9] text-[#475569] font-label-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex items-center gap-1 text-[#FD7A12] hover:text-[#002D71] font-label-lg text-xs font-medium transition-colors shrink-0 cursor-pointer"
                    type="button"
                  >
                    <span>View details</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Institutional Footer Advisory Notice */}
      <div className="p-4 bg-[#FFF1E5] rounded-xl flex items-center gap-3 text-[#002D71] border border-[#FD7A12]/20">
        <span className="material-symbols-outlined text-[20px] text-[#FD7A12] shrink-0">info</span>
        <p className="font-label-md text-xs leading-relaxed">
          Repository records provide semantic baselines for automated originality verification. AI similarity scores are advisory.
        </p>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#002D71]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 shadow-2xl max-w-lg w-full flex flex-col border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#FD7A12]">inventory_2</span>
                <h3 className="font-headline-sm text-[#002D71] font-semibold">Repository Archive Record</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg hover:bg-[#efedf0] text-[#64748B] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <h4 className="font-headline-sm text-sm text-[#002D71] font-medium leading-snug">
                {selectedProject.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#EAF5FC] text-[#002D71] font-medium">
                  AY {selectedProject.year}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FFF1E5] text-[#FD7A12] font-medium">
                  {selectedProject.domain}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f5f3f6] text-[#64748B]">
                  Archive Ref: {selectedProject.id}
                </span>
              </div>
              <div className="p-3 bg-[#faf9fc] rounded-xl border border-[#E2E8F0]">
                <span className="text-[#64748B] font-bold uppercase text-[10px] tracking-wider block mb-1">
                  Full Abstract
                </span>
                <p className="text-[#1E293B] leading-relaxed">{selectedProject.abstract}</p>
              </div>
              <div>
                <span className="text-[#64748B] font-bold uppercase text-[10px] tracking-wider block mb-1">
                  Implemented Tech Stack
                </span>
                <div className="flex flex-wrap gap-1">
                  {(selectedProject.tags || selectedProject.technologies || []).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#efedf0] text-[#1E293B]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  onShowToast('Citation copied to clipboard (IEEE style).');
                  setSelectedProject(null);
                }}
                className="inline-flex items-center gap-1 text-xs text-[#FD7A12] font-medium hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                Copy Citation
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-[#002D71] text-white text-xs font-medium cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
