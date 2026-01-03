import { calculateAccuracy } from "./resultUtil";
import { SHARE_TEMPLATE } from "./shareTemplate";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";

export const getAccuracyEmoji = (accuracyPercent: number): string => {
  if (accuracyPercent === 100) return "🟦";
  if (accuracyPercent >= 85) return "🟩";
  if (accuracyPercent >= 70) return "🟨";
  if (accuracyPercent >= 50) return "🟧";
  if (accuracyPercent >= 30) return "🟥";
  return "⬛";
};

export const generateShareText = (
  puzzleId: number,
  overallScore: number,
  individualResults: PuzzleResultView[]
): string => {
  const emojis = individualResults
    .map(result => {
      const accuracy = calculateAccuracy(result.score);
      return getAccuracyEmoji(accuracy);
    })
    .join("");

  return SHARE_TEMPLATE
    .replace("{puzzleId}", puzzleId.toString())
    .replace("{overallScore}", overallScore.toString())
    .replace("{puzzleEmojis}", emojis);
};

export const shareResults = async (shareText: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
};
