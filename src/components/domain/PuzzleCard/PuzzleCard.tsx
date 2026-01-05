import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { PuzzleCardProps } from "@/model/component/PuzzleCardProps";
import PuzzleHeader from "@/components/domain/PuzzleCard/PuzzleHeader/PuzzleHeader";
import YearPicker from "@/components/domain/PuzzleCard/YearPicker/YearPicker";
import ContentTable from "@/components/domain/PuzzleCard/ContentTable/ContentTable";
import { MIN_YEAR, MAX_YEAR } from "@/util/constant";

const PuzzleCard = ({ puzzle, puzzleNumber, yearGuess, onYearChange, disabled }: PuzzleCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <PuzzleHeader hint={puzzle.hint} puzzleNumber={puzzleNumber} />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-[clamp(1rem,2vw,2rem)]">
        <YearPicker
          value={yearGuess}
          onChange={onYearChange}
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          disabled={disabled}
        />

        <ContentTable content={puzzle.content} />
      </CardContent>
    </Card>
  );
};

export default PuzzleCard;
