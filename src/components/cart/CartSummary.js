"use client";

import { useContext } from "react";
import Link from "next/link";

import { CartContext } from "@/context/cartContext";

export default function CartSummary() {
  const { cartItems, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <aside className="lg:sticky lg:top-28">

      <div className="border border-black/10 p-6 sm:p-7">

        <h2 className="text-lg font-medium">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4 border-b border-black/10 pb-6">

          <div className="flex items-center justify-between text-sm">
            <span className="text-(--muted)">
              Subtotal
            </span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-(--muted)">
              Shipping
            </span>

            <span className="text-xs">
              Calculated at checkout
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-5">
          <span className="text-sm font-medium">
            Total
          </span>

          <span className="text-lg font-medium">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <Link
          href="/checkout"
          className="flex min-h-12 w-full items-center justify-center bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
        >
          Proceed to Checkout
        </Link>

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 w-full text-xs text-(--muted) underline underline-offset-4 transition hover:text-black"
        >
          Clear Cart
        </button>

        <p className="mt-6 text-center text-[10px] leading-5 text-(--muted)">
          Taxes and shipping charges will be calculated
          at checkout.
        </p>
      </div>
    </aside>
  );
}