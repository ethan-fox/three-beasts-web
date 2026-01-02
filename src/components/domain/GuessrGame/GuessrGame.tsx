import { useGuessrGame } from "@/hook/useGuessrGame";
import DateSelector from "./DateSelector/DateSelector";
import PuzzleDisplay from "./PuzzleDisplay/PuzzleDisplay";
import { Button } from "@/components/ui/button";
import { areAllPuzzlesComplete } from "@/util/puzzleUtil";
import ResultsModal from "../ResultsModal/ResultsModal";
import HowToPlay from "../HowToPlay/HowToPlay";

const GuessrGame = () => {
  const {
    selectedDate,
    setSelectedDate,
    puzzles,
    guesses,
    setGuess,
    isLoading,
    error,
    handleSubmit,
    results,
    isSubmitting,
  } = useGuessrGame();

  const canSubmit = puzzles ? areAllPuzzlesComplete(guesses, puzzles.puzzles) : false;

  return (
    <div className="container mx-auto p-[clamp(1rem,4vw,4rem)]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-[clamp(1rem,2vh,2rem)]">
       The Three Beasts{puzzles ? ` #${puzzles.id}` : ''}
      </h1>

      <p className="text-center text-muted-foreground mb-[clamp(2rem,4vh,4rem)]">
        Every day, three new puzzles. Can you achieve perfection?
      </p>

      <div className="relative mb-[clamp(1rem,2vh,2rem)] flex justify-center">
        <DateSelector value={selectedDate} onChange={setSelectedDate} guessrId={puzzles?.id} />
        <div className="absolute top-0 right-0">
          <HowToPlay />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">Loading puzzles...</div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      )}

      {puzzles && (
        <>
          <PuzzleDisplay
            puzzles={puzzles.puzzles}
            guesses={guesses}
            onGuessChange={setGuess}
          />

          <div className="mt-[clamp(2rem,4vh,4rem)] text-center">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full max-w-md"
            >
              {isSubmitting ? "Submitting..." : "Submit Guesses"}
            </Button>
          </div>
        </>
      )}

      {results && <ResultsModal results={results} guesses={guesses} onClose={() => window.location.reload()} />}
    </div>
  );
};

export default GuessrGame;
