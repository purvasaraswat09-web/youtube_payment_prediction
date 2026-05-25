import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { 
  Search, 
  Bell
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

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
      <body className={`${inter.className} min-h-screen bg-[#F9FAFB] dark:bg-[#020617] text-[#0F172A]`}>
        <Toaster position="top-right" richColors />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            {/* Header */}
            <header className="h-24 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl flex items-center justify-between px-10 z-10 sticky top-0">
              <div className="flex items-center bg-gray-50 dark:bg-[#1E293B] px-6 py-3 rounded-2xl w-[480px] gap-3 border border-gray-100/50 shadow-sm transition-all focus-within:ring-2 focus-within:ring-black/5">
                <Search size={18} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search across videos, payouts, and editors..." 
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full outline-none placeholder:text-muted-foreground/60"
                />
                <div className="flex items-center gap-1">
                   <span className="text-[10px] font-black bg-white border px-1.5 py-0.5 rounded shadow-sm text-muted-foreground">⌘</span>
                   <span className="text-[10px] font-black bg-white border px-1.5 py-0.5 rounded shadow-sm text-muted-foreground">K</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="relative p-3 text-muted-foreground hover:bg-gray-50 rounded-2xl transition-all group">
                  <Bell size={22} />
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                </button>
                <div className="h-8 w-[1px] bg-gray-200" />
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest">Live Engine</span>
                   </div>
                   <span className="text-xs font-bold text-muted-foreground">API Quota: 8.2k left</span>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-12 bg-[#F9FAFB]">
              <div className="max-w-[1400px] mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
