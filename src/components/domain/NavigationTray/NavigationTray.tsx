import { useState } from "react";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import type { GuessrItemView } from "@/model/view/GuessrItemView";
import { getAvailableVariants } from "@/util/variantUtil";

interface NavigationTrayProps {
  className?: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
  summary: GuessrItemView[] | null;
}

const NavigationTray = ({
  className = "",
  selectedDate,
  onDateChange,
  selectedVariant,
  onVariantChange,
  summary,
}: NavigationTrayProps) => {
  const [open, setOpen] = useState(false);

  const availableVariants = summary ? getAvailableVariants(summary) : [];

  return (
    <nav
      className={`border-b border-border ${className}`}
      style={{
        background: "linear-gradient(to bottom, var(--gray-1) 0%, var(--gray-2) 30%, var(--gray-4) 70%, var(--gray-5) 100%)",
        boxShadow: "inset 0 1px 0 var(--gray-1)",
      }}
    >
      <div className="desktop:hidden">
        <MobileNavigation
          open={open}
          onOpenChange={setOpen}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          selectedVariant={selectedVariant}
          onVariantChange={onVariantChange}
          availableVariants={availableVariants}
          summary={summary}
        />
      </div>

      <div className="hidden desktop:block">
        <DesktopNavigation
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          selectedVariant={selectedVariant}
          onVariantChange={onVariantChange}
          availableVariants={availableVariants}
          summary={summary}
        />
      </div>
    </nav>
  );
};

export default NavigationTray;
