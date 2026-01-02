import { useState, useEffect, useCallback } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { GuessrListView } from "@/model/view/GuessrListView";

export const useGetPuzzles = (date: string) => {
  const [puzzles, setPuzzles] = useState<GuessrListView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPuzzles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await guessrClient.fetchPuzzles(date);
      setPuzzles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load puzzles");
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      fetchPuzzles();
    }
  }, [date, fetchPuzzles]);

  return { puzzles, isLoading, error, refetch: fetchPuzzles };
};
