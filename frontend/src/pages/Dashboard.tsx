import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import LeadTable from "../components/LeadTable";
import axiosInstance from "../api/axiosInstance";
import type { Lead, LeadsResponse } from "../types/lead.types";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalLeads: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get<LeadsResponse>("/leads", {
        params: {
          status,
          source,
          search,
          sort,
          page
        }
      });

      setLeads(response.data.data);

      setPagination({
        totalLeads: response.data.pagination.totalLeads,
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status, source, sort, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchLeads();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const totalLeads = pagination.totalLeads;
  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;
  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100 flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Navbar />

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            subtitle="All available leads"
          />

          <StatsCard
            title="Qualified"
            value={qualifiedLeads}
            subtitle="High quality prospects"
          />

          <StatsCard
            title="Contacted"
            value={contactedLeads}
            subtitle="Already contacted"
          />

          <StatsCard
            title="Lost"
            value={lostLeads}
            subtitle="Closed unsuccessfully"
          />
        </section>

        <section className="rounded-[32px] border border-white bg-white/55 backdrop-blur-2xl shadow-sm p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </section>

        <LeadTable leads={leads} loading={loading} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <p className="text-sm text-slate-600">
            Page{" "}
            <span className="font-bold">{pagination.currentPage}</span> of{" "}
            <span className="font-bold">{pagination.totalPages}</span>
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-2xl bg-white/80 px-5 py-2.5 font-bold text-slate-700 shadow-sm disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-400 px-5 py-2.5 font-bold text-white shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;