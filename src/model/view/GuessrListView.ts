import type { PuzzleView } from "./PuzzleView";

export interface GuessrListView {
  id: number;
  date: string;
  puzzles: PuzzleView[];
}
