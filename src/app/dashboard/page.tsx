'use client';

import { Key, Download, Shield } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Your Secure Vault</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Key className="text-cyber-cyan" />
            <h2 className="text-xl font-bold">Active Licenses</h2>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-bold">Enterprise AI Multi-Agent Framework</p>
                  <p className="text-xs font-mono text-gray-500">NEXA-LINC-XXXX-XXXX-882{i}</p>
                </div>
                <button className="p-2 rounded-lg bg-cyber-accent/20 text-cyber-accent">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
