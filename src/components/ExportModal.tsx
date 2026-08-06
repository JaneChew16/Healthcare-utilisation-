import React, { useState } from 'react';
import { STUDY_METADATA, YEARLY_TRENDS, CARE_SETTINGS, AGE_COHORTS, CLINICAL_SEGMENTS } from '../data/singhealthData';
import { Download, X, Copy, Check, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullDataExport = {
    metadata: STUDY_METADATA,
    yearlyTrends: YEARLY_TRENDS,
    careSettings: CARE_SETTINGS,
    ageCohorts: AGE_COHORTS,
    clinicalSegments: CLINICAL_SEGMENTS,
    exportedAt: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(fullDataExport, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SingHealth_Healthcare_Cost_Study_2019_2024.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 relative animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Export SingHealth Research Brief & Dataset
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Export the complete evidence base from the Annals paper 
          <em>"Trends in healthcare costs and utilisation in SingHealth 2019–2024: The effects of an ageing population"</em>. 
          Includes care setting breakdowns, age cohort expenditures, and multi-morbidity metrics.
        </p>

        {/* JSON Preview Box */}
        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[11px] font-mono h-64 overflow-y-auto border border-slate-800">
          <pre>{jsonString}</pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={handleCopyJSON}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Raw JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md shadow-blue-900/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Data File (.json)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
