import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { 
  BarChart3, 
  LayoutDashboard, 
  Video, 
  Users, 
  Settings, 
  Search, 
  Bell,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreatorJoy | Video Editor Pay Tracker",
  description: "Automate payouts for your creative agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#F9FAFB] dark:bg-[#020617]`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 border-r border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#020617] h-full hidden lg:flex flex-col">
            <div className="p-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0F172A] dark:bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="text-white dark:text-[#0F172A] w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">CreatorJoy</span>
            </div>
            
            <nav className="flex-1 px-4 space-y-1">
              <NavItem href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
              <NavItem href="/videos" icon={<Video size={20} />} label="Videos" />
              <NavItem href="/editors" icon={<Users size={20} />} label="Editors" />
              <NavItem href="/analytics" icon={<BarChart3 size={20} />} label="Analytics" />
              <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
            </nav>
            
            <div className="p-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F3F4F6] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#E2E8F0]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Agency Admin</span>
                  <span className="text-xs text-muted-foreground">Pro Plan</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#020617] flex items-center justify-between px-8 bg-opacity-80 backdrop-blur-md z-10">
              <div className="flex items-center bg-[#F3F4F6] dark:bg-[#1E293B] px-3 py-1.5 rounded-md w-96 gap-2">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search videos, editors..." 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:bg-[#F3F4F6] rounded-full transition-colors">
                  <Bell size={20} />
                </button>
                <div className="h-8 w-[1px] bg-[#E5E7EB]" />
                <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
                  Manual Sync
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "bg-[#F3F4F6] text-[#0F172A] dark:bg-[#1E293B] dark:text-white" 
          : "text-muted-foreground hover:bg-[#F3F4F6] hover:text-[#0F172A] dark:hover:bg-[#1E293B]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
