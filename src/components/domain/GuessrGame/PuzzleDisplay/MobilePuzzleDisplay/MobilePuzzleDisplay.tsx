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
import PuzzleCard from "@/components/domain/PuzzleCard/PuzzleCard";
import CarouselHints from "@/components/custom/CarouselHints";

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
      <CarouselHints
        hint="Swipe to view each puzzle"
        puzzleCount={puzzles.length}
        currentIndex={current}
        api={api}
      />

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
        <CarouselPrevious className="touch:hidden desktop:flex" />
        <CarouselNext className="touch:hidden desktop:flex" />
      </Carousel>
    </div>
  );
};

export default MobilePuzzleDisplay;
