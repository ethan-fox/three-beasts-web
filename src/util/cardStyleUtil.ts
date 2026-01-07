export interface StyleOption {
  key: string;
  name: string;
  classes: string;
}

export const BORDER_STYLES: StyleOption[] = [
  { key: "default", name: "Default", classes: "border rounded-xl" },
  { key: "thick", name: "Thick Border", classes: "border-4 rounded-xl" },
  { key: "accent", name: "Accent Border", classes: "border-2 border-primary rounded-xl shadow-[0_0_12px_2px_hsl(var(--primary)/0.3)]" },
  { key: "none", name: "No Border", classes: "rounded-xl" },
  { key: "less-rounded", name: "Less Rounded", classes: "border rounded-lg" },
  { key: "more-rounded", name: "More Rounded", classes: "border rounded-3xl" },
];

export const BACKGROUND_STYLES: StyleOption[] = [
  { key: "default", name: "Default", classes: "bg-card" },
  { key: "gradient-warm", name: "Warm Gradient", classes: "bg-gradient-to-br from-orange-500/20 via-card to-rose-500/20" },
  { key: "gradient-cool", name: "Cool Gradient", classes: "bg-gradient-to-br from-blue-500/20 via-card to-purple-500/20" },
  { key: "gradient-accent", name: "Accent Gradient", classes: "bg-gradient-to-br from-primary/25 via-card to-primary/10" },
  { key: "glass", name: "Glass Effect", classes: "bg-card/60 backdrop-blur-md" },
  { key: "muted", name: "Muted", classes: "bg-muted/50" },
];

export const SHADOW_STYLES: StyleOption[] = [
  { key: "default", name: "None", classes: "" },
  { key: "subtle", name: "Subtle", classes: "shadow-md" },
  { key: "elevated", name: "Elevated", classes: "shadow-lg shadow-black/10" },
  { key: "deep", name: "Deep", classes: "shadow-xl shadow-black/20" },
  { key: "dramatic", name: "Dramatic", classes: "shadow-2xl shadow-black/30" },
  { key: "inset", name: "Inset", classes: "shadow-inner" },
  { key: "glow", name: "Glow", classes: "shadow-lg shadow-primary/20" },
];

export const HEADER_STYLES: StyleOption[] = [
  { key: "default", name: "Default", classes: "" },
  { key: "border-bottom", name: "Underlined", classes: "border-b-2 border-muted-foreground/30 pb-4" },
  { key: "bg-muted", name: "Muted BG", classes: "bg-muted/80 rounded-lg px-4 py-3 -mx-2" },
  { key: "centered", name: "Centered", classes: "text-center" },
  { key: "accent-left", name: "Accent Left", classes: "border-l-4 border-primary pl-4" },
  { key: "gradient-header", name: "Gradient Header", classes: "bg-gradient-to-r from-primary/20 to-transparent rounded-lg px-4 py-3 -mx-2" },
];

export interface CardStyleConfig {
  border: string;
  background: string;
  shadow: string;
  header: string;
}

export const DEFAULT_CARD_STYLE: CardStyleConfig = {
  border: "default",
  background: "default",
  shadow: "default",
  header: "default",
};

export const getStyleClasses = (config: CardStyleConfig) => {
  const border = BORDER_STYLES.find((s) => s.key === config.border);
  const background = BACKGROUND_STYLES.find((s) => s.key === config.background);
  const shadow = SHADOW_STYLES.find((s) => s.key === config.shadow);
  const header = HEADER_STYLES.find((s) => s.key === config.header);

  return {
    card: `${border?.classes || ""} ${background?.classes || ""} ${shadow?.classes || ""}`.trim(),
    header: header?.classes || "",
  };
};
