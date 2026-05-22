"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "success">("idle");

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch('/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      setOtpSent(true);
      setStatus('sent');
    } catch (err: any) {
      setStatus('idle');
      console.error(err);
      alert(err?.message || 'Failed to send OTP');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, password }),
      });
      if (data?.accessToken) localStorage.setItem('accessToken', data.accessToken);
      setStatus('success');
      router.push('/account');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Login failed');
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, otp }),
      });
      setStatus('success');
      router.push('/account');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'OTP verification failed');
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
      <section className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.72)] lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-400">Buyer access</p>
        <h1 className="mt-5 max-w-lg text-4xl font-black tracking-tight sm:text-5xl">
          Sign in to continue where your cart left off.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
          Amaroo keeps the login flow simple: phone number, password, or a one-time code with a clear path back to
          your orders and checkout.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {[
            "Fast OTP fallback",
            "Bangladesh-friendly phone sign-in",
            "Account and order access",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Sign in</h2>
        <p className="mt-2 text-sm text-slate-500">Use your phone number to sign in or get a one-time code.</p>

        {status === "success" && (
          <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Signed in successfully. Redirecting to your account.
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("password");
              setStatus("idle");
              setOtpSent(false);
            }}
            className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              mode === "password"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("otp");
              setOtpSent(false);
              setStatus("idle");
            }}
            className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              mode === "otp"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
            }`}
          >
            OTP (phone)
          </button>
        </div>

        <form
          onSubmit={
            mode === 'otp' ? (otpSent ? handleVerify : handleSendOtp) : handleSubmit
          }
          className="mt-6 space-y-4"
        >
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Phone number</span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />
          </label>

          {mode === "password" && (
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              <span>Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />
            </label>
          )}

          {mode === "otp" && !otpSent && (
            <div className="rounded-[1.5rem] bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              We&apos;ll send a six-digit code to this number. You can use OTP for faster sign-in on mobile.
            </div>
          )}

          {mode === "otp" && otpSent && (
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              <span>One-time code (6 digits)</span>
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
              <p className="text-xs font-normal text-slate-500">Code expires in 5 minutes.</p>
            </label>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            {mode === "otp" && !otpSent ? "Send code" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          Secure checkout and saved order history are one click away after login.
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-teal-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
