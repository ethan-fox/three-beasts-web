import { useState, useEffect, useCallback } from "react";
import { formatDateForApi } from "@/util/dateUtil";
import {
  loadPuzzleCompletion,
  savePuzzleCompletion,
  STORAGE_VERSION,
  type PuzzleCompletion,
} from "@/util/storageUtil";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

export const usePuzzleCompletion = (selectedDate: Date) => {
  const [completedPuzzle, setCompletedPuzzle] = useState<PuzzleCompletion | null>(null);

  useEffect(() => {
    const dateStr = formatDateForApi(selectedDate);
    const completion = loadPuzzleCompletion(dateStr);
    setCompletedPuzzle(completion || null);
  }, [selectedDate]);

  const saveCompletion = useCallback(
    (puzzleId: number, guesses: Map<number, number | null>, results: BatchGuessValidationView) => {
      const dateStr = formatDateForApi(selectedDate);
      const validGuesses = new Map(
        Array.from(guesses.entries())
          .filter(([, guess]) => guess !== null)
          .map(([id, guess]) => [id, guess as number])
      );

      savePuzzleCompletion(dateStr, puzzleId, validGuesses, results);

      setCompletedPuzzle({
        puzzleId,
        guesses: Object.fromEntries(validGuesses),
        results,
        completedAt: new Date().toISOString(),
        version: STORAGE_VERSION,
      });
    },
    [selectedDate]
  );

  const clearCompletion = useCallback(() => {
    setCompletedPuzzle(null);
  }, []);

  return { completedPuzzle, saveCompletion, clearCompletion, setCompletedPuzzle };
};
