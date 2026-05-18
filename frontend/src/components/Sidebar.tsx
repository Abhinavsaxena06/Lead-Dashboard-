import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-72 min-h-screen flex-col justify-between border-r border-slate-200/70 bg-white/70 backdrop-blur-xl px-6 py-6">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-white font-black">
            SL
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              Smart Leads
            </h1>
            <p className="text-xs text-slate-500">
              Sales Dashboard
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 rounded-2xl bg-violet-50 px-4 py-3 text-violet-700 font-bold">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100 font-semibold">
            <Users size={20} />
            Leads
          </button>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-red-500 hover:bg-red-50 font-bold"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;