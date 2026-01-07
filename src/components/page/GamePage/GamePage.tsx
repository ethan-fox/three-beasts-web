import { useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/custom/PageContainer";
import GameBanner from "@/components/domain/GameBanner/GameBanner";
import NavigationTray from "@/components/domain/NavigationTray/NavigationTray";
import CategoryHeader from "@/components/domain/CategoryHeader/CategoryHeader";
import GameActions from "./GameActions";
import PuzzleDisplay from "@/components/domain/PuzzleDisplay/PuzzleDisplay";
import ResultsContent from "@/components/domain/ResultsContent/ResultsContent";
import { useGameSelection } from "@/hook/useGameSelection";
import { usePuzzleCompletion } from "@/hook/usePuzzleCompletion";
import { useGetPuzzles } from "@/hook/useGetPuzzles";
import { useGetSummary } from "@/hook/useGetSummary";
import { useGuessManagement } from "@/hook/useGuessManagement";
import { useGuessSubmission } from "@/hook/useGuessSubmission";
import { formatDateForApi } from "@/util/dateUtil";

const GamePage = () => {
  const { selectedDate, setSelectedDate, selectedVariant, selectVariant } = useGameSelection();
  const { summary, error: summaryError } = useGetSummary();

  const dateString = formatDateForApi(selectedDate);
  const { puzzles, error: puzzleError } = useGetPuzzles(dateString, selectedVariant);

  const { completedPuzzle, saveCompletion } = usePuzzleCompletion(puzzles?.id ?? null);

  const { guesses, setGuess, canSubmit } = useGuessManagement(puzzles?.puzzles);
  const { submitGuesses, results, isSubmitting, clearResults } = useGuessSubmission();

  useEffect(() => {
    clearResults();
  }, [selectedDate, selectedVariant, clearResults]);

  const handleSubmit = useCallback(async () => {
    if (!puzzles) return;

    const guessArray = Array.from(guesses.entries())
      .filter(([, year]) => year !== null)
      .map(([id, year]) => ({ id, year: year! }));

    const validationResults = await submitGuesses(puzzles.id, { guesses: guessArray });
    if (validationResults) {
      saveCompletion(guesses, validationResults);
    }
  }, [puzzles, guesses, submitGuesses, saveCompletion]);

  const error = puzzleError || summaryError;
  const showResults = (completedPuzzle || results) && puzzles;
  const showPuzzles = !completedPuzzle && !results && puzzles;

  return (
    <>
      <GameBanner />
      <NavigationTray
        className="desktop:rounded-b-sm"
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedVariant={selectedVariant}
        onVariantChange={selectVariant}
        summary={summary}
      />
      <PageContainer className="pt-[clamp(1.5rem,4vh,3rem)]">
        {error && (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        )}

        {puzzles && (
          <CategoryHeader
            variant={puzzles.variant}
            day_number={puzzles.day_number}
          />
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
              variant={selectedVariant}
            />
          </Card>
        )}

        {showPuzzles && (
          <>
            <PuzzleDisplay
              puzzles={puzzles!.puzzles}
              guesses={guesses}
              onGuessChange={setGuess}
              variant={selectedVariant}
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
