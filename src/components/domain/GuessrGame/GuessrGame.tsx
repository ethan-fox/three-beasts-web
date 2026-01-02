import { useEffect } from "react";
import { useGuessrGame } from "@/hook/useGuessrGame";
import DateSelector from "./DateSelector/DateSelector";
import PuzzleDisplay from "./PuzzleDisplay/PuzzleDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { areAllPuzzlesComplete } from "@/util/puzzleUtil";
import ResultsModal from "../ResultsModal/ResultsModal";
import ResultsContent from "../ResultsContent/ResultsContent";
import HowToPlay from "../HowToPlay/HowToPlay";

const GuessrGame = () => {
  const {
    selectedDate,
    setSelectedDate,
    puzzles,
    guesses,
    setGuess,
    error,
    handleSubmit,
    results,
    isSubmitting,
    completedPuzzle,
    clearResults,
  } = useGuessrGame();

  const canSubmit = puzzles
    ? areAllPuzzlesComplete(guesses, puzzles.puzzles)
    : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (canSubmit && !isSubmitting) {
          handleSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canSubmit, isSubmitting, handleSubmit]);

  return (
    <div className="container mx-auto p-[clamp(1rem,4vw,4rem)]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-[clamp(1rem,2vh,2rem)]">
        The Three Beasts{puzzles ? ` #${puzzles.id}` : ""}
      </h1>

      <p className="text-center text-muted-foreground mb-[clamp(2rem,4vh,4rem)]">
        Every day, three new puzzles. Can you achieve perfection?
      </p>

      <div className="relative mb-[clamp(1rem,2vh,2rem)] flex justify-center">
        <DateSelector
          value={selectedDate}
          onChange={setSelectedDate}
          guessrId={puzzles?.id}
        />
        <div className="absolute top-0 right-0">
          <HowToPlay />
        </div>
      </div>

      {error && (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      )}

      {completedPuzzle && (
        <Card className="mt-8">
          <ResultsContent
            results={completedPuzzle.results}
            guesses={new Map(Object.entries(completedPuzzle.guesses).map(([k, v]) => [Number(k), v]))}
          />
        </Card>
      )}

      {!completedPuzzle && puzzles && (
        <>
          <PuzzleDisplay
            puzzles={puzzles.puzzles}
            guesses={guesses}
            onGuessChange={setGuess}
          />

          <div className="mt-[clamp(2rem,4vh,4rem)] flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className={`w-auto ${!canSubmit || isSubmitting ? '' : 'desktop:cursor-pointer'}`}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <span className="flex items-center gap-2">
                  Submit Guesses
                  <Kbd>
                    {navigator.platform.indexOf("Mac") > -1 ? "⌘" : "Ctrl"} +
                    Enter
                  </Kbd>
                </span>
              )}
            </Button>
          </div>
        </>
      )}

      {results && (
        <ResultsModal
          results={results}
          guesses={guesses}
          onClose={clearResults}
        />
      )}
    </div>
  );
};

export default GuessrGame;
