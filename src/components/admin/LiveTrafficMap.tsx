import React from 'react';
import { GlobeIcon } from 'lucide-react';

interface LiveTrafficMapProps {
  trafficData: { ip: string; country: string; flag: string; path: string; duration: string }[];
}

const LiveTrafficMap: React.FC<LiveTrafficMapProps> = ({ trafficData }) => {
  return (
    <div className="relative h-64 bg-cyber-bg border border-cyber-border rounded-lg overflow-hidden flex flex-col justify-between p-4">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <GlobeIcon className="w-3/4 h-3/4 text-cyber-cyan animate-pulse" />
      </div>
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-cyber-cyan mb-3">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          {trafficData.length > 0 ? (
            trafficData.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-cyber-card/50 backdrop-blur-md p-2 rounded-md border border-cyber-border">
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{item.flag}</span>
                  <span>{item.country} <span className="text-gray-500">({item.ip})</span></span>
                </div>
                <span className="text-cyber-amber text-xs">{item.path}</span>
                <span className="text-gray-400 text-xs">{item.duration}</span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No live traffic data available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LiveTrafficMap;
