import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import ResultCard from "@/components/domain/ResultsContent/ResultCard/ResultCard";
import CarouselHints from "@/components/custom/CarouselHints";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface MobileResultsDisplayProps {
  results: PuzzleResultView[];
  guesses: Map<number, number | null>;
  puzzles: GuessrPuzzleView[];
  variant: string;
}

const MobileResultsDisplay = ({ results, guesses, puzzles, variant }: MobileResultsDisplayProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Reset carousel position when results change
  useEffect(() => {
    api?.scrollTo(0);
  }, [results, api]);

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
    <div className="px-6 py-6">
      <CarouselHints
        hint="Answers:"
        puzzleCount={results.length}
        currentIndex={current}
        api={api}
      />

      <Carousel setApi={setApi} className="w-full max-w-xs mx-auto touch-pan-y">
        <CarouselContent>
          {results.map((result, index) => {
            const userGuess = guesses.get(result.id);
            const puzzle = puzzles.find(p => p.id === result.id);

            return (
              <CarouselItem key={result.id} className="py-4 pr-4 pl-6">
                <ResultCard
                  result={result}
                  puzzleNumber={index + 1}
                  userGuess={userGuess}
                  puzzle={puzzle}
                  variant={variant}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="touch:hidden desktop:flex" />
        <CarouselNext className="touch:hidden desktop:flex" />
      </Carousel>
    </div>
  );
};

export default MobileResultsDisplay;
