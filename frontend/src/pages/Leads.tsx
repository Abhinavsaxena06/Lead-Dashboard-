import { useEffect, useState } from "react";
import { Download, Filter, Plus, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import LeadTable from "../components/LeadTable";
import AddLeadModal from "../components/AddLeadModal";
import axiosInstance from "../api/axiosInstance";
import type { Lead, LeadsResponse } from "../types/lead.types";

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        params: { status, source, search, sort, page }
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
      console.error("Failed to fetch leads:", error);
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

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export");
      return;
    }

    const headers = ["Name", "Email", "Status", "Source", "Created At"];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.status,
      lead.source,
      new Date(lead.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "smart-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="mb-6 rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                Lead Workspace
              </p>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-700">
                Lead Management
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Create, organize, search, filter, and export your sales leads
                from one clean workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <Download size={16} />
                Export CSV
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
              >
                <Plus size={16} />
                Add Lead
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600">
            <Filter size={17} className="text-violet-500" />
            Filters
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-600 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
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
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
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
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </section>

        <LeadTable leads={leads} loading={loading} onRefresh={fetchLeads} />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-white/70 bg-white/65 px-5 py-4 shadow-sm backdrop-blur-xl sm:flex-row">
          <p className="text-sm text-slate-500">
            Page{" "}
            <span className="font-medium text-slate-700">
              {pagination.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {pagination.totalPages}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <AddLeadModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onLeadAdded={fetchLeads}
        />
      </main>
    </div>
  );
};

export default Leads;