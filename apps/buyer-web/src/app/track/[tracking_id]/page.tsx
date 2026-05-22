import Link from "next/link";

interface Props {
  params: Promise<{ tracking_id: string }>;
}

const STATUS_STEPS = [
  { key: "created", label: "Order placed", icon: "📦" },
  { key: "picked_up", label: "Picked up by courier", icon: "🚴" },
  { key: "in_transit", label: "In transit", icon: "🚚" },
  { key: "out_for_delivery", label: "Out for delivery", icon: "📍" },
  { key: "delivered", label: "Delivered", icon: "✓" },
];

const SHIPMENTS = [
  {
    key: "created",
    courier: "Steadfast",
    hub: "Dhaka South Hub",
    eta: "Tomorrow, 2:30 PM",
    payment: "Cash on delivery",
    note: "Shipment accepted and waiting for courier pickup.",
  },
  {
    key: "picked_up",
    courier: "Pathao",
    hub: "Uttara Sort Facility",
    eta: "Today, evening",
    payment: "bKash verified",
    note: "Courier scan completed and parcel is moving to the next hub.",
  },
  {
    key: "in_transit",
    courier: "REDX",
    hub: "Gazipur Transit Hub",
    eta: "Today, 8:00 PM",
    payment: "SSLCommerz paid",
    note: "Parcel is in transit between hubs and scheduled for the evening linehaul.",
  },
  {
    key: "out_for_delivery",
    courier: "Paperfly",
    hub: "Final delivery route",
    eta: "Today, 4:30 PM",
    payment: "Cash on delivery",
    note: "Rider is on the way and will call before arrival.",
  },
  {
    key: "delivered",
    courier: "Sundarban",
    hub: "Delivered to recipient",
    eta: "Completed",
    payment: "Paid",
    note: "Delivery was completed and the order is closed.",
  },
];

function getMockShipment(trackingId: string) {
  const index = trackingId.length % SHIPMENTS.length;

  return SHIPMENTS[index];
}

export default async function TrackPage({ params }: Props) {
  const { tracking_id } = await params;
  const shipment = getMockShipment(tracking_id);
  const mockStatus = shipment.key;
  const activeIndex = STATUS_STEPS.findIndex((s) => s.key === mockStatus);
  const completed = mockStatus === "delivered";

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
      <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-teal-600">Live tracking</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Track your order</h1>
        <p className="mt-3 text-base leading-8 text-slate-600">
        Tracking ID: <span className="font-mono font-bold text-slate-950">{tracking_id}</span>
        </p>

        <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Current status</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">{STATUS_STEPS[activeIndex].label}</h2>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              ETA: {shipment.eta}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { label: "Courier", value: shipment.courier },
              { label: "Last hub", value: shipment.hub },
              { label: "Payment", value: shipment.payment },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
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
                          : "border-slate-200 bg-white text-slate-400"
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
      </section>

      <aside className="h-fit rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.72)] lg:sticky lg:top-36">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Delivery summary</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight">{completed ? "Delivered successfully" : "On the way"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{shipment.note}</p>

        <div className="mt-8 space-y-4">
          {[
            { label: "Recipient", value: "Tania Rahman" },
            { label: "Service", value: shipment.courier },
            { label: "Support", value: "24/7 buyer care" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-amber-300/20 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
          <strong>COD reminder:</strong> Please have the exact amount ready for the delivery agent.
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/account"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
          >
            View all orders
          </Link>
          <Link
            href="/products"
            className="rounded-2xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
          >
            Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
