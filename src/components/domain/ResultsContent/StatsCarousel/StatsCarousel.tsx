import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselHints from "@/components/custom/CarouselHints";
import StatsSlide from "@/components/domain/ResultsContent/StatsCarousel/StatsSlide/StatsSlide";
import DesktopStatsGrid from "@/components/domain/ResultsContent/StatsCarousel/DesktopStatsGrid/DesktopStatsGrid";
import type { DayStatsView } from "@/model/view/DayStatsView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface StatsCarouselProps {
  dayStats: DayStatsView | null;
  results: BatchGuessValidationView;
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
  isLoading: boolean;
  dayNumber: number;
  variant: string;
}

const StatsCarousel = ({
  dayStats,
  results,
  puzzles,
  guesses,
  isLoading,
  dayNumber,
  variant,
}: StatsCarouselProps) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[clamp(20rem,50svh,32rem)]">
        <p className="text-muted-foreground">Loading stats...</p>
      </div>
    );
  }

  if (!dayStats) {
    return (
      <div className="flex items-center justify-center h-[clamp(20rem,50svh,32rem)]">
        <p className="text-muted-foreground">Stats unavailable</p>
      </div>
    );
  }

  const slideCount = 1 + puzzles.length;

  return (
    <div className="w-full">
      {/* Mobile: Carousel */}
      <div className="touch:block desktop:hidden pb-8">
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
              <StatsSlide
                type="overall"
                title="Overall Score"
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
                  <StatsSlide
                    type="puzzle"
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

      {/* Desktop: Grid layout */}
      <div className="touch:hidden desktop:block">
        <DesktopStatsGrid
          dayStats={dayStats}
          results={results}
          puzzles={puzzles}
          guesses={guesses}
          dayNumber={dayNumber}
          variant={variant}
        />
      </div>
    </div>
  );
};

export default StatsCarousel;
