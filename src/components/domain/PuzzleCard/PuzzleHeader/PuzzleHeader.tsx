import type { HintView } from "@/model/view/HintView";
import { getThemeEmoji } from "@/util/themeUtil";

interface PuzzleHeaderProps {
  hint: HintView;
  puzzleNumber: number;
  showEmoji?: boolean;
}

const PuzzleHeader = ({ hint, puzzleNumber, showEmoji = true }: PuzzleHeaderProps) => {
  const emoji = showEmoji ? getThemeEmoji(hint.theme) : null;

  return (
    <h3 className="text-lg font-semibold">
      {puzzleNumber}. {emoji && `${emoji} `}{hint.title}
    </h3>
  );
};

export default PuzzleHeader;
