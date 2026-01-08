import { useState, useCallback } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessSubmission } from "@/model/api/GuessSubmission";

export const useGuessSubmission = () => {
  const [results, setResults] = useState<BatchGuessValidationView | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitGuesses = useCallback(
    async (
      guessrId: number,
      submission: GuessSubmission
    ): Promise<BatchGuessValidationView | null> => {
      setIsSubmitting(true);
      setError(null);

      try {
        const validationResults = await guessrClient.validateGuesses(
          guessrId,
          submission
        );
        setResults(validationResults);
        return validationResults;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to submit guesses");
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setResults(null);
  }, []);

  return { submitGuesses, results, isSubmitting, error, clearResults };
};
