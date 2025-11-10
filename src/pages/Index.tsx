import { Rocket } from "lucide-react";
import { MotivationalCard } from "@/components/MotivationalCard";
import { MotivationalPopup } from "@/components/MotivationalPopup";
import { Button } from "@/components/ui/button";
import spaceBackground from "@/assets/space-background.jpg";
import { useDailyQuotes } from "@/hooks/useDailyQuotes";
import { useMotivationalPopup } from "@/hooks/useMotivationalPopup";

const Index = () => {
  const { quotes, isRefreshing } = useDailyQuotes();
  const { isOpen, triggerPopup, closePopup } = useMotivationalPopup({
    focusTimerMinutes: 30,
    idleTimerMinutes: 5,
  });

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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 glow-card animate-float">
            <Rocket className="w-12 h-12 text-background" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow">
            AstroMate
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Daily motivation for space explorers
          </p>
          <div className="pt-4">
            <Button 
              onClick={triggerPopup}
              className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 rounded-full px-6 py-2 font-medium shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              🚀 Test Motivational Popup
            </Button>
          </div>
        </header>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-opacity duration-300 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}>
          {quotes.map((item, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${isRefreshing ? 0 : index * 0.1}s`, animationFillMode: 'both' }}
            >
              <MotivationalCard quote={item.quote} icon={item.icon} />
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center text-muted-foreground text-sm">
          <p>Keep reaching for the stars, astronaut. 🚀</p>
        </footer>
      </div>

      <MotivationalPopup isOpen={isOpen} onClose={closePopup} quotes={quotes} />
    </div>
  );
};

export default Index;
