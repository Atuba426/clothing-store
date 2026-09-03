"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock } from "lucide-react";
import { CartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, isHydrated } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-(--background)">
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-10">
          <div className="h-8 w-40 animate-pulse bg-black/5" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              <div className="h-20 animate-pulse bg-black/5" />
              <div className="h-20 animate-pulse bg-black/5" />
              <div className="h-20 animate-pulse bg-black/5" />
            </div>

            <div className="h-80 animate-pulse bg-black/5" />
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-(--muted)">
            Your cart is empty.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 999 ? 0 : 99;

  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log("Checkout data:", {
      customer: formData,
      paymentMethod,
      items: cartItems,
      subtotal,
      shipping,
      total,
    });
  
    router.push("/order-success");
  };

  return (
    <main className="min-h-screen bg-(--background)">
      <div className="mx-auto max-w-360 px-6 py-10 sm:py-14 lg:px-10 lg:py-16">

        {/* Header */}
        <div className="border-b border-black/10 pb-6">
          <Link
            href="/cart"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-(--muted) transition hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </Link>

          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-(--muted)">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_380px]"
        >

          {/* LEFT SIDE */}
          <div className="space-y-10">

            {/* Contact */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-medium">
                  Contact Information
                </h2>

                <p className="mt-1 text-xs text-(--muted)">
                  We&apos;ll use this information to contact you about your order.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  type="tel"
                  required
                  className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  type="email"
                  required
                  className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-medium">
                  Delivery Address
                </h2>

                <p className="mt-1 text-xs text-(--muted)">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="space-y-4">

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="h-12 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="h-12 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                />

                <div className="grid gap-4 sm:grid-cols-3">

                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                  />

                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                  />

                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="PIN code"
                    inputMode="numeric"
                    required
                    className="h-12 border border-black/15 bg-transparent px-4 text-sm outline-none transition focus:border-black"
                  />

                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="mb-5">
                <h2 className="text-lg font-medium">
                  Payment
                </h2>

                <p className="mt-1 text-xs text-(--muted)">
                  Choose your preferred payment method.
                </p>
              </div>

              <div className="space-y-3">

                {/* COD */}
                <label
                  className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-black"
                      : "border-black/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-(--muted)">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Online */}
                <label
                  className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                    paymentMethod === "online"
                      ? "border-black"
                      : "border-black/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Online Payment
                      </p>

                      <p className="mt-1 text-xs text-(--muted)">
                        UPI, cards and other payment methods.
                      </p>
                    </div>
                  </div>
                </label>

              </div>
            </section>

          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-28">

            <div className="border border-black/10 p-5 sm:p-6">

              <div className="flex items-center justify-between border-b border-black/10 pb-5">
                <h2 className="text-base font-medium">
                  Order Summary
                </h2>

                <span className="text-xs text-(--muted)">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-black/10">
                {cartItems.map((item) => {
                  const image =
                    item.images?.length > 0
                      ? item.images[0]
                      : item.image;

                  const quantity = item.quantity || 1;

                  return (
                    <Link
                      href={`/product/${item.id}`}
                      key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                      className="flex gap-3 py-4"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#f3f1ed]">
                        {image && (
                          <Image
                            src={image}
                            alt={item.name || "Product"}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-(--muted)">
                          Size: {item.size || "Free Size"}
                        </p>

                        {item.color && (
                          <p className="mt-1 text-xs text-(--muted)">
                            Color: {item.color}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-(--muted)">
                          Qty: {quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-medium">
                        ₹{((item.price || 0) * quantity).toLocaleString("en-IN")}
                      </p>
                    </Link>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="mt-3 space-y-3 border-t border-black/10 pt-5">

                <div className="flex justify-between text-sm">
                  <span className="text-(--muted)">
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-(--muted)">
                    Shipping
                  </span>

                  <span>
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-black/10 pt-4 text-base font-medium">
                  <span>
                    Total
                  </span>

                  <span>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
              >
                <Lock size={15} strokeWidth={1.6} />
                Place Order
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-(--muted)">
                Your information is securely handled and used only
                to process your order.
              </p>

            </div>

          </aside>

        </form>
      </div>
    </main>
  );
}