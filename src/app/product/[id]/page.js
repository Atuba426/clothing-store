import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-[var(--muted)]">Product not found</p>
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

  return (
    <main className="bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-6 pb-5 pt-8 sm:px-10 lg:px-16 lg:pt-10">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <Link href="/" className="transition-opacity hover:opacity-60">
            Home
          </Link>

          <span>/</span>

          <Link
            href={
              product.category?.toLowerCase() === "women"
                ? "/women"
                : "/men"
            }
            className="transition-opacity hover:opacity-60"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="max-w-[180px] truncate text-[var(--foreground)]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-16 xl:gap-24">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {productImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative overflow-hidden bg-[#f1efeb] ${
                  productImages.length === 1 && index === 0
                    ? "col-span-2"
                    : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 55vw, 600px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* Category */}
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 text-xl font-medium">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>

            {/* Badge */}
            {product.badge && (
              <span className="mt-4 inline-block bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                {product.badge}
              </span>
            )}

            {/* Divider */}
            <div className="my-7 h-px bg-black/10" />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold">About the product</h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                {product.description ||
                  `A thoughtfully designed ${product.name.toLowerCase()} made for everyday wear. Designed with a clean silhouette, comfortable feel and versatile styling in mind.`}
              </p>
            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div className="mt-8 border-y border-black/10">
              {product.brand && (
                <div className="flex items-center justify-between border-b border-black/10 py-4">
                  <span className="text-sm text-[var(--muted)]">Brand</span>
                  <span className="text-sm font-medium">{product.brand}</span>
                </div>
              )}

              {product.color && (
                <div className="flex items-center justify-between border-b border-black/10 py-4">
                  <span className="text-sm text-[var(--muted)]">Color</span>
                  <span className="text-sm font-medium">{product.color}</span>
                </div>
              )}

              {product.material && (
                <div className="flex items-center justify-between border-b border-black/10 py-4">
                  <span className="text-sm text-[var(--muted)]">Material</span>
                  <span className="text-sm font-medium">
                    {product.material}
                  </span>
                </div>
              )}

              {product.occasion && (
                <div className="flex items-center justify-between border-b border-black/10 py-4">
                  <span className="text-sm text-[var(--muted)]">Occasion</span>
                  <span className="text-sm font-medium">
                    {product.occasion}
                  </span>
                </div>
              )}

              {product.fit && (
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-[var(--muted)]">Fit</span>
                  <span className="text-sm font-medium">{product.fit}</span>
                </div>
              )}
            </div>

            {/* ================= COLOR ================= */}
            {product.colors?.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Color</p>
                  <span className="text-xs text-[var(--muted)]">
                    {product.color || product.colors[0]}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="border border-black/15 px-4 py-2 text-xs transition hover:border-black"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= SIZE ================= */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Select Size</p>

                <button
                  type="button"
                  className="text-xs text-[var(--muted)] underline underline-offset-4"
                >
                  Size Guide
                </button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {(product.sizes || ["XS", "S", "M", "L", "XL"]).map(
                  (size) => (
                    <button
                      key={size}
                      type="button"
                      className="flex h-11 items-center justify-center border border-black/15 text-xs font-medium transition hover:border-black hover:bg-black hover:text-white"
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* ================= QUANTITY ================= */}
            <div className="mt-8">
              <p className="text-sm font-semibold">Quantity</p>

              <div className="mt-4 flex h-11 w-32 items-center justify-between border border-black/15">
                <button
                  type="button"
                  className="flex h-full w-10 items-center justify-center transition hover:bg-black/5"
                >
                  <Minus size={14} />
                </button>

                <span className="text-sm">1</span>

                <button
                  type="button"
                  className="flex h-full w-10 items-center justify-center transition hover:bg-black/5"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-black px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
              >
                <ShoppingBag size={17} strokeWidth={1.7} />
                Add to Bag
              </button>
              <Link
  href={product.category?.toLowerCase() === "women" ? "/women" : "/men"}
  className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-black px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
>
  <ShoppingBag size={17} strokeWidth={1.7} />
  Shop More
</Link>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-black/15 transition hover:border-black"
              >
                <Heart size={18} strokeWidth={1.6} />
              </button>
            </div>

            {/* ================= SHIPPING INFO ================= */}
            <div className="mt-8 space-y-4 border-t border-black/10 pt-7">
              <div>
                <p className="text-sm font-medium">Free shipping</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Complimentary shipping on eligible orders.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Easy returns</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Simple returns on eligible products.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Secure checkout</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Your payment information is securely processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}