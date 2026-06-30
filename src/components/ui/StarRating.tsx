import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ rating, size = 14, showValue = false }: StarRatingProps) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} de 5 estrelas`}>
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= rounded;
          const half   = !filled && i + 0.5 === rounded;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-brand-100" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : half ? "50%" : "0%" }}
              >
                <Star size={size} fill="currentColor" className="text-sunny-400" />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-[11px] font-bold text-brand-500">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
