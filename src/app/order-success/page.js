import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-(--background) px-6">
      <div className="w-full max-w-130 text-center">

        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
          <Check
            size={28}
            strokeWidth={1.5}
          />
        </div>

        {/* Message */}
        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-(--muted)">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          Thank you for your order
        </h1>

        <p className="mx-auto mt-4 max-w-105 text-sm leading-6 text-(--muted)">
          Your order has been successfully placed. We&apos;ll send you
          updates about your order and delivery shortly.
        </p>

        {/* Order Status */}
        <div className="mx-auto mt-8 border border-black/10 p-5 text-left">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
            />

            <div>
              <p className="text-sm font-medium">
                Order received
              </p>

              <p className="mt-1 text-xs text-(--muted)">
                We&apos;ve received your order and will begin processing it.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/"
            className="flex h-12 items-center justify-center bg-black px-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
          >
            Continue Shopping
          </Link>

          <Link
            href="/all-orders"
            className="flex h-12 items-center justify-center border border-black px-7 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
          >
            View Orders
          </Link>

        </div>

      </div>
    </main>
  );
}