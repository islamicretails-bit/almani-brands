'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', usd: 4000, gbp: 2400, pkr: 800000 },
  { name: 'Feb', usd: 3000, gbp: 1398, pkr: 600000 },
  { name: 'Mar', usd: 2000, gbp: 9800, pkr: 900000 },
  { name: 'Apr', usd: 2780, gbp: 3908, pkr: 700000 },
  { name: 'May', usd: 1890, gbp: 4800, pkr: 850000 },
  { name: 'Jun', usd: 2390, gbp: 3800, pkr: 750000 },
  { name: 'Jul', usd: 3490, gbp: 4300, pkr: 950000 },
];

const SalesAnalyticsChart: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-lg h-80">
      <h3 className="text-xl font-semibold text-cyber-accent mb-4">Monthly Revenue Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '4px' }}
            itemStyle={{ color: '#F9FAFB' }}
            labelStyle={{ color: '#6366F1' }}
          />
          <Legend />
          <Line type="monotone" dataKey="usd" stroke="#06B6D4" activeDot={{ r: 8 }} name="USD Revenue" />
          <Line type="monotone" dataKey="gbp" stroke="#10B981" activeDot={{ r: 8 }} name="GBP Revenue" />
          <Line type="monotone" dataKey="pkr" stroke="#F59E0B" activeDot={{ r: 8 }} name="PKR Revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalyticsChart;
