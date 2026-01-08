import { useState, useEffect, useCallback } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { GuessrDetailView } from "@/model/view/GuessrDetailView";

export const useGetPuzzles = (date: string | null, variant: string) => {
  const [puzzles, setPuzzles] = useState<GuessrDetailView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPuzzles = useCallback(async () => {
    if (!date) return;

    setIsLoading(true);
    setError(null);

    try {
      const guessrList = await guessrClient.listGuessrs(date, variant);

      if (guessrList.length === 0) {
        setError("No puzzle found for this date and variant");
        return;
      }

      const guessrId = guessrList[0].id;
      const data = await guessrClient.getGuessr(guessrId);
      setPuzzles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load puzzles");
    } finally {
      setIsLoading(false);
    }
  }, [date, variant]);

  useEffect(() => {
    fetchPuzzles();
  }, [fetchPuzzles]);

  return { puzzles, isLoading, error, refetch: fetchPuzzles };
};
