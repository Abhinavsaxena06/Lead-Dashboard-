import {
  LayoutDashboard,
  Users,
  LogOut,
  BarChart3
} from "lucide-react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: (
        <LayoutDashboard size={19} />
      ),
      path: "/dashboard"
    },
    {
      name: "Leads",
      icon: <Users size={19} />,
      path: "/leads"
    }
  ];

  if (user?.role === "admin") {
    menuItems.push({
      name: "Analytics",
      icon: (
        <BarChart3 size={19} />
      ),
      path: "/analytics"
    });
  }

  return (
    <aside className="hidden lg:flex w-72 min-h-screen flex-col justify-between border-r border-slate-200/70 bg-white/65 backdrop-blur-2xl px-6 py-6">
      <div>
        {/* Logo */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-bold text-white shadow-sm">
            SL
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Smart Leads
            </h1>

            <p className="text-sm text-slate-500">
              Sales Workspace
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive =
              location.pathname ===
              item.path;

            return (
              <button
                key={item.name}
                onClick={() =>
                  navigate(item.path)
                }
                className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`transition-transform ${
                    isActive
                      ? "text-violet-600"
                      : "text-slate-500"
                  }`}
                >
                  {item.icon}
                </span>

                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="space-y-4">
        {/* User Card */}
        <div className="rounded-[26px] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-lg font-bold text-slate-700 ring-1 ring-slate-200">
              {user?.name?.charAt(0) ||
                "U"}
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-800">
                {user?.name ||
                  "User"}
              </h3>

              <p className="truncate text-xs text-slate-500">
                {user?.email ||
                  "user@email.com"}
              </p>

              <div className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium capitalize text-slate-600">
                {user?.role ||
                  "sales"}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;