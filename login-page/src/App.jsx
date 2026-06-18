import { useState } from "react";
import Login from "./components/Login";
import TwoFactorSetup from "./components/TwoFactorSetup";
import OTP from "./components/OTP";

export default function App() {
  const [step, setStep] = useState("login");

  if (step === "login") {
    return (
      <Login
        onLoginSuccess={() => setStep("setup")}
      />
    );
  }

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <TwoFactorSetup
          onSetupComplete={() => setStep("otp")}
        />
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <OTP />
      </div>
    );
  }

  return null;
}