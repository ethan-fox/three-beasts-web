import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";

interface CarouselHintsProps {
  puzzleCount: number;
  currentIndex: number;
  api: CarouselApi | undefined;
}

const CarouselHints = ({ puzzleCount, currentIndex, api }: CarouselHintsProps) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <p className="text-sm text-muted-foreground touch:block desktop:hidden">Swipe to view each puzzle</p>
      <div className="flex gap-2">
        {Array.from({ length: puzzleCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              currentIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
            )}
            aria-label={`Go to puzzle ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselHints;
