import { useState, useEffect } from "react";
import { CircleHelp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { guessrClient } from "@/client/GuessrClient";
import type { HowToPlayView } from "@/model/view/HowToPlayView";

const HowToPlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [howToPlay, setHowToPlay] = useState<HowToPlayView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !howToPlay) {
      const fetchContent = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await guessrClient.fetchHowToPlay();
          setHowToPlay(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load content");
        } finally {
          setIsLoading(false);
        }
      };

      fetchContent();
    }
  }, [isOpen, howToPlay]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="How to play"
            >
              <CircleHelp className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>How to play</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to Play</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-destructive">{error}</p>}
            {howToPlay && <div className="whitespace-pre-wrap">{howToPlay.content}</div>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HowToPlay;
