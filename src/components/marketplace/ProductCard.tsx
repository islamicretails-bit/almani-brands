'use client';

import { Star, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card group relative flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/5"
    >
      <div className="aspect-video bg-gradient-to-br from-cyber-card to-cyber-bg p-8 flex items-center justify-center">
         <div className="text-4xl font-bold opacity-20">{product.category}</div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{product.title}</h3>
          {product.isVerified && <ShieldCheck className="text-cyber-cyan w-5 h-5 verified-badge-glow" />}
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <span className="text-xs text-gray-400">{product.rating} ({product.totalReviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-mono font-bold text-cyber-emerald">
            ${product.priceUSD}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Download size={14} className="mr-1" /> {product.totalDownloads}
          </div>
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-cyber-cyan hover:text-white transition-all duration-300">
          Secure Access
        </button>
      </div>
    </motion.div>
  );
}
