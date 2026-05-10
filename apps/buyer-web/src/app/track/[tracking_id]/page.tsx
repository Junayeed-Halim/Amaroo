import Link from "next/link";

interface Props {
  params: Promise<{ tracking_id: string }>;
}

/** Static courier status steps for the UI timeline. */
const STATUS_STEPS = [
  { key: "created", label: "Order placed", icon: "📦" },
  { key: "picked_up", label: "Picked up by courier", icon: "🚴" },
  { key: "in_transit", label: "In transit", icon: "🚚" },
  { key: "out_for_delivery", label: "Out for delivery", icon: "📍" },
  { key: "delivered", label: "Delivered", icon: "✓" },
];

export default async function TrackPage({ params }: Props) {
  const { tracking_id } = await params;

  // TODO: fetch real shipment status from GET /api/v1/courier/shipments/:consignmentId
  // For now we show a UI skeleton with the tracking ID so the page is functional.
  const mockStatus = "in_transit";
  const activeIndex = STATUS_STEPS.findIndex((s) => s.key === mockStatus);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black tracking-tight text-slate-950">Track your order</h1>
      <p className="mt-3 text-base text-slate-600">
        Tracking ID: <span className="font-mono font-bold text-slate-950">{tracking_id}</span>
      </p>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h2 className="text-xl font-bold text-slate-950">Shipment timeline</h2>
        <ol className="mt-6 space-y-0">
          {STATUS_STEPS.map((step, index) => {
            const done = index <= activeIndex;
            const active = index === activeIndex;
            return (
              <li key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-lg ${
                      done
                        ? "border-teal-500 bg-teal-500 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < STATUS_STEPS.length - 1 && (
                    <div className={`mt-1 h-8 w-0.5 ${done ? "bg-teal-400" : "bg-slate-200"}`} />
                  )}
                </div>
                <div className="pb-8 pt-1">
                  <p
                    className={`text-sm font-semibold ${
                      active ? "text-teal-600" : done ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                    {active && (
                      <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
                        Current
                      </span>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>COD reminder:</strong> Please have the exact amount ready for the delivery agent.
        Steadfast accepts cash only at the door.
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/account"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          View all orders
        </Link>
        <Link
          href="/products"
          className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
