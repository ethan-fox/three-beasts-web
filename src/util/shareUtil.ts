import { calculateAccuracy } from "./resultUtil";
import { SHARE_TEMPLATE, BASE_URL } from "./shareTemplate";
import type { PuzzleResultView } from "@/model/view/PuzzleResultView";

export const getAccuracyEmoji = (accuracyPercent: number): string => {
  if (accuracyPercent === 100) return "🟦";
  if (accuracyPercent >= 85) return "🟩";
  if (accuracyPercent >= 70) return "🟨";
  if (accuracyPercent >= 50) return "🟧";
  if (accuracyPercent >= 30) return "🟥";
  return "⬛";
};

interface ShareTextParams {
  dayNumber: number;
  emoji: string;
  variant: string;
  overallScore: number;
  individualResults: PuzzleResultView[];
}

export const generateShareText = ({
  dayNumber,
  emoji,
  variant,
  overallScore,
  individualResults,
}: ShareTextParams): string => {
  const puzzleEmojis = individualResults
    .map(result => {
      const accuracy = calculateAccuracy(result.score);
      return getAccuracyEmoji(accuracy);
    })
    .join("");

  const url = variant === "default"
    ? BASE_URL
    : `${BASE_URL}?variant=${variant}`;

  return SHARE_TEMPLATE
    .replace("{dayNumber}", dayNumber.toString())
    .replace("{emoji}", emoji)
    .replace("{overallScore}", overallScore.toString())
    .replace("{puzzleEmojis}", puzzleEmojis)
    .replace("{url}", url);
};

export const shareResults = async (shareText: string): Promise<boolean> => {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch (err) {
      console.warn("Clipboard API failed, trying fallback:", err);
    }
  }

  // Fallback for mobile browsers that don't support Clipboard API well
  try {
    const textArea = document.createElement("textarea");
    textArea.value = shareText;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (success) {
      return true;
    }
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }

  return false;
};
