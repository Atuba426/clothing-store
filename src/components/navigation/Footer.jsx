"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const footerLinks = {
  shop: [
    { label: "Men", href: "/shop?category=men" },
    { label: "Women", href: "/shop?category=women" },
    { label: "New Arrivals", href: "/shop?collection=new-arrivals" },
    { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  ],

  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQs", href: "/faq" },
  ],

  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Journal", href: "/journal" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#15161A] text-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        {/* Main Footer */}
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-24">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block text-2xl font-semibold tracking-[-0.03em]"
            >
              YOUR BRAND
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Thoughtfully designed clothing made for everyday life and
              seasons beyond the moment.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-[#15161A]"
              >
                <FaInstagram size={16} strokeWidth={1.6} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-[#15161A]"
              >
                <FaFacebook size={16} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={footerLinks.shop} />

          {/* Help */}
          <FooterColumn title="Help" links={footerLinks.help} />

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} YOUR BRAND. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/shipping"
              className="transition-colors hover:text-white"
            >
              Shipping
            </Link>

            <Link
              href="/returns"
              className="transition-colors hover:text-white"
            >
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
        {title}
      </h3>

      <nav className="mt-5 flex flex-col items-start gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
          >
            {link.label}

            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}