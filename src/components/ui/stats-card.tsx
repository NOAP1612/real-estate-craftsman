import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection = "neutral",
  className 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trendDirection) {
      case "up": return "text-secondary";
      case "down": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-card border border-border/50",
      "p-6 shadow-card hover:shadow-card-hover transition-all duration-300",
      "hover:border-primary/20 group",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn("text-sm font-medium", getTrendColor())}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg",
          "bg-primary/10 text-primary group-hover:bg-primary/20",
          "transition-colors duration-300"
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
    </div>
  );
}