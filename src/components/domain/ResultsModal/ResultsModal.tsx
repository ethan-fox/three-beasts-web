import GaugeComponent from "react-gauge-component";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

interface ResultsModalProps {
  results: BatchGuessValidationView;
  guesses: Map<number, number | null>;
  onClose: () => void;
}

const ResultsModal = ({ results, guesses, onClose }: ResultsModalProps) => {
  const calculateAccuracy = (score: number): number => {
    return Math.round((score / 33) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Results</h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <GaugeComponent
              type="semicircle"
              arc={{
                padding: 0.02,
                colorArray: ["#ef4444", "#22c55e"],
                subArcs: [
                  { limit: 50 },
                  { limit: 70 },
                  { limit: 80 },
                  { limit: 90 },
                  {},
                ],
              }}
              pointer={{
                type: "arrow",
                animationDelay: 0,
              }}
              labels={{
                valueLabel: {
                  matchColorWithArc: true
                },
                tickLabels: {
                  hideMinMax: true
                }
              }}
              value={results.overall_score}
              minValue={0}
              maxValue={100}
            />
          </div>

          <div className="flex justify-center gap-4 px-4">
            {results.results.map((result, index) => {
              const userGuess = guesses.get(result.id);
              const accuracy = calculateAccuracy(result.score);

              return (
                <Card key={result.id} className="flex-1 max-w-xs">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Puzzle {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Your Answer
                      </p>
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
        </CardContent>

        <CardFooter>
          <Button onClick={onClose} className="w-full">
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsModal;
