export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.34em] text-teal-600">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {copy ? <p className="max-w-3xl text-base leading-7 text-slate-600">{copy}</p> : null}
    </div>
  );
}
