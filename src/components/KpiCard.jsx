export default function KpiCard({ title, value, unit, sub, subText, colorIdx, icon }) {
  const colors = [
    { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-500/20' },
    { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-500/20' },
    { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/20' },
    { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-500/20' },
  ];
  const c = colors[colorIdx % colors.length];
  return (
    <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200 hover:ring-2 hover:ring-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className={`text-3xl font-bold ${c.text}`}>{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${c.bg} ${c.ring} ring-1`}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
      {sub !== undefined && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className={`text-sm font-medium ${sub >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {sub >= 0 ? '↑' : '↓'} {Math.abs(sub)}%
          </span>
          <span className="text-sm text-slate-400 ml-1">{subText}</span>
        </div>
      )}
    </div>
  );
}
