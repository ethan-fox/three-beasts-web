import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { IconSwitch } from "@/components/custom/IconSwitch";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <IconSwitch
      checked={isDark}
      onCheckedChange={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      thumbIcon={
        isDark ? (
          <Moon className="h-3 w-3 text-primary" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )
      }
    />
  );
};

export { ThemeToggle };
