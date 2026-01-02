import type { PuzzleHints, PuzzleType } from "@/model/view/PuzzleView";
import { generateHintText } from "@/util/puzzleUtil";

interface PuzzleHeaderProps {
  hints: PuzzleHints;
  puzzleType: PuzzleType;
  puzzleNumber: number;
}

const PuzzleHeader = ({ hints, puzzleType, puzzleNumber }: PuzzleHeaderProps) => {
  const hintText = generateHintText(hints, puzzleType);

  return <h3 className="text-lg font-semibold">{puzzleNumber}. {hintText}</h3>;
};

export default PuzzleHeader;
