import { useState } from "react";
import { humanizeText } from "../utils/humanizer";

export function HumanizerTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [intensity, setIntensity] = useState(7);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHumanize = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate a brief processing delay for UX
    setTimeout(() => {
      const result = humanizeText(inputText, intensity);
      setOutputText(result);
      setIsProcessing(false);
    }, 600 + Math.random() * 400);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = outputText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleSwap = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText("");
    }
  };

  const sampleTexts = [
    "In today's rapidly evolving digital landscape, it is essential to leverage cutting-edge technology in order to foster innovation. Furthermore, organizations must harness the power of data to drive transformation and play a pivotal role in shaping the future. It is worth noting that a multifaceted approach is crucial for success in this ever-changing landscape.",
    "The utilization of artificial intelligence has been widely recognized as a paradigm shift in the realm of modern business operations. Consequently, it is important to note that companies should embrace these cutting-edge solutions to remain competitive. Moreover, the seamless integration of AI-driven tools can provide a robust framework for achieving holistic business objectives.",
    "In conclusion, the implementation of comprehensive strategies that leverage synergistic effects between various departments is of paramount importance. Organizations must navigate the complexities of the modern business environment while fostering a culture of innovation that drives meaningful transformation across all levels of the enterprise.",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Intensity Slider */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Humanization Intensity</h3>
              <p className="text-sm text-gray-500">Higher = more natural, casual transformations</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-600">{intensity}</span>
            <span className="text-sm text-gray-400 ml-1">/10</span>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-emerald-200 via-teal-300 to-emerald-400 rounded-full appearance-none cursor-pointer accent-emerald-600
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-500 [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400 font-medium">
            <span>Subtle</span>
            <span>Moderate</span>
            <span>Aggressive</span>
          </div>
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Input */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Original Text
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              {inputText.length} chars
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your AI-generated text here..."
            className="w-full h-56 px-4 py-3 rounded-xl border border-gray-300/80 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all resize-none text-sm leading-relaxed"
          />
          
          {/* Sample Texts */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Try a sample:</p>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(sample)}
                  className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg border border-blue-200/60 hover:from-blue-100 hover:to-indigo-100 transition-all font-medium"
                >
                  Sample {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Humanized Text
            </h3>
            {outputText && (
              <span className="text-xs text-gray-400 font-medium">
                {outputText.length} chars
              </span>
            )}
          </div>
          <div
            className={`w-full h-56 px-4 py-3 rounded-xl border text-sm leading-relaxed overflow-y-auto ${
              outputText
                ? "border-emerald-300/80 bg-emerald-50/30 text-gray-800"
                : "border-gray-300/80 bg-gray-50/50 text-gray-400"
            } transition-all`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Humanizing your text...</p>
                </div>
              </div>
            ) : outputText ? (
              <p className="whitespace-pre-wrap">{outputText}</p>
            ) : (
              <p className="flex items-center justify-center h-full text-gray-400">
                Your humanized text will appear here
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleHumanize}
          disabled={!inputText.trim() || isProcessing}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] text-sm flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Humanize Text
            </>
          )}
        </button>

        {outputText && (
          <>
            <button
              onClick={handleCopy}
              className={`px-6 py-3.5 font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] text-sm flex items-center gap-2 ${
                copied
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>

            <button
              onClick={handleSwap}
              className="px-6 py-3.5 bg-white text-gray-700 font-bold rounded-xl shadow-md border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98] text-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Re-humanize
            </button>
          </>
        )}

        <button
          onClick={handleClear}
          disabled={!inputText && !outputText}
          className="px-6 py-3.5 bg-white text-gray-500 font-bold rounded-xl shadow-md border-2 border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] text-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
}
