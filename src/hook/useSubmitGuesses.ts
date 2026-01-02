import { useState } from "react";
import { guessrClient } from "@/client/GuessrClient";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";
import type { GuessSubmission } from "@/model/api/GuessSubmission";

export const useSubmitGuesses = () => {
  const [results, setResults] = useState<BatchGuessValidationView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitGuesses = async (guessrId: number, submission: GuessSubmission) => {
    setIsLoading(true);
    setError(null);

    try {
      const validationResults = await guessrClient.submitGuesses(guessrId, submission);
      setResults(validationResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit guesses");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitGuesses, results, isLoading, error };
};
