"use client";

import Link from "next/link";
import {
  Trophy,
  Zap,
  Target,
  Award,
  BookOpen,
  Rocket,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const HIGHLIGHTS = [
  { label: "Total XP", value: "15,000", icon: Zap, color: "#f1c40f" },
  { label: "Badges", value: "42", icon: Award, color: "#2ecc71" },
  { label: "Levels", value: "1–20", icon: TrendingUp, color: "#3498db" },
  { label: "Modules", value: "6", icon: BookOpen, color: "#9b59b6" },
];

const MODULES_PREVIEW = [
  { id: 1, title: "Entrepreneurship Foundations", icon: BookOpen, color: "#2ecc71" },
  { id: 2, title: "Idea Validation", icon: Target, color: "#3498db" },
  { id: 3, title: "Business Model & Planning", icon: TrendingUp, color: "#9b59b6" },
  { id: 4, title: "MVP Execution & Growth", icon: Rocket, color: "#e67e22" },
  { id: 5, title: "Funding & Launch", icon: Star, color: "#e74c3c" },
  { id: 6, title: "Scaling & Advanced Growth", icon: Trophy, color: "#1abc9c" },
];

export default function CourseSection() {
  return (
    <section className="relative bg-transparent py-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#2ecc71]/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3498db]/[0.04] blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            <Sparkles size={14} />
            Gamified Learning
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#111] mb-4">
          FutureCEO{" "}
          <span className="text-[#2ecc71]">Startup Mastery</span>
        </h2>
        <p className="text-center text-[#888] text-lg max-w-xl mx-auto mb-14">
          6 modules. 15,000 XP. 42 badges. Complete challenges, level up, and launch your real business.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {HIGHLIGHTS.map((s, i) => (
            <div
              key={i}
              className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5 text-center hover:border-[#ddd] transition-colors"
            >
              <s.icon size={22} className="mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-2xl font-bold text-[#111]">{s.value}</p>
              <p className="text-xs text-[#999] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Module preview grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {MODULES_PREVIEW.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.id}
                href="/courses"
                className="group bg-[#fafafa] border border-[#eee] rounded-2xl p-6 hover:border-[#ccc] hover:shadow-sm transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${mod.color}15` }}
                  >
                    <Icon size={20} style={{ color: mod.color }} />
                  </div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: mod.color }}
                  >
                    Module {mod.id}
                  </span>
                </div>
                <h4 className="text-[#111] font-bold text-base">{mod.title}</h4>
              </Link>
            );
          })}
        </div>

        {/* Gamification teaser */}
        <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8 mb-14">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={20} className="text-[#f1c40f]" />
                <h3 className="text-xl font-bold text-[#111]">Learn by Playing</h3>
              </div>
              <p className="text-[#888] text-sm leading-relaxed mb-4">
                Earn XP for every lesson, challenge, and boss battle. Unlock achievements,
                climb leaderboards, and compete with fellow founders — all while building a real startup.
              </p>
              <div className="flex flex-wrap gap-3">
                {["XP & Levels", "42 Badges", "Streak Bonuses", "Leaderboards", "Power-Ups"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#2ecc71]/10 text-[#2ecc71] px-3 py-1.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              {[
                { emoji: "🚀", label: "MVP Launcher", tier: "gold" },
                { emoji: "🎯", label: "Pitch Perfect", tier: "silver" },
                { emoji: "💵", label: "First Dollar", tier: "gold" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="w-20 h-24 bg-white border border-[#eee] rounded-xl flex flex-col items-center justify-center"
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <p className="text-[9px] text-[#888] mt-1 text-center leading-tight px-1">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="flex -space-x-2">
            {["bg-[#2ecc71]", "bg-[#3498db]", "bg-[#9b59b6]", "bg-[#e67e22]", "bg-[#e74c3c]"].map(
              (bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
                >
                  <Users size={12} />
                </div>
              )
            )}
          </div>
          <p className="text-sm text-[#888]">
            <span className="text-[#111] font-bold">1,200+</span> aspiring founders enrolled
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold text-sm px-8 py-4 rounded-full transition-colors"
          >
            <Rocket size={16} />
            Explore Courses & Enroll
            <ChevronRight size={16} />
          </Link>
          <p className="text-[11px] text-[#999] mt-4">
            $249.99 &bull; 30-day money-back guarantee &bull; 6 months access
          </p>
        </div>
      </div>
    </section>
  );
}
