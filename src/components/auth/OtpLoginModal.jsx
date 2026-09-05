"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";

export default function OtpLoginModal({ mode = "popup" }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // --------------------------------------------------
  // OPEN MODAL
  // --------------------------------------------------

  useEffect(() => {
    // /login page → open immediately
    if (mode === "page") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
      return;
    }

    // Normal website popup → open after 10 seconds
    const alreadyShown = sessionStorage.getItem("otp-popup-shown");

    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("otp-popup-shown", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, [mode]);

  // --------------------------------------------------
  // RESEND COUNTDOWN
  // --------------------------------------------------

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // --------------------------------------------------
  // SEND OTP
  // --------------------------------------------------

  const handleSendOtp = (e) => {
    e.preventDefault();

    setError("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    // Demo OTP flow
    console.log("Demo OTP sent to:", `+91${phone}`);
    console.log("Demo OTP: 123456");

    setOtp("");
    setStep("otp");
    setResendTimer(30);
  };

  // --------------------------------------------------
  // VERIFY OTP
  // --------------------------------------------------

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    // Temporary demo verification
    if (otp !== "123456") {
      setError("Incorrect OTP. For this demo, use 123456.");
      return;
    }

    console.log("OTP verified successfully");

    // We'll connect real authentication here later.
    setStep("success");
  };

  // --------------------------------------------------
  // RESEND OTP
  // --------------------------------------------------

  const handleResend = () => {
    if (resendTimer > 0) return;

    console.log("Demo OTP resent:", "123456");

    setResendTimer(30);
    setError("");
  };

  // --------------------------------------------------
  // BACK
  // --------------------------------------------------

  const handleBack = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  // --------------------------------------------------
  // CLOSE
  // --------------------------------------------------

  const handleClose = () => {
    // If modal was opened through /login,
    // go back to the previous page.
    if (mode === "page") {
      router.back();
      return;
    }

    // If it was the automatic popup,
    // simply close it.
    setIsOpen(false);
  };

  // --------------------------------------------------
  // DON'T RENDER WHEN CLOSED
  // --------------------------------------------------

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close login popup"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
        >
          <X size={18} />
        </button>

        {/* =================================================
            PHONE STEP
        ================================================= */}

        {step === "phone" && (
          <>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <Smartphone size={22} />
            </div>

            <h2 className="pr-8 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in with your mobile number for a faster and smoother
              shopping experience.
            </p>

            <form onSubmit={handleSendOtp} className="mt-7">

              <label
                htmlFor="otp-phone"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Mobile number
              </label>

              <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-gray-900 focus-within:bg-white">

                <div className="flex items-center border-r border-gray-200 px-3 text-sm font-medium text-gray-600">
                  +91
                </div>

                <input
                  id="otp-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  placeholder="Enter mobile number"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  required
                />

              </div>

              {error && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Continue with OTP
              </button>
            </form>

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-gray-400">

              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0"
              />

              <p>
                We&apos;ll use your mobile number only for authentication and
                your account.
              </p>

            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-5 w-full text-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              Continue as guest
            </button>
          </>
        )}

        {/* =================================================
            OTP STEP
        ================================================= */}

        {step === "otp" && (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Change number
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <ShieldCheck size={22} />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Enter verification code
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We sent a 6-digit verification code to
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              +91 {phone}
            </p>

            <form onSubmit={handleVerifyOtp} className="mt-7">

              <label
                htmlFor="otp-code"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Verification code
              </label>

              <input
                id="otp-code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="000000"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center text-2xl font-semibold tracking-[0.4em] text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-900 focus:bg-white"
                required
              />

              {error && (
                <p className="mt-2 text-center text-xs font-medium text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Verify & Continue
              </button>

            </form>

            <div className="mt-5 text-center text-sm text-gray-500">

              Didn&apos;t receive the code?{" "}

              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="font-semibold text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Resend OTP"}
              </button>

            </div>

            <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">

              <span className="font-semibold text-gray-700">
                Demo mode:
              </span>{" "}

              use <strong>123456</strong>

            </div>
          </>
        )}

        {/* =================================================
            SUCCESS STEP
        ================================================= */}

        {step === "success" && (
          <div className="py-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle2
                size={32}
                className="text-gray-900"
              />
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-gray-900">
              You&apos;re signed in
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your mobile number has been successfully verified.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </button>

          </div>
        )}

      </div>
    </div>
  );
}