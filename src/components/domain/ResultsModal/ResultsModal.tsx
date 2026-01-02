import GaugeComponent from "react-gauge-component";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
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

  const getMotivationalMessage = (score: number): string => {
    if (score === 100) {
      return "Perfect! You're a savant.";
    } else if (score >= 84) {
      return "You know your stuff!";
    } else if (score >= 69) {
      return "Well done, I'm impressed.";
    } else if (score >= 49) {
      return "Not bad! You're on your way.";
    } else if (score >= 29) {
      return "Keep practicing!";
    } else {
      return "Better luck next time.";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-4xl flex flex-col p-0">
        <div className="sticky top-0 bg-background rounded-t-lg px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-center">Results</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 mt-6">
            <GaugeComponent
              type="semicircle"
              arc={{
                padding: 0.02,
                colorArray: ["#ef4444", "#22c55e"],
                subArcs: [
                  { limit: 29 },
                  { limit: 49 },
                  { limit: 69 },
                  { limit: 84 },
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
            <p className="text-lg font-semibold text-center">
              {getMotivationalMessage(results.overall_score)}
            </p>
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="flex justify-center gap-4">
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

          <div className="mt-6">
            <Button onClick={onClose} className="w-full">
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
