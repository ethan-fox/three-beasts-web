import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export const areAllPuzzlesComplete = (
  guesses: Map<number, number | null>,
  puzzles: GuessrPuzzleView[]
): boolean => {
  return puzzles.every((puzzle) => {
    const guess = guesses.get(puzzle.id);
    return guess !== null && guess !== undefined;
  });
};
