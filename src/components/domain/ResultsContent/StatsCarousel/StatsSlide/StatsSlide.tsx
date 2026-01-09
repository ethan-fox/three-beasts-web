import { Card } from "@/components/ui/card";
import ScoreHistogram from "@/components/domain/ResultsContent/StatsCarousel/ScoreHistogram/ScoreHistogram";
import ScorePie from "@/components/domain/ResultsContent/StatsCarousel/ScorePie/ScorePie";
import PuzzlePanel from "@/components/domain/ResultsContent/PuzzlePanel/PuzzlePanel";
import { getMotivationalMessage } from "@/util/resultUtil";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface OverallSlideProps {
  type: "overall";
  title: string;
  histogram: number[];
  avgScore: number;
  userScore: number;
}

interface PuzzleSlideProps {
  type: "puzzle";
  title: string;
  histogram: number[];
  avgScore: number;
  userScore: number;
  result: PuzzleResultView;
  puzzle: GuessrPuzzleView;
  userGuess: number | null | undefined;
}

type StatsSlideProps = OverallSlideProps | PuzzleSlideProps;

const StatsSlide = (props: StatsSlideProps) => {
  const { type, title, histogram, avgScore, userScore } = props;

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
        {type === "overall" ? (
          <div className="flex items-center justify-between h-full px-4 gap-4">
            <div className="w-[clamp(5rem,40%,8rem)] aspect-square shrink-0">
              <ScorePie score={userScore} compact />
            </div>
            <p className="text-sm text-muted-foreground text-right flex-1">
              {getMotivationalMessage(userScore)}
            </p>
          </div>
        ) : (
          <PuzzlePanel
            result={props.result}
            puzzle={props.puzzle}
            userGuess={props.userGuess}
          />
        )}
      </div>
    </Card>
  );
};

export default StatsSlide;
