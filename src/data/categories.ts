import type { CategorySlug } from "@/types";

export const categories: {
  slug: CategorySlug;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
}[] = [
  {
    slug: "women",
    nameAr: "النساء",
    nameEn: "Women",
    descriptionAr: "فساتين، بلوزات، وقطع يومية أنيقة للمرأة العصرية.",
    descriptionEn: "Dresses, blouses, and everyday pieces for the modern woman.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "boys",
    nameAr: "الأولاد",
    nameEn: "Boys",
    descriptionAr: "ملابس مريحة وعملية للأولاد من المدرسة حتى اللعب.",
    descriptionEn: "Comfortable, practical pieces for boys from school to play.",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "girls",
    nameAr: "البنات",
    nameEn: "Girls",
    descriptionAr: "فساتين ناعمة وقطع مرحة بألوان لطيفة للبنات.",
    descriptionEn: "Soft dresses and playful pieces in gentle colors for girls.",
    image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?auto=format&fit=crop&w=1200&q=80",
  },
];
