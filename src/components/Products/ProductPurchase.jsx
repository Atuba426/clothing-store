"use client";

import { useContext, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/cartContext";

export default function ProductPurchase({ product, sizes }) {
  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const availableColors = product?.colors || [];

  const [selectedColor, setSelectedColor] = useState(
    product?.color || availableColors[0] || ""
  );

  const [selectedSize, setSelectedSize] = useState(
    sizes?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  // Check wishlist status
  const isWishlisted = isInWishlist(product?.id);

  // --------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  // --------------------------------------------------
  // QUANTITY
  // --------------------------------------------------

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <>
      {/* COLOR */}

      {availableColors.length > 0 && (
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Color
            </p>

            <span className="text-xs text-(--muted)">
              {selectedColor}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setSelectedColor(color)
                }
                className={`border px-4 py-2 text-xs transition ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-black/15 hover:border-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE */}

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Select Size
          </p>

          <button
            type="button"
            className="text-xs text-(--muted) underline underline-offset-4 transition hover:text-black"
          >
            Size Guide
          </button>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-2">
          {sizes?.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`flex h-11 items-center justify-center border text-xs font-medium transition ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-black/15 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY */}

      <div className="mt-7">
        <p className="text-sm font-medium">
          Quantity
        </p>

        <div className="mt-3 flex h-11 w-33 items-center justify-between border border-black/15">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
            className="flex h-full w-10 items-center justify-center transition hover:bg-black/5"
          >
            <Minus size={14} />
          </button>

          <span className="text-sm">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-10 items-center justify-center transition hover:bg-black/5"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="mt-7 flex gap-2.5">

        {/* ADD TO BAG */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
        >
          <ShoppingBag
            size={16}
            strokeWidth={1.7}
          />

          Add to Bag
        </button>

        {/* WISHLIST */}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`flex h-12 w-12 shrink-0 items-center justify-center border transition ${
            isWishlisted
              ? "border-black bg-black text-white"
              : "border-black/15 hover:border-black"
          }`}
        >
          <Heart
            size={18}
            strokeWidth={1.6}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>
    </>
  );
}