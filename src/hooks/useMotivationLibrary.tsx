import { useState, useEffect } from 'react';
import { LucideIcon, Rocket, Globe, Star, Sparkles, Moon, Sun, Heart, Target, Zap, Brain, Trophy } from 'lucide-react';

export type QuoteCategory = 'Calm' | 'Focus' | 'Achievement' | 'Positivity' | 'Energy';

export interface LibraryQuote {
  id: string;
  quote: string;
  icon: LucideIcon;
  category: QuoteCategory;
}

export const allLibraryQuotes: LibraryQuote[] = [
  // Calm
  {
    id: 'calm-1',
    quote: "In the vastness of space, you are a brilliant spark.",
    icon: Moon,
    category: 'Calm',
  },
  {
    id: 'calm-2',
    quote: "Breathe like a star—slow, steady, eternal.",
    icon: Star,
    category: 'Calm',
  },
  {
    id: 'calm-3',
    quote: "The cosmos whispers: peace is found in stillness.",
    icon: Sparkles,
    category: 'Calm',
  },
  
  // Focus
  {
    id: 'focus-1',
    quote: "Launch beyond fear, land among the stars.",
    icon: Rocket,
    category: 'Focus',
  },
  {
    id: 'focus-2',
    quote: "Every mission begins with a single countdown.",
    icon: Target,
    category: 'Focus',
  },
  {
    id: 'focus-3',
    quote: "Lock onto your target like a telescope on a distant galaxy.",
    icon: Brain,
    category: 'Focus',
  },
  
  // Achievement
  {
    id: 'achievement-1',
    quote: "You're doing great, astronaut!",
    icon: Trophy,
    category: 'Achievement',
  },
  {
    id: 'achievement-2',
    quote: "Every star was once darkness before it learned to shine.",
    icon: Star,
    category: 'Achievement',
  },
  {
    id: 'achievement-3',
    quote: "You've orbited obstacles and reached new heights.",
    icon: Rocket,
    category: 'Achievement',
  },
  
  // Positivity
  {
    id: 'positivity-1',
    quote: "The universe has no limits, and neither do you.",
    icon: Globe,
    category: 'Positivity',
  },
  {
    id: 'positivity-2',
    quote: "Your dreams are the constellations guiding you forward.",
    icon: Sparkles,
    category: 'Positivity',
  },
  {
    id: 'positivity-3',
    quote: "You are made of stardust and infinite possibilities.",
    icon: Sun,
    category: 'Positivity',
  },
  
  // Energy
  {
    id: 'energy-1',
    quote: "Ignite your engines and blast through challenges!",
    icon: Zap,
    category: 'Energy',
  },
  {
    id: 'energy-2',
    quote: "Channel the energy of a supernova—unstoppable!",
    icon: Sun,
    category: 'Energy',
  },
  {
    id: 'energy-3',
    quote: "Fuel up, astronaut. The cosmos awaits your arrival.",
    icon: Rocket,
    category: 'Energy',
  },
];

export const useMotivationLibrary = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('astromate_favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (quoteId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId];
      localStorage.setItem('astromate_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Filter quotes based on search and category
  const filteredQuotes = allLibraryQuotes.filter((quote) => {
    const matchesSearch = quote.quote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    quotes: filteredQuotes,
    favorites,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
};
