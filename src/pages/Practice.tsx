import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, FileText, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getQuestionsByPart } from "@/data/questions";
import { IELTSPart, Question } from "@/types/ielts";
import { getProgress, getQuestionScore } from "@/lib/storage";

const partInfo = [
  { part: 1 as IELTSPart, label: "Part 1", desc: "Familiar Topics", icon: MessageCircle, color: "bg-primary", time: "~30-60s each" },
  { part: 2 as IELTSPart, label: "Part 2", desc: "Cue Card", icon: FileText, color: "bg-secondary", time: "1min prep + 2min speak" },
  { part: 3 as IELTSPart, label: "Part 3", desc: "Discussion", icon: Brain, color: "bg-accent", time: "~60-90s each" },
];

const Practice = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<IELTSPart | null>(null);
  const progress = getProgress();

  const questions = selectedPart ? getQuestionsByPart(selectedPart) : [];

  const getPartProgress = (part: IELTSPart) => {
    const partQuestions = getQuestionsByPart(part);
    const done = partQuestions.filter((q) => getQuestionScore(progress, q.id) !== null).length;
    return { done, total: partQuestions.length };
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-4 pt-8 pb-6 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => selectedPart ? setSelectedPart(null) : navigate("/")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-black text-primary-foreground">
              {selectedPart ? `Part ${selectedPart}` : "Choose a Part"}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-3">
        {!selectedPart ? (
          partInfo.map((p, i) => {
            const { done, total } = getPartProgress(p.part);
            return (
              <motion.div key={p.part} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-2 border-border shadow-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setSelectedPart(p.part)}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`${p.color} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                      <p.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-extrabold text-lg text-foreground">{p.label}</div>
                      <div className="text-sm font-semibold text-muted-foreground">{p.desc}</div>
                      <div className="text-xs text-muted-foreground mt-1">{p.time}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{done}/{total}</span>
                      </div>
                    </div>
                    <div className="text-2xl">→</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          questions.map((q, i) => (
            <motion.div key={q.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <QuestionCard question={q} score={getQuestionScore(progress, q.id)} onClick={() => navigate(`/practice/${q.id}`)} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

function QuestionCard({ question, score, onClick }: { question: Question; score: number | null; onClick: () => void }) {
  const isDone = score !== null;
  const getBandColor = (band: number) => {
    if (band >= 7) return "bg-primary text-primary-foreground";
    if (band >= 5.5) return "bg-secondary text-secondary-foreground";
    if (band >= 4) return "bg-accent text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <Card className={`border-2 shadow-md cursor-pointer hover:shadow-lg transition-all hover:border-primary/40 ${isDone ? "border-primary/20" : "border-border"}`} onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {isDone ? (
            <div className={`${getBandColor(score!)} rounded-xl w-10 h-10 flex items-center justify-center shrink-0 text-sm font-black`}>
              {score}
            </div>
          ) : (
            <div className="bg-muted rounded-xl w-10 h-10 flex items-center justify-center shrink-0 text-sm font-black text-muted-foreground">
              {question.topic.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="text-xs font-bold text-muted-foreground uppercase">{question.topic}</div>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
            </div>
            <div className="font-bold text-foreground text-sm">{question.question}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Practice;
