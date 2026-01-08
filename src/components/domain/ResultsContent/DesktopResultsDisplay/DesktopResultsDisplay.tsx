import ResultCard from "@/components/domain/ResultsContent/ResultCard/ResultCard";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";

interface DesktopResultsDisplayProps {
  results: PuzzleResultView[];
  guesses: Map<number, number | null>;
  puzzles: GuessrPuzzleView[];
  variant: string;
}

const DesktopResultsDisplay = ({ results, guesses, puzzles, variant }: DesktopResultsDisplayProps) => {
  return (
    <div className="px-6 py-6">
      <p className="text-sm text-muted-foreground text-center mb-4">Answers:</p>
      <div className="flex justify-center gap-4">
        {results.map((result, index) => {
          const userGuess = guesses.get(result.id);
          const puzzle = puzzles.find(p => p.id === result.id);

          return (
            <div key={result.id} className="flex-1 max-w-xs">
              <ResultCard
                result={result}
                puzzleNumber={index + 1}
                userGuess={userGuess}
                puzzle={puzzle}
                variant={variant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopResultsDisplay;
