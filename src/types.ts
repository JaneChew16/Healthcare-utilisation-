export type TabType = 
  | 'overview' 
  | 'cost-utilisation' 
  | 'demographics' 
  | 'clinical-complexity' 
  | 'simulator' 
  | 'ai-analyst';

export interface YearlyTrend {
  year: number;
  patientPopulation: number; // e.g. 1210000 -> 1370000
  totalExpenditureSGD: number; // e.g. 4.37B -> 6.05B (in billions)
  inpatientSpend: number;
  specialistOutpatientSpend: number;
  polyclinicSpend: number;
  edSpend: number;
  communityHospitalSpend: number;
  elderlySpendPercent: number; // spend share for age >= 60
  elderlyPopulationPercent: number; // patient share for age >= 60
  averageCostPerPatient: number; // in SGD
}

export interface CareSettingData {
  setting: string;
  code: string;
  spend2019: number; // SGD Billion
  spend2024: number; // SGD Billion
  share2024: number; // Percentage
  cagr: number; // Compound Annual Growth Rate %
  avgVisitsPerPatient: number;
  costPerVisit: number; // SGD
  description: string;
}

export interface AgeCohortData {
  ageGroup: string;
  population2019: number;
  population2024: number;
  popGrowthPercent: number;
  spend2019: number; // SGD Billion
  spend2024: number; // SGD Billion
  spendGrowthPercent: number;
  avgCostPerUser2019: number; // SGD
  avgCostPerUser2024: number; // SGD
  perUserGrowthPercent: number;
  riskProfile: 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface ClinicalSegmentData {
  segment: string;
  patientPercent: number; // e.g. 14.8%
  spendPercent: number; // e.g. 46.7%
  avgSpendPerPatient: number; // SGD
  keyConditions: string[];
  primaryCareSetting: string;
  policyLever: string;
}

export interface SimulationParams {
  horizonYear: number; // 2025 - 2035
  ageingAcceleration: number; // % annual growth in 60+ population
  healthierSgAdoption: number; // % enrollee adoption in preventive primary care
  inpatientDiversionRate: number; // % diversion from inpatient to day-surgery / community hospital
  chronicControlEfficiency: number; // % reduction in acute escalation for complex chronic patients
}

export interface SimulationResult {
  year: number;
  baselineExpenditureSGD: number; // Billions
  projectedExpenditureSGD: number; // Billions
  cumulativeSavingsSGD: number; // Billions
  inpatientSharePercent: number;
  polyclinicSharePercent: number;
  elderlyExpenditureSGD: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
}
