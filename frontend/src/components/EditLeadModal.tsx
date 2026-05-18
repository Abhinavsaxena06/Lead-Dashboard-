import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import type { Lead } from "../types/lead.types";

interface EditLeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onLeadUpdated: () => void;
}

const EditLeadModal = ({
  isOpen,
  lead,
  onClose,
  onLeadUpdated
}: EditLeadModalProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website"
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    }
  }, [lead]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!lead) return;

    try {
      setLoading(true);

      await axiosInstance.put(`/leads/${lead._id}`, formData);

      toast.success("Lead updated successfully");
      onLeadUpdated();
      onClose();
    } catch {
      toast.error("Failed to update lead");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-[36px] border border-white/50 bg-white/80 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Smart Leads
            </p>

            <h2 className="text-3xl font-black text-slate-900">
              Edit Lead
            </h2>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Lead Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <input
            type="email"
            placeholder="Lead Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 outline-none"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={formData.source}
            onChange={(e) =>
              setFormData({
                ...formData,
                source: e.target.value
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 outline-none"
          >
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 py-3 text-white font-bold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {loading ? "Updating Lead..." : "Update Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;