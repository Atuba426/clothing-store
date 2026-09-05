"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import { products } from "@/data/products";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const fuse = new Fuse(products, {
    keys: [
      "name",
      "category",
      "subcategory",
      "brand",
      "color",
      "material",
      "fit",
      "occasion",
      "collection",
      "gender",
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const results = query.trim()
    ? fuse.search(query).map((result) => result.item)
    : [];

  return (
    <main className="min-h-screen bg-(--background) px-6 py-12 md:px-10">
      <div className="mx-auto max-w-360">
        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-(--muted)">
            Search
          </p>

          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">
            {query ? `Results for "${query}"` : "Search products"}
          </h1>

          {query && (
            <p className="mt-3 text-sm text-(--muted)">
              {results.length}{" "}
              {results.length === 1 ? "product" : "products"} found
            </p>
          )}
        </div>

        {!query ? (
          <div className="py-20 text-center">
            <Search
              size={32}
              strokeWidth={1.5}
              className="mx-auto mb-4 text-(--muted)"
            />

            <p className="text-sm text-(--muted)">
              Search for shirts, jeans, dresses, jackets and more.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-serif text-2xl">
              No products found
            </h2>

            <p className="mt-2 text-sm text-(--muted)">
              Try searching for something like &quot;shirt&quot;,
              &quot;jeans&quot; or &quot;dress&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <Link
                key={product.id}
                href={
                  product.href ||
                  `/product/${product.id}`
                }
                className="group"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
                  <Image
                    src={product.images?.[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="pt-3">
                  <h2 className="truncate text-sm font-medium">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-xs text-(--muted)">
                    {product.category}
                  </p>

                  <p className="mt-2 text-sm">
                    ₹
                    {product.price?.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}