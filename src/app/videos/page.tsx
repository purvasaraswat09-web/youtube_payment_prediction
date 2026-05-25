"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  Play, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_VIDEOS } from "@/lib/mock-data";
import AddVideoModal from "@/components/AddVideoModal";

export default function VideosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [search, setSearch] = useState("");

  const filteredVideos = videos.filter(v => 
    v.title?.toLowerCase().includes(search.toLowerCase()) || 
    v.editor.toLowerCase().includes(search.toLowerCase()) ||
    v.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Video Library</h2>
          <p className="text-muted-foreground font-medium">Manage and track all video submissions from your team.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg"
          >
            <Plus size={20} /> Index New Video
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-6 rounded-[32px] border border-[#E5E7EB] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by title, editor, or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border-none px-12 py-3 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-[#0F172A] transition-colors">
            <SlidersHorizontal size={18} /> Advanced Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-3 hover:bg-gray-50 rounded-2xl text-muted-foreground transition-all">
             <Download size={20} />
           </button>
           <div className="h-6 w-[1px] bg-gray-200 mx-2" />
           <div className="flex items-center gap-1">
             <button className="p-2 hover:bg-gray-50 rounded-xl text-muted-foreground"><ChevronLeft size={20} /></button>
             <span className="text-xs font-black px-2">Page 1 of 12</span>
             <button className="p-2 hover:bg-gray-50 rounded-xl text-muted-foreground"><ChevronRight size={20} /></button>
           </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[32px] border border-[#E5E7EB] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F9FAFB] text-muted-foreground font-black uppercase tracking-widest text-[10px] border-b">
              <tr>
                <th className="px-8 py-5">
                  <div className="flex items-center gap-2">Video & ID <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-8 py-5">Editor</th>
                <th className="px-8 py-5">Upload Date</th>
                <th className="px-8 py-5 text-right">Raw Views</th>
                <th className="px-8 py-5 text-right">Calculated Pay</th>
                <th className="px-8 py-5">Tracking</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredVideos.map((video, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * idx }}
                  key={video.id} 
                  className="hover:bg-gray-50/50 transition-all cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img src={video.thumbnail} className="w-24 h-14 object-cover rounded-2xl border shadow-sm group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition-opacity">
                          <Play size={20} className="fill-white text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col max-w-[320px]">
                        <span className="font-bold text-[#0F172A] truncate text-base leading-tight">{video.title || video.id}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg uppercase">{video.id}</span>
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-blue-500 transition-all">
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 italic font-bold text-[#0F172A]">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black">{video.editor.charAt(0)}</div>
                       {video.editor}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-muted-foreground font-bold">
                    {new Date(video.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 font-black text-right text-lg">{video.views.toLocaleString()}</td>
                  <td className="px-8 py-6 font-black text-right text-lg text-green-600">
                    <div className="flex flex-col items-end">
                      <span>${video.pay.toLocaleString()}</span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase opacity-60">Base + Tier 1</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl w-fit ${
                      video.status === 'Active' 
                        ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' 
                        : 'bg-gray-100 text-gray-400 opacity-60'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${video.status === 'Active' ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{video.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 hover:bg-gray-200 rounded-2xl transition-all">
                      <MoreVertical size={20} className="text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddVideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(v) => setVideos([v, ...videos])} 
      />
    </div>
  );
}
