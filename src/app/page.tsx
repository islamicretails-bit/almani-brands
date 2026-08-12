import ProductGrid from '@/components/marketplace/ProductGrid';
import AppleToast from '@/components/marketplace/AppleToast';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="py-20 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          NexaVault Enterprise
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Access the world's most advanced digital architecture blueprints, AI frameworks, and production-ready enterprise systems.
        </p>
        <div className="flex justify-center gap-4">
          <div className="px-6 py-3 rounded-full bg-cyber-accent/10 border border-cyber-accent/50 text-cyber-accent animate-pulse">
            🔥 1,824+ Active Users Now
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <ProductGrid />
      </section>
      
      <AppleToast />
    </main>
  );
}
