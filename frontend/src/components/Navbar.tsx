const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
          Dashboard
        </p>

        <h2 className="text-3xl font-black text-slate-900">
          Welcome back, {user?.name || "User"}
        </h2>

        <p className="text-slate-500 mt-1">
          Manage leads, track status, and monitor sales activity.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/70 border border-white px-4 py-3 shadow-sm">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white font-black">
          {user?.name?.charAt(0) || "U"}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            {user?.role || "sales"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;