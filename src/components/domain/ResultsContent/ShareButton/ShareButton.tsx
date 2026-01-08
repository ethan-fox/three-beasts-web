import { useState } from "react";
import { Share, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateShareText, shareResults } from "@/util/shareUtil";
import { getVariantConfig } from "@/util/variantUtil";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

interface ShareButtonProps {
  dayNumber: number;
  variant: string;
  results: BatchGuessValidationView;
}

type ShareState = "idle" | "copied" | "failed";

const ShareButton = ({ dayNumber, variant, results }: ShareButtonProps) => {
  const [shareState, setShareState] = useState<ShareState>("idle");

  const handleShare = async () => {
    const config = getVariantConfig(variant);
    const shareText = generateShareText({
      dayNumber,
      emoji: config.emoji,
      variant,
      overallScore: results.overall_score,
      individualResults: results.results,
    });

    const success = await shareResults(shareText);

    setShareState(success ? "copied" : "failed");
    setTimeout(() => setShareState("idle"), 2000);
  };

  const getButtonContent = () => {
    switch (shareState) {
      case "copied":
        return (
          <>
            Copied to Clipboard
            <Check className="w-4 h-4" />
          </>
        );
      case "failed":
        return (
          <>
            Copy failed
            <X className="w-4 h-4" />
          </>
        );
      default:
        return (
          <>
            Share Results
            <Share className="w-4 h-4" />
          </>
        );
    }
  };

  const getButtonVariant = () => {
    if (shareState === "copied") return "default";
    if (shareState === "failed") return "destructive";
    return "outline";
  };

  return (
    <Button
      onClick={handleShare}
      variant={getButtonVariant()}
      size="default"
      className="gap-2 cursor-pointer w-[clamp(12rem,20vw,15rem)]"
    >
      {getButtonContent()}
    </Button>
  );
};

export default ShareButton;
