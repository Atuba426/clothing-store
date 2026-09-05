"use client";

import Link from "next/link";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

const orders = [
  {
    id: "ORD-2026-00124",
    date: "September 1, 2026",
    status: "Delivered",
    total: 2499,
    items: [
      {
        name: "Classic Oversized T-Shirt",
        category: "Men / T-Shirts",
        size: "L",
        color: "Black",
        quantity: 1,
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      },
      {
        name: "Relaxed Fit Jeans",
        category: "Men / Jeans",
        size: "32",
        color: "Blue",
        quantity: 1,
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      },
    ],
  },
  {
    id: "ORD-2026-00118",
    date: "August 27, 2026",
    status: "Shipped",
    total: 1899,
    items: [
      {
        name: "Essential Cotton Shirt",
        category: "Men / Shirts",
        size: "M",
        color: "White",
        quantity: 1,
        price: 1899,
        image:
          "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=500",
      },
    ],
  },
  {
    id: "ORD-2026-00105",
    date: "August 19, 2026",
    status: "Processing",
    total: 3298,
    items: [
      {
        name: "Premium Relaxed T-Shirt",
        category: "Men / T-Shirts",
        size: "L",
        color: "Cream",
        quantity: 2,
        price: 1649,
        image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
      },
    ],
  },
  {
    id: "ORD-2026-00091",
    date: "August 10, 2026",
    status: "Cancelled",
    total: 1599,
    items: [
      {
        name: "Straight Fit Trousers",
        category: "Men / Trousers",
        size: "32",
        color: "Beige",
        quantity: 1,
        price: 1599,
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
      },
    ],
  },
];

const statusStyles = {
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Account
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Track and manage your recent purchases.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              {/* Order Top */}
              <div className="flex flex-col gap-4 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    <Package
                      size={19}
                      strokeWidth={1.8}
                      className="text-neutral-700"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {order.id}
                    </p>

                    <p className="mt-0.5 text-xs text-neutral-500">
                      Ordered on {order.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>

                  <span className="text-sm font-semibold text-neutral-900">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="divide-y divide-neutral-100">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 px-5 py-5"
                  >
                    {/* Product Image */}
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-24">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-medium text-neutral-900 sm:text-base">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-xs text-neutral-500">
                        {item.category}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>

                      <p className="mt-3 text-sm font-medium text-neutral-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-500">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"} in this order
                </p>

                <Link
                  href={`/order/${order.id}`}
                  className="group flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                >
                  View Details
                  <ChevronRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/collection"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}