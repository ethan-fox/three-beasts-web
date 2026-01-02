import type { PuzzleView, PuzzleHints, PuzzleType } from "@/model/view/PuzzleView";

export const generateHintText = (
  hints: PuzzleHints,
  puzzleType: PuzzleType
): string => {
  const { league, stat, award, position } = hints;

  switch (puzzleType) {
    case "batting_stat":
    case "pitching_stat":
      return `${league} ${stat} Leaders`;

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
