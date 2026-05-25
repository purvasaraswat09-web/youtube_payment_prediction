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
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Star, 
  Zap, 
  Target,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

const editorPerformance = [
  { name: 'Aarav', efficiency: 95, payout: 1250, videos: 12 },
  { name: 'Priya', efficiency: 88, payout: 980, videos: 9 },
  { name: 'Rohit', efficiency: 98, payout: 4500, videos: 15 },
  { name: 'Neha', efficiency: 82, payout: 120, videos: 5 },
  { name: 'Simran', efficiency: 75, payout: 88, videos: 3 },
];

const COLORS = ['#0F172A', '#3B82F6', '#8B5CF6', '#EC4899', '#10B981'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Insights</h2>
          <p className="text-muted-foreground">Deep dive into performance, ROI, and growth trends.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-white transition-all shadow-sm">
            Last 30 Days <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard 
          icon={<Star className="text-yellow-500" />} 
          title="Top Performer" 
          value="Rohit Singh" 
          desc="Highest ROI this month" 
        />
        <InsightCard 
          icon={<Zap className="text-blue-500" />} 
          title="Avg. Payout" 
          value="$1,240" 
          desc="Per 100k views" 
        />
        <InsightCard 
          icon={<Target className="text-green-500" />} 
          title="Efficiency Rate" 
          value="92.4%" 
          desc="+4% from last month" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Payout Distribution */}
        <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold mb-8">Payout Distribution by Editor</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={editorPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="payout"
                >
                  {editorPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {editorPerformance.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs font-semibold">{entry.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">${entry.payout}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold mb-8">Editor Performance Efficiency</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={editorPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="efficiency" fill="#0F172A" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Growth Trend */}
      <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold">Payout vs View Growth</h3>
            <p className="text-sm text-muted-foreground">Historical comparison over the last 6 months.</p>
          </div>
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <TrendingUp size={18} /> +24% YoY
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'Jan', views: 2.1, pay: 8.5 },
              { month: 'Feb', views: 2.3, pay: 9.2 },
              { month: 'Mar', views: 2.8, pay: 11.4 },
              { month: 'Apr', views: 3.2, pay: 13.1 },
              { month: 'May', views: 3.9, pay: 15.8 },
              { month: 'Jun', views: 4.5, pay: 18.2 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="pay" stroke="#0F172A" strokeWidth={3} dot={{ r: 4, fill: '#0F172A' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ icon, title, value, desc }: any) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl border shadow-sm flex items-start gap-4">
      <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</span>
        <span className="text-2xl font-black mt-1">{value}</span>
        <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
           {desc}
        </span>
      </div>
    </div>
  );
}
