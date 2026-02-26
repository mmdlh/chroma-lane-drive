interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  color?: string;
}

const ProgressRing = ({ value, max = 100, size = 80, label, color = "hsl(190,100%,50%)" }: ProgressRingProps) => {
  const pct = (value / max) * 100;
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(215,30%,15%)" strokeWidth={4} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={4} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-display text-sm font-bold" style={{ color }}>{Math.round(pct)}%</span>
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
};

export default ProgressRing;
