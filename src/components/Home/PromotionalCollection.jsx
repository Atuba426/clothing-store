"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { promotionalSection } from "@/data/promotional-section";

export default function PromotionalSection() {
  return (
    <section className="bg-(--background) px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-360">
        <div className="grid overflow-hidden bg-[#F1EFEB] lg:grid-cols-2">
          
          {/* Image */}
          <div className="group relative aspect-4/5 overflow-hidden sm:aspect-5/4 lg:aspect-auto lg:min-h-170">
            <Image
              src={promotionalSection.image}
              alt={promotionalSection.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Content */}
          <div className="flex items-center px-7 py-14 sm:px-12 sm:py-16 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
                {promotionalSection.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {promotionalSection.title}
              </h2>

              <p className="mt-6 max-w-md font-serif text-base italic leading-relaxed text-(--muted) sm:text-lg">
                {promotionalSection.description}
              </p>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className="mt-9"
              >
                <Link
                  href={promotionalSection.href}
                  className="inline-flex items-center gap-2 border-b border-(--foreground) pb-1.5 text-sm font-medium"
                >
                  {promotionalSection.cta}
                  <ArrowUpRight size={16} strokeWidth={1.7} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}