"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Star, 
  Zap, 
  Target,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

const editorPerformance = [
  { name: 'Rohit Singh', efficiency: 98, payout: 4500, videos: 15, roi: 5.2 },
  { name: 'Aarav Sharma', efficiency: 95, payout: 1250, videos: 12, roi: 4.8 },
  { name: 'Priya Verma', efficiency: 88, payout: 980, videos: 9, roi: 4.1 },
  { name: 'Neha Kapoor', efficiency: 82, payout: 120, videos: 5, roi: 3.5 },
  { name: 'Simran Kaur', efficiency: 75, payout: 88, videos: 3, roi: 2.8 },
];

const COLORS = ['#0F172A', '#34D399', '#3B82F6', '#8B5CF6', '#F59E0B'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A]">Analytics</h2>
          <p className="text-muted-foreground font-medium">Deep dive into performance, ROI, and growth trends.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            Last 30 Days <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightCard 
          icon={<Star className="text-yellow-500" />} 
          title="Top Performer" 
          value="Rohit Singh" 
          desc="Highest ROI this month" 
          delay={0}
        />
        <InsightCard 
          icon={<Zap className="text-blue-500" />} 
          title="Avg. Payout" 
          value="$1,240" 
          desc="Per 100k views" 
          delay={0.1}
        />
        <InsightCard 
          icon={<Target className="text-green-500" />} 
          title="Efficiency Rate" 
          value="94.2%" 
          desc="+4% from last week" 
          delay={0.2}
        />
        <InsightCard 
          icon={<Layers className="text-purple-500" />} 
          title="Total ROI" 
          value="4.82x" 
          desc="Revenue vs Payout" 
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Payout Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#0F172A] p-10 rounded-[40px] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm glass-card relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-10">Payout Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={editorPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="payout"
                    animationBegin={500}
                  >
                    {editorPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              {editorPerformance.map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-[#0F172A]">{entry.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto font-black">${entry.payout.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />
        </motion.div>

        {/* Efficiency Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-[#0F172A] p-10 rounded-[40px] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm"
        >
          <h3 className="text-xl font-black mb-10">Performance ROI</h3>
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={editorPerformance} layout="vertical" barGap={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" fontSize={11} tickLine={false} axisLine={false} width={100} tick={{ fontWeight: 'bold' }} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="roi" fill="#0F172A" radius={[0, 10, 10, 0]} barSize={24} animationBegin={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Growth Trend */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-[#0F172A] p-10 rounded-[40px] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm overflow-hidden relative"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-2xl font-black">Velocity Benchmarks</h3>
            <p className="text-sm text-muted-foreground font-medium">Payout vs View Growth trajectory over 6 months.</p>
          </div>
          <div className="flex items-center gap-2 text-green-600 font-black text-lg bg-green-50 px-6 py-2 rounded-2xl">
            <TrendingUp size={24} /> +24% YoY
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { month: 'Jan', views: 2.1, pay: 8.5 },
              { month: 'Feb', views: 2.3, pay: 9.2 },
              { month: 'Mar', views: 2.8, pay: 11.4 },
              { month: 'Apr', views: 3.2, pay: 13.1 },
              { month: 'May', views: 3.9, pay: 15.8 },
              { month: 'Jun', views: 4.5, pay: 18.2 },
            ]}>
              <defs>
                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} stroke="#64748B" tick={{ fontWeight: 'bold' }} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#64748B" />
              <Tooltip />
              <Area type="monotone" dataKey="pay" stroke="#0F172A" strokeWidth={5} fillOpacity={1} fill="url(#colorTrend)" dot={{ r: 6, fill: '#0F172A', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function InsightCard({ icon, title, value, desc, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A] p-8 rounded-[32px] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm flex flex-col gap-6 group hover:shadow-2xl transition-all"
    >
      <div className="p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{title}</span>
        <span className="text-2xl font-black text-[#0F172A]">{value}</span>
        <span className="text-xs text-muted-foreground mt-2 font-bold flex items-center gap-1">
           {desc}
        </span>
      </div>
    </motion.div>
  );
}
