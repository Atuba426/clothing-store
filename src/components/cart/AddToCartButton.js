"use client";

import { useContext } from "react";
import { ShoppingBag } from "lucide-react";
import { CartContext } from "@/context/cartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
    >
      <ShoppingBag size={16} strokeWidth={1.7} />
      Add to Bag
    </button>
  );
}