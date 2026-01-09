import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentTable from "@/components/domain/PuzzleCard/ContentTable/ContentTable";
import { calculateAccuracy } from "@/util/resultUtil";
import { getVariantConfig } from "@/util/variantUtil";
import { cn } from "@/lib/utils";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface ResultCardProps {
  result: PuzzleResultView;
  puzzleNumber: number;
  userGuess: number | null | undefined;
  puzzle?: GuessrPuzzleView;
  variant: string;
}

const ResultCard = ({ result, puzzleNumber, userGuess, puzzle, variant }: ResultCardProps) => {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const accuracy = calculateAccuracy(result.score);
  const config = getVariantConfig(variant);

  return (
    <Card className={cn(
      "bg-gradient-to-br border rounded-xl shadow-lg overflow-hidden relative",
      config.color.gradient,
      config.color.glow
    )}>
      {puzzle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPuzzle(!showPuzzle)}
          className="absolute right-2 top-4 z-10 text-muted-foreground"
          aria-label={showPuzzle ? "Back to results" : "View puzzle"}
        >
          <ChevronRight className={cn(
            "w-6 h-6 transition-transform duration-300",
            showPuzzle && "rotate-180"
          )} />
        </Button>
      )}

      <CardHeader>
        <CardTitle className="text-lg text-center">Puzzle {puzzleNumber}</CardTitle>
      </CardHeader>

      <div className="relative overflow-hidden h-[clamp(14rem,32vh,22rem)]">
        <div
          className={cn(
            "flex transition-transform duration-300 ease-in-out h-full",
            showPuzzle && "-translate-x-1/2"
          )}
          style={{ width: "200%" }}
        >
          {/* Results Panel */}
          <CardContent className="w-1/2 space-y-2">
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

          {/* Puzzle Panel */}
          <CardContent className="w-1/2 h-full text-left flex flex-col">
            {puzzle ? (
              <>
                <p className="font-semibold">{puzzle.hint.title}</p>
                <hr className="border-foreground/20 my-3" />
                <div className="flex-1 min-h-0">
                  <ContentTable content={puzzle.content} fadeColor={config.color.fade} />
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Puzzle data not available</p>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
