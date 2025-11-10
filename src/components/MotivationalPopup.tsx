import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface Quote {
  quote: string;
  icon: LucideIcon;
}

interface MotivationalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: Quote[];
}

export const MotivationalPopup = ({ isOpen, onClose, quotes }: MotivationalPopupProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => 
    Math.floor(Math.random() * quotes.length)
  );

  const currentQuote = quotes[currentQuoteIndex];
  const Icon = currentQuote?.icon;

  const handleNextMessage = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  if (!currentQuote) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-primary/30 bg-card/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
          <div className="relative p-8 flex flex-col items-center justify-center space-y-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary glow-card animate-glow-pulse">
              {Icon && <Icon className="w-10 h-10 text-background" strokeWidth={2.5} />}
            </div>
            <p className="text-center text-xl font-medium text-foreground leading-relaxed">
              {currentQuote.quote}
            </p>
            <div className="flex gap-3 w-full justify-center pt-4">
              <Button
                onClick={handleNextMessage}
                variant="outline"
                className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-primary rounded-full px-6"
              >
                Next message
              </Button>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 rounded-full px-6"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
