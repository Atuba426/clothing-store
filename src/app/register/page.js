"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend will be added later
    console.log({
      name,
      email,
    });
  };

  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)">
              Almost there
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Just a little more...
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-(--muted)">
              Complete your profile to get started with your account.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10"
          >
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-xs font-medium">
                Full name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="h-12 w-full border border-(--border) bg-white px-4 text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-black"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="mb-2 block text-xs font-medium">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="h-12 w-full border border-(--border) bg-white px-4 text-sm outline-none transition-colors placeholder:text-(--muted) focus:border-black"
              />
            </div>

            {/* Submit */}
            <Link
            href={"/account/dashboard"}
             className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-85"
            >
              Complete Registration
               <ArrowRight
                size={15}
                strokeWidth={1.7}
              />
            </Link>
           
          </form>

         

        </div>
      </section>
    </main>
  );
}