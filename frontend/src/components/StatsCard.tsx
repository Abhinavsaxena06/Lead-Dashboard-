interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
}

const StatsCard = ({ title, value, subtitle }: StatsCardProps) => {
  return (
    <div className="rounded-3xl border border-white bg-white/70 backdrop-blur-xl p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        {title}
      </p>

      <h3 className="text-4xl font-black text-slate-900 mt-3">
        {value}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default StatsCard;