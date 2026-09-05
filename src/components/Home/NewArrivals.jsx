"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { products } from "@/data/products";
import ProductCard from "../Products/ProductCard";

export default function NewArrivals() {
  return (
    <section className="bg-(--background) px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-18">
      <div className="mx-auto max-w-360">

        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              Fresh from the collection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-(--muted) sm:text-base">
              The latest pieces designed to become part of your everyday
              wardrobe.
            </p>
          </div>

          <Link
            href="/shop?collection=new-arrivals"
            className="hidden items-center gap-1.5 text-sm font-medium sm:flex"
          >
            View all
            <ArrowUpRight size={16} strokeWidth={1.7} />
          </Link>
        </div>
{/* Product Grid */}
<div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
  {products
    .filter((product) => product.collection?.includes("new-arrivals"))
    .slice(0, 8)
    .map((product, index) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ProductCard product={product} />
      </motion.div>
    ))}
</div>

        {/* Mobile View All */}
        <Link
          href="/shop?collection=new-arrivals"
          className="mt-10 flex items-center justify-center gap-1.5 text-sm font-medium sm:hidden"
        >
          View all
          <ArrowUpRight size={16} strokeWidth={1.7} />
        </Link>
      </div>
    </section>
  );
}