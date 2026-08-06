import React, { useState } from 'react';
import { YEARLY_TRENDS, CARE_SETTINGS } from '../data/singhealthData';
import { 
  AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line 
} from 'recharts';
import { Hospital, Stethoscope, Building, Ambulance, HeartPulse, Info, HelpCircle } from 'lucide-react';

const SETTING_COLORS: Record<string, string> = {
  IP: '#3b82f6',   // Inpatient - Blue
  SOC: '#8b5cf6',  // Specialist Outpatient - Purple
  POLY: '#10b981', // Polyclinic - Emerald
  ED: '#f59e0b',   // Emergency - Amber
  CH: '#ec4899',   // Community Hospital - Pink
};

export const CostUtilisationTab: React.FC = () => {
  const [activeChartMode, setActiveChartMode] = useState<'stack' | 'settings' | 'unit-cost'>('stack');

  // Chart dataset for stacked expenditure over years
  const yearlyStackedData = YEARLY_TRENDS.map(t => ({
    year: t.year.toString(),
    'Inpatient Care': t.inpatientSpend,
    'Specialist Outpatient': t.specialistOutpatientSpend,
    'Polyclinic Care': t.polyclinicSpend,
    'Emergency Dept': t.edSpend,
    'Community Hospital': t.communityHospitalSpend,
    total: t.totalExpenditureSGD
  }));

  // Care Settings Pie Data
  const pieData = CARE_SETTINGS.map(s => ({
    name: s.setting,
    value: s.share2024,
    spend: s.spend2024,
    code: s.code
  }));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Healthcare Expenditure & Care Setting Dynamics (2019–2024)
          </h2>
          <p className="text-xs text-slate-500">
            Analysis of SGD $6.05B real healthcare expenditure distribution across inpatient, outpatient, and primary care settings.
          </p>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveChartMode('stack')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChartMode === 'stack'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stacked Trajectory
          </button>
          <button
            onClick={() => setActiveChartMode('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChartMode === 'settings'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Care Settings Share
          </button>
          <button
            onClick={() => setActiveChartMode('unit-cost')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChartMode === 'unit-cost'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cost Per Visit / Admission
          </button>
        </div>
      </div>

      {/* Main Interactive Chart Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        {activeChartMode === 'stack' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Total SingHealth Expenditure Trajectory (2019–2024)
                </h3>
                <p className="text-xs text-slate-500">
                  Inflation-adjusted Singapore Dollars (Billion SGD)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Total Real Growth: +38.4%
              </span>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyStackedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInpatient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorSOC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorPoly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} unit="B" />
                  <Tooltip 
                    formatter={(val: any) => [`SGD $${Number(val).toFixed(2)} Billion`, 'Spend']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="Inpatient Care" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInpatient)" />
                  <Area type="monotone" dataKey="Specialist Outpatient" stackId="1" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSOC)" />
                  <Area type="monotone" dataKey="Polyclinic Care" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorPoly)" />
                  <Area type="monotone" dataKey="Emergency Dept" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                  <Area type="monotone" dataKey="Community Hospital" stackId="1" stroke="#ec4899" fill="#ec4899" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChartMode === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Care Setting Share of Total Spend (2024)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inpatient care dominates system costs at <strong>63.8%</strong> (SGD $3.86B), while primary care (Polyclinics) 
                comprises <strong>7.2%</strong> ($0.44B). The strategic imperative under <em>Healthier SG</em> is to expand primary 
                and community care capacity to divert avoidable inpatient admissions.
              </p>

              <div className="space-y-2 pt-2">
                {CARE_SETTINGS.map((s) => (
                  <div key={s.code} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: SETTING_COLORS[s.code] }} />
                      <span className="font-bold text-slate-800">{s.setting}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">${s.spend2024}B</span>
                      <span className="text-slate-500 ml-2">({s.share2024}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split(' ')[0]} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SETTING_COLORS[entry.code]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val}% of total spend`, 'Share']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChartMode === 'unit-cost' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Unit Cost Comparison per Admission or Clinical Encounter (2024)
                </h3>
                <p className="text-xs text-slate-500">
                  Average expenditure per patient visit/stay across care settings
                </p>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CARE_SETTINGS} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="code" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} unit=" SGD" />
                  <Tooltip 
                    formatter={(val: any) => [`SGD $${Number(val).toLocaleString()}`, 'Cost per Visit / Stay']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="costPerVisit" radius={[8, 8, 0, 0]}>
                    {CARE_SETTINGS.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={SETTING_COLORS[entry.code]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Breakdown Cards per Care Setting */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARE_SETTINGS.map((setting) => (
          <div 
            key={setting.code} 
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: SETTING_COLORS[setting.code] }} />
                <h4 className="text-sm font-bold text-slate-900">{setting.setting}</h4>
              </div>
              <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {setting.share2024}% Share
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
              {setting.description}
            </p>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">2024 Spend</span>
                <span className="font-bold text-slate-900">${setting.spend2024} Billion</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">5-Yr CAGR</span>
                <span className="font-bold text-emerald-600">+{setting.cagr}% / yr</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Avg Visits / Pt</span>
                <span className="font-semibold text-slate-800">{setting.avgVisitsPerPatient} / year</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cost / Visit</span>
                <span className="font-semibold text-slate-800">${setting.costPerVisit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
