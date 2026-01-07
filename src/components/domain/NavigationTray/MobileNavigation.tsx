import { Menu, ArrowRightToLine, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import HowToPlay from "@/components/domain/HowToPlay/HowToPlay";
import DateSelector from "@/components/domain/DateSelector/DateSelector";
import RadialMenu from "@/components/domain/RadialMenu/RadialMenu";
import type { GuessrItemView } from "@/model/view/GuessrItemView";

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
  availableVariants: string[];
  summary: GuessrItemView[] | null;
}

const MobileNavigation = ({
  open,
  onOpenChange,
  selectedDate,
  onDateChange,
  selectedVariant,
  onVariantChange,
  availableVariants,
  summary,
}: MobileNavigationProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center justify-between w-full py-3 px-4">
        <DateSelector value={selectedDate} onChange={onDateChange} summary={summary} variant={selectedVariant} />

        <div className="flex items-center gap-3">
          <RadialMenu
            availableVariants={availableVariants}
            currentVariant={selectedVariant}
            onSelect={onVariantChange}
          />
          <SheetTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Menu className="h-5 w-5" />
            </div>
          </SheetTrigger>
        </div>
      </div>
      <SheetPortal>
        <SheetOverlay className="flex items-center backdrop-blur-sm">
          <div className="text-white text-sm text-center w-1/4 flex flex-col items-center gap-2">
            <ArrowRightToLine className="h-6 w-6" />
            <span>Tap to close</span>
          </div>
        </SheetOverlay>
        <SheetContent side="right" className="flex flex-col [&>button]:hidden">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          <div className="p-4 flex items-center gap-3">
            <HowToPlay
              trigger={({ onClick }) => (
                <Button variant="secondary" className="flex-1" onClick={onClick}>
                  How to Play
                  <CircleHelp className="ml-2 h-4 w-4" />
                </Button>
              )}
            />
            <ThemeToggle />
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};

export default MobileNavigation;
