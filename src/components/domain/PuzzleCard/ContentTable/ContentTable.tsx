import { useRef, useState, useEffect } from "react";
import type { ContentItemView } from "@/model/view/ContentItemView";

interface ContentTableProps {
  content: ContentItemView[];
  fadeColor: string;
}

const ContentTable = ({ content, fadeColor }: ContentTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
      setShowFade(hasOverflow && !isAtBottom);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [content]);

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        className="flex flex-col gap-2 h-full max-h-[clamp(12rem,30vh,20rem)] desktop:max-h-none overflow-y-auto pr-3"
      >
        {content.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium">
              {item.name}
              {item.tags.includes("platoon") && (
                <span className="text-sm text-muted-foreground ml-2">(Platoon)</span>
              )}
            </span>
            {item.value !== null && (
              <span className="font-bold text-foreground">
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t ${fadeColor} to-transparent pointer-events-none transition-opacity duration-300 ${
          showFade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ContentTable;
