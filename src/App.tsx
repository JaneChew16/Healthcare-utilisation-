import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { CostUtilisationTab } from './components/CostUtilisationTab';
import { DemographicTab } from './components/DemographicTab';
import { ClinicalComplexityTab } from './components/ClinicalComplexityTab';
import { SimulatorTab } from './components/SimulatorTab';
import { AIAnalystTab } from './components/AIAnalystTab';
import { ExportModal } from './components/ExportModal';
import { STUDY_METADATA, CARE_SETTINGS, AGE_COHORTS, CLINICAL_SEGMENTS } from './data/singhealthData';
import { Search, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Search filter logic across settings, cohorts, and clinical segments
  const filteredCareSettings = CARE_SETTINGS.filter(s => 
    s.setting.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAgeCohorts = AGE_COHORTS.filter(c => 
    c.ageGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.riskProfile.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClinicalSegments = CLINICAL_SEGMENTS.filter(cs =>
    cs.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.keyConditions.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Filter Banner */}
        {isSearching ? (
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  Search Results for "{searchTerm}"
                </h2>
              </div>
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-slate-500 hover:text-slate-900 underline"
              >
                Clear Search
              </button>
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              {filteredCareSettings.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Care Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredCareSettings.map(s => (
                      <div key={s.code} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="font-bold text-slate-900">{s.setting}</span>
                        <p className="text-slate-600 mt-1">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredAgeCohorts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Age Cohorts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredAgeCohorts.map(c => (
                      <div key={c.ageGroup} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between">
                        <span className="font-bold text-slate-900">{c.ageGroup}</span>
                        <span className="font-semibold text-red-600">${c.avgCostPerUser2024.toLocaleString()} / user / yr</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredClinicalSegments.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Clinical Segments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredClinicalSegments.map(cs => (
                      <div key={cs.segment} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="font-bold text-slate-900">{cs.segment}</span>
                        <p className="text-slate-600 mt-1">Drives {cs.spendPercent}% of total expenditure</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredCareSettings.length === 0 && filteredAgeCohorts.length === 0 && filteredClinicalSegments.length === 0 && (
                <p className="text-xs text-slate-500 italic">
                  No matching metrics found for "{searchTerm}". Try searching for "inpatient", "80+", "cancer", "polyclinic", or "60+".
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Active View Tab Rendering */
          <>
            {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
            {activeTab === 'cost-utilisation' && <CostUtilisationTab />}
            {activeTab === 'demographics' && <DemographicTab />}
            {activeTab === 'clinical-complexity' && <ClinicalComplexityTab />}
            {activeTab === 'simulator' && <SimulatorTab />}
            {activeTab === 'ai-analyst' && <AIAnalystTab />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                SH
              </div>
              <div>
                <span className="font-bold text-white text-sm block">SingHealth Healthcare Cost & Utilisation Analytics</span>
                <span className="text-[11px] text-slate-400">Grounded in Annals Academy of Medicine Singapore Research</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="https://annals.edu.sg/trends-singhealth-healthcare-costs-utilisation-2019-2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Read Full Journal Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>
              Evidence base covering 1.37M patient cohort (2019–2024). Inflation-adjusted to 2024 SGD.
            </p>
            <p className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SingHealth Health Services Research & Health Economics Unit</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
