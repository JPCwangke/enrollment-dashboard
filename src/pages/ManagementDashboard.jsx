import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import KpiCard from '../components/KpiCard';
import FunnelView from '../components/FunnelView';
import {
  dailyData, funnelData, channelData, alerts, kpiSummary,
} from '../data/mockData';
import {
  formatCurrency, formatNumber, trendIcon, trendColor, alertColor,
} from '../utils/format';

export default function ManagementDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 30;
  const trendSlice = dailyData.slice(-days);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">管理决策看板</h2>
          <p className="text-sm text-slate-400 mt-1">招生数据概览 · 辅助管理层决策</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {['7d', '30d'].map((v) => (
            <button
              key={v}
              onClick={() => setTimeRange(v)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors
                ${timeRange === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {v === '7d' ? '近 7 天' : '近 30 天'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          title="本月新增留资"
          value={kpiSummary.monthLeads}
          unit="人"
          sub={kpiSummary.leadsMoM}
          subText="环比上月"
          colorIdx={0}
          icon="📋"
        />
        <KpiCard
          title="本月试听人数"
          value={kpiSummary.monthTrials}
          unit="人"
          sub={kpiSummary.trialsMoM}
          subText="环比上月"
          colorIdx={1}
          icon="🎧"
        />
        <KpiCard
          title="本月报名人数"
          value={kpiSummary.monthEnrollments}
          unit="人"
          sub={kpiSummary.enrollmentsMoM}
          subText="环比上月"
          colorIdx={2}
          icon="✅"
        />
        <KpiCard
          title="综合 ROI"
          value={kpiSummary.monthROI}
          sub={kpiSummary.roiMoM}
          subText="环比上月"
          colorIdx={3}
          icon="📈"
        />
      </div>

      {/* Funnel + Alerts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl p-5 ring-1 ring-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">全链路漏斗</h3>
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />当前转化率</span>
            <span>本月累计数据</span>
          </div>
          <FunnelView data={funnelData} />
        </div>
        <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">预警与洞察</h3>
          <div className="space-y-3">
            {alerts.map((a) => {
              const ac = alertColor(a.type);
              return (
                <div key={a.id} className={`${ac.bg} rounded-lg p-3`}>
                  <div className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ac.dot}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800">{a.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                      <p className="text-xs text-slate-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Channel Comparison */}
      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">渠道效果对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-slate-500 font-medium">渠道</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">消耗</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">曝光</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">CTR</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">留资</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">留资成本</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">试听</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">报名</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">营收</th>
                <th className="text-right py-3 px-2 text-slate-500 font-medium">ROI</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium">趋势</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((row) => (
                <tr key={row.name} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-2 font-medium text-slate-800">{row.name}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{formatCurrency(row.spend)}</td>
                  <td className="py-3 px-2 text-right text-slate-600">
                    {row.impressions ? formatNumber(row.impressions) : '-'}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600">{row.ctr}</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-medium">{row.leads}</td>
                  <td className="py-3 px-2 text-right text-slate-600">¥{row.leadCost}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{row.trials}</td>
                  <td className="py-3 px-2 text-right text-slate-800 font-medium">{row.enrollments}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{formatCurrency(row.revenue)}</td>
                  <td className="py-3 px-2 text-right">
                    <span className="font-semibold text-emerald-600">{row.roi.toFixed(1)}</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={trendColor(row.trend)}>{trendIcon(row.trend)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">每日趋势</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendSlice}>
              <defs>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="trialsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Area type="monotone" dataKey="leads" name="留资" stroke="#3B82F6" fill="url(#leadsGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="trials" name="试听" stroke="#8B5CF6" fill="url(#trialsGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="enrollments" name="报名" stroke="#10B981" fill="none" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-400">
          <span>第 1-2 周：稳定投放</span>
          <span>第 3 周：周末效应导致波动</span>
          <span>第 4 周：策略优化后回升</span>
        </div>
      </div>

      {/* Bottom: Channel bar chart */}
      <div className="bg-white rounded-xl p-5 ring-1 ring-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">各渠道消耗 vs 营收</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
                formatter={(v) => `¥${v.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="spend" name="消耗" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="revenue" name="营收" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
