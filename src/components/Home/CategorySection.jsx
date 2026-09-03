"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCategories } from "@/data/featuredCategories";

export default function CategorySection() {
  return (
    <section className="bg-(--background) px-6 py-10 sm:px-10 lg:px-6">
      <div className="mx-auto max-w-300">
        {/* Heading */}
        <div className="mb-5 flex items-baseline justify-between sm:mb-6">
          <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
            Shop by category
          </h2>

         
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {featuredCategories.map((category) => {
            // Explicit routes
            const href =
              category.title.toLowerCase() === "men"
                ? "/men"
                : category.title.toLowerCase() === "women"
                  ? "/women"
                  : category.href;

            return (
              <Link
                key={category.id}
                href={href}
                className="group relative block h-80 overflow-hidden rounded-xl sm:h-105 lg:h-120"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 40vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  priority
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-4 sm:gap-3 sm:p-6">
                  <h3 className="font-serif text-2xl text-white sm:text-3xl lg:text-4xl">
                    {category.title}
                  </h3>

                  {/* Shop Now */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-colors duration-200 group-hover:bg-white/90 sm:px-4 sm:py-2 sm:text-sm">
                    Shop now
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
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