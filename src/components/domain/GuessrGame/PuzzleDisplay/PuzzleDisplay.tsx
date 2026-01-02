import type { PuzzleView } from "@/model/view/PuzzleView";
import MobilePuzzleDisplay from "./MobilePuzzleDisplay";
import DesktopPuzzleDisplay from "./DesktopPuzzleDisplay";
import { useEffect, useState } from "react";

interface PuzzleDisplayProps {
  puzzles: PuzzleView[];
  guesses: Map<number, number | null>;
  onGuessChange: (puzzleId: number, year: number | null) => void;
}

const PuzzleDisplay = (props: PuzzleDisplayProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <MobilePuzzleDisplay {...props} />
  ) : (
    <DesktopPuzzleDisplay {...props} />
  );
};

export default PuzzleDisplay;
