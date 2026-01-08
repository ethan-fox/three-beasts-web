import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import PuzzleCard from "@/components/domain/PuzzleCard/PuzzleCard";

interface DesktopPuzzleDisplayProps {
  puzzles: GuessrPuzzleView[];
  guesses: Map<number, number | null>;
  onGuessChange: (puzzleId: number, year: number | null) => void;
  variant: string;
}

const DesktopPuzzleDisplay = ({ puzzles, guesses, onGuessChange, variant }: DesktopPuzzleDisplayProps) => {
  return (
    <div className="grid grid-cols-3 gap-[clamp(1rem,2vw,2rem)] w-full">
      {puzzles.map((puzzle, index) => (
        <PuzzleCard
          key={puzzle.id}
          puzzle={puzzle}
          puzzleNumber={index + 1}
          yearGuess={guesses.get(puzzle.id) ?? null}
          onYearChange={(year) => onGuessChange(puzzle.id, year)}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default DesktopPuzzleDisplay;
