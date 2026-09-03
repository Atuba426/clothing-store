"use client";

import { useContext } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {getCartItemKey} from "@/context/cartContext";
import { CartContext } from "@/context/cartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

export default function CartPage() {
  const { cartItems, isHydrated } = useContext(CartContext);

  // Prevent rendering cart data before localStorage has loaded
  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-(--background)">
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-10">
          <div className="h-8 w-40 animate-pulse bg-black/5" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <div className="h-32 animate-pulse bg-black/5" />
              <div className="h-32 animate-pulse bg-black/5" />
            </div>

            <div className="h-64 animate-pulse bg-black/5" />
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-(--background)">
      <div className="mx-auto max-w-360 px-6 py-12 sm:py-16 lg:px-10 lg:py-20">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-(--muted)">
              Shopping Bag
            </p>

            <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
              Your Cart
            </h1>
          </div>

          <Link
            href="/"
            className="hidden items-center gap-2 text-xs font-medium sm:flex"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Cart Content */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-16">

          {/* Items */}
          <div>
            <div className="divide-y divide-black/10">
              {cartItems.map((item) => (
                <CartItem
                key={getCartItemKey(item)}
                  item={item}
                />
              ))}
            </div>

            {/* Mobile Continue Shopping */}
            <Link
              href="/"
              className="mt-8 flex items-center gap-2 text-xs font-medium sm:hidden"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <CartSummary />
        </div>
      </div>
    </main>
  );
}