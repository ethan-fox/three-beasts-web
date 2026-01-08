import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

export interface PuzzleCompletion {
  puzzleId: number;
  guesses: Record<number, number>;
  results: BatchGuessValidationView;
  puzzles: GuessrPuzzleView[];
  completedAt: string;
  version: number;
}

export const STORAGE_VERSION = 4;

export const getPuzzleStorageKey = (puzzleId: number): string => {
  return `puzzle-${puzzleId}`;
};

export const savePuzzleCompletion = (
  puzzleId: number,
  guesses: Map<number, number>,
  results: BatchGuessValidationView,
  puzzles: GuessrPuzzleView[]
): void => {
  try {
    const completion: PuzzleCompletion = {
      puzzleId,
      guesses: Object.fromEntries(guesses),
      results,
      puzzles,
      completedAt: new Date().toISOString(),
      version: STORAGE_VERSION,
    };

    const key = getPuzzleStorageKey(puzzleId);
    localStorage.setItem(key, JSON.stringify(completion));
  } catch (error) {
    console.warn(`Failed to save puzzle completion for ${puzzleId}:`, error);
  }
};

export const loadPuzzleCompletion = (puzzleId: number): PuzzleCompletion | null => {
  try {
    const key = getPuzzleStorageKey(puzzleId);
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    const parsed = JSON.parse(item);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.puzzleId ||
      !parsed.guesses ||
      !parsed.results ||
      !parsed.puzzles ||
      !parsed.completedAt ||
      !parsed.version
    ) {
      console.warn(`Invalid puzzle completion structure for ${puzzleId}, clearing`);
      clearPuzzleCompletion(puzzleId);
      return null;
    }

    if (parsed.version !== STORAGE_VERSION) {
      console.warn(
        `Version mismatch for ${puzzleId}: expected ${STORAGE_VERSION}, got ${parsed.version}`
      );
      return null;
    }

    return parsed as PuzzleCompletion;
  } catch (error) {
    console.warn(`Failed to load puzzle completion for ${puzzleId}:`, error);
    return null;
  }
};

export const isPuzzleCompleted = (puzzleId: number): boolean => {
  return loadPuzzleCompletion(puzzleId) !== null;
};

export const clearPuzzleCompletion = (puzzleId: number): void => {
  try {
    const key = getPuzzleStorageKey(puzzleId);
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear puzzle completion for ${puzzleId}:`, error);
  }
};
