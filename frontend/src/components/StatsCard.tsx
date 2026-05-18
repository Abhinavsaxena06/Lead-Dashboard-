interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
}

const StatsCard = ({ title, value, subtitle }: StatsCardProps) => {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-semibold text-slate-700 dark:text-slate-100">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
};

export default StatsCard;