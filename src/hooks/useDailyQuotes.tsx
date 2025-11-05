import { useState, useEffect } from 'react';
import { LucideIcon, Rocket, Globe, Star, Sparkles, Moon, Sun } from 'lucide-react';

interface Quote {
  quote: string;
  icon: LucideIcon;
}

const allQuotes: Quote[] = [
  {
    quote: "You're doing great, astronaut!",
    icon: Rocket,
  },
  {
    quote: "The universe has no limits, and neither do you.",
    icon: Globe,
  },
  {
    quote: "Every star was once darkness before it learned to shine.",
    icon: Star,
  },
  {
    quote: "Your dreams are the constellations guiding you forward.",
    icon: Sparkles,
  },
  {
    quote: "In the vastness of space, you are a brilliant spark.",
    icon: Moon,
  },
  {
    quote: "Launch beyond fear, land among the stars.",
    icon: Sun,
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getStartOfDay = (): string => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
};

export const useDailyQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>(allQuotes);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const storedDay = localStorage.getItem('astromate_quotes_day');
    const storedQuotes = localStorage.getItem('astromate_quotes');
    const currentDay = getStartOfDay();

    // Check if it's a new day or first visit
    if (storedDay !== currentDay || !storedQuotes) {
      // New day - shuffle and refresh
      setIsRefreshing(true);
      const shuffled = shuffleArray(allQuotes);
      
      // Delay to show animation
      setTimeout(() => {
        setQuotes(shuffled);
        localStorage.setItem('astromate_quotes_day', currentDay);
        localStorage.setItem('astromate_quotes', JSON.stringify(shuffled));
        
        // Reset animation state after transition
        setTimeout(() => setIsRefreshing(false), 300);
      }, 150);
    } else {
      // Same day - load stored quotes
      try {
        const parsed = JSON.parse(storedQuotes);
        setQuotes(parsed);
      } catch {
        // If parsing fails, use default
        setQuotes(allQuotes);
      }
    }
  }, []);

  return { quotes, isRefreshing };
};
