import type { Theme } from "@/model/view/HintView";

export const getThemeEmoji = (theme: Theme): string => {
  switch (theme) {
    case "BASEBALL":
      return "⚾";
    case "FOOTBALL":
      return "🏈";
    case "BASKETBALL":
      return "🏀";
    case "NCAA_BASKETBALL":
      return "🎓🏀";
    default:
      return "";
  }
};
