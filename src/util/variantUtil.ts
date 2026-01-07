import type { GuessrItemView } from "@/model/view/GuessrItemView";

export interface VariantConfig {
  key: string;
  displayName: string;
  emoji: string;
  subtext?: string;
  color: {
    gradient: string;
    glow: string;
  };
}

export const VARIANT_CONFIG: Record<string, VariantConfig> = {
  default: {
    key: "default",
    displayName: "Championship Circuit",
    emoji: "🏆",
    subtext: "Test your whole array of knowledge!",
    color: {
      gradient: "from-purple-500/20 via-card to-amber-500/20",
      glow: "shadow-purple-500/25",
    },
  },
  baseball: {
    key: "baseball",
    displayName: "Baseball",
    emoji: "⚾",
    color: {
      gradient: "from-blue-500/25 via-card to-blue-400/15",
      glow: "shadow-blue-500/30",
    },
  },
  football: {
    key: "football",
    displayName: "Football",
    emoji: "🏈",
    color: {
      gradient: "from-red-500/25 via-card to-red-400/15",
      glow: "shadow-red-500/30",
    },
  },
  basketball: {
    key: "basketball",
    displayName: "Basketball",
    emoji: "🏀",
    color: {
      gradient: "from-green-500/25 via-card to-green-400/15",
      glow: "shadow-green-500/30",
    },
  },
  ncaa_basketball: {
    key: "ncaa_basketball",
    displayName: "NCAA Basketball",
    emoji: "🎓",
    color: {
      gradient: "from-yellow-500/25 via-card to-yellow-400/15",
      glow: "shadow-yellow-500/30",
    },
  },
};

export const getVariantCardClasses = (variant: string): string => {
  const config = getVariantConfig(variant);
  return `bg-gradient-to-br ${config.color.gradient} shadow-lg ${config.color.glow} border rounded-xl`;
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

export const groupByVariant = (items: GuessrItemView[]): Map<string, GuessrItemView[]> => {
  const grouped = new Map<string, GuessrItemView[]>();
  items.forEach((item) => {
    const existing = grouped.get(item.variant) || [];
    grouped.set(item.variant, [...existing, item]);
  });
  return grouped;
};
