interface StatValueProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down";
  color?: string;
}

const StatValue = ({ label, value, unit, trend, color }: StatValueProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="flex items-end gap-1">
      <span className="sci-value text-lg" style={color ? { color, textShadow: `0 0 15px ${color}` } : undefined}>
        {value}
      </span>
      {unit && <span className="text-xs text-muted-foreground mb-1">{unit}</span>}
      {trend && (
        <span className={`text-xs mb-1 ${trend === "up" ? "text-glow-success" : "text-glow-danger"}`}>
          {trend === "up" ? "↑" : "↓"}
        </span>
      )}
    </div>
  </div>
);

export default StatValue;
