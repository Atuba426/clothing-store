"use client";

import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";

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

const SORT_OPTIONS = [
  {
    value: "recommended",
    label: "Recommended",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
];

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

export default function MenPage() {
  const [selectedFilters, setSelectedFilters] =
    useState(EMPTY_FILTERS);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [desktopFiltersOpen, setDesktopFiltersOpen] =
    useState(true);

  const [sortBy, setSortBy] =
    useState("recommended");

  const [sortOpen, setSortOpen] =
    useState(false);

  const menProducts = useMemo(() => {
    return products.filter((product) => {
      const gender = normalize(product.gender);
      const category = normalize(product.category);

      return gender === "men" || category === "men";
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
    return menProducts.filter((product) => {
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
  }, [menProducts, selectedFilters]);

  /* =====================================================
     SORT PRODUCTS
  ===================================================== */

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortBy === "price-low") {
      sorted.sort(
        (a, b) =>
          (Number(a.price) || 0) -
          (Number(b.price) || 0)
      );
    }

    if (sortBy === "price-high") {
      sorted.sort(
        (a, b) =>
          (Number(b.price) || 0) -
          (Number(a.price) || 0)
      );
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  const selectedSortLabel =
    SORT_OPTIONS.find(
      (option) => option.value === sortBy
    )?.label || "Recommended";

  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto px-6 pb-20 sm:px-10 lg:px-6 lg:pb-28">

        <div className="flex items-start gap-8 lg:gap-10">

          {/* =====================================================
              DESKTOP SIDEBAR
          ===================================================== */}

          {desktopFiltersOpen && (
            <div className="hidden lg:block">
              <FilterSidebar
                products={menProducts}
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

            {/* Product Section Header */}

            <section className="pb-8 pt-0">
              <div className="flex items-end justify-between gap-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
                    Collection
                  </p>

                  <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Men
                  </h1>

                  <p className="mt-3 text-sm text-(--muted)">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>

                {/* =================================================
                    RIGHT SIDE CONTROLS
                ================================================= */}

                <div className="flex items-center gap-3">

                  {/* SORT DROPDOWN */}

                  <div className="relative hidden sm:block">

                    <button
                      type="button"
                      onClick={() =>
                        setSortOpen((previous) => !previous)
                      }
                      className="flex h-10 items-center gap-3 border border-black/15 bg-(--background) px-4 text-xs font-semibold uppercase tracking-[0.08em] transition hover:border-black/30"
                    >
                      <span className="text-(--muted)">
                        Sort:
                      </span>

                      <span>
                        {selectedSortLabel}
                      </span>

                      <ChevronDown
                        size={14}
                        strokeWidth={1.7}
                        className={`transition-transform duration-200 ${
                          sortOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {sortOpen && (
                      <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden border border-black/10 bg-(--background) shadow-xl">

                        {SORT_OPTIONS.map((option) => {
                          const isSelected =
                            sortBy === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setSortBy(option.value);
                                setSortOpen(false);
                              }}
                              className="flex w-full items-center justify-between px-4 py-3 text-left text-xs transition hover:bg-black/5"
                            >
                              <span
                                className={
                                  isSelected
                                    ? "font-semibold text-black"
                                    : "text-(--muted)"
                                }
                              >
                                {option.label}
                              </span>

                              {isSelected && (
                                <Check
                                  size={14}
                                  strokeWidth={2}
                                />
                              )}
                            </button>
                          );
                        })}

                      </div>
                    )}

                  </div>

                  {/* Desktop Filter Toggle */}

                  {!desktopFiltersOpen && (
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopFiltersOpen(true)
                      }
                      className="hidden items-center gap-2 border border-black/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition hover:bg-black hover:text-white lg:flex"
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
                    className="flex items-center gap-2 border border-black/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest lg:hidden"
                  >
                    <SlidersHorizontal size={15} />
                    Filters
                  </button>

                </div>

              </div>
            </section>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">

                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            ) : (
              <div className="flex min-h-100 items-center justify-center border border-black/10">
                <div className="text-center">
                  <h2 className="text-lg font-medium">
                    No products found
                  </h2>

                  <p className="mt-2 text-sm text-(--muted)">
                    Try changing or clearing your filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white"
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

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer */}

          <div className="absolute bottom-0 left-0 top-0 w-[88%] max-w-90 overflow-y-auto bg-(--background) shadow-xl">

            <FilterSidebar
              products={menProducts}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
              onClose={() =>
                setMobileFiltersOpen(false)
              }
            />

            <div className="sticky bottom-0 border-t border-black/10 bg-(--background) p-4">
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