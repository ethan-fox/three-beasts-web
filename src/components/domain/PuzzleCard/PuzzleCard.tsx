import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PuzzleHeader from "@/components/domain/PuzzleCard/PuzzleHeader/PuzzleHeader";
import YearPicker from "@/components/domain/PuzzleCard/YearPicker/YearPicker";
import ContentTable from "@/components/domain/PuzzleCard/ContentTable/ContentTable";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import { getVariantCardClasses } from "@/util/variantUtil";
import { cn } from "@/lib/utils";

interface PuzzleCardProps {
  puzzle: GuessrPuzzleView;
  puzzleNumber: number;
  yearGuess: number | null;
  onYearChange: (year: number | null) => void;
  variant: string;
  disabled?: boolean;
}

const PuzzleCard = ({ puzzle, puzzleNumber, yearGuess, onYearChange, variant, disabled }: PuzzleCardProps) => {
  const cardClasses = getVariantCardClasses(variant);

  return (
    <Card className={cn("flex flex-col h-full", cardClasses)}>
      <CardHeader>
        <PuzzleHeader hint={puzzle.hint} puzzleNumber={puzzleNumber} />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-[clamp(1rem,2vw,2rem)]">
        <YearPicker
          value={yearGuess}
          onChange={onYearChange}
          disabled={disabled}
        />

        <ContentTable content={puzzle.content} />
      </CardContent>
    </Card>
  );
};

export default PuzzleCard;
