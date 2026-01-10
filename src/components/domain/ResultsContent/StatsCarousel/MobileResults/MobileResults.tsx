import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselHints from "@/components/custom/CarouselHints";
import OverallSlide from "@/components/domain/ResultsContent/StatsCarousel/MobileResults/OverallSlide/OverallSlide";
import PuzzleSlide from "@/components/domain/ResultsContent/StatsCarousel/MobileResults/PuzzleSlide/PuzzleSlide";
import type { DayStatsView } from "@/model/view/DayStatsView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface MobileResultsProps {
  dayStats: DayStatsView;
  results: BatchGuessValidationView;
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
  dayNumber: number;
  variant: string;
}

const MobileResults = ({
  dayStats,
  results,
  puzzles,
  guesses,
  dayNumber,
  variant,
}: MobileResultsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slideCount = 1 + puzzles.length;

  return (
    <div className="pb-8">
      <CarouselHints
        hint="Results:"
        puzzleCount={slideCount}
        currentIndex={current}
        api={api}
      />

      <Carousel setApi={setApi} className="w-full touch-pan-y h-[34rem] relative">
        {current === 0 && (
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-popover border border-border rounded-md px-3 py-1.5 text-xs text-muted-foreground shadow-md animate-in fade-in-0">
            Swipe to see more &gt;&gt;&gt;
          </div>
        )}
        <CarouselContent className="h-full">
          <CarouselItem className="h-full">
            <OverallSlide
              histogram={dayStats.histogram}
              avgScore={dayStats.avg_score}
              userScore={results.overall_score}
              dayNumber={dayNumber}
              variant={variant}
              results={results}
            />
          </CarouselItem>

          {puzzles.map((puzzle, index) => {
            const puzzleStats = dayStats.puzzle_stats.find(
              (ps) => ps.puzzle_number === index
            );
            const result = results.results.find((r) => r.id === index);

            if (!puzzleStats || !result) return null;

            const userPuzzleScore = Math.round((result.score / 33) * 100);

            return (
              <CarouselItem key={puzzle.id} className="h-full">
                <PuzzleSlide
                  title={`Puzzle ${index + 1}. ${puzzle.hint.title}`}
                  histogram={puzzleStats.histogram}
                  avgScore={puzzleStats.avg_score}
                  userScore={userPuzzleScore}
                  result={result}
                  puzzle={puzzle}
                  userGuess={guesses.get(puzzle.id)}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileResults;
