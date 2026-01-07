import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export interface GuessrDetailView {
  id: number;
  date: string;
  variant: string;
  day_number: number | null;
  puzzles: GuessrPuzzleView[];
}
