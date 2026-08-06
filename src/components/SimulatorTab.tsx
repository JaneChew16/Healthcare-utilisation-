import React, { useState, useMemo } from 'react';
import { SimulationParams, SimulationResult } from '../types';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Sliders, RefreshCw, TrendingDown, DollarSign, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export const SimulatorTab: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    horizonYear: 2035,
    ageingAcceleration: 3.2, // % annual growth rate in 60+ population
    healthierSgAdoption: 45, // % adoption in preventive primary care
    inpatientDiversionRate: 15, // % diversion to community hospital / day-surgery
    chronicControlEfficiency: 12, // % acute escalation reduction
  });

  const handleReset = () => {
    setParams({
      horizonYear: 2035,
      ageingAcceleration: 3.2,
      healthierSgAdoption: 45,
      inpatientDiversionRate: 15,
      chronicControlEfficiency: 12,
    });
  };

  // Dynamic simulation computation
  const simulationResults = useMemo(() => {
    const results: SimulationResult[] = [];
    const baseYear = 2024;
    const baseSpend = 6.05; // SGD $6.05 Billion
    let cumSavings = 0;

    for (let year = 2025; year <= params.horizonYear; year++) {
      const yearIndex = year - baseYear;

      // Unmitigated Baseline Growth (Driven purely by demographic ageing + medical inflation ~ 6.5% annually)
      const baselineGrowthRate = 0.065 + (params.ageingAcceleration - 3.0) * 0.008;
      const baselineExpenditure = baseSpend * Math.pow(1 + baselineGrowthRate, yearIndex);

      // Intervention Effects:
      // 1. Healthier SG Primary Care Shift saves up to 12% on chronic escalations
      const healthierSgSavingFactor = (params.healthierSgAdoption / 100) * 0.10;

      // 2. Inpatient Diversion saves ~25% unit cost difference on diverted inpatient stays (63.8% share)
      const inpatientDiversionFactor = (params.inpatientDiversionRate / 100) * 0.638 * 0.22;

      // 3. Chronic Control Efficiency saves on acute emergency visits
      const chronicEfficiencyFactor = (params.chronicControlEfficiency / 100) * 0.15;

      const totalMitigationRate = Math.min(0.35, healthierSgSavingFactor + inpatientDiversionFactor + chronicEfficiencyFactor);

      const projectedExpenditure = baselineExpenditure * (1 - totalMitigationRate);
      const annualSavings = baselineExpenditure - projectedExpenditure;
      cumSavings += annualSavings;

      const projectedInpatientShare = Math.max(48, 63.8 - (params.inpatientDiversionRate * 0.4));
      const projectedPolyclinicShare = Math.min(18, 7.2 + (params.healthierSgAdoption * 0.12));

      results.push({
        year,
        baselineExpenditureSGD: Number(baselineExpenditure.toFixed(2)),
        projectedExpenditureSGD: Number(projectedExpenditure.toFixed(2)),
        cumulativeSavingsSGD: Number(cumSavings.toFixed(2)),
        inpatientSharePercent: Number(projectedInpatientShare.toFixed(1)),
        polyclinicSharePercent: Number(projectedPolyclinicShare.toFixed(1)),
        elderlyExpenditureSGD: Number((projectedExpenditure * 0.60).toFixed(2)),
      });
    }

    return results;
  }, [params]);

  const finalYearResult = simulationResults[simulationResults.length - 1];
  const totalCumSavings = finalYearResult ? finalYearResult.cumulativeSavingsSGD : 0;
  const annualSavingsAtEnd = finalYearResult 
    ? (finalYearResult.baselineExpenditureSGD - finalYearResult.projectedExpenditureSGD).toFixed(2)
    : '0';

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              Scenario Planning Engine
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              2025–2035 Healthcare Policy & Expenditure Forecasting Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Model the impact of Healthier SG enrolment, inpatient diversion, and chronic care management on SingHealth budget sustainability.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 transition-all self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* KPI Savings Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase">Cumulative System Savings (2025–{params.horizonYear})</span>
          <div className="text-3xl font-black mt-2 text-emerald-400">
            SGD ${totalCumSavings.toFixed(2)} Billion
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Total avoided expenditure compared to unmitigated baseline trajectory.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase">Annual Cost Savings in {params.horizonYear}</span>
          <div className="text-3xl font-black mt-2 text-indigo-400">
            SGD ${annualSavingsAtEnd} Billion / yr
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Annual budget relief achieved through structural care diversion.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-slate-400 text-xs font-medium uppercase">Inpatient Share Shift in {params.horizonYear}</span>
          <div className="text-3xl font-black mt-2 text-amber-400">
            63.8% → {finalYearResult?.inpatientSharePercent}%
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Diverting non-critical admissions to community and primary settings.
          </p>
        </div>
      </div>

      {/* Controls & Interactive Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Policy & Demographic Levers</span>
          </h3>

          {/* Slider 1: Horizon Year */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Target Horizon Year:</span>
              <span className="text-blue-600">{params.horizonYear}</span>
            </div>
            <input 
              type="range" 
              min="2026" 
              max="2035" 
              value={params.horizonYear} 
              onChange={(e) => setParams({ ...params, horizonYear: Number(e.target.value) })}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2: Ageing Acceleration */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Elderly Population Annual Growth (%):</span>
              <span className="text-amber-600">{params.ageingAcceleration}% / yr</span>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="5.0" 
              step="0.1"
              value={params.ageingAcceleration} 
              onChange={(e) => setParams({ ...params, ageingAcceleration: Number(e.target.value) })}
              className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Historical SingHealth 60+ growth was ~3.2% annually.</p>
          </div>

          {/* Slider 3: Healthier SG Primary Care Shift */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Healthier SG Primary Care Adoption:</span>
              <span className="text-emerald-600">{params.healthierSgAdoption}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="80" 
              value={params.healthierSgAdoption} 
              onChange={(e) => setParams({ ...params, healthierSgAdoption: Number(e.target.value) })}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Percentage of eligible residents enrolled in preventive primary care plans.</p>
          </div>

          {/* Slider 4: Inpatient Diversion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Inpatient to Community Hospital Diversion:</span>
              <span className="text-indigo-600">{params.inpatientDiversionRate}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={params.inpatientDiversionRate} 
              onChange={(e) => setParams({ ...params, inpatientDiversionRate: Number(e.target.value) })}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Redirecting subacute cases to day surgery and community care.</p>
          </div>

          {/* Slider 5: Chronic Control Efficiency */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Chronic Escalation Avoidance Rate:</span>
              <span className="text-rose-600">{params.chronicControlEfficiency}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25" 
              value={params.chronicControlEfficiency} 
              onChange={(e) => setParams({ ...params, chronicControlEfficiency: Number(e.target.value) })}
              className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Reduction in emergency room visits for diabetes/hypertension complications.</p>
          </div>
        </div>

        {/* Right Column: Chart Projections */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Expenditure Trajectory: Baseline vs Policy Interventions (2025–{params.horizonYear})
              </h3>
              <p className="text-xs text-slate-500">
                Comparing unmitigated expenditure (red) against policy-optimized trajectory (emerald)
              </p>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulationResults} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} unit="B" />
                <Tooltip 
                  formatter={(val: any) => [`SGD $${Number(val).toFixed(2)} Billion`, 'Spend']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="baselineExpenditureSGD" name="Unmitigated Baseline Spend" stroke="#ef4444" fill="url(#colorBaseline)" strokeWidth={2} />
                <Area type="monotone" dataKey="projectedExpenditureSGD" name="Optimized Policy Trajectory" stroke="#10b981" fill="url(#colorProjected)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Simulation Output Table */}
          <div className="pt-4 border-t border-slate-100 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2 px-3">Year</th>
                  <th className="py-2 px-3">Baseline (SGD B)</th>
                  <th className="py-2 px-3">Optimized (SGD B)</th>
                  <th className="py-2 px-3">Annual Savings</th>
                  <th className="py-2 px-3">Cum. Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {simulationResults.slice(-5).map((res) => (
                  <tr key={res.year} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-bold">{res.year}</td>
                    <td className="py-2 px-3 text-red-600 font-semibold">${res.baselineExpenditureSGD}B</td>
                    <td className="py-2 px-3 text-emerald-600 font-bold">${res.projectedExpenditureSGD}B</td>
                    <td className="py-2 px-3 font-medium text-slate-900">${(res.baselineExpenditureSGD - res.projectedExpenditureSGD).toFixed(2)}B</td>
                    <td className="py-2 px-3 font-bold text-emerald-700">${res.cumulativeSavingsSGD}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
