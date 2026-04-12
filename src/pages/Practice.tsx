import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, FileText, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getQuestionsByPart } from "@/data/questions";
import { IELTSPart, Question } from "@/types/ielts";

const partInfo = [
  { part: 1 as IELTSPart, label: "Part 1", desc: "Familiar Topics", icon: MessageCircle, color: "bg-primary" },
  { part: 2 as IELTSPart, label: "Part 2", desc: "Cue Card", icon: FileText, color: "bg-secondary" },
  { part: 3 as IELTSPart, label: "Part 3", desc: "Discussion", icon: Brain, color: "bg-accent" },
];

const Practice = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<IELTSPart | null>(null);

  const questions = selectedPart ? getQuestionsByPart(selectedPart) : [];

  return (
    <div className="min-h-screen bg-background pb-8">
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
          partInfo.map((p, i) => (
            <motion.div key={p.part} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-2 border-border shadow-lg cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => setSelectedPart(p.part)}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`${p.color} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                    <p.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-lg text-foreground">{p.label}</div>
                    <div className="text-sm font-semibold text-muted-foreground">{p.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{getQuestionsByPart(p.part).length} questions</div>
                  </div>
                  <div className="text-2xl">→</div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          questions.map((q, i) => (
            <motion.div key={q.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <QuestionCard question={q} onClick={() => navigate(`/practice/${q.id}`)} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

function QuestionCard({ question, onClick }: { question: Question; onClick: () => void }) {
  return (
    <Card className="border-2 border-border shadow-md cursor-pointer hover:shadow-lg transition-all hover:border-primary/40" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-muted rounded-xl w-10 h-10 flex items-center justify-center shrink-0 text-sm font-black text-muted-foreground">
            {question.topic.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase mb-1">{question.topic}</div>
            <div className="font-bold text-foreground text-sm">{question.question}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Practice;
