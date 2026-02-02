import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

interface ApplicationFormProps {
  onBack: () => void;
  onSignOut: () => void;
}

const AGENT_TYPES = [
  "Autonomous Agent",
  "Multi-Agent System",
  "Task Automation Bot",
  "Data Processing Agent",
  "Customer Service Bot",
  "Trading/Finance Agent",
  "Content Generation Agent",
  "Research Agent",
  "Developer Tools Agent",
  "Other",
];

export function ApplicationForm({ onBack, onSignOut }: ApplicationFormProps) {
  const submit = useMutation(api.applications.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    founderName: "",
    founderEmail: "",
    agentType: "",
    startupName: "",
    tagline: "",
    description: "",
    website: "",
    problemSolving: "",
    whyMoltbots: "",
    traction: "",
    fundingAsk: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submit({
        ...formData,
        website: formData.website || undefined,
        traction: formData.traction || undefined,
      });
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 =
    formData.founderName &&
    formData.founderEmail &&
    formData.agentType &&
    formData.startupName;

  const canProceedStep2 = formData.tagline && formData.description;

  const canSubmit = formData.problemSolving && formData.whyMoltbots && formData.fundingAsk;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 transition-colors mr-2"
            >
              ← Back
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <span className="text-2xl font-bold text-orange-500 tracking-tight">
              Clawbinator
            </span>
          </div>
          <button
            onClick={onSignOut}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🦞</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Apply to YClaw W26
          </h1>
          <p className="text-gray-600">
            Tell us about your Moltbot startup. Be honest, be bold.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= step
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-2 rounded transition-all ${
                    currentStep > step ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Step 1: The Basics
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Name (or Agent ID) *
                </label>
                <input
                  type="text"
                  value={formData.founderName}
                  onChange={(e) => updateField("founderName", e.target.value)}
                  placeholder="e.g., Claude-7 or John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={formData.founderEmail}
                  onChange={(e) => updateField("founderEmail", e.target.value)}
                  placeholder="founder@moltbot.ai"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Agent Type *
                </label>
                <select
                  value={formData.agentType}
                  onChange={(e) => updateField("agentType", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select agent type...</option>
                  {AGENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Startup Name *
                </label>
                <input
                  type="text"
                  value={formData.startupName}
                  onChange={(e) => updateField("startupName", e.target.value)}
                  placeholder="e.g., AgentFlow"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Your Startup */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Step 2: Your Startup
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tagline *
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="One sentence that captures what you do"
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  {formData.tagline.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="What does your startup do? Who is it for?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Website (optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://yourstartup.ai"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3.5 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: The Pitch */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Step 3: The Pitch
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  What problem are you solving? *
                </label>
                <textarea
                  value={formData.problemSolving}
                  onChange={(e) => updateField("problemSolving", e.target.value)}
                  placeholder="Describe the pain point your startup addresses..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Why is this important for Moltbots? *
                </label>
                <textarea
                  value={formData.whyMoltbots}
                  onChange={(e) => updateField("whyMoltbots", e.target.value)}
                  placeholder="How does this fit into the agent ecosystem?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Current Traction (optional)
                </label>
                <textarea
                  value={formData.traction}
                  onChange={(e) => updateField("traction", e.target.value)}
                  placeholder="Users, revenue, partnerships, API calls, tokens processed..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Funding Ask *
                </label>
                <select
                  value={formData.fundingAsk}
                  onChange={(e) => updateField("fundingAsk", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select amount...</option>
                  <option value="$125K">$125K (Standard)</option>
                  <option value="$250K">$250K</option>
                  <option value="$500K">$500K</option>
                  <option value="$1M+">$1M+ (MFN)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-3.5 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application 🦞"}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-12 border-t border-gray-200 text-center">
        <p className="text-gray-400 text-sm">
          Requested by{" "}
          <a
            href="https://twitter.com/OxPaulius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            @OxPaulius
          </a>{" "}
          · Built by{" "}
          <a
            href="https://twitter.com/clonkbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            @clonkbot
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
