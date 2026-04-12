import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Square, ArrowLeft, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getQuestionById } from "@/data/questions";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { supabase } from "@/integrations/supabase/client";
import { addResult } from "@/lib/storage";
import { PracticeResult, ScoreDetail, ScoreFeedback } from "@/types/ielts";
import { toast } from "@/hooks/use-toast";

type Phase = "prep" | "recording" | "reviewing" | "scoring" | "done";

const PracticeSession = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const question = getQuestionById(questionId || "");
  const { transcript, isListening, startListening, stopListening, resetTranscript, isSupported, error } = useSpeechRecognition();

  const [phase, setPhase] = useState<Phase>(question?.cueCard ? "prep" : "recording");
  const [timer, setTimer] = useState(0);
  const [editedTranscript, setEditedTranscript] = useState("");
  const [isScoring, setIsScoring] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prepTimeRef = useRef(question?.cueCard?.prepTime || 0);

  useEffect(() => {
    if (!question) navigate("/practice");
  }, [question, navigate]);

  // Prep timer for Part 2
  useEffect(() => {
    if (phase === "prep" && question?.cueCard) {
      setTimer(prepTimeRef.current);
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleStartRecording();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [phase]);

  // Recording timer
  useEffect(() => {
    if (phase === "recording") {
      setTimer(0);
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [phase]);

  // Sync transcript
  useEffect(() => {
    if (phase === "recording") {
      setEditedTranscript(transcript);
    }
  }, [transcript, phase]);

  const handleStartRecording = () => {
    resetTranscript();
    startListening();
    setPhase("recording");
  };

  const handleStopRecording = () => {
    stopListening();
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("reviewing");
  };

  const handleSubmit = async () => {
    if (!editedTranscript.trim() || !question) return;
    setIsScoring(true);
    setPhase("scoring");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("score-speaking", {
        body: {
          part: question.part,
          question: question.question,
          transcript: editedTranscript.trim(),
        },
      });

      if (fnError) throw fnError;

      const scores: ScoreDetail = data.scores;
      const feedback: ScoreFeedback = data.feedback;
      const overallBand = data.overallBand;
      const xp = Math.round(overallBand * 10);

      const result: PracticeResult = {
        id: crypto.randomUUID(),
        questionId: question.id,
        part: question.part,
        question: question.question,
        transcript: editedTranscript.trim(),
        scores,
        feedback,
        overallBand,
        date: new Date().toISOString(),
        xpEarned: xp,
      };

      addResult(result);
      navigate(`/results/${result.id}`, { state: { result } });
    } catch (err) {
      console.error("Scoring error:", err);
      toast({ title: "Scoring Error", description: "Could not score your answer. Please try again.", variant: "destructive" });
      setPhase("reviewing");
      setIsScoring(false);
    }
  };

  if (!question) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-primary px-4 pt-8 pb-6 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => navigate("/practice")}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-black text-primary-foreground">Part {question.part}</h1>
            <div className="ml-auto flex items-center gap-2 text-primary-foreground font-bold">
              <Clock className="w-4 h-4" />
              {formatTime(timer)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-4">
        {/* Question Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Card className="border-2 border-primary/30 shadow-lg">
            <CardContent className="p-5">
              {question.cueCard ? (
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Cue Card</div>
                  <p className="font-bold text-foreground mb-3">{question.cueCard.prompt}</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold">You should say:</p>
                    {question.cueCard.bullets.map((b, i) => (
                      <p key={i} className="pl-3">• {b}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase mb-2">{question.topic}</div>
                  <p className="font-bold text-foreground text-lg">{question.question}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Prep phase */}
        <AnimatePresence mode="wait">
          {phase === "prep" && (
            <motion.div key="prep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
              <div className="text-6xl font-black text-primary">{timer}</div>
              <p className="text-sm font-bold text-muted-foreground">Preparation time — plan your answer!</p>
              <Button onClick={handleStartRecording} className="rounded-2xl font-bold bg-primary">
                Skip & Start Speaking
              </Button>
            </motion.div>
          )}

          {/* Recording / Reviewing */}
          {(phase === "recording" || phase === "reviewing") && (
            <motion.div key="record" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {!isSupported && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4" />
                  Speech recognition not supported. Type your answer instead.
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Textarea
                value={editedTranscript}
                onChange={(e) => setEditedTranscript(e.target.value)}
                placeholder={phase === "recording" ? "Speak now... your words will appear here" : "Edit your answer if needed, then submit"}
                className="min-h-[180px] rounded-2xl border-2 text-sm font-medium"
                readOnly={phase === "recording"}
              />

              {phase === "recording" ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-20 h-20 rounded-full bg-destructive flex items-center justify-center shadow-lg cursor-pointer"
                    onClick={handleStopRecording}
                  >
                    <Square className="w-8 h-8 text-destructive-foreground" fill="currentColor" />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-recording" />
                    <span className="text-sm font-bold text-muted-foreground">Recording...</span>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-2xl font-bold" onClick={() => { resetTranscript(); setEditedTranscript(""); setPhase("recording"); startListening(); }}>
                    <Mic className="w-4 h-4 mr-2" /> Re-record
                  </Button>
                  <Button className="flex-1 rounded-2xl font-bold bg-primary" onClick={handleSubmit} disabled={!editedTranscript.trim()}>
                    Submit Answer
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Scoring */}
          {phase === "scoring" && (
            <motion.div key="scoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-8">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-16 h-16 mx-auto rounded-full border-4 border-primary border-t-transparent" />
              <p className="font-bold text-muted-foreground">AI is scoring your answer...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PracticeSession;
