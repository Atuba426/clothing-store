"use client";

import { useMemo } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import Image from "next/image";

// Visual weighting for each of the 6 tiles in the bento grid, in order.
// Sums to 6 columns per row (3+2+1 / 1+2 / 3) so the CSS grid packs cleanly.
const TILE_SPANS = [
  "md:col-span-3 md:row-span-3", // hero
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-3 md:row-span-1",
];

export default function TrendingSection() {
  // Pull trending products, falling back to top-rated if none are flagged
  const trendingProducts = useMemo(() => {
    const flagged = products.filter(
      (product) =>
        product.trending &&
        product.isActive &&
        product.stock > 0 &&
        product.images?.length > 0
    );

    if (flagged.length > 0) return flagged.slice(0, 6);

    return [...products]
      .filter(
        (product) =>
          product.isActive && product.stock > 0 && product.images?.length > 0
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, [products]);

  const pad = (n) => String(n).padStart(2, "0");

  if (trendingProducts.length === 0) return null;

  return (
    <section className="relative bg-[#f7f5f0] px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-neutral-200 pb-4 md:flex-row md:items-end">

          <div>
            <p className="mb-1 flex items-center gap-2 font-sans text-xs text-neutral-500">
              <span className="h-1 w-1 rounded-full bg-neutral-900" />
              Right now
            </p>

            <h2 className="max-w-xl font-serif text-3xl italic leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
              Trending this week
            </h2>
          </div>

          <p className="max-w-xs font-sans text-xs leading-5 text-neutral-500">
            The six pieces everyone&apos;s adding to cart, ranked by
            this week&apos;s movement.
          </p>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="grid grid-cols-1 gap-3 md:grid-flow-row-dense md:grid-cols-6 md:grid-rows-3 md:gap-3 md:h-125 md:*:h-full">
          {trendingProducts.map((product, index) => {
            const isHero = index === 0;

            return (
              <Link
                key={product.id ?? `${product.name}-${index}`}
                href={
                  product.href ?? `/product/${product.id}`
                }
                className={`group relative block overflow-hidden border border-neutral-200 bg-neutral-200 ${
                  isHero ? "aspect-4/5 md:aspect-auto" : "aspect-4/3 md:aspect-auto"
                } ${TILE_SPANS[index] ?? "md:col-span-2 md:row-span-1"}`}
              >
                <Image
                  fill
                  src={product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0" />

                {/* Rank */}
                <span className="absolute left-3 top-3 font-sans text-xs text-white/80">
                  {pad(index + 1)}
                </span>

                {/* Caption */}
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                  <h3
                    className={`font-serif italic leading-tight text-white ${
                      isHero ? "text-xl md:text-2xl" : "text-base md:text-lg"
                    }`}
                  >
                    {product.name}
                  </h3>

                  <span className="whitespace-nowrap font-sans text-xs text-white/90">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}