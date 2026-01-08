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
            size="lg"
            thumbIcon={
              isDark ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500" />
              )
            }
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="touch:hidden desktop:block">
        Change theme
      </TooltipContent>
    </Tooltip>
  );
};

export { ThemeToggle };
