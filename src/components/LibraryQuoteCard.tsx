import { LucideIcon, Heart, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LibraryQuoteCardProps {
  quote: string;
  icon: LucideIcon;
  category: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPlay: () => void;
}

export const LibraryQuoteCard = ({
  quote,
  icon: Icon,
  category,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: LibraryQuoteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden bg-card border-primary/30 glow-card transition-all duration-300 hover:glow-card-hover hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
      
      {/* Category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Favorite button */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 border border-border hover:border-primary/50 transition-all duration-300 group/fav backdrop-blur-sm"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            isFavorite
              ? "fill-primary text-primary drop-shadow-[0_0_8px_hsl(var(--glow-primary))]"
              : "text-muted-foreground group-hover/fav:text-primary"
          }`}
        />
      </button>

      <div className="relative p-6 flex flex-col items-center justify-between min-h-[220px] space-y-4">
        {/* Icon */}
        <div className={`p-4 rounded-full bg-gradient-to-br from-primary to-secondary glow-card transition-all duration-300 ${isHovered ? 'animate-glow-pulse scale-110' : ''}`}>
          <Icon className="w-7 h-7 text-background" strokeWidth={2.5} />
        </div>

        {/* Quote text */}
        <p className="text-center text-base font-medium text-foreground leading-relaxed flex-1 flex items-center">
          {quote}
        </p>

        {/* Play button */}
        <Button
          onClick={onPlay}
          size="sm"
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--glow-primary)/0.4)]"
        >
          <Play className="w-4 h-4 mr-2 fill-current" />
          Play Message
        </Button>
      </div>
    </Card>
  );
};
