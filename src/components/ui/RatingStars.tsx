import { Star } from "lucide-react";

export function RatingStars({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < Math.round(rating) ? "fill-amber-400" : "fill-transparent text-border"}`}
        />
      ))}
      {count != null ? <span className="ms-1 text-xs text-muted">({count})</span> : null}
    </div>
  );
}
