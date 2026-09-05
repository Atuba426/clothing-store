"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();

    if (phone.length < 10) return;

    // UI only for now
    setStep("otp");
  };

  const router = useRouter();

  const handleVerify = (e) => {
    e.preventDefault();
  
    if (otp.length !== 6) return;
  
    router.push("/register");
  };
  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)">
              My Account
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {step === "phone" ? (
                <>
                  Welcome to{" "}
                  <Link
                    href="/"
                    className="font-extrabold tracking-[0.08em]"
                  >
                    LOGO
                  </Link>
                </>
              ) : (
                "Verify your number"
              )}
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-(--muted)">
              {step === "phone"
                ? "Sign in to access your orders, wishlist, and saved information."
                : `We sent a verification code to +91 ${phone}`}
            </p>
          </div>

          {/* PHONE STEP */}
          {step === "phone" && (
            <div className="mt-10">

              <form onSubmit={handleContinue}>
                <label className="mb-2 block text-xs font-medium">
                  Phone number
                </label>

                <div className="flex h-12 w-full border border-(--border) bg-white transition-colors focus-within:border-black">
                  <div className="flex items-center border-r border-(--border) px-4 text-sm text-(--muted)">
                    +91
                  </div>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="Enter phone number"
                    className="w-full bg-transparent px-4 text-sm outline-none placeholder:text-(--muted)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-85"
                >
                  Continue
                  <ArrowRight size={15} strokeWidth={1.7} />
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-(--border)" />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-(--muted)">
                  OR
                </span>

                <div className="h-px flex-1 bg-(--border)" />
              </div>

              {/* Email */}
                      <Link
                      href={"/register"}
                       className="flex h-12 w-full items-center justify-center border border-black/15 bg-white text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-black hover:text-white">
                      Continue with Email
                      </Link>
              <button
                type="button"
                
              >
               
              </button>

              {/* Terms */}
              <p className="mx-auto mt-6 max-w-xs text-center text-[11px] leading-5 text-(--muted)">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-black underline underline-offset-2"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  href="/privacy"
                  className="text-black underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <div className="mt-10">

              <form onSubmit={handleVerify}>

                <label className="mb-3 block text-center text-xs font-medium">
                  Enter verification code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="000000"
                  className="h-14 w-full border border-(--border) bg-white text-center text-xl tracking-[0.5em] outline-none transition-colors focus:border-black"
                />

                <button
                  type="submit"
                  disabled={otp.length !== 6}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:opacity-85"
                >
                  Verify
                  <ArrowRight size={15} strokeWidth={1.7} />
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-(--muted)">
                  Didn&apos;t receive the code?
                </p>

                <button
                  type="button"
                  className="mt-2 text-xs font-semibold underline underline-offset-4"
                >
                  Resend OTP
                </button>
              </div>

              {/* Back */}
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                }}
                className="mx-auto mt-8 flex items-center gap-2 text-xs text-(--muted) transition-colors hover:text-black"
              >
                <ArrowLeft size={14} />
                Change phone number
              </button>

            </div>
          )}
        </div>
      </section>
    </main>
  );
}