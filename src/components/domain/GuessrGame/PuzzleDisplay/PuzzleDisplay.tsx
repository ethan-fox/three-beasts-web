import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import MobilePuzzleDisplay from "@/components/domain/GuessrGame/PuzzleDisplay/MobilePuzzleDisplay/MobilePuzzleDisplay";
import DesktopPuzzleDisplay from "@/components/domain/GuessrGame/PuzzleDisplay/DesktopPuzzleDisplay";

interface PuzzleDisplayProps {
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
  onGuessChange: (puzzleId: number, year: number | null) => void;
}

const PuzzleDisplay = (props: PuzzleDisplayProps) => {
  return (
    <>
      <div className="touch:block desktop:hidden">
        <MobilePuzzleDisplay {...props} />
      </div>
      <div className="touch:hidden desktop:block">
        <DesktopPuzzleDisplay {...props} />
      </div>
    </>
  );
};

export default PuzzleDisplay;
