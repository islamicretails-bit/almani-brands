import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, currency, userEmail, paymentMethod } = body;

    const orderId = `NEXA-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const bankInstructions = {
      USD: { bank: 'Citibank N.A. New York', account: process.env.CITIBANK_ACCOUNT || '9876543210', swift: 'CITIUS33' },
      GBP: { bank: 'Barclays Bank London', iban: process.env.BARCLAYS_IBAN || 'GB29BARC20201112345678', sortCode: '20-20-11' },
      PKR: { bank: 'Meezan Bank / Raast Instant', raastId: process.env.RAAST_ID || '03001234567', account: process.env.JAZZCASH_ACCOUNT || '03001234567' }
    };

    return NextResponse.json({
      success: true,
      orderId,
      status: 'PENDING_RECEIPT',
      instructions: bankInstructions[currency as keyof typeof bankInstructions] || bankInstructions.USD,
      message: 'Order created successfully. Please upload payment receipt for verification.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
