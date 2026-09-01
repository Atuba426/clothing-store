"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState(null);

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

  const handleCategoryEnter = (category) => {
    setActiveCategory(category);
  };

  const closeMegaMenu = () => {
    setActiveCategory(null);
  };

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

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-extrabold tracking-[0.14em]"
          >
            LOGO
          </Link>

          {/* Desktop Categories */}
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
                    activeCategory === key ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden flex-1 justify-center px-4 md:flex">
            <div className="flex h-10.5 w-full max-w-110 items-center gap-2.5 rounded-full border border-(--border) bg-white px-4 transition-colors focus-within:border-(--foreground)">
              <Search
                size={17}
                strokeWidth={1.7}
                className="shrink-0 text-(--muted)"
              />

              <input
                type="text"
                placeholder="Search for styles, trends, or items..."
                className="w-full bg-transparent text-sm italic outline-none placeholder:text-(--muted)"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="ml-auto hidden items-center gap-5 md:flex">
            <Link href="/account" aria-label="Account">
              <User
                size={21}
                strokeWidth={1.6}
                className="transition-opacity hover:opacity-60"
              />
            </Link>

            <Link href="/wishlist" aria-label="Wishlist">
              <Heart
                size={21}
                strokeWidth={1.6}
                className="transition-opacity hover:opacity-60"
              />
            </Link>

            <Link href="/cart" aria-label="Cart">
              <ShoppingBag
                size={21}
                strokeWidth={1.6}
                className="transition-opacity hover:opacity-60"
              />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="ml-auto flex items-center gap-4 md:hidden">
            <button type="button" aria-label="Search">
              <Search size={21} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X size={23} strokeWidth={1.7} />
              ) : (
                <Menu size={23} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      {activeCategory && (
        <MegaMenu
          category={categories[activeCategory]}
          onClose={closeMegaMenu}
        />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-(--border) bg-(--background) md:hidden">
          <div className="px-6 py-5">

            {/* Mobile Search */}
            <div className="mb-6 flex h-11 items-center gap-2.5 rounded-full border border-(--border) bg-white px-4">
              <Search
                size={17}
                strokeWidth={1.7}
                className="text-(--muted)"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {/* Categories */}
            <div className="mb-7">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-(--muted)">
                Categories
              </p>

              <div className="border-t border-(--border)">
                {Object.entries(categories).map(([key, category]) => {
                  const isOpen = mobileCategory === key;

                  return (
                    <div
                      key={key}
                      className="border-b border-(--border)"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileCategory(isOpen ? null : key)
                        }
                        className="flex w-full items-center justify-between py-4 text-left text-base font-medium"
                      >
                        {category.label}

                        <ChevronRight
                          size={17}
                          className={`text-(--muted) transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-4 pl-3">
                          <Link
                            href={category.href}
                            onClick={() => setMobileOpen(false)}
                            className="mb-4 block text-sm font-medium underline underline-offset-4"
                          >
                            View All {category.label}
                          </Link>

                          <div className="space-y-5">
                            {category.sections.map((section) => (
                              <div key={section.title}>
                                <p className="mb-2 text-xs font-medium text-(--muted)">
                                  {section.title}
                                </p>

                                <div className="space-y-2">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block text-sm"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account */}
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-(--muted)">
                Account
              </p>

              <div className="border-t border-(--border)">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 border-b border-(--border) py-4 text-sm"
                >
                  <User size={17} strokeWidth={1.6} />
                  My Account
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 border-b border-(--border) py-4 text-sm"
                >
                  <Heart size={17} strokeWidth={1.6} />
                  Wishlist
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 text-sm"
                >
                  <ShoppingBag size={17} strokeWidth={1.6} />
                  Cart
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}