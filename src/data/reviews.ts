import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "w1",
    nameAr: "سارة أحمد",
    nameEn: "Sara Ahmed",
    rating: 5,
    commentAr: "القماش فاخر والقصة ممتازة. وصلت كما في الصور.",
    commentEn: "Luxurious fabric and a beautiful cut. Exactly as pictured.",
    date: "2026-09-12",
  },
  {
    id: "r2",
    productId: "w1",
    nameAr: "منى خالد",
    nameEn: "Mona Khaled",
    rating: 4,
    commentAr: "لون جميل جداً. أنصح بطلب المقاس المعتاد.",
    commentEn: "Gorgeous color. I recommend ordering your usual size.",
    date: "2026-08-22",
  },
  {
    id: "r3",
    productId: "g1",
    nameAr: "هبة محمود",
    nameEn: "Heba Mahmoud",
    rating: 5,
    commentAr: "ابنتي أحبته من أول تجربة. خفيف ومريح.",
    commentEn: "My daughter loved it immediately. Light and comfortable.",
    date: "2026-10-02",
  },
  {
    id: "r4",
    productId: "b1",
    nameAr: "أحمد علي",
    nameEn: "Ahmed Ali",
    rating: 5,
    commentAr: "هودي عملي وجودة خياطة واضحة.",
    commentEn: "A practical hoodie with solid stitching.",
    date: "2026-07-18",
  },
];

export function getReviewsForProduct(productId: string) {
  const list = reviews.filter((r) => r.productId === productId);
  return list.length ? list : reviews.slice(0, 2);
}
