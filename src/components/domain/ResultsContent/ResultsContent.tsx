import { Card } from "@/components/ui/card";
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
  const { dayStats, isLoading } = useDayStats({
    guessrId,
    results,
    isCachedCompletion,
  });

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
        dayNumber={dayNumber}
        variant={variant}
      />
    </Card>
  );
};

export default ResultsContent;
