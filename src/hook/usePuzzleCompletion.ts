import { useState, useEffect, useCallback } from "react";
import {
  loadPuzzleCompletion,
  savePuzzleCompletion,
  STORAGE_VERSION,
  type PuzzleCompletion,
} from "@/util/storageUtil";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export const usePuzzleCompletion = (puzzleId: number | null) => {
  const [completedPuzzle, setCompletedPuzzle] = useState<PuzzleCompletion | null>(() => {
    if (puzzleId === null) return null;
    return loadPuzzleCompletion(puzzleId) || null;
  });

  useEffect(() => {
    if (puzzleId === null) return;
    const completion = loadPuzzleCompletion(puzzleId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading from external storage (localStorage)
    setCompletedPuzzle(completion || null);
  }, [puzzleId]);

  const saveCompletion = useCallback(
    (guesses: Map<number, number | null>, results: BatchGuessValidationView, puzzles: GuessrPuzzleView[]) => {
      if (puzzleId === null) return;

      const validGuesses = new Map(
        Array.from(guesses.entries())
          .filter(([, guess]) => guess !== null)
          .map(([id, guess]) => [id, guess as number])
      );

      savePuzzleCompletion(puzzleId, validGuesses, results, puzzles);

      setCompletedPuzzle({
        puzzleId,
        guesses: Object.fromEntries(validGuesses),
        results,
        puzzles,
        completedAt: new Date().toISOString(),
        version: STORAGE_VERSION,
      });
    },
    [puzzleId]
  );

  const clearCompletion = useCallback(() => {
    setCompletedPuzzle(null);
  }, []);

  return { completedPuzzle, saveCompletion, clearCompletion, setCompletedPuzzle };
};
