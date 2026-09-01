"use client";

import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

const PRICE_OPTIONS = [
  "Under ₹1,500",
  "₹1,500 – ₹2,500",
  "₹2,500 – ₹4,000",
  "Above ₹4,000",
];

const FILTER_CONFIG = [
  {
    key: "subcategory",
    title: "Category",
  },
  {
    key: "brand",
    title: "Brand",
  },
  {
    key: "price",
    title: "Price",
    fixedOptions: PRICE_OPTIONS,
  },
  {
    key: "colors",
    title: "Color",
  },
  {
    key: "sizes",
    title: "Size",
  },
  {
    key: "material",
    title: "Material",
  },
  {
    key: "fit",
    title: "Fit",
  },
  {
    key: "occasion",
    title: "Occasion",
  },
];

function getValues(products, key) {
  const values = new Set();

  products.forEach((product) => {
    const value = product[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          values.add(String(item));
        }
      });
    } else if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      values.add(String(value));
    }
  });

  return [...values].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

export default function FilterSidebar({
  products = [],
  selectedFilters,
  onFilterChange,
  onClear,
  onClose,
}) {
  const [openFilter, setOpenFilter] = useState("subcategory");

  const filters = useMemo(() => {
    return FILTER_CONFIG.map((filter) => ({
      ...filter,
      options:
        filter.fixedOptions || getValues(products, filter.key),
    }));
  }, [products]);

  const toggleOption = (key, option) => {
    const current = selectedFilters[key] || [];

    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    onFilterChange(key, updated);
  };

  const selectedCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0
  );

  return (
    <aside className="w-full lg:w-[250px] lg:shrink-0">
      <div className="border border-black/10 bg-[var(--background)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} strokeWidth={1.7} />

            <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">
              Filters
            </h2>

            {selectedCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                {selectedCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs text-[var(--muted)] underline underline-offset-4 transition hover:text-black"
              >
                Clear All
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-black/5"
              >
                <X size={17} strokeWidth={1.7} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Sections */}
        {filters.map((filter) => {
          const isOpen = openFilter === filter.key;
          const selected = selectedFilters[filter.key] || [];

          return (
            <div
              key={filter.key}
              className="border-b border-black/10 last:border-b-0"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFilter(isOpen ? null : filter.key)
                }
                className="flex w-full items-center justify-between px-5 py-5 text-left"
              >
                <span className="text-sm font-medium">
                  {filter.title}

                  {selected.length > 0 && (
                    <span className="ml-2 text-xs text-[var(--muted)]">
                      ({selected.length})
                    </span>
                  )}
                </span>

                {isOpen ? (
                  <ChevronUp size={16} strokeWidth={1.6} />
                ) : (
                  <ChevronDown size={16} strokeWidth={1.6} />
                )}
              </button>

              {isOpen && (
                <div className="space-y-3 px-5 pb-5">
                  {filter.options.length > 0 ? (
                    filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 text-sm text-[var(--muted)] transition hover:text-black"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(option)}
                          onChange={() =>
                            toggleOption(
                              filter.key,
                              option
                            )
                          }
                          className="h-4 w-4 cursor-pointer accent-black"
                        />

                        <span className="leading-5">
                          {option}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-[var(--muted)]">
                      No options available
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}