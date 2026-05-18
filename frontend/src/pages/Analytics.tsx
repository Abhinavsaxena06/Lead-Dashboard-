import { useEffect, useState } from "react";
import { BarChart3, Target, TrendingUp, Users } from "lucide-react";
import Sidebar from "../components/Sidebar";
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

  const maxStatus = Math.max(...Object.values(statusCounts), 1);
  const maxSource = Math.max(...Object.values(sourceCounts), 1);

  const bestSource =
    Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0][0];

  const topStatus =
    Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0][0];

  const conversionRate =
    leads.length === 0
      ? 0
      : Math.round((statusCounts.Qualified / leads.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="mb-6 rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Analytics
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Lead Insights
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            View a clean summary of your lead quality, status distribution, and
            acquisition sources.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users size={21} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Total Leads
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">
              {leads.length}
            </h3>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Target size={21} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Conversion
            </p>

            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">
              {conversionRate}%
            </h3>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-600">
              <TrendingUp size={21} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Top Status
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-slate-800">
              {topStatus}
            </h3>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BarChart3 size={21} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Best Source
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-slate-800">
              {bestSource}
            </h3>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-500">
                Pipeline
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-slate-800">
                Status Distribution
              </h2>
            </div>

            <div className="space-y-5">
              {Object.entries(statusCounts).map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200/80">
                    <div
                      className="h-3 rounded-full bg-violet-500"
                      style={{
                        width: `${(value / maxStatus) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-500">
                Acquisition
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-slate-800">
                Source Distribution
              </h2>
            </div>

            <div className="space-y-5">
              {Object.entries(sourceCounts).map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200/80">
                    <div
                      className="h-3 rounded-full bg-cyan-500"
                      style={{
                        width: `${(value / maxSource) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;