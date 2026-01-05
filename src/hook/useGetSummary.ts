import { useState, useEffect } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { GuessrItemView } from "@/model/view/GuessrItemView";

export const useGetSummary = () => {
  const [summary, setSummary] = useState<GuessrItemView[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await guessrClient.listGuessrs();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load puzzle summary");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, isLoading, error };
};
