"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  Target,
  Star,
  Lock,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Flame,
  Award,
  BarChart3,
  Users,
  BookOpen,
  Rocket,
  DollarSign,
  TrendingUp,
  Shield,
  Crown,
  Sparkles,
  Clock,
  Gift,
  CheckCircle2,
  ArrowRight,
  Play,
} from "lucide-react";

/* ─────────────────────── animation hook ─────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Animate({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const { ref, visible } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.9)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────── data ─────────────────────── */

const MODULES = [
  {
    id: 1,
    title: "Entrepreneurship Foundations",
    subtitle: "Build your founder mindset from scratch",
    xp: 850,
    hours: "6–8",
    icon: BookOpen,
    color: "#2ecc71",
    lessons: [
      { name: "What Is a Startup?", xp: 15, time: "12 min", type: "lesson" },
      { name: "The Founder Mindset", xp: 20, time: "18 min", type: "lesson" },
      { name: "Problem Hunting", xp: 25, time: "22 min", type: "lesson" },
      { name: "From Problems to Ideas", xp: 20, time: "16 min", type: "lesson" },
    ],
    challenges: [
      { name: "Classification Challenge", xp: 50 },
      { name: "Mindset Self-Assessment", xp: 75 },
      { name: "Problem Hunter Mission", xp: 100 },
      { name: "Idea Generation Sprint", xp: 100 },
    ],
    boss: { name: "The Problem-Solution Pitch", xp: 200 },
    badges: ["Startup Scholar", "Self-Aware Founder", "Foundation Builder", "Idea Machine"],
    outcomes: [
      "Understand what separates startups from small businesses",
      "Develop a resilient founder mindset",
      "Identify real problems worth solving",
      "Generate and filter startup ideas",
    ],
  },
  {
    id: 2,
    title: "Idea Validation",
    subtitle: "Test your ideas before building anything",
    xp: 1200,
    hours: "10–14",
    icon: Target,
    color: "#3498db",
    lessons: [
      { name: "Why Most Startups Fail", xp: 20, time: "14 min", type: "lesson" },
      { name: "Customer Research Fundamentals", xp: 25, time: "24 min", type: "lesson" },
      { name: "The Landing Page Test", xp: 25, time: "20 min", type: "lesson" },
      { name: "The MVP Mindset", xp: 25, time: "18 min", type: "lesson" },
      { name: "Pricing Psychology", xp: 30, time: "22 min", type: "lesson" },
      { name: "Competitive Analysis", xp: 25, time: "20 min", type: "lesson" },
    ],
    challenges: [
      { name: "Assumption Mapper", xp: 75 },
      { name: "Survey Builder Quest", xp: 100 },
      { name: "Landing Page Launch", xp: 200 },
      { name: "MVP Blueprint", xp: 150 },
      { name: "Price Testing Mission", xp: 150 },
      { name: "Competitive Intelligence Report", xp: 175 },
    ],
    boss: { name: "Validation Evidence Portfolio", xp: 300 },
    badges: ["Validation Master", "Data Detective", "Competitor Crusher"],
    outcomes: [
      "Avoid the #1 reason startups fail",
      "Conduct real customer interviews",
      "Build a landing page that converts",
      "Design pricing that works",
    ],
  },
  {
    id: 3,
    title: "Business Model & Planning",
    subtitle: "Design a business that makes money",
    xp: 1100,
    hours: "8–12",
    icon: BarChart3,
    color: "#9b59b6",
    lessons: [
      { name: "Business Model Fundamentals", xp: 25, time: "20 min", type: "lesson" },
      { name: "Key Resources", xp: 30, time: "20 min", type: "lesson" },
      { name: "Value Proposition Design", xp: 35, time: "25 min", type: "lesson" },
      { name: "Channels", xp: 25, time: "20 min", type: "lesson" },
      { name: "Cost Structure & Revenue Streams", xp: 40, time: "30 min", type: "lesson" },
    ],
    challenges: [
      { name: "Resource Audit Challenge", xp: 50 },
      { name: "Value Proposition Canvas Quest", xp: 75 },
      { name: "Channel Mapping", xp: 50 },
      { name: "Financial Blueprint Challenge", xp: 75 },
    ],
    boss: { name: "Business Model Boss Challenge", xp: 200 },
    badges: ["Resource Wrangler", "Problem-Solution Architect", "Channel Navigator", "Money Maestro"],
    outcomes: [
      "Master the Business Model Canvas",
      "Craft a compelling value proposition",
      "Map revenue streams and cost structures",
      "Plan your go-to-market strategy",
    ],
  },
  {
    id: 4,
    title: "MVP Execution & Growth",
    subtitle: "Build, launch, and grow your first product",
    xp: 1100,
    hours: "10–14",
    icon: Rocket,
    color: "#e67e22",
    lessons: [
      { name: "MVP Fundamentals", xp: 30, time: "20 min", type: "lesson" },
      { name: "MVP Types", xp: 35, time: "25 min", type: "lesson" },
      { name: "Metrics & Validation", xp: 30, time: "20 min", type: "lesson" },
      { name: "Customer Acquisition", xp: 35, time: "25 min", type: "lesson" },
      { name: "Retention & Engagement", xp: 30, time: "20 min", type: "lesson" },
      { name: "Scaling Basics", xp: 35, time: "25 min", type: "lesson" },
    ],
    challenges: [
      { name: "MVP Idea Refinement", xp: 50 },
      { name: "MVP Prototype Quest", xp: 75 },
      { name: "Metrics Mapping Challenge", xp: 50 },
      { name: "Acquisition Funnel Map", xp: 50 },
      { name: "Retention Blueprint Challenge", xp: 50 },
      { name: "Scale Readiness Checklist", xp: 50 },
    ],
    boss: { name: "MVP Execution Boss Challenge", xp: 200 },
    badges: ["MVP Mastermind", "Prototype Pioneer", "Metric Maverick", "Growth Hacker", "Retention Rockstar", "Scale Strategist"],
    outcomes: [
      "Choose the right MVP approach for your idea",
      "Build a functional prototype",
      "Track the metrics that matter",
      "Acquire your first 100 customers",
    ],
  },
  {
    id: 5,
    title: "Funding & Launch",
    subtitle: "Raise money and launch to the world",
    xp: 1200,
    hours: "10–14",
    icon: DollarSign,
    color: "#e74c3c",
    lessons: [
      { name: "Types of Startup Funding", xp: 35, time: "25 min", type: "lesson" },
      { name: "Pitching to Investors", xp: 40, time: "30 min", type: "lesson" },
      { name: "Launch Strategies", xp: 35, time: "25 min", type: "lesson" },
      { name: "Post-Launch Metrics & Iteration", xp: 35, time: "25 min", type: "lesson" },
      { name: "Legal & Compliance Essentials", xp: 30, time: "20 min", type: "lesson" },
      { name: "Financial Planning", xp: 35, time: "25 min", type: "lesson" },
    ],
    challenges: [
      { name: "Funding Match Challenge", xp: 50 },
      { name: "Pitch Deck Draft", xp: 75 },
      { name: "Launch Calendar Challenge", xp: 50 },
      { name: "Post-Launch Analytics Map", xp: 50 },
      { name: "Legal Checklist Challenge", xp: 50 },
      { name: "Financial Forecast Blueprint", xp: 50 },
    ],
    boss: { name: "Funding & Launch Boss Challenge", xp: 250 },
    badges: ["Funding Forecaster", "Pitch Perfect", "Launch Leader", "Iteration Innovator", "Legal Eagle", "Finance Wizard"],
    outcomes: [
      "Understand bootstrapping vs. VC vs. angel funding",
      "Craft a winning pitch deck",
      "Execute a launch strategy",
      "Navigate basic legal requirements",
    ],
  },
  {
    id: 6,
    title: "Scaling & Advanced Growth",
    subtitle: "Take your startup from 1 to 100",
    xp: 1300,
    hours: "12–16",
    icon: TrendingUp,
    color: "#1abc9c",
    lessons: [
      { name: "When to Scale", xp: 35, time: "25 min", type: "lesson" },
      { name: "Scaling Strategies", xp: 40, time: "30 min", type: "lesson" },
      { name: "Growth Hacking Basics", xp: 35, time: "25 min", type: "lesson" },
      { name: "Marketing Funnel Optimization", xp: 35, time: "25 min", type: "lesson" },
      { name: "Building a Strong Team", xp: 35, time: "25 min", type: "lesson" },
      { name: "Leadership & Founder Growth", xp: 30, time: "20 min", type: "lesson" },
    ],
    challenges: [
      { name: "Scale Readiness Checklist", xp: 50 },
      { name: "Scaling Map Challenge", xp: 50 },
      { name: "Growth Hack Sprint", xp: 50 },
      { name: "Funnel Blueprint Challenge", xp: 50 },
      { name: "Team Growth Plan", xp: 50 },
      { name: "Founder Growth Journal", xp: 50 },
    ],
    boss: { name: "Scaling & Advanced Growth Boss Challenge", xp: 300 },
    badges: ["Growth Detective", "Scale Strategist", "Funnel Master", "Team Builder", "Founder Rising"],
    outcomes: [
      "Know when your startup is ready to scale",
      "Implement growth hacking strategies",
      "Optimize your marketing funnel",
      "Build and lead a founding team",
    ],
  },
];

const BADGES_ALL = [
  { name: "First Problem Identified", icon: "🔍", tier: "bronze" as const },
  { name: "Survey Master", icon: "📊", tier: "silver" as const },
  { name: "MVP Launcher", icon: "🚀", tier: "gold" as const },
  { name: "First Dollar Earned", icon: "💵", tier: "gold" as const },
  { name: "Pitch Perfect", icon: "🎯", tier: "silver" as const },
  { name: "Community Helper", icon: "🤝", tier: "bronze" as const },
  { name: "Speed Demon", icon: "⚡", tier: "silver" as const },
  { name: "Perfectionist", icon: "💎", tier: "gold" as const },
  { name: "Pivot Pro", icon: "🔄", tier: "silver" as const },
  { name: "Revenue Milestone", icon: "🏆", tier: "gold" as const },
  { name: "Problem Solver", icon: "🧩", tier: "bronze" as const },
  { name: "Validation Ace", icon: "✅", tier: "silver" as const },
  { name: "Growth Hacker", icon: "📈", tier: "gold" as const },
  { name: "Team Builder", icon: "👥", tier: "silver" as const },
  { name: "Risk Taker", icon: "🎲", tier: "bronze" as const },
];

const POWER_UPS = [
  { name: "Advanced Templates", level: 5, icon: BookOpen, desc: "Business plan, pitch deck, and financial model templates" },
  { name: "Expert Case Studies", level: 8, icon: Star, desc: "Deep dives into how real startups succeeded" },
  { name: "1-on-1 Mentor Session", level: 12, icon: Users, desc: "Personal guidance from experienced founders" },
  { name: "Pitch Deck AI Analyzer", level: 15, icon: Sparkles, desc: "AI feedback on your investor pitch" },
  { name: "Private Mastermind Access", level: 18, icon: Crown, desc: "Join an exclusive group of top performers" },
];

const LEADERBOARD = [
  { rank: 1, name: "Alex K.", xp: 8420, badge: "🥇", level: 12 },
  { rank: 2, name: "Sarah M.", xp: 7890, badge: "🥈", level: 11 },
  { rank: 3, name: "Jake R.", xp: 7340, badge: "🥉", level: 10 },
  { rank: 4, name: "Emma L.", xp: 6920, badge: "", level: 9 },
  { rank: 5, name: "Marcus D.", xp: 6510, badge: "", level: 9 },
  { rank: 6, name: "Priya S.", xp: 6200, badge: "", level: 8 },
  { rank: 7, name: "James T.", xp: 5890, badge: "", level: 8 },
  { rank: 8, name: "Luna W.", xp: 5650, badge: "", level: 7 },
];

/* ─────────────────────── sub-components ─────────────────────── */

function XPBar({ current, max, color }: { current: number; max: number; color: string }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

function ModuleCard({ mod }: { mod: (typeof MODULES)[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = mod.icon;
  const totalLessons = mod.lessons.length;
  const totalChallenges = mod.challenges.length;

  return (
    <div className="rounded-2xl border border-[#eee] bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Color accent top */}
      <div className="h-1" style={{ background: mod.color }} />

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${mod.color}12` }}
        >
          <Icon size={24} style={{ color: mod.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: mod.color }}
            >
              Module {mod.id}
            </span>
          </div>
          <h3 className="text-[#111] font-bold text-lg">{mod.title}</h3>
          <p className="text-[#888] text-sm mt-0.5">{mod.subtitle}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-[#999]">
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-[#f1c40f]" /> {mod.xp} XP
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {mod.hours} hrs
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Target size={12} /> {totalChallenges} challenges
            </span>
          </div>
        </div>

        <ChevronDown
          size={20}
          className={`text-[#ccc] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: open ? "2000px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 space-y-5 border-t border-[#f0f0f0] pt-5">
          {/* Learning outcomes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">
              What You&apos;ll Learn
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mod.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#555]">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: mod.color }} />
                  {o}
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">
              Lessons
            </p>
            <div className="space-y-1.5">
              {mod.lessons.map((l, i) => (
                <Link
                  key={i}
                  href={`/courses/learn?module=${mod.id}&tab=lessons`}
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#fafafa] text-sm hover:bg-[#f5f5f5] transition-colors"
                >
                  <div className="flex items-center gap-3 text-[#444]">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[10px] font-bold text-[#999]">
                      {i + 1}
                    </div>
                    {l.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#999]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {l.time}
                    </span>
                    <span className="text-[#f1c40f] font-medium">+{l.xp} XP</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#999] mb-3">
              Challenges
            </p>
            <div className="space-y-1.5">
              {mod.challenges.map((c, i) => (
                <Link
                  key={i}
                  href={`/courses/learn?module=${mod.id}&tab=lessons`}
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#fafafa] text-sm hover:bg-[#f5f5f5] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#444]">
                    <Target size={14} style={{ color: mod.color }} />
                    {c.name}
                  </div>
                  <span className="text-[#f1c40f] text-xs font-medium">+{c.xp} XP</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Boss challenge */}
          <Link
            href={`/courses/learn?module=${mod.id}&tab=mastery`}
            className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed hover:opacity-90 transition-opacity block"
            style={{ borderColor: `${mod.color}40`, background: `${mod.color}06` }}
          >
            <div className="flex items-center gap-3">
              <Crown size={18} style={{ color: mod.color }} />
              <div>
                <p className="text-xs uppercase tracking-wider font-bold" style={{ color: mod.color }}>
                  Boss Challenge
                </p>
                <p className="text-sm font-bold text-[#111]">{mod.boss.name}</p>
              </div>
            </div>
            <span className="text-[#f1c40f] text-sm font-bold">+{mod.boss.xp} XP</span>
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {mod.badges.map((b, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1.5 rounded-full font-medium border"
                style={{
                  background: `${mod.color}08`,
                  color: mod.color,
                  borderColor: `${mod.color}20`,
                }}
              >
                <Award size={10} className="inline mr-1" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── page ─────────────────────── */

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "gamification" | "leaderboard">("modules");

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      {/* ── HEADER NAV ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft size={18} className="text-[#888]" />
            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L13 12H1L7 0Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-sm">Future CEO</span>
          </Link>
          <Link
            href="/courses/learn"
            className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
          >
            <Rocket size={14} />
            Enroll Now
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* BG gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#2ecc71]/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#3498db]/[0.05] blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <Animate>
            <span className="inline-flex items-center gap-2 bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} />
              Gamified Self-Paced Program
            </span>
          </Animate>

          <Animate delay={0.1}>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] mb-4">
              FutureCEO{" "}
              <span className="text-[#2ecc71]">Startup Mastery</span>
            </h1>
          </Animate>

          <Animate delay={0.15}>
            <p className="text-[#888] text-lg max-w-2xl mx-auto mb-10">
              12 weeks of hands-on startup building. 6 modules. 15,000 XP. 42 badges.
              Complete challenges, level up, and launch your real business.
            </p>
          </Animate>

          {/* Price card */}
          <Animate delay={0.2} direction="scale">
            <div className="inline-flex flex-col items-center bg-white border border-[#eee] rounded-3xl px-12 py-10 shadow-xl shadow-black/[0.04] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2ecc71] via-[#3498db] to-[#9b59b6]" />
              <p className="text-xs text-[#999] uppercase tracking-wider mb-1">
                Early Access Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-bold text-[#111]">$249</span>
                <span className="text-2xl font-bold text-[#999]">.99</span>
              </div>
              <p className="text-sm text-[#888] mt-2">
                <span className="line-through text-[#ccc]">$697</span>{" "}
                <span className="text-[#2ecc71] font-bold">64% OFF</span>
              </p>
              <div className="flex items-center gap-5 mt-5 text-xs text-[#999]">
                <span className="flex items-center gap-1"><Clock size={12} /> 6 months access</span>
                <span className="flex items-center gap-1"><BookOpen size={12} /> 100% text-based</span>
                <span className="flex items-center gap-1"><Zap size={12} /> Self-paced</span>
              </div>
              <Link
                href="/courses/learn"
                className="mt-7 bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#2ecc71]/20 flex items-center gap-2"
              >
                <Rocket size={18} />
                Enroll Now — Start Building
              </Link>
              <p className="text-[11px] text-[#bbb] mt-3 flex items-center gap-1">
                <Shield size={11} /> 30-day money-back guarantee
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <Animate>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total XP Available", value: "15,000", icon: Zap, color: "#f1c40f" },
              { label: "Achievement Badges", value: "42", icon: Award, color: "#2ecc71" },
              { label: "Player Levels", value: "1 – 20", icon: TrendingUp, color: "#3498db" },
              { label: "Completion Rate", value: "75%+", icon: Target, color: "#e74c3c" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6 text-center hover:border-[#ddd] transition-colors"
              >
                <s.icon size={24} className="mx-auto mb-2" style={{ color: s.color }} />
                <p className="text-3xl font-bold text-[#111]">{s.value}</p>
                <p className="text-xs text-[#999] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Animate>
      </section>

      {/* ── TABS ── */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-1 bg-[#fafafa] border border-[#eee] rounded-full p-1.5 w-fit mx-auto mb-12">
          {(
            [
              { key: "modules" as const, label: "Course Modules", icon: BookOpen },
              { key: "gamification" as const, label: "Gamification", icon: Trophy },
              { key: "leaderboard" as const, label: "Leaderboard", icon: BarChart3 },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === t.key
                ? "bg-[#2ecc71] text-white shadow-md shadow-[#2ecc71]/20"
                : "text-[#888] hover:text-[#555]"
                }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: MODULES ── */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            {/* XP Journey bar */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#2ecc71]/10 flex items-center justify-center">
                      <Trophy size={20} className="text-[#2ecc71]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111]">Your Journey</p>
                      <p className="text-xs text-[#999]">Level 1 — 0 / 15,000 XP</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#999]">Overall Progress</p>
                    <p className="text-sm font-bold text-[#2ecc71]">0%</p>
                  </div>
                </div>
                <XPBar current={0} max={15000} color="#2ecc71" />
                <div className="flex items-center justify-between mt-2 text-[11px] text-[#bbb]">
                  <span>Level 1</span>
                  <span>Level 20</span>
                </div>
              </div>
            </Animate>

            {/* Module path connector */}
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2ecc71] via-[#3498db] via-[#9b59b6] via-[#e67e22] via-[#e74c3c] to-[#1abc9c] opacity-20 hidden sm:block" />

              <div className="space-y-4">
                {MODULES.map((mod, i) => (
                  <Animate key={mod.id} delay={i * 0.08}>
                    <ModuleCard mod={mod} />
                  </Animate>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: GAMIFICATION ── */}
        {activeTab === "gamification" && (
          <div className="space-y-10">
            {/* How XP works */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Zap size={22} className="text-[#f1c40f]" />
                  <h3 className="text-xl font-bold text-[#111]">How XP Works</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { action: "Reading Lessons", xp: "10–25 XP", color: "#3498db", icon: BookOpen },
                    { action: "Completing Challenges", xp: "50–200 XP", color: "#2ecc71", icon: Target },
                    { action: "Boss Battles", xp: "200–300 XP", color: "#e67e22", icon: Crown },
                    { action: "Community Posts", xp: "25 XP each", color: "#9b59b6", icon: Users },
                  ].map((item, i) => (
                    <Animate key={i} delay={i * 0.08} direction="scale">
                      <div className="bg-white border border-[#eee] rounded-xl p-5 text-center hover:shadow-md transition-all">
                        <div
                          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                          style={{ background: `${item.color}12` }}
                        >
                          <item.icon size={22} style={{ color: item.color }} />
                        </div>
                        <p className="text-sm font-bold text-[#111]">{item.action}</p>
                        <p className="text-lg font-bold mt-1" style={{ color: item.color }}>
                          {item.xp}
                        </p>
                      </div>
                    </Animate>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-8 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#f1c40f]">15,000</p>
                    <p className="text-xs text-[#999]">Total XP</p>
                  </div>
                  <div className="w-px h-10 bg-[#eee]" />
                  <div>
                    <p className="text-3xl font-bold text-[#111]">20</p>
                    <p className="text-xs text-[#999]">Max Level</p>
                  </div>
                  <div className="w-px h-10 bg-[#eee]" />
                  <div>
                    <p className="text-3xl font-bold text-[#2ecc71]">750</p>
                    <p className="text-xs text-[#999]">XP per Level</p>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Level progression */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={22} className="text-[#3498db]" />
                  <h3 className="text-xl font-bold text-[#111]">Level Progression</h3>
                </div>
                <div className="flex items-end gap-1.5 h-[120px]">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md transition-all hover:opacity-100 cursor-default group relative"
                      style={{
                        height: `${((i + 1) / 20) * 100}%`,
                        background:
                          i < 5 ? "#2ecc71" : i < 10 ? "#3498db" : i < 15 ? "#9b59b6" : "#e67e22",
                        opacity: 0.4 + (i / 20) * 0.6,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#999] opacity-0 group-hover:opacity-100 transition-opacity">
                        Lv{i + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-xs text-[#bbb]">
                  <span>Novice (1–5)</span>
                  <span>Explorer (6–10)</span>
                  <span>Builder (11–15)</span>
                  <span>CEO (16–20)</span>
                </div>
              </div>
            </Animate>

            {/* Achievement badges */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Award size={22} className="text-[#2ecc71]" />
                    <h3 className="text-xl font-bold text-[#111]">Achievement Badges</h3>
                  </div>
                  <span className="text-sm text-[#999]">42 total</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {BADGES_ALL.map((b, i) => (
                    <Animate key={i} delay={i * 0.04} direction="scale">
                      <div className="bg-white border border-[#eee] rounded-xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-default">
                        <span className="text-3xl block mb-2">{b.icon}</span>
                        <p className="text-[11px] text-[#555] font-medium leading-tight">{b.name}</p>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider mt-1.5 inline-block ${b.tier === "gold"
                            ? "text-[#f1c40f]"
                            : b.tier === "silver"
                              ? "text-[#bbb]"
                              : "text-[#cd7f32]"
                            }`}
                        >
                          {b.tier}
                        </span>
                      </div>
                    </Animate>
                  ))}
                </div>
                <p className="text-xs text-[#bbb] mt-4 text-center">
                  + 27 more badges including hidden Revenue Milestone badges
                </p>
              </div>
            </Animate>

            {/* Streak tracker */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Flame size={22} className="text-[#e67e22]" />
                  <h3 className="text-xl font-bold text-[#111]">Streak Bonuses</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { streak: "7-Day", multiplier: "1.5x", color: "#e67e22", desc: "Keep learning for a week straight" },
                    { streak: "14-Day", multiplier: "2x", color: "#e74c3c", desc: "Two weeks of daily progress" },
                    { streak: "30-Day", multiplier: "3x", color: "#9b59b6", desc: "A full month of dedication" },
                  ].map((s, i) => (
                    <Animate key={i} delay={i * 0.1} direction="scale">
                      <div className="bg-white border border-[#eee] rounded-xl p-6 text-center hover:shadow-md transition-all">
                        <Flame size={28} className="mx-auto mb-2" style={{ color: s.color }} />
                        <p className="text-sm font-bold text-[#111]">{s.streak} Streak</p>
                        <p className="text-4xl font-bold mt-1" style={{ color: s.color }}>
                          {s.multiplier}
                        </p>
                        <p className="text-[11px] text-[#999] mt-1">XP Multiplier</p>
                        <p className="text-xs text-[#bbb] mt-2">{s.desc}</p>
                      </div>
                    </Animate>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Power-ups */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Gift size={22} className="text-[#9b59b6]" />
                  <h3 className="text-xl font-bold text-[#111]">Power-Ups (Unlockable Tools)</h3>
                </div>
                <div className="space-y-3">
                  {POWER_UPS.map((p, i) => {
                    const PIcon = p.icon;
                    return (
                      <Animate key={i} delay={i * 0.08} direction="right">
                        <div className="flex items-center justify-between bg-white border border-[#eee] rounded-xl p-5 hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-[#9b59b6]/10 flex items-center justify-center">
                              <PIcon size={20} className="text-[#9b59b6]" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#111]">{p.name}</p>
                              <p className="text-xs text-[#999]">{p.desc}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Lock size={13} className="text-[#ccc]" />
                            <span className="text-xs font-bold text-[#999] bg-[#f0f0f0] px-3 py-1.5 rounded-full">
                              Level {p.level}
                            </span>
                          </div>
                        </div>
                      </Animate>
                    );
                  })}
                </div>
              </div>
            </Animate>
          </div>
        )}

        {/* ── TAB: LEADERBOARD ── */}
        {activeTab === "leaderboard" && (
          <div className="space-y-8">
            {/* Top performers */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy size={22} className="text-[#f1c40f]" />
                  <h3 className="text-xl font-bold text-[#111]">Weekly Top Performers</h3>
                </div>
                <div className="space-y-2">
                  {LEADERBOARD.map((p, i) => (
                    <Animate key={p.rank} delay={i * 0.06}>
                      <div
                        className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-sm ${p.rank === 1
                          ? "bg-[#f1c40f]/5 border border-[#f1c40f]/20"
                          : p.rank === 2
                            ? "bg-[#bbb]/5 border border-[#bbb]/15"
                            : p.rank === 3
                              ? "bg-[#cd7f32]/5 border border-[#cd7f32]/15"
                              : "bg-white border border-[#eee]"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg w-8 text-center font-bold">
                            {p.badge || `#${p.rank}`}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#3498db] flex items-center justify-center text-white text-sm font-bold">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#111]">{p.name}</p>
                            <p className="text-xs text-[#999]">Level {p.level}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#f1c40f]">
                          <Zap size={15} />
                          <span className="text-sm font-bold">{p.xp.toLocaleString()} XP</span>
                        </div>
                      </div>
                    </Animate>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "All-Time XP Rankings",
                  icon: Zap,
                  color: "#f1c40f",
                  desc: "Compete for the top spot on the all-time leaderboard",
                },
                {
                  title: "Most Helpful Members",
                  icon: Users,
                  color: "#2ecc71",
                  desc: "Earn recognition for giving quality feedback to peers",
                },
                {
                  title: "Fastest Completions",
                  icon: Flame,
                  color: "#e67e22",
                  desc: "Speed through modules while maintaining quality scores",
                },
                {
                  title: "Revenue Generated",
                  icon: DollarSign,
                  color: "#e74c3c",
                  desc: "Track real revenue from your startup projects",
                },
              ].map((cat, i) => (
                <Animate key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="bg-[#fafafa] border border-[#eee] rounded-xl p-6 hover:shadow-md hover:border-[#ddd] transition-all">
                    <cat.icon size={24} style={{ color: cat.color }} />
                    <h4 className="text-base font-bold text-[#111] mt-3">{cat.title}</h4>
                    <p className="text-sm text-[#999] mt-1">{cat.desc}</p>
                  </div>
                </Animate>
              ))}
            </div>

            {/* Join CTA */}
            <Animate>
              <div className="bg-[#fafafa] border border-[#2ecc71]/20 rounded-2xl p-8 text-center">
                <p className="text-sm text-[#999]">Enroll to see your ranking</p>
                <p className="text-3xl font-bold text-[#111] mt-1">Join 1,200+ Students</p>
                <p className="text-sm text-[#999] mt-1">Competing for top spots every week</p>
              </div>
            </Animate>
          </div>
        )}
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <Animate>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#111]">What&apos;s Included</h2>
            <p className="text-[#999] text-sm mt-2">Everything you need to go from idea to launched startup</p>
          </div>
        </Animate>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              color: "#2ecc71",
              title: "Unlock System",
              desc: "Complete each module to advance. No skipping — master the foundations first.",
            },
            {
              icon: Target,
              color: "#3498db",
              title: "75%+ Completion Goal",
              desc: "Gamification drives real results. Our students finish at 3x the industry average.",
            },
            {
              icon: Rocket,
              color: "#e67e22",
              title: "Build a Real Business",
              desc: "Every exercise uses your real startup idea. Graduate with a launched product.",
            },
          ].map((item, i) => (
            <Animate key={i} delay={i * 0.1}>
              <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-7 hover:shadow-md transition-all">
                <item.icon size={26} style={{ color: item.color }} className="mb-4" />
                <h4 className="text-base font-bold text-[#111]">{item.title}</h4>
                <p className="text-sm text-[#888] mt-2">{item.desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#fafafa] border-t border-[#eee]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <Animate>
            <h2 className="text-3xl font-bold text-[#111] mb-3">
              Ready to Build Your Startup?
            </h2>
            <p className="text-[#888] text-base mb-8 max-w-lg mx-auto">
              Join thousands of aspiring founders. Start earning XP, unlocking badges,
              and building your real business today.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/courses/learn"
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-[#2ecc71]/20 flex items-center gap-2"
              >
                <Rocket size={18} />
                Enroll for $249.99
              </Link>
              <Link
                href="/"
                className="border border-[#ddd] hover:border-[#bbb] text-[#555] font-medium text-base px-8 py-4 rounded-full transition-colors"
              >
                Back to Home
              </Link>
            </div>
            <p className="text-[11px] text-[#bbb] mt-5">
              30-day money-back guarantee &bull; 6 months access &bull; Lifetime community membership
            </p>
          </Animate>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#eee] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-[#bbb]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L13 12H1L7 0Z" fill="white" />
              </svg>
            </div>
            <span>Future CEO</span>
          </div>
          <span>&copy; {new Date().getFullYear()} FutureCEO. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
