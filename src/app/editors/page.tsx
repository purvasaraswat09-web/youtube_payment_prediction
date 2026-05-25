"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  TrendingUp, 
  Award, 
  Calendar, 
  DollarSign, 
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

const editors = [
  { 
    name: 'Rohit Singh', 
    role: 'Lead Editor', 
    videos: 15, 
    totalViews: '5.2M', 
    earnings: '$4,500', 
    efficiency: 98,
    growth: '+12%',
    avatar: 'RS'
  },
  { 
    name: 'Aarav Sharma', 
    role: 'Senior Editor', 
    videos: 12, 
    totalViews: '2.8M', 
    earnings: '$1,250', 
    efficiency: 95,
    growth: '+8%',
    avatar: 'AS'
  },
  { 
    name: 'Priya Verma', 
    role: 'Video Editor', 
    videos: 9, 
    totalViews: '1.4M', 
    earnings: '$980', 
    efficiency: 88,
    growth: '+5%',
    avatar: 'PV'
  },
  { 
    name: 'Neha Kapoor', 
    role: 'Junior Editor', 
    videos: 5, 
    totalViews: '420K', 
    earnings: '$120', 
    efficiency: 82,
    growth: '-2%',
    avatar: 'NK'
  },
];

export default function EditorsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A]">Editor Team</h2>
          <p className="text-muted-foreground font-medium">Manage performance and reward your top creative talent.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#0F172A] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg">
             Manage Roster
          </button>
        </div>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {editors.map((editor, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={editor.name}
            className="bg-white p-10 rounded-[48px] border border-[#E5E7EB] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0F172A] to-[#3B82F6] rounded-[28px] flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-black/10 group-hover:scale-110 transition-transform">
                {editor.avatar}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreHorizontal size={20} className="text-muted-foreground" />
              </button>
            </div>

            <div className="mt-8 relative z-10">
              <h3 className="text-2xl font-black text-[#0F172A]">{editor.name}</h3>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">{editor.role}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
              <div className="p-4 bg-gray-50 rounded-3xl">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Payout</p>
                <p className="text-xl font-black text-[#0F172A]">{editor.earnings}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-3xl">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Views</p>
                <p className="text-xl font-black text-[#0F172A]">{editor.totalViews}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${editor.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {editor.growth} Growth
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs font-black text-[#0F172A] hover:translate-x-1 transition-transform">
                 Deep Insights <ChevronRight size={14} />
              </button>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}

        {/* Add New Editor Card */}
        <button className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[48px] p-10 flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-black/10 hover:shadow-xl transition-all group">
          <div className="p-6 bg-white rounded-[28px] shadow-sm text-muted-foreground group-hover:text-[#0F172A] transition-colors">
            <Plus size={32} />
          </div>
          <span className="font-black text-lg text-muted-foreground group-hover:text-[#0F172A]">Onboard New Editor</span>
        </button>
      </div>

      {/* Team Leaderboard Section */}
      <section className="bg-white p-12 rounded-[48px] border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-yellow-50 rounded-2xl">
            <Award className="text-yellow-600" size={24} />
          </div>
          <h3 className="font-black text-2xl">Team Leaderboard</h3>
        </div>
        
        <div className="space-y-6">
          {editors.map((editor, idx) => (
            <div key={idx} className="flex items-center gap-8 p-6 hover:bg-gray-50/50 rounded-[32px] transition-all group">
              <span className="text-4xl font-black text-gray-200 group-hover:text-[#0F172A] transition-colors w-10">#{idx + 1}</span>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black">{editor.avatar}</div>
                <div className="flex flex-col">
                  <span className="font-black text-lg">{editor.name}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">{editor.videos} Videos Delivered</span>
                </div>
              </div>
              <div className="flex flex-col items-end w-40">
                 <span className="text-xl font-black text-[#0F172A]">{editor.earnings}</span>
                 <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Commission</span>
              </div>
              <div className="w-32 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${editor.efficiency}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="bg-[#0F172A] h-full"
                />
              </div>
              <span className="font-black text-sm w-12">{editor.efficiency}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Plus({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
