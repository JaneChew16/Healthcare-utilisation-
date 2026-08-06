import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { STUDY_METADATA } from '../data/singhealthData';
import { Bot, Send, Sparkles, User, RefreshCw, FileText, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

export const AIAnalystTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello. I am your **SingHealth Health Policy & Economics AI Analyst**, powered by server-side Gemini AI. 

I am fully grounded in the peer-reviewed Annals study: *"Trends in healthcare costs and utilisation in SingHealth 2019–2024: The effects of an ageing population"*.

You can ask me to evaluate health system policy interventions, draft executive memos, analyze care setting cost drivers, or assess the impact of Singapore's ageing population. How may I assist your policy formulation today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const presetQueries = [
    "Analyze why inpatient care drives 63.8% of SingHealth costs and how to mitigate it.",
    "How does the surge in adults aged 80+ impact per-user annual healthcare expenditure?",
    "Evaluate the economic benefits of Healthier SG primary care enrolment for SingHealth.",
    "Draft an executive policy memo for Ministry of Health leadership on SingHealth cost trends.",
  ];

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/analyze-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: {
            studyTitle: STUDY_METADATA.title,
            period: STUDY_METADATA.period,
            spend2024: STUDY_METADATA.totalExpenditure2024,
            inpatientShare: STUDY_METADATA.inpatientShare2024,
            elderlySpendShare: STUDY_METADATA.elderlyShareSpend2024,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with AI Policy Analyst');
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ **Analysis Error**: ${err?.message || 'Unable to complete AI query.'} Please verify process.env.GEMINI_API_KEY in server environment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>Gemini 3.6 Flash Server Engine</span>
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              AI Health Systems & Policy Analyst
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Synthesize health economic evidence, evaluate strategic policy choices, and generate executive briefs grounded in the SingHealth Annals research.
          </p>
        </div>
      </div>

      {/* Quick Prompt Presets */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Suggested Research & Policy Queries:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presetQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(query)}
              disabled={loading}
              className="text-left text-xs bg-white hover:bg-slate-50 text-slate-800 p-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm flex items-start space-x-2 group disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">{query}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400 border-b border-slate-200/40 pb-1 mb-1">
                  <span className="font-bold text-slate-500 uppercase">
                    {msg.sender === 'user' ? 'You' : 'SingHealth AI Policy Analyst'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed space-y-2">
                  {msg.text}
                </div>

                {msg.sender === 'ai' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="text-[10px] text-slate-500 hover:text-slate-900 flex items-center space-x-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-xs"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200 w-fit">
              <Bot className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>Synthesizing health economic evidence and evaluating policy options...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask a health economics or policy question grounded in the SingHealth study..."
              disabled={loading}
              className="flex-1 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-blue-900/20 disabled:opacity-50"
            >
              <span>Analyze</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
