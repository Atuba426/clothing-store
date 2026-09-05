
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
      name: "Aarohi Mehta",
      location: "Mumbai",
      rating: 5,
      review:
        "The quality is honestly better than I expected. The fit, fabric and finishing are beautiful.",
      product: "Oversized Cotton Shirt",
    },
    {
      name: "Riya Sharma",
      location: "Delhi",
      rating: 4.5,
      review:
        "Finally found something that looks exactly like the pictures. The fit is perfect.",
      product: "Relaxed Fit T-Shirt",
    },
    {
      name: "Ananya Kapoor",
      location: "Bangalore",
      rating: 4,
      review:
        "The fabric feels premium and the packaging was so thoughtfully done. Definitely ordering again.",
      product: "Classic Linen Dress",
    },
    {
      name: "Sara Khan",
      location: "Pune",
      rating: 4.5,
      review:
        "I love how effortless the pieces look. Simple, comfortable and still very stylish.",
      product: "Wide Leg Trousers",
    },
    {
      name: "Meera Patel",
      location: "Ahmedabad",
      rating: 5,
      review:
        "One of the best online clothing purchases I've made. The quality really stands out.",
      product: "Premium Denim",
    },
    {
      name: "Nisha Verma",
      location: "Hyderabad",
      rating: 3.5,
      review:
        "Beautiful clothes with an amazing fit. Everything feels carefully designed.",
      product: "Essential Shirt",
    },
  ];

function ReviewCard({ review }) {
  return (
    <div
      className="
        group
        w-77.5 sm:w-90 lg:w-97.5
        shrink-0
        rounded-[28px]
        border border-black/[0.07]
        bg-white
        p-6 sm:p-7
        shadow-[0_12px_40px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]
      "
    >
      {/* Top */}
      <div className="flex gap-1">
  {[1, 2, 3, 4, 5].map((star) => {
    const filled = review.rating >= star;
    const half = review.rating === star - 0.5;

    return (
      <div key={star} className="relative">
        <Star
          size={15}
          className="text-yellow-300/15"
          fill="currentColor"
        />

        {filled && (
          <Star
            size={15}
            className="absolute inset-0 text-yellow-300"
            fill="currentColor"
          />
        )}

        {half && (
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              size={15}
              className="text-yellow-300"
              fill="currentColor"
            />
          </div>
        )}
      </div>
    );
  })}
</div>

      {/* Review */}
      <p className="mt-6 text-[15px] sm:text-[16px] leading-7 text-black/70">
        “{review.review}”
      </p>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-black/[0.07]" />

      {/* Customer */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-medium text-[15px] text-black">
            {review.name}
          </p>

          <p className="mt-1 text-xs text-black/45">
            {review.location}
          </p>
        </div>

        <p className="text-right text-[11px] uppercase tracking-[0.12em] text-black/40">
          {review.product}
        </p>
      </div>
    </div>
  );
}

export default function Reviews() {
  // Duplicate the reviews to create a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-[#f8f7f3] py-20 sm:py-24 lg:py-28">
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-7xl px-5 text-center sm:mb-16">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-black/45">
          Customer Stories
        </p>

        <h2 className="text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl lg:text-5xl">
          Loved by people
          <br className="sm:hidden" /> who wear it.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/50 sm:text-base">
          Real people. Real experiences. Discover why our pieces have
          become part of their everyday wardrobe.
        </p>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-[#f8f7f3] to-transparent sm:w-28" />

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-[#f8f7f3] to-transparent sm:w-28" />

      {/* Infinite marquee */}
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-5 sm:gap-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          whileHover={{
            animationPlayState: "paused",
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              review={review}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom trust line */}
      <div className="mt-12 flex items-center justify-center gap-3 text-xs text-black/40 sm:mt-16">
        <div className="h-px w-8 bg-black/10" />
        <span>Thousands of happy customers</span>
        <div className="h-px w-8 bg-black/10" />
      </div>
    </section>
  );
}

