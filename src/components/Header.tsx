import React from 'react';
import { TabType } from '../types';
import { 
  Building2, 
  BarChart3, 
  Users, 
  Activity, 
  Sliders, 
  Bot, 
  Download, 
  ExternalLink,
  ShieldAlert,
  Search
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenExport: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  searchTerm,
  setSearchTerm,
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: <Building2 className="w-4 h-4" /> },
    { id: 'cost-utilisation', label: 'Costs & Utilisation', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'demographics', label: 'Ageing Demographics', icon: <Users className="w-4 h-4" />, badge: '≥60 Shift' },
    { id: 'clinical-complexity', label: 'Clinical Complexity', icon: <Activity className="w-4 h-4" /> },
    { id: 'simulator', label: '2025–2035 Simulator', icon: <Sliders className="w-4 h-4" />, badge: 'Policy' },
    { id: 'ai-analyst', label: 'AI Policy Analyst', icon: <Bot className="w-4 h-4" />, badge: 'Gemini' },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Top Banner */}
      <div className="bg-slate-950 px-4 py-2 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
            Annals Study Evidence Base
          </span>
          <span className="text-slate-300 font-medium truncate">
            SingHealth Research: Trends in Healthcare Costs & Utilisation (2019–2024)
          </span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400">
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-slate-800/90 rounded-full text-[11px] border border-slate-700/80">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-slate-300 font-medium">Live Evidence Database</span>
          </div>
          <span className="hidden md:inline">Cohort: <strong className="text-white font-semibold">1.37M Patients</strong></span>
          <span className="hidden sm:inline">2024 Spend: <strong className="text-emerald-400 font-semibold">SGD $6.05B</strong></span>
          <a 
            href="https://annals.edu.sg/trends-singhealth-healthcare-costs-utilisation-2019-2024/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1 underline transition-colors"
          >
            <span>View Publication</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-900/30 border border-blue-400/30">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  SingHealth Analytics
                </h1>
                <span className="bg-slate-800 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                  Pro Research Platform
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Health Economics, Population Ageing & Healthcare System Sustainability Platform
              </p>
            </div>
          </div>

          {/* Quick Search & Actions */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search metrics, care settings, age..."
                className="w-full bg-slate-800/80 text-xs text-white placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={onOpenExport}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export Executive Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto mt-4 pt-1 scrollbar-none border-t border-slate-800/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border-blue-500 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-transparent'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                    isActive ? 'bg-blue-950 text-blue-300 border border-blue-800/50' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
