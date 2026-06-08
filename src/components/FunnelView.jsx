import { formatNumber } from '../utils/format';

export default function FunnelView({ data }) {
  const maxCount = data[0].count;
  return (
    <div className="space-y-2">
      {data.map((item, idx) => {
        const widthPct = Math.max(12, (item.count / maxCount) * 100);
        const isLast = idx === data.length - 1;
        return (
          <div key={item.stage} className="flex items-center gap-4">
            {/* Stage label */}
            <div className="w-24 text-right shrink-0">
              <span className="text-sm font-medium text-slate-700">{item.stage}</span>
            </div>
            {/* Bar */}
            <div className="flex-1 relative">
              <div
                className={`h-10 rounded-r-md flex items-center px-3 transition-all
                  ${idx === 0 ? 'bg-blue-100' :
                    idx === 1 ? 'bg-blue-200' :
                    idx === 2 ? 'bg-blue-300' :
                    idx === 3 ? 'bg-blue-400' :
                    idx === 4 ? 'bg-blue-500' :
                    'bg-blue-600'}`}
                style={{ width: `${widthPct}%` }}
              >
                <span className={`text-sm font-semibold ${idx >= 3 ? 'text-white' : 'text-slate-800'}`}>
                  {formatNumber(item.count)}
                </span>
              </div>
            </div>
            {/* Rate */}
            {!isLast && (
              <div className="w-16 shrink-0 flex items-center gap-1">
                <span className="text-xs text-slate-400">转化</span>
                <span className="text-sm font-semibold text-emerald-600">{data[idx + 1]?.rate || '-'}</span>
              </div>
            )}
            {isLast && <div className="w-16 shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}
