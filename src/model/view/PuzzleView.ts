import type { PlayerView } from "./PlayerView";

export type PuzzleType = "batting_stat" | "pitching_stat" | "award_votes" | "starters";
export type League = "AL" | "NL";
export type BattingStat = "HR" | "RBI" | "H" | "SB";
export type PitchingStat = "W" | "SO" | "ERA" | "SV";
export type Award = "Most Valuable Player" | "Cy Young Award" | "Rookie of the Year";
export type Position = "C" | "1B" | "2B" | "3B" | "SS" | "LF" | "CF" | "RF";

export interface PuzzleHints {
  league: League;
  stat?: BattingStat | PitchingStat;
  award?: Award;
  position?: Position;
}

export interface PuzzleView {
  id: number;
  puzzle_type: PuzzleType;
  hints: PuzzleHints;
  players: PlayerView[];
}
