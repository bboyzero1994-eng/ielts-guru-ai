import { IELTSPart } from "@/types/ielts";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const tips: Record<number, { title: string; items: string[] }> = {
  1: {
    title: "Part 1 Tips — Familiar Topics",
    items: [
      "Answer in 2-3 sentences, not too short or too long",
      "Use the PEEL framework: Point → Explain → Example → Link back",
      "Extend your answer naturally — don't just say 'yes' or 'no'",
      "Use topic-specific vocabulary to boost Lexical Resource",
      "Speak for about 30-45 seconds per question",
    ],
  },
  2: {
    title: "Part 2 Tips — Long Turn (Cue Card)",
    items: [
      "Use the 1-minute prep time wisely — jot down key points mentally",
      "Cover ALL bullet points on the cue card",
      "Use the STAR method: Situation → Task → Action → Result",
      "Speak for the full 2 minutes — practice pacing",
      "Use time markers: 'First...', 'After that...', 'Finally...'",
      "Tell a story — examiners love narrative structure",
    ],
  },
  3: {
    title: "Part 3 Tips — Abstract Discussion",
    items: [
      "Give opinions with reasons: 'I believe... because...'",
      "Use hedging language: 'It seems that...', 'Generally speaking...'",
      "Compare and contrast different perspectives",
      "Use complex sentence structures to boost Grammar score",
      "Support your ideas with examples from society or personal experience",
      "Aim for 45-60 seconds per answer",
    ],
  },
};

interface SpeakingTipsDrawerProps {
  part: IELTSPart;
}

const SpeakingTipsDrawer = ({ part }: SpeakingTipsDrawerProps) => {
  const partTips = tips[part];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full text-xs font-bold gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-accent" />
          Tips
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-left font-extrabold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            {partTips.title}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3 pb-6">
          {partTips.items.map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-black text-primary">{i + 1}</span>
              </div>
              <p className="text-sm font-semibold text-foreground leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SpeakingTipsDrawer;
