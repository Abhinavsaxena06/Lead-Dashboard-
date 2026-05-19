import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
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

  const totalLeads = leads.length;

  const conversionRate =
    totalLeads === 0
      ? 0
      : Math.round((statusCounts.Qualified / totalLeads) * 100);

  const lostRate =
    totalLeads === 0
      ? 0
      : Math.round((statusCounts.Lost / totalLeads) * 100);

  const bestSource = Object.entries(sourceCounts).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const healthScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        conversionRate +
          statusCounts.Contacted * 5 -
          statusCounts.Lost * 8 +
          statusCounts.Qualified * 6
      )
    )
  );

  const riskLevel =
    lostRate >= 50 ? "High" : lostRate >= 25 ? "Medium" : "Low";

  const riskStyle =
    riskLevel === "High"
      ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300"
      : riskLevel === "Medium"
      ? "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300"
      : "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-300";

  const insights = useMemo(() => {
    const data = [];

    if (totalLeads === 0) {
      return [
        "Start by adding leads to generate meaningful sales insights.",
        "Once leads are added, this page will automatically identify pipeline strengths and risks."
      ];
    }

    data.push(`${bestSource} is currently your strongest lead source.`);

    if (conversionRate >= 40) {
      data.push("Your qualified lead ratio is strong. Keep focusing on high-intent sources.");
    } else {
      data.push("Qualification rate can improve. Follow up with New and Contacted leads faster.");
    }

    if (lostRate >= 30) {
      data.push("Lost lead percentage is high. Review lead quality and follow-up timing.");
    } else {
      data.push("Pipeline risk is controlled because lost leads are currently low.");
    }

    if (statusCounts.New > statusCounts.Contacted) {
      data.push("Many leads are still new. Prioritize first contact to improve conversion.");
    }

    return data;
  }, [bestSource, conversionRate, lostRate, statusCounts.Contacted, statusCounts.New, totalLeads]);

  const recommendation =
    totalLeads === 0
      ? "Add at least 5–10 leads to begin pipeline analysis."
      : bestSource === "Instagram"
      ? "Double down on Instagram campaigns and quickly move new Instagram leads to Contacted."
      : bestSource === "Website"
      ? "Improve website lead capture forms and add faster follow-up for inbound leads."
      : "Referral leads are performing well. Encourage more referral-based acquisition.";

  const funnelItems = [
    {
      label: "New",
      value: statusCounts.New,
      note: "Fresh opportunities"
    },
    {
      label: "Contacted",
      value: statusCounts.Contacted,
      note: "Initial outreach done"
    },
    {
      label: "Qualified",
      value: statusCounts.Qualified,
      note: "Ready for conversion"
    },
    {
      label: "Lost",
      value: statusCounts.Lost,
      note: "Needs review"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar />

      <main className="relative flex-1 p-4 sm:p-6 lg:p-8">
        <ThemeToggle />

        <section className="mb-6 rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/70">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
            Lead Intelligence
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-100 sm:text-3xl">
            Smart Analytics Center
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Understand lead quality, pipeline risk, source performance, and
            recommended next actions without relying on boring charts.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500 dark:bg-violet-900/30">
              <ShieldCheck size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Health Score
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">
              {healthScore}/100
            </h3>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Overall pipeline strength
            </p>
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

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Qualified leads ratio
            </p>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-500 dark:bg-fuchsia-900/30">
              <Flame size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Best Source
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-100">
              {bestSource}
            </h3>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Highest lead volume
            </p>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/30">
              <AlertTriangle size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Risk Level
            </p>

            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${riskStyle}`}>
              {riskLevel}
            </span>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Based on lost lead ratio
            </p>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-6 flex items-center gap-2">
              <Activity size={18} className="text-violet-500" />
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
                Lead Funnel Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {funnelItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative rounded-2xl border border-slate-100 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800/70"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Step {index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-100">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-violet-500">
                    {item.label}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-5 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
                Recommended Action
              </h2>
            </div>

            <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
              {recommendation}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-500" />
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
                Smart Insights
              </h2>
            </div>

            <div className="space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight}
                  className="flex gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800/70"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/75">
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-500" />
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
                Source Performance
              </h2>
            </div>

            <div className="space-y-3">
              {Object.entries(sourceCounts).map(([source, count]) => {
                const share =
                  totalLeads === 0 ? 0 : Math.round((count / totalLeads) * 100);

                return (
                  <div
                    key={source}
                    className="rounded-2xl border border-slate-100 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800/70"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                        {source}
                      </p>

                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
                        {share}%
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {count} leads generated from this source
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;