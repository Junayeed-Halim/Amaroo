const FILLED_STAR_THRESHOLD = 0.4;

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = rating >= index + 1 || rating > index + FILLED_STAR_THRESHOLD;

        return (
          <span key={index} className={filled ? "opacity-100" : "opacity-30"}>
            ★
          </span>
        );
      })}
    </div>
  );
}
