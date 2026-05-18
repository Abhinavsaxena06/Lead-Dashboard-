import { useEffect, useState } from "react";
import {
  BarChart3,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import axiosInstance from "../api/axiosInstance";
import type { Lead, LeadsResponse } from "../types/lead.types";

const Analytics = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchAnalytics = async () => {
    try {
      const response = await axiosInstance.get<LeadsResponse>("/leads", {
        params: {
          page: 1,
          sort: "latest"
        }
      });

      setLeads(response.data.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const statusCounts = {
    New: leads.filter((lead) => lead.status === "New").length,
    Contacted: leads.filter((lead) => lead.status === "Contacted").length,
    Qualified: leads.filter((lead) => lead.status === "Qualified").length,
    Lost: leads.filter((lead) => lead.status === "Lost").length
  };

  const sourceCounts = {
    Website: leads.filter((lead) => lead.source === "Website").length,
    Instagram: leads.filter((lead) => lead.source === "Instagram").length,
    Referral: leads.filter((lead) => lead.source === "Referral").length
  };


  const bestSource =
    Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0][0];

  const topStatus =
    Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0][0];

  const conversionRate =
    leads.length === 0
      ? 0
      : Math.round((statusCounts.Qualified / leads.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex transition-colors duration-300">
      <Sidebar />

      <main className="relative flex-1 p-4 sm:p-6 lg:p-8">
        <ThemeToggle />

        <section className="mb-6 rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/70">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
            Analytics
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-700 dark:text-slate-100">
            Lead Insights
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            View a clean summary of your lead quality, status distribution,
            and acquisition sources.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500 dark:bg-violet-900/30">
              <Users size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Leads
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">
              {leads.length}
            </h3>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 dark:bg-cyan-900/30">
              <Target size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Conversion
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">
              {conversionRate}%
            </h3>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-500 dark:bg-fuchsia-900/30">
              <TrendingUp size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Top Status
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-100">
              {topStatus}
            </h3>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30">
              <BarChart3 size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Best Source
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-100">
              {bestSource}
            </h3>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;