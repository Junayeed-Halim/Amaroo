import Link from "next/link";

interface Props {
  searchParams: Promise<{ order_id?: string; order_number?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderId = params.order_id ?? "";
  const orderNumber = params.order_number ?? "—";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-4xl">
        ✓
      </div>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">Order placed!</h1>
      <p className="mt-4 text-lg text-slate-600">
        Your order <strong className="text-slate-950">{orderNumber}</strong> has been confirmed. We
        will notify you when it ships.
      </p>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 text-left shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h2 className="text-xl font-bold text-slate-950">What happens next?</h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">1</span>
            <span>Your seller confirms stock and prepares the parcel (usually within 24 h).</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">2</span>
            <span>Steadfast picks up the parcel. You will get an SMS with a tracking number.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">3</span>
            <span>Delivery within 1–3 days inside Dhaka, 2–5 days outside Dhaka.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">4</span>
            <span>Pay the courier on delivery (COD) or confirm if you already paid online.</span>
          </li>
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {orderId && (
          <Link
            href={`/account/orders`}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Track my order
          </Link>
        )}
        <Link
          href="/products"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
