import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPuzzles } from "./useGetPuzzles";
import { useSubmitGuesses } from "./useSubmitGuesses";
import { formatDateForApi, getCurrentEasternDate } from "@/util/dateUtil";
import { loadPuzzleCompletion, savePuzzleCompletion, type PuzzleCompletion } from "@/util/storageUtil";
import type { GuessSubmission } from "@/model/api/GuessSubmission";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

const getInitialDateFromUrl = (searchParams: URLSearchParams): Date => {
  const dateParam = searchParams.get("date");

  if (dateParam) {
    const [year, month, day] = dateParam.split("-").map(Number);
    if (year && month && day) {
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
  }

  return getCurrentEasternDate();
};

export const useGuessrGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(() => getInitialDateFromUrl(searchParams));
  const [guesses, setGuesses] = useState<Map<number, number | null>>(new Map());
  const [completedPuzzle, setCompletedPuzzle] = useState<PuzzleCompletion | null>(null);

  useEffect(() => {
    const dateString = formatDateForApi(selectedDate);
    setSearchParams({ date: dateString }, { replace: true });
  }, [selectedDate, setSearchParams]);

  useEffect(() => {
    const dateStr = formatDateForApi(selectedDate);
    const completion = loadPuzzleCompletion(dateStr);

    if (completion) {
      setCompletedPuzzle(completion);
    } else {
      setCompletedPuzzle(null);
    }
  }, [selectedDate]);

  const dateString = formatDateForApi(selectedDate);
  const { puzzles, isLoading, error } = useGetPuzzles(completedPuzzle ? null : dateString);

  const handleCompletionSaved = useCallback((results: BatchGuessValidationView) => {
    const dateStr = formatDateForApi(selectedDate);
    const validGuesses = new Map(
      Array.from(guesses.entries())
        .filter(([, guess]) => guess !== null)
        .map(([id, guess]) => [id, guess as number])
    );

    savePuzzleCompletion(dateStr, validGuesses, results);

    setCompletedPuzzle({
      guesses: Object.fromEntries(validGuesses),
      results,
      completedAt: new Date().toISOString(),
      version: 1,
    });
  }, [selectedDate, guesses]);

  const { submitGuesses, results, isLoading: isSubmitting, error: submitError, clearResults } = useSubmitGuesses({
    onCompletionSaved: handleCompletionSaved,
  });

  const initialGuesses = useMemo(() => {
    if (!puzzles) return new Map<number, number | null>();
    const guessMap = new Map<number, number | null>();
    puzzles.puzzles.forEach((puzzle) => {
      guessMap.set(puzzle.id, null);
    });
    return guessMap;
  }, [puzzles]);

  useEffect(() => {
    setGuesses(initialGuesses);
  }, [initialGuesses]);

  const setGuess = (puzzleId: number, year: number | null) => {
    setGuesses((prev) => {
      const updated = new Map(prev);
      updated.set(puzzleId, year);
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!puzzles) return;

    const guessArray = Array.from(guesses.entries())
      .filter(([, year]) => year !== null)
      .map(([id, year]) => ({ id, year: year! }));

    const submission: GuessSubmission = {
      guesses: guessArray,
    };

    await submitGuesses(puzzles.id, submission);
  };

  return {
    selectedDate,
    setSelectedDate,
    puzzles,
    guesses,
    setGuess,
    isLoading,
    error,
    handleSubmit,
    results,
    isSubmitting,
    submitError,
    completedPuzzle,
    setCompletedPuzzle,
    clearResults,
  };
};
