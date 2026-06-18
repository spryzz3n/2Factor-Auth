import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }

      const data = await res.json();
      console.log("Login success:", data);
      onLoginSuccess?.(data);
    } catch (err) {
      setError("Could not connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Sign in
        </h1>
        <div className="space-y-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors">
            <FiUser className="text-gray-400 mr-2.5 shrink-0" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors">
            <FiLock className="text-gray-400 mr-2.5 shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 ml-2"
              type="button"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer mt-2"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
