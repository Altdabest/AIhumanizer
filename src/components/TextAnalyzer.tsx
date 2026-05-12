import { useState } from "react";
import { analyzeAIScore } from "../utils/humanizer";

interface AnalysisResult {
  score: number;
  flags: string[];
  suggestions: string[];
}

export function TextAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (text.trim()) {
      setResult(analyzeAIScore(text));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-yellow-500";
    return "text-green-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Highly Likely AI";
    if (score >= 40) return "Possibly AI";
    return "Likely Human";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-red-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">AI Detection Analyzer</h3>
            <p className="text-sm text-gray-500">Check how AI-like your text sounds</p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to analyze its AI score..."
          className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all resize-none text-sm"
        />

        <button
          onClick={handleAnalyze}
          disabled={!text.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
        >
          Analyze Text
        </button>

        {result && (
          <div className="space-y-4 pt-2 animate-fade-in">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-xl p-5 border border-gray-200/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">AI Detection Score</span>
                <span className={`text-sm font-bold ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${getScoreBg(result.score)} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <div className="text-center">
                <span className={`text-4xl font-black ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-lg text-gray-400 font-medium">/100</span>
              </div>
            </div>

            {/* Flags */}
            {result.flags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Issues Found ({result.flags.length})
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {result.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 text-amber-800">
                      <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Suggestions
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm bg-green-50 border border-green-200/60 rounded-lg px-3 py-2 text-green-800">
                      <span className="text-green-500 mt-0.5 shrink-0">💡</span>
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
