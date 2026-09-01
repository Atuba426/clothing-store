"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { heroSlides } from "@/data/hero";

const SLIDE_DURATION = 2800;

const textVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentSlide = heroSlides[active];

  /*
   * Auto-advance
   */
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((previous) => (previous + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative h-[calc(100svh-72px)] min-h-[560px] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-end sm:items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-10 sm:pb-0 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              className="max-w-2xl text-white"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Eyebrow */}
              <motion.p
                custom={0}
                variants={textVariants}
                className="text-xs font-semibold tracking-[0.2em] text-white/80"
              >
                {currentSlide.eyebrow}
              </motion.p>

              {/* Heading */}
              <motion.h1
                custom={0.12}
                variants={textVariants}
                className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
              >
                {currentSlide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={0.26}
                variants={textVariants}
                className="mt-5 max-w-md font-serif text-base italic leading-relaxed text-white/85 sm:text-lg"
              >
                {currentSlide.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                custom={0.4}
                variants={textVariants}
                className="mt-8"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Link
                    href={currentSlide.href}
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[var(--foreground)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.22)]"
                  >
                    {currentSlide.cta}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-7 left-0 right-0 z-20 flex justify-center gap-2.5 px-6">
        {heroSlides.map((slide, index) => {
          const isActive = index === active;
          const isCompleted = index < active;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className="relative h-[3px] w-9 overflow-hidden rounded-full bg-white/30 sm:w-11"
            >
              {/* Completed slides */}
              {isCompleted && (
                <span className="absolute inset-0 bg-white" />
              )}

              {/* Active slide */}
              {isActive && (
                <motion.span
                  key={`progress-${slide.id}`}
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{
                    width: paused ? "55%" : "100%",
                  }}
                  transition={{
                    duration: paused
                      ? 0.2
                      : SLIDE_DURATION / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}