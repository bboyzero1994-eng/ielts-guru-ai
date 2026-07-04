import { supabase } from "@/integrations/supabase/client";
import { getProgress, saveProgress } from "@/lib/storage";
import { PracticeResult, UserProgress } from "@/types/ielts";

export async function saveResultToCloud(result: PracticeResult) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("practice_results").insert({
    user_id: user.id,
    question_id: result.questionId,
    part: result.part,
    question: result.question,
    transcript: result.transcript,
    duration_seconds: 0,
    fluency: result.scores.fluencyCoherence,
    lexical: result.scores.lexicalResource,
    grammar: result.scores.grammaticalRange,
    pronunciation: result.scores.pronunciation,
    overall_band: result.overallBand,
    feedback: result.feedback.overall,
    sample_answer: result.feedback.sampleAnswer ?? null,
  });
}

export async function saveProgressToCloud(progress: UserProgress) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const completedIds = Array.from(new Set(progress.results.map((r) => r.questionId)));

  await supabase.from("user_progress").upsert({
    user_id: user.id,
    streak: progress.streak,
    xp: progress.totalXP,
    level: progress.level,
    last_practice_date: progress.lastPracticeDate,
    completed_question_ids: completedIds,
    achievement_ids: progress.unlockedAchievements,
  });
}

/**
 * On login, pull cloud data and merge with local. Cloud wins for progress
 * counters when it has more XP; results are unioned by id.
 */
export async function hydrateFromCloud() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const local = getProgress();

  const [{ data: cloudProgress }, { data: cloudResults }] = await Promise.all([
    supabase.from("user_progress").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("practice_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(500),
  ]);

  const merged: UserProgress = { ...local };

  if (cloudProgress) {
    merged.totalXP = Math.max(local.totalXP, cloudProgress.xp);
    merged.level = Math.max(local.level, cloudProgress.level);
    merged.streak = Math.max(local.streak, cloudProgress.streak);
    merged.lastPracticeDate = cloudProgress.last_practice_date || local.lastPracticeDate;
    merged.unlockedAchievements = Array.from(
      new Set([...(local.unlockedAchievements || []), ...(cloudProgress.achievement_ids || [])]),
    );
  }

  if (cloudResults && cloudResults.length > 0) {
    const existingIds = new Set(local.results.map((r) => r.id));
    const mapped: PracticeResult[] = cloudResults
      .filter((r) => !existingIds.has(r.id))
      .map((r) => ({
        id: r.id,
        questionId: r.question_id,
        part: r.part as 1 | 2 | 3,
        question: r.question,
        transcript: r.transcript,
        scores: {
          fluencyCoherence: Number(r.fluency ?? 0),
          lexicalResource: Number(r.lexical ?? 0),
          grammaticalRange: Number(r.grammar ?? 0),
          pronunciation: Number(r.pronunciation ?? 0),
        },
        feedback: {
          fluencyCoherence: "",
          lexicalResource: "",
          grammaticalRange: "",
          pronunciation: "",
          overall: r.feedback ?? "",
          sampleAnswer: r.sample_answer ?? undefined,
        },
        overallBand: Number(r.overall_band ?? 0),
        date: r.created_at,
        xpEarned: 0,
      }));
    merged.results = [...mapped, ...local.results].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  saveProgress(merged);
}
