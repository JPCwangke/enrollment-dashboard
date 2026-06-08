// ============================================
// 招生数据看板 — 预设模拟数据
// ============================================

// 最近30天趋势数据
const generateDailyData = () => {
  const data = [];
  const base = {
    leads: 52,
    trials: 13,
    enrollments: 3.2,
    spend: 3333,
    revenue: 25600,
  };
  for (let i = 29; i >= 0; i--) {
    const date = new Date(2026, 4, 9 + i);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    const dayOfWeek = date.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.65 : 1;
    // Week 3 dip and recovery
    const weekFactor = i >= 10 && i <= 16 ? 0.85 : 1;
    const noise = 0.85 + Math.random() * 0.3;
    const factor = weekendFactor * weekFactor * noise;
    data.push({
      date: dateStr,
      leads: Math.round(base.leads * factor),
      trials: Math.round(base.trials * factor),
      enrollments: Math.round(base.enrollments * factor * 10) / 10,
      spend: Math.round(base.spend * factor),
      revenue: Math.round(base.revenue * factor),
    });
  }
  return data;
};

export const dailyData = generateDailyData();

// 全链路漏斗
export const funnelData = [
  { stage: '曝光', count: 780000, rate: '-' },
  { stage: '落地页访问', count: 31200, rate: '4.0%' },
  { stage: '留资', count: 1560, rate: '5.0%' },
  { stage: '有效联系', count: 1092, rate: '70.0%' },
  { stage: '试听', count: 382, rate: '35.0%' },
  { stage: '报名', count: 96, rate: '25.1%' },
];

// 渠道对比
export const channelData = [
  {
    name: '抖音',
    spend: 53000,
    impressions: 400000,
    ctr: '4.0%',
    leads: 800,
    leadCost: 66,
    trials: 240,
    enrollments: 58,
    revenue: 464000,
    roi: 8.75,
    trend: 'up',
  },
  {
    name: '小红书',
    spend: 30000,
    impressions: 180000,
    ctr: '4.5%',
    leads: 405,
    leadCost: 74,
    trials: 121,
    enrollments: 29,
    revenue: 232000,
    roi: 7.73,
    trend: 'up',
  },
  {
    name: '公众号',
    spend: 12000,
    impressions: 80000,
    ctr: '2.5%',
    leads: 160,
    leadCost: 75,
    trials: 40,
    enrollments: 13,
    revenue: 104000,
    roi: 8.67,
    trend: 'stable',
  },
  {
    name: '转介绍',
    spend: 3000,
    impressions: null,
    ctr: '-',
    leads: 195,
    leadCost: 15,
    trials: 97,
    enrollments: 35,
    revenue: 280000,
    roi: 93.33,
    trend: 'up',
  },
];

// 预警列表
export const alerts = [
  {
    id: 1,
    type: 'danger',
    title: '抖音留资成本飙升',
    desc: '近 3 日留资成本 ¥89，较上周上涨 28%',
    time: '2 小时前',
  },
  {
    id: 2,
    type: 'warning',
    title: '试听转化率低于基准',
    desc: '本月试听→报名转化率 22.3%，低于目标线 25%',
    time: '昨天',
  },
  {
    id: 3,
    type: 'warning',
    title: '小红书某计划消耗异常',
    desc: '计划"自动化PLC-0601"消耗 ¥4,200，0 报名',
    time: '昨天',
  },
  {
    id: 4,
    type: 'info',
    title: '转介绍贡献持续走高',
    desc: '本月转介绍报名 35 人，环比增长 22%，建议加大激励',
    time: '3 天前',
  },
];

// 投放计划
export const adsPlans = [
  {
    id: 'P001',
    name: '工业机器人-入门',
    channel: '抖音',
    spend: 8240,
    impressions: 182000,
    ctr: '4.2%',
    cpm: 45.3,
    leads: 52,
    leadCost: 158,
    enrollments: 6,
    roi: 5.82,
    status: '加量',
  },
  {
    id: 'P002',
    name: '数控培训-热招',
    channel: '抖音',
    spend: 6100,
    impressions: 145000,
    ctr: '3.8%',
    cpm: 42.1,
    leads: 38,
    leadCost: 161,
    enrollments: 4,
    roi: 5.25,
    status: '加量',
  },
  {
    id: 'P003',
    name: '自动化PLC-0601',
    channel: '抖音',
    spend: 4200,
    impressions: 98000,
    ctr: '2.9%',
    cpm: 42.9,
    leads: 12,
    leadCost: 350,
    enrollments: 0,
    roi: 0,
    status: '关停',
  },
  {
    id: 'P004',
    name: '电气工程-进阶',
    channel: '抖音',
    spend: 3200,
    impressions: 72000,
    ctr: '3.5%',
    cpm: 44.4,
    leads: 18,
    leadCost: 178,
    enrollments: 2,
    roi: 5.0,
    status: '观察',
  },
  {
    id: 'P005',
    name: 'PLC编程-零基础',
    channel: '小红书',
    spend: 5600,
    impressions: 95000,
    ctr: '4.8%',
    cpm: 58.9,
    leads: 35,
    leadCost: 160,
    enrollments: 4,
    roi: 5.71,
    status: '加量',
  },
  {
    id: 'P006',
    name: '智能制造-转型',
    channel: '小红书',
    spend: 4300,
    impressions: 78000,
    ctr: '4.1%',
    cpm: 55.1,
    leads: 22,
    leadCost: 195,
    enrollments: 2,
    roi: 3.72,
    status: '观察',
  },
  {
    id: 'P007',
    name: '自动化-就业班',
    channel: '小红书',
    spend: 2800,
    impressions: 52000,
    ctr: '3.2%',
    cpm: 53.8,
    leads: 8,
    leadCost: 350,
    enrollments: 0,
    roi: 0,
    status: '关停',
  },
  {
    id: 'P008',
    name: '工业机器人-高阶',
    channel: '公众号',
    spend: 1800,
    impressions: 35000,
    ctr: '2.8%',
    cpm: 51.4,
    leads: 15,
    leadCost: 120,
    enrollments: 2,
    roi: 8.89,
    status: '加量',
  },
];

// 素材分析
export const materials = [
  { name: '机器人实操演示-短视频', channel: '抖音', type: '视频', ctr: '5.2%', cvr: '3.8%', daysOn: 5, status: '高峰期' },
  { name: '学员就业案例-图集', channel: '抖音', type: '图集', ctr: '4.5%', cvr: '3.2%', daysOn: 8, status: '成长期' },
  { name: '工厂实拍-自动化线', channel: '抖音', type: '视频', ctr: '3.1%', cvr: '2.1%', daysOn: 15, status: '衰退期' },
  { name: 'PLC入门-3分钟教程', channel: '小红书', type: '视频', ctr: '5.8%', cvr: '4.1%', daysOn: 3, status: '高峰期' },
  { name: '薪资对比-卡片', channel: '小红书', type: '图文', ctr: '4.9%', cvr: '3.5%', daysOn: 6, status: '成长期' },
  { name: '行业前景-长图', channel: '小红书', type: '图文', ctr: '2.8%', cvr: '1.8%', daysOn: 12, status: '衰退期' },
  { name: '免费试听-引导文', channel: '公众号', type: '图文', ctr: '3.0%', cvr: '2.2%', daysOn: 7, status: '成长期' },
];

// 时段热力图 (24小时 x 7天 留资数)
export const hourlyHeatmap = (() => {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const data = [];
  for (const day of days) {
    for (const hour of hours) {
      const base =
        hour >= 9 && hour <= 11 ? 4 :
        hour >= 14 && hour <= 17 ? 5 :
        hour >= 20 && hour <= 22 ? 6 :
        hour >= 0 && hour <= 6 ? 0 : 1;
      const dayFactor = day === '周六' || day === '周日' ? 0.6 : 1;
      const noise = 0.7 + Math.random() * 0.6;
      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.round(base * dayFactor * noise),
      });
    }
  }
  return data;
})();

// 今日实时数据
export const realtimeData = {
  spend: 8234,
  leads: 47,
  enrollments: 3,
  budgetRemaining: 1766,
  hourlyLeads: [
    { hour: '08', leads: 0 }, { hour: '09', leads: 3 },
    { hour: '10', leads: 7 }, { hour: '11', leads: 5 },
    { hour: '12', leads: 2 }, { hour: '13', leads: 4 },
    { hour: '14', leads: 8 }, { hour: '15', leads: 6 },
    { hour: '16', leads: 5 }, { hour: '17', leads: 3 },
    { hour: '18', leads: 1 }, { hour: '19', leads: 2 },
    { hour: '20', leads: 1 }, { hour: '21', leads: 0 },
    { hour: '22', leads: 0 },
  ],
};

// 核心KPI汇总
export const kpiSummary = {
  monthLeads: 1560,
  monthTrials: 382,
  monthEnrollments: 96,
  monthRevenue: 768000,
  monthSpend: 98000,
  monthROI: 7.84,
  leadsMoM: 12,
  trialsMoM: 8,
  enrollmentsMoM: 15,
  roiMoM: 5,
};
