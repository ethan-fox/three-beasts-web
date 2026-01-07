import { useState, useEffect, useCallback } from "react";
import {
  loadPuzzleCompletion,
  savePuzzleCompletion,
  STORAGE_VERSION,
  type PuzzleCompletion,
} from "@/util/storageUtil";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

export const usePuzzleCompletion = (puzzleId: number | null) => {
  const [completedPuzzle, setCompletedPuzzle] = useState<PuzzleCompletion | null>(null);

  useEffect(() => {
    if (puzzleId === null) {
      setCompletedPuzzle(null);
      return;
    }
    const completion = loadPuzzleCompletion(puzzleId);
    setCompletedPuzzle(completion || null);
  }, [puzzleId]);

  const saveCompletion = useCallback(
    (guesses: Map<number, number | null>, results: BatchGuessValidationView) => {
      if (puzzleId === null) return;

      const validGuesses = new Map(
        Array.from(guesses.entries())
          .filter(([, guess]) => guess !== null)
          .map(([id, guess]) => [id, guess as number])
      );

      savePuzzleCompletion(puzzleId, validGuesses, results);

      setCompletedPuzzle({
        puzzleId,
        guesses: Object.fromEntries(validGuesses),
        results,
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
