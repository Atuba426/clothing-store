import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-(--background) px-6">
      <div className="w-full max-w-md text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
          <ShoppingBag
            size={25}
            strokeWidth={1.4}
          />
        </div>

        <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.18em] text-(--muted)">
          Shopping Bag
        </p>

        <h1 className="mt-2 text-3xl font-medium tracking-[-0.025em]">
          Your cart is empty
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-(--muted)">
          Looks like you haven&apos;t added anything to your
          cart yet.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-black px-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}