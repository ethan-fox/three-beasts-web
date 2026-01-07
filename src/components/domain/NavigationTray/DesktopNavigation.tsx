import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import HowToPlay from "@/components/domain/HowToPlay/HowToPlay";
import DateSelector from "@/components/domain/DateSelector/DateSelector";
import RadialMenu from "@/components/domain/RadialMenu/RadialMenu";
import type { GuessrItemView } from "@/model/view/GuessrItemView";

interface DesktopNavigationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
  availableVariants: string[];
  summary: GuessrItemView[] | null;
}

const DesktopNavigation = ({
  selectedDate,
  onDateChange,
  selectedVariant,
  onVariantChange,
  availableVariants,
  summary,
}: DesktopNavigationProps) => {
  return (
    <div className="flex items-center justify-between w-full py-2 px-4">
      <div className="flex-1" />

      <DateSelector value={selectedDate} onChange={onDateChange} summary={summary} variant={selectedVariant} />

      <div className="flex-1 flex justify-end items-center gap-3">
        <RadialMenu
          availableVariants={availableVariants}
          currentVariant={selectedVariant}
          onSelect={onVariantChange}
        />
        <HowToPlay
          trigger={({ onClick }) => (
            <Button variant="outline" onClick={onClick}>
              <CircleHelp />
              How to Play
            </Button>
          )}
        />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DesktopNavigation;
