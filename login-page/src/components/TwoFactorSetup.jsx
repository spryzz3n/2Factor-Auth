import { useState } from "react";
import {
  FiShield,
  FiLoader,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";

const ENDPOINT = "http://localhost:8080/totp";

export default function TwoFactorSetup() {
  const [uri, setUri] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setStatus("loading");
    setError("");
    setOtp("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uri,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate OTP");
      }

      const data = await res.json();

      setOtp(data.otp);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-gray-200 bg-white p-6">

      <div className="flex items-center gap-3 mb-3">
        <FiShield className="h-6 w-6 text-gray-700" />
        <h2 className="text-lg font-semibold">
          TOTP Generator
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Paste an otpauth:// URL to generate the current OTP.
      </p>

      <textarea
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        rows={5}
        placeholder="otpauth://totp/Test:user@example.com?secret=..."
        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
      />

      <button
        onClick={handleGenerate}
        disabled={status === "loading" || !uri}
        className="mt-4 w-full bg-gray-900 text-white py-2.5 rounded-lg"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <FiLoader className="animate-spin" />
            Generating...
          </span>
        ) : (
          "Generate OTP"
        )}
      </button>

      {status === "error" && (
        <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
          <FiAlertTriangle />
          {error}
        </div>
      )}

      {status === "ready" && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiCheck className="text-green-600" />
            <span className="font-medium">
              OTP Generated
            </span>
          </div>

          <div className="text-center">
            <div className="text-4xl font-mono tracking-widest font-bold">
              {otp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}