"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const SPEED = 40; // pixels per second — increase/decrease to taste

export default function BestSellers({ direction = "left" }) {
  const bestSellers = products.filter((product) =>
    product.collection?.includes("best-sellers")
  );

  const items = bestSellers.slice(0, 4);
  const marqueeItems = [...items, ...items]; // duplicated for seamless loop

  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const isHovered = useRef(false);

  // Start mid-track when going right, so there's no empty gap on load
  useEffect(() => {
    if (direction === "right" && trackRef.current) {
      x.set(-(trackRef.current.scrollWidth / 2));
    }
  }, [direction]);

  useAnimationFrame((_, delta) => {
    if (isHovered.current || !trackRef.current) return;

    const trackWidth = trackRef.current.scrollWidth / 2; // width of one set
    const moveBy = (SPEED * delta) / 1000;

    let newX = x.get() + (direction === "right" ? moveBy : -moveBy);

    if (direction === "left" && newX <= -trackWidth) newX += trackWidth;
    if (direction === "right" && newX >= 0) newX -= trackWidth;

    x.set(newX);
  });

  return (
    <section className="bg-[var(--background)] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1440px]">

        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Loved by many
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Best Sellers
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              The pieces our customers keep coming back for.
            </p>
          </div>

          <Link
            href="/shop?collection=best-sellers"
            className="hidden items-center gap-1.5 text-sm font-medium sm:flex"
          >
            View all
            <ArrowUpRight size={16} strokeWidth={1.7} />
          </Link>
        </div>

        {/* Auto-scrolling Product Row */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
        >
          <motion.div
            ref={trackRef}
            className="flex w-max gap-3 sm:gap-5"
            style={{ x }}
          >
            {marqueeItems.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="w-[45vw] shrink-0 sm:w-[260px] lg:w-[300px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View All */}
        <Link
          href="/shop?collection=best-sellers"
          className="mt-10 flex items-center justify-center gap-1.5 text-sm font-medium sm:hidden"
        >
          View all
          <ArrowUpRight size={16} strokeWidth={1.7} />
        </Link>
      </div>
    </section>
  );
}