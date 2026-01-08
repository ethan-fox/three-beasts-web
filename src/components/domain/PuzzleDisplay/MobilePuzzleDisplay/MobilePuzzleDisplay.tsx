import { useState, useEffect, useRef, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import PuzzleCard from "@/components/domain/PuzzleCard/PuzzleCard";
import CarouselHints from "@/components/custom/CarouselHints";

interface MobilePuzzleDisplayProps {
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
  onGuessChange: (puzzleId: number, year: number | null) => void;
  variant: string;
}

const MobilePuzzleDisplay = ({ puzzles, guesses, onGuessChange, variant }: MobilePuzzleDisplayProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusCurrentInput = useCallback((index: number) => {
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 100);
  }, []);

  // Reset carousel position when variant changes
  useEffect(() => {
    api?.scrollTo(0);
  }, [variant, api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      focusCurrentInput(newIndex);
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, focusCurrentInput]);

  return (
    <div className="w-full max-w-md mx-auto">
      <CarouselHints
        hint="Swipe to view each puzzle"
        puzzleCount={puzzles.length}
        currentIndex={current}
        api={api}
      />

      <Carousel setApi={setApi} className="w-full touch-pan-y">
        <CarouselContent>
          {puzzles.map((puzzle, index) => (
            <CarouselItem key={puzzle.id} className="py-4 pr-4 pl-8">
              <PuzzleCard
                ref={(el) => { inputRefs.current[index] = el; }}
                puzzle={puzzle}
                puzzleNumber={index + 1}
                yearGuess={guesses.get(puzzle.id) ?? null}
                onYearChange={(year) => onGuessChange(puzzle.id, year)}
                variant={variant}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="touch:hidden desktop:flex" />
        <CarouselNext className="touch:hidden desktop:flex" />
      </Carousel>
    </div>
  );
};

export default MobilePuzzleDisplay;
