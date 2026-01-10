import { Card } from "@/components/ui/card";
import ScoreHistogram from "@/components/domain/ResultsContent/StatsCarousel/ScoreHistogram/ScoreHistogram";
import PuzzlePanel from "@/components/domain/ResultsContent/PuzzlePanel/PuzzlePanel";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface PuzzleSlideProps {
  title: string;
  histogram: number[];
  avgScore: number;
  userScore: number;
  result: PuzzleResultView;
  puzzle: GuessrPuzzleView;
  userGuess: number | null | undefined;
}

const PuzzleSlide = ({
  title,
  histogram,
  avgScore,
  userScore,
  result,
  puzzle,
  userGuess,
}: PuzzleSlideProps) => {
  return (
    <Card className="flex flex-col h-full mx-2 p-4 bg-card border rounded-xl">
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      <div className="shrink-0 h-[200px] bg-zinc-500/10 rounded-lg">
        <ScoreHistogram
          histogram={histogram}
          avgScore={avgScore}
          userScore={userScore}
        />
      </div>

      <div className="flex-1 min-h-0 mt-2">
        <PuzzlePanel
          result={result}
          puzzle={puzzle}
          userGuess={userGuess}
        />
      </div>
    </Card>
  );
};

export default PuzzleSlide;
