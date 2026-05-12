import { useState } from "react";
import { HumanizerTool } from "./components/HumanizerTool";
import { TextAnalyzer } from "./components/TextAnalyzer";

type Tab = "humanize" | "analyze";

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("humanize");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/40 bg-white/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  AI Humanizer
                </h1>
                <p className="text-sm text-gray-500 font-medium">Make your text sound naturally human</p>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1.5 shadow-inner border border-white/40">
              <button
                onClick={() => setActiveTab("humanize")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "humanize"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Humanize
              </button>
              <button
                onClick={() => setActiveTab("analyze")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "analyze"
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analyze
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 space-y-3">
          {activeTab === "humanize" ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Transform AI Text Into{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Natural Writing
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Paste your AI-generated text and watch it transform into natural, human-sounding writing. 
                Adjust the intensity to control how casual the output sounds.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Check Your Text's{" "}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  AI Score
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Analyze any text to see how AI-like it sounds. Get detailed feedback and suggestions 
                to make your writing more authentic.
              </p>
            </>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Instant Transform</h3>
            <p className="text-sm text-gray-500">Real-time text humanization with adjustable intensity levels</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Zero AI Detection</h3>
            <p className="text-sm text-gray-500">Transforms text to bypass AI detection tools and read naturally</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Smart Analysis</h3>
            <p className="text-sm text-gray-500">Detects AI patterns and provides actionable improvement suggestions</p>
          </div>
        </div>

        {/* Tool Section */}
        <div className="mb-8">
          {activeTab === "humanize" ? <HumanizerTool /> : <TextAnalyzer />}
        </div>

        {/* How It Works */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Paste Text",
                desc: "Enter your AI-generated text into the input area",
                color: "from-blue-500 to-indigo-600",
              },
              {
                step: "2",
                title: "Set Intensity",
                desc: "Choose how aggressively to humanize the text",
                color: "from-violet-500 to-purple-600",
              },
              {
                step: "3",
                title: "Transform",
                desc: "Our engine rewrites text to sound naturally human",
                color: "from-emerald-500 to-teal-600",
              },
              {
                step: "4",
                title: "Copy & Use",
                desc: "Copy the humanized text and use it anywhere",
                color: "from-amber-500 to-orange-600",
              },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg text-white text-xl font-black`}>
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/40 bg-white/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">AI Humanizer</span>
              <span>— Make every word sound like you wrote it</span>
            </div>
            <p className="text-xs text-gray-400">
              100% client-side processing • Your text never leaves your browser
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
