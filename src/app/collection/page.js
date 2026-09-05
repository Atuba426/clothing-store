"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal,ChevronDown,Check } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/Products/ProductCard";
import FilterSidebar from "@/components/men/FilterSidebar";

export default function CollectionPage() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortOpen, setSortOpen] = useState(false);

  // --------------------------------------------------
  // ALL ACTIVE PRODUCTS
  // --------------------------------------------------

  const collectionProducts = useMemo(() => {
    return products.filter(
      (product) => product.isActive === true
    );
  }, []);

  // --------------------------------------------------
  // FILTER CHANGE
  // --------------------------------------------------

  const handleFilterChange = (key, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  // --------------------------------------------------
  // CLEAR ALL FILTERS
  // --------------------------------------------------

  const handleClear = () => {
    setSelectedFilters({});
  };

  // --------------------------------------------------
  // FILTER PRODUCTS
  // --------------------------------------------------
  const filteredProducts = useMemo(() => {
    const filtered = collectionProducts.filter((product) => {
      return Object.entries(selectedFilters).every(
        ([key, selectedValues]) => {
          // No values selected
          if (
            !selectedValues ||
            selectedValues.length === 0
          ) {
            return true;
          }
  
          // ------------------------------------------
          // PRICE
          // ------------------------------------------
  
          if (key === "price") {
            const price = Number(product.price) || 0;
  
            return selectedValues.some((option) => {
              if (option === "Under ₹1,500") {
                return price < 1500;
              }
  
              if (option === "₹1,500 – ₹2,500") {
                return price >= 1500 && price <= 2500;
              }
  
              if (option === "₹2,500 – ₹4,000") {
                return price > 2500 && price <= 4000;
              }
  
              if (option === "Above ₹4,000") {
                return price > 4000;
              }
  
              return false;
            });
          }
  
          // ------------------------------------------
          // OTHER FILTERS
          // ------------------------------------------
  
          const productValue = product[key];
  
          // Array values
          if (Array.isArray(productValue)) {
            return selectedValues.some((selectedValue) =>
              productValue.some(
                (value) =>
                  String(value).toLowerCase() ===
                  String(selectedValue).toLowerCase()
              )
            );
          }
  
          // Single value
          if (
            productValue !== undefined &&
            productValue !== null
          ) {
            return selectedValues.some(
              (selectedValue) =>
                String(productValue).toLowerCase() ===
                String(selectedValue).toLowerCase()
            );
          }
  
          return false;
        }
      );
    });
  
    // ------------------------------------------
    // SORTING
    // ------------------------------------------
  
    if (sortBy === "price-low-high") {
      return [...filtered].sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
      );
    }
  
    if (sortBy === "price-high-low") {
      return [...filtered].sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
      );
    }
  
    return filtered;
  }, [collectionProducts, selectedFilters, sortBy]);
  return (
    <main className="min-h-screen bg-(--background)">

      {/* ==================================================
          MAIN COLLECTION LAYOUT
      ================================================== */}

      <div className="mx-auto flex max-w-400 items-start">

        {/* ==================================================
            DESKTOP SIDEBAR
        ================================================== */}

        {filtersOpen && (
          <aside className="hidden w-64.5 shrink-0 lg:block">
            <div className="sticky top-27">

              <FilterSidebar
                products={collectionProducts}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClear={handleClear}
                onClose={() => setFiltersOpen(false)}
              />

            </div>
          </aside>
        )}

        {/* ==================================================
            RIGHT CONTENT
        ================================================== */}

        <section
          className={`min-w-0 flex-1 px-6 pb-20 pt-10 sm:px-10 lg:px-6 lg:pb-28 ${
            filtersOpen ? "lg:pl-10" : ""
          }`}
        >

          {/* ==================================================
              HEADER
          ================================================== */}

         

<section className="pb-10">
  <div className="flex items-end justify-between gap-6">

    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
        Collection
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        All Products
      </h1>

      <p className="mt-3 text-sm text-(--muted)">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1
          ? "product"
          : "products"}
      </p>
    </div>

    <div className="relative">
  <button
    type="button"
    onClick={() => setSortOpen((value) => !value)}
    className="flex h-11 min-w-47.5 items-center justify-between gap-6 border border-black/10 bg-(--background) px-4 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 hover:border-black/30"
  >
    <span>
      {sortBy === "price-low-high"
        ? "Price: Low to High"
        : sortBy === "price-high-low"
          ? "Price: High to Low"
          : "Sort By"}
    </span>

    <ChevronDown
      size={15}
      strokeWidth={1.7}
      className={`transition-transform duration-200 ${
        sortOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {sortOpen && (
    <div className="absolute right-0 top-full z-30 mt-2 w-55 border border-black/10 bg-(--background) p-1 shadow-xl">
      <button
        type="button"
        onClick={() => {
          setSortBy("");
          setSortOpen(false);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-medium transition hover:bg-black/5"
      >
        <span>Recommended</span>

        {sortBy === "" && (
          <Check size={14} strokeWidth={1.7} />
        )}
      </button>

      <button
        type="button"
        onClick={() => {
          setSortBy("price-low-high");
          setSortOpen(false);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-medium transition hover:bg-black/5"
      >
        <span>Price: Low to High</span>

        {sortBy === "price-low-high" && (
          <Check size={14} strokeWidth={1.7} />
        )}
      </button>

      <button
        type="button"
        onClick={() => {
          setSortBy("price-high-low");
          setSortOpen(false);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-medium transition hover:bg-black/5"
      >
        <span>Price: High to Low</span>

        {sortBy === "price-high-low" && (
          <Check size={14} strokeWidth={1.7} />
        )}
      </button>
    </div>
  )}
</div>

  </div>
</section>

          {/* ==================================================
              FILTER BUTTON
              Only visible when sidebar is closed
          ================================================== */}

          {!filtersOpen && (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 border border-black/10 px-4 py-2.5 text-sm font-medium transition hover:border-black/30"
              >
                <SlidersHorizontal
                  size={16}
                  strokeWidth={1.7}
                />

                Filters
              </button>
            </div>
          )}

          {/* ==================================================
              PRODUCT GRID
          ================================================== */}

          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 ${
                filtersOpen
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-4"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* ==================================================
               NO PRODUCTS
               ================================================== */

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
                  onClick={handleClear}
                  className="mt-5 text-sm font-medium underline underline-offset-4"
                >
                  Clear filters
                </button>

              </div>
            </div>
          )}

        </section>
      </div>

      {/* ==================================================
          MOBILE FILTER DRAWER
      ================================================== */}

      {filtersOpen && (
        <div className="lg:hidden">

          {/* Overlay */}
          <div
            className="fixed inset-0 z-60 bg-black/30"
            onClick={() => setFiltersOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-70 w-[85%] max-w-90 overflow-y-auto bg-(--background) shadow-2xl">

            <FilterSidebar
              products={collectionProducts}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClear={handleClear}
              onClose={() => setFiltersOpen(false)}
            />

          </div>
        </div>
      )}

    </main>
  );
}