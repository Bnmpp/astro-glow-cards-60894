import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MotivationalCardProps {
  quote: string;
  icon: LucideIcon;
}

export const MotivationalCard = ({ quote, icon: Icon }: MotivationalCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-card border-primary/30 glow-card transition-all duration-500 hover:glow-card-hover hover:scale-105 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
      <div className="relative p-8 flex flex-col items-center justify-center min-h-[240px] space-y-6">
        <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary glow-card group-hover:animate-glow-pulse">
          <Icon className="w-8 h-8 text-background" strokeWidth={2.5} />
        </div>
        <p className="text-center text-lg font-medium text-foreground leading-relaxed">
          {quote}
        </p>
      </div>
    </Card>
  );
};
