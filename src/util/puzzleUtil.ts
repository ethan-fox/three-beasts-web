import type { PuzzleView, PuzzleHints, PuzzleType } from "@/model/view/PuzzleView";

const STAT_NAME_MAP: Record<string, string> = {
  // Batting stats
  "HR": "Home Run",
  "RBI": "RBI",
  "H": "Hit",
  "R": "Run",
  "SB": "Stolen Base",
  "AVG": "Batting Average",
  "OBP": "On-Base Percentage",
  "SLG": "Slugging Percentage",
  "OPS": "OPS",
  "2B": "Double",
  "3B": "Triple",
  "BB": "Walk",
  "SO": "Strikeout",
  "TB": "Total Base",

  // Pitching stats
  "W": "Win",
  "L": "Loss",
  "ERA": "ERA",
  "SV": "Save",
  "IP": "Innings Pitched",
  "K": "Strikeout",
  "WHIP": "WHIP",
  "G": "Game",
  "GS": "Games Started",
  "CG": "Complete Game",
  "SHO": "Shutout",
};

const getVerboseStatName = (stat: string | null | undefined): string => {
  if (!stat) return "";
  return STAT_NAME_MAP[stat] || stat;
};

export const generateHintText = (
  hints: PuzzleHints,
  puzzleType: PuzzleType
): string => {
  const { league, stat, award, position } = hints;

  switch (puzzleType) {
    case "batting_stat":
    case "pitching_stat":
      return `${league} ${getVerboseStatName(stat)} Leaders`;

    case "award_votes":
      return `${league} ${award} Voting`;

    case "starters":
      return `${league} ${position} Starters`;

    default:
      return `${league} Leaders`;
  }
};

export const areAllPuzzlesComplete = (
  guesses: Map<number, number | null>,
  puzzles: PuzzleView[]
): boolean => {
  return puzzles.every((puzzle) => {
    const guess = guesses.get(puzzle.id);
    return guess !== null && guess !== undefined;
  });
};
