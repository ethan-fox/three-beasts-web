import { useState } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessSubmission } from "@/model/api/GuessSubmission";

interface UseSubmitGuessesOptions {
  onCompletionSaved?: (results: BatchGuessValidationView) => void;
}

export const useSubmitGuesses = (options?: UseSubmitGuessesOptions) => {
  const [results, setResults] = useState<BatchGuessValidationView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitGuesses = async (guessrId: number, submission: GuessSubmission) => {
    setIsLoading(true);
    setError(null);

    try {
      const validationResults = await guessrClient.submitGuesses(guessrId, submission);
      setResults(validationResults);

      if (options?.onCompletionSaved) {
        options.onCompletionSaved(validationResults);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit guesses");
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
  };

  return { submitGuesses, results, isLoading, error, clearResults };
};
