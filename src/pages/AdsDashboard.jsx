import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { adsPlans, materials, hourlyHeatmap, realtimeData } from '../data/mockData';
import { formatCurrency, statusColor } from '../utils/format';

export default function AdsDashboard() {
  const [channelFilter, setChannelFilter] = useState('all');
  const filteredPlans = channelFilter === 'all'
    ? adsPlans
    : adsPlans.filter((p) => p.channel === channelFilter);

  // Build heatmap grid data
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const heatmapData = {};
  hourlyHeatmap.forEach((d) => {
    if (!heatmapData[d.day]) heatmapData[d.day] = {};
    heatmapData[d.day][d.hour] = d.value;
  });
  const maxHeat = Math.max(...hourlyHeatmap.map((d) => d.value));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">投放优化看板</h2>
        <p className="text-sm text-slate-400 mt-1">实时投放数据 · 辅助投手优化决策</p>
      </div>

      {/* Real-time bar */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <p className="text-sm text-blue-100">今日消耗</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(realtimeData.spend)}</p>
          <p className="text-xs text-blue-200 mt-1">预算剩余 {formatCurrency(realtimeData.budgetRemaining)}</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-5 text-white">
          <p className="text-sm text-violet-100">今日留资</p>
          <p className="text-2xl font-bold mt-1">{realtimeData.leads}<span className="text-lg font-normal text-violet-200"> 人</span></p>
          <p className="text-xs text-violet-200 mt-1">时均 {Math.round(realtimeData.leads / (new Date().getHours() || 14))} 人</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <p className="text-sm text-emerald-100">今日报名</p>
          <p className="text-2xl font-bold mt-1">{realtimeData.enrollments}<span className="text-lg font-normal text-emerald-200"> 人</span></p>
          <p className="text-xs text-emerald-200 mt-1">预估今日 5-6 人</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <p className="text-sm text-amber-100">今日 ROI</p>
          <p className="text-2xl font-bold mt-1">{(realtimeData.enrollments * 8000 / Math.max(realtimeData.spend, 1)).toFixed(1)}</p>
          <p className="text-xs text-amber-200 mt-1">实时估算</p>
        </div>
      </div>

      {/* Hourly leads bar */}
      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">今日实时 — 时段留资分布</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={realtimeData.hourlyLeads}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
                formatter={(v) => [`${v} 条`, '留资']}
              />
              <Bar dataKey="leads" name="留资" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ads Plan Table */}
      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">投放计划效果</h3>
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
            {['all', '抖音', '小红书', '公众号'].map((v) => (
              <button
                key={v}
                onClick={() => setChannelFilter(v)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors
                  ${channelFilter === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {v === 'all' ? '全部' : v}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">计划名称</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium">渠道</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">消耗</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">曝光</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">CTR</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">CPM</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">留资</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">留资成本</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">报名</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">ROI</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium">操作建议</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-2 font-medium text-slate-800">{plan.name}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${plan.channel === '抖音' ? 'bg-pink-50 text-pink-600' :
                        plan.channel === '小红书' ? 'bg-red-50 text-red-500' :
                        'bg-green-50 text-green-600'}`}>
                      {plan.channel}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{formatCurrency(plan.spend)}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{(plan.impressions / 10000).toFixed(1)}w</td>
                  <td className="py-3 px-2 text-right text-slate-600">{plan.ctr}</td>
                  <td className="py-3 px-2 text-right text-slate-600">¥{plan.cpm}</td>
                  <td className="py-3 px-2 text-right font-medium text-slate-800">{plan.leads}</td>
                  <td className="py-3 px-2 text-right text-slate-600">¥{plan.leadCost}</td>
                  <td className="py-3 px-2 text-right font-medium text-slate-800">{plan.enrollments}</td>
                  <td className="py-3 px-2 text-right">
                    {plan.roi > 0
                      ? <span className="font-semibold text-emerald-600">{plan.roi.toFixed(1)}</span>
                      : <span className="text-slate-300">-</span>
                    }
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hourly Heatmap */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white rounded-xl p-5 ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">时段热度分析（周 x 时）</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>低</span>
              <div className="flex gap-0.5">
                {['bg-blue-50', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600', 'bg-blue-800'].map((c) => (
                  <span key={c} className={`w-3 h-3 rounded ${c}`} />
                ))}
              </div>
              <span>高</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="w-12" />
                  {hours.filter((_, i) => i % 3 === 0 || i === 23).map((h) => (
                    <th key={h} className="text-slate-400 font-normal pb-1 text-center w-[4.166%]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="text-slate-500 text-xs font-medium pr-2 whitespace-nowrap">{day}</td>
                    {hours.map((hour) => {
                      const val = heatmapData[day]?.[hour] || 0;
                      const intensity = maxHeat > 0 ? val / maxHeat : 0;
                      let bg;
                      if (intensity === 0) bg = 'bg-slate-50';
                      else if (intensity <= 0.25) bg = 'bg-blue-100';
                      else if (intensity <= 0.5) bg = 'bg-blue-300';
                      else if (intensity <= 0.75) bg = 'bg-blue-500';
                      else bg = 'bg-blue-700';
                      return (
                        <td key={`${day}-${hour}`} className="p-0.5">
                          <div className={`h-5 rounded ${bg} heatmap-cell flex items-center justify-center`}>
                            {val > 0 && <span className="text-[10px] text-white font-medium">{val}</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            峰值时段集中在 10-11点、14-16点、20-22点，建议在这些时段加大投放预算
          </p>
        </div>

        {/* Material Analysis */}
        <div className="col-span-2 bg-white rounded-xl p-5 ring-1 ring-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">素材效果排行</h3>
          <div className="space-y-3">
            {materials.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-xs font-bold text-slate-300 w-4">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">{m.name}</p>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{m.channel}</span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-400">CTR {m.ctr}</span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-emerald-600 font-medium">CVR {m.cvr}</span>
                  </div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium
                  ${m.status === '高峰期' ? 'bg-emerald-100 text-emerald-700' :
                    m.status === '成长期' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-500'}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            高峰期素材建议加量投放，衰退期素材准备替换
          </p>
        </div>
      </div>
    </div>
  );
}
