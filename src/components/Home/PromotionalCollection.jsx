"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { promotionalSection } from "@/data/promotional-section";
import { products } from "@/data/products";

export default function StickyCollection() {
  const [activeGender, setActiveGender] = useState("men");
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = promotionalSection.collections[activeGender];

  const activeCategory = categories[activeIndex];

  // Find a real product for the current category
  const featuredProduct = useMemo(() => {
    const gender = activeGender === "men" ? "Men" : "Women";

    return products.find(
      (product) =>
        product.gender === gender &&
        product.category === activeCategory.name &&
        product.isActive &&
        product.stock > 0 &&
        product.images?.length > 0
    );
  }, [activeGender, activeCategory]);

  // Scroll → category
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("sticky-collection");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollableHeight =
        section.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
      );

      const index = Math.min(
        Math.floor(progress * categories.length),
        categories.length - 1
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categories.length]);

  const changeGender = (gender) => {
    setActiveGender(gender);
    setActiveIndex(0);
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      id="sticky-collection"
      className="relative bg-[#f7f5f0]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-8xl px-6 py-14 md:px-10">

          {/* ================= HEADER ================= */}
          <div className="mb-10 flex flex-col justify-between gap-8 border-b border-neutral-200 pb-8 md:flex-row md:items-end">

            <div>
              <p className="mb-3 flex items-center gap-2 font-sans text-sm text-neutral-500">
                <span className="h-[5px] w-[5px] rounded-full bg-neutral-900" />
                {promotionalSection.eyebrow}
              </p>

              <h2 className="max-w-xl font-serif text-4xl italic leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                {promotionalSection.title}
              </h2>

              <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-neutral-500 md:text-base">
                {promotionalSection.description}
              </p>
            </div>

            {/* ================= MEN / WOMEN ================= */}
            <div className="flex w-fit gap-8">
              {["men", "women"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => changeGender(gender)}
                  className={`relative pb-2 font-sans text-sm capitalize transition-colors duration-300 ${
                    activeGender === gender
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {gender}
                  {activeGender === gender && (
                    <motion.span
                      layoutId="gender-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-neutral-900"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ================= MAIN SHOWCASE ================= */}
          <div className="grid min-h-[56vh] gap-10 md:grid-cols-[0.8fr_1.4fr]">

            {/* ================= LEFT INFO ================= */}
            <div className="relative flex flex-col justify-between py-2">

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeGender}-${activeIndex}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="font-sans text-sm text-neutral-400">
                    {activeGender} — {activeCategory.number}
                  </span>

                  {/* Category */}
                  <h3 className="mt-4 font-serif text-5xl italic leading-[0.95] tracking-tight text-neutral-900 md:text-7xl">
                    {activeCategory.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 max-w-sm font-sans text-sm leading-6 text-neutral-500">
                    {activeCategory.description}
                  </p>

                  {/* Product details */}
                  {featuredProduct && (
                    <div className="mt-8 border-t border-neutral-200 pt-5">

                      <p className="font-sans text-xs text-neutral-400">
                        Featured piece
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-4">
                        <div>
                          <h4 className="font-serif text-base text-neutral-900">
                            {featuredProduct.name}
                          </h4>

                          <p className="mt-1 font-sans text-sm text-neutral-600">
                            ₹{featuredProduct.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-sans text-sm text-neutral-800">
                            ★ {featuredProduct.rating}
                          </p>

                          <p className="mt-1 font-sans text-xs text-neutral-400">
                            {featuredProduct.reviewCount} reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={activeCategory.href}
                    className="group mt-8 inline-flex flex-col font-sans text-sm text-neutral-900"
                  >
                    {activeCategory.cta}
                    <span className="mt-1 h-px w-full origin-left scale-x-100 bg-neutral-900 transition-transform duration-300 group-hover:scale-x-[1.15]" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* ================= PROGRESS ================= */}
              <div className="mt-10 flex items-center gap-4">
                <div className="relative h-px flex-1 bg-neutral-300">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-neutral-900"
                    animate={{
                      width: `${((activeIndex + 1) / categories.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                <span className="font-sans text-xs tabular-nums text-neutral-400">
                  {pad(activeIndex + 1)} / {pad(categories.length)}
                </span>
              </div>
            </div>

            {/* ================= IMAGE ================= */}
            <div className="relative min-h-[46vh] overflow-hidden border border-neutral-200 bg-neutral-200 md:min-h-[56vh]">

              <AnimatePresence mode="wait">
                {featuredProduct?.images?.[0] && (
                  <motion.img
                    key={`${activeGender}-${activeIndex}`}
                    src={featuredProduct.images[0]}
                    alt={
                      featuredProduct.name ||
                      activeCategory.imageAlt
                    }
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </AnimatePresence>

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Product badge */}
              {featuredProduct?.badge && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeGender}-${activeIndex}-badge`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-5 left-5 border-t border-neutral-100 pt-1 font-serif text-sm italic text-white"
                  >
                    {featuredProduct.badge}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll distance */}
      <div className="h-[400vh]" />
    </section>
  );
}