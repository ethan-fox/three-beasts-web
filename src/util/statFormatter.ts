import type { BattingStat, PitchingStat } from "@/model/view/PuzzleView";

type Stat = BattingStat | PitchingStat;

/**
 * Formats a player stat value based on the stat type
 */
export const formatStatValue = (value: string | undefined, stat: Stat | undefined): string => {
  if (!value || !stat) return value || "";

  // Parse the value as a number
  const numValue = parseFloat(value);

  // If parsing fails, return original value
  if (isNaN(numValue)) return value;

  // Apply stat-specific formatting
  switch (stat) {
    // NOTE this is left open for future extension. 
    case "ERA":
      // ERA should always show 2 decimal places
      return numValue.toFixed(2);
    default:
      // Default: return original value
      return value;
  }
};
