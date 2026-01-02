import type { PuzzleView } from "@/model/view/PuzzleView";

export interface PuzzleCardProps {
  puzzle: PuzzleView;
  puzzleNumber: number;
  yearGuess: number | null;
  onYearChange: (year: number | null) => void;
  disabled?: boolean;
}
