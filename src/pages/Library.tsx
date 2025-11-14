import { Search, Plus, Library as LibraryIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LibraryQuoteCard } from "@/components/LibraryQuoteCard";
import { useMotivationLibrary, QuoteCategory } from "@/hooks/useMotivationLibrary";
import spaceBackground from "@/assets/space-background.jpg";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Star, Sparkles, Rocket, Target, Brain, Trophy, Globe, Sun, Zap, Heart } from "lucide-react";

const categories: (QuoteCategory | 'Favorites' | 'All')[] = ['All', 'Favorites', 'Calm', 'Focus', 'Achievement', 'Positivity', 'Energy'];

const availableIcons = [
  { name: 'Moon', icon: Moon },
  { name: 'Star', icon: Star },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Rocket', icon: Rocket },
  { name: 'Target', icon: Target },
  { name: 'Brain', icon: Brain },
  { name: 'Trophy', icon: Trophy },
  { name: 'Globe', icon: Globe },
  { name: 'Sun', icon: Sun },
  { name: 'Zap', icon: Zap },
  { name: 'Heart', icon: Heart },
];

const Library = () => {
  const {
    quotes,
    favorites,
    toggleFavorite,
    addCustomQuote,
    deleteQuote,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useMotivationLibrary();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCategoryForNew, setSelectedCategoryForNew] = useState<QuoteCategory>('Positivity');
  const [selectedIcon, setSelectedIcon] = useState('Star');

  const handleAddMessage = () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    addCustomQuote(newMessage.trim(), selectedCategoryForNew, selectedIcon);
    toast.success("Message added to your library!");
    
    // Reset form
    setNewMessage("");
    setSelectedCategoryForNew('Positivity');
    setSelectedIcon('Star');
    setIsDialogOpen(false);
  };

  const handleDeleteMessage = (quoteId: string) => {
    deleteQuote(quoteId);
    toast.success("Message deleted");
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 shadow-lg hover:shadow-primary/50 transition-all duration-300 border-2 border-primary/40">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Message
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card/95 backdrop-blur-md border-primary/30 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Create Your Own Message
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Message</label>
                    <Textarea
                      placeholder="Type your motivational message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[120px] bg-background/50 border-primary/30 focus:border-primary/50 resize-none"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category</label>
                    <Tabs value={selectedCategoryForNew} onValueChange={(v) => setSelectedCategoryForNew(v as QuoteCategory)}>
                      <TabsList className="grid w-full grid-cols-5 bg-background/50">
                        <TabsTrigger value="Calm">Calm</TabsTrigger>
                        <TabsTrigger value="Focus">Focus</TabsTrigger>
                        <TabsTrigger value="Achievement">Achievement</TabsTrigger>
                        <TabsTrigger value="Positivity">Positivity</TabsTrigger>
                        <TabsTrigger value="Energy">Energy</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Icon Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Choose an Icon</label>
                    <div className="grid grid-cols-6 gap-3">
                      {availableIcons.map(({ name, icon: IconComponent }) => (
                        <button
                          key={name}
                          onClick={() => setSelectedIcon(name)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            selectedIcon === name
                              ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30'
                              : 'border-primary/20 bg-background/30 hover:border-primary/40 hover:bg-background/50'
                          }`}
                        >
                          <IconComponent className={`w-6 h-6 mx-auto ${selectedIcon === name ? 'text-primary' : 'text-muted-foreground'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsDialogOpen(false)}
                      variant="outline"
                      className="flex-1 border-primary/30 hover:border-primary/50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddMessage}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 shadow-lg hover:shadow-primary/50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Library
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  isCustom={quote.isCustom}
                  onToggleFavorite={() => toggleFavorite(quote.id)}
                  onDelete={quote.isCustom ? () => handleDeleteMessage(quote.id) : undefined}
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
