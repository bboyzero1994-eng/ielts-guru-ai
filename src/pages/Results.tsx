import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, ArrowRight, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PracticeResult } from "@/types/ielts";
import { getQuestionsByPart, getQuestionById } from "@/data/questions";
import confetti from "canvas-confetti";

const criteriaLabels = [
  { key: "fluencyCoherence" as const, label: "Fluency & Coherence", emoji: "🗣️" },
  { key: "lexicalResource" as const, label: "Lexical Resource", emoji: "📚" },
  { key: "grammaticalRange" as const, label: "Grammar Range & Accuracy", emoji: "✍️" },
  { key: "pronunciation" as const, label: "Pronunciation", emoji: "🎯" },
];

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as PracticeResult | undefined;

  useEffect(() => {
    if (!result) {
      navigate("/");
      return;
    }
    if (result.overallBand >= 7) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [result, navigate]);

  if (!result) return null;

  const getBandColor = (band: number) => {
    if (band >= 7) return "text-primary";
    if (band >= 5.5) return "text-secondary";
    if (band >= 4) return "text-accent";
    return "text-destructive";
  };

  const currentQ = getQuestionById(result.questionId);
  const partQuestions = currentQ ? getQuestionsByPart(currentQ.part) : [];
  const currentIdx = partQuestions.findIndex((q) => q.id === result.questionId);
  const nextQuestion = currentIdx >= 0 && currentIdx < partQuestions.length - 1 ? partQuestions[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-8 pb-12 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => navigate("/")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-black text-primary-foreground">Your Score</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-4">
        {/* Overall Band */}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }}>
          <Card className="border-2 border-primary/30 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Overall Band Score</div>
              <div className={`text-7xl font-black ${getBandColor(result.overallBand)}`}>
                {result.overallBand}
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-accent font-bold">
                <Zap className="w-5 h-5" fill="currentColor" />
                +{result.xpEarned} XP earned!
              </div>
              {result.overallBand >= 7 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="mt-3 text-2xl">
                  🎉 Excellent work!
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Criteria Scores */}
        {criteriaLabels.map((c, i) => {
          const score = result.scores[c.key];
          const feedbackText = result.feedback[c.key];
          return (
            <motion.div key={c.key} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <Card className="border border-border shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.emoji}</span>
                      <span className="font-bold text-sm text-foreground">{c.label}</span>
                    </div>
                    <span className={`text-xl font-black ${getBandColor(score)}`}>{score}</span>
                  </div>
                  <Progress value={(score / 9) * 100} className="h-2 mb-2 bg-muted" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{feedbackText}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {/* Overall Feedback */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <Card className="border border-border shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-accent" fill="currentColor" />
                <span className="font-bold text-sm text-foreground">Overall Feedback</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{result.feedback.overall}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sample Answer */}
        {result.feedback.sampleAnswer && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <Card className="border-2 border-secondary/30 shadow-md">
              <CardContent className="p-4">
                <div className="text-xs font-bold text-secondary uppercase mb-2">💡 Sample Answer</div>
                <p className="text-xs text-foreground leading-relaxed">{result.feedback.sampleAnswer}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Your Answer */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
          <Card className="border border-border shadow-md">
            <CardContent className="p-4">
              <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Your Answer</div>
              <p className="text-xs text-foreground leading-relaxed italic">"{result.transcript}"</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 rounded-2xl font-bold" onClick={() => navigate(`/practice/${result.questionId}`)}>
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          {nextQuestion ? (
            <Button className="flex-1 rounded-2xl font-bold bg-primary" onClick={() => navigate(`/practice/${nextQuestion.id}`)}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="flex-1 rounded-2xl font-bold bg-primary" onClick={() => navigate("/practice")}>
              More Questions
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
