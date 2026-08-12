export type Currency = 'USD' | 'GBP' | 'EUR' | 'PKR';

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  priceUSD: number;
  priceGBP: number;
  pricePKR: number;
  rating: number;
  totalReviews: number;
  totalDownloads: number;
  isVerified: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  country: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GeoLocation {
  country: string;
  currency: Currency;
  symbol: string;
  rate: number;
}
