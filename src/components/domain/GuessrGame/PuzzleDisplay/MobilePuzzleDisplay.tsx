import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { PuzzleView } from "@/model/view/PuzzleView";
import PuzzleCard from "../../PuzzleCard/PuzzleCard";
import { cn } from "@/lib/utils";

interface MobilePuzzleDisplayProps {
  puzzles: PuzzleView[];
  guesses: Map<number, number | null>;
  onGuessChange: (puzzleId: number, year: number | null) => void;
}

const MobilePuzzleDisplay = ({ puzzles, guesses, onGuessChange }: MobilePuzzleDisplayProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground md:hidden">Swipe to view each puzzle</p>
        <div className="flex gap-2">
          {puzzles.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                current === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              )}
              aria-label={`Go to puzzle ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {puzzles.map((puzzle, index) => (
            <CarouselItem key={puzzle.id}>
              <PuzzleCard
                puzzle={puzzle}
                puzzleNumber={index + 1}
                yearGuess={guesses.get(puzzle.id) ?? null}
                onYearChange={(year) => onGuessChange(puzzle.id, year)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default MobilePuzzleDisplay;
