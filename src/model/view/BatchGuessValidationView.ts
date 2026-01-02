import type { PuzzleResultView } from "./PuzzleResultView";

export interface BatchGuessValidationView {
  results: PuzzleResultView[];
  overall_score: number;
}
