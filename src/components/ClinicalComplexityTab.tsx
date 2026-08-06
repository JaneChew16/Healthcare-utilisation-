import React from 'react';
import { CLINICAL_SEGMENTS } from '../data/singhealthData';
import { 
  PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend 
} from 'recharts';
import { Activity, ShieldCheck, Heart, AlertTriangle, Layers, Target, CheckCircle2 } from 'lucide-react';

const SEGMENT_COLORS = ['#e11d48', '#f59e0b', '#3b82f6', '#10b981'];

export const ClinicalComplexityTab: React.FC = () => {
  // Chart data comparing Patient Cohort Share vs Spend Share
  const chartData = CLINICAL_SEGMENTS.map(s => ({
    name: s.segment,
    'Patient Population %': s.patientPercent,
    'Expenditure Share %': s.spendPercent,
    avgSpend: s.avgSpendPerPatient
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              High-Utilizer Analysis
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Clinical Multi-Morbidity & Disease Complexity
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluating spend concentration across patient complexity tiers, chronic illness clusters, and cancer care.
          </p>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center space-x-3 text-xs text-rose-900">
          <Activity className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <strong className="font-bold">46.7% Spend Concentration:</strong>
            <span className="block text-[11px] text-rose-700">Top 14.8% of complex patients account for nearly half of total SingHealth costs.</span>
          </div>
        </div>
      </div>

      {/* Main Chart comparing Population Share vs Spend Share */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Disproportionate Expenditure Allocation by Clinical Complexity Tier
            </h3>
            <p className="text-xs text-slate-500">
              Comparing patient volume share (%) against actual healthcare expenditure share (%)
            </p>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" fontSize={12} unit="%" />
              <Tooltip 
                formatter={(val: any) => [`${val}%`, 'Share']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Patient Population %" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Expenditure Share %" fill="#e11d48" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinical Segment Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CLINICAL_SEGMENTS.map((segment, idx) => (
          <div 
            key={segment.segment}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[idx] }} />
                <h4 className="text-sm font-bold text-slate-900">{segment.segment}</h4>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                ${segment.avgSpendPerPatient.toLocaleString()} / pt / yr
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Patient Population</span>
                <span className="text-base font-bold text-slate-900">{segment.patientPercent}%</span>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200/80">
                <span className="text-[10px] text-red-700 uppercase block font-semibold">Expenditure Share</span>
                <span className="text-base font-bold text-red-800">{segment.spendPercent}%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Representative Clinical Profile:</span>
              <div className="flex flex-wrap gap-1.5">
                {segment.keyConditions.map((cond, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">
                    {cond}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-slate-700">
                <Target className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-semibold">Primary Care Setting:</span>
                <span className="text-slate-600">{segment.primaryCareSetting}</span>
              </div>
              <div className="flex items-start space-x-1.5 text-slate-700 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Key Policy Lever: </span>
                  <span className="text-slate-600">{segment.policyLever}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
