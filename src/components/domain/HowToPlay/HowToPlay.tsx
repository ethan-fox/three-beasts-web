import { useState, useEffect, useMemo } from "react";
import { CircleHelp } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guessrClient } from "@/client/GuessrClient";
import { parseMarkdownSections, createMarkdownComponents } from "@/util/markdownUtil";
import type { HowToPlayView } from "@/model/view/HowToPlayView";

const markdownComponents = createMarkdownComponents("base");

interface HowToPlayProps {
  trigger?: (props: { onClick: () => void }) => React.ReactNode;
}

const HowToPlay = ({ trigger }: HowToPlayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [howToPlay, setHowToPlay] = useState<HowToPlayView | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !howToPlay) {
      const fetchContent = async () => {
        setError(null);
        try {
          const data = await guessrClient.fetchHowToPlay();
          setHowToPlay(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      };

      fetchContent();
    }
  }, [isOpen, howToPlay]);

  const parsedContent = useMemo(() => {
    if (!howToPlay?.content) return { preamble: "", sections: [] };
    return parseMarkdownSections(howToPlay.content);
  }, [howToPlay]);

  const defaultTrigger = (
    <button
      onClick={() => setIsOpen(true)}
      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="How to play"
    >
      <CircleHelp className="w-6 h-6" />
    </button>
  );

  return (
    <>
      {trigger ? trigger({ onClick: () => setIsOpen(true) }) : defaultTrigger}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-2xl flex flex-col p-0">
          <div className="sticky top-0 bg-background rounded-t-lg px-6 pt-6 pb-4 border-b">
            <DialogHeader>
              <DialogTitle>How to Play</DialogTitle>
            </DialogHeader>
          </div>
          <div className="overflow-y-auto px-6 py-6">
            {error && <p className="text-destructive">{error}</p>}

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
                    <AccordionTrigger className="text-lg font-semibold">
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HowToPlay;
