"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishlistPage() {
  const {
    wishlistItems,
    wishlistCount,
    isHydrated,
    removeFromWishlist,
    clearWishlist,
  } = useContext(WishlistContext);

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-(--background)">
        <div className="mx-auto max-w-300 px-6 py-20 lg:px-10">
          <p className="text-sm text-(--muted)">
            Loading wishlist...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto max-w-300 px-6 pb-20 pt-10 sm:px-10 lg:px-10 lg:pb-28 lg:pt-14">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="flex items-end justify-between border-b border-(--border) pb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              Your favorites
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Wishlist
            </h1>

            <p className="mt-3 text-sm text-(--muted)">
              {wishlistCount}{" "}
              {wishlistCount === 1 ? "item" : "items"} saved
            </p>
          </div>

          {wishlistCount > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="hidden text-xs font-semibold uppercase tracking-[0.1em] text-(--muted) underline underline-offset-4 transition-colors hover:text-black sm:block"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {/* =========================================
            EMPTY STATE
        ========================================= */}
        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <Heart
                  size={26}
                  strokeWidth={1.4}
                />
              </div>

              <h2 className="mt-6 text-xl font-medium">
                Your wishlist is empty
              </h2>

              <p className="mt-2 text-sm leading-6 text-(--muted)">
                Save the pieces you love and come back to them whenever
                you&apos;re ready.
              </p>

              <Link
                href="/collection"
                className="mt-7 inline-flex items-center gap-2 bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
              >
                <ShoppingBag size={15} />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="pt-8">

            {/* Mobile clear */}
            <div className="mb-5 flex justify-end sm:hidden">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-(--muted) underline underline-offset-4"
              >
                Clear Wishlist
              </button>
            </div>

            {/* =========================================
                WISHLIST ITEMS
            ========================================= */}
            <div className="space-y-3">
              {wishlistItems.map((product) => (
                <article
                  key={product.id}
                  className="group relative flex min-h-[150px] overflow-hidden border border-(--border) bg-white transition-colors hover:border-black/25 sm:min-h-[175px]"
                >
                  {/* IMAGE */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-28 shrink-0 overflow-hidden bg-[#f1efeb] sm:w-36 md:w-40"
                  >
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    )}

                    {product.badge && (
                      <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] sm:left-3 sm:top-3">
                        {product.badge}
                      </span>
                    )}
                  </Link>

                  {/* PRODUCT INFO */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-6">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-(--muted)">
                        {product.category}
                      </p>

                      <Link
                        href={`/product/${product.id}`}
                        className="mt-1.5 block max-w-xl text-sm font-medium leading-snug hover:opacity-60 sm:text-base"
                      >
                        {product.name}
                      </Link>

                      {product.subcategory && (
                        <p className="mt-1 text-xs text-(--muted)">
                          {product.subcategory}
                        </p>
                      )}

                      {/* Optional color */}
                      {product.colors?.length > 0 && (
                        <p className="mt-2 hidden text-xs text-(--muted) sm:block">
                          Color: {product.colors[0]}
                        </p>
                      )}
                    </div>

                    {/* PRICE + ACTIONS */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center gap-2">
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromWishlist(product.id)
                          }
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="flex h-9 w-9 items-center justify-center border border-black/10 transition-colors hover:border-black hover:bg-black hover:text-white"
                        >
                          <Trash2
                            size={15}
                            strokeWidth={1.5}
                          />
                        </button>

                        {/* View product */}
                        <Link
                          href={`/product/${product.id}`}
                          aria-label={`View ${product.name}`}
                          className="flex h-9 w-9 items-center justify-center border border-black bg-black text-white transition-opacity hover:opacity-75"
                        >
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.5}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Desktop wishlist icon */}
                  <div className="absolute right-5 top-5 hidden sm:block">
                    <Heart
                      size={17}
                      strokeWidth={1.5}
                      className="fill-red-800 text-red-800"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}