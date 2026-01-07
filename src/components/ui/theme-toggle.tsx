import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { IconSwitch } from "@/components/custom/IconSwitch";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
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
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom">Change theme</TooltipContent>
    </Tooltip>
  );
};

export { ThemeToggle };
