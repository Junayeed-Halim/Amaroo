"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call POST /api/v1/auth/otp/send
    setOtpSent(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call POST /api/v1/auth/login or POST /api/v1/auth/otp/verify
    // then store tokens and redirect.
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.28)]">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-500">
          Use your phone number to sign in or get a one-time code.
        </p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("password")}
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
            onClick={() => { setMode("otp"); setOtpSent(false); }}
            className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              mode === "otp"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
            }`}
          >
            OTP (phone)
          </button>
        </div>

        <form onSubmit={mode === "otp" && !otpSent ? handleSendOtp : handleSubmit} className="mt-6 space-y-4">
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
