"use client";

import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  "FREE SHIPPING ON ORDERS OVER ₹1999",
  "NEW SEASON — NOW LIVE",
  "COD AVAILABLE ACROSS INDIA",
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-[60] flex min-h-[34px] items-center justify-center bg-[var(--foreground)] px-10 py-2 text-center text-[10px] font-medium tracking-[0.14em] text-white sm:text-[11px]">
      <p>{announcements[active]}</p>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 transition-colors hover:text-white sm:right-5"
      >
        <X size={14} strokeWidth={1.7} />
      </button>
    </div>
  );
}