export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/20">
        A
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-500">
          Bangladesh buyer web
        </p>
        <p className="text-xl font-black tracking-tight text-slate-950">Amaroo</p>
      </div>
    </div>
  );
}
