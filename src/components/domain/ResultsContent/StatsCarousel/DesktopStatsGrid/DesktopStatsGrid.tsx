import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselHints from "@/components/custom/CarouselHints";
import ScoreHistogram from "@/components/domain/ResultsContent/StatsCarousel/ScoreHistogram/ScoreHistogram";
import ScorePie from "@/components/domain/ResultsContent/StatsCarousel/ScorePie/ScorePie";
import PuzzlePanel from "@/components/domain/ResultsContent/PuzzlePanel/PuzzlePanel";
import { getMotivationalMessage } from "@/util/resultUtil";
import type { DayStatsView } from "@/model/view/DayStatsView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface DesktopStatsGridProps {
  dayStats: DayStatsView;
  results: BatchGuessValidationView;
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
}

const DesktopStatsGrid = ({
  dayStats,
  results,
  puzzles,
  guesses,
}: DesktopStatsGridProps) => {
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
    <div className="w-full">
      <CarouselHints
        hint="Results:"
        puzzleCount={slideCount}
        currentIndex={current}
        api={api}
      />

      <Carousel setApi={setApi} className="w-full h-[clamp(20rem,45svh,28rem)]">
        <CarouselContent className="h-full">
          {/* Overall Score Slide */}
          <CarouselItem className="h-full">
            <div className="grid grid-cols-3 gap-6 h-full px-4">
              <div className="col-span-2 h-full bg-zinc-500/10 rounded-lg">
                <ScoreHistogram
                  histogram={dayStats.histogram}
                  avgScore={dayStats.avg_score}
                  userScore={results.overall_score}
                />
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
                <div className="w-[clamp(10rem,80%,14rem)] aspect-square">
                  <ScorePie score={results.overall_score} />
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {getMotivationalMessage(results.overall_score)}
                </p>
              </div>
            </div>
          </CarouselItem>

          {/* Puzzle Slides */}
          {puzzles.map((puzzle, index) => {
            const puzzleStats = dayStats.puzzle_stats.find(
              (ps) => ps.puzzle_number === index
            );
            const result = results.results.find((r) => r.id === index);

            if (!puzzleStats || !result) return null;

            const userPuzzleScore = Math.round((result.score / 33) * 100);

            return (
              <CarouselItem key={puzzle.id} className="h-full">
                <div className="grid grid-cols-3 gap-6 h-full px-4">
                  <div className="col-span-2 h-full bg-zinc-500/10 rounded-lg">
                    <ScoreHistogram
                      histogram={puzzleStats.histogram}
                      avgScore={puzzleStats.avg_score}
                      userScore={userPuzzleScore}
                    />
                  </div>
                  <div className="flex flex-col h-full min-h-0">
                    <h3 className="text-lg font-semibold mb-3 shrink-0">
                      Puzzle {index + 1}. {puzzle.hint.title}
                    </h3>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                      <PuzzlePanel
                        result={result}
                        puzzle={puzzle}
                        userGuess={guesses.get(puzzle.id)}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default DesktopStatsGrid;
