import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { DayStatsView } from "@/model/view/DayStatsView";

export interface BatchGuessValidationView {
  results: PuzzleResultView[];
  overall_score: number;
  day_stats?: DayStatsView;
}
