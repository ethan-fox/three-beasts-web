import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { calculateAccuracy } from "@/util/resultUtil";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";

interface ResultCardProps {
  result: PuzzleResultView;
  puzzleNumber: number;
  userGuess: number | null | undefined;
}

const ResultCard = ({ result, puzzleNumber, userGuess }: ResultCardProps) => {
  const accuracy = calculateAccuracy(result.score);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Puzzle {puzzleNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">Your Answer</p>
          <p className="font-semibold">{userGuess ?? "No guess"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Correct Answer</p>
          <p className="font-semibold">{result.correct_answer}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Accuracy</p>
          <p className="font-semibold">{accuracy}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
