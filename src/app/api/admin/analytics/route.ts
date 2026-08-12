import { NextResponse } from 'next/server';

export async function GET() {
  const analyticsData = {
    liveVisitors: 142,
    activeCarts: 18,
    todayRevenueUSD: 3840.00,
    todayRevenueGBP: 1420.00,
    todayRevenuePKR: 485000.00,
    recentTraffic: [
      { ip: '104.28.12.4', country: 'USA', flag: '🇺🇸', path: '/store/notion-vault', duration: '2m 14s' },
      { ip: '185.220.101.5', country: 'UK', flag: '🇬🇧', path: '/checkout/nexa-ord', duration: '45s' },
      { ip: '39.42.18.91', country: 'Pakistan', flag: '🇵🇰', path: '/store/ai-agent-framework', duration: '5m 01s' },
      { ip: '82.165.42.1', country: 'Germany', flag: '🇩🇪', path: '/office', duration: '12s' }
    ]
  };

  return NextResponse.json(analyticsData);
}
