import ContentTable from "@/components/domain/PuzzleCard/ContentTable/ContentTable";
import { calculateAccuracy } from "@/util/resultUtil";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface PuzzlePanelProps {
  result: PuzzleResultView;
  puzzle: GuessrPuzzleView;
  userGuess: number | null | undefined;
  layout?: "horizontal" | "vertical";
  showHint?: boolean;
}

const PuzzlePanel = ({
  result,
  puzzle,
  userGuess,
  layout = "horizontal",
  showHint = false,
}: PuzzlePanelProps) => {
  const accuracy = calculateAccuracy(result.score);

  const statsClassName = layout === "horizontal"
    ? "flex justify-between items-start gap-4 text-sm"
    : "space-y-2 text-sm";

  const statItemClassName = layout === "horizontal" ? "flex-1" : "";

  return (
    <div className="flex flex-col h-full">
      <div className={statsClassName}>
        <div className={statItemClassName}>
          <p className="text-muted-foreground">Your Answer</p>
          <p className="font-semibold">{userGuess ?? "No guess"}</p>
        </div>
        <div className={statItemClassName}>
          <p className="text-muted-foreground">Correct</p>
          <p className="font-semibold">{result.correct_answer}</p>
        </div>
        <div className={statItemClassName}>
          <p className="text-muted-foreground">Accuracy</p>
          <p className="font-semibold">{accuracy}%</p>
        </div>
      </div>

      <hr className="border-foreground/20 my-3" />

      {showHint && (
        <p className="font-semibold mb-2">{puzzle.hint.title}</p>
      )}

      <div className="flex-1 min-h-0">
        <ContentTable content={puzzle.content} />
      </div>
    </div>
  );
};

export default PuzzlePanel;
