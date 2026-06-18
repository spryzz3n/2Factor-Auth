import { useState } from "react";
import {
  FiShield,
  FiLock,
  FiLoader,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";

const ENDPOINT = "http://localhost:8080/verify-otp";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid OTP");
      }

      const data = await res.json();

      setStatus("success");
      setMessage(data.message || "OTP verified successfully");

      // later:
      // navigate("/dashboard")
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white border border-gray-200 shadow-sm p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <FiShield className="text-gray-700 text-lg" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              OTP Verification
            </h1>

            <p className="text-sm text-gray-500">
              Enter your 6-digit authentication code
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Authentication Code
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="123456"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || otp.length !== 6}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-green-700">
            <FiCheck />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-700">
            <FiAlertTriangle />
            <span>{message}</span>
          </div>
        )}

        <p className="mt-5 text-xs text-gray-500 text-center">
          Open your authenticator app and enter the current code.
        </p>
      </div>
    </div>
  );
}