import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import type { AuthResponse } from "../types/auth.types";
import ThemeToggle from "../components/ThemeToggle";

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
        "Login failed. The server may take a few seconds to wake up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100 px-4 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <ThemeToggle />

      {/* Background Orbs */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-400/20 blur-[100px]" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-400/20 blur-[100px]" />

      <div className="absolute left-[45%] top-[35%] h-[220px] w-[220px] rounded-full bg-violet-300/10 blur-[80px]" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md rounded-[36px] border border-white/50 bg-white/55 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-3xl dark:border-slate-700 dark:bg-slate-900/60 sm:p-10">
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-violet-500 to-cyan-400 opacity-30 blur-xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-[30px] border border-white/30 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-xl">
              <span className="text-3xl font-black text-white">
                SL
              </span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
            SMART LEADS
          </p>

          <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Login to access your lead dashboard and sales insights.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in... please wait
              </div>
            ) : (
              "Login"
            )}
          </button>

          {loading && (
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Server may take a few seconds to wake up on first request.
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-400">
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