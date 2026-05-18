import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded: () => void;
}

const AddLeadModal = ({
  isOpen,
  onClose,
  onLeadAdded
}: AddLeadModalProps) => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website"
    });

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(
        "/leads",
        formData
      );

      toast.success(
        "Lead added successfully"
      );

      onLeadAdded();

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website"
      });

      onClose();
    } catch {
      toast.error(
        "Failed to add lead"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-[36px] border border-white/50 bg-white/80 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-8">

        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Smart Leads
            </p>

            <h2 className="text-3xl font-black text-slate-900">
              Add New Lead
            </h2>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
            <option value="New">
              New
            </option>
            <option value="Contacted">
              Contacted
            </option>
            <option value="Qualified">
              Qualified
            </option>
            <option value="Lost">
              Lost
            </option>
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
            <option value="Website">
              Website
            </option>
            <option value="Instagram">
              Instagram
            </option>
            <option value="Referral">
              Referral
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 py-3 text-white font-bold shadow-lg hover:scale-[1.02] transition-all"
          >
            {loading
              ? "Adding Lead..."
              : "Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;