/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, Project, ProjectDocument, EvaluationRecord } from './types';
import { initialProjects, initialEvaluations } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { ConflictModal } from './components/ConflictModal';
import { DocPreviewModal } from './components/DocPreviewModal';

import { DashboardView } from './components/DashboardView';
import { AssignedProjectsView } from './components/AssignedProjectsView';
import { ProjectDossierView } from './components/ProjectDossierView';
import { EvaluationFormView } from './components/EvaluationFormView';
import { MyEvaluationsView } from './components/MyEvaluationsView';
import { SettingsView } from './components/SettingsView';
import { LoginView } from './components/LoginView';

export default function JuryApp({ onSignOut }: { onSignOut?: () => void } = {}) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>(initialEvaluations);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('FYP-CS-2025-042');

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [activeDocPreview, setActiveDocPreview] = useState<ProjectDocument | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSelectProject = (projectId: string, targetScreen: 'project-dossier' | 'evaluation-form') => {
    setSelectedProjectId(projectId);
    setCurrentScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = (projectId: string, scores: Project['evaluationScores']) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'draft',
            evaluationScores: scores,
          };
        }
        return p;
      })
    );
  };

  const handleSubmitEvaluation = (projectId: string, scores: Project['evaluationScores']) => {
    const totalMarks =
      (scores.clarity || 0) +
      (scores.problemScope || 0) +
      (scores.technical || 0) +
      (scores.questions || 0);

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'submitted',
            evaluationScores: scores,
          };
        }
        return p;
      })
    );

    // Update or add to evaluations
    setEvaluations((prev) => {
      const existing = prev.find((e) => e.projectId === projectId);
      if (existing) {
        return prev.map((e) =>
          e.projectId === projectId
            ? { ...e, marksGiven: totalMarks, status: 'submitted_unpublished' }
            : e
        );
      }
      const newRec: EvaluationRecord = {
        id: `EVAL-${Date.now().toString().slice(-4)}`,
        projectId: selectedProject.id,
        title: selectedProject.title,
        lead: selectedProject.lead,
        stage: 'FYP1 Defense',
        marksGiven: totalMarks,
        marksMax: 10,
        submittedDate: 'Oct 28',
        status: 'submitted_unpublished',
      };
      return [newRec, ...prev];
    });

    setCurrentScreen('my-evaluations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmConflict = (reason: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === selectedProjectId) {
          return {
            ...p,
            status: 'conflict',
          };
        }
        return p;
      })
    );
    setConflictModalOpen(false);
    showToast(`Conflict declared: ${reason}. Excused from jury.`);
    setCurrentScreen('assigned-projects');
  };

  const pendingEvaluationsCount = projects.filter(
    (p) => p.status === 'draft' || p.status === 'not_started'
  ).length;

  const handleNavigate = (screen: Screen) => {
    if (screen === 'login') {
      if (onSignOut) {
        onSignOut();
      } else {
        setCurrentScreen('dashboard');
      }
      return;
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-page-canvas text-on-surface min-h-screen font-body-md antialiased selection:bg-kiet-orange/20 selection:text-kiet-navy">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        pendingCount={pendingEvaluationsCount}
      />

      {/* 2. Main Content Canvas */}
      <div className="pl-[260px]">
        {/* Top Fixed Header */}
        <Header
          currentScreen={currentScreen}
          activeProjectTitle={selectedProject.title}
          onNavigate={handleNavigate}
        />

        {/* View Router */}
        <main className="relative pt-[72px] bg-page-canvas min-h-screen">
          {currentScreen === 'dashboard' && (
            <DashboardView
              projects={projects}
              onNavigate={handleNavigate}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentScreen === 'assigned-projects' && (
            <AssignedProjectsView
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentScreen === 'project-dossier' && (
            <ProjectDossierView
              project={selectedProject}
              onBack={() => setCurrentScreen('assigned-projects')}
              onStartEvaluation={(pId) => handleSelectProject(pId, 'evaluation-form')}
              onOpenDoc={(doc) => setActiveDocPreview(doc)}
              onOpenConflictModal={() => setConflictModalOpen(true)}
            />
          )}

          {currentScreen === 'evaluation-form' && (
            <EvaluationFormView
              project={selectedProject}
              onBack={() => setCurrentScreen('assigned-projects')}
              onSaveDraft={handleSaveDraft}
              onSubmitEvaluation={handleSubmitEvaluation}
              showToast={showToast}
            />
          )}

          {currentScreen === 'my-evaluations' && (
            <MyEvaluationsView
              evaluations={evaluations}
              onViewEvaluation={(pId) => handleSelectProject(pId, 'evaluation-form')}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              showToast={showToast}
              onSignOut={() => {
                if (onSignOut) {
                  onSignOut();
                } else {
                  setCurrentScreen('dashboard');
                }
              }}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ConflictModal
        isOpen={conflictModalOpen}
        projectId={selectedProject.id}
        projectTitle={selectedProject.title}
        onClose={() => setConflictModalOpen(false)}
        onConfirm={handleConfirmConflict}
      />

      <DocPreviewModal
        doc={activeDocPreview}
        onClose={() => setActiveDocPreview(null)}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
