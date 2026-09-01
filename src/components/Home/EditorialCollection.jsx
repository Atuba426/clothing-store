"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { editorialCollection } from "@/data/editorial";

export default function EditorialCollection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[620px] w-full sm:min-h-[680px] lg:min-h-[760px]">
        {/* Background Image */}
        <Image
          src={editorialCollection.image}
          alt={editorialCollection.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[620px] items-end sm:min-h-[680px] lg:min-h-[760px]">
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-2xl text-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {editorialCollection.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                {editorialCollection.title}
              </h2>

              <p className="mt-5 max-w-lg font-serif text-base italic leading-relaxed text-white/80 sm:text-lg">
                {editorialCollection.description}
              </p>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-block"
              >
                <Link
                  href={editorialCollection.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[var(--foreground)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.22)]"
                >
                  {editorialCollection.cta}
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