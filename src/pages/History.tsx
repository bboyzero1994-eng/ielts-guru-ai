import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProgress } from "@/lib/storage";
import { IELTSPart, PracticeResult } from "@/types/ielts";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

const History = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const [filterPart, setFilterPart] = useState<IELTSPart | null>(null);
  const [showChart, setShowChart] = useState(true);

  const filtered = filterPart
    ? progress.results.filter((r) => r.part === filterPart)
    : progress.results;

  const getBandColor = (band: number) => {
    if (band >= 7) return "bg-primary text-primary-foreground";
    if (band >= 5.5) return "bg-secondary text-secondary-foreground";
    if (band >= 4) return "bg-accent text-accent-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  // Build criteria trend data (last 20 results, reversed for chronological)
  const trendData = [...filtered].reverse().slice(-20).map((r, i) => ({
    idx: i + 1,
    date: new Date(r.date).toLocaleDateString("en", { month: "short", day: "numeric" }),
    Fluency: r.scores.fluencyCoherence,
    Lexical: r.scores.lexicalResource,
    Grammar: r.scores.grammaticalRange,
    Pronunciation: r.scores.pronunciation,
    Overall: r.overallBand,
  }));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-4 pt-8 pb-6 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-primary-foreground">History</h1>
            <span className="text-primary-foreground/70 text-sm font-bold ml-auto">
              {progress.results.length} sessions
            </span>
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

        {/* Criteria Trend Chart */}
        {trendData.length >= 2 && showChart && (
          <Card className="border-2 border-border shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-extrabold text-foreground mb-3 flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                Score Trends
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="date" tick={{ fontSize: 9, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 9]} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, fontWeight: 600, borderRadius: 12 }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    <Line type="monotone" dataKey="Fluency" stroke="hsl(145, 63%, 42%)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Lexical" stroke="hsl(198, 93%, 55%)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Grammar" stroke="hsl(38, 100%, 55%)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Pronunciation" stroke="hsl(270, 70%, 55%)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Overall" stroke="hsl(0, 0%, 40%)" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

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
