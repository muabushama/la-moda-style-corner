export type Locale = "ar" | "en";
export type CategorySlug = "women" | "boys" | "girls";
export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "best-selling";
export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type ProductColor = {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  materialsAr: string;
  materialsEn: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewsCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  stock: number;
  tags: string[];
};

export type CartItem = {
  productId: string;
  size: string;
  colorId: string;
  quantity: number;
};

export type DemoUser = {
  name: string;
  email: string;
  phone: string;
};

export type CheckoutInfo = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  street: string;
  apartment?: string;
};

export type DeliveryOption = {
  id: string;
  nameAr: string;
  nameEn: string;
  daysAr: string;
  daysEn: string;
  price: number;
};

export type DemoOrder = {
  id: string;
  createdAt: string;
  items: (CartItem & { nameAr: string; nameEn: string; price: number; image: string })[];
  customer: CheckoutInfo;
  deliveryId: string;
  payment: "cod";
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  coupon?: string;
};

export type Review = {
  id: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  date: string;
};

export type Testimonial = {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  quoteAr: string;
  quoteEn: string;
};

export type ProductFilters = {
  category?: CategorySlug | "all";
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  onSale?: boolean;
  isNew?: boolean;
};
