import ResultGauge from "@/components/domain/ResultsContent/ResultGauge/ResultGauge";
import ShareButton from "@/components/domain/ResultsContent/ShareButton/ShareButton";
import MobileResultsDisplay from "@/components/domain/ResultsContent/MobileResultsDisplay/MobileResultsDisplay";
import DesktopResultsDisplay from "@/components/domain/ResultsContent/DesktopResultsDisplay/DesktopResultsDisplay";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import { cn } from "@/lib/utils";

interface ResultsContentProps {
  puzzleId: number;
  results: BatchGuessValidationView;
  guesses: Map<number, number | null>;
  variant: string;
  showGauge?: boolean;
  className?: string;
}

const ResultsContent = ({
  puzzleId,
  results,
  guesses,
  variant,
  className,
}: ResultsContentProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="p-6">
        <ResultGauge score={results.overall_score} />
      </div>

      {/* Share Button Section */}
      <div className="px-6 py-4 flex justify-center border-b">
        <ShareButton puzzleId={puzzleId} results={results} />
      </div>

      {/* Results Display Section */}
      <div className="touch:block desktop:hidden">
        <MobileResultsDisplay results={results.results} guesses={guesses} variant={variant} />
      </div>
      <div className="touch:hidden desktop:block">
        <DesktopResultsDisplay results={results.results} guesses={guesses} variant={variant} />
      </div>
    </div>
  );
};

export default ResultsContent;
