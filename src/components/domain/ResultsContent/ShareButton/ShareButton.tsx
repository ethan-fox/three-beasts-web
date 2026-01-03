import { useState } from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateShareText, shareResults } from "@/util/shareUtil";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

interface ShareButtonProps {
  puzzleId: number;
  results: BatchGuessValidationView;
}

const ShareButton = ({ puzzleId, results }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = generateShareText(
      puzzleId,
      results.overall_score,
      results.results
    );

    const success = await shareResults(shareText);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="default"
      className="gap-2 cursor-pointer w-[clamp(12rem,20vw,15rem)]"
    >
      {copied ? "Copied to Clipboard" : (
        <>
          Share Results
          <Share className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default ShareButton;
