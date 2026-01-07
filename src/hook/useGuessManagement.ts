import { useState, useEffect, useMemo, useCallback } from "react";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import { areAllPuzzlesComplete } from "@/util/puzzleUtil";

export const useGuessManagement = (puzzles: GuessrPuzzleView[] | undefined) => {
  const [guesses, setGuesses] = useState<Map<number, number | null>>(new Map());

  const initialGuesses = useMemo(() => {
    if (!puzzles) return new Map<number, number | null>();
    const guessMap = new Map<number, number | null>();
    puzzles.forEach((puzzle) => {
      guessMap.set(puzzle.id, null);
    });
    return guessMap;
  }, [puzzles]);

  useEffect(() => {
    setGuesses(initialGuesses);
  }, [initialGuesses]);

  const setGuess = useCallback((puzzleId: number, year: number | null) => {
    setGuesses((prev) => {
      const updated = new Map(prev);
      updated.set(puzzleId, year);
      return updated;
    });
  }, []);

  const canSubmit = puzzles ? areAllPuzzlesComplete(guesses, puzzles) : false;

  const resetGuesses = useCallback(() => {
    setGuesses(initialGuesses);
  }, [initialGuesses]);

  return { guesses, setGuess, canSubmit, resetGuesses };
};
