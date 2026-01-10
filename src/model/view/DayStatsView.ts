import type { PuzzleStatsView } from "@/model/view/PuzzleStatsView";

export interface DayStatsView {
  submission_count: number;
  avg_score: number;
  histogram: number[];
  puzzle_stats: PuzzleStatsView[];
}
