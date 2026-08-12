import { NextRequest, NextResponse } from 'next/server';
import { processAdminNaturalLanguage } from '@/lib/ai-admin-command';

export async function POST(req: NextRequest) {
  try {
    const { command, passcode } = await req.json();

    if (passcode !== (process.env.ADMIN_OFFICE_PASSCODE || 'NexaVault2026Secret!')) {
      return NextResponse.json({ error: 'Unauthorized War Room Access' }, { status: 401 });
    }

    const result = await processAdminNaturalLanguage(command);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
