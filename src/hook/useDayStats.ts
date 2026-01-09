import { useState, useEffect } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { DayStatsView } from "@/model/view/DayStatsView";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

interface UseDayStatsProps {
  guessrId: number | null;
  results: BatchGuessValidationView | null;
  isCachedCompletion: boolean;
}

export const useDayStats = ({ guessrId, results, isCachedCompletion }: UseDayStatsProps) => {
  const [dayStats, setDayStats] = useState<DayStatsView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guessrId) {
      setDayStats(null);
      return;
    }

    if (!isCachedCompletion && results?.day_stats) {
      setDayStats(results.day_stats);
      return;
    }

    if (isCachedCompletion) {
      const fetchStats = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const stats = await guessrClient.getStats(guessrId);
          setDayStats(stats);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load stats");
        } finally {
          setIsLoading(false);
        }
      };
      fetchStats();
    }
  }, [guessrId, results, isCachedCompletion]);

  return { dayStats, isLoading, error };
};
