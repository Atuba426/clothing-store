"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { WishlistContext } from "@/context/WishlistContext";

import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { categories } from "@/data/categories";
import { products } from "@/data/products";
import MegaMenu from "./MegaMenu";
import { CartContext } from "@/context/cartContext";

export default function Navbar() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Cart Context
  const { cartItems, isHydrated } = useContext(CartContext);

  // Calculate total quantity in cart
  const cartCount = isHydrated
    ? cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      )
    : 0;

  // --------------------------------------------------
  // SCROLL
  // --------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --------------------------------------------------
  // FUSE SEARCH
  // --------------------------------------------------

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        {
          name: "name",
          weight: 5,
        },
        {
          name: "category",
          weight: 4,
        },
        {
          name: "subcategory",
          weight: 4,
        },
        {
          name: "gender",
          weight: 3,
        },
        {
          name: "collection",
          weight: 2,
        },
        {
          name: "colors",
          weight: 2,
        },
        {
          name: "sizes",
          weight: 1,
        },
        {
          name: "material",
          weight: 2,
        },
        {
          name: "fit",
          weight: 2,
        },
        {
          name: "occasion",
          weight: 2,
        },
        {
          name: "brand",
          weight: 2,
        },
      ],

      threshold: 0.4,

      ignoreLocation: true,

      minMatchCharLength: 2,

      includeScore: true,
    });
  }, []);

  // --------------------------------------------------
  // SEARCH RESULTS
  // --------------------------------------------------

  const searchResults = useMemo(() => {
    const query = searchQuery.trim();

    if (!query || query.length < 2) {
      return [];
    }

    return fuse
      .search(query)
      .slice(0, 6)
      .map((result) => result.item);
  }, [searchQuery, fuse]);

  // --------------------------------------------------
  // SEARCH SUBMIT
  // --------------------------------------------------

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    setSearchFocused(false);
    setMobileOpen(false);

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // --------------------------------------------------
  // PRODUCT CLICK
  // --------------------------------------------------

  const handleProductClick = () => {
    setSearchFocused(false);
    setSearchQuery("");
    setMobileOpen(false);
  };

  // --------------------------------------------------
  // CATEGORY
  // --------------------------------------------------

  const handleCategoryEnter = (category) => {
    setActiveCategory(category);
  };

  const closeMegaMenu = () => {
    setActiveCategory(null);
  };
  //wishlist 
  const {
    wishlistCount,
    isHydrated: wishlistHydrated,
  } = useContext(WishlistContext);

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <header
      className={`sticky top-8.5 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-(--border) bg-[rgba(252,251,249,0.78)] backdrop-blur-[14px]"
          : "bg-(--background)"
      }`}
    >
      <div className="mx-auto max-w-360 px-6 lg:px-10">
        <div className="flex h-18 items-center gap-8">

          {/* =========================================
              LOGO
          ========================================= */}

          <Link
            href="/"
            className="shrink-0 text-xl font-extrabold tracking-[0.14em]"
          >
            LOGO
          </Link>

          {/* =========================================
              DESKTOP CATEGORIES
          ========================================= */}

          <nav className="hidden items-center gap-7 md:flex">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                type="button"
                onMouseEnter={() => handleCategoryEnter(key)}
                className="group flex items-center gap-1.5 py-3 text-sm font-medium"
              >
                <span className="relative">
                  {category.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-(--foreground) transition-transform duration-300 ${
                      activeCategory === key
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>

                <ChevronDown
                  size={15}
                  strokeWidth={1.7}
                  className={`transition-transform duration-200 ${
                    activeCategory === key
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* =========================================
              DESKTOP SEARCH
          ========================================= */}

          <div className="hidden flex-1 justify-center px-4 md:flex">
            <div className="relative w-full max-w-110">

              <form
                onSubmit={handleSearch}
                className="flex h-10.5 w-full items-center gap-2.5 rounded-full border border-(--border) bg-white px-4 transition-colors focus-within:border-(--foreground)"
              >
                <Search
                  size={17}
                  strokeWidth={1.7}
                  className="shrink-0 text-(--muted)"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search for styles, trends, or items..."
                  className="w-full bg-transparent text-sm italic outline-none placeholder:text-(--muted)"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchFocused(false);
                    }}
                    className="shrink-0 text-(--muted) transition-colors hover:text-black"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </form>

              {/* =====================================
                  SEARCH DROPDOWN
              ===================================== */}

              {searchFocused && searchQuery.trim().length >= 2 && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+10px)] z-100 overflow-hidden rounded-2xl border border-(--border) bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {searchResults.length > 0 ? (
                    <>
                      <div className="border-b border-(--border) px-4 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
                          Products
                        </p>
                      </div>

                      <div className="max-h-105 overflow-y-auto">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={
                              product.href ||
                              `/products/${product.id}`
                            }
                            onClick={handleProductClick}
                            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-50"
                          >
                            {/* Product image */}

                            <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-neutral-100">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>

                            {/* Product information */}

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-black">
                                {product.name}
                              </p>

                              <p className="mt-0.5 text-xs text-(--muted)">
                                {product.category}
                                {product.subcategory
                                  ? ` · ${product.subcategory}`
                                  : ""}
                              </p>
                            </div>

                            {/* Price */}

                            <p className="shrink-0 text-sm font-medium">
                              ₹
                              {product.price?.toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </Link>
                        ))}
                      </div>

                      {/* View all */}

                      <button
                        type="button"
                        onClick={handleSearch}
                        className="flex w-full items-center justify-center border-t border-(--border) px-4 py-3 text-xs font-semibold transition-colors hover:bg-neutral-50"
                      >
                        View all results →
                      </button>
                    </>
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <Search
                        size={22}
                        strokeWidth={1.5}
                        className="mx-auto mb-3 text-(--muted)"
                      />

                      <p className="text-sm font-medium">
                        No products found
                      </p>

                      <p className="mt-1 text-xs text-(--muted)">
                        Try another search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* =========================================
              DESKTOP ACTIONS
          ========================================= */}

          <div className="ml-auto hidden items-center gap-5 md:flex">

            {/* Account */}

            <Link
              href="/account"
              aria-label="Account"
            >
              <User
                size={21}
                strokeWidth={1.6}
                className="transition-opacity hover:opacity-60"
              />
            </Link>

            {/* Wishlist */}

            <Link
  href="/wishlist"
  aria-label={`Wishlist with ${wishlistCount} items`}
  className="relative"
>
  <Heart
    size={21}
    strokeWidth={1.6}
    className="transition-opacity hover:opacity-60"
  />

  {wishlistHydrated && wishlistCount > 0 && (
    <span className="absolute -right-2.5 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
      {wishlistCount}
    </span>
  )}
</Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative"
            >
              <ShoppingBag
                size={21}
                strokeWidth={1.6}
                className="transition-opacity hover:opacity-60"
              />

              {isHydrated && cartCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* =========================================
              MOBILE ACTIONS
          ========================================= */}

          <div className="ml-auto flex items-center gap-4 md:hidden">

            {/* Mobile Search */}

            <button
              type="button"
              aria-label="Search"
              onClick={() => setMobileOpen(true)}
            >
              <Search
                size={21}
                strokeWidth={1.7}
              />
            </button>

            {/* Mobile Menu */}

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              onClick={() =>
                setMobileOpen((value) => !value)
              }
            >
              {mobileOpen ? (
                <X
                  size={23}
                  strokeWidth={1.7}
                />
              ) : (
                <Menu
                  size={23}
                  strokeWidth={1.7}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =============================================
          DESKTOP MEGA MENU
      ============================================= */}

      {activeCategory && (
        <MegaMenu
          category={categories[activeCategory]}
          onClose={closeMegaMenu}
        />
      )}

      {/* =============================================
          MOBILE MENU
      ============================================= */}

      {mobileOpen && (
        <div className="border-t border-(--border) bg-(--background) md:hidden">
          <div className="px-6 py-5">

            {/* Mobile Search */}

            <form
              onSubmit={handleSearch}
              className="mb-6 flex h-11 items-center gap-2.5 rounded-full border border-(--border) bg-white px-4"
            >
              <Search
                size={17}
                strokeWidth={1.7}
                className="text-(--muted)"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X
                    size={15}
                    className="text-(--muted)"
                  />
                </button>
              )}
            </form>

            {/* Mobile Search Results */}

            {searchQuery.trim().length >= 2 && (
              <div className="mb-7 overflow-hidden rounded-xl border border-(--border) bg-white">

                {searchResults.length > 0 ? (
                  <>
                    <div className="border-b border-(--border) px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-(--muted)">
                        Search results
                      </p>
                    </div>

                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={
                          product.href ||
                          `/products/${product.id}`
                        }
                        onClick={handleProductClick}
                        className="flex items-center gap-3 border-b border-(--border) px-4 py-3 last:border-b-0"
                      >
                        <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-neutral-100">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-(--muted)">
                            {product.category}
                          </p>
                        </div>

                        <p className="text-xs font-medium">
                          ₹
                          {product.price?.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </Link>
                    ))}

                    <button
                      type="button"
                      onClick={handleSearch}
                      className="w-full px-4 py-3 text-xs font-semibold"
                    >
                      View all results →
                    </button>
                  </>
                ) : (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm font-medium">
                      No products found
                    </p>

                    <p className="mt-1 text-xs text-(--muted)">
                      Try another search.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* =====================================
                CATEGORIES
            ===================================== */}

            <div className="mb-7">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-(--muted)">
                Categories
              </p>

              <div className="border-t border-(--border)">
                {Object.entries(categories).map(
                  ([key, category]) => {
                    const isOpen =
                      mobileCategory === key;

                    return (
                      <div
                        key={key}
                        className="border-b border-(--border)"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileCategory(
                              isOpen ? null : key
                            )
                          }
                          className="flex w-full items-center justify-between py-4 text-left text-base font-medium"
                        >
                          {category.label}

                          <ChevronRight
                            size={17}
                            className={`text-(--muted) transition-transform ${
                              isOpen
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-4 pl-3">

                            <Link
                              href={category.href}
                              onClick={() =>
                                setMobileOpen(false)
                              }
                              className="mb-4 block text-sm font-medium underline underline-offset-4"
                            >
                              View All{" "}
                              {category.label}
                            </Link>

                            <div className="space-y-5">
                              {category.sections.map(
                                (section) => (
                                  <div
                                    key={
                                      section.title
                                    }
                                  >
                                    <p className="mb-2 text-xs font-medium text-(--muted)">
                                      {section.title}
                                    </p>

                                    <div className="space-y-2">
                                      {section.items.map(
                                        (item) => (
                                          <Link
                                            key={
                                              item.label
                                            }
                                            href={
                                              item.href
                                            }
                                            onClick={() =>
                                              setMobileOpen(
                                                false
                                              )
                                            }
                                            className="block text-sm"
                                          >
                                            {item.label}
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* =====================================
                ACCOUNT
            ===================================== */}

            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-(--muted)">
                Account
              </p>

              <div className="border-t border-(--border)">

                {/* My Account */}

                <Link
                  href="/account"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 border-b border-(--border) py-4 text-sm"
                >
                  <User
                    size={17}
                    strokeWidth={1.6}
                  />

                  My Account
                </Link>

                {/* Wishlist */}

                <Link
  href="/wishlist"
  aria-label={`Wishlist with ${wishlistCount} items`}
  className="relative"
>
  <Heart
    size={21}
    strokeWidth={1.6}
    className="transition-opacity hover:opacity-60"
  />

  {wishlistHydrated && wishlistCount > 0 && (
    <span className="absolute -right-2.5 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
      {wishlistCount}
    </span>
  )}
</Link>

                {/* Cart */}

                <Link
                  href="/cart"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 py-4 text-sm"
                >
                  <ShoppingBag
                    size={17}
                    strokeWidth={1.6}
                  />

                  Cart

                  {isHydrated &&
                    cartCount > 0 && (
                      <span className="ml-auto text-xs text-(--muted)">
                        {cartCount}{" "}
                        {cartCount === 1
                          ? "item"
                          : "items"}
                      </span>
                    )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}