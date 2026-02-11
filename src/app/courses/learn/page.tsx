"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Crown,
  Flame,
  Gift,
  Lock,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  xp: number;
  time: string;
  content: React.ReactNode;
  task: {
    title: string;
    prompt: string;
    checklist: string[];
  };
};

type Challenge = {
  id: string;
  title: string;
  xp: number;
  content: React.ReactNode;
};

type Module = {
  id: number;
  title: string;
  subtitle: string;
  xp: number;
  hours: string;
  unlock: string;
  color: string;
  lessons: Lesson[];
  challenges: Challenge[];
  boss: Challenge;
  mastery: {
    title: string;
    xp: number;
    prompt: string;
    requirements: string[];
    passRule: string;
  };
  badges: string[];
  outcomes: string[];
};

const TOTAL_XP = 15000;
const LEVEL_XP = 750;

type QuizQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

function InteractiveCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 space-y-3">
      <div>
        <p className="text-sm font-bold text-[#111]">{title}</p>
        {subtitle && <p className="text-xs text-[#999] mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function QuickQuiz({ question }: { question: QuizQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === question.correctIndex;
  return (
    <InteractiveCard title="Quick Check" subtitle="Pick the best answer.">
      <p className="text-sm text-[#555]">{question.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {question.options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setSelected(i)}
            className={`text-left text-xs rounded-xl px-3 py-2 border transition-all ${selected === i
              ? isCorrect
                ? "border-[#2ecc71] bg-[#e9f7ef] text-[#1a7a44]"
                : "border-[#e74c3c] bg-[#fdecea] text-[#a94442]"
              : "border-[#eee] bg-[#fafafa] text-[#555] hover:border-[#ddd]"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className={`text-xs ${isCorrect ? "text-[#2ecc71]" : "text-[#e74c3c]"}`}>
          {isCorrect ? "Correct." : "Not quite."} {question.explanation}
        </p>
      )}
    </InteractiveCard>
  );
}

function ClassificationMini() {
  const items = [
    { id: 1, text: "I help people with their taxes every April.", answer: "Side Hustle" },
    { id: 2, text: "We built an app connecting pet owners with local dog walkers.", answer: "Startup" },
    { id: 3, text: "I sell handmade jewelry at craft fairs.", answer: "Small Business" },
    { id: 4, text: "Our software helps restaurants manage inventory automatically.", answer: "Startup" },
  ];
  const [responses, setResponses] = useState<Record<number, string>>({});
  const score = items.reduce((acc, i) => acc + (responses[i.id] === i.answer ? 1 : 0), 0);
  return (
    <InteractiveCard title="Classification Challenge" subtitle="Classify each example.">
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border border-[#eee] bg-[#fafafa] p-3">
            <p className="text-sm text-[#444]">{i.text}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Side Hustle", "Small Business", "Startup"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setResponses((prev) => ({ ...prev, [i.id]: opt }))}
                  className={`text-xs px-3 py-1.5 rounded-full border ${responses[i.id] === opt ? "border-[#111] bg-white text-[#111]" : "border-[#ddd] text-[#666]"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#999]">Score: {score} / {items.length}</p>
    </InteractiveCard>
  );
}

function MindsetMiniAssessment() {
  const questions: QuizQuestion[] = [
    {
      prompt:
        "You spent 2 weeks building your product. 10 people say they wouldn’t use it. You:",
      options: [
        "Abandon the project",
        "Keep building because they don’t get it",
        "Ask why and what they’d want instead",
        "Get angry and defensive",
      ],
      correctIndex: 2,
      explanation: "Curiosity beats defensiveness. Learn before you build more.",
    },
    {
      prompt: "A customer says your pricing is too high. Your best next move is:",
      options: [
        "Drop the price immediately",
        "Ask what they compare it to and why",
        "Argue about your value",
        "Ignore and move on",
      ],
      correctIndex: 1,
      explanation: "Understanding their reference point helps you improve or reposition.",
    },
  ];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = questions.reduce((acc, q, idx) => acc + (answers[idx] === q.correctIndex ? 1 : 0), 0);
  return (
    <InteractiveCard title="Mindset Self-Assessment" subtitle="Answer a few scenarios.">
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.prompt} className="rounded-xl border border-[#eee] bg-[#fafafa] p-3">
            <p className="text-sm text-[#444]">{q.prompt}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {q.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((prev) => ({ ...prev, [idx]: i }))}
                  className={`text-left text-xs rounded-lg px-3 py-2 border ${answers[idx] === i ? "border-[#111] bg-white text-[#111]" : "border-[#ddd] text-[#666]"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#999]">Score: {score} / {questions.length}</p>
    </InteractiveCard>
  );
}

function ProblemTrackerMini() {
  const [problem, setProblem] = useState("");
  const [audience, setAudience] = useState("");
  const [pain, setPain] = useState(5);
  const [items, setItems] = useState<{ problem: string; audience: string; pain: number }[]>([]);
  return (
    <InteractiveCard title="Problem Tracker" subtitle="Log real problems as you find them.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Problem statement"
          className="text-xs rounded-lg border border-[#ddd] px-3 py-2"
        />
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="Target audience"
          className="text-xs rounded-lg border border-[#ddd] px-3 py-2"
        />
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={1}
            max={10}
            value={pain}
            onChange={(e) => setPain(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-[#555]">{pain}/10</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (!problem || !audience) return;
            setItems((prev) => [...prev, { problem, audience, pain }]);
            setProblem("");
            setAudience("");
            setPain(5);
          }}
          className="text-xs font-bold bg-[#111] text-white rounded-full px-4 py-2"
        >
          Add Problem
        </button>
        <button
          onClick={() => setItems([])}
          className="text-xs font-bold bg-[#f2f2f2] text-[#666] rounded-full px-4 py-2"
        >
          Clear
        </button>
      </div>
      <div className="space-y-2">
        {items.map((i, idx) => (
          <div key={`${i.problem}-${idx}`} className="text-xs border border-[#eee] rounded-lg px-3 py-2">
            <span className="font-semibold text-[#111]">{i.problem}</span>
            <span className="text-[#999]"> — {i.audience} • Pain {i.pain}/10</span>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-[#aaa]">No problems logged yet.</p>}
      </div>
    </InteractiveCard>
  );
}

function ICECalculator() {
  const [impact, setImpact] = useState(5);
  const [confidence, setConfidence] = useState(5);
  const [ease, setEase] = useState(5);
  const score = Math.round(((impact + confidence + ease) / 3) * 10) / 10;
  return (
    <InteractiveCard title="ICE Score Calculator" subtitle="Score your ideas quickly.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-[#999] mb-1">Impact</p>
          <input type="range" min={1} max={10} value={impact} onChange={(e) => setImpact(Number(e.target.value))} className="w-full" />
          <p className="text-xs text-[#555] mt-1">{impact}</p>
        </div>
        <div>
          <p className="text-xs text-[#999] mb-1">Confidence</p>
          <input type="range" min={1} max={10} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="w-full" />
          <p className="text-xs text-[#555] mt-1">{confidence}</p>
        </div>
        <div>
          <p className="text-xs text-[#999] mb-1">Ease</p>
          <input type="range" min={1} max={10} value={ease} onChange={(e) => setEase(Number(e.target.value))} className="w-full" />
          <p className="text-xs text-[#555] mt-1">{ease}</p>
        </div>
      </div>
      <div className="rounded-xl bg-[#f8f8f8] border border-[#eee] px-4 py-3 text-sm">
        ICE Score: <span className="font-bold text-[#111]">{score}</span>
      </div>
    </InteractiveCard>
  );
}

function AssumptionMapperMini() {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState("");
  return (
    <InteractiveCard title="Assumption Mapper" subtitle="List your riskiest assumptions.">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Students will pay $10/month"
          className="text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            setItems((prev) => [...prev, text.trim()]);
            setText("");
          }}
          className="text-xs font-bold bg-[#111] text-white rounded-full px-4"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((i, idx) => (
          <div key={`${i}-${idx}`} className="text-xs border border-[#eee] rounded-lg px-3 py-2">
            <span className="font-semibold text-[#111]">Risk {idx + 1}:</span> {i}
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-[#aaa]">No assumptions yet.</p>}
      </div>
    </InteractiveCard>
  );
}

function LandingPageChecklist() {
  const checklist = [
    "Benefit headline above the fold",
    "Subheadline explaining how it works",
    "Primary CTA button",
    "Problem statement section",
    "Solution bullets",
    "How it works in 3 steps",
    "Social proof or numbers",
    "Pricing preview",
    "Final CTA",
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const count = checklist.filter((c) => checked[c]).length;
  return (
    <InteractiveCard title="Landing Page Builder" subtitle="Check off each section.">
      <div className="space-y-2">
        {checklist.map((c) => (
          <label key={c} className="flex items-center gap-2 text-xs text-[#555]">
            <input
              type="checkbox"
              checked={!!checked[c]}
              onChange={() => setChecked((prev) => ({ ...prev, [c]: !prev[c] }))}
            />
            {c}
          </label>
        ))}
      </div>
      <p className="text-xs text-[#999]">Progress: {count} / {checklist.length}</p>
    </InteractiveCard>
  );
}

function PricingTesterMini() {
  const [priceA, setPriceA] = useState(15);
  const [priceB, setPriceB] = useState(25);
  const [priceC, setPriceC] = useState(49);
  const [pick, setPick] = useState<"A" | "B" | "C" | null>(null);
  return (
    <InteractiveCard title="Price Testing" subtitle="Pick a tier that feels right.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { id: "A", price: priceA, label: "Basic" },
          { id: "B", price: priceB, label: "Standard" },
          { id: "C", price: priceC, label: "Premium" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPick(p.id as "A" | "B" | "C")}
            className={`rounded-xl border px-4 py-3 text-left ${pick === p.id ? "border-[#111] bg-white" : "border-[#eee] bg-[#fafafa]"
              }`}
          >
            <p className="text-xs text-[#999]">{p.label}</p>
            <p className="text-lg font-bold text-[#111]">${p.price}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#999]">
        <div className="flex items-center gap-2">
          <span>Basic</span>
          <input type="range" min={5} max={30} value={priceA} onChange={(e) => setPriceA(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex items-center gap-2">
          <span>Standard</span>
          <input type="range" min={15} max={60} value={priceB} onChange={(e) => setPriceB(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex items-center gap-2">
          <span>Premium</span>
          <input type="range" min={30} max={120} value={priceC} onChange={(e) => setPriceC(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      {pick && <p className="text-xs text-[#555]">Selected: {pick} tier</p>}
    </InteractiveCard>
  );
}

const MODULES: Module[] = [
  {
    id: 1,
    title: "Entrepreneurship Foundations",
    subtitle: "Build your founder mindset from scratch",
    xp: 850,
    hours: "6–8",
    unlock: "None",
    color: "#2ecc71",
    outcomes: [
      "Understand what separates startups from small businesses",
      "Develop a resilient founder mindset",
      "Identify real problems worth solving",
      "Generate and filter startup ideas",
    ],
    badges: ["Startup Scholar", "Self-Aware Founder", "Foundation Builder", "Idea Machine"],
    lessons: [
      {
        id: "m1-l1",
        title: "What Is a Startup?",
        xp: 15,
        time: "12 min",
        content: (
          <div className="space-y-4">
            <p>Startups solve problems for profit. Period.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">The difference between a startup and other ventures:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Side Hustle: You trade time for money. Income stops when you stop working. Example: tutoring, lawn mowing, babysitting.</li>
                <li>Small Business: Serves local market, grows slowly, lifestyle income. Example: local bakery, barbershop.</li>
                <li>Startup: Builds scalable solution, targets large market, aims for rapid growth, seeks outside funding (sometimes). Example: Uber, Airbnb, Duolingo.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">The Startup Lifecycle:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Stage 1: Ideation (Week 1–2) — you have a problem and possible solutions. Risk: 95% of ideas never move forward.</li>
                <li>Stage 2: Validation (Week 3–6) — you test if people want your solution. Risk: 70% fail here (building what nobody wants).</li>
                <li>Stage 3: MVP Launch (Week 7–10) — you build the simplest version that works. Risk: 50% fail (poor execution).</li>
                <li>Stage 4: Product-Market Fit (Month 4–12) — people use and pay. Risk: 40% fail (wrong pricing, positioning).</li>
                <li>Stage 5: Growth (Year 2–3) — acquire customers profitably. Risk: 30% fail (running out of money).</li>
                <li>Stage 6: Scale (Year 4+) — expand markets, team, features. Risk: still significant (competition, market changes).</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4">
              <p className="font-semibold text-[#111]">Real Numbers:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1 mt-2">
                <li>90% of startups fail within 3 years.</li>
                <li>Top failure reason: No market need (42%).</li>
                <li>Second reason: Ran out of cash (29%).</li>
                <li>Third reason: Wrong team (23%).</li>
              </ul>
              <p className="text-sm text-[#666] mt-3">This course focuses on avoiding reason #1.</p>
            </div>
            <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Element: Classification Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Read 10 business descriptions. Classify each as: Side Hustle, Small Business, or Startup. Get 8/10 correct to pass.
              </p>
              <p className="text-sm text-[#555] mt-2">Examples:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>"I help people with their taxes every April."</li>
                <li>"We built an app connecting pet owners with local dog walkers."</li>
                <li>"I sell handmade jewelry at craft fairs."</li>
                <li>"Our software helps restaurants manage inventory automatically."</li>
                <li>"I fix computers for neighbors on weekends."</li>
              </ul>
              <p className="text-sm text-[#555] mt-3">Correct answers are revealed after submission with explanations.</p>
            </div>
            <ClassificationMini />
          </div>
        ),
        task: {
          title: "Define Your Startup",
          prompt: "Write a one-sentence definition of your startup idea and classify it as a Side Hustle, Small Business, or Startup.",
          checklist: [
            "One sentence definition",
            "Classification chosen",
            "Reason for classification",
          ],
        },
      },
      {
        id: "m1-l2",
        title: "The Founder Mindset",
        xp: 20,
        time: "18 min",
        content: (
          <div className="space-y-4">
            <p>Your mindset determines your success more than your idea.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Three Core Mindsets:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Problem-Solver, Not Idea Generator.</li>
                <li>Calculated Risk-Taker.</li>
                <li>Resilience Builder.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Problem-Solver Examples:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Bad: "I have a cool idea for an app where you can..."</li>
                <li>Good: "People struggle with X. I noticed this because Y. I want to fix this."</li>
              </ul>
              <p className="text-sm text-[#555]">
                Example: Bad: "App where friends share music playlists." Good: "Friends waste time texting song recommendations. An app that auto-shares your current song to a group playlist solves this."
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Calculated Risk-Taker:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Risks founders take: time, money (small), reputation, opportunity cost.</li>
                <li>Risks founders don’t take: betting essentials, ignoring relationships, breaking laws, hurting others.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Case Study: Sarah, Age 16</p>
              <p className="text-sm text-[#555]">Built a tutoring marketplace with $0 upfront, tested with 5 students, kept her part-time job, spent 5 hours/week for 2 months. Result: $340 first month, quit after 4 months (too much work for return).</p>
              <p className="text-sm text-[#555]">Lesson: validated idea, learned skills, lost nothing. Reckless risk would have been quitting job, buying ads, building complex platform first.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Resilience Builder:</p>
              <p className="text-sm text-[#555]">Every founder faces rejection, failure, criticism, setbacks. Resilience = continuing despite these.</p>
              <p className="font-semibold text-[#111]">Framework: The 3 Rs</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Recognize: Name what went wrong specifically.</li>
                <li>Reflect: Ask why without blame.</li>
                <li>Respond: Adjust and try again.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4">
              <p className="font-semibold text-[#111]">Story Time: Jake’s Failure</p>
              <p className="text-sm text-[#555] mt-2">
                Jake (15) launched a study app. Zero downloads in week 1. He asked 5 friends why they didn’t download, learned they didn’t know what it did, rewrote the description, got 47 downloads week 2. Resilience in action.
              </p>
            </div>
            <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Element: Mindset Self-Assessment (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Answer 15 scenario-based questions. Receive a mindset score (1–100) and a personalized development plan.
              </p>
              <p className="text-sm text-[#555] mt-2">
                Sample: "You spent 2 weeks building your product. You show it to 10 people. All 10 say they wouldn’t use it. You:"
              </p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>A) Feel devastated and abandon the project</li>
                <li>B) Assume they don’t understand it and keep building</li>
                <li>C) Ask them why and what they would want instead</li>
                <li>D) Get angry and defensive</li>
              </ul>
              <p className="text-sm text-[#555] mt-2">Correct answer: C (with explanation). Badge unlocked: "Self-Aware Founder".</p>
            </div>
            <MindsetMiniAssessment />
          </div>
        ),
        task: {
          title: "Mindset Shift",
          prompt: "Describe a recent setback and apply the 3 Rs (Recognize, Reflect, Respond).",
          checklist: [
            "Setback described",
            "3 Rs applied",
            "One next action listed",
          ],
        },
      },
      {
        id: "m1-l3",
        title: "Problem Hunting",
        xp: 25,
        time: "22 min",
        content: (
          <div className="space-y-4">
            <p>Great startups start with painful problems, not clever ideas.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">The Problem Hierarchy:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Level 1: Annoying (people complain but don’t act). Example: "Ugh, I hate folding laundry."</li>
                <li>Level 2: Frustrating (people try workarounds). Example: "I keep a list on my phone to remember gift ideas."</li>
                <li>Level 3: Painful (people pay for bad solutions). Example: "I pay $15/month for this app even though I hate the interface."</li>
                <li>Level 4: Critical (people need this solved). Example: "My mom missed important medication reminders twice this month."</li>
              </ul>
              <p className="text-sm text-[#555]">Your goal: find Level 3–4 problems.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Where to Hunt for Problems:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Reddit: r/mildlyinfuriating, r/DoesAnybodyElse, industry subreddits. Look for 500+ upvotes.</li>
                <li>Twitter/X: search "I hate when", "Why is there no", "I wish someone would".</li>
                <li>Amazon/App Store reviews: 2–3 star reviews with repeated complaints.</li>
                <li>Real world: observe people, listen to complaints, interviews, personal experience.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Problem Documentation Framework:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Problem statement (one sentence)</li>
                <li>Who experiences this?</li>
                <li>How often?</li>
                <li>Current solutions</li>
                <li>Pain level (1–10)</li>
                <li>Evidence</li>
              </ul>
              <p className="text-sm text-[#555]">Example: Students lose track of assignment due dates across multiple platforms (Google Classroom, Canvas, teacher sites, email).</p>
            </div>
            <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Problem Hunter Mission (100 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Find and document 10 real problems. At least 5 from online sources, 3 from personal observation, 2 with pain level 6+.
              </p>
              <p className="text-sm text-[#555] mt-2">Bonus XP: +50 for a Level 4 problem, +25 for 15+ problems, +25 for a unique community find.</p>
              <p className="text-sm text-[#555] mt-2">Template: Problem Tracker Spreadsheet (Google Sheets).</p>
            </div>
            <ProblemTrackerMini />
          </div>
        ),
        task: {
          title: "Problem Log",
          prompt: "Document 3 real problems you observed this week using the framework.",
          checklist: [
            "3 problems documented",
            "Audience specified",
            "Pain level included",
          ],
        },
      },
      {
        id: "m1-l4",
        title: "From Problems to Ideas",
        xp: 20,
        time: "16 min",
        content: (
          <div className="space-y-4">
            <p>Now you have problems. Time to generate solutions.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Ideation Rules:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Quantity over quality (at first). Generate 20+ ideas before judging.</li>
                <li>Build on existing solutions. Make something 10x better.</li>
                <li>Start simple. The best first idea is the easiest to test.</li>
                <li>Focus on one target user.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Technique 1: SCAMPER</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.</li>
              </ul>
              <p className="text-sm text-[#555]">Example: Students forget water bottles → smart bottle cap that beeps.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Technique 2: The "What If" Game</p>
              <p className="text-sm text-[#555]">
                Take your problem and ask 10 "what if" questions (e.g., free textbooks, pay by chapter, AI summaries, rentals, etc.).
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Technique 3: Constraint-Based Thinking</p>
              <p className="text-sm text-[#555]">"How would I solve this with $0? in 1 day? with only my phone? for 100 people at once?"</p>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Evaluating Ideas: ICE Score</p>
              <p className="text-sm text-[#555]">Impact + Confidence + Ease / 3</p>
              <p className="text-sm text-[#555]">
                Example: Instagram account for textbook buy/sell may beat a full app because it’s easier and more testable.
              </p>
              <p className="text-sm text-[#555]">Green flags: solves a personal problem, people already pay, easy to explain, builds fast.</p>
              <p className="text-sm text-[#555]">Red flags: big behavior change, network effects required, expensive, long build.</p>
            </div>
            <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Idea Generation Sprint (100 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Choose 3 problems, generate 5 ideas per problem (15 total), score with ICE, select top 3 with 100–200 words on why.
              </p>
              <p className="text-sm text-[#555] mt-2">Bonus XP: +50 for 25+ ideas, +25 for ICE 8+ idea.</p>
              <p className="text-sm text-[#555] mt-2">Template: Idea Evaluation Matrix (Google Sheets).</p>
            </div>
            <ICECalculator />
          </div>
        ),
        task: {
          title: "Idea Sprint",
          prompt: "Pick 1 problem and generate 5 ideas. ICE score each and pick your top 1.",
          checklist: [
            "5 ideas listed",
            "ICE scores added",
            "Top idea selected",
          ],
        },
      },
    ],
    challenges: [
      {
        id: "m1-c1",
        title: "Classification Challenge",
        xp: 50,
        content: <p>Classify 10 business descriptions. Get 8/10 correct to pass.</p>,
      },
      {
        id: "m1-c2",
        title: "Mindset Self-Assessment",
        xp: 75,
        content: <p>Answer 15 scenarios. Get a mindset score and improvement plan.</p>,
      },
      {
        id: "m1-c3",
        title: "Problem Hunter Mission",
        xp: 100,
        content: <p>Document 10 real problems with evidence. Bonus XP for Level 4 problems.</p>,
      },
      {
        id: "m1-c4",
        title: "Idea Generation Sprint",
        xp: 100,
        content: <p>Generate 15 ideas, ICE score them, and pick your top 3.</p>,
      },
    ],
    boss: {
      id: "m1-boss",
      title: "Boss Challenge: The Problem-Solution Pitch",
      xp: 200,
      content: (
        <div className="space-y-2">
          <p>Write a 250-word pitch answering: problem, who it affects, evidence, solution, differentiation, simplest test.</p>
          <p className="text-sm text-[#555]">Pass: 70/100. Unlocks Module 2. Rewards: 850 XP, Level 2, badges, template pack.</p>
        </div>
      ),
    },
    mastery: {
      title: "Module Mastery Task: Foundations Proof",
      xp: 250,
      prompt:
        "Submit a 250–300 word Problem-Solution Pitch that shows you can define a real problem, identify a target user, and propose a testable solution.",
      requirements: [
        "Clear problem statement and target user",
        "Evidence that the problem is real",
        "Simple solution idea and first test",
        "Why it’s better than current options",
      ],
      passRule: "70/100 rubric minimum",
    },
  },
  {
    id: 2,
    title: "Idea Validation",
    subtitle: "Test your ideas before building anything",
    xp: 1200,
    hours: "10–14",
    unlock: "Complete Module 1",
    color: "#3498db",
    outcomes: [
      "Avoid the #1 reason startups fail",
      "Conduct real customer interviews",
      "Build a landing page that converts",
      "Design pricing that works",
    ],
    badges: ["Validation Master", "Data Detective", "Competitor Crusher"],
    lessons: [
      {
        id: "m2-l1",
        title: "Why Most Startups Fail",
        xp: 20,
        time: "14 min",
        content: (
          <div className="space-y-3">
            <p>42% of startups fail because nobody wants what they built.</p>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">The Build Trap</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Have an idea → spend months building → launch to crickets.</li>
                <li>Validation feels scary, building feels productive.</li>
                <li>Result: wasted time, money, and emotional energy.</li>
              </ul>
            </div>
            <p className="font-semibold text-[#111]">Validation Hierarchy:</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Level 1: People say they have the problem (low value).</li>
              <li>Level 2: People say your solution sounds interesting.</li>
              <li>Level 3: People give contact info.</li>
              <li>Level 4: People pre-order / join waitlist with payment info.</li>
              <li>Level 5: People pay you money (highest value).</li>
            </ul>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4">
              <p className="font-semibold text-[#111]">Case Study: Emma’s Mistake</p>
              <p className="text-sm text-[#555] mt-2">
                She built a full study partner app for 4 months, launched to 3 users. She should have tested with a Google Form and manual matching first.
              </p>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Element: Assumption Mapper (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">List assumptions, rank by risk, test the top 3 first.</p>
            </div>
            <AssumptionMapperMini />
          </div>
        ),
        task: {
          title: "Risk Assumptions",
          prompt: "List your top 3 riskiest assumptions and why each could kill the idea.",
          checklist: [
            "3 assumptions listed",
            "Risk reason for each",
            "Top 1 prioritized",
          ],
        },
      },
      {
        id: "m2-l2",
        title: "Customer Research Fundamentals",
        xp: 25,
        time: "24 min",
        content: (
          <div className="space-y-3">
            <p>You need to talk to potential customers. Here's how.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Two Research Methods</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Surveys (quantitative): reach 100+ people, but surface-level and low response rates.</li>
                <li>Interviews (qualitative): rich insights but time-intensive.</li>
              </ul>
              <p className="text-sm text-[#555]">Best approach: 10–15 interviews, then 50–100 surveys.</p>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Survey Design Principles</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Ask about past behavior, not future intent.</li>
                <li>Be specific.</li>
                <li>Avoid leading questions.</li>
                <li>Keep it short (10 questions max).</li>
                <li>Mix question types.</li>
              </ul>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Survey Builder Quest (100 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Create a 10-question survey, share with 20 people minimum, submit link and results.
              </p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which survey question is best for validation?",
                options: [
                  "Would you use an app that does X?",
                  "How many times in the past month did you struggle with X?",
                  "Do you like apps?",
                  "Is X annoying?",
                ],
                correctIndex: 1,
                explanation: "Past behavior is more reliable than future intent.",
              }}
            />
          </div>
        ),
        task: {
          title: "Interview Prep",
          prompt: "Write 5 interview questions that focus on past behavior (not future intent).",
          checklist: [
            "5 questions written",
            "At least 3 about past behavior",
            "One question about current solutions",
          ],
        },
      },
      {
        id: "m2-l3",
        title: "The Landing Page Test",
        xp: 25,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>A landing page tests if people want your product before you build it.</p>
            <p className="font-semibold text-[#111]">Landing Page Structure:</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Hero: benefit headline, subheadline, CTA, visual.</li>
              <li>Problem statement: 3 pain points.</li>
              <li>Solution overview: 3–4 features.</li>
              <li>How it works: 3 steps max.</li>
              <li>Social proof (if you have it).</li>
              <li>Pricing preview (optional).</li>
              <li>Final CTA.</li>
            </ul>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Measuring Success</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Target: 5%+ conversion rate.</li>
                <li>Minimum validation: 50+ visitors, 5%+ conversion, 25+ emails.</li>
                <li>Strong validation: 200+ visitors, 10%+ conversion, 100+ emails.</li>
              </ul>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Landing Page Launch (200 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Build a landing page, drive 50+ visitors, hit 3%+ conversion, collect 25+ emails. Submit link + screenshots + reflection.
              </p>
            </div>
            <LandingPageChecklist />
          </div>
        ),
        task: {
          title: "Landing Page Draft",
          prompt: "Draft a hero headline + subheadline + CTA for your landing page.",
          checklist: [
            "Benefit headline",
            "How-it-works subheadline",
            "Clear CTA",
          ],
        },
      },
      {
        id: "m2-l4",
        title: "The MVP Mindset",
        xp: 25,
        time: "18 min",
        content: (
          <div className="space-y-3">
            <p>MVP = Minimum Viable Product. The smallest version that delivers core value.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">MVP Types:</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Wizard of Oz: manual backend appears automated.</li>
                <li>Concierge MVP: personal service for a few customers.</li>
                <li>Piecemeal MVP: combine existing tools.</li>
                <li>Landing Page MVP: test demand with a page first.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Common MVP Mistakes</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Too many features.</li>
                <li>Building for scale too early.</li>
                <li>Perfect design before validation.</li>
                <li>Waiting too long to launch.</li>
              </ul>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: MVP Blueprint (150 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                List features, categorize as Must/Should/Nice, choose MVP type, create plan, define success criteria.
              </p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which MVP type fits a service business best?",
                options: ["Piecemeal MVP", "Concierge MVP", "Explainer Video MVP", "Landing Page MVP"],
                correctIndex: 1,
                explanation: "Concierge MVP delivers the service manually while you learn.",
              }}
            />
          </div>
        ),
        task: {
          title: "MVP Type Selection",
          prompt: "Choose your MVP type and justify it in 2–3 sentences.",
          checklist: [
            "MVP type selected",
            "Justification included",
            "Core assumption stated",
          ],
        },
      },
      {
        id: "m2-l5",
        title: "Pricing Psychology",
        xp: 30,
        time: "22 min",
        content: (
          <div className="space-y-3">
            <p>Price too high: nobody buys. Too low: you go broke. Charge based on value, not cost.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Pricing Methods</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Van Westendorp price sensitivity survey.</li>
                <li>Tiered testing (basic/standard/premium).</li>
                <li>Direct price expectation question.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Pricing Psychology Hacks</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Charm pricing ($29 vs $30)</li>
                <li>Anchoring and decoy pricing</li>
                <li>Annual discounts</li>
                <li>Early bird pricing</li>
              </ul>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Price Testing Mission (150 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Test 3 prices, gather 30+ responses, project revenue, choose best price with rationale.
              </p>
            </div>
            <PricingTesterMini />
          </div>
        ),
        task: {
          title: "Price Range Hypothesis",
          prompt: "Pick 3 price points you’ll test and explain why each is reasonable.",
          checklist: [
            "3 prices listed",
            "Reasoning for each",
            "One target price selected",
          ],
        },
      },
      {
        id: "m2-l6",
        title: "Competitive Analysis",
        xp: 25,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Competition validates demand. Look for gaps you can own.</p>
            <div className="space-y-2">
              <p className="font-semibold text-[#111]">Types of Competition</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Direct: same solution, same customers.</li>
                <li>Indirect: different solution, same problem.</li>
                <li>Substitutes: different problem, same budget/time.</li>
              </ul>
            </div>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Positioning Statement</p>
              <p className="text-sm text-[#555]">
                For [customer] who [problem], [product] is a [category] that [benefit]. Unlike [competitor], we [key difference].
              </p>
            </div>
            <div className="bg-[#3498db]/10 border border-[#3498db]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Interactive Challenge: Competitive Intelligence Report (175 XP)</p>
              <p className="text-sm text-[#555] mt-2">
                Analyze 5 competitors, build a comparison matrix, write a positioning statement, and explain your advantage.
              </p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which statement is the best positioning format?",
                options: [
                  "We’re better than everyone.",
                  "For [customer] who [problem], [product] is a [category] that [benefit]. Unlike [competitor], we [difference].",
                  "We’re cheaper.",
                  "We have more features.",
                ],
                correctIndex: 1,
                explanation: "Specific, comparable, and defensible positioning wins.",
              }}
            />
          </div>
        ),
        task: {
          title: "Competitor Snapshot",
          prompt: "List 3 competitors (direct/indirect) and one weakness for each.",
          checklist: [
            "3 competitors listed",
            "Type identified",
            "One weakness per competitor",
          ],
        },
      },
    ],
    challenges: [
      { id: "m2-c1", title: "Assumption Mapper", xp: 75, content: <p>Rank your top 3 riskiest assumptions.</p> },
      { id: "m2-c2", title: "Survey Builder Quest", xp: 100, content: <p>Create a 10-question survey and collect 20+ responses.</p> },
      { id: "m2-c3", title: "Landing Page Launch", xp: 200, content: <p>Build a landing page, drive traffic, measure conversion.</p> },
      { id: "m2-c4", title: "MVP Blueprint", xp: 150, content: <p>Plan your MVP and success criteria.</p> },
      { id: "m2-c5", title: "Price Testing Mission", xp: 150, content: <p>Test 3 prices and analyze results.</p> },
      { id: "m2-c6", title: "Competitive Intelligence Report", xp: 175, content: <p>Analyze competitors and craft your positioning.</p> },
    ],
    boss: {
      id: "m2-boss",
      title: "Boss Challenge: Validation Evidence Portfolio",
      xp: 300,
      content: (
        <div className="space-y-2">
          <p>Compile landing page results, survey data, interviews, pricing, and competitive analysis.</p>
          <p className="text-sm text-[#555]">Pass: 140/200. Unlocks Module 3. Rewards: 1,200 XP, Level 3–4, badges.</p>
        </div>
      ),
    },
    mastery: {
      title: "Module Mastery Task: Validation Proof",
      xp: 350,
      prompt:
        "Submit a Validation Evidence Portfolio (landing page metrics, survey results, interview insights, pricing test, and competitor analysis).",
      requirements: [
        "Landing page metrics + conversion rate",
        "50+ survey responses summary",
        "10+ interview insights",
        "Price test results",
        "Competitive analysis snapshot",
      ],
      passRule: "Minimum Level 3 validation achieved",
    },
  },
  {
    id: 3,
    title: "Business Model & Planning",
    subtitle: "Design a business that makes money",
    xp: 1100,
    hours: "8–12",
    unlock: "Complete Module 2",
    color: "#9b59b6",
    outcomes: [
      "Master the Business Model Canvas",
      "Craft a compelling value proposition",
      "Map revenue streams and cost structures",
      "Plan your go-to-market strategy",
    ],
    badges: ["Resource Wrangler", "Problem-Solution Architect", "Channel Navigator", "Money Maestro"],
    lessons: [
      {
        id: "m3-l1",
        title: "Business Model Fundamentals",
        xp: 25,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Business model = how you make money.</p>
            <p className="font-semibold text-[#111]">One-sentence model:</p>
            <p className="text-sm text-[#555]">We help [customer] solve [problem] by [solution] and make money through [revenue model].</p>
            <div className="bg-[#f8f8f8] border border-[#eee] rounded-xl p-4 space-y-2">
              <p className="font-semibold text-[#111]">Business Model Canvas (9 blocks)</p>
              <ul className="list-disc pl-5 text-[#555] space-y-1">
                <li>Customer Segments</li>
                <li>Value Propositions</li>
                <li>Channels</li>
                <li>Customer Relationships</li>
                <li>Revenue Streams</li>
                <li>Key Resources</li>
                <li>Key Activities</li>
                <li>Key Partners</li>
                <li>Cost Structure</li>
              </ul>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which block describes how customers find you?",
                options: ["Value Proposition", "Channels", "Key Resources", "Revenue Streams"],
                correctIndex: 1,
                explanation: "Channels define the path from awareness to purchase and delivery.",
              }}
            />
          </div>
        ),
        task: {
          title: "One-Sentence Model",
          prompt: "Write your one-sentence business model using the formula provided.",
          checklist: [
            "Customer segment named",
            "Problem and solution included",
            "Revenue model specified",
          ],
        },
      },
      {
        id: "m3-l2",
        title: "Key Resources",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Key resources are the essential assets your startup needs to operate and deliver value.</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Physical: laptops, equipment, inventory.</li>
              <li>Intellectual: patents, trademarks, brand, data.</li>
              <li>Human: developers, designers, marketers, advisors.</li>
              <li>Financial: bootstrapping, investors, revenue.</li>
            </ul>
            <div className="bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Resource Audit Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Identify 10 key resources, categorize them, and rank criticality.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is an intellectual resource?",
                options: ["Warehouse space", "Patents", "Delivery truck", "Cash balance"],
                correctIndex: 1,
                explanation: "Patents and proprietary knowledge are intellectual resources.",
              }}
            />
          </div>
        ),
        task: {
          title: "Resource Audit",
          prompt: "List 6 key resources you need today and categorize them.",
          checklist: [
            "6 resources listed",
            "Each categorized",
            "Top 2 critical marked",
          ],
        },
      },
      {
        id: "m3-l3",
        title: "Value Proposition Design",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Your value proposition explains why your startup matters to customers.</p>
            <p className="font-semibold text-[#111]">Value Proposition Canvas:</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Customer jobs, pains, gains.</li>
              <li>Products/services, pain relievers, gain creators.</li>
            </ul>
            <div className="bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Value Proposition Canvas Quest (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create canvases for your top 3 ideas and map pains/gains to features.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "In the Value Proposition Canvas, pains and gains belong to:",
                options: ["Value Map", "Customer Profile", "Revenue Streams", "Key Partners"],
                correctIndex: 1,
                explanation: "Customer Profile includes jobs, pains, and gains.",
              }}
            />
          </div>
        ),
        task: {
          title: "Pain-Gain Mapping",
          prompt: "List 3 pains and 3 gains for your target customer.",
          checklist: [
            "3 pains listed",
            "3 gains listed",
            "One feature mapped to a pain",
          ],
        },
      },
      {
        id: "m3-l4",
        title: "Channels",
        xp: 25,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Channels are how you deliver your product to customers.</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Direct vs. indirect channels.</li>
              <li>Owned vs. paid channels.</li>
              <li>Awareness → evaluation → purchase → delivery → post-sales.</li>
            </ul>
            <div className="bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Channel Mapping (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">List 5 channels, identify stage, type, cost, reach.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is a paid acquisition channel?",
                options: ["TikTok ads", "Word of mouth", "Referral invites", "Community forum"],
                correctIndex: 0,
                explanation: "Ads are paid channels; the others are owned/earned.",
              }}
            />
          </div>
        ),
        task: {
          title: "Channel Plan",
          prompt: "Pick 3 channels and note stage + cost for each.",
          checklist: [
            "3 channels chosen",
            "Stage identified",
            "Cost noted",
          ],
        },
      },
      {
        id: "m3-l5",
        title: "Cost Structure & Revenue Streams",
        xp: 40,
        time: "30 min",
        content: (
          <div className="space-y-3">
            <p>Know where money goes (costs) and how it comes in (revenue).</p>
            <ul className="list-disc pl-5 text-[#555] space-y-1">
              <li>Fixed vs. variable costs.</li>
              <li>Economies of scale.</li>
              <li>Revenue: subscriptions, transactions, freemium, licensing.</li>
            </ul>
            <div className="bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Financial Blueprint Challenge (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">Map costs and revenue, include break-even if possible.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which cost usually scales with each customer?",
                options: ["Rent", "Server usage", "Salary", "Insurance"],
                correctIndex: 1,
                explanation: "Server usage is typically a variable cost.",
              }}
            />
          </div>
        ),
        task: {
          title: "Cost & Revenue Table",
          prompt: "List 3 costs and 2 revenue streams for your MVP.",
          checklist: [
            "3 costs listed",
            "2 revenue streams listed",
            "One assumption noted",
          ],
        },
      },
    ],
    challenges: [
      { id: "m3-c1", title: "Resource Audit Challenge", xp: 50, content: <p>Identify 10 key resources.</p> },
      { id: "m3-c2", title: "Value Proposition Canvas Quest", xp: 75, content: <p>Create canvases for top 3 ideas.</p> },
      { id: "m3-c3", title: "Channel Mapping", xp: 50, content: <p>Map 5 channels across stages.</p> },
      { id: "m3-c4", title: "Financial Blueprint Challenge", xp: 75, content: <p>Build a simple cost/revenue table.</p> },
    ],
    boss: {
      id: "m3-boss",
      title: "Boss Challenge: Business Model Canvas",
      xp: 200,
      content: <p>Submit a full Business Model Canvas with supporting exercises.</p>,
    },
    mastery: {
      title: "Module Mastery Task: Business Model Submission",
      xp: 250,
      prompt: "Submit a completed Business Model Canvas with costs, revenues, and channels.",
      requirements: [
        "All 9 canvas blocks filled",
        "Costs and revenue assumptions included",
        "Primary channel identified",
      ],
      passRule: "All blocks complete",
    },
  },
  {
    id: 4,
    title: "MVP Execution & Growth",
    subtitle: "Build, launch, and grow your first product",
    xp: 1100,
    hours: "10–14",
    unlock: "Complete Module 3",
    color: "#e67e22",
    outcomes: [
      "Choose the right MVP approach for your idea",
      "Build a functional prototype",
      "Track the metrics that matter",
      "Acquire your first 100 customers",
    ],
    badges: ["MVP Mastermind", "Prototype Pioneer", "Metric Maverick", "Growth Hacker", "Retention Rockstar", "Scale Strategist"],
    lessons: [
      {
        id: "m4-l1",
        title: "MVP Fundamentals",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>An MVP is the simplest version that solves a core problem and validates your hypothesis.</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">MVP Idea Refinement (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">List 3 core features, rank must-have vs. optional.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "The main purpose of an MVP is to:",
                options: ["Look impressive", "Validate assumptions", "Scale quickly", "Beat competitors"],
                correctIndex: 1,
                explanation: "MVPs are for learning and validation, not polish.",
              }}
            />
          </div>
        ),
        task: {
          title: "MVP Scope",
          prompt: "List 3 must-have features and 3 nice-to-have features.",
          checklist: [
            "3 must-haves",
            "3 nice-to-haves",
            "Core value stated",
          ],
        },
      },
      {
        id: "m4-l2",
        title: "MVP Types",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Landing page, explainer video, Wizard of Oz, concierge, piecemeal.</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">MVP Prototype Quest (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create a prototype and get feedback from 3 users.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Wizard of Oz MVP means:",
                options: [
                  "A fully automated backend",
                  "Manual backend that looks automated",
                  "A marketing-only landing page",
                  "A broken prototype",
                ],
                correctIndex: 1,
                explanation: "Users see automation while you manually deliver.",
              }}
            />
          </div>
        ),
        task: {
          title: "Prototype Plan",
          prompt: "Choose your MVP type and outline the steps to build it.",
          checklist: [
            "MVP type selected",
            "3 build steps",
            "Test method chosen",
          ],
        },
      },
      {
        id: "m4-l3",
        title: "Metrics & Validation",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Track acquisition, retention, and revenue. Use AARRR (Pirate Metrics).</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Metrics Mapping Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Map 3 core metrics and why they matter.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Retention measures:",
                options: ["How users find you", "Whether users keep using you", "How much you charge", "How fast you ship"],
                correctIndex: 1,
                explanation: "Retention is about continued usage.",
              }}
            />
          </div>
        ),
        task: {
          title: "Metrics Map",
          prompt: "Define 1 acquisition, 1 activation, and 1 retention metric.",
          checklist: [
            "Acquisition metric",
            "Activation metric",
            "Retention metric",
          ],
        },
      },
      {
        id: "m4-l4",
        title: "Customer Acquisition",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Organic, paid, referral, and partnership tactics to get first users.</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Acquisition Funnel Map (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Define awareness → interest → action → referral funnel.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is an activation metric?",
                options: ["Ad impressions", "First core action completed", "Total revenue", "Churn rate"],
                correctIndex: 1,
                explanation: "Activation is the first meaningful action.",
              }}
            />
          </div>
        ),
        task: {
          title: "First 50 Users",
          prompt: "List 5 ways you’ll reach your first 50 users.",
          checklist: [
            "5 tactics listed",
            "At least 2 free channels",
            "One measurable target",
          ],
        },
      },
      {
        id: "m4-l5",
        title: "Retention & Engagement",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Retention tactics: streaks, push notifications, loyalty programs, and community.</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Retention Blueprint Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Design a 3-step retention plan with gamification.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "A streak bonus is primarily a:",
                options: ["Acquisition tactic", "Retention tactic", "Revenue model", "Branding tactic"],
                correctIndex: 1,
                explanation: "Streaks encourage return usage.",
              }}
            />
          </div>
        ),
        task: {
          title: "Retention Plan",
          prompt: "Design a 3-step retention system with a streak or reward.",
          checklist: [
            "3 steps defined",
            "Gamification element included",
            "Trigger or reminder defined",
          ],
        },
      },
      {
        id: "m4-l6",
        title: "Scaling Basics",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Scale after PMF: automate, expand team, grow marketing, scale infrastructure.</p>
            <div className="bg-[#e67e22]/10 border border-[#e67e22]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Scale Readiness Checklist (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Evaluate 5 areas as red/yellow/green.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "A strong signal to scale is:",
                options: ["No users but big vision", "Consistent retention and demand", "Lots of press", "A perfect logo"],
                correctIndex: 1,
                explanation: "Scale when users stick and demand is predictable.",
              }}
            />
          </div>
        ),
        task: {
          title: "Scale Readiness",
          prompt: "Rate your startup on PMF, revenue, operations, and team (1–5).",
          checklist: [
            "4 ratings provided",
            "Lowest area identified",
            "One fix proposed",
          ],
        },
      },
    ],
    challenges: [
      { id: "m4-c1", title: "MVP Idea Refinement", xp: 50, content: <p>Rank features by necessity.</p> },
      { id: "m4-c2", title: "MVP Prototype Quest", xp: 75, content: <p>Prototype + 3 user feedbacks.</p> },
      { id: "m4-c3", title: "Metrics Mapping Challenge", xp: 50, content: <p>Define acquisition/retention/revenue metrics.</p> },
      { id: "m4-c4", title: "Acquisition Funnel Map", xp: 50, content: <p>Map awareness to referral funnel.</p> },
      { id: "m4-c5", title: "Retention Blueprint Challenge", xp: 50, content: <p>3-step retention plan with gamification.</p> },
      { id: "m4-c6", title: "Scale Readiness Checklist", xp: 50, content: <p>Assess scale readiness.</p> },
    ],
    boss: {
      id: "m4-boss",
      title: "Boss Challenge: MVP Execution & Growth Plan",
      xp: 200,
      content: <p>Submit prototype, metrics, acquisition, retention, and scaling plan.</p>,
    },
    mastery: {
      title: "Module Mastery Task: MVP Proof",
      xp: 250,
      prompt: "Submit your MVP prototype link or screenshots with a 1-page plan.",
      requirements: [
        "Prototype link or screenshots",
        "MVP scope and core value",
        "3 user feedback notes",
      ],
      passRule: "Prototype + feedback required",
    },
  },
  {
    id: 5,
    title: "Funding & Launch",
    subtitle: "Raise money and launch to the world",
    xp: 1200,
    hours: "10–14",
    unlock: "Complete Module 4",
    color: "#e74c3c",
    outcomes: [
      "Understand bootstrapping vs. VC vs. angel funding",
      "Craft a winning pitch deck",
      "Execute a launch strategy",
      "Navigate basic legal requirements",
    ],
    badges: ["Funding Forecaster", "Pitch Perfect", "Launch Leader", "Iteration Innovator", "Legal Eagle", "Finance Wizard"],
    lessons: [
      {
        id: "m5-l1",
        title: "Funding Fundamentals",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Bootstrapping, friends & family, angels, VC, crowdfunding.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Funding Match Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Match funding types to startup stages.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which funding type fits early validation best?",
                options: ["VC", "Friends & family", "Series B", "IPO"],
                correctIndex: 1,
                explanation: "Friends & family often fit early-stage validation.",
              }}
            />
          </div>
        ),
        task: {
          title: "Funding Fit",
          prompt: "Choose your top funding path and explain why it fits your stage.",
          checklist: [
            "Funding type chosen",
            "Stage fit explained",
            "Risk noted",
          ],
        },
      },
      {
        id: "m5-l2",
        title: "Pitching to Investors",
        xp: 40,
        time: "30 min",
        content: (
          <div className="space-y-3">
            <p>Pitch includes problem, solution, market, business model, traction, team, ask.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Pitch Deck Draft (75 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create a 5-slide deck.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which slide usually comes first?",
                options: ["Traction", "Problem", "Ask", "Competition"],
                correctIndex: 1,
                explanation: "Start with the problem so the need is clear.",
              }}
            />
          </div>
        ),
        task: {
          title: "Pitch Outline",
          prompt: "Write a 6-bullet pitch outline (problem, solution, market, model, traction, ask).",
          checklist: [
            "6 bullets written",
            "Market size noted",
            "Ask specified",
          ],
        },
      },
      {
        id: "m5-l3",
        title: "Launch Planning",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Soft launch, beta launch, full launch. Plan 4-week calendar.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Launch Calendar Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create a 4-week launch plan.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "A beta launch is best described as:",
                options: [
                  "Public launch with press",
                  "Invite-only testing with feedback",
                  "No users allowed",
                  "A marketing-only teaser",
                ],
                correctIndex: 1,
                explanation: "Beta = limited access for feedback and iteration.",
              }}
            />
          </div>
        ),
        task: {
          title: "Launch Calendar",
          prompt: "Draft a 4-week launch plan with 2 tactics per week.",
          checklist: [
            "4 weeks listed",
            "2 tactics per week",
            "One feedback loop included",
          ],
        },
      },
      {
        id: "m5-l4",
        title: "Post-Launch Metrics & Iteration",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Track acquisition, engagement, retention, revenue and iterate fast.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Post-Launch Analytics Map (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Define 3 metrics and 2 iterative changes.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is an engagement metric?",
                options: ["Daily active users", "Funding raised", "Runway months", "Team size"],
                correctIndex: 0,
                explanation: "DAU measures active use and engagement.",
              }}
            />
          </div>
        ),
        task: {
          title: "Iteration Plan",
          prompt: "Define 2 metrics and 2 changes you’d make based on results.",
          checklist: [
            "2 metrics defined",
            "2 changes listed",
            "One timeline noted",
          ],
        },
      },
      {
        id: "m5-l5",
        title: "Legal & Compliance Essentials",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Business structure, IP, contracts, licenses/permits.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Legal Checklist Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create a legal checklist with status.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which protects your brand name?",
                options: ["Trademark", "Patent", "Copyright", "NDA"],
                correctIndex: 0,
                explanation: "Trademarks protect brand names and logos.",
              }}
            />
          </div>
        ),
        task: {
          title: "Legal Checklist",
          prompt: "List 4 legal items you need and mark status.",
          checklist: [
            "4 items listed",
            "Status marked",
            "One priority noted",
          ],
        },
      },
      {
        id: "m5-l6",
        title: "Financial Planning",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>12-month budget, revenue forecast, break-even analysis.</p>
            <div className="bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Financial Forecast Blueprint (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Draft a realistic 12-month forecast.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Break-even means:",
                options: [
                  "Revenue equals costs",
                  "Revenue is higher than costs",
                  "Costs are higher than revenue",
                  "No revenue yet",
                ],
                correctIndex: 0,
                explanation: "Break-even is the point where revenue equals costs.",
              }}
            />
          </div>
        ),
        task: {
          title: "12-Month Forecast",
          prompt: "Write a rough 12-month revenue + cost forecast.",
          checklist: [
            "Revenue estimate",
            "Cost estimate",
            "Break-even month guessed",
          ],
        },
      },
    ],
    challenges: [
      { id: "m5-c1", title: "Funding Match Challenge", xp: 50, content: <p>Match funding to stage.</p> },
      { id: "m5-c2", title: "Pitch Deck Draft", xp: 75, content: <p>Create 5-slide pitch deck.</p> },
      { id: "m5-c3", title: "Launch Calendar Challenge", xp: 50, content: <p>4-week launch plan.</p> },
      { id: "m5-c4", title: "Post-Launch Analytics Map", xp: 50, content: <p>Define acquisition/engagement/revenue metrics.</p> },
      { id: "m5-c5", title: "Legal Checklist Challenge", xp: 50, content: <p>Legal checklist with statuses.</p> },
      { id: "m5-c6", title: "Financial Forecast Blueprint", xp: 50, content: <p>Build 12-month forecast.</p> },
    ],
    boss: {
      id: "m5-boss",
      title: "Boss Challenge: Funding & Launch Plan",
      xp: 250,
      content: <p>Submit full funding + launch plan, pitch deck, legal checklist, and forecast.</p>,
    },
    mastery: {
      title: "Module Mastery Task: Launch & Funding Proof",
      xp: 300,
      prompt: "Submit a launch calendar, 5-slide pitch deck, and simple financial forecast.",
      requirements: [
        "4-week launch calendar",
        "Pitch deck outline",
        "12-month forecast",
      ],
      passRule: "All three artifacts submitted",
    },
  },
  {
    id: 6,
    title: "Scaling & Advanced Growth",
    subtitle: "Take your startup from 1 to 100",
    xp: 1300,
    hours: "12–16",
    unlock: "Complete Module 5",
    color: "#1abc9c",
    outcomes: [
      "Know when your startup is ready to scale",
      "Implement growth hacking strategies",
      "Optimize your marketing funnel",
      "Build and lead a founding team",
    ],
    badges: ["Growth Detective", "Scale Strategist", "Growth Hacker", "Funnel Master", "Team Builder", "Founder Rising"],
    lessons: [
      {
        id: "m6-l1",
        title: "Scaling Fundamentals",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Scale after PMF: consistent retention, predictable revenue, operational systems, team readiness.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Scale Readiness Checklist (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Evaluate readiness across 4 signs.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is a scaling readiness signal?",
                options: ["Churn is rising", "Retention is consistent", "No revenue", "No clear process"],
                correctIndex: 1,
                explanation: "Consistent retention shows PMF.",
              }}
            />
          </div>
        ),
        task: {
          title: "Scale Readiness Score",
          prompt: "Score your startup (1–5) on PMF, revenue, operations, and team.",
          checklist: [
            "4 scores listed",
            "Lowest score identified",
            "One improvement listed",
          ],
        },
      },
      {
        id: "m6-l2",
        title: "Scaling Strategies",
        xp: 40,
        time: "30 min",
        content: (
          <div className="space-y-3">
            <p>Market expansion, product expansion, partnerships, automation & tech.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Scaling Map Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Identify 2 strategies and mitigation plans.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which is a product expansion example?",
                options: ["New geography", "New marketing channel", "New complementary feature", "Hiring a CFO"],
                correctIndex: 2,
                explanation: "Adding complementary features expands the product.",
              }}
            />
          </div>
        ),
        task: {
          title: "Scaling Plan",
          prompt: "Pick 2 scaling strategies and describe risks + mitigation.",
          checklist: [
            "2 strategies listed",
            "Risk per strategy",
            "Mitigation per strategy",
          ],
        },
      },
      {
        id: "m6-l3",
        title: "Advanced Marketing & Growth Hacking",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Viral loops, content marketing, email automation, A/B testing.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Growth Hack Sprint (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Draft 3 growth hacks with metrics.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "A/B testing helps you:",
                options: ["Increase team size", "Compare two variants", "Reduce costs instantly", "Avoid feedback"],
                correctIndex: 1,
                explanation: "A/B tests compare two versions with data.",
              }}
            />
          </div>
        ),
        task: {
          title: "Growth Hacks",
          prompt: "Draft 3 growth hacks with a success metric each.",
          checklist: [
            "3 hacks listed",
            "Metric per hack",
            "One 30-day goal",
          ],
        },
      },
      {
        id: "m6-l4",
        title: "Marketing Funnel Optimization",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Map awareness → interest → consideration → conversion → retention.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Funnel Blueprint Challenge (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Add tactics for each funnel stage.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Which stage comes right after awareness?",
                options: ["Retention", "Interest", "Referral", "Revenue"],
                correctIndex: 1,
                explanation: "Interest follows awareness.",
              }}
            />
          </div>
        ),
        task: {
          title: "Funnel Build",
          prompt: "Write one tactic for each stage: awareness, interest, consideration, conversion, retention.",
          checklist: [
            "All 5 stages covered",
            "At least 1 low-cost tactic",
            "One referral loop included",
          ],
        },
      },
      {
        id: "m6-l5",
        title: "Team Growth & Leadership",
        xp: 35,
        time: "25 min",
        content: (
          <div className="space-y-3">
            <p>Define roles, hiring priorities, and team culture.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Team Growth Plan (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Draft a 12-month team plan.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "A good early hire is:",
                options: ["Anyone available", "Mission-aligned high-impact role", "A large executive team", "Only friends"],
                correctIndex: 1,
                explanation: "Early hires should be high impact and mission aligned.",
              }}
            />
          </div>
        ),
        task: {
          title: "Team Plan",
          prompt: "List 3 roles you need in the next 12 months and why.",
          checklist: [
            "3 roles listed",
            "Reason for each",
            "Hiring order noted",
          ],
        },
      },
      {
        id: "m6-l6",
        title: "Founder Growth",
        xp: 30,
        time: "20 min",
        content: (
          <div className="space-y-3">
            <p>Decision-making, delegation, mentorship, emotional intelligence.</p>
            <div className="bg-[#1abc9c]/10 border border-[#1abc9c]/20 rounded-xl p-4">
              <p className="font-semibold text-[#111]">Founder Growth Journal (50 XP)</p>
              <p className="text-sm text-[#555] mt-2">Create a 3-month improvement plan.</p>
            </div>
            <QuickQuiz
              question={{
                prompt: "Delegation helps you:",
                options: ["Do everything yourself", "Focus on high-impact strategy", "Avoid responsibility", "Ship slower"],
                correctIndex: 1,
                explanation: "Delegation frees time for strategic work.",
              }}
            />
          </div>
        ),
        task: {
          title: "Founder Growth Plan",
          prompt: "Write 3 personal growth goals for the next 90 days.",
          checklist: [
            "3 goals listed",
            "One mentorship action",
            "One delegation action",
          ],
        },
      },
    ],
    challenges: [
      { id: "m6-c1", title: "Scale Readiness Checklist", xp: 50, content: <p>Rate readiness across 4 signs.</p> },
      { id: "m6-c2", title: "Scaling Map Challenge", xp: 50, content: <p>Identify 2 scaling strategies.</p> },
      { id: "m6-c3", title: "Growth Hack Sprint", xp: 50, content: <p>Draft 3 growth hacks.</p> },
      { id: "m6-c4", title: "Funnel Blueprint Challenge", xp: 50, content: <p>Map full marketing funnel.</p> },
      { id: "m6-c5", title: "Team Growth Plan", xp: 50, content: <p>Draft team growth plan.</p> },
      { id: "m6-c6", title: "Founder Growth Journal", xp: 50, content: <p>Plan leadership improvement.</p> },
    ],
    boss: {
      id: "m6-boss",
      title: "Boss Challenge: Scaling & Advanced Growth Plan",
      xp: 300,
      content: <p>Submit full scaling plan, growth hacks, funnel, team plan, and founder journal.</p>,
    },
    mastery: {
      title: "Module Mastery Task: Scale Plan Proof",
      xp: 350,
      prompt: "Submit a scaling roadmap with growth, team, and funnel plans.",
      requirements: [
        "Scaling roadmap (90–180 days)",
        "Growth hack plan",
        "Team growth plan",
        "Funnel optimization plan",
      ],
      passRule: "Roadmap + 3 supporting plans",
    },
  },
];

const BADGES = [
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
  { name: "Advanced Templates", level: 5, desc: "Business plan, pitch deck, and financial model templates" },
  { name: "Expert Case Studies", level: 8, desc: "Deep dives into how real startups succeeded" },
  { name: "1-on-1 Mentor Session", level: 12, desc: "Personal guidance from experienced founders" },
  { name: "Pitch Deck AI Analyzer", level: 15, desc: "AI feedback on your investor pitch" },
  { name: "Private Mastermind Access", level: 18, desc: "Exclusive group of top performers" },
];

const WEEKLY_QUESTS = [
  { id: "q1", title: "Give 3 peer feedbacks", xp: 75 },
  { id: "q2", title: "Complete 2 lesson tasks", xp: 60 },
  { id: "q3", title: "Submit 1 mastery task", xp: 120 },
  { id: "q4", title: "Log 5 real problems", xp: 50 },
];

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function LessonTaskMini({
  title,
  prompt,
  checklist,
}: {
  title: string;
  prompt: string;
  checklist: string[];
}) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [text, setText] = useState("");
  const completeCount = checklist.filter((c) => checks[c]).length;
  return (
    <InteractiveCard title={title} subtitle="Lesson Task">
      <p className="text-xs text-[#555]">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your response here..."
        rows={4}
        className="text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
      />
      <div className="space-y-2">
        {checklist.map((c) => (
          <label key={c} className="flex items-center gap-2 text-xs text-[#555]">
            <input
              type="checkbox"
              checked={!!checks[c]}
              onChange={() => setChecks((prev) => ({ ...prev, [c]: !prev[c] }))}
            />
            {c}
          </label>
        ))}
      </div>
      <p className="text-[10px] text-[#999]">Checklist: {completeCount} / {checklist.length}</p>
    </InteractiveCard>
  );
}

function StreakCalendar({ streak }: { streak: number }) {
  const days = Array.from({ length: 28 }, (_, i) => i);
  const activeCount = Math.min(streak, 28);
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((i) => (
        <div
          key={i}
          className={`h-6 rounded-md border ${i < activeCount ? "bg-[#2ecc71]/20 border-[#2ecc71]/30" : "bg-[#f8f8f8] border-[#eee]"
            }`}
          title={i < activeCount ? "Active day" : "Inactive"}
        />
      ))}
    </div>
  );
}

function BadgeCabinet({
  earned,
}: {
  earned: Record<string, boolean>;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {BADGES.map((b) => {
        const isEarned = !!earned[b.name];
        return (
          <div
            key={b.name}
            className={`rounded-xl border p-4 text-center transition-all ${isEarned ? "bg-white border-[#eee]" : "bg-[#fafafa] border-[#eee] opacity-60"
              }`}
          >
            <span className="text-2xl block mb-2">{b.icon}</span>
            <p className="text-[11px] text-[#555] font-medium leading-tight">{b.name}</p>
            <span
              className={`text-[9px] uppercase font-bold tracking-wider mt-1.5 inline-block ${b.tier === "gold"
                ? "text-[#f1c40f]"
                : b.tier === "silver"
                  ? "text-[#bbb]"
                  : "text-[#cd7f32]"
                }`}
            >
              {isEarned ? b.tier : "locked"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function WeeklyQuests({
  completed,
  onToggle,
}: {
  completed: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {WEEKLY_QUESTS.map((q) => (
        <div key={q.id} className="flex items-center justify-between bg-white border border-[#eee] rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#111]">{q.title}</p>
            <p className="text-xs text-[#999]">+{q.xp} XP</p>
          </div>
          <button
            onClick={() => onToggle(q.id)}
            className={`text-xs font-bold px-4 py-2 rounded-full ${completed[q.id] ? "bg-[#e9f7ef] text-[#2ecc71]" : "bg-[#111] text-white"
              }`}
          >
            {completed[q.id] ? "Completed" : "Mark Done"}
          </button>
        </div>
      ))}
    </div>
  );
}

function ModuleScorecard({
  score,
  feedback,
}: {
  score: number;
  feedback: string[];
}) {
  return (
    <div className="bg-white border border-[#eee] rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-[#111]">Module Scorecard</p>
        <span className="text-xs text-[#999]">Score</span>
      </div>
      <p className="text-3xl font-bold text-[#111] mt-2">{score}/100</p>
      <div className="mt-3 space-y-2">
        {feedback.map((f) => (
          <div key={f} className="text-xs text-[#666] flex items-start gap-2">
            <CheckCircle2 size={14} className="text-[#2ecc71] mt-0.5" />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function TutorSidebar({
  open,
  onToggle,
  tips,
}: {
  open: boolean;
  onToggle: () => void;
  tips: string[];
}) {
  const [prompt, setPrompt] = useState("");
  return (
    <div className={`fixed right-4 bottom-4 z-50 ${open ? "w-[320px]" : "w-auto"}`}>
      <div className={`bg-white border border-[#eee] rounded-2xl shadow-xl ${open ? "p-4" : "p-3"}`}>
        <button onClick={onToggle} className="text-xs font-bold text-[#111]">
          {open ? "Close Tutor" : "Open AI Tutor"}
        </button>
        {open && (
          <div className="mt-3 space-y-3">
            <div className="bg-[#fafafa] border border-[#eee] rounded-xl p-3">
              <p className="text-xs font-semibold text-[#111]">Tutor Tips</p>
              <ul className="list-disc pl-5 text-xs text-[#666] space-y-1 mt-2">
                {tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask for feedback or clarity..."
              rows={3}
              className="text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
            />
            <button className="text-xs font-bold bg-[#111] text-white rounded-full px-4 py-2">
              Get Hint (Mock)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PeerFeedbackBoard({
  entries,
  onAdd,
}: {
  entries: { id: string; title: string; feedback: string }[];
  onAdd: (title: string, feedback: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  return (
    <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Users size={18} className="text-[#2ecc71]" />
        <h4 className="text-base font-bold">Peer Feedback Wall</h4>
      </div>
      <p className="text-sm text-[#666]">Share feedback on a peer’s submission to earn community XP.</p>
      <div className="mt-3 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Submission title"
          className="text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
        />
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write constructive feedback..."
          rows={3}
          className="text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
        />
        <button
          onClick={() => {
            if (!title.trim() || !feedback.trim()) return;
            onAdd(title.trim(), feedback.trim());
            setTitle("");
            setFeedback("");
          }}
          className="text-xs font-bold bg-[#2ecc71] text-white rounded-full px-4 py-2"
        >
          Post Feedback
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="bg-white border border-[#eee] rounded-xl p-3">
            <p className="text-xs font-semibold text-[#111]">{e.title}</p>
            <p className="text-xs text-[#666] mt-1">{e.feedback}</p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-xs text-[#aaa]">No feedback yet.</p>}
      </div>
    </div>
  );
}

function XPBar({ current, max, color }: { current: number; max: number; color: string }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function LessonCard({
  title,
  time,
  xp,
  content,
  task,
  completed,
  onComplete,
}: {
  title: string;
  time: string;
  xp: number;
  content: React.ReactNode;
  task: Lesson["task"];
  completed: boolean;
  onComplete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#eee] bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className="text-sm font-bold text-[#111]">{title}</p>
          <div className="flex items-center gap-3 text-xs text-[#999] mt-1">
            <span className="flex items-center gap-1"><BookOpen size={12} /> {time}</span>
            <span className="text-[#f1c40f] font-medium">+{xp} XP</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {completed && <CheckCircle2 size={18} className="text-[#2ecc71]" />}
          <ChevronDown size={18} className={`text-[#bbb] transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`px-5 pb-5 transition-all duration-500 ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        <div className="pt-3 text-sm text-[#555] space-y-3">{content}</div>
        <div className="pt-4">
          <LessonTaskMini title={task.title} prompt={task.prompt} checklist={task.checklist} />
        </div>
        <button
          onClick={onComplete}
          disabled={completed}
          className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all ${completed
            ? "bg-[#e9f7ef] text-[#2ecc71] cursor-default"
            : "bg-[#111] text-white hover:bg-[#222]"
            }`}
        >
          <Zap size={14} />
          {completed ? "Lesson Completed" : "Mark Lesson Complete"}
        </button>
      </div>
    </div>
  );
}

function ChallengeCard({
  title,
  xp,
  content,
  completed,
  onComplete,
  color,
  icon,
}: {
  title: string;
  xp: number;
  content: React.ReactNode;
  completed: boolean;
  onComplete: () => void;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#eee] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12` }}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-[#111]">{title}</p>
            <p className="text-xs text-[#999]">Challenge</p>
          </div>
        </div>
        <span className="text-[#f1c40f] text-xs font-bold">+{xp} XP</span>
      </div>
      <div className="text-sm text-[#555] mt-3">{content}</div>
      <button
        onClick={onComplete}
        disabled={completed}
        className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all ${completed ? "bg-[#e9f7ef] text-[#2ecc71]" : "bg-[#2ecc71] text-white hover:bg-[#27ae60]"
          }`}
      >
        <Target size={14} />
        {completed ? "Challenge Completed" : "Start Challenge"}
      </button>
    </div>
  );
}

function CoursePlayerContent() {
  const searchParams = useSearchParams();
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastClaim, setLastClaim] = useState<string | null>(null);
  const [masterySubmissions, setMasterySubmissions] = useState<Record<number, string>>({});
  const [masteryStatus, setMasteryStatus] = useState<Record<number, "draft" | "submitted" | "approved" | "needs_edits">>({});
  const [questCompleted, setQuestCompleted] = useState<Record<string, boolean>>({});
  const [feedbackEntries, setFeedbackEntries] = useState<{ id: string; title: string; feedback: string }[]>([]);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"lessons" | "tasks" | "mastery" | "community">("lessons");

  useEffect(() => {
    const modParam = searchParams.get("module");
    if (modParam) {
      const modId = parseInt(modParam);
      if (!isNaN(modId) && MODULES.some((m) => m.id === modId)) {
        setActiveModuleId(modId);
      }
    }
    const tabParam = searchParams.get("tab");
    if (tabParam && ["lessons", "tasks", "mastery", "community"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    const stored = loadStore("fc_course_state_v1", null as unknown as {
      completed: Record<string, boolean>;
      xp: number;
      streak: number;
      lastClaim: string | null;
      masterySubmissions: Record<number, string>;
      masteryStatus: Record<number, "draft" | "submitted" | "approved" | "needs_edits">;
      questCompleted: Record<string, boolean>;
      feedbackEntries: { id: string; title: string; feedback: string }[];
    } | null);
    if (stored) {
      setCompleted(stored.completed || {});
      setXp(stored.xp || 0);
      setStreak(stored.streak || 0);
      setLastClaim(stored.lastClaim || null);
      setMasterySubmissions(stored.masterySubmissions || {});
      setMasteryStatus(stored.masteryStatus || {});
      setQuestCompleted(stored.questCompleted || {});
      setFeedbackEntries(stored.feedbackEntries || []);
    }
  }, []);

  useEffect(() => {
    saveStore("fc_course_state_v1", {
      completed,
      xp,
      streak,
      lastClaim,
      masterySubmissions,
      masteryStatus,
      questCompleted,
      feedbackEntries,
    });
  }, [completed, xp, streak, lastClaim, masterySubmissions, masteryStatus, questCompleted, feedbackEntries]);

  const activeModule = useMemo(
    () => MODULES.find((m) => m.id === activeModuleId) || MODULES[0],
    [activeModuleId]
  );

  const level = Math.min(20, Math.floor(xp / LEVEL_XP) + 1);
  const nextLevelXp = level * LEVEL_XP;
  const xpIntoLevel = xp - (level - 1) * LEVEL_XP;
  const canAccessModule = (id: number) => {
    if (id === 1) return true;
    const prevStatus = masteryStatus[id - 1];
    return prevStatus === "submitted" || prevStatus === "approved";
  };

  const earnedBadges = useMemo(() => {
    const record: Record<string, boolean> = {};
    record["First Problem Identified"] = !!completed["m1-l3"];
    record["Survey Master"] = !!completed["m2-c2"];
    record["MVP Launcher"] = !!completed["m4-boss"] || !!completed["mastery-4"];
    record["First Dollar Earned"] = xp >= 5000;
    record["Pitch Perfect"] = !!completed["m5-c2"];
    record["Community Helper"] = feedbackEntries.length >= 3;
    record["Speed Demon"] = streak >= 7;
    record["Perfectionist"] = Object.keys(completed).length >= 30;
    record["Pivot Pro"] = !!completed["m2-c1"] && !!completed["m2-c6"];
    record["Revenue Milestone"] = xp >= 10000;
    record["Problem Solver"] = !!completed["m1-c3"];
    record["Validation Ace"] = !!completed["m2-boss"] || masteryStatus[2] === "submitted" || masteryStatus[2] === "approved";
    record["Growth Hacker"] = !!completed["m6-l3"];
    record["Team Builder"] = !!completed["m6-l5"];
    record["Risk Taker"] = !!completed["m2-l4"];
    return record;
  }, [completed, xp, streak, feedbackEntries.length, masteryStatus]);

  const masteryScore = useMemo(() => {
    const status = masteryStatus[activeModule.id] || "draft";
    if (status === "approved") return 92;
    if (status === "submitted") return 78;
    if (status === "needs_edits") return 55;
    return 0;
  }, [activeModule.id, masteryStatus]);

  const masteryFeedback = useMemo(() => {
    const status = masteryStatus[activeModule.id] || "draft";
    if (status === "approved") {
      return ["Clear evidence and structure", "Strong problem-definition", "Actionable next step"];
    }
    if (status === "needs_edits") {
      return ["Clarify evidence quality", "Tighten target user", "Make test plan more specific"];
    }
    if (status === "submitted") {
      return ["In review", "Waiting for feedback", "Keep learning while we review"];
    }
    return ["No submission yet", "Complete the mastery task to unlock next module"];
  }, [activeModule.id, masteryStatus]);

  const completeItem = (id: string, amount: number) => {
    setCompleted((prev) => {
      if (prev[id]) return prev;
      setXp((xpPrev) => Math.min(xpPrev + amount, TOTAL_XP));
      return { ...prev, [id]: true };
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#eee]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/courses" className="flex items-center gap-2 text-sm font-medium text-[#555] hover:text-[#111]">
            <ArrowLeft size={16} />
            Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 bg-[#fafafa] border border-[#eee] rounded-full px-4 py-2 text-xs">
              <Zap size={14} className="text-[#f1c40f]" />
              <span className="font-semibold">{xp.toLocaleString()} XP</span>
              <span className="text-[#bbb]">•</span>
              <span>Level {level}</span>
            </div>
            <button
              onClick={() => {
                const today = todayKey();
                if (lastClaim === today) return;
                const nextStreak = lastClaim === yesterdayKey() ? streak + 1 : 1;
                setStreak(nextStreak);
                setLastClaim(today);
                setXp((prev) => Math.min(prev + 50, TOTAL_XP));
              }}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${lastClaim === todayKey() ? "bg-[#f8f8f8] text-[#999]" : "bg-[#111] text-white hover:bg-[#222]"
                }`}
            >
              {lastClaim === todayKey() ? "Daily Bonus Claimed" : "Claim Daily Bonus +50 XP"}
            </button>
            <button
              onClick={() => {
                const payload = {
                  xp,
                  streak,
                  completed,
                  masterySubmissions,
                  masteryStatus,
                  questCompleted,
                  feedbackEntries,
                };
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "futureceo-workbook.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-xs font-bold px-4 py-2 rounded-full bg-[#f2f2f2] text-[#555] hover:bg-[#eaeaea]"
            >
              Export Workbook
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-[540px] h-[540px] rounded-full bg-[#2ecc71]/10 blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[#3498db]/10 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                <Sparkles size={14} />
                Course Player
              </span>
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1]">
                FutureCEO Startup Mastery
              </h1>
              <p className="text-[#777] text-base mt-3 max-w-2xl">
                Learn by doing. Earn XP. Unlock power-ups. Build a real startup across 6 modules and 15,000 XP.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#999]">
                <span className="flex items-center gap-1"><BookOpen size={12} /> 100% text-based</span>
                <span className="flex items-center gap-1"><Trophy size={12} /> 42 badges</span>
                <span className="flex items-center gap-1"><Flame size={12} /> Streak bonuses</span>
              </div>
            </div>
            <div className="w-full lg:w-[320px] bg-white border border-[#eee] rounded-3xl p-6 shadow-lg shadow-black/[0.05]">
              <p className="text-xs uppercase tracking-wider text-[#999]">Your Progress</p>
              <p className="text-xl font-bold mt-2">Level {level}</p>
              <p className="text-xs text-[#999] mt-1">{xpIntoLevel} / {LEVEL_XP} XP to next level</p>
              <div className="mt-3">
                <XPBar current={xpIntoLevel} max={LEVEL_XP} color="#2ecc71" />
              </div>
              <div className="flex items-center justify-between text-xs text-[#bbb] mt-2">
                <span>Lv {level}</span>
                <span>Lv {Math.min(level + 1, 20)}</span>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-[#999]">
                <span className="flex items-center gap-1"><Zap size={12} className="text-[#f1c40f]" /> Total XP</span>
                <span className="font-semibold text-[#111]">{xp.toLocaleString()}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#999]">
                <span className="flex items-center gap-1"><Flame size={12} className="text-[#e67e22]" /> Streak</span>
                <span className="font-semibold text-[#111]">{streak} days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-[#999] mb-2">Module Navigation</p>
              <div className="space-y-2">
                {MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => {
                      if (!canAccessModule(mod.id)) return;
                      setActiveModuleId(mod.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeModuleId === mod.id
                      ? "bg-[#111] text-white"
                      : canAccessModule(mod.id)
                        ? "bg-white border border-[#eee] text-[#555] hover:border-[#ddd]"
                        : "bg-[#f5f5f5] border border-[#eee] text-[#bbb] cursor-not-allowed"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Module {mod.id}</span>
                      {canAccessModule(mod.id) ? <ChevronRight size={14} /> : <Lock size={12} />}
                    </div>
                    <p className="text-xs opacity-70 mt-1">{mod.title}</p>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Content */}
          <main className="space-y-6">
            {/* Progress Map */}
            <div className="bg-white border border-[#eee] rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-[#999] mb-3">Journey Map</p>
              <div className="flex items-center gap-3 flex-wrap">
                {MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => {
                      if (!canAccessModule(mod.id)) return;
                      setActiveModuleId(mod.id);
                      setActiveTab("lessons");
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all ${activeModuleId === mod.id
                      ? "text-white"
                      : canAccessModule(mod.id)
                        ? "text-[#555] bg-[#f7f7f7] border border-[#eee]"
                        : "text-[#bbb] bg-[#f5f5f5] border border-[#eee]"
                      }`}
                    style={activeModuleId === mod.id ? { background: mod.color } : undefined}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                      {mod.id}
                    </span>
                    {mod.title}
                    {!canAccessModule(mod.id) && <Lock size={12} className="ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#eee] rounded-3xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold" style={{ color: activeModule.color }}>
                    Module {activeModule.id}
                  </p>
                  <h2 className="text-2xl font-bold text-[#111]">{activeModule.title}</h2>
                  <p className="text-sm text-[#777] mt-1">{activeModule.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#999] mt-3">
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#fafafa] border border-[#eee]">
                      <Zap size={12} className="text-[#f1c40f]" /> {activeModule.xp} XP
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#fafafa] border border-[#eee]">
                      <BookOpen size={12} /> {activeModule.hours} hours
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#fafafa] border border-[#eee]">
                      <Lock size={12} /> Unlock: {activeModule.unlock}
                    </span>
                  </div>
                </div>
                <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-4 min-w-[220px]">
                  <p className="text-xs text-[#999] uppercase tracking-wider">Module Rewards</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Trophy size={16} className="text-[#f1c40f]" />
                    <span className="text-sm font-bold">{activeModule.xp} XP</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {activeModule.badges.map((b) => (
                      <span key={b} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border" style={{ borderColor: `${activeModule.color}30`, color: activeModule.color }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-2 bg-[#fafafa] border border-[#eee] rounded-full p-1.5 w-fit">
              {[
                { key: "lessons", label: "Lessons", icon: BookOpen },
                { key: "tasks", label: "Tasks", icon: Target },
                { key: "mastery", label: "Mastery", icon: Trophy },
                { key: "community", label: "Community", icon: Users },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${activeTab === t.key
                    ? "text-white"
                    : "text-[#888] hover:text-[#555]"
                    }`}
                  style={activeTab === t.key ? { background: activeModule.color } : undefined}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === "lessons" && (
              <>
                <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6">
                  <p className="text-xs uppercase tracking-wider text-[#999] mb-3">What You’ll Learn</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModule.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2 text-sm text-[#555]">
                        <CheckCircle2 size={14} style={{ color: activeModule.color }} className="mt-0.5" />
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#555]" />
                    <h3 className="text-lg font-bold">Lessons</h3>
                  </div>
                  {activeModule.lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      title={lesson.title}
                      time={lesson.time}
                      xp={lesson.xp}
                      content={lesson.content}
                      task={lesson.task}
                      completed={!!completed[lesson.id]}
                      onComplete={() => completeItem(lesson.id, lesson.xp)}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-[#555]" />
                    <h3 className="text-lg font-bold">Challenges</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModule.challenges.map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        title={challenge.title}
                        xp={challenge.xp}
                        content={challenge.content}
                        completed={!!completed[challenge.id]}
                        onComplete={() => completeItem(challenge.id, challenge.xp)}
                        color={activeModule.color}
                        icon={<Target size={16} style={{ color: activeModule.color }} />}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-dashed border-[#ccc] rounded-2xl p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#111] text-white flex items-center justify-center">
                        <Crown size={20} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#999]">Boss Challenge</p>
                        <p className="text-lg font-bold text-[#111]">{activeModule.boss.title}</p>
                      </div>
                    </div>
                    <span className="text-[#f1c40f] font-bold">+{activeModule.boss.xp} XP</span>
                  </div>
                  <div className="text-sm text-[#555] mt-3">{activeModule.boss.content}</div>
                  <button
                    onClick={() => completeItem(activeModule.boss.id, activeModule.boss.xp)}
                    disabled={!!completed[activeModule.boss.id]}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs font-bold transition-all ${completed[activeModule.boss.id]
                      ? "bg-[#e9f7ef] text-[#2ecc71]"
                      : "bg-[#111] text-white hover:bg-[#222]"
                      }`}
                  >
                    <Crown size={14} />
                    {completed[activeModule.boss.id] ? "Boss Defeated" : "Start Boss Challenge"}
                  </button>
                </div>
              </>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-[#555]" />
                  <h3 className="text-lg font-bold">Lesson Tasks</h3>
                </div>
                {activeModule.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white border border-[#eee] rounded-2xl p-4">
                    <p className="text-sm font-bold text-[#111]">{lesson.title}</p>
                    <div className="mt-3">
                      <LessonTaskMini title={lesson.task.title} prompt={lesson.task.prompt} checklist={lesson.task.checklist} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "mastery" && (
              <>
                <ModuleScorecard score={masteryScore} feedback={masteryFeedback} />
                <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#2ecc71] text-white flex items-center justify-center">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#999]">Module Mastery Task</p>
                        <p className="text-lg font-bold text-[#111]">{activeModule.mastery.title}</p>
                      </div>
                    </div>
                    <span className="text-[#f1c40f] font-bold">+{activeModule.mastery.xp} XP</span>
                  </div>
                  <p className="text-sm text-[#555] mt-3">{activeModule.mastery.prompt}</p>
                  <div className="mt-3 space-y-2">
                    {activeModule.mastery.requirements.map((r) => (
                      <div key={r} className="text-xs text-[#666] flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#2ecc71] mt-0.5" />
                        {r}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#999] mt-3">Pass rule: {activeModule.mastery.passRule}</p>
                  <textarea
                    placeholder="Paste your mastery submission or link here..."
                    rows={4}
                    value={masterySubmissions[activeModule.id] || ""}
                    onChange={(e) =>
                      setMasterySubmissions((prev) => ({ ...prev, [activeModule.id]: e.target.value }))
                    }
                    className="mt-3 text-xs rounded-lg border border-[#ddd] px-3 py-2 w-full"
                  />
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#999]">
                    Status:
                    <span className="font-semibold text-[#111]">
                      {masteryStatus[activeModule.id] || "draft"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMasteryStatus((prev) => ({ ...prev, [activeModule.id]: "submitted" }));
                      completeItem(`mastery-${activeModule.id}`, activeModule.mastery.xp);
                    }}
                    disabled={!!completed[`mastery-${activeModule.id}`]}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs font-bold transition-all ${completed[`mastery-${activeModule.id}`]
                      ? "bg-[#e9f7ef] text-[#2ecc71]"
                      : "bg-[#2ecc71] text-white hover:bg-[#27ae60]"
                      }`}
                  >
                    <Trophy size={14} />
                    {completed[`mastery-${activeModule.id}`] ? "Mastery Submitted" : "Submit Mastery Task"}
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setMasteryStatus((prev) => ({ ...prev, [activeModule.id]: "approved" }))}
                      className="text-xs font-bold bg-[#111] text-white rounded-full px-4 py-2"
                    >
                      Mark Approved (Demo)
                    </button>
                    <button
                      onClick={() => setMasteryStatus((prev) => ({ ...prev, [activeModule.id]: "needs_edits" }))}
                      className="text-xs font-bold bg-[#f2f2f2] text-[#666] rounded-full px-4 py-2"
                    >
                      Needs Edits (Demo)
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "community" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 size={18} className="text-[#f1c40f]" />
                      <h4 className="text-base font-bold">Leaderboard Snapshot</h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Alex K.", xp: 8420 },
                        { name: "Sarah M.", xp: 7890 },
                        { name: "Jake R.", xp: 7340 },
                      ].map((p, i) => (
                        <div key={p.name} className="flex items-center justify-between bg-white border border-[#eee] rounded-xl px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold">#{i + 1}</span>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#3498db] flex items-center justify-center text-white text-xs font-bold">
                              {p.name[0]}
                            </div>
                            <span className="text-sm font-semibold">{p.name}</span>
                          </div>
                          <span className="text-xs text-[#f1c40f] font-bold">{p.xp.toLocaleString()} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={18} className="text-[#2ecc71]" />
                      <h4 className="text-base font-bold">Community Boost</h4>
                    </div>
                    <p className="text-sm text-[#666]">
                      Post your progress, give feedback, and earn +25 XP per quality post. Top helpers appear on the weekly leaderboard.
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold bg-[#2ecc71] text-white hover:bg-[#27ae60]">
                      <Users size={14} />
                      Open Community
                    </button>
                  </div>
                </div>

                <PeerFeedbackBoard
                  entries={feedbackEntries}
                  onAdd={(title, feedback) => {
                    setFeedbackEntries((prev) => [
                      { id: `${Date.now()}-${Math.random()}`, title, feedback },
                      ...prev,
                    ]);
                    setXp((prevXp) => Math.min(prevXp + 25, TOTAL_XP));
                  }}
                />
              </>
            )}
          </main>

          {/* Right Rail */}
          <aside className="space-y-6 lg:sticky lg:top-20 h-fit">
            <div className="bg-white border border-[#eee] rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-[#999]">Quick Actions</p>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => {
                    const today = todayKey();
                    if (lastClaim === today) return;
                    const nextStreak = lastClaim === yesterdayKey() ? streak + 1 : 1;
                    setStreak(nextStreak);
                    setLastClaim(today);
                    setXp((prev) => Math.min(prev + 50, TOTAL_XP));
                  }}
                  className={`w-full text-xs font-bold px-4 py-2 rounded-full transition-all ${lastClaim === todayKey() ? "bg-[#f8f8f8] text-[#999]" : "bg-[#111] text-white"
                    }`}
                >
                  {lastClaim === todayKey() ? "Daily Bonus Claimed" : "Claim Daily Bonus +50 XP"}
                </button>
                <button
                  onClick={() => {
                    const payload = {
                      xp,
                      streak,
                      completed,
                      masterySubmissions,
                      masteryStatus,
                      questCompleted,
                      feedbackEntries,
                    };
                    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "futureceo-workbook.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full text-xs font-bold px-4 py-2 rounded-full bg-[#f2f2f2] text-[#555]"
                >
                  Export Workbook
                </button>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame size={16} className="text-[#e67e22]" />
                <p className="text-sm font-bold">Streaks</p>
              </div>
              <StreakCalendar streak={streak} />
              <p className="text-xs text-[#999] mt-2">Current streak: {streak} days</p>
            </div>

            <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star size={16} className="text-[#f1c40f]" />
                <p className="text-sm font-bold">Weekly Quests</p>
              </div>
              <WeeklyQuests
                completed={questCompleted}
                onToggle={(id) => {
                  setQuestCompleted((prev) => {
                    const next = { ...prev, [id]: !prev[id] };
                    const quest = WEEKLY_QUESTS.find((q) => q.id === id);
                    if (quest && !prev[id] && next[id]) {
                      setXp((prevXp) => Math.min(prevXp + quest.xp, TOTAL_XP));
                    }
                    return next;
                  });
                }}
              />
            </div>

            <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Gift size={16} className="text-[#9b59b6]" />
                <p className="text-sm font-bold">Power-Ups</p>
              </div>
              <div className="space-y-2">
                {POWER_UPS.map((p) => (
                  <div key={p.name} className="flex items-center justify-between bg-white border border-[#eee] rounded-xl px-3 py-2">
                    <div>
                      <p className="text-xs font-semibold text-[#111]">{p.name}</p>
                      <p className="text-[10px] text-[#999]">{p.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#999] bg-[#f2f2f2] px-2 py-1 rounded-full">
                      Lv {p.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#eee] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-[#2ecc71]" />
                <p className="text-sm font-bold">Badge Cabinet</p>
              </div>
              <BadgeCabinet earned={earnedBadges} />
              <p className="text-[10px] text-[#aaa] mt-3">
                Earned {Object.values(earnedBadges).filter(Boolean).length} / {BADGES.length}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <TutorSidebar
        open={tutorOpen}
        onToggle={() => setTutorOpen((v) => !v)}
        tips={[
          `Focus on Module ${activeModule.id}: ${activeModule.title}`,
          "Keep answers specific and evidence-based",
          "Short, testable next steps beat big plans",
        ]}
      />
    </div>
  );
}

export default function CoursePlayerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Course Player...</div>}>
      <CoursePlayerContent />
    </Suspense>
  );
}
