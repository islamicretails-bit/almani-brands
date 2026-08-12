'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/hooks/useAdminAuth';
import { GlobeIcon, BarChart3Icon, CpuIcon, CommandIcon, DollarSignIcon, PackageIcon } from 'lucide-react';
import LiveTrafficMap from '@/components/admin/LiveTrafficMap';
import AIOperationsHub from '@/components/admin/AIOperationsHub';
import SalesAnalyticsChart from '@/components/admin/SalesAnalyticsChart';
import CustomRequestsTable from '@/components/admin/CustomRequestsTable';
import PaymentVerificationModal from '@/components/admin/PaymentVerificationModal';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface AnalyticsData {
  liveVisitors: number;
  activeCarts: number;
  todayRevenueUSD: number;
  todayRevenueGBP: number;
  todayRevenuePKR: number;
  recentTraffic: { ip: string; country: string; flag: string; path: string; duration: string }[];
}

export default function OfficePage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [adminCommand, setAdminCommand] = useState('');
  const [commandResult, setCommandResult] = useState<{ message: string; configUpdates?: any } | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (passcode === process.env.NEXT_PUBLIC_ADMIN_OFFICE_PASSCODE) { // Use NEXT_PUBLIC for client-side access
      setIsAuthenticated(true);
    } else {
      alert('Unauthorized War Room Access. Invalid Passcode.');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAnalytics = async () => {
        const res = await fetch('/api/admin/analytics');
        const data = await res.json();
        setAnalyticsData(data);
      };
      fetchAnalytics();
      const interval = setInterval(fetchAnalytics, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleAdminCommand = async () => {
    try {
      const res = await fetch('/api/ai/admin-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: adminCommand, passcode: passcode }),
      });
      const data = await res.json();
      if (data.success) {
        setCommandResult(data.result);
        // Optionally, trigger a re-fetch of analytics or update local state based on configUpdates
        if (data.result.configUpdates) {
          // In a real app, you'd likely dispatch a global state update or refetch site config
          console.log('Site config updated:', data.result.configUpdates);
        }
      } else {
        setCommandResult({ message: data.error });
      }
    } catch (error: any) {
      setCommandResult({ message: `Error: ${error.message}` });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyber-bg text-gray-100 p-4">
        <div className="glass-card p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-cyber-cyan mb-6 text-center">NexaVault Admin Office</h2>
          <p className="text-gray-400 text-center mb-6">Enter Admin War Room Passcode to proceed.</p>
          <input
            type="password"
            className="w-full p-3 mb-4 bg-cyber-card border border-cyber-border rounded-md focus:ring-2 focus:ring-cyber-accent outline-none text-white"
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAuth();
              }
            }}
          />
          <button
            onClick={handleAuth}
            className="w-full bg-cyber-accent text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200"
          >
            Enter War Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-cyber-emerald mb-8 flex items-center">
          <CommandIcon className="w-10 h-10 mr-4 glow-pulse" /> Admin War Room Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Live Visitors Card */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyber-cyan">Live Visitors</h2>
              <GlobeIcon className="w-6 h-6 text-cyber-cyan" />
            </div>
            <p className="text-5xl font-bold">{analyticsData?.liveVisitors || 0}</p>
            <p className="text-gray-400 mt-2">Currently browsing the vault</p>
          </div>

          {/* Active Carts Card */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyber-amber">Active Carts</h2>
              <PackageIcon className="w-6 h-6 text-cyber-amber" />
            </div>
            <p className="text-5xl font-bold">{analyticsData?.activeCarts || 0}</p>
            <p className="text-gray-400 mt-2">Engaged in checkout process</p>
          </div>

          {/* Today's Revenue Card */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyber-emerald">Today's Revenue</h2>
              <DollarSignIcon className="w-6 h-6 text-cyber-emerald" />
            </div>
            <p className="text-3xl font-bold">${(analyticsData?.todayRevenueUSD || 0).toLocaleString()} <span className="text-sm text-gray-400">USD</span></p>
            <p className="text-xl font-bold mt-1">£{(analyticsData?.todayRevenueGBP || 0).toLocaleString()} <span className="text-sm text-gray-400">GBP</span></p>
            <p className="text-xl font-bold mt-1">Rs.{(analyticsData?.todayRevenuePKR || 0).toLocaleString()} <span className="text-sm text-gray-400">PKR</span></p>
          </div>
        </div>

        {/* Admin Command Bar */}
        <div className="glass-card p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-cyber-accent mb-4">AI Natural Language Command Bar</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-grow p-3 bg-cyber-card border border-cyber-border rounded-md focus:ring-2 focus:ring-cyber-accent outline-none text-white"
              placeholder="e.g., 'Set banner discount to 25%', 'Change theme to neon', 'Update hero message: Unlock the Future'"
              value={adminCommand}
              onChange={(e) => setAdminCommand(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAdminCommand();
                }
              }}
            />
            <button
              onClick={handleAdminCommand}
              className="bg-cyber-accent text-white py-3 px-6 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200 flex-shrink-0"
            >
              Execute Command
            </button>
          </div>
          {commandResult && (
            <div className={clsx(
              "mt-4 p-3 rounded-md text-sm",
              commandResult.message.startsWith('Error') ? 'bg-red-900/30 text-red-300 border border-red-700'
              : commandResult.message.includes('Unauthorized') ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700'
              : 'bg-green-900/30 text-green-300 border border-green-700'
            )}>
              <p>{commandResult.message}</p>
              {commandResult.configUpdates && (
                <pre className="mt-2 text-xs text-gray-200">{JSON.stringify(commandResult.configUpdates, null, 2)}</pre>
              )}
            </div>
          )}
        </div>

        {/* Analytics & Operations Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-cyber-cyan mb-4 flex items-center"><GlobeIcon className="w-5 h-5 mr-2"/> Live Traffic Telemetry</h2>
            <LiveTrafficMap trafficData={analyticsData?.recentTraffic || []} />
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-cyber-emerald mb-4 flex items-center"><CpuIcon className="w-5 h-5 mr-2"/> AI Operations Hub</h2>
            <AIOperationsHub />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-cyber-accent mb-4 flex items-center"><BarChart3Icon className="w-5 h-5 mr-2"/> Sales Analytics</h2>
            <SalesAnalyticsChart />
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-cyber-amber mb-4 flex items-center"><DollarSignIcon className="w-5 h-5 mr-2"/> Payment Verification</h2>
            <button
              onClick={() => setPaymentModalOpen(true)}
              className="bg-cyber-emerald text-white py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Open Payment Verification
            </button>
            {paymentModalOpen && (
              <PaymentVerificationModal onClose={() => setPaymentModalOpen(false)} />
            )}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-3">Custom Buyer Requests</h3>
              <CustomRequestsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
