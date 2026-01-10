import type { VictoryThemeDefinition } from "victory";

// Colors extracted from index.css
const colors = {
  light: {
    primary: "#00cb87",    // green-9
    foreground: "#1e1f24", // gray-12
    muted: "#62636c",      // gray-11
    subtle: "#8b8d98",     // gray-9
    border: "#d8d9e0",     // gray-6
    avg: "#ea580c",        // orange for average line
    user: "#818cf8",       // indigo for user line
  },
  dark: {
    primary: "#00cb87",    // green-9
    foreground: "#eeeeef", // gray-12
    muted: "#b8b6ba",      // gray-11
    subtle: "#777579",     // gray-9
    border: "#4a484b",     // gray-6
    avg: "#f97316",        // orange for average line
    user: "#6366f1",       // indigo for user line
  },
};

export const createVictoryTheme = (isDark: boolean): VictoryThemeDefinition => {
  const c = isDark ? colors.dark : colors.light;

  return {
    axis: {
      style: {
        axis: {
          stroke: c.border,
          strokeWidth: 1,
        },
        ticks: {
          stroke: c.border,
          size: 4,
        },
        tickLabels: {
          fontSize: 10,
          fill: c.subtle,
          padding: 8,
        },
        grid: {
          stroke: c.border,
          strokeDasharray: "4, 4",
          strokeOpacity: 0.5,
        },
      },
    },
    bar: {
      style: {
        data: {
          fill: c.primary,
          strokeWidth: 0,
        },
        labels: {
          fontSize: 10,
          fill: c.foreground,
        },
      },
    },
    line: {
      style: {
        data: {
          stroke: c.primary,
          strokeWidth: 2,
        },
        labels: {
          fontSize: 10,
          fill: c.foreground,
          fontWeight: "600",
        },
      },
    },
    pie: {
      style: {
        data: {
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: {
          fontSize: 10,
          fill: c.foreground,
        },
      },
    },
  };
};

export const victoryLightTheme = createVictoryTheme(false);
export const victoryDarkTheme = createVictoryTheme(true);

export const getVictoryColors = (isDark: boolean) => isDark ? colors.dark : colors.light;
