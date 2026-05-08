"use client";

import { useEffect, useState } from "react";

function getTimeLeft(endAt: string) {
  const difference = Math.max(0, new Date(endAt).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);

  return {
    expired: totalSeconds <= 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function FlashSaleTimer({ endAt }: { endAt: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  if (timeLeft.expired) {
    return (
      <p className="rounded-xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100">
        This flash sale has ended.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Flash sale countdown timer">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
          <p className="text-xl font-black tracking-tight text-white sm:text-2xl">{String(item.value).padStart(2, "0")}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/80">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
