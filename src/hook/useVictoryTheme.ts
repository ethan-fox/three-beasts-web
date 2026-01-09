import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  createVictoryTheme,
  getVictoryColors,
  victoryLightTheme,
  victoryDarkTheme,
} from "@/theme/victoryTheme";

export const useVictoryTheme = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const victoryTheme = useMemo(() => {
    return isDark ? victoryDarkTheme : victoryLightTheme;
  }, [isDark]);

  const colors = useMemo(() => {
    return getVictoryColors(isDark);
  }, [isDark]);

  return {
    theme: victoryTheme,
    colors,
    isDark,
    createTheme: createVictoryTheme,
  };
};
