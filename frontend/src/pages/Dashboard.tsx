import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import ThemeToggle from "../components/ThemeToggle";
import axiosInstance from "../api/axiosInstance";
import type { Lead, LeadsResponse } from "../types/lead.types";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);

  const fetchOverview = async () => {
    try {
      const response = await axiosInstance.get<LeadsResponse>("/leads", {
        params: {
          page: 1,
          sort: "latest"
        }
      });

      setLeads(response.data.data);
      setTotalLeads(response.data.pagination.totalLeads);
    } catch (error) {
      console.error("Failed to fetch dashboard overview:", error);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const qualified = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const lost = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 flex dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <ThemeToggle />

        <section className="mb-6 rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
            Overview
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-100 sm:text-3xl">
            Smart Leads Command Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Monitor lead activity, review recent prospects, and understand your
            sales pipeline from one clean dashboard.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            subtitle="All leads in database"
          />

          <StatsCard
            title="Qualified"
            value={qualified}
            subtitle="Ready for conversion"
          />

          <StatsCard
            title="Contacted"
            value={contacted}
            subtitle="Already reached out"
          />

          <StatsCard
            title="Lost"
            value={lost}
            subtitle="Closed unsuccessfully"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75 xl:col-span-2">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                Recent Activity
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-700 dark:text-slate-100">
                Latest Leads
              </h2>
            </div>

            <div className="space-y-3">
              {recentLeads.length === 0 ? (
                <div className="rounded-2xl bg-white/80 p-5 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  No recent leads available.
                </div>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                        {lead.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {lead.email}
                      </p>
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-500">
                Notes
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-700 dark:text-slate-100">
                Quick Insights
              </h2>
            </div>

            <div className="space-y-3">
              <p className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Use the Leads page to create, edit, delete, filter, and export
                lead records.
              </p>

              <p className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Admin users can delete leads, while sales users can manage lead
                information.
              </p>

              <p className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Analytics provides a simple breakdown of lead status and source
                distribution.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;