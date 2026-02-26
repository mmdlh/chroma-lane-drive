import { cn } from "@/lib/utils";

interface SciFiCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  accent?: "primary" | "success" | "warning" | "danger";
}

const accentColors = {
  primary: "hsl(190 100% 50%)",
  success: "hsl(150 80% 45%)",
  warning: "hsl(35 100% 55%)",
  danger: "hsl(0 80% 55%)",
};

const SciFiCard = ({ title, children, className, elevated, accent = "primary" }: SciFiCardProps) => {
  return (
    <div className={cn(elevated ? "sci-card-elevated" : "sci-card", "p-4", className)}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full" style={{ background: accentColors[accent], boxShadow: `0 0 8px ${accentColors[accent]}` }} />
          <h3 className="sci-section-title text-xs">{title}</h3>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SciFiCard;
