import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getVariantConfig, type VariantConfig } from "@/util/variantUtil";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface RadialMenuProps {
  availableVariants: string[];
  currentVariant: string;
  onSelect: (variant: string) => void;
}

const RadialMenu = ({ availableVariants, currentVariant, onSelect }: RadialMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (variant: string) => {
    onSelect(variant);
    setIsOpen(false);
  };

  const variants: VariantConfig[] = availableVariants.map((v) => getVariantConfig(v));
  const radius = 120;

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <Sparkle />
        More puzzles
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div
              className="relative"
              style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
              onClick={(e) => e.stopPropagation()}
            >
              {variants.map((variant, index) => {
                const angleStep = (2 * Math.PI) / variants.length;
                const angle = angleStep * index - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const finalX = x + radius + 40 - 32;
                const finalY = y + radius + 40 - 32;
                const centerX = radius + 40 - 32;
                const centerY = radius + 40 - 32;

                return (
                  <Tooltip key={variant.key}>
                    <TooltipTrigger asChild>
                      <motion.button
                        initial={{ opacity: 0, scale: 0, x: centerX, y: centerY }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: finalX,
                          y: finalY,
                          transition: { delay: (variants.length - 1 - index) * 0.02 },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0,
                          x: centerX,
                          y: centerY,
                          transition: { delay: (variants.length - index) * 0.02 },
                        }}
                        whileHover={{ scale: 2.0 }}
                        whileTap={{ scale: 1.5 }}
                        transition={{ type: "tween", duration: 0.15 }}
                        onClick={() => handleSelect(variant.key)}
                        className={cn(
                          "absolute flex items-center justify-center",
                          "w-16 h-16 rounded-full",
                          "bg-card border-2 cursor-pointer",
                          variant.key === currentVariant
                            ? "shadow-[0_0_20px_4px_var(--primary)]"
                            : "shadow-lg"
                        )}
                      >
                        <span className="text-3xl">{variant.emoji}</span>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>{variant.displayName}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RadialMenu;
