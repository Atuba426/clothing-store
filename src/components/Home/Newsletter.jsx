"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    // Frontend only for now.
    console.log("Newsletter email:", email);

    setEmail("");
  };

  return (
    <section className="bg-[#EFEBE4] px-6 py-20 text-[#171717] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[900px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#68645D]">
            Stay in the know
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            A little something in your inbox.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#68645D] sm:text-base">
            Be the first to know about new collections, special releases and
            stories from the brand.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="h-12 min-w-0 flex-1 rounded-full border border-[#CFC9BF] bg-white px-5 text-sm text-[#171717] outline-none placeholder:text-[#8A857D] transition-colors focus:border-[#171717]"
            />

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Subscribe
              <ArrowRight size={16} strokeWidth={1.7} />
            </button>
          </form>

          <p className="mt-4 text-[10px] text-white/35">
            No spam. Just the good stuff.
          </p>
        </motion.div>
      </div>
    </section>
  );
}