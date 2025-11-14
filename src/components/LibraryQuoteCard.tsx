import { LucideIcon, Heart, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface LibraryQuoteCardProps {
  quote: string;
  icon: LucideIcon;
  category: string;
  isFavorite: boolean;
  isCustom?: boolean;
  onToggleFavorite: () => void;
  onDelete?: () => void;
}

export const LibraryQuoteCard = ({
  quote,
  icon: Icon,
  category,
  isFavorite,
  isCustom,
  onToggleFavorite,
  onDelete,
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

      {/* Action buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full bg-card/80 border border-border hover:border-primary/50 transition-all duration-300 group/fav backdrop-blur-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite
                ? "fill-primary text-primary drop-shadow-[0_0_8px_hsl(var(--glow-primary))] animate-pulse-glow"
                : "text-muted-foreground group-hover/fav:text-primary"
            }`}
          />
        </button>
        
        {isCustom && onDelete && (
          <button
            onClick={onDelete}
            className="p-2 rounded-full bg-card/80 border border-border hover:border-destructive/50 transition-all duration-300 group/del backdrop-blur-sm"
            aria-label="Delete message"
          >
            <Trash2 className="w-5 h-5 text-muted-foreground group-hover/del:text-destructive transition-all duration-300" />
          </button>
        )}
      </div>

      <div className="relative p-6 flex flex-col items-center justify-center min-h-[200px] space-y-4">
        {/* Icon */}
        <div className={`p-4 rounded-full bg-gradient-to-br from-primary to-secondary glow-card transition-all duration-500 ${isHovered ? 'animate-pulse-glow scale-110' : ''}`}>
          <Icon className="w-7 h-7 text-background" strokeWidth={2.5} />
        </div>

        {/* Quote text */}
        <p className="text-center text-base font-medium text-foreground leading-relaxed">
          {quote}
        </p>
      </div>
    </Card>
  );
};
