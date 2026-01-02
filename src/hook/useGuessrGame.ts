import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPuzzles } from "./useGetPuzzles";
import { useSubmitGuesses } from "./useSubmitGuesses";
import { formatDateForApi, getCurrentEasternDate } from "@/util/dateUtil";
import type { GuessSubmission } from "@/model/api/GuessSubmission";

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

  useEffect(() => {
    const dateString = formatDateForApi(selectedDate);
    setSearchParams({ date: dateString }, { replace: true });
  }, [selectedDate, setSearchParams]);

  const dateString = formatDateForApi(selectedDate);
  const { puzzles, isLoading, error } = useGetPuzzles(dateString);
  const { submitGuesses, results, isLoading: isSubmitting, error: submitError } = useSubmitGuesses();

  useEffect(() => {
    if (puzzles) {
      const initialGuesses = new Map<number, number | null>();
      puzzles.puzzles.forEach((puzzle) => {
        initialGuesses.set(puzzle.id, null);
      });
      setGuesses(initialGuesses);
    }
  }, [puzzles]);

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
      .filter(([_, year]) => year !== null)
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
  };
};
