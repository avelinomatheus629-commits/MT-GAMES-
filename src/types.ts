export interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  promoPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  specs: { [key: string]: string };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: string;
  image?: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  location: string;
  productPurchased: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OfficialLink {
  id: string;
  name: string;
  url: string;
  iconName: 'facebook' | 'instagram' | 'whatsapp' | 'mercadolivre' | 'shopee' | 'magalu' | 'googlemaps';
  description: string;
  badge?: string;
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  installments?: number;
}
