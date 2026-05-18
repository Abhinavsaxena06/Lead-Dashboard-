import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-500">
          Dashboard
        </p>

        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-100">
          Welcome back, {user?.name || "User"}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage leads, track status, and monitor sales activity.
        </p>
      </div>

      <div className="hidden items-center gap-3 sm:flex">
        <button
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white bg-white/75 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-semibold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
              {user?.name || "User"}
            </p>
            <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
              {user?.role || "sales"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;