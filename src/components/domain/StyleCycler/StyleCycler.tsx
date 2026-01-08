import { ChevronLeft, ChevronRight, RotateCcw, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCardStyles } from "@/context/CardStyleContext";
import { BORDER_STYLES, BACKGROUND_STYLES, SHADOW_STYLES, HEADER_STYLES } from "@/util/cardStyleUtil";

const StyleCycler = () => {
  const { styles, cycleStyle, resetStyles, isDevMode, toggleDevMode } = useCardStyles();

  if (!isDevMode) {
    return (
      <button
        onClick={toggleDevMode}
        className="fixed bottom-4 right-4 w-10 h-10 bg-muted/50 rounded-full opacity-20 hover:opacity-100 transition-opacity flex items-center justify-center z-50"
        title="Toggle style cycler"
      >
        <Palette className="h-5 w-5" />
      </button>
    );
  }

  const categories = [
    { key: "border" as const, name: "Border", styles: BORDER_STYLES },
    { key: "background" as const, name: "Background", styles: BACKGROUND_STYLES },
    { key: "shadow" as const, name: "Shadow", styles: SHADOW_STYLES },
    { key: "header" as const, name: "Header", styles: HEADER_STYLES },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border rounded-lg shadow-lg p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Card Styles
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={resetStyles} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDevMode} title="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {categories.map((category) => {
        const currentStyle = category.styles.find((s) => s.key === styles[category.key]);

        return (
          <div key={category.key} className="mb-3">
            <div className="text-xs text-muted-foreground mb-1">{category.name}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => cycleStyle(category.key, -1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center text-sm font-medium truncate px-2">
                {currentStyle?.name || "Unknown"}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => cycleStyle(category.key, 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StyleCycler;
