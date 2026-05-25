"use client";

import { 
  BarChart3, 
  LayoutDashboard, 
  Video, 
  Users, 
  Settings, 
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    const promise = fetch('/api/sync', { method: 'POST' });

    toast.promise(promise, {
      loading: 'Syncing views with YouTube Data API...',
      success: (data) => {
        setSyncing(false);
        return `Sync complete! Processed ${activeVideosCount} active videos.`;
      },
      error: () => {
        setSyncing(false);
        return 'Sync failed. Please check your API key.';
      },
    });
  };

  // Mock count for the toast
  const activeVideosCount = 6;

  return (
    <aside className="w-80 border-r border-[#E5E7EB] bg-white h-full hidden lg:flex flex-col z-20">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter leading-tight">CreatorJoy</span>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest -mt-1">Agency Suite</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 mt-6 space-y-2">
        <NavItem href="/" icon={<LayoutDashboard size={22} />} label="Dashboard" active={pathname === "/"} />
        <NavItem href="/videos" icon={<Video size={22} />} label="Video Library" active={pathname === "/videos"} />
        <NavItem href="/editors" icon={<Users size={22} />} label="Editor Team" active={pathname === "/editors"} />
        <NavItem href="/analytics" icon={<BarChart3 size={22} />} label="Performance" active={pathname === "/analytics"} />
        <NavItem href="/settings" icon={<Settings size={22} />} label="Settings" active={pathname === "/settings"} />
      </nav>
      
      <div className="p-6 mt-auto">
        <div className="bg-[#0F172A] p-6 rounded-[32px] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="p-2 bg-white/10 rounded-lg w-fit mb-4">
              <Zap size={20} className={`text-yellow-400 fill-yellow-400 ${syncing ? 'animate-bounce' : ''}`} />
            </div>
            <h4 className="font-black text-lg mb-1 leading-tight">Sync Status</h4>
            <p className="text-xs text-white/60 font-medium mb-4">All systems operational. Next sync in 14h.</p>
            <button 
              onClick={handleSync}
              disabled={syncing}
              className="w-full bg-white text-[#0F172A] py-2.5 rounded-2xl text-xs font-black hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50"
            >
              {syncing ? 'Syncing...' : 'Manual Pulse sync'}
            </button>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="mt-8 flex items-center gap-4 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md border-2 border-white" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black truncate">Agency Admin</span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Enterprise Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-4 px-5 py-4 rounded-[20px] text-sm font-black transition-all hover:translate-x-1 group
        ${active ? 'bg-gray-50 text-[#0F172A]' : 'text-muted-foreground hover:bg-gray-50 hover:text-[#0F172A]'}
      `}
    >
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}
