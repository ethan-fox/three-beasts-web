import { Card } from "@/components/ui/card";
import ScorePie from "@/components/domain/ResultsContent/StatsCarousel/ScorePie/ScorePie";
import ShareButton from "@/components/domain/ResultsContent/ShareButton/ShareButton";
import { getMotivationalMessage } from "@/util/resultUtil";
import MobileResultsDisplay from "@/components/domain/ResultsContent/MobileResultsDisplay/MobileResultsDisplay";
import StatsCarousel from "@/components/domain/ResultsContent/StatsCarousel/StatsCarousel";
import { useDayStats } from "@/hook/useDayStats";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import { cn } from "@/lib/utils";

interface ResultsContentProps {
  dayNumber: number;
  guessrId: number;
  results: BatchGuessValidationView;
  guesses: Map<number, number | null>;
  puzzles: GuessrPuzzleView[];
  variant: string;
  isCachedCompletion: boolean;
  className?: string;
}

const ResultsContent = ({
  dayNumber,
  guessrId,
  results,
  guesses,
  puzzles,
  variant,
  isCachedCompletion,
  className,
}: ResultsContentProps) => {
  const showHistogram = variant === "default";

  const { dayStats, isLoading } = useDayStats({
    guessrId: showHistogram ? guessrId : null,
    results: showHistogram ? results : null,
    isCachedCompletion,
  });

  if (showHistogram) {
    return (
      <Card
        className={cn(
          "py-0 mt-4 bg-transparent border-none shadow-none flex flex-col",
          className
        )}
      >
        <StatsCarousel
          dayStats={dayStats}
          results={results}
          puzzles={puzzles}
          guesses={guesses}
          isLoading={isLoading}
        />

        <div className="px-6 py-4 flex justify-center">
          <ShareButton
            dayNumber={dayNumber}
            variant={variant}
            results={results}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "mt-4 bg-transparent border-none shadow-none flex flex-col",
        className
      )}
    >
      <div className="flex items-center justify-evenly gap-4 p-4">
        <div className="flex flex-col items-center shrink-0">
          <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
          <div className="w-[clamp(8rem,20vw,12rem)] aspect-square">
            <ScorePie score={results.overall_score} />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-32">
            {getMotivationalMessage(results.overall_score)}
          </p>
        </div>

        <div className="flex-1 max-w-md">
          <MobileResultsDisplay
            results={results.results}
            guesses={guesses}
            puzzles={puzzles}
          />
        </div>
      </div>

      <div className="px-6 py-4 flex justify-center">
        <ShareButton
          dayNumber={dayNumber}
          variant={variant}
          results={results}
        />
      </div>
    </Card>
  );
};

export default ResultsContent;
