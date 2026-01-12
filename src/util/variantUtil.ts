import type { GuessrItemView } from "@/model/view/GuessrItemView";

export interface VariantConfig {
  key: string;
  displayName: string;
  emoji: string;
  subtext?: string;
  color: {
    gradient: string;
    glow: string;
    fade: string;
  };
}

export const VARIANT_CONFIG: Record<string, VariantConfig> = {
  default: {
    key: "default",
    displayName: "Championship Circuit",
    emoji: "🏆",
    subtext: "Test your whole array of knowledge!",
    color: {
      gradient: "from-amber-400/30 via-yellow-500/20 to-amber-600/30",
      glow: "shadow-amber-500/40",
      fade: "from-amber-900/40",
    },
  },
  baseball: {
    key: "baseball",
    displayName: "Baseball",
    emoji: "⚾",
    color: {
      gradient: "from-blue-500/25 via-card to-blue-400/15",
      glow: "shadow-blue-500/30",
      fade: "from-blue-900/40",
    },
  },
  football: {
    key: "football",
    displayName: "Football",
    emoji: "🏈",
    color: {
      gradient: "from-red-500/25 via-card to-red-400/15",
      glow: "shadow-red-500/30",
      fade: "from-red-900/40",
    },
  },
  basketball: {
    key: "basketball",
    displayName: "Basketball",
    emoji: "🏀",
    color: {
      gradient: "from-green-500/25 via-card to-green-400/15",
      glow: "shadow-green-500/30",
      fade: "from-green-900/40",
    },
  },
  ncaa_basketball: {
    key: "ncaa_basketball",
    displayName: "NCAA Basketball",
    emoji: "🎓🏀",
    color: {
      gradient: "from-purple-500/25 via-card to-purple-400/15",
      glow: "shadow-purple-500/30",
      fade: "from-purple-900/40",
    },
  },
  ncaa_football: {
    key: "ncaa_football",
    displayName: "NCAA Football",
    emoji: "🎓🏈",
    color: {
      gradient: "from-orange-500/25 via-card to-orange-400/15",
      glow: "shadow-orange-500/30",
      fade: "from-orange-900/40",
    },
  },
};

export const DEFAULT_VARIANT = "default";

export const getVariantConfig = (variant: string): VariantConfig => {
  return VARIANT_CONFIG[variant] || VARIANT_CONFIG.default;
};

export const getAvailableVariants = (summary: GuessrItemView[]): string[] => {
  const variants = new Set<string>();
  summary.forEach((item) => variants.add(item.variant));
  return Array.from(variants);
};
