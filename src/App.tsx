import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { ApplicationForm } from "./components/ApplicationForm";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [showApplication, setShowApplication] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Handle scroll to apply section
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#apply") {
        setShowAuth(true);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl animate-bounce">🦞</div>
          <p className="text-white/80 text-lg font-medium tracking-wide">Loading Y Clawbinator...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && showApplication) {
    return (
      <ApplicationForm
        onBack={() => setShowApplication(false)}
        onSignOut={signOut}
      />
    );
  }

  if (isAuthenticated) {
    return (
      <Dashboard
        onApply={() => setShowApplication(true)}
        onSignOut={signOut}
      />
    );
  }

  return (
    <LandingPage
      showAuth={showAuth}
      setShowAuth={setShowAuth}
    />
  );
}
