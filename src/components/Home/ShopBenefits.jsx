"use client";

import { Truck, RotateCcw, ShieldCheck, Banknote } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ₹1999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple 7-day returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure checkout",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Available across India",
  },
];

export default function ShopBenefits() {
  return (
    <section className="border-y border-(--border) bg-(--background)">
      <div className="mx-auto grid max-w-360 grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="flex flex-col items-center border-b border-(--border) px-5 py-10 text-center last:border-b-0 sm:py-12 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Icon
                size={22}
                strokeWidth={1.4}
                className="mb-4"
              />

              <h3 className="text-sm font-medium">
                {benefit.title}
              </h3>

              <p className="mt-1.5 text-xs text-(--muted)">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}