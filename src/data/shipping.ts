import type { DeliveryOption } from "@/types";

export const deliveryOptions: DeliveryOption[] = [
  {
    id: "cairo",
    nameAr: "توصيل القاهرة والجيزة",
    nameEn: "Cairo & Giza delivery",
    daysAr: "2–3 أيام عمل",
    daysEn: "2–3 working days",
    price: 60,
  },
  {
    id: "delta",
    nameAr: "توصيل الدلتا والإسكندرية",
    nameEn: "Delta & Alexandria",
    daysAr: "3–4 أيام عمل",
    daysEn: "3–4 working days",
    price: 80,
  },
  {
    id: "upper",
    nameAr: "باقي المحافظات",
    nameEn: "Other governorates",
    daysAr: "4–5 أيام عمل",
    daysEn: "4–5 working days",
    price: 110,
  },
];

export const DEMO_COUPON = "LAMA10";
export const DEMO_COUPON_RATE = 0.1;
