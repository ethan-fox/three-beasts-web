import { useState, useEffect, useMemo } from "react";
import { ArrowRightToLine, CircleHelp } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import DateSelector from "@/components/domain/DateSelector/DateSelector";
import RadialMenu from "@/components/domain/RadialMenu/RadialMenu";
import { guessrClient } from "@/client/GuessrClient";
import { parseMarkdownSections, createMarkdownComponents } from "@/util/markdownUtil";
import type { GuessrItemView } from "@/model/view/GuessrItemView";
import type { HowToPlayView } from "@/model/view/HowToPlayView";

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
  availableVariants: string[];
  summary: GuessrItemView[] | null;
}

const markdownComponents = createMarkdownComponents("sm");

const MobileNavigation = ({
  open,
  onOpenChange,
  selectedDate,
  onDateChange,
  selectedVariant,
  onVariantChange,
  availableVariants,
  summary,
}: MobileNavigationProps) => {
  const [howToPlay, setHowToPlay] = useState<HowToPlayView | null>(null);

  useEffect(() => {
    if (open && !howToPlay) {
      guessrClient.fetchHowToPlay().then(setHowToPlay).catch(console.error);
    }
  }, [open, howToPlay]);

  const parsedContent = useMemo(() => {
    if (!howToPlay?.content) return { preamble: "", sections: [] };
    return parseMarkdownSections(howToPlay.content);
  }, [howToPlay]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center justify-between w-full py-3 px-4">
        <DateSelector value={selectedDate} onChange={onDateChange} summary={summary} variant={selectedVariant} />

        <div className="flex items-center gap-3">
          <RadialMenu
            availableVariants={availableVariants}
            currentVariant={selectedVariant}
            onSelect={onVariantChange}
          />
          <SheetTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <CircleHelp className="h-5 w-5" />
            </div>
          </SheetTrigger>
        </div>
      </div>
      <SheetPortal>
        <SheetOverlay className="flex items-center backdrop-blur-sm">
          <div className="text-white text-sm text-center w-1/4 flex flex-col items-center gap-2">
            <ArrowRightToLine className="h-6 w-6" />
            <span>Tap to close</span>
          </div>
        </SheetOverlay>
        <SheetContent side="right" className="flex flex-col [&>button]:hidden overflow-y-auto">
          <SheetTitle className="text-xl font-bold p-4 pb-0">How to Play</SheetTitle>

          <div className="flex-1 overflow-y-auto p-4">
            {parsedContent.preamble && (
              <div className="mb-4">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {parsedContent.preamble}
                </Markdown>
              </div>
            )}

            {parsedContent.sections.length > 0 && (
              <Accordion type="single" collapsible defaultValue="section-0">
                {parsedContent.sections.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="text-base font-semibold">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {section.content}
                      </Markdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

          <div className="p-4 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};

export default MobileNavigation;
