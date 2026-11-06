import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  Search,
  BookOpen,
  ArrowRight,
  Send,
  FileCheck2,
  Check
} from 'lucide-react';

export const SubmissionReviewScreen: React.FC = () => {
  const {
    supervisorSubmissions,
    activeSubmissionId,
    setActiveSubmissionId,
    reviewSubmission,
    setHandbookOpen,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'revision'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const currentSubmission =
    supervisorSubmissions.find((s) => s.id === activeSubmissionId) ||
    supervisorSubmissions[0];

  const [feedbackText, setFeedbackText] = useState(currentSubmission.supervisorFeedback || '');

  // Keep feedback text updated when selected submission changes
  React.useEffect(() => {
    if (currentSubmission) {
      setFeedbackText(currentSubmission.supervisorFeedback || '');
    }
  }, [currentSubmission.id]);

  const handleSnippetClick = (snippet: string) => {
    setFeedbackText((prev) => (prev ? `${prev}\n- ${snippet}` : `- ${snippet}`));
    showToast(`Added feedback snippet: "${snippet}"`, 'info');
  };

  const filteredSubmissions = supervisorSubmissions.filter((s) => {
    const matchesSearch =
      s.projectTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.leadName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.projectCode.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'pending') return s.status === 'pending_review';
    if (activeTab === 'accepted') return s.status === 'accepted';
    if (activeTab === 'revision') return s.status === 'revision_requested';
    return true;
  });

  const pendingCount = supervisorSubmissions.filter((s) => s.status === 'pending_review').length;
  const acceptedCount = supervisorSubmissions.filter((s) => s.status === 'accepted').length;
  const revisionCount = supervisorSubmissions.filter((s) => s.status === 'revision_requested').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase">
            CAPSTONE SUPERVISION · SEMESTER EVALUATION CYCLE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-0.5">
            Submission Review
          </h1>
          <p className="text-sm text-[#64748B]">
            Review project submissions and provide feedback to your assigned groups.
          </p>
        </div>

        {/* 3 Status Summary Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">PENDING</span>
            <span className="text-sm font-bold font-mono text-[#FD7A12]">
              {pendingCount || 4} Submissions
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">ACCEPTED</span>
            <span className="text-sm font-bold font-mono text-emerald-700">
              {acceptedCount || 8} Submissions
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">REVISIONS</span>
            <span className="text-sm font-bold font-mono text-amber-700">
              {revisionCount || 2} Submissions
            </span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by project title or group name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71]"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-[#002D71] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Submissions ({supervisorSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'pending'
                ? 'bg-white text-[#002D71] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Review ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('accepted')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'accepted'
                ? 'bg-white text-[#002D71] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Accepted ({acceptedCount})
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'revision'
                ? 'bg-white text-[#002D71] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Revision Requested ({revisionCount})
          </button>
        </div>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <span className="font-bold uppercase tracking-wider">SUBMISSIONS QUEUE</span>
            <span>Sorted by Date · Latest First</span>
          </div>

          <div className="space-y-2.5">
            {filteredSubmissions.map((sub) => {
              const isSelected = sub.id === currentSubmission.id;

              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubmissionId(sub.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#002D71] bg-slate-50 shadow-xs ring-1 ring-[#002D71]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {sub.projectCode}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                        sub.status === 'accepted'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : sub.status === 'revision_requested'
                          ? 'bg-[#FFF4DF] text-[#B26B00]'
                          : 'bg-[#FDE8E6] text-[#C2392F]'
                      }`}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1E293B] line-clamp-1">
                    {sub.projectTitle}
                  </h4>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Lead: <strong className="text-slate-800">{sub.leadName}</strong> ·{' '}
                    {sub.teamMembers?.length || 2} Members
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <span className="font-medium text-slate-600">{sub.milestoneTitle}</span>
                    <span>{sub.submittedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Evaluation Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#002D71] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                ACTIVE EVALUATION · #{currentSubmission.projectCode}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  currentSubmission.status === 'accepted'
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : currentSubmission.status === 'revision_requested'
                    ? 'bg-[#FFF4DF] text-[#B26B00]'
                    : 'bg-[#FDE8E6] text-[#C2392F]'
                }`}
              >
                • {currentSubmission.status.replace('_', ' ')}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#1E293B] mt-1">
              {currentSubmission.projectTitle}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Lead: <strong className="text-slate-900">{currentSubmission.leadName}</strong> ·{' '}
              {currentSubmission.teamMembers?.join(' · ')} · {currentSubmission.department}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="font-bold text-[#002D71]">{currentSubmission.milestoneTitle}</span>
              <span>·</span>
              <span>Submitted: {currentSubmission.submittedAt}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                On-time
              </span>
            </div>
          </div>

          {/* Submitted Deliverables List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                Submitted Deliverables ({currentSubmission.files?.length || 0} files attached)
              </h4>
              <button
                onClick={() => showToast('Downloading all deliverable files (ZIP)', 'info')}
                className="text-xs font-semibold text-[#002D71] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All (ZIP)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSubmission.files?.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{f.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {f.type} · {f.size}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => showToast(`Previewing ${f.name}`, 'info')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-white"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showToast(`Downloading ${f.name}`, 'info')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-white"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback for Students Form */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                Feedback for Students
              </label>
              <span className="text-[11px] text-slate-400">Markdown supported</span>
            </div>

            <p className="text-xs text-slate-500">
              Provide actionable comments, critique, or required adjustments before finalizing your
              review.
            </p>

            <textarea
              rows={5}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter feedback for student group..."
              className="w-full p-3.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71] leading-relaxed"
            />

            {/* Quick Snippets */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                Quick snippets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSnippetClick('Clarify architecture flow and failover mechanisms')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-lg transition-colors"
                >
                  + Clarify architecture flow
                </button>
                <button
                  type="button"
                  onClick={() => handleSnippetClick('Update bibliography citations per IEEE standard')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-lg transition-colors"
                >
                  + Update bibliography citations
                </button>
                <button
                  type="button"
                  onClick={() => handleSnippetClick('Benchmark performance tests with testbed dataset')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-lg transition-colors"
                >
                  + Benchmark performance tests
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={() => reviewSubmission(currentSubmission.id, 'pending', feedbackText)}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Leave as Pending
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => reviewSubmission(currentSubmission.id, 'revision', feedbackText)}
                className="px-4 py-2 bg-amber-50 border border-amber-200 text-[#B26B00] text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Request Revision</span>
              </button>

              <button
                onClick={() => reviewSubmission(currentSubmission.id, 'accept', feedbackText)}
                className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept Submission</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Accepting will advance students to next milestone. Revision requests notify student leads
            immediately via email and portal.
          </p>
        </div>
      </div>

      {/* FYP Committee Assessment Guidelines Footer Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-[#002D71]" />
          <div>
            <div className="text-xs font-bold text-slate-900">
              FYP Committee Assessment Guidelines
            </div>
            <div className="text-[11px] text-slate-500">
              Refer to Section 4.2 for Mid-Term System Design evaluation rubrics and grading standards.
            </div>
          </div>
        </div>

        <button
          onClick={() => setHandbookOpen(true)}
          className="text-xs font-semibold text-[#002D71] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View Handbook</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
