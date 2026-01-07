import { useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/custom/PageContainer";
import GameBanner from "@/components/domain/GameBanner/GameBanner";
import GameControls from "./GameControls";
import GameActions from "./GameActions";
import PuzzleDisplay from "@/components/domain/PuzzleDisplay/PuzzleDisplay";
import ResultsContent from "@/components/domain/ResultsContent/ResultsContent";
import { useDateSelection } from "@/hook/useDateSelection";
import { usePuzzleCompletion } from "@/hook/usePuzzleCompletion";
import { useGetPuzzles } from "@/hook/useGetPuzzles";
import { useGetSummary } from "@/hook/useGetSummary";
import { useGuessManagement } from "@/hook/useGuessManagement";
import { useGuessSubmission } from "@/hook/useGuessSubmission";
import { formatDateForApi } from "@/util/dateUtil";

const GamePage = () => {
  const { selectedDate, setSelectedDate } = useDateSelection();
  const { completedPuzzle, saveCompletion } = usePuzzleCompletion(selectedDate);

  const dateString = formatDateForApi(selectedDate);
  const { puzzles, error: puzzleError } = useGetPuzzles(
    completedPuzzle ? null : dateString
  );
  const { summary, error: summaryError } = useGetSummary();

  const { guesses, setGuess, canSubmit } = useGuessManagement(puzzles?.puzzles);
  const { submitGuesses, results, isSubmitting, clearResults } = useGuessSubmission();

  useEffect(() => {
    clearResults();
  }, [selectedDate, clearResults]);

  const handleSubmit = useCallback(async () => {
    if (!puzzles) return;

    const guessArray = Array.from(guesses.entries())
      .filter(([, year]) => year !== null)
      .map(([id, year]) => ({ id, year: year! }));

    const validationResults = await submitGuesses(puzzles.id, { guesses: guessArray });
    if (validationResults) {
      saveCompletion(puzzles.id, guesses, validationResults);
    }
  }, [puzzles, guesses, submitGuesses, saveCompletion]);

  const error = puzzleError || summaryError;
  const showResults = (completedPuzzle || results) && puzzles;
  const showPuzzles = !completedPuzzle && !results && puzzles;

  return (
    <>
      <GameBanner />
      <PageContainer className="pt-[clamp(1.5rem,4vh,3rem)]">
        <GameControls
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          summary={summary}
        />

        {error && (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        )}

        {showResults && (
          <Card className="mt-8">
            <ResultsContent
              puzzleId={puzzles!.id}
              results={completedPuzzle?.results || results!}
              guesses={
                completedPuzzle
                  ? new Map(
                      Object.entries(completedPuzzle.guesses).map(([k, v]) => [
                        Number(k),
                        v,
                      ])
                    )
                  : guesses
              }
            />
          </Card>
        )}

        {showPuzzles && (
          <>
            <PuzzleDisplay
              puzzles={puzzles!.puzzles}
              guesses={guesses}
              onGuessChange={setGuess}
            />
            <GameActions
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </PageContainer>
    </>
  );
};

export default GamePage;
