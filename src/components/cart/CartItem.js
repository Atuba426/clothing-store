"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { CartContext, getCartItemKey } from "@/context/cartContext";
import { useContext } from "react";

export default function CartItem({ item }) {
  const {
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const image =
    item.images?.length > 0
      ? item.images[0]
      : item.image;

  const quantity = item.quantity || 1;

  const itemTotal = (item.price || 0) * quantity;

  const itemKey = getCartItemKey(item);

  return (
    <div className="flex gap-4 py-6 sm:gap-6">

      {/* Product Image */}
      <Link
        href={`/product/${item.id}`}
        className="relative aspect-4/5 w-24 shrink-0 overflow-hidden bg-[#f3f1ed] sm:w-32"
      >
        {image ? (
          <Image
            src={image}
            alt={item.name || "Product"}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-(--muted)">
            No image
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex min-w-0 flex-1 flex-col">

        <div className="flex items-start justify-between gap-4">

          {/* Clickable Product Info */}
          <Link
            href={`/product/${item.id}`}
            className="min-w-0"
          >
            <p className="text-[10px] uppercase tracking-[0.14em] text-(--muted)">
              {item.category}
            </p>

            <h2 className="mt-1 truncate text-sm font-medium transition hover:underline sm:text-base">
              {item.name}
            </h2>

            {/* Color */}
            {item.color && (
              <p className="mt-1 text-xs text-(--muted)">
                Color: {item.color}
              </p>
            )}

            {/* Size */}
            <p className="mt-1 text-xs text-(--muted)">
              Size: {item.size || "Free Size"}
            </p>
          </Link>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeFromCart(item)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 text-(--muted) transition hover:text-black"
          >
            <X
              size={17}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">

          {/* Quantity */}
          <div className="flex h-9 items-center border border-black/15">

            <button
              type="button"
              onClick={() => decreaseQuantity(item)}
              aria-label="Decrease quantity"
              className="flex h-full w-9 items-center justify-center transition hover:bg-black/5"
            >
              <Minus size={13} />
            </button>

            <span className="flex w-8 justify-center text-xs">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => addToCart(item)}
              aria-label="Increase quantity"
              className="flex h-full w-9 items-center justify-center transition hover:bg-black/5"
            >
              <Plus size={13} />
            </button>

          </div>

          {/* Price */}
          <p className="shrink-0 text-sm font-medium">
            ₹{itemTotal.toLocaleString("en-IN")}
          </p>

        </div>
      </div>
    </div>
  );
}