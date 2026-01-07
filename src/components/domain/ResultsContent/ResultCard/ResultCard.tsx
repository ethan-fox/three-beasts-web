import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { calculateAccuracy } from "@/util/resultUtil";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import { getVariantCardClasses } from "@/util/variantUtil";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: PuzzleResultView;
  puzzleNumber: number;
  userGuess: number | null | undefined;
  variant: string;
}

const ResultCard = ({ result, puzzleNumber, userGuess, variant }: ResultCardProps) => {
  const accuracy = calculateAccuracy(result.score);
  const cardClasses = getVariantCardClasses(variant);

  return (
    <Card className={cn(cardClasses)}>
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
