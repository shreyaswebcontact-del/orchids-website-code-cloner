"use client";

import { Apple, Menu, ChevronRight, ArrowDown, Instagram, Box, Shuffle, MoreHorizontal, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import CourseSection from "@/components/sections/course-section";

export default function Home() {
  return (
    <div className="min-h-screen text-[#111] font-sans relative">

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-white transform -translate-y-0.5" />
          </div>
          <span className="font-medium text-lg tracking-tight text-gray-800">Future CEO</span>
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <Link
            href="/courses"
            className="flex items-center gap-2 bg-[#dfdfdf]/50 backdrop-blur-sm border border-white/40 rounded-full px-5 py-2 text-xs font-medium text-gray-600 hover:bg-white/60 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Waitlist is now open! Sign up Now
            <ChevronRight size={12} className="text-gray-400" />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-2 bg-[#111] text-white rounded-lg px-5 py-2.5 text-xs font-bold hover:bg-[#222] transition-colors"
          >
            <Apple size={14} className="mb-0.5" />
            DOWNLOAD
          </Link>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#dfdfdf]/50 border border-white/40 hover:bg-white/60 transition-colors"
            aria-label="Menu"
          >
            <Menu size={16} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 max-w-[1400px] mx-auto px-6">
        {/* Coordinates */}
        <div className="absolute top-10 left-8 text-[10px] text-gray-400 font-mono tracking-widest hidden sm:block">
          47.0514° N
        </div>
        <div className="absolute top-10 right-8 text-[10px] text-gray-400 font-mono tracking-widest hidden sm:block">
          9.0678° E
        </div>

        <div className="text-center max-w-5xl mx-auto">
          {/* Main headline */}
          <h1 className="text-[clamp(2.25rem,4.5vw,4rem)] font-normal leading-[1.05] tracking-[-0.03em] text-[#1a1a1a] mb-4">
            Where tomorrow&apos;s CEOs start today.
          </h1>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-normal leading-[1.05] tracking-[-0.03em] text-[#1a1a1a] mb-16">
            <span className="text-[#2ecc71]">Get</span> ready to build your own startup
          </h2>

          {/* New Bar Chart Dashboard Mockup */}
          <div className="relative mx-auto max-w-[340px]">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 pb-8 border border-gray-100/50">
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-6 px-1">
                <div className="text-[10px] font-bold text-gray-500">10:41</div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Header */}
              <div className="text-left mb-8">
                <div className="text-gray-400 text-xs font-medium mb-1">Portfolio</div>
                <div className="text-4xl font-medium text-[#111] tracking-tight mb-1">$99,192.81</div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#2ecc71] flex items-center justify-center">
                    <ArrowUpRight size={10} className="text-white" />
                  </div>
                  <span className="text-[#2ecc71] text-xs font-bold">2.95%</span>
                  <span className="text-gray-400 text-xs">Past Day</span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-32 flex items-end justify-between gap-1.5 mb-8 px-1">
                {[30, 45, 25, 50, 60, 40, 75, 55, 30, 45, 60, 80, 50, 65, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#4a5568] rounded-sm opacity-90 transition-all hover:bg-[#2ecc71] hover:opacity-100"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Timeframe Tabs */}
              <div className="flex justify-between bg-gray-50 p-1 rounded-xl mb-6">
                {['1D', '1W', '1M', '1Y', 'All'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-colors ${i === 0 ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Cash Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex justify-between items-center">
                <div className="text-left">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xs font-bold text-gray-600">$</span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cash</div>
                  <div className="text-sm font-bold text-[#111]">$20,112.91</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-bold mb-1">APR</div>
                  <div className="text-lg font-bold text-[#2ecc71]">9.83%</div>
                </div>
              </div>

              <div className="mt-4 text-[10px] text-left text-gray-400 px-1">Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Area */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-12 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-sm">
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            FutureCEO empowers students to learn entrepreneurship by building real businesses, not just studying them.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#e8e9eb] border border-gray-300 rounded-full px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-white transition-all shadow-sm"
          >
            <ArrowDown size={14} />
            EXPLORE
          </Link>
        </div>

        <div className="flex flex-col gap-4 text-xs font-bold text-gray-400">
          <div className="flex items-center gap-2 hover:text-gray-600 transition-colors cursor-pointer">
            <Instagram size={14} />
            <span>future.ceo</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-600 transition-colors cursor-pointer">
            <Box size={14} />
            <span>Compound</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-600 transition-colors cursor-pointer">
            <Shuffle size={14} />
            <span>ACROSS</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gray-600 transition-colors cursor-pointer">
            <MoreHorizontal size={14} />
            <span>a...</span>
          </div>
        </div>
      </div>

      {/* Dark Footer Strip Removed */}

      {/* Course Section (Restored) */}
      <CourseSection />
    </div>
  );
}
