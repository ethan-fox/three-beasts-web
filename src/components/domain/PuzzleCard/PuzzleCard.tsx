import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { PuzzleCardProps } from "@/model/component/PuzzleCardProps";
import PuzzleHeader from "./PuzzleHeader/PuzzleHeader";
import YearPicker from "./YearPicker/YearPicker";
import PlayerTable from "./PlayerTable/PlayerTable";
import { MIN_YEAR, MAX_YEAR } from "@/util/constant";

const PuzzleCard = ({ puzzle, puzzleNumber, yearGuess, onYearChange, disabled }: PuzzleCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <PuzzleHeader hints={puzzle.hints} puzzleType={puzzle.puzzle_type} puzzleNumber={puzzleNumber} />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-[clamp(1rem,2vw,2rem)]">
        <YearPicker
          value={yearGuess}
          onChange={onYearChange}
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          disabled={disabled}
        />

        <PlayerTable players={puzzle.players} />
      </CardContent>
    </Card>
  );
};

export default PuzzleCard;
