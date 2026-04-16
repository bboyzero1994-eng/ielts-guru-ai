import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Zap, Target, BookOpen, TrendingUp, Shuffle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgress, getTodayStats, getWeeklyStats } from "@/lib/storage";
import { getLevelInfo, ACHIEVEMENTS } from "@/types/ielts";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";
import DailyGoalRing from "@/components/DailyGoalRing";
import AchievementBadge from "@/components/AchievementBadge";
import { questions } from "@/data/questions";

const Index = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const todayStats = getTodayStats(progress);
  const weeklyStats = getWeeklyStats(progress);
  const levelInfo = getLevelInfo(progress.totalXP);

  const chartData = weeklyStats.map((s) => ({
    day: new Date(s.date).toLocaleDateString("en", { weekday: "short" }),
    questions: s.questionsAnswered,
  }));

  const handleQuickPractice = () => {
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    navigate(`/practice/${randomQ.id}`);
  };

  // Show first 6 achievements
  const displayAchievements = ACHIEVEMENTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-8 pb-12 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-primary-foreground">IELTS Speak</h1>
              <p className="text-primary-foreground/80 text-sm font-semibold">Practice makes perfect! 🎯</p>
            </div>
          </div>

          {/* Streak & XP row */}
          <div className="flex gap-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1 bg-primary-foreground/15 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
              <div className="text-3xl animate-flame">🔥</div>
              <div>
                <div className="text-2xl font-black text-primary-foreground">{progress.streak}</div>
                <div className="text-xs font-bold text-primary-foreground/70">Day Streak</div>
              </div>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="flex-1 bg-primary-foreground/15 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-accent" fill="currentColor" />
              <div>
                <div className="text-2xl font-black text-primary-foreground">{progress.totalXP}</div>
                <div className="text-xs font-bold text-primary-foreground/70">Total XP</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-6 space-y-4">
        {/* Level + Daily Goal */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{levelInfo.icon}</span>
                    <div>
                      <div className="font-extrabold text-foreground">Level {levelInfo.level}</div>
                      <div className="text-xs font-semibold text-muted-foreground">{levelInfo.name}</div>
                    </div>
                  </div>
                  <Progress value={levelInfo.progress * 100} className="h-3 bg-muted" />
                  {levelInfo.nextLevel && (
                    <div className="text-[10px] font-bold text-muted-foreground mt-1">{levelInfo.xpForNext} XP to next level</div>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <DailyGoalRing current={todayStats.questionsAnswered} goal={progress.dailyGoal} size={70} />
                  <span className="text-[10px] font-bold text-muted-foreground mt-1">Daily Goal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="border-2 border-border shadow-lg">
            <CardContent className="p-5">
              <h3 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Today's Progress
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-muted rounded-xl p-3">
                  <div className="text-2xl font-black text-foreground">{todayStats.questionsAnswered}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Questions</div>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <div className="text-2xl font-black text-foreground">
                    {todayStats.averageBand ? todayStats.averageBand.toFixed(1) : "—"}
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Avg Band</div>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <div className="text-2xl font-black text-foreground">{todayStats.xpEarned}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">XP</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="border-2 border-border shadow-lg">
            <CardContent className="p-5">
              <h3 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                This Week
              </h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} />
                    <Bar dataKey="questions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Preview */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 }}>
          <Card className="border-2 border-border shadow-lg">
            <CardContent className="p-5">
              <h3 className="font-extrabold text-foreground mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Achievements
                <span className="text-xs font-bold text-muted-foreground ml-auto">
                  {progress.unlockedAchievements.length}/{ACHIEVEMENTS.length}
                </span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {displayAchievements.map((a) => (
                  <AchievementBadge
                    key={a.id}
                    achievement={a}
                    unlocked={progress.unlockedAchievements.includes(a.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-3">
          <Button
            onClick={handleQuickPractice}
            variant="outline"
            className="w-full h-14 text-base font-bold rounded-2xl border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            size="lg"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Quick Practice — Random Question
          </Button>
          <Button
            onClick={() => navigate("/practice")}
            className="w-full h-16 text-lg font-black rounded-2xl shadow-lg animate-pulse-glow bg-primary hover:bg-primary/90"
            size="lg"
          >
            <BookOpen className="w-6 h-6 mr-2" />
            Start Practice
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
