"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/men/FilterSidebar";

const EMPTY_FILTERS = {
  subcategory: [],
  brand: [],
  price: [],
  colors: [],
  sizes: [],
  material: [],
  fit: [],
  occasion: [],
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function matchesArrayFilter(productValue, selectedValues) {
  if (!selectedValues || selectedValues.length === 0) {
    return true;
  }

  const values = Array.isArray(productValue)
    ? productValue
    : productValue
      ? [productValue]
      : [];

  const normalizedProductValues = values.map(normalize);

  return selectedValues.some((selected) =>
    normalizedProductValues.includes(normalize(selected))
  );
}

export default function WomenPage() {
  const [selectedFilters, setSelectedFilters] =
    useState(EMPTY_FILTERS);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [desktopFiltersOpen, setDesktopFiltersOpen] =
    useState(true);

  const womenProducts = useMemo(() => {
    return products.filter((product) => {
      const gender = normalize(product.gender);
      const category = normalize(product.category);

      return (
        gender === "women" ||
        category === "women"
      );
    });
  }, []);

  const handleFilterChange = (key, values) => {
    setSelectedFilters((previous) => ({
      ...previous,
      [key]: values,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      subcategory: [],
      brand: [],
      price: [],
      colors: [],
      sizes: [],
      material: [],
      fit: [],
      occasion: [],
    });
  };

  const filteredProducts = useMemo(() => {
    return womenProducts.filter((product) => {
      const {
        subcategory,
        brand,
        price,
        colors,
        sizes,
        material,
        fit,
        occasion,
      } = selectedFilters;

      /* ---------------- CATEGORY ---------------- */

      if (
        subcategory.length > 0 &&
        !matchesArrayFilter(
          product.subcategory,
          subcategory
        )
      ) {
        return false;
      }

      /* ---------------- BRAND ---------------- */

      if (
        brand.length > 0 &&
        !matchesArrayFilter(product.brand, brand)
      ) {
        return false;
      }

      /* ---------------- PRICE ---------------- */

      if (price.length > 0) {
        const productPrice = Number(product.price) || 0;

        const matchesPrice = price.some((range) => {
          switch (range) {
            case "Under ₹1,500":
              return productPrice < 1500;

            case "₹1,500 – ₹2,500":
              return (
                productPrice >= 1500 &&
                productPrice <= 2500
              );

            case "₹2,500 – ₹4,000":
              return (
                productPrice > 2500 &&
                productPrice <= 4000
              );

            case "Above ₹4,000":
              return productPrice > 4000;

            default:
              return false;
          }
        });

        if (!matchesPrice) {
          return false;
        }
      }

      /* ---------------- COLOR ---------------- */

      if (
        colors.length > 0 &&
        !matchesArrayFilter(product.colors, colors)
      ) {
        return false;
      }

      /* ---------------- SIZE ---------------- */

      if (
        sizes.length > 0 &&
        !matchesArrayFilter(product.sizes, sizes)
      ) {
        return false;
      }

      /* ---------------- MATERIAL ---------------- */

      if (
        material.length > 0 &&
        !matchesArrayFilter(product.material, material)
      ) {
        return false;
      }

      /* ---------------- FIT ---------------- */

      if (
        fit.length > 0 &&
        !matchesArrayFilter(product.fit, fit)
      ) {
        return false;
      }

      /* ---------------- OCCASION ---------------- */

      if (
        occasion.length > 0 &&
        !matchesArrayFilter(product.occasion, occasion)
      ) {
        return false;
      }

      return true;
    });
  }, [womenProducts, selectedFilters]);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="mx-auto  px-6 pb-20 sm:px-10 lg:px-6 lg:pb-28">

        <div className="flex items-start gap-8 lg:gap-10">

          {/* =====================================================
              DESKTOP SIDEBAR
          ===================================================== */}

          {desktopFiltersOpen && (
            <div className="hidden lg:block">
              <FilterSidebar
                products={womenProducts}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
                onClose={() =>
                  setDesktopFiltersOpen(false)
                }
              />
            </div>
          )}

          {/* =====================================================
              PRODUCT AREA
          ===================================================== */}

          <div className="min-w-0 flex-1">

            {/* Header stays ONLY in product area */}

            <section className="pb-8 pt-0">
              <div className="flex items-end justify-between gap-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Collection
                  </p>

                  <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Women
                  </h1>

                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>

                {/* Desktop Filter Toggle */}

                {!desktopFiltersOpen && (
                  <button
                    type="button"
                    onClick={() =>
                      setDesktopFiltersOpen(true)
                    }
                    className="hidden items-center gap-2 border border-black/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition hover:bg-black hover:text-white lg:flex"
                  >
                    <SlidersHorizontal size={15} />
                    Filters
                  </button>
                )}

                {/* Mobile Filter Button */}

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(true)
                  }
                  className="flex items-center gap-2 border border-black/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] lg:hidden"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </button>

              </div>
            </section>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">

                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center border border-black/10">
                <div className="text-center">
                  <h2 className="text-lg font-medium">
                    No products found
                  </h2>

                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Try changing or clearing your filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =======================================================
          MOBILE FILTER DRAWER
      ======================================================= */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute bottom-0 left-0 top-0 w-[88%] max-w-[360px] overflow-y-auto bg-[var(--background)] shadow-xl">

            <FilterSidebar
              products={womenProducts}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
              onClose={() =>
                setMobileFiltersOpen(false)
              }
            />

            <div className="sticky bottom-0 border-t border-black/10 bg-[var(--background)] p-4">
              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="w-full bg-black py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}