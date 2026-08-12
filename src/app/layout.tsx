import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NexaVault Enterprise | Digital Asset Marketplace',
  description: 'Elite Enterprise-Grade Digital Assets & AI Templates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cyber-bg text-gray-100 selection:bg-cyber-accent/30">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent)]" />
        {children}
      </body>
    </html>
  );
}
