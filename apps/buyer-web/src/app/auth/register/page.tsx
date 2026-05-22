"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const reg = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (reg?.accessToken) localStorage.setItem('accessToken', reg.accessToken);

      await apiFetch('/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone: form.phone }),
      });

      setMessage('Verification code sent to your phone.');
      setStep('otp');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Registration failed');
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ phone: form.phone, otp }),
      });
      router.push('/account');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'OTP verification failed');
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Register with your phone number — we&apos;ll send a one-time verification code.
        </p>

        {message && (
          <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {message}
          </div>
        )}

        {step === "details" ? (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            {(
              [
                { key: "name", label: "Full name", type: "text", placeholder: "Your name" },
                { key: "phone", label: "Phone number", type: "tel", placeholder: "01XXXXXXXXX" },
                { key: "email", label: "Email (optional)", type: "email", placeholder: "you@example.com" },
                { key: "password", label: "Password", type: "password", placeholder: "Min 8 characters" },
              ] as const
            ).map(({ key, label, type, placeholder }) => (
              <label key={key} className="block space-y-2 text-sm font-semibold text-slate-700">
                <span>{label}</span>
                <input
                  type={type}
                  required={key !== "email"}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </label>
            ))}
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Send verification code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">
              A 6-digit code was sent to <strong>{form.phone}</strong>. Enter it below to complete registration.
            </p>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              <span>Verification code</span>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="______"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-teal-500"
              />
              <p className="text-xs font-normal text-slate-500">Code expires in 5 minutes. Rate-limited to 3 per hour.</p>
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Verify &amp; create account
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("details");
                setMessage("");
              }}
              className="w-full text-center text-sm text-slate-500 hover:underline"
            >
              Go back
            </button>
          </form>
        )}

        <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          Your order history, saved addresses, and COD preferences will live here after verification.
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-teal-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <aside className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.72)] lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Why register</p>
        <h2 className="mt-5 text-3xl font-black tracking-tight">Built for repeat shopping and faster checkout.</h2>
        <div className="mt-8 space-y-4">
          {[
            "Track deliveries from your account",
            "Save multiple addresses across Dhaka and nationwide",
            "Access buyer-only offers and wishlist reminders",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
