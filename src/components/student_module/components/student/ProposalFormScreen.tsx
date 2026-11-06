import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectProposal } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Plus,
  X,
  Save,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const ProposalFormScreen: React.FC = () => {
  const {
    proposals,
    activeProposalId,
    saveProposal,
    setCurrentScreen,
    officialProject,
    showToast
  } = useApp();

  const currentProposal = proposals.find((p) => p.id === activeProposalId) || proposals[0];

  const [formData, setFormData] = useState<ProjectProposal>({ ...currentProposal });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (currentProposal) {
      setFormData({ ...currentProposal });
    }
  }, [currentProposal]);

  const isReadOnly = currentProposal.status === 'Approved';

  const handleTextChange = (field: keyof ProjectProposal, value: any) => {
    if (isReadOnly) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTech = () => {
    if (!techInput.trim() || isReadOnly) return;
    if (!formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    if (isReadOnly) return;
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  const handleSaveDraft = () => {
    saveProposal(formData);
  };

  const handleSaveAndContinue = () => {
    saveProposal(formData);
    // Move to next proposal or review
    if (formData.number < 3) {
      const nextProposal = proposals.find((p) => p.number === formData.number + 1);
      if (nextProposal) {
        setFormData({ ...nextProposal });
        return;
      }
    }
    setCurrentScreen('student-proposal-review');
  };

  // Compute word count for summary
  const summaryWords = formData.summary.trim() ? formData.summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => setCurrentScreen('student-proposal-overview')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002D71] hover:text-[#01B0F1] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Proposal overview</span>
        </button>
      </div>

      {/* Proposal Title & Stepper Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
            PROPOSAL {formData.number} OF 3
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
            {formData.title || 'Untitled Proposal'}
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Complete all required information for this project idea.
          </p>
        </div>

        {/* Step Circles 1, 2, 3 */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((num) => {
            const isCurrent = formData.number === num;
            const isCompleted = proposals.find((p) => p.number === num)?.status === 'Approved';

            return (
              <div
                key={num}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-[#01B0F1] text-white ring-2 ring-[#01B0F1]/30'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? '✓' : num}
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Approved Banner */}
      {isReadOnly ? (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700">
            <span className="font-bold block text-slate-900 mb-0.5">
              Official approved proposal.
            </span>
            This submitted record is read-only. Any amendment requires an authorized university
            workflow with the FYP Committee.
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#EAF5FC] border border-[#01B0F1]/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#01B0F1] shrink-0 mt-0.5" />
          <div className="text-xs text-[#002D71]">
            <span className="font-bold block mb-0.5">Editable Draft Proposal</span>
            You can modify the objectives, technical tools, and problem statement prior to final submission.
          </div>
        </div>
      )}

      {/* Section A: Group Information */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1E293B]">Group information</h3>
              <p className="text-[11px] text-[#64748B]">Shared automatically across all three proposals.</p>
            </div>
          </div>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Shared details
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {officialProject.team.map((member, idx) => (
            <div
              key={member.id}
              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#002D71] flex items-center justify-center font-bold text-xs shrink-0">
                {member.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{member.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Member {idx + 1} {member.isLead && '(Lead)'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  {member.studentId}
                </div>
                <div className="text-[11px] text-slate-400">{member.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section B: Project Information */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
            B
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B]">Project information</h3>
            <p className="text-[11px] text-[#64748B]">Describe the problem, purpose, and intended result.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1E293B] block mb-1">
              Proposed Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              disabled={isReadOnly}
              onChange={(e) => handleTextChange('title', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71] disabled:bg-slate-50 disabled:text-slate-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#1E293B]">Project Summary *</label>
              <span className="text-xs text-[#64748B] font-mono">{summaryWords} / 400 words</span>
            </div>
            <textarea
              rows={3}
              value={formData.summary}
              disabled={isReadOnly}
              onChange={(e) => handleTextChange('summary', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71] disabled:bg-slate-50 disabled:text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1E293B] block mb-1">
                Project Objectives *
              </label>
              <textarea
                rows={4}
                value={formData.objectives}
                disabled={isReadOnly}
                onChange={(e) => handleTextChange('objectives', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71] disabled:bg-slate-50 disabled:text-slate-700 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E293B] block mb-1">
                Expected Project Outcomes *
              </label>
              <textarea
                rows={4}
                value={formData.outcomes}
                disabled={isReadOnly}
                onChange={(e) => handleTextChange('outcomes', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002D71] disabled:bg-slate-50 disabled:text-slate-700 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Project Classification */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
            C
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B]">Project classification</h3>
            <p className="text-[11px] text-[#64748B]">Help the department identify the right review panel.</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#1E293B] block mb-2">Project Type *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isReadOnly}
              onClick={() => handleTextChange('type', 'Research-Based Project')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                formData.type === 'Research-Based Project'
                  ? 'border-[#002D71] bg-[#002D71]/5 ring-1 ring-[#002D71]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Research-Based Project</span>
                {formData.type === 'Research-Based Project' && (
                  <CheckCircle2 className="w-4 h-4 text-[#002D71]" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Focused on academic investigation, experimental methodology, and algorithmic novelty.
              </p>
            </button>

            <button
              type="button"
              disabled={isReadOnly}
              onClick={() => handleTextChange('type', 'Product-Based Project')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                formData.type === 'Product-Based Project'
                  ? 'border-[#002D71] bg-[#002D71]/5 ring-1 ring-[#002D71]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Product-Based Project</span>
                {formData.type === 'Product-Based Project' && (
                  <CheckCircle2 className="w-4 h-4 text-[#002D71]" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Focused on designing, engineering, and validating an end-to-end software solution.
              </p>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#1E293B] block mb-1">
            Area / Specialization *
          </label>
          <select
            value={formData.specialization}
            disabled={isReadOnly}
            onChange={(e) => handleTextChange('specialization', e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002D71] disabled:bg-slate-50 disabled:text-slate-700"
          >
            <option value="Artificial Intelligence / Machine Learning">
              Artificial Intelligence / Machine Learning
            </option>
            <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Cloud Computing & Distributed Systems">
              Cloud Computing & Distributed Systems
            </option>
            <option value="Web & Mobile Engineering">Web & Mobile Engineering</option>
            <option value="Computer Vision & Robotics">Computer Vision & Robotics</option>
          </select>
        </div>
      </div>

      {/* Section D: Proposed Technology Stack */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-md bg-[#002D71] text-white flex items-center justify-center font-bold text-xs">
            D
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E293B]">Proposed technology stack</h3>
            <p className="text-[11px] text-[#64748B]">Add tools, languages, frameworks, or platforms.</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#1E293B] block mb-2">Technologies *</label>
          <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            {formData.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-xs"
              >
                <span>{tech}</span>
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            ))}

            {!isReadOnly && (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Add another..."
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  className="px-2.5 py-1 text-xs bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#002D71]"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="p-1 text-white bg-[#002D71] rounded hover:bg-[#003B85]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Press Enter after each technology. Examples: React, Python, FastAPI, PostgreSQL.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-6 py-4 shadow-lg flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('student-proposal-review')}
          className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Review all proposals
        </button>

        <div className="flex items-center gap-3">
          {!isReadOnly && (
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-slate-300 text-[#002D71] text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as draft</span>
            </button>
          )}

          <button
            onClick={handleSaveAndContinue}
            className="px-5 py-2 bg-[#002D71] text-white text-xs font-semibold rounded-lg hover:bg-[#003B85] shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Save & continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
