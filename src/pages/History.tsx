import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProgress } from "@/lib/storage";
import { IELTSPart, PracticeResult } from "@/types/ielts";

const History = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const [filterPart, setFilterPart] = useState<IELTSPart | null>(null);

  const filtered = filterPart
    ? progress.results.filter((r) => r.part === filterPart)
    : progress.results;

  const getBandColor = (band: number) => {
    if (band >= 7) return "bg-primary text-primary-foreground";
    if (band >= 5.5) return "bg-secondary text-secondary-foreground";
    if (band >= 4) return "bg-accent text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-8 pb-6 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => navigate("/")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-black text-primary-foreground">History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-3">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {[null, 1, 2, 3].map((p) => (
            <Button
              key={String(p)}
              variant={filterPart === p ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs font-bold"
              onClick={() => setFilterPart(p as IELTSPart | null)}
            >
              {p === null ? "All" : `Part ${p}`}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📝</div>
            <p className="font-bold text-muted-foreground">No practice sessions yet</p>
            <p className="text-sm text-muted-foreground">Start practicing to see your history!</p>
            <Button className="mt-4 rounded-2xl font-bold bg-primary" onClick={() => navigate("/practice")}>
              Start Practice
            </Button>
          </div>
        ) : (
          filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
              <HistoryCard result={r} bandColor={getBandColor(r.overallBand)} onClick={() => navigate(`/results/${r.id}`, { state: { result: r } })} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

function HistoryCard({ result, bandColor, onClick }: { result: PracticeResult; bandColor: string; onClick: () => void }) {
  const date = new Date(result.date);
  return (
    <Card className="border border-border shadow-sm cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`${bandColor} w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg`}>
            {result.overallBand}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] font-bold">Part {result.part}</Badge>
              <span className="text-[10px] text-muted-foreground font-semibold">
                {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-sm font-bold text-foreground truncate">{result.question}</p>
            <div className="flex gap-2 mt-1 text-[10px] font-bold text-muted-foreground">
              <span>F:{result.scores.fluencyCoherence}</span>
              <span>L:{result.scores.lexicalResource}</span>
              <span>G:{result.scores.grammaticalRange}</span>
              <span>P:{result.scores.pronunciation}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default History;
