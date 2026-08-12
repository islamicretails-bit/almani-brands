import { NextRequest, NextResponse } from 'next/server';
import { NexaVaultAIEngine } from '@/lib/ai-generator';

export async function POST(req: NextRequest) {
  try {
    const { prompt, category } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const engine = new NexaVaultAIEngine(process.env.OPENAI_API_KEY || 'mock-key');
    const product = await engine.generateFullProductAsset(prompt, category || 'AI Software');

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
