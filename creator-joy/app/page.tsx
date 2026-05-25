"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { 
  Play, 
  Users, 
  CreditCard, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  MoreVertical
} from "lucide-react";
import { MOCK_VIDEOS, MOCK_STATS } from "@/lib/mock-data";

const chartData = [
  { name: 'Mon', views: 4000, pay: 240 },
  { name: 'Tue', views: 3000, pay: 139 },
  { name: 'Wed', views: 2000, pay: 980 },
  { name: 'Thu', views: 2780, pay: 390 },
  { name: 'Fri', views: 1890, pay: 480 },
  { name: 'Sat', views: 2390, pay: 380 },
  { name: 'Sun', views: 3490, pay: 430 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          label="Total Videos" 
          value={MOCK_STATS.totalVideos.toString()} 
          icon={<Play size={20} />} 
          trend="+2 this week"
          trendUp={true}
        />
        <StatCard 
          label="Active Videos" 
          value={MOCK_STATS.activeVideos.toString()} 
          icon={<Play size={20} className="text-blue-500" />} 
          trend="82% of total"
          trendUp={true}
        />
        <StatCard 
          label="Total Views" 
          value={(MOCK_STATS.totalViews / 1000000).toFixed(2) + "M"} 
          icon={<Eye size={20} className="text-purple-500" />} 
          trend="+12% growth"
          trendUp={true}
        />
        <StatCard 
          label="Editor Payments" 
          value={"$" + MOCK_STATS.totalPayout.toLocaleString()} 
          icon={<CreditCard size={20} className="text-green-500" />} 
          trend="Pending sync"
          trendUp={false}
        />
        <StatCard 
          label="Frozen Videos" 
          value={MOCK_STATS.frozenVideos.toString()} 
          icon={<Play size={20} className="text-gray-400" />} 
          trend="10-day window"
          trendUp={false}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Revenue & Payout Analytics</h3>
            <div className="flex gap-2">
              <button className="text-xs font-medium px-3 py-1 bg-[#F3F4F6] rounded-md">1W</button>
              <button className="text-xs font-medium px-3 py-1 hover:bg-[#F3F4F6] rounded-md transition-colors">1M</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#94A3B8" tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="pay" stroke="#0F172A" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B]">
          <h3 className="font-semibold text-lg mb-6">Editor Workload</h3>
          <div className="space-y-6">
            <EditorItem name="Aarav Sharma" count={4} amount={1250} />
            <EditorItem name="Priya Verma" count={3} amount={980} />
            <EditorItem name="Rohit Singh" count={2} amount={4500} />
            <EditorItem name="Neha Kapoor" count={1} amount={120} />
          </div>
          <button className="w-full mt-6 text-sm font-medium py-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
            View All Editors
          </button>
        </div>
      </div>

      {/* Video Management Table */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-lg">Recent Videos</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-[#F3F4F6] px-2 py-0.5 rounded-full">
              {MOCK_VIDEOS.length} total
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-sm font-medium px-3 py-2 border rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 text-sm font-medium px-3 py-2 border rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F9FAFB] dark:bg-[#1E293B]/50 text-muted-foreground font-medium border-b">
              <tr>
                <th className="px-6 py-4">Video</th>
                <th className="px-6 py-4">Editor</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Pay</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_VIDEOS.map((video) => (
                <tr key={video.id} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={video.thumbnail} className="w-16 h-10 object-cover rounded-md border" />
                      <div className="flex flex-col max-w-[200px]">
                        <span className="font-medium truncate">{video.id}</span>
                        <span className="text-xs text-muted-foreground truncate">{video.url}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{video.editor}</td>
                  <td className="px-6 py-4 text-muted-foreground">{video.uploadDate}</td>
                  <td className="px-6 py-4 font-semibold">{video.views.toLocaleString()}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">${video.pay.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      video.status === 'Active' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {video.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend, trendUp }: any) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#F3F4F6] dark:bg-[#1E293B] rounded-lg">
          {icon}
        </div>
        {trendUp ? (
          <div className="flex items-center text-xs font-medium text-green-600">
            <ArrowUpRight size={14} /> {trend}
          </div>
        ) : (
          <div className="flex items-center text-xs font-medium text-muted-foreground">
             {trend}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-2xl font-bold text-[#0F172A] dark:text-white mt-1">{value}</span>
      </div>
    </div>
  );
}

function EditorItem({ name, count, amount }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center font-bold text-xs">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs text-muted-foreground">{count} active videos</span>
        </div>
      </div>
      <span className="text-sm font-bold text-[#0F172A] dark:text-white">${amount.toLocaleString()}</span>
    </div>
  );
}
