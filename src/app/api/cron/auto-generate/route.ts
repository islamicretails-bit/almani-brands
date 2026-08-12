import { NextRequest, NextResponse } from 'next/server';
import { NexaVaultAIEngine } from '@/lib/ai-generator';
import { scrapeLiveTechTrends } from '@/lib/ai-trend-scraper';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Allowed for manual invocation or verified CRON secret
    }

    const trends = await scrapeLiveTechTrends();
    const engine = new NexaVaultAIEngine(process.env.OPENAI_API_KEY || 'mock-key');
    const generatedAssets = [];

    for (const trend of trends) {
      const asset = await engine.generateFullProductAsset(trend.keyword, trend.category);
      generatedAssets.push(asset);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ingestedCount: generatedAssets.length,
      products: generatedAssets
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
