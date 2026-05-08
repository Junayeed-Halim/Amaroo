export function BadgeRow({
  items,
  tone = "light",
}: {
  items: string[];
  tone?: "light" | "dark";
}) {
  const classes =
    tone === "dark"
      ? "border-white/15 bg-white/10 text-white"
      : "border-slate-200 bg-white text-slate-700";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${classes}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
