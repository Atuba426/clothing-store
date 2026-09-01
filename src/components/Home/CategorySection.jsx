"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { featuredCategories } from "@/data/featuredCategories";

export default function CategorySection() {
  return (
    <section className="bg-(--background) px-6 py-10 sm:px-10 lg:px-6">
      <div className="mx-auto max-w-300">
        {/* Compact heading row */}
        <div className="mb-5 flex items-baseline justify-between sm:mb-6">
          <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <Link
  href="/shop"
  className="group inline-flex items-center gap-1 text-sm font-medium text-(--foreground) transition-colors sm:text-base"
>
  <span className="relative">
    View all
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-(--foreground) transition-all duration-300 group-hover:w-full" />
  </span>
  <ArrowUpRight
    size={16}
    strokeWidth={2}
    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  />
</Link>
        </div>

        {/* Compact two-up panels */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-50">
          {featuredCategories.map((category) => (
            <div
              key={category.id}
              className="group relative h-80 overflow-hidden rounded-xl sm:h-105 lg:h-120"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 50vw, 40vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                priority
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-4 sm:gap-3 sm:p-6">
                <h3 className="font-serif text-2xl text-white sm:text-3xl lg:text-4xl">
                  {category.title}
                </h3>

                <Link
                  href={category.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-colors duration-200 hover:bg-white/90 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Shop now
                  <ArrowUpRight size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}