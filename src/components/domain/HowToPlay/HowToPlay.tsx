import { useState, useEffect } from "react";
import { CircleHelp } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { guessrClient } from "@/client/GuessrClient";
import type { HowToPlayView } from "@/model/view/HowToPlayView";

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
            {howToPlay && (
              <div className="space-y-4">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: () => null,
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mb-3">{children}</h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-base mb-4">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                        {children}
                      </ol>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-base">{children}</li>
                    ),
                  }}
                >
                  {howToPlay.content}
                </Markdown>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HowToPlay;
