import type { Lead } from "../types/lead.types";

interface LeadDetailsModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
}

const LeadDetailsModal = ({ isOpen, lead, onClose }: LeadDetailsModalProps) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-xl backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/95">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
              Lead Details
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">
              {lead.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete information about this lead.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase text-slate-400">Name</p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
              {lead.name}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase text-slate-400">Email</p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
              {lead.email}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium uppercase text-slate-400">
                Status
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
                {lead.status}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium uppercase text-slate-400">
                Source
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
                {lead.source}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase text-slate-400">
              Created At
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
              {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;