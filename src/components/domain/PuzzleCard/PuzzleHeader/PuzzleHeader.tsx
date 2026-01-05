import type { HintView } from "@/model/view/HintView";
import { getThemeEmoji } from "@/util/themeUtil";

interface PuzzleHeaderProps {
  hint: HintView;
  puzzleNumber: number;
}

const PuzzleHeader = ({ hint, puzzleNumber }: PuzzleHeaderProps) => {
  const emoji = getThemeEmoji(hint.theme);

  return (
    <h3 className="text-lg font-semibold">
      {puzzleNumber}. {emoji} {hint.title}
    </h3>
  );
};

export default PuzzleHeader;
