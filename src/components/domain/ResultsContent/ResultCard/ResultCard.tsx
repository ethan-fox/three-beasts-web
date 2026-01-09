import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import PuzzlePanel from "@/components/domain/ResultsContent/PuzzlePanel/PuzzlePanel";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface ResultCardProps {
  result: PuzzleResultView;
  puzzleNumber: number;
  userGuess: number | null | undefined;
  puzzle: GuessrPuzzleView;
}

const ResultCard = ({ result, puzzleNumber, userGuess, puzzle }: ResultCardProps) => {
  return (
    <Card className="bg-card border rounded-xl overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">
          Puzzle {puzzleNumber}. {puzzle.hint.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[16rem]">
        <PuzzlePanel
          result={result}
          puzzle={puzzle}
          userGuess={userGuess}
          layout="vertical"
        />
      </CardContent>
    </Card>
  );
};

export default ResultCard;
