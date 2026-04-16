import { UserProgress, PracticeResult, DailyStats, ACHIEVEMENTS } from "@/types/ielts";

const STORAGE_KEY = "ielts-speaking-progress";

const defaultProgress: UserProgress = {
  totalXP: 0,
  level: 1,
  streak: 0,
  lastPracticeDate: null,
  results: [],
  dailyStats: [],
  dailyGoal: 3,
  unlockedAchievements: [],
};

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    // Migrate old data
    return {
      ...defaultProgress,
      ...parsed,
      dailyGoal: parsed.dailyGoal || 3,
      unlockedAchievements: parsed.unlockedAchievements || [],
    };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkAndUnlockAchievements(progress: UserProgress): string[] {
  const newlyUnlocked: string[] = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!progress.unlockedAchievements.includes(achievement.id) && achievement.condition(progress)) {
      progress.unlockedAchievements.push(achievement.id);
      newlyUnlocked.push(achievement.id);
    }
  }
  return newlyUnlocked;
}

export function addResult(result: PracticeResult): { progress: UserProgress; newAchievements: string[] } {
  const progress = getProgress();
  progress.results.unshift(result);
  progress.totalXP += result.xpEarned;

  // Update streak
  const today = getToday();
  if (progress.lastPracticeDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (progress.lastPracticeDate === yesterdayStr) {
      progress.streak += 1;
    } else if (progress.lastPracticeDate !== today) {
      progress.streak = 1;
    }
    progress.lastPracticeDate = today;
  }

  // Update daily stats
  let todayStats = progress.dailyStats.find((d) => d.date === today);
  if (!todayStats) {
    todayStats = { date: today, questionsAnswered: 0, averageBand: 0, xpEarned: 0 };
    progress.dailyStats.push(todayStats);
  }
  todayStats.questionsAnswered += 1;
  todayStats.xpEarned += result.xpEarned;

  const todayResults = progress.results.filter((r) => r.date.startsWith(today));
  todayStats.averageBand =
    todayResults.reduce((sum, r) => sum + r.overallBand, 0) / todayResults.length;

  // Keep last 90 days of daily stats
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  progress.dailyStats = progress.dailyStats.filter((d) => new Date(d.date) >= cutoff);

  // Check achievements
  const newAchievements = checkAndUnlockAchievements(progress);

  saveProgress(progress);
  return { progress, newAchievements };
}

export function getTodayStats(progress: UserProgress): DailyStats {
  const today = getToday();
  return (
    progress.dailyStats.find((d) => d.date === today) || {
      date: today,
      questionsAnswered: 0,
      averageBand: 0,
      xpEarned: 0,
    }
  );
}

export function getWeeklyStats(progress: UserProgress): DailyStats[] {
  const result: DailyStats[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const existing = progress.dailyStats.find((s) => s.date === dateStr);
    result.push(
      existing || { date: dateStr, questionsAnswered: 0, averageBand: 0, xpEarned: 0 }
    );
  }
  return result;
}

export function getQuestionScore(progress: UserProgress, questionId: string): number | null {
  const result = progress.results.find((r) => r.questionId === questionId);
  return result ? result.overallBand : null;
}

export function setDailyGoal(goal: number) {
  const progress = getProgress();
  progress.dailyGoal = goal;
  saveProgress(progress);
}
