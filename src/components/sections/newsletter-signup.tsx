"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * NewsletterSignup Section
 * 
 * A pixel-perfect clone of the Builder.io newsletter subscription section.
 * Features:
 * - "Get the latest from Builder.io" heading
 * - Two custom toggle switches for different newsletter types
 * - Centered white pill-shaped email input field
 * - Circular cyan submit button with arrow
 * - Responsive layout with specific typography and spacing
 */
export default function NewsletterSignup() {
  const [devNewsletter, setDevNewsletter] = useState(true);
  const [productNewsletter, setProductNewsletter] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for submission
    console.log("Submitting:", { email, devNewsletter, productNewsletter });
  };

  return (
    <section className="bg-black py-[120px] px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-[1200px] w-full flex flex-col items-center">
        {/* Section Heading */}
        <h3 className="text-[24px] font-bold text-white mb-10 tracking-tight">
          Get the latest from Builder.io
        </h3>

        {/* Newsletter Toggles Container */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-10 w-full justify-center items-start md:items-center">
          {/* Dev Drop Newsletter Toggle */}
          <div className="flex items-start gap-4 text-left max-w-[320px]">
            <button
              onClick={() => setDevNewsletter(!devNewsletter)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary mt-1 ${
                devNewsletter ? "bg-[#1DA1F2]" : "bg-[#333333]"
              }`}
              type="button"
              role="switch"
              aria-checked={devNewsletter}
            >
              <span
                className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                  devNewsletter ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <div>
              <p className="text-[14px] font-bold text-white mb-1 leading-tight">
                Dev Drop Newsletter
              </p>
              <p className="text-[12px] text-[#999999] leading-[1.4]">
                News, tips, and tricks from Builder, for frontend developers.
              </p>
            </div>
          </div>

          {/* Product Newsletter Toggle */}
          <div className="flex items-start gap-4 text-left max-w-[320px]">
            <button
              onClick={() => setProductNewsletter(!productNewsletter)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary mt-1 ${
                productNewsletter ? "bg-[#1DA1F2]" : "bg-[#333333]"
              }`}
              type="button"
              role="switch"
              aria-checked={productNewsletter}
            >
              <span
                className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                  productNewsletter ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <div>
              <p className="text-[14px] font-bold text-white mb-1 leading-tight">
                Product Newsletter
              </p>
              <p className="text-[12px] text-[#999999] leading-[1.4]">
                Latest features and updates on the Builder.io platform
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Form */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-[480px] relative group"
        >
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-black h-[48px] px-6 py-2 rounded-[50px] text-[15px] focus:outline-none placeholder:text-[#999999] pr-14"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 w-[40px] h-[40px] bg-[#1DA1F2] hover:bg-[#2BB9FF] rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Subscribe"
            >
              <ArrowRight className="text-white w-5 h-5 stroke-[2.5px]" />
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="mt-6 text-[11px] text-[#999999]">
          By submitting, you agree to our{" "}
          <a
            href="/privacy"
            className="underline hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}