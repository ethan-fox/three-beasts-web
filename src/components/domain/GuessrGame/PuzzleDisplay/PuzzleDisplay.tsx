import type { PuzzleView } from "@/model/view/PuzzleView";
import MobilePuzzleDisplay from "./MobilePuzzleDisplay/MobilePuzzleDisplay";
import DesktopPuzzleDisplay from "./DesktopPuzzleDisplay";

interface PuzzleDisplayProps {
  puzzles: PuzzleView[];
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
