import React from 'react';
import { STUDY_METADATA, RESEARCH_KEY_TAKEAWAYS, YEARLY_TRENDS } from '../data/singhealthData';
import { TabType } from '../types';
import { 
  TrendingUp, 
  Users, 
  Hospital, 
  Activity, 
  PieChart, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  FileText
} from 'lucide-react';

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Paper Citation Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded tracking-wider shadow">
                Peer-Reviewed Research
              </span>
              <span className="text-slate-300 text-xs font-medium flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                {STUDY_METADATA.journal}
              </span>
              <span className="text-slate-400 text-xs">• {STUDY_METADATA.period}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {STUDY_METADATA.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Comprehensive longitudinal analysis evaluating total healthcare expenditure, care-setting utilization, 
              and demographic shifts across SingHealth's 1.37 million patient cohort. Published by the Health Services 
              Research Centre & Health Economics Unit to guide national healthcare sustainability and Healthier SG policy design.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('simulator')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-900/30"
            >
              <span>Launch 2025–2035 Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('ai-analyst')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Query AI Policy Analyst</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expenditure (2024)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              SGD ${STUDY_METADATA.totalExpenditure2024}B
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {STUDY_METADATA.realExpenditureGrowth}
              </span>
              <span className="text-xs text-slate-500">from $4.37B (2019)</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Inflation-adjusted 2024 real dollars. CAGR: {STUDY_METADATA.cagrExpenditure}.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inpatient Care Dominance</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Hospital className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {STUDY_METADATA.inpatientShare2024}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-semibold text-slate-700">SGD $3.86 Billion</span>
              <span className="text-xs text-slate-500">in 2024</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Stable relative share over 5 years. Primary cost bottleneck in acute hospital beds.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Elderly Cohort Share (≥60)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {STUDY_METADATA.elderlyShareSpend2024}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-semibold text-amber-600">34.2% of Patient Population</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Spent SGD $3.45B in 2024. Elderly patients generate disproportionate hospital volume.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">High Complexity Concentration</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {STUDY_METADATA.topComplexitySpendShare}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-bold text-rose-600">From 14.8% of Patients</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            High-complex chronic disease & cancer patients consume nearly half of system resources.
          </p>
        </div>
      </div>

      {/* Core Research Findings Cards */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              5 Strategic Takeaways from the SingHealth Study
            </h3>
            <p className="text-xs text-slate-500">
              Key health economics takeaways distilled from Annals research
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('cost-utilisation')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>Explore Cost Charts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESEARCH_KEY_TAKEAWAYS.map((takeaway, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-all space-y-2"
            >
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {takeaway.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {takeaway.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Longitudinal Snapshot Table (2019 - 2024) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              SingHealth Longitudinal Health System Matrix (2019–2024)
            </h3>
            <p className="text-xs text-slate-500">
              Annual comparison of patient population, total spend, elderly share, and per-user cost
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('demographics')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>Age Cohorts Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Patient Population</th>
                <th className="py-3 px-4">Total Real Spend (SGD)</th>
                <th className="py-3 px-4">Inpatient Share</th>
                <th className="py-3 px-4">Elderly Pop % (≥60)</th>
                <th className="py-3 px-4">Elderly Spend %</th>
                <th className="py-3 px-4">Avg Cost / Patient</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {YEARLY_TRENDS.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.year}</td>
                  <td className="py-3 px-4 font-medium">{(row.patientPopulation / 1000000).toFixed(2)}M</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">${row.totalExpenditureSGD.toFixed(2)} Billion</td>
                  <td className="py-3 px-4 text-slate-600">63.8%</td>
                  <td className="py-3 px-4 text-slate-600">{row.elderlyPopulationPercent}%</td>
                  <td className="py-3 px-4 font-semibold text-amber-700">{row.elderlySpendPercent}%</td>
                  <td className="py-3 px-4 font-bold text-slate-900">${row.averageCostPerPatient.toLocaleString()} / yr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
