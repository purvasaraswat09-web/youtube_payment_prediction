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
  Youtube
} from "lucide-react";
import { BONUS_TIERS } from "@/lib/payout";

export default function SettingsPage() {
  const [tiers, setTiers] = useState(BONUS_TIERS);
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">Configure your agency's payout rules and API integrations.</p>
      </div>

      {/* Bonus Tiers Configuration */}
      <section className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <h3 className="font-semibold text-lg">Bonus Tiers</h3>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold bg-[#0F172A] text-white px-3 py-1.5 rounded-lg hover:bg-black transition-colors">
            <Plus size={14} /> Add Tier
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-6">Minimum Views Threshold</div>
            <div className="col-span-4">Bonus Amount ($)</div>
            <div className="col-span-2">Action</div>
          </div>
          
          <div className="space-y-4">
            {tiers.map((tier, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <input 
                    type="number" 
                    value={tier.minViews} 
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0F172A]/10 outline-none transition-all"
                  />
                </div>
                <div className="col-span-4">
                  <input 
                    type="number" 
                    value={tier.bonus} 
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0F172A]/10 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Configuration */}
      <section className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] dark:border-[#1E293B]">
          <div className="flex items-center gap-2">
            <Youtube className="text-red-500" size={20} />
            <h3 className="font-semibold text-lg">YouTube API Integration</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Key size={14} /> Data API Key
            </label>
            <div className="flex gap-4">
              <input 
                type="password" 
                placeholder="Enter your YouTube API v3 Key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0F172A]/10 outline-none transition-all"
              />
              <button className="bg-[#0F172A] text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition-colors">
                Validate Key
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Keys are encrypted and stored securely in your Supabase vault.
            </p>
          </div>

          <div className="pt-6 border-t flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Daily Sync: 8:00 AM (UTC)</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Auto-Freeze Enabled</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-2.5 rounded-lg font-bold border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
          Discard Changes
        </button>
        <button className="bg-[#0F172A] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Save size={18} /> Update Configuration
        </button>
      </div>
    </div>
  );
}
