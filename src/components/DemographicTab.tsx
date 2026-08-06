import React from 'react';
import { AGE_COHORTS, YEARLY_TRENDS } from '../data/singhealthData';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { Users, AlertCircle, ArrowUpRight, ShieldAlert, Award, ChevronRight } from 'lucide-react';

export const DemographicTab: React.FC = () => {
  // Chart data for per-user cost acceleration across age groups
  const ageSpendData = AGE_COHORTS.map(c => ({
    ageGroup: c.ageGroup,
    '2019 Per-User Spend': c.avgCostPerUser2019,
    '2024 Per-User Spend': c.avgCostPerUser2024,
    popGrowth: c.popGrowthPercent,
    spendGrowth: c.spendGrowthPercent,
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              Structural Demographic Shift
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Ageing Population Dynamics & Expenditure Acceleration
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluating how Singapore's demographic aging drives SingHealth's healthcare expenditure surge from 2019 to 2024.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center space-x-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="font-bold">Super-Aged Society by 2030:</strong>
            <span className="block text-[11px] text-amber-700">Singapore projected to reach &gt;21% population aged ≥65 by 2030.</span>
          </div>
        </div>
      </div>

      {/* Top Highlight Metric Banner for Ageing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Cohort Age Shift (≥60 Yrs)</span>
          <div className="text-3xl font-black mt-2 text-amber-400">
            29.4% → 34.2%
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            From 355,740 patients in 2019 to <strong>468,540 patients</strong> in 2024 (+31.7% increase in elderly volume).
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Elderly Expenditure Dominance</span>
          <div className="text-3xl font-black mt-2 text-emerald-400">
            SGD $3.45 Billion
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Consumes <strong>57.0%</strong> of total SingHealth expenditure in 2024 (up from 51.2% in 2019).
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">80+ Age Cohort Spend Jump</span>
          <div className="text-3xl font-black mt-2 text-rose-400">
            +92.3% Surge
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Expenditure for patients aged 80 and above doubled from $0.52B (2019) to <strong>$1.00B</strong> (2024).
          </p>
        </div>
      </div>

      {/* Per-User Annual Expenditure Curve Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Steep Age-Related Cost Acceleration: Per-User Annual Expenditure (2019 vs 2024)
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrating how healthcare spend per patient explodes in older age brackets (highest at $11,555/yr for ≥80)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Steepest Curve: Age 80+
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageSpendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="ageGroup" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} unit=" SGD" />
              <Tooltip 
                formatter={(val: any) => [`SGD $${Number(val).toLocaleString()} / patient`, 'Annual Per-User Cost']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="2019 Per-User Spend" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="2024 Per-User Spend" fill="#e11d48" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Age Cohort Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AGE_COHORTS.map((cohort) => (
          <div 
            key={cohort.ageGroup}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">{cohort.ageGroup}</h4>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                cohort.riskProfile === 'Very High' 
                  ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                  : cohort.riskProfile === 'High'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {cohort.riskProfile} Risk
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Patient Population:</span>
                <span className="font-bold text-slate-900">{cohort.population2024.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>5-Yr Pop Growth:</span>
                <span className="font-semibold text-emerald-600">+{cohort.popGrowthPercent}%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total 2024 Spend:</span>
                <span className="font-bold text-slate-900">${cohort.spend2024} Billion</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Spend Growth:</span>
                <span className="font-bold text-rose-600">+{cohort.spendGrowthPercent}%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 mt-2">
                <span className="text-[10px] text-slate-500 block uppercase">2024 Avg Cost / User</span>
                <span className="text-sm font-black text-slate-900">${cohort.avgCostPerUser2024.toLocaleString()} / year</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Implications Brief for Ageing */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Health Systems Research Finding: Demographic Composition vs. Intensity</span>
        </h3>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          The Annals paper explicitly highlights that while absolute healthcare expenditure and utilization rose significantly for adults aged 60 and above, 
          <strong> per-individual utilization rates within specific age cohorts remained relatively flat</strong>. This confirms that healthcare cost inflation 
          in SingHealth is not caused by individual patients seeking excessive care, but rather by the <strong>rapid structural influx of citizens into older, higher-complexity age brackets</strong>.
        </p>
      </div>
    </div>
  );
};
