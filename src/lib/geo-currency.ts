import { GeoLocation } from '@/types';

export function resolveGeoCurrency(countryCode: string): GeoLocation {
  switch (countryCode.toUpperCase()) {
    case 'PK':
      return { country: 'Pakistan', currency: 'PKR', symbol: 'Rs.', rate: 278.5 };
    case 'GB':
    case 'UK':
      return { country: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 0.79 };
    case 'DE':
    case 'FR':
    case 'EU':
      return { country: 'European Union', currency: 'EUR', symbol: '€', rate: 0.92 };
    default:
      return { country: 'United States', currency: 'USD', symbol: '$', rate: 1.0 };
  }
}
