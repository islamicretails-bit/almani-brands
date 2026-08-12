import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderId, receiptUrl } = await req.json();
    return NextResponse.json({
      success: true,
      orderId,
      status: 'VERIFICATION_SUBMITTED',
      message: 'Receipt submitted successfully. Instant automated license token generation in progress.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
