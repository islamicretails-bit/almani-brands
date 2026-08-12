import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing secure license token' }, { status: 403 });
  }

  return NextResponse.json({
    downloadUrl: `https://cdn.nexavault.enterprise/vault/assets/${token}.zip`,
    expiresIn: '3600 seconds',
    encryptionType: 'AES-256-GCM'
  });
}
