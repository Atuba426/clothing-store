"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  MapPin,
  Package,
  Heart,
  UserRound,
  Settings,
  ArrowRight,
  X,
} from "lucide-react";

export default function AccountDashboard() {
  const [showSuccess, setShowSuccess] = useState(true);

  // Hide success message automatically after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">

       {/* =====================================================
    SUCCESS POPUP
===================================================== */}
{showSuccess && (
  <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 px-5 backdrop-blur-sm">
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

      {/* Colorful top section */}
      <div className="relative overflow-hidden bg-linear-to-br from-violet-50 via-fuchsia-50 to-orange-100 px-6 pb-10 pt-10 text-black">

        {/* Decorative circles */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blend-color/15" />
        <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-black-300/20" />
        <div className="absolute right-10 bottom-5 h-12 w-12 rounded-full bg-white/10" />

        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowSuccess(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-md transition hover:bg-black/25"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Success icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-green-500">
            <Check
              size={30}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>
        </div>

        <div className="relative mt-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
            Registration Complete
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Congratulations! 🎉
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-black/85">
            Your account has been successfully created.
          </p>
        </div>
      </div>

      {/* Bottom content */}
      <div className="px-6 py-7 text-center">
        <p className="text-sm leading-6 text-gray-600">
          Welcome to <span className="font-semibold text-black">LOGO</span>.
          Your account is ready. You can now manage your orders, wishlist,
          addresses, and personal information.
        </p>

        {/* Dashboard button */}
        <Link
          href="/account/dashboard"
          onClick={() => setShowSuccess(false)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-neutral-800"
        >
          Go to My Account
          <ArrowRight size={15} strokeWidth={1.8} />
        </Link>

        <p className="mt-4 text-[11px] text-gray-400">
          This message will close automatically in 5 seconds.
        </p>
      </div>
    </div>
  </div>
)}

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="border-b border-(--border) pb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm text-(--muted)">
            Manage your account, orders, wishlist, and saved information.
          </p>
        </div>

        {/* =====================================================
            PROFILE
        ===================================================== */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
                Profile
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Personal Information
              </h2>
            </div>

            <Link
              href="/account/profile"
              className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Edit
            </Link>
          </div>

          <div className="border border-(--border) bg-white p-6">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <UserRound
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Your Name
                </p>

                <p className="mt-1 text-xs text-(--muted)">
                  your@email.com
                </p>

                <p className="mt-1 text-xs text-(--muted)">
                  +91 XXXXX XXXXX
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK ACCESS
        ===================================================== */}
        <section className="mt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
            Quick Access
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Orders */}
            <Link
              href="/orders"
              className="group border border-(--border) bg-white p-6 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center bg-neutral-100">
                  <Package size={19} strokeWidth={1.5} />
                </div>

                <ChevronRight
                  size={18}
                  className="text-(--muted) transition-transform group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-6 text-base font-medium">
                My Orders
              </h3>

              <p className="mt-1 text-xs text-(--muted)">
                Track and manage your orders
              </p>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="group border border-(--border) bg-white p-6 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center bg-neutral-100">
                  <Heart size={19} strokeWidth={1.5} />
                </div>

                <ChevronRight
                  size={18}
                  className="text-(--muted) transition-transform group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-6 text-base font-medium">
                Wishlist
              </h3>

              <p className="mt-1 text-xs text-(--muted)">
                View your saved products
              </p>
            </Link>

            {/* Settings */}
            <Link
              href="/account/settings"
              className="group border border-(--border) bg-white p-6 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center bg-neutral-100">
                  <Settings size={19} strokeWidth={1.5} />
                </div>

                <ChevronRight
                  size={18}
                  className="text-(--muted) transition-transform group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-6 text-base font-medium">
                Account Settings
              </h3>

              <p className="mt-1 text-xs text-(--muted)">
                Manage your account preferences
              </p>
            </Link>

          </div>
        </section>

        {/* =====================================================
            RECENT ORDERS
        ===================================================== */}
        <section className="mt-14">
          <div className="flex items-end justify-between border-b border-(--border) pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
                Orders
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Recent Orders
              </h2>
            </div>

            <Link
              href="/orders"
              className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-(--border) border-b border-(--border)">

            {/* Order 1 */}
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-neutral-100">
                  <Package size={18} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    #ORD-1024
                  </p>

                  <p className="mt-1 text-xs text-(--muted)">
                    2 items · ₹2,499
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:justify-end">

                <span className="text-xs font-medium">
                  Delivered
                </span>

                <Link
                  href="/all-orders"
                  className="text-xs underline underline-offset-4"
                >
                  View Order
                </Link>

              </div>
            </div>

            {/* Order 2 */}
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-neutral-100">
                  <Package size={18} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    #ORD-1021
                  </p>

                  <p className="mt-1 text-xs text-(--muted)">
                    1 item · ₹1,899
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:justify-end">

                <span className="text-xs font-medium">
                  Processing
                </span>

                <Link
                  href="/orders/1021"
                  className="text-xs underline underline-offset-4"
                >
                  View Order
                </Link>

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            SAVED ADDRESS
        ===================================================== */}
        <section className="mt-14">
          <div className="flex items-end justify-between border-b border-(--border) pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
                Delivery
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Saved Address
              </h2>
            </div>

            <Link
              href="/address"
              className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Manage
            </Link>
          </div>

          <div className="mt-5 border border-(--border) bg-white p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
                <MapPin size={18} strokeWidth={1.5} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Home
                </p>

                <p className="mt-2 max-w-md text-xs leading-5 text-(--muted)">
                  Your saved delivery address will appear here.
                  Add an address during checkout or from your account.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            ACCOUNT LINKS
        ===================================================== */}
        <section className="mt-14 border-t border-(--border) pt-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium">
                Need to manage something?
              </p>

              <p className="mt-1 text-xs text-(--muted)">
                Update your profile, addresses, and account preferences.
              </p>
            </div>

            <Link
              href="/account/settings"
              className="flex items-center justify-center gap-2 border border-black/15 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-black hover:text-white"
            >
              Account Settings
              <ChevronRight size={15} />
            </Link>

          </div>

        </section>

      </section>
    </main>
  );
}