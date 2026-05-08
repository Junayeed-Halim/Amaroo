export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = rating >= index + 1 || rating > index + 0.4;

        return (
          <span key={index} className={filled ? "opacity-100" : "opacity-30"}>
            ★
          </span>
        );
      })}
    </div>
  );
}
