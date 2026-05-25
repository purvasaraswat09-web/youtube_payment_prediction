"use client";

import { useState } from "react";
import { 
  Save, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Key, 
  Clock,
  RefreshCcw,
  Settings,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Youtube } from "@/components/icons";
import { motion } from "framer-motion";
import { BONUS_TIERS } from "@/lib/payout";

export default function SettingsPage() {
  const [tiers, setTiers] = useState(BONUS_TIERS);
  const [apiKey, setApiKey] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black tracking-tight text-[#0F172A]">Settings</h2>
        <p className="text-muted-foreground font-medium">Control payout logic, API access, and workflow automation.</p>
      </div>

      <div className="flex gap-12">
        {/* Sidebar Tabs */}
        <div className="w-64 flex flex-col gap-2">
          <TabButton active={activeTab === "general"} onClick={() => setActiveTab("general")} icon={<Settings size={18} />} label="General Rules" />
          <TabButton active={activeTab === "api"} onClick={() => setActiveTab("api")} icon={<Youtube size={18} />} label="API Integration" />
          <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={<Bell size={18} />} label="Notifications" />
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-12 pb-20">
          {activeTab === "general" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              {/* Bonus Tiers Configuration */}
              <section className="bg-white p-10 rounded-[40px] border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <ShieldCheck className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl">Bonus Tiers</h3>
                      <p className="text-sm text-muted-foreground font-medium">Define multipliers for high-performing videos.</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-black bg-[#0F172A] text-white px-5 py-2.5 rounded-2xl hover:bg-black transition-all hover:scale-105 shadow-lg shadow-black/10">
                    <Plus size={18} /> Add New Tier
                  </button>
                </div>
                
                <div className="space-y-6">
                  {tiers.map((tier, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="flex-1 flex items-center gap-4 bg-gray-50/50 p-6 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
                        <div className="flex flex-col flex-1">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Min Views Threshold</label>
                          <input 
                            type="number" 
                            value={tier.minViews} 
                            className="w-full bg-transparent text-xl font-black outline-none"
                          />
                        </div>
                        <div className="w-[1px] h-10 bg-gray-200" />
                        <div className="flex flex-col flex-1">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Bonus Payout ($)</label>
                          <div className="flex items-center gap-2">
                             <span className="text-xl font-black text-green-600">$</span>
                             <input 
                              type="number" 
                              value={tier.bonus} 
                              className="w-full bg-transparent text-xl font-black text-green-600 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      <button className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={24} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Automation Rules */}
              <section className="bg-white p-10 rounded-[40px] border border-[#E5E7EB] shadow-sm">
                <h3 className="font-black text-xl mb-8">Workflow Automation</h3>
                <div className="space-y-8">
                  <ToggleSetting 
                    title="Automatic View Sync" 
                    desc="Refresh view counts from YouTube every 24 hours." 
                    checked={true}
                  />
                  <ToggleSetting 
                    title="Payout Freezing" 
                    desc="Automatically freeze videos older than 10 days." 
                    checked={true}
                  />
                  <ToggleSetting 
                    title="Slack Integration" 
                    desc="Send payout reports to #finance channel weekly." 
                    checked={false}
                  />
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <section className="bg-white p-10 rounded-[40px] border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-red-50 rounded-2xl">
                    <Youtube className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">YouTube Integration</h3>
                    <p className="text-sm text-muted-foreground font-medium">Connect your agency's Google Cloud project.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black flex items-center gap-2">
                      <Key size={16} /> YouTube Data API v3 Key
                    </label>
                    <div className="flex gap-4">
                      <input 
                        type="password" 
                        placeholder="••••••••••••••••••••••••••••" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#0F172A] px-6 py-4 rounded-3xl outline-none transition-all font-mono"
                      />
                      <button className="bg-[#0F172A] text-white px-10 py-4 rounded-3xl font-black hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10">
                        Validate Key
                      </button>
                    </div>
                    {apiKey && (
                      <div className="flex items-center gap-2 mt-2 text-green-600 font-bold text-xs animate-in slide-in-from-left-2">
                        <CheckCircle2 size={14} /> Key format recognized
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-amber-50 rounded-[32px] border border-amber-100 flex gap-4">
                    <AlertCircle className="text-amber-600 shrink-0" size={24} />
                    <div className="text-sm">
                      <p className="font-black text-amber-900 mb-1">Quota Management</p>
                      <p className="text-amber-800 font-medium">
                        Your current API keys have a 10,000 units/day quota. Daily sync uses approximately 100 units per match. 
                        Tracking more than 100 concurrent videos may require quota increases.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          <div className="flex justify-end gap-6 pt-10">
            <button className="px-10 py-4 rounded-3xl font-black border-2 border-gray-100 hover:bg-gray-50 transition-all active:scale-95">
              Discard Changes
            </button>
            <button className="bg-[#0F172A] text-white px-12 py-4 rounded-3xl font-black hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-3">
              <Save size={20} /> Deploy Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 rounded-[20px] text-sm font-black transition-all ${
        active 
          ? "bg-[#0F172A] text-white shadow-xl shadow-black/10 scale-105 z-10" 
          : "text-muted-foreground hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleSetting({ title, desc, checked }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
      <div className="flex flex-col">
        <span className="font-black text-[#0F172A]">{title}</span>
        <span className="text-xs text-muted-foreground font-medium mt-1">{desc}</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shadow-sm">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
}
