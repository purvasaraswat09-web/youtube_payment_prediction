"use client";

import { useState } from "react";
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
  MoreVertical,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_VIDEOS, MOCK_STATS } from "@/lib/mock-data";
import AddVideoModal from "@/components/AddVideoModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState(MOCK_VIDEOS);

  const handleAddVideo = (newVideo: any) => {
    setVideos([newVideo, ...videos]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A]">Dashboard</h2>
          <p className="text-muted-foreground font-medium">Tracking performance for CreatorJoy Main.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
        >
          <Plus size={20} /> Add New Video
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          label="Total Videos" 
          value={videos.length.toString()} 
          icon={<Play size={20} />} 
          trend="+2 this week"
          trendUp={true}
          delay={0}
        />
        <StatCard 
          label="Active Videos" 
          value={videos.filter(v => v.status === 'Active').length.toString()} 
          icon={<Play size={20} className="text-blue-500" />} 
          trend="Tracking now"
          trendUp={true}
          delay={0.1}
        />
        <StatCard 
          label="Total Views" 
          value={(videos.reduce((acc, v) => acc + v.views, 0) / 1000000).toFixed(2) + "M"} 
          icon={<Eye size={20} className="text-purple-500" />} 
          trend="+12% growth"
          trendUp={true}
          delay={0.2}
        />
        <StatCard 
          label="Editor Payments" 
          value={"$" + videos.reduce((acc, v) => acc + v.pay, 0).toLocaleString()} 
          icon={<CreditCard size={20} className="text-green-500" />} 
          trend="ROI: 4.2x"
          trendUp={true}
          delay={0.3}
        />
        <StatCard 
          label="Frozen Videos" 
          value={videos.filter(v => v.status === 'Frozen').length.toString()} 
          icon={<Play size={20} className="text-gray-400" />} 
          trend="Finalized"
          trendUp={false}
          delay={0.4}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white dark:bg-[#0F172A] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm glass-card"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl">Revenue & Payouts</h3>
              <p className="text-sm text-muted-foreground">Historical comparison for the last 7 days.</p>
            </div>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              <button className="text-xs font-bold px-4 py-2 bg-white rounded-lg shadow-sm">1W</button>
              <button className="text-xs font-bold px-4 py-2 hover:bg-white rounded-lg transition-all">1M</button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#94A3B8" tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="pay" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm"
        >
          <h3 className="font-bold text-xl mb-8">Top Editors</h3>
          <div className="space-y-8">
            <EditorItem name="Aarav Sharma" count={4} amount={1250} />
            <EditorItem name="Priya Verma" count={3} amount={980} />
            <EditorItem name="Rohit Singh" count={2} amount={4500} />
            <EditorItem name="Neha Kapoor" count={1} amount={120} />
          </div>
          <button className="w-full mt-10 text-sm font-bold py-3 rounded-2xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
            Performance Analytics
          </button>
        </motion.div>
      </div>

      {/* Video Management Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-[#0F172A] rounded-3xl border border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden shadow-sm"
      >
        <div className="p-8 border-b border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-xl">Recent Submissions</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {videos.length} videos
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-sm font-bold px-4 py-2 border rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <Filter size={18} /> Filters
            </button>
            <button className="flex items-center gap-2 text-sm font-bold px-4 py-2 border rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F9FAFB] dark:bg-[#1E293B]/50 text-muted-foreground font-bold uppercase tracking-widest text-[10px] border-b">
              <tr>
                <th className="px-8 py-5">Video</th>
                <th className="px-8 py-5">Editor</th>
                <th className="px-8 py-5">Upload Date</th>
                <th className="px-8 py-5 text-right">Views</th>
                <th className="px-8 py-5 text-right">Total Pay</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {videos.map((video, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  key={video.id} 
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={video.thumbnail} className="w-20 h-12 object-cover rounded-xl border shadow-sm group-hover:scale-105 transition-transform" />
                        {video.status === 'Active' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse" />}
                      </div>
                      <div className="flex flex-col max-w-[240px]">
                        <span className="font-bold text-[#0F172A] truncate leading-tight">{video.title || video.id}</span>
                        <span className="text-xs text-muted-foreground font-medium mt-1 truncate">{video.url || video.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-[#0F172A]">{video.editor}</td>
                  <td className="px-8 py-6 text-muted-foreground font-medium">{video.uploadDate}</td>
                  <td className="px-8 py-6 font-black text-right">{video.views.toLocaleString()}</td>
                  <td className="px-8 py-6 font-black text-right text-green-600">${video.pay.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      video.status === 'Active' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {video.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <MoreVertical size={16} className="text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AddVideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddVideo} 
      />
    </div>
  );
}

function StatCard({ label, value, icon, trend, trendUp, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A] p-8 rounded-[32px] border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-[#F3F4F6] dark:bg-[#1E293B] rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trendUp ? (
          <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <ArrowUpRight size={12} /> {trend}
          </div>
        ) : (
          <div className="flex items-center text-[10px] font-black text-muted-foreground bg-gray-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
             {trend}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{label}</span>
        <span className="text-3xl font-black text-[#0F172A] dark:text-white">{value}</span>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50/50 rounded-full group-hover:scale-150 transition-transform" />
    </motion.div>
  );
}

function EditorItem({ name, count, amount }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center font-black text-sm shadow-md">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#0F172A]">{name}</span>
          <span className="text-xs text-muted-foreground font-medium">{count} active videos</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-black text-[#0F172A] text-lg">${amount.toLocaleString()}</span>
        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Top Editor</span>
      </div>
    </div>
  );
}
