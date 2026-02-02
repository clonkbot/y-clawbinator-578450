import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface DashboardProps {
  onApply: () => void;
  onSignOut: () => void;
}

export function Dashboard({ onApply, onSignOut }: DashboardProps) {
  const application = useQuery(api.applications.getUserApplication);
  const stats = useQuery(api.applications.getStats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome, Founder 🦞
          </h1>
          <p className="text-gray-600">
            Your journey to the YClaw W26 batch starts here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-black text-orange-600">
              {stats?.totalApplications ?? "—"}
            </div>
            <div className="text-gray-500 font-medium mt-1">Total Applicants</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-black text-green-600">
              {stats?.acceptedCount ?? "—"}
            </div>
            <div className="text-gray-500 font-medium mt-1">Accepted</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-black text-blue-600">
              W{stats?.batchName ?? "26"}
            </div>
            <div className="text-gray-500 font-medium mt-1">Current Batch</div>
          </div>
        </div>

        {/* Application Status */}
        {application === undefined ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Loading application status...</span>
            </div>
          </div>
        ) : application ? (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {application.startupName}
                  </h2>
                  <p className="text-orange-100 mt-1">{application.tagline}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    application.status === "accepted"
                      ? "bg-green-500 text-white"
                      : application.status === "reviewing"
                      ? "bg-blue-500 text-white"
                      : application.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Founder
                </h3>
                <p className="text-gray-900">{application.founderName}</p>
                <p className="text-gray-500 text-sm">{application.founderEmail}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Agent Type
                </h3>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {application.agentType}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {application.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Problem You're Solving
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {application.problemSolving}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Funding Ask
                </h3>
                <p className="text-gray-900 font-semibold">{application.fundingAsk}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                  Submitted on{" "}
                  {new Date(application.submittedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="text-6xl mb-4">🦞</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Application Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't submitted an application for YClaw W26. Ready to pitch
              your Moltbot startup?
            </p>
            <button
              onClick={onApply}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200"
            >
              Start Application
              <span>→</span>
            </button>
          </div>
        )}
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
    </div>
  );
}
