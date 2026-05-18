import type { Lead } from "../types/lead.types";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Qualified":
      return "bg-emerald-50 text-emerald-700";
    case "Contacted":
      return "bg-blue-50 text-blue-700";
    case "Lost":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const LeadTable = ({ leads, loading }: LeadTableProps) => {
  if (loading) {
    return (
      <div className="rounded-3xl bg-white/70 p-10 text-center text-slate-500">
        Loading leads...
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-3xl bg-white/70 p-10 text-center">
        <h3 className="text-xl font-black text-slate-900">
          No leads found
        </h3>
        <p className="text-slate-500 mt-2">
          Try changing filters or add a new lead.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white bg-white/70 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 text-sm text-slate-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4 font-bold text-slate-900">
                  {lead.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {lead.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {lead.source}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;