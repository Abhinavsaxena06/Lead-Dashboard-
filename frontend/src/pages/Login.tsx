import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import type { AuthResponse } from "../types/auth.types";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );

      toast.success("Login successful");
      navigate("/dashboard");
    } catch {
      toast.error(
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100 flex items-center justify-center px-4">

      {/* Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-400/20 blur-[100px]" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-400/20 blur-[100px]" />

      <div className="absolute top-[35%] left-[45%] h-[220px] w-[220px] rounded-full bg-violet-300/10 blur-[80px]" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md rounded-[36px] border border-white/50 bg-white/55 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] p-8 sm:p-10">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="relative">

            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-violet-500 to-cyan-400 blur-xl opacity-30" />

            <div className="relative h-20 w-20 rounded-[30px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-xl border border-white/30">
              <span className="text-white text-3xl font-black">
                SL
              </span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-violet-600 mb-3">
            SMART LEADS
          </p>

          <h1 className="text-4xl font-black text-slate-900">
            Welcome Back
          </h1>

          <p className="text-slate-600 mt-2">
            Login to access your lead
            dashboard and sales insights.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 py-3.5 text-white font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-violet-600 hover:text-violet-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;