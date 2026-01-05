/**
 * Formats a numeric value for display.
 * Decimal values show 2 decimal places, integers display as-is.
 */
export const formatValue = (value: number | null): string => {
  if (value === null) return "";

  if (!Number.isInteger(value)) {
    return value.toFixed(2);
  }

  return value.toString();
};
