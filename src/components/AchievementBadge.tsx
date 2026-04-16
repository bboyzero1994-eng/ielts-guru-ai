import { motion } from "framer-motion";
import { Achievement } from "@/types/ielts";

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
}

const AchievementBadge = ({ achievement, unlocked }: AchievementBadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${
        unlocked ? "bg-primary/10" : "bg-muted opacity-50"
      }`}
    >
      <div className={`text-2xl ${unlocked ? "" : "grayscale"}`}>{achievement.icon}</div>
      <span className="text-[10px] font-bold text-center text-foreground leading-tight">
        {achievement.name}
      </span>
    </motion.div>
  );
};

export default AchievementBadge;
