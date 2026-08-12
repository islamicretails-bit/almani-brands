'use client';

import React, { useState } from 'react';
import { CpuIcon, RocketIcon, LightbulbIcon, TrendingUpIcon } from 'lucide-react';

const AIOperationsHub: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const triggerAutoGenerate = async () => {
    setLoading(true);
    setLog(['Initiating Autonomous Product Generation...']);
    setProgress(0);

    try {
      const res = await fetch('/api/cron/auto-generate', {
        method: 'GET', // CRON job typically invoked via GET, but can be POST for manual trigger
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`, // Use client-side env var
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setLog(prev => [...prev, `✅ Generated ${data.ingestedCount} products successfully.`]);
        setLog(prev => [...prev, `Latest Products: ${data.products.map((p: any) => p.title).join(', ')}`]);
        setProgress(100);
      } else {
        setLog(prev => [...prev, `❌ Generation failed: ${data.error}`]);
        setProgress(0);
      }
    } catch (error: any) {
      setLog(prev => [...prev, `🚨 Error triggering generation: ${error.message}`]);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-cyber-emerald mb-4 flex items-center"><CpuIcon className="w-5 h-5 mr-2"/> AI Product Pipeline Control</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center glass-card p-4 rounded-md border border-cyber-border">
          <LightbulbIcon className="w-6 h-6 text-cyber-cyan mr-3" />
          <div>
            <p className="font-medium">AI Engine Status</p>
            <p className="text-sm text-gray-400">Operational</p>
          </div>
        </div>
        <div className="flex items-center glass-card p-4 rounded-md border border-cyber-border">
          <TrendingUpIcon className="w-6 h-6 text-cyber-amber mr-3" />
          <div>
            <p className="font-medium">Trend Scraper</p>
            <p className="text-sm text-gray-400">Active</p>
          </div>
        </div>
      </div>

      <button
        onClick={triggerAutoGenerate}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center
          ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyber-accent hover:bg-opacity-90'}`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating (Progress: {progress}%)
          </span>
        ) : (
          <><RocketIcon className="w-5 h-5 mr-2"/> Trigger Daily Product Generation (Manual)</>
        )}
      </button>

      <div className="mt-6 bg-cyber-card border border-cyber-border p-4 rounded-md text-sm font-mono max-h-40 overflow-y-auto">
        <h4 className="font-semibold text-gray-300 mb-2">Terminal Output Log:</h4>
        {log.map((entry, index) => (
          <p key={index} className="text-gray-400">{entry}</p>
        ))}
        {log.length === 0 && <p className="text-gray-500">Awaiting commands...</p>}
      </div>
    </div>
  );
};

export default AIOperationsHub;
