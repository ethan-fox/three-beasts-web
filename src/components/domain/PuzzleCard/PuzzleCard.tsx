import { forwardRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PuzzleHeader from "@/components/domain/PuzzleCard/PuzzleHeader/PuzzleHeader";
import YearPicker from "@/components/domain/PuzzleCard/YearPicker/YearPicker";
import ContentTable from "@/components/domain/PuzzleCard/ContentTable/ContentTable";
import type { GuessrPuzzleView } from "@/model/view/GuessrPuzzleView";
import { getVariantConfig } from "@/util/variantUtil";
import { cn } from "@/lib/utils";

interface PuzzleCardProps {
  puzzle: GuessrPuzzleView;
  puzzleNumber: number;
  yearGuess: number | null;
  onYearChange: (year: number | null) => void;
  variant: string;
  disabled?: boolean;
}

const PuzzleCard = forwardRef<HTMLInputElement, PuzzleCardProps>(
  ({ puzzle, puzzleNumber, yearGuess, onYearChange, variant, disabled }, ref) => {
    const config = getVariantConfig(variant);

    const isChampionship = variant === "default";

    return (
      <Card className={cn(
        "flex flex-col h-full bg-gradient-to-br shadow-lg border rounded-xl",
        config.color.gradient,
        config.color.glow,
        isChampionship && "border border-t-yellow-200/60 border-l-yellow-200/60 border-b-amber-600/40 border-r-amber-600/40 shadow-[0_0_20px_rgba(245,158,11,0.3),2px_2px_0px_rgba(120,80,20,0.25)]"
      )}>
        <CardHeader>
          <PuzzleHeader hint={puzzle.hint} puzzleNumber={puzzleNumber} showEmoji={isChampionship} />
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-[clamp(1rem,2vw,2rem)]">
          <YearPicker
            ref={ref}
            value={yearGuess}
            onChange={onYearChange}
            disabled={disabled}
          />

          <ContentTable content={puzzle.content} />
        </CardContent>
      </Card>
    );
  }
);

PuzzleCard.displayName = "PuzzleCard";

export default PuzzleCard;
