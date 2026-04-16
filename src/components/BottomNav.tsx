import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Clock } from "lucide-react";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/practice", label: "Practice", icon: BookOpen },
  { path: "/history", label: "History", icon: Clock },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on practice session and results pages
  if (location.pathname.startsWith("/practice/") || location.pathname.startsWith("/results/")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-[10px] font-bold ${isActive ? "text-primary" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
