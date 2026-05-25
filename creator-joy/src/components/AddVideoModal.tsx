"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Youtube, Plus, Calendar, User, Search, Link as LinkIcon, Loader2 } from "lucide-react";
import { extractVideoId, getYouTubeVideoData } from "@/lib/youtube";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (video: any) => void;
}

export default function AddVideoModal({ isOpen, onClose, onAdd }: AddVideoModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [editor, setEditor] = useState("");
  const [creator, setCreator] = useState("CreatorJoy Main");

  const handleUrlChange = async (val: string) => {
    setUrl(val);
    const videoId = extractVideoId(val);
    if (videoId) {
      setLoading(true);
      const data = await getYouTubeVideoData(videoId);
      setPreview(data);
      setLoading(false);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview || !editor) return;
    
    onAdd({
      url,
      ...preview,
      editor,
      creator,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
    
    setUrl("");
    setPreview(null);
    setEditor("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#1E293B]"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Add New Video</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Youtube size={16} className="text-red-500" /> YouTube URL
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="https://www.youtube.com/watch?v=..." 
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    required
                  />
                  <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Preview Section */}
              <div className="min-h-[100px] border-2 border-dashed rounded-2xl flex items-center justify-center bg-gray-50/50">
                {loading ? (
                  <Loader2 className="animate-spin text-blue-500" />
                ) : preview ? (
                  <div className="flex gap-4 p-2 w-full animate-in fade-in zoom-in-95">
                    <img src={preview.thumbnail} className="w-32 h-20 object-cover rounded-lg shadow-sm" />
                    <div className="flex flex-col justify-center overflow-hidden">
                      <span className="font-bold text-sm line-clamp-2">{preview.title}</span>
                      <span className="text-xs text-muted-foreground font-medium mt-1">
                        {preview.views.toLocaleString()} views detected
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground font-medium text-center px-8">
                    Paste a URL to fetch video details automatically
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <User size={16} /> Assigned Editor
                  </label>
                  <select 
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 rounded-xl outline-none"
                    value={editor}
                    onChange={(e) => setEditor(e.target.value)}
                    required
                  >
                    <option value="">Select Editor</option>
                    <option value="Aarav Sharma">Aarav Sharma</option>
                    <option value="Priya Verma">Priya Verma</option>
                    <option value="Rohit Singh">Rohit Singh</option>
                    <option value="Neha Kapoor">Neha Kapoor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Search size={16} /> Creator Channel
                  </label>
                  <select 
                     className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 rounded-xl outline-none"
                     value={creator}
                     onChange={(e) => setCreator(e.target.value)}
                  >
                    <option value="CreatorJoy Main">CreatorJoy Main</option>
                    <option value="CreatorJoy Clips">CreatorJoy Clips</option>
                    <option value="CreatorJoy Shorts">CreatorJoy Shorts</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!preview || !editor}
                className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/10"
              >
                <Plus size={20} /> Index Video for Tracking
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
