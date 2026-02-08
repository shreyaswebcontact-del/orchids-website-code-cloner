"use client";

// ─── Types ───
export interface UserProgress {
  enrolled: boolean;
  xp: number;
  level: number;
  completedLessons: string[]; // "moduleId-lessonIndex"
  completedChallenges: string[]; // "moduleId-challengeIndex"
  completedBosses: number[]; // module ids
  unlockedModules: number[]; // module ids
  badges: string[];
  streak: number;
  lastActiveDate: string;
  quizAnswers: Record<string, number[]>; // lessonKey -> selected answers
}

const STORAGE_KEY = "futureceo-progress";

const DEFAULT_PROGRESS: UserProgress = {
  enrolled: false,
  xp: 0,
  level: 1,
  completedLessons: [],
  completedChallenges: [],
  completedBosses: [],
  unlockedModules: [1],
  badges: [],
  streak: 0,
  lastActiveDate: "",
  quizAnswers: {},
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(p: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function enroll(): UserProgress {
  const p = getProgress();
  p.enrolled = true;
  p.unlockedModules = [1];
  p.lastActiveDate = new Date().toISOString().slice(0, 10);
  saveProgress(p);
  return p;
}

export function addXP(amount: number): UserProgress {
  const p = getProgress();
  p.xp += amount;
  p.level = Math.min(20, Math.floor(p.xp / 750) + 1);
  // Update streak
  const today = new Date().toISOString().slice(0, 10);
  if (p.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    p.streak = p.lastActiveDate === yesterday ? p.streak + 1 : 1;
    p.lastActiveDate = today;
  }
  saveProgress(p);
  return p;
}

export function completeLesson(moduleId: number, lessonIndex: number, xp: number): UserProgress {
  const key = `${moduleId}-${lessonIndex}`;
  let p = getProgress();
  if (p.completedLessons.includes(key)) return p;
  p.completedLessons.push(key);
  p = addXP(xp);
  saveProgress(p);
  return p;
}

export function completeChallenge(moduleId: number, challengeIndex: number, xp: number): UserProgress {
  const key = `${moduleId}-${challengeIndex}`;
  let p = getProgress();
  if (p.completedChallenges.includes(key)) return p;
  p.completedChallenges.push(key);
  p = addXP(xp);
  saveProgress(p);
  return p;
}

export function completeBoss(moduleId: number, xp: number, badge: string): UserProgress {
  let p = getProgress();
  if (p.completedBosses.includes(moduleId)) return p;
  p.completedBosses.push(moduleId);
  if (!p.badges.includes(badge)) p.badges.push(badge);
  // Unlock next module
  const nextMod = moduleId + 1;
  if (nextMod <= 6 && !p.unlockedModules.includes(nextMod)) {
    p.unlockedModules.push(nextMod);
  }
  p = addXP(xp);
  saveProgress(p);
  return p;
}

export function earnBadge(badge: string): UserProgress {
  const p = getProgress();
  if (!p.badges.includes(badge)) {
    p.badges.push(badge);
    saveProgress(p);
  }
  return p;
}

export function saveQuizAnswers(lessonKey: string, answers: number[]): UserProgress {
  const p = getProgress();
  p.quizAnswers[lessonKey] = answers;
  saveProgress(p);
  return p;
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 3;
  if (streak >= 14) return 2;
  if (streak >= 7) return 1.5;
  return 1;
}
