import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

export interface PuzzleCompletion {
  guesses: Record<number, number>;
  results: BatchGuessValidationView;
  completedAt: string;
  version: number;
}

const STORAGE_VERSION = 1;

export const getPuzzleStorageKey = (date: string): string => {
  return `puzzle-${date}`;
};

export const savePuzzleCompletion = (
  date: string,
  guesses: Map<number, number>,
  results: BatchGuessValidationView
): void => {
  try {
    const completion: PuzzleCompletion = {
      guesses: Object.fromEntries(guesses),
      results,
      completedAt: new Date().toISOString(),
      version: STORAGE_VERSION,
    };

    const key = getPuzzleStorageKey(date);
    localStorage.setItem(key, JSON.stringify(completion));
  } catch (error) {
    console.warn(`Failed to save puzzle completion for ${date}:`, error);
  }
};

export const loadPuzzleCompletion = (date: string): PuzzleCompletion | null => {
  try {
    const key = getPuzzleStorageKey(date);
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    const parsed = JSON.parse(item);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.guesses ||
      !parsed.results ||
      !parsed.completedAt ||
      !parsed.version
    ) {
      console.warn(`Invalid puzzle completion structure for ${date}, clearing`);
      clearPuzzleCompletion(date);
      return null;
    }

    if (parsed.version !== STORAGE_VERSION) {
      console.warn(
        `Version mismatch for ${date}: expected ${STORAGE_VERSION}, got ${parsed.version}`
      );
      return null;
    }

    return parsed as PuzzleCompletion;
  } catch (error) {
    console.warn(`Failed to load puzzle completion for ${date}:`, error);
    return null;
  }
};

export const isPuzzleCompleted = (date: string): boolean => {
  return loadPuzzleCompletion(date) !== null;
};

export const clearPuzzleCompletion = (date: string): void => {
  try {
    const key = getPuzzleStorageKey(date);
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear puzzle completion for ${date}:`, error);
  }
};
