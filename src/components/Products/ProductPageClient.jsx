"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { products } from "@/data/products";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductPageClient({ id }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-[var(--muted)]">
            Product not found
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const productImages =
    product.images?.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const categoryHref =
    product.gender?.toLowerCase() === "women"
      ? "/women"
      : "/men";

  const sizes =
    product.sizes?.length > 0
      ? product.sizes
      : ["XS", "S", "M", "L", "XL"];

  const colors = product.colors || [];

  const currentColor =
    selectedColor || product.color || colors[0] || null;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* =========================================================
          BREADCRUMB
      ========================================================= */}

      <div className="mx-auto max-w-[1240px] px-5 pb-5 pt-7 sm:px-8 lg:px-10 lg:pt-8">
        <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">

          <Link
            href="/"
            className="transition hover:text-black"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href={categoryHref}
            className="transition hover:text-black"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="max-w-[180px] truncate text-[var(--foreground)]">
            {product.name}
          </span>

        </div>
      </div>

      {/* =========================================================
          PRODUCT AREA
      ========================================================= */}

      <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24">

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,580px)_minmax(360px,460px)] lg:justify-center lg:gap-16 xl:gap-20">

          {/* =====================================================
              IMAGE GALLERY
          ===================================================== */}

          <div className="w-full">

            {productImages.length > 0 ? (
              <div
                className={
                  productImages.length === 1
                    ? "mx-auto w-full max-w-[560px]"
                    : "grid grid-cols-2 gap-2.5"
                }
              >

                {productImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed]"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - image ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes={
                        productImages.length === 1
                          ? "(max-width: 768px) 100vw, 560px"
                          : "(max-width: 768px) 50vw, 280px"
                      }
                      className="object-cover"
                    />
                  </div>
                ))}

              </div>
            ) : (
              <div className="flex aspect-[4/5] w-full max-w-[560px] items-center justify-center bg-[#f3f1ed] text-sm text-[var(--muted)]">
                No image available
              </div>
            )}

          </div>

          {/* =====================================================
              PRODUCT INFORMATION
          ===================================================== */}

          <div className="w-full lg:sticky lg:top-28">

            {/* Category + Badge */}

            <div className="flex items-center gap-3">

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                {product.category}
              </p>

              {product.badge && (
                <span className="border border-black/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]">
                  {product.badge}
                </span>
              )}

            </div>

            {/* Product Name */}

            <h1 className="mt-3 max-w-[520px] text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-4 flex items-center gap-3">

              <p className="text-lg font-medium">
                ₹{product.price?.toLocaleString("en-IN")}
              </p>

              {product.originalPrice && (
                <p className="text-sm text-[var(--muted)] line-through">
                  ₹{product.originalPrice?.toLocaleString("en-IN")}
                </p>
              )}

            </div>

            {/* Description */}

            <p className="mt-5 max-w-[470px] text-sm leading-6 text-[var(--muted)]">
              {product.description ||
                `A thoughtfully designed ${product.name.toLowerCase()} made for everyday wear. Designed with a clean silhouette, comfortable feel and versatile styling in mind.`}
            </p>

            {/* Divider */}

            <div className="my-7 h-px bg-black/10" />

            {/* =====================================================
                PRODUCT DETAILS
            ===================================================== */}

            <div className="space-y-3">

              {product.brand && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">
                    Brand
                  </span>

                  <span className="font-medium">
                    {product.brand}
                  </span>
                </div>
              )}

              {product.material && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">
                    Material
                  </span>

                  <span className="font-medium">
                    {product.material}
                  </span>
                </div>
              )}

              {product.fit && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">
                    Fit
                  </span>

                  <span className="font-medium">
                    {product.fit}
                  </span>
                </div>
              )}

            </div>

            {/* =====================================================
                COLOR
            ===================================================== */}

            {colors.length > 0 && (
              <div className="mt-7">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium">
                    Color
                  </p>

                  <span className="text-xs text-[var(--muted)]">
                    {currentColor}
                  </span>

                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`border px-4 py-2 text-xs transition ${
                        color === currentColor
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

            {/* =====================================================
                SIZE
            ===================================================== */}

            <div className="mt-7">

              <div className="flex items-center justify-between">

                <p className="text-sm font-medium">
                  Select Size
                </p>

                <button
                  type="button"
                  className="text-xs text-[var(--muted)] underline underline-offset-4 transition hover:text-black"
                >
                  Size Guide
                </button>

              </div>

              <div className="mt-3 grid grid-cols-5 gap-2">

                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 items-center justify-center border text-xs font-medium transition ${
                      size === selectedSize
                        ? "border-black bg-black text-white"
                        : "border-black/15 hover:border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>

            {/* =====================================================
                QUANTITY
            ===================================================== */}

            <div className="mt-7">

              <p className="text-sm font-medium">
                Quantity
              </p>

              <div className="mt-3 flex h-11 w-[132px] items-center justify-between border border-black/15">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="flex h-full w-10 items-center justify-center transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={14} />
                </button>

                <span className="text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-10 items-center justify-center transition hover:bg-black/5"
                >
                  <Plus size={14} />
                </button>

              </div>

            </div>

            {/* =====================================================
                ACTIONS
            ===================================================== */}

            <div className="mt-7 flex gap-2.5">

              <AddToCartButton
                product={{
                  ...product,
                  size: selectedSize,
                  color: currentColor,
                  quantity,
                }}
              />

              <Link
                href={categoryHref}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 border border-black px-5 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
              >
                Shop More
              </Link>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-black/15 transition hover:border-black"
              >
                <Heart
                  size={18}
                  strokeWidth={1.6}
                />
              </button>

            </div>

            {/* =====================================================
                DELIVERY / TRUST
            ===================================================== */}

            <div className="mt-7 border-t border-black/10 pt-6">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">

                {/* Free Shipping */}

                <div className="flex gap-3">

                  <Truck
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-xs font-medium">
                      Free shipping
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                      Complimentary shipping on eligible orders.
                    </p>

                  </div>

                </div>

                {/* Easy Returns */}

                <div className="flex gap-3">

                  <RotateCcw
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-xs font-medium">
                      Easy returns
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-(--muted)">
                      Simple returns on eligible products.
                    </p>

                  </div>

                </div>

                {/* Secure Checkout */}

                <div className="flex gap-3">

                  <ShieldCheck
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-xs font-medium">
                      Secure checkout
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-(--muted)">
                      Your payment information is securely processed.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}