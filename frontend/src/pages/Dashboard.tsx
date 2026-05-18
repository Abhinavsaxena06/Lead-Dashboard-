import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
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

  const qualified = leads.filter((lead) => lead.status === "Qualified").length;
  const contacted = leads.filter((lead) => lead.status === "Contacted").length;
  const lost = leads.filter((lead) => lead.status === "Lost").length;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100 flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Navbar />

        <section className="mb-8 rounded-[36px] border border-white bg-white/60 backdrop-blur-2xl p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-600">
            Overview
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-900">
            Smart Leads Command Center
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Track your lead pipeline, monitor recent activity, and quickly understand
            how your sales funnel is performing.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <StatsCard title="Total Leads" value={totalLeads} subtitle="All leads in database" />
          <StatsCard title="Qualified" value={qualified} subtitle="Ready for conversion" />
          <StatsCard title="Contacted" value={contacted} subtitle="Already reached out" />
          <StatsCard title="Lost" value={lost} subtitle="Closed unsuccessfully" />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-[32px] border border-white bg-white/65 backdrop-blur-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-5">
              Recent Leads
            </h2>

            <div className="space-y-4">
              {recentLeads.length === 0 ? (
                <p className="text-slate-500">No recent leads available.</p>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center justify-between rounded-2xl bg-white/80 p-4"
                  >
                    <div>
                      <h3 className="font-black text-slate-900">{lead.name}</h3>
                      <p className="text-sm text-slate-500">{lead.email}</p>
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-white bg-white/65 backdrop-blur-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Quick Insights
            </h2>

            <div className="space-y-4 text-sm text-slate-600">
              <p className="rounded-2xl bg-white/80 p-4">
                Use the Leads page to create, edit, delete, filter and export lead records.
              </p>

              <p className="rounded-2xl bg-white/80 p-4">
                Admin users can delete leads. Sales users can manage and update lead information.
              </p>

              <p className="rounded-2xl bg-white/80 p-4">
                Analytics gives a visual breakdown of lead status and source distribution.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;