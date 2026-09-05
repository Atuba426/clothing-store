"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";

import { WishlistContext } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const {
    isInWishlist,
    toggleWishlist,
    isHydrated,
  } = useContext(WishlistContext);

  const isWishlisted = isHydrated
    ? isInWishlist(product.id)
    : false;

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <article className="group">

      {/* Image */}

      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden bg-[#f1efeb]"
      >
        <div className="relative aspect-3/4 w-full">

          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          {/* Badge */}

          {product.badge && (
            <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]">
              {product.badge}
            </span>
          )}

          {/* Wishlist */}

          <motion.button
            type="button"
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            onClick={handleWishlist}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-300 hover:scale-105"
          >
            <Heart
              size={16}
              strokeWidth={1.6}
              className={
                isWishlisted
                  ? "fill-red-800 text-red-800"
                  : "text-black"
              }
            />
          </motion.button>

          {/* Desktop hover action */}

          <div className="absolute bottom-3 right-3 hidden sm:block">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight
                size={17}
                strokeWidth={1.6}
              />
            </span>
          </div>

        </div>
      </Link>

      {/* Product Info */}

      <div className="pt-4">

        <p className="text-[11px] uppercase tracking-[0.12em] text-(--muted)">
          {product.category}
        </p>

        <div className="mt-1 flex items-start justify-between gap-3">

          <Link
            href={`/product/${product.id}`}
            className="text-sm font-medium leading-snug transition-opacity hover:opacity-60 sm:text-[15px]"
          >
            {product.name}
          </Link>

          <p className="shrink-0 text-sm font-medium">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

    </article>
  );
}