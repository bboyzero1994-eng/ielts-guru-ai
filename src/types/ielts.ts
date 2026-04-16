export type IELTSPart = 1 | 2 | 3;

export interface Question {
  id: string;
  part: IELTSPart;
  topic: string;
  question: string;
  cueCard?: {
    prompt: string;
    bullets: string[];
    prepTime: number;
    speakTime: number;
  };
  followUp?: string[];
}

export interface ScoreDetail {
  fluencyCoherence: number;
  lexicalResource: number;
  grammaticalRange: number;
  pronunciation: number;
}

export interface ScoreFeedback {
  fluencyCoherence: string;
  lexicalResource: string;
  grammaticalRange: string;
  pronunciation: string;
  overall: string;
  sampleAnswer?: string;
}

export interface PracticeResult {
  id: string;
  questionId: string;
  part: IELTSPart;
  question: string;
  transcript: string;
  scores: ScoreDetail;
  feedback: ScoreFeedback;
  overallBand: number;
  date: string;
  xpEarned: number;
  audioUrl?: string;
}

export interface DailyStats {
  date: string;
  questionsAnswered: number;
  averageBand: number;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}

export interface UserProgress {
  totalXP: number;
  level: number;
  streak: number;
  lastPracticeDate: string | null;
  results: PracticeResult[];
  dailyStats: DailyStats[];
  dailyGoal: number;
  unlockedAchievements: string[];
}

export const LEVELS = [
  { level: 1, name: "Beginner", minXP: 0, icon: "🌱" },
  { level: 2, name: "Elementary", minXP: 100, icon: "🌿" },
  { level: 3, name: "Pre-Intermediate", minXP: 300, icon: "🌳" },
  { level: 4, name: "Intermediate", minXP: 600, icon: "⭐" },
  { level: 5, name: "Upper-Intermediate", minXP: 1000, icon: "🔥" },
  { level: 6, name: "Advanced", minXP: 1500, icon: "💎" },
  { level: 7, name: "Expert", minXP: 2500, icon: "👑" },
  { level: 8, name: "Master", minXP: 4000, icon: "🏆" },
];

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) current = l;
    else break;
  }
  const nextLevel = LEVELS.find((l) => l.minXP > xp);
  const xpForNext = nextLevel ? nextLevel.minXP - xp : 0;
  const xpInLevel = nextLevel ? xp - current.minXP : 0;
  const xpNeeded = nextLevel ? nextLevel.minXP - current.minXP : 1;
  return { ...current, nextLevel, xpForNext, progress: xpInLevel / xpNeeded };
}

export const TIME_LIMITS: Record<IELTSPart, number> = {
  1: 60,
  2: 120,
  3: 90,
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-practice", name: "First Steps", description: "Complete your first practice", icon: "🎯", condition: (p) => p.results.length >= 1 },
  { id: "streak-3", name: "On Fire", description: "3-day streak", icon: "🔥", condition: (p) => p.streak >= 3 },
  { id: "streak-7", name: "Week Warrior", description: "7-day streak", icon: "⚡", condition: (p) => p.streak >= 7 },
  { id: "streak-30", name: "Monthly Master", description: "30-day streak", icon: "🏅", condition: (p) => p.streak >= 30 },
  { id: "band-6", name: "Band 6 Reached", description: "Score band 6 or higher", icon: "📈", condition: (p) => p.results.some((r) => r.overallBand >= 6) },
  { id: "band-7", name: "Band 7 Club", description: "Score band 7 or higher", icon: "🌟", condition: (p) => p.results.some((r) => r.overallBand >= 7) },
  { id: "band-8", name: "Band 8 Elite", description: "Score band 8 or higher", icon: "👑", condition: (p) => p.results.some((r) => r.overallBand >= 8) },
  { id: "ten-practices", name: "Dedicated", description: "Complete 10 practices", icon: "💪", condition: (p) => p.results.length >= 10 },
  { id: "all-parts", name: "All-Rounder", description: "Practice all 3 parts", icon: "🎯", condition: (p) => [1, 2, 3].every((part) => p.results.some((r) => r.part === part)) },
  { id: "xp-500", name: "XP Hunter", description: "Earn 500 XP", icon: "💎", condition: (p) => p.totalXP >= 500 },
  { id: "part2-complete", name: "Storyteller", description: "Complete a Part 2 cue card", icon: "📖", condition: (p) => p.results.some((r) => r.part === 2) },
  { id: "fifty-practices", name: "Half Century", description: "Complete 50 practices", icon: "🏆", condition: (p) => p.results.length >= 50 },
];
