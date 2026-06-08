export const formatCurrency = (val) => {
  if (val >= 10000) return `¥${(val / 10000).toFixed(1)}w`;
  return `¥${val.toLocaleString()}`;
};

export const formatNumber = (val) => {
  if (val >= 10000) return `${(val / 10000).toFixed(1)}w`;
  return val.toLocaleString();
};

export const formatPercent = (val) => {
  const num = typeof val === 'string' ? parseFloat(val) : val;
  return `${num.toFixed(1)}%`;
};

export const trendIcon = (trend) => {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
};

export const trendColor = (trend) => {
  if (trend === 'up') return 'text-emerald-600';
  if (trend === 'down') return 'text-red-500';
  return 'text-slate-400';
};

export const statusColor = (status) => {
  if (status === '加量') return 'bg-emerald-100 text-emerald-700';
  if (status === '关停') return 'bg-red-100 text-red-700';
  return 'bg-amber-100 text-amber-700';
};

export const alertColor = (type) => {
  if (type === 'danger') return { bg: 'bg-red-50 border-l-4 border-red-500', dot: 'bg-red-500' };
  if (type === 'warning') return { bg: 'bg-amber-50 border-l-4 border-amber-500', dot: 'bg-amber-500' };
  return { bg: 'bg-blue-50 border-l-4 border-blue-500', dot: 'bg-blue-500' };
};

export const kpiColors = [
  { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'bg-blue-500' },
  { bg: 'bg-violet-50', text: 'text-violet-600', icon: 'bg-violet-500' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'bg-emerald-500' },
  { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'bg-amber-500' },
];
