import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import EditLeadModal from "./EditLeadModal";
import LeadDetailsModal from "./LeadDetailsModal";
import type { Lead } from "../types/lead.types";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Qualified":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "Contacted":
      return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "Lost":
      return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
};

const LeadTable = ({ leads, loading, onRefresh }: LeadTableProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/leads/${id}`);
      toast.success("Lead deleted successfully");
      onRefresh();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white/70 p-10 text-center text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
        Loading leads...
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-3xl bg-white/70 p-10 text-center dark:bg-slate-900/70">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-100">
          No leads found
        </h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Add some leads to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-white bg-white/70 shadow-sm dark:border-slate-700 dark:bg-slate-900/75">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-sm text-slate-500 dark:bg-slate-800/80 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-100">
                    {lead.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {lead.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {lead.source}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(lead)}
                        className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(lead)}
                        className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        Edit
                      </button>

                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditLeadModal
        isOpen={isEditModalOpen}
        lead={selectedLead}
        onClose={() => setIsEditModalOpen(false)}
        onLeadUpdated={onRefresh}
      />

      <LeadDetailsModal
        isOpen={isDetailsOpen}
        lead={selectedLead}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default LeadTable;