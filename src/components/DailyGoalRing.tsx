import { motion } from "framer-motion";

interface DailyGoalRingProps {
  current: number;
  goal: number;
  size?: number;
}

const DailyGoalRing = ({ current, goal, size = 80 }: DailyGoalRingProps) => {
  const progress = Math.min(current / goal, 1);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const isComplete = current >= goal;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={6}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isComplete ? "hsl(var(--primary))" : "hsl(var(--accent))"}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-black text-foreground">{current}/{goal}</div>
      </div>
    </div>
  );
};

export default DailyGoalRing;
