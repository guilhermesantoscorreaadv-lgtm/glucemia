import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // We want to initialize a 24h timer when they land on the results page.
    // To make it authentic, let's store the target timestamp in localStorage.
    const storageKey = "glucemia_quiz_countdown_timestamp";
    let targetTime = localStorage.getItem(storageKey);

    if (!targetTime) {
      // 24 hours from now
      const futureTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, futureTime.toString());
      targetTime = futureTime.toString();
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = parseInt(targetTime!, 10) - now;

      if (diff <= 0) {
        // Reset timer to simulate rolling promotional windows (generous for lead conversion)
        const nextFutureTime = Date.now() + 2 * 60 * 60 * 1000; // roll forward 2 hours
        localStorage.setItem(storageKey, nextFutureTime.toString());
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hrs,
        minutes: mins,
        seconds: secs,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl inline-flex items-center gap-2.5 font-sans font-semibold text-sm shadow-sm animate-pulse" id="countdown-timer-box">
      <Timer className="w-5 h-5 text-red-500 animate-spin-slow shrink-0" />
      <span>
        La oferta de <span className="underline">9€</span> caduca en:{" "}
        <span className="font-mono bg-red-100 px-2 py-0.5 rounded text-sm font-bold ml-1 tracking-wider inline-block">
          {formatNumber(timeLeft.hours)}h : {formatNumber(timeLeft.minutes)}m : {formatNumber(timeLeft.seconds)}s
        </span>
      </span>
    </div>
  );
}
