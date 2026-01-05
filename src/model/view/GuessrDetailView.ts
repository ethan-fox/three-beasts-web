import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export interface GuessrDetailView {
  id: number;
  date: string;
  puzzles: GuessrPuzzleView[];
}
