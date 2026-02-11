import { Apple, Menu, ChevronRight, Play, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import CourseSection from "@/components/sections/course-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L13 12H1L7 0Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-lg">Future CEO</span>
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/courses"
            className="flex items-center gap-2 border border-[#e0e0e0] rounded-full px-5 py-2.5 text-sm text-[#444] hover:border-[#ccc] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111]" />
            Waitlist is now open! Sign up Now
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-2 bg-[#111] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#222] transition-colors"
          >
            <Apple size={16} />
            DOWNLOAD
          </Link>
          <Link
            href="/courses"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e0e0e0] hover:border-[#ccc] transition-colors"
            aria-label="Menu"
          >
            <Menu size={18} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-8 pt-16 pb-24">
        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-[#2ecc71]/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#3498db]/[0.03] blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 border border-[#e0e0e0] rounded-full px-4 py-2 text-xs text-[#666] mb-8 hover:border-[#ccc] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] animate-pulse" />
            Now enrolling — limited spots available
          </div>

          {/* Main headline */}
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#111] mb-6">
            Build Your Startup.
            <br />
            <span className="text-[#2ecc71]">Become a CEO.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#888] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The gamified program that teaches you to find problems, validate ideas,
            build MVPs, and launch real businesses — step by step.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold text-sm px-8 py-4 rounded-full transition-colors shadow-lg shadow-[#2ecc71]/20"
            >
              Explore the Course
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/courses/learn"
              className="inline-flex items-center gap-2 border border-[#e0e0e0] hover:border-[#ccc] text-[#444] font-medium text-sm px-8 py-4 rounded-full transition-colors"
            >
              <Play size={14} fill="#444" />
              Watch Preview
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 text-xs text-[#999]">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#2ecc71]" />
              12-week program
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#2ecc71]" />
              100% self-paced
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#2ecc71]" />
              30-day guarantee
            </span>
          </div>
        </div>

        {/* Hero visual / app preview card */}
        <div className="relative max-w-4xl mx-auto mt-20">
          <div className="bg-[#111] rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-[#666] text-xs font-mono">futureceo.app — Startup Mastery Dashboard</span>
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#222]">
                <p className="text-[#666] text-[10px] uppercase tracking-wider mb-1">Your Level</p>
                <p className="text-white text-2xl font-bold">Level 7</p>
                <div className="mt-2 h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2ecc71] rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-[#555] text-[10px] mt-1">5,250 / 7,500 XP</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#222]">
                <p className="text-[#666] text-[10px] uppercase tracking-wider mb-1">Badges Earned</p>
                <p className="text-white text-2xl font-bold">18 <span className="text-[#555] text-sm font-normal">/ 42</span></p>
                <div className="flex gap-1 mt-2">
                  {["🚀", "🎯", "💡", "⚡"].map((e, i) => (
                    <span key={i} className="w-6 h-6 bg-[#222] rounded-lg flex items-center justify-center text-xs">{e}</span>
                  ))}
                  <span className="w-6 h-6 bg-[#222] rounded-lg flex items-center justify-center text-[9px] text-[#555]">+14</span>
                </div>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#222]">
                <p className="text-[#666] text-[10px] uppercase tracking-wider mb-1">Current Streak</p>
                <p className="text-white text-2xl font-bold">14 days 🔥</p>
                <p className="text-[#2ecc71] text-[10px] font-medium mt-2">2x XP Multiplier Active</p>
              </div>
            </div>

            {/* Module progress */}
            <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#222]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-sm font-bold">Module Progress</p>
                <p className="text-[#2ecc71] text-xs font-medium">4 of 6 completed</p>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { n: 1, done: true },
                  { n: 2, done: true },
                  { n: 3, done: true },
                  { n: 4, done: true },
                  { n: 5, done: false },
                  { n: 6, done: false },
                ].map((m) => (
                  <div key={m.n} className={`h-2 rounded-full ${m.done ? "bg-[#2ecc71]" : "bg-[#222]"}`} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Foundations", "Validation", "Business", "MVP", "Funding", "Scale"].map((label) => (
                  <p key={label} className="text-[8px] text-[#555] text-center flex-1">{label}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -right-4 top-16 bg-white rounded-2xl shadow-xl border border-[#eee] p-4 max-w-[180px]">
            <p className="text-[10px] text-[#999] mb-1">Achievement Unlocked!</p>
            <p className="text-sm font-bold text-[#111]">🚀 MVP Launcher</p>
            <p className="text-[10px] text-[#2ecc71] mt-1">+150 XP</p>
          </div>
          <div className="absolute -left-4 bottom-20 bg-white rounded-2xl shadow-xl border border-[#eee] p-4 max-w-[160px]">
            <p className="text-[10px] text-[#999] mb-1">Leaderboard</p>
            <p className="text-sm font-bold text-[#111]">#3 This Week</p>
            <p className="text-[10px] text-[#f1c40f] mt-1">⭐ Top 5%</p>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <CourseSection />
    </div>
  );
}
