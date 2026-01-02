import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { calculateAccuracy } from "@/util/resultUtil";
import ResultGauge from "@/components/domain/ResultsContent/ResultGauge/ResultGauge";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import { cn } from "@/lib/utils";

interface ResultsContentProps {
  results: BatchGuessValidationView;
  guesses: Map<number, number | null>;
  showGauge?: boolean;
  className?: string;
}

const ResultsContent = ({
  results,
  guesses,
  className,
}: ResultsContentProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="px-6 py-6 border-b">
        <ResultGauge score={results.overall_score} />
      </div>

      {/* Puzzle Cards Section */}
      <div className="px-6 py-6">
        <div className="flex justify-center gap-4">
          {results.results.map((result, index) => {
            const userGuess = guesses.get(result.id);
            const accuracy = calculateAccuracy(result.score);

            return (
              <Card key={result.id} className="flex-1 max-w-xs">
                <CardHeader>
                  <CardTitle className="text-lg">Puzzle {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Answer</p>
                    <p className="font-semibold">{userGuess ?? "No guess"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Correct Answer
                    </p>
                    <p className="font-semibold">{result.correct_answer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="font-semibold">{accuracy}%</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsContent;
