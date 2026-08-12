'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const names = ['Michael', 'Sarah', 'David', 'Emma', 'Lukas', 'Ahmed', 'Priya'];
const locations = ['California', 'London', 'Berlin', 'Dubai', 'Tokyo', 'New York'];

export default function AppleToast() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', location: '', time: '' });

  useEffect(() => {
    const trigger = () => {
      setData({
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: Math.floor(Math.random() * 10) + 1 + 'm ago'
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const timer = setInterval(trigger, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-8 left-8 z-[100] glass-card px-5 py-3 rounded-2xl flex items-center gap-4 border border-white/10 shadow-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-cyber-accent flex items-center justify-center font-bold">
            {data.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium">{data.name} from {data.location}</p>
            <p className="text-xs text-gray-400">Purchased Notion Business Vault • {data.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
