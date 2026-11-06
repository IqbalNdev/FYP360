import { useState } from 'react';
import { initialRiskCohort } from '../mockData';
import { RiskItem } from '../types';

interface RiskMonitorViewProps {
  onShowToast: (message: string) => void;
  onNavigate: (view: any) => void;
}

export default function RiskMonitorView({ onShowToast, onNavigate }: RiskMonitorViewProps) {
  const [cohort] = useState<RiskItem[]>(initialRiskCohort);
  const [selectedRiskItem, setSelectedRiskItem] = useState<RiskItem | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'at_risk' | 'watch' | 'healthy'>('all');

  const filteredCohort = cohort.filter((item) => {
    if (filterType === 'all') return true;
    const s = item.status.toLowerCase();
    if (filterType === 'at_risk') return s.includes('risk');
    if (filterType === 'watch') return s.includes('watch');
    if (filterType === 'healthy') return s.includes('health');
    return true;
  });

  const handleSendAlert = (project: RiskItem) => {
    onShowToast(`Urgent alert sent to supervisor & group leads of ${project.title.slice(0, 24)}...`);
  };

  const handleAuditScan = () => {
    onShowToast('Automated audit scan completed across 42 groups.');
  };

  const handleDownloadAudit = () => {
    onShowToast('Downloading risk monitor audit log (CSV/PDF)...');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Section */}
      <section className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-eyebrow text-[11px] text-[#FD7A12] uppercase font-bold tracking-widest mb-1">
              PROJECT MONITORING
            </span>
            <h1 className="font-headline-lg text-[#002D71] tracking-tight font-light">
              Risk Monitor
            </h1>
            <p className="font-body-lg text-[#64748B] mt-1">
              Rule-based health scores across all groups.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsFilterActive(!isFilterActive)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-[#1E293B] font-label-lg shadow-xs hover:bg-[#efedf0] transition-colors border border-[#E2E8F0] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#64748B]">tune</span>
              <span>Filter Status</span>
              {filterType !== 'all' && (
                <span className="ml-1 w-2 h-2 rounded-full bg-[#FD7A12]" />
              )}
            </button>
            <button
              onClick={handleAuditScan}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#002D71] text-white font-label-lg shadow-sm hover:bg-[#002D71] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Trigger Audit Scan</span>
            </button>
          </div>
        </div>

        {/* Status filter bar toggle */}
        {isFilterActive && (
          <div className="mt-4 p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#64748B] font-medium mr-2">Filter by status:</span>
            {(['all', 'at_risk', 'watch', 'healthy'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterType === t
                    ? 'bg-[#002D71] text-white'
                    : 'bg-[#F4F6F9] text-[#64748B] hover:text-[#002D71]'
                }`}
              >
                {t === 'all' ? 'All Cohort' : t === 'at_risk' ? 'At Risk (<50)' : t === 'watch' ? 'Watch (50-74)' : 'Healthy (75+)'}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Mint Advisory Banner */}
      <div className="w-full bg-[#FFF1E5] rounded-2xl p-4 flex items-center justify-between shadow-xs border border-[#FD7A12]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs text-[#FD7A12]">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="inline-flex items-center font-eyebrow text-[11px] font-bold text-[#FD7A12] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full w-fit border border-[#FD7A12]/20">
              RULE POLICY
            </span>
            <p className="font-body-md text-[#1E293B]">
              Health scores are generated from fixed rules. Healthy 75+, Watch 50 to 74, At risk below 50.
            </p>
          </div>
        </div>
        <span className="hidden lg:inline-flex font-label-md text-[#002D71] shrink-0 font-medium">
          Evaluation Cycle Q4 · 2025
        </span>
      </div>

      {/* 4 Stat Tiles Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: Healthy */}
        <div
          onClick={() => setFilterType(filterType === 'healthy' ? 'all' : 'healthy')}
          className={`bg-white rounded-[20px] p-4 flex flex-col justify-between border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all cursor-pointer ${
            filterType === 'healthy' ? 'ring-2 ring-[#FD7A12]' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-eyebrow text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Healthy
              </span>
              <span className="font-big-number text-[#002D71] mt-2">32</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#FFF1E5] flex items-center justify-center text-[#FD7A12] shrink-0">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F4F6F9]">
            <span className="w-2 h-2 rounded-full bg-[#FD7A12] shrink-0"></span>
            <span className="font-label-md text-[#64748B] truncate">
              Score 75–100 · 76% of cohort
            </span>
          </div>
        </div>

        {/* Tile 2: Watch */}
        <div
          onClick={() => setFilterType(filterType === 'watch' ? 'all' : 'watch')}
          className={`bg-white rounded-[20px] p-4 flex flex-col justify-between border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all cursor-pointer ${
            filterType === 'watch' ? 'ring-2 ring-[#B26B00]' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-eyebrow text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Watch
              </span>
              <span className="font-big-number text-[#002D71] mt-2">6</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#FFF4DF] flex items-center justify-center text-[#B26B00] shrink-0">
              <span className="material-symbols-outlined text-[24px]">visibility</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F4F6F9]">
            <span className="w-2 h-2 rounded-full bg-[#B26B00] shrink-0"></span>
            <span className="font-label-md text-[#64748B] truncate">
              Score 50–74 · Requires supervisor sync
            </span>
          </div>
        </div>

        {/* Tile 3: At risk */}
        <div
          onClick={() => setFilterType(filterType === 'at_risk' ? 'all' : 'at_risk')}
          className={`bg-white rounded-[20px] p-4 flex flex-col justify-between border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all cursor-pointer ${
            filterType === 'at_risk' ? 'ring-2 ring-[#C2392F]' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-eyebrow text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                At risk
              </span>
              <span className="font-big-number text-[#002D71] mt-2">4</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#FDE8E6] flex items-center justify-center text-[#C2392F] shrink-0">
              <span className="material-symbols-outlined text-[24px]">error</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F4F6F9]">
            <span className="w-2 h-2 rounded-full bg-[#C2392F] shrink-0"></span>
            <span className="font-label-md text-[#64748B] truncate">
              Score below 50 · Action required
            </span>
          </div>
        </div>

        {/* Tile 4: Missed check-ins */}
        <div className="bg-white rounded-[20px] p-4 flex flex-col justify-between border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-eyebrow text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Missed check-ins
              </span>
              <span className="font-big-number text-[#002D71] mt-2">9</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#efedf0] flex items-center justify-center text-[#475569] shrink-0">
              <span className="material-symbols-outlined text-[24px]">event_busy</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F4F6F9]">
            <span className="w-2 h-2 rounded-full bg-[#E8705A] shrink-0"></span>
            <span className="font-label-md text-[#64748B] truncate">
              Across 7 groups in past 14 days
            </span>
          </div>
        </div>
      </section>

      {/* Main Table Card */}
      <section className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-xs overflow-hidden flex flex-col">
        {/* Sub-header Bar inside Card */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf9fc] border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-[#002D71] font-semibold">
              Tracked Project Cohort
            </span>
            <span className="bg-[#efedf0] text-[#64748B] font-label-md px-2.5 py-0.5 rounded-full font-medium">
              {filteredCohort.length} {filterType === 'all' ? 'Prioritized' : 'Filtered'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#64748B] font-label-md">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Synced automated assessment 18m ago</span>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-[#f5f3f6] text-[#64748B] font-eyebrow text-[11px] uppercase tracking-wider border-b border-[#E2E8F0]">
                <th className="py-3 px-6 font-bold">PROJECT</th>
                <th className="py-3 px-4 font-bold">HEALTH SCORE</th>
                <th className="py-3 px-4 font-bold">TRIGGERED RISK FACTORS</th>
                <th className="py-3 px-4 font-bold">SUPERVISOR</th>
                <th className="py-3 px-4 font-bold">LAST ACTIVITY</th>
                <th className="py-3 px-6 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 text-[#1E293B] font-body-md">
              {filteredCohort.map((item, idx) => {
                const s = item.status.toLowerCase();
                const isRisk = s.includes('risk');
                const isWatch = s.includes('watch');
                const isHealthy = s.includes('health');

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#faf9fc] transition-colors group ${
                      idx % 2 === 1 ? 'bg-white' : 'bg-[#faf9fc]/30'
                    }`}
                  >
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-col max-w-sm">
                        <span className="font-headline-sm text-[15px] leading-snug text-[#002D71] font-medium group-hover:text-[#FD7A12] transition-colors">
                          {item.title}
                        </span>
                        <span className="font-label-md text-[#64748B] mt-0.5">
                          {item.id} · Lead: {item.leadName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                      {isRisk && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-lg font-semibold bg-[#FDE8E6] text-[#C2392F]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C2392F] animate-pulse"></span>
                          {item.score} / 100 · At risk
                        </span>
                      )}
                      {isWatch && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-lg font-semibold bg-[#FFF4DF] text-[#B26B00]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B26B00]"></span>
                          {item.score} / 100 · Watch
                        </span>
                      )}
                      {isHealthy && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-lg font-semibold bg-[#FFF1E5] text-[#FD7A12]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FD7A12]"></span>
                          {item.score} / 100 · Healthy
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 align-middle">
                      {item.riskFactors.length === 0 || item.riskFactors[0].includes('satisfied') ? (
                        <span className="font-label-md text-[#002D71] font-medium">
                          None · All criteria satisfied
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 items-center max-w-xs">
                          {item.riskFactors.map((rf, rIdx) => (
                            <span
                              key={rIdx}
                              className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                isRisk
                                  ? 'bg-[#FDE8E6] text-[#C2392F]'
                                  : 'bg-[#FFF4DF] text-[#B26B00]'
                              }`}
                            >
                              {rf}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md font-semibold text-xs ${
                            item.supervisor?.avatarBg || 'bg-[#164783] text-white'
                          }`}
                        >
                          {item.supervisor?.initials}
                        </div>
                        <span className="font-label-lg text-[#1E293B]">{item.supervisor?.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-md text-[#64748B]">{item.lastActivity}</span>
                    </td>
                    <td className="py-4 px-6 align-middle whitespace-nowrap text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRiskItem(item)}
                          className="font-label-lg text-[#FD7A12] hover:text-[#002D71] font-medium transition-colors hover:underline cursor-pointer"
                          type="button"
                        >
                          View reasons
                        </button>
                        {!isHealthy && (
                          <button
                            onClick={() => handleSendAlert(item)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-label-md font-semibold transition-colors cursor-pointer ${
                              isRisk
                                ? 'bg-[#FDE8E6] text-[#C2392F] hover:bg-[#ffdad6]'
                                : 'bg-[#FFF4DF] text-[#B26B00] hover:bg-[#ffdcbd]'
                            }`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              {isRisk ? 'notification_important' : 'send'}
                            </span>
                            Send alert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 bg-[#f5f3f6] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-label-md text-[#64748B] text-center sm:text-left">
            Showing {filteredCohort.length} high-priority tracked projects out of 42 active groups
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAudit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#1E293B] font-label-md shadow-xs hover:bg-[#efedf0] transition-colors border border-[#E2E8F0] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#64748B]">download</span>
              Download audit log
            </button>
            <button
              onClick={() => onNavigate('groups-projects')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#002D71] font-label-md shadow-xs hover:bg-[#efedf0] transition-colors font-medium border border-[#E2E8F0] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#FD7A12]">grid_view</span>
              View full cohort matrix
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Reason Inspector Modal */}
      {selectedRiskItem && (
        <div className="fixed inset-0 z-50 bg-[#002D71]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 shadow-2xl max-w-xl w-full flex flex-col border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#B26B00]">rule</span>
                <h3 className="font-headline-sm text-[#002D71] font-semibold">Health Score Breakdown</h3>
              </div>
              <button
                onClick={() => setSelectedRiskItem(null)}
                className="p-1 rounded-lg hover:bg-[#efedf0] text-[#64748B] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-[#f5f3f6] p-4 rounded-xl mb-4 border border-[#E2E8F0]">
              <div className="font-eyebrow text-[11px] text-[#64748B] uppercase font-bold tracking-wider">
                Project Target
              </div>
              <div className="font-body-lg text-[#002D71] font-medium mt-0.5">
                {selectedRiskItem.title}
              </div>
              <div className="font-label-md text-[#64748B] mt-0.5">
                {selectedRiskItem.id} · Supervisor: {selectedRiskItem.supervisor?.name}
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-2.5 ${
                  selectedRiskItem.status.toLowerCase().includes('risk')
                    ? 'bg-[#FDE8E6] text-[#C2392F]'
                    : selectedRiskItem.status.toLowerCase().includes('watch')
                    ? 'bg-[#FFF4DF] text-[#B26B00]'
                    : 'bg-[#FFF1E5] text-[#FD7A12]'
                }`}
              >
                Score: {selectedRiskItem.score} / 100 · {selectedRiskItem.status}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {selectedRiskItem.reasons && selectedRiskItem.reasons.length > 0 ? (
                selectedRiskItem.reasons.map((reason, rIdx) => (
                  <div key={rIdx} className="p-3 rounded-lg bg-[#faf9fc] border border-[#E2E8F0] flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                        reason.severity === 'danger' ? 'text-[#C2392F]' : 'text-[#B26B00]'
                      }`}
                    >
                      {reason.icon || 'flag'}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-[#1E293B] font-semibold">{reason.title}</span>
                      <span className="font-body-md text-[#64748B] text-xs mt-0.5">{reason.desc}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-lg bg-[#FFF1E5] border border-[#FD7A12]/20 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#FD7A12] text-[20px] shrink-0">check_circle</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-[#002D71] font-semibold">Standard Progress Maintained</span>
                    <span className="font-body-md text-[#64748B] text-xs">All deliverables and bi-weekly checkpoints logged on schedule.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedRiskItem(null)}
                className="px-4 py-2 rounded-lg bg-[#efedf0] font-label-md text-[#1E293B] hover:bg-[#e9e7eb] transition-colors cursor-pointer"
                type="button"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  handleSendAlert(selectedRiskItem);
                  setSelectedRiskItem(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#002D71] text-white font-label-md hover:bg-[#002D71] transition-colors cursor-pointer"
                type="button"
              >
                Notify Supervisor &amp; Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
