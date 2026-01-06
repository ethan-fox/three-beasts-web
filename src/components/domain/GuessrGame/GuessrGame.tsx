import { useEffect } from "react";
import { useGuessrGame } from "@/hook/useGuessrGame";
import DateSelector from "./DateSelector/DateSelector";
import PuzzleDisplay from "./PuzzleDisplay/PuzzleDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { areAllPuzzlesComplete } from "@/util/puzzleUtil";
import ResultsContent from "../ResultsContent/ResultsContent";
import HowToPlay from "../HowToPlay/HowToPlay";

const GuessrGame = () => {
  const {
    selectedDate,
    setSelectedDate,
    puzzles,
    summary,
    guesses,
    setGuess,
    error,
    handleSubmit,
    results,
    isSubmitting,
    completedPuzzle,
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
    <div className="container mx-auto px-[clamp(1rem,4vw,4rem)] pt-[clamp(1rem,4vw,4rem)] pb-[clamp(2rem,6vh,6rem)]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-[clamp(1rem,2vh,2rem)] text-primary">
        The Three Beasts
      </h1>

      <p className="text-center text-muted-foreground mb-[clamp(2rem,4vh,4rem)]">
        Every day, three new puzzles. Can you achieve perfection?
      </p>

      <div className="relative mb-[clamp(1rem,2vh,2rem)] flex justify-center">
        <DateSelector
          value={selectedDate}
          onChange={setSelectedDate}
          summary={summary}
        />
        <div className="absolute top-0 right-0 flex items-center gap-1">
          <ThemeToggle />
          <HowToPlay />
        </div>
      </div>

      {error && (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      )}

      {(completedPuzzle || results) && puzzles && (
        <Card className="mt-8">
          <ResultsContent
            puzzleId={puzzles.id}
            results={completedPuzzle?.results || results!}
            guesses={
              completedPuzzle
                ? new Map(Object.entries(completedPuzzle.guesses).map(([k, v]) => [Number(k), v]))
                : guesses
            }
          />
        </Card>
      )}

      {!completedPuzzle && !results && puzzles && (
        <>
          <PuzzleDisplay
            puzzles={puzzles.puzzles}
            guesses={guesses}
            onGuessChange={setGuess}
          />

          <div className="mt-[clamp(2rem,4vh,4rem)] mb-[clamp(2rem,4vh,4rem)] flex justify-center">
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
                  <Kbd className="touch:hidden desktop:inline-flex">
                    {navigator.platform.indexOf("Mac") > -1 ? "⌘" : "Ctrl"} +
                    Enter
                  </Kbd>
                </span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GuessrGame;
