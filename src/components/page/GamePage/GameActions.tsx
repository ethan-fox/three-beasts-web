import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

interface GameActionsProps {
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const GameActions = ({ canSubmit, isSubmitting, onSubmit }: GameActionsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (canSubmit && !isSubmitting) {
          onSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canSubmit, isSubmitting, onSubmit]);

  return (
    <div className="mt-[clamp(2rem,4vh,4rem)] mb-[clamp(2rem,4vh,4rem)] flex justify-center">
      <Button
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
        className="w-auto"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <span className="flex items-center gap-2">
            Submit Guesses
            <Kbd className="touch:hidden desktop:inline-flex">
              {navigator.platform.indexOf("Mac") > -1 ? "⌘" : "Ctrl"} + Enter
            </Kbd>
          </span>
        )}
      </Button>
    </div>
  );
};

export default GameActions;
