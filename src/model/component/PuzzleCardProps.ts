import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export interface PuzzleCardProps {
  puzzle: GuessrPuzzleView;
  puzzleNumber: number;
  yearGuess: number | null;
  onYearChange: (year: number | null) => void;
  disabled?: boolean;
}
