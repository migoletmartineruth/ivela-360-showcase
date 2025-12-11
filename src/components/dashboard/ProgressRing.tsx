import { cn } from '@/lib/utils';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({ 
  value, 
  max = 100, 
  size = 120, 
  strokeWidth = 10,
  className,
  label,
  sublabel
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min((value / max) * 100, 100);
  const offset = circumference - (percent / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 80) return 'text-success';
    if (val >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90 transform">
        {/* Background circle */}
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn("transition-all duration-700 ease-out", getColor(percent))}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-foreground">{Math.round(percent)}%</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
        {sublabel && <span className="text-[10px] text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  );
}
