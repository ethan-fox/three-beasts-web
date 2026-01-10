import MobileResults from "@/components/domain/ResultsContent/StatsCarousel/MobileResults/MobileResults";
import DesktopResults from "@/components/domain/ResultsContent/StatsCarousel/DesktopResults/DesktopResults";
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

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="touch:block desktop:hidden">
        <MobileResults
          dayStats={dayStats}
          results={results}
          puzzles={puzzles}
          guesses={guesses}
          dayNumber={dayNumber}
          variant={variant}
        />
      </div>

      {/* Desktop */}
      <div className="touch:hidden desktop:block">
        <DesktopResults
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
