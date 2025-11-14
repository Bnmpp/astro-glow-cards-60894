import { Search, Plus, Library as LibraryIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LibraryQuoteCard } from "@/components/LibraryQuoteCard";
import { useMotivationLibrary, QuoteCategory } from "@/hooks/useMotivationLibrary";
import spaceBackground from "@/assets/space-background.jpg";
import { toast } from "sonner";

const categories: (QuoteCategory | 'All')[] = ['All', 'Calm', 'Focus', 'Achievement', 'Positivity', 'Energy'];

const Library = () => {
  const {
    quotes,
    favorites,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useMotivationLibrary();

  const handlePlayMessage = (quote: string) => {
    toast.success("Playing message", {
      description: quote,
      duration: 4000,
    });
  };

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button
                variant="outline"
                className="border-primary/30 hover:border-primary/50 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 shadow-lg hover:shadow-primary/50 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Message
            </Button>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-block p-3 rounded-full bg-gradient-to-br from-primary to-secondary mb-2 glow-card">
              <LibraryIcon className="w-10 h-10 text-background" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow">
              Motivation Library
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Explore your collection of cosmic inspiration
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search messages across the stars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/50 border-primary/30 focus:border-primary/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/30'
                    : 'bg-card/50 text-muted-foreground border border-primary/20 hover:border-primary/40 hover:text-foreground backdrop-blur-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        {/* Quote grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-12">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <div
                key={quote.id}
                className="animate-fade-in"
                style={{ animationDelay: `${quotes.indexOf(quote) * 0.05}s`, animationFillMode: 'both' }}
              >
                <LibraryQuoteCard
                  quote={quote.quote}
                  icon={quote.icon}
                  category={quote.category}
                  isFavorite={favorites.includes(quote.id)}
                  onToggleFavorite={() => toggleFavorite(quote.id)}
                  onPlay={() => handlePlayMessage(quote.quote)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">
                No messages found. Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
