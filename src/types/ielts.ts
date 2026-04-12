export type IELTSPart = 1 | 2 | 3;

export interface Question {
  id: string;
  part: IELTSPart;
  topic: string;
  question: string;
  cueCard?: {
    prompt: string;
    bullets: string[];
    prepTime: number; // seconds
    speakTime: number; // seconds
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
  date: string; // ISO string
  xpEarned: number;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  questionsAnswered: number;
  averageBand: number;
  xpEarned: number;
}

export interface UserProgress {
  totalXP: number;
  level: number;
  streak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
  results: PracticeResult[];
  dailyStats: DailyStats[];
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
