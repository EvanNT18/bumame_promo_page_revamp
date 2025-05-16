export interface Partner {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  logoUrl: string;
  slug: string;
  vouchers: Voucher[];
  banners: Banner[];
  faqs: FAQ[];
  subtitles: Subtitle[];
  terms: Terms[];
}

export interface Voucher {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  voucherCode: string;
  description: string;
}

export interface Banner {
  id: string;
  created_at: string;
  updated_at: string;
  filename: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
}

export interface Subtitle {
  id: string;
  created_at: string;
  updated_at: string;
  text: string;
}

export interface Terms {
  id: string;
  created_at: string;
  updated_at: string;
  text: string;
}