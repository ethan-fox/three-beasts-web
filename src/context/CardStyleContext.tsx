import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type CardStyleConfig,
  DEFAULT_CARD_STYLE,
  BORDER_STYLES,
  BACKGROUND_STYLES,
  SHADOW_STYLES,
  HEADER_STYLES,
} from "@/util/cardStyleUtil";

interface CardStyleContextValue {
  styles: CardStyleConfig;
  setStyle: (category: keyof CardStyleConfig, value: string) => void;
  cycleStyle: (category: keyof CardStyleConfig, direction: 1 | -1) => void;
  resetStyles: () => void;
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const CardStyleContext = createContext<CardStyleContextValue | undefined>(undefined);

const STYLE_LISTS = {
  border: BORDER_STYLES,
  background: BACKGROUND_STYLES,
  shadow: SHADOW_STYLES,
  header: HEADER_STYLES,
};

interface CardStyleProviderProps {
  children: ReactNode;
}

export const CardStyleProvider = ({ children }: CardStyleProviderProps) => {
  const [styles, setStyles] = useState<CardStyleConfig>(DEFAULT_CARD_STYLE);
  const [isDevMode, setIsDevMode] = useState(false);

  const setStyle = useCallback((category: keyof CardStyleConfig, value: string) => {
    setStyles((prev) => ({ ...prev, [category]: value }));
  }, []);

  const cycleStyle = useCallback((category: keyof CardStyleConfig, direction: 1 | -1) => {
    setStyles((prev) => {
      const list = STYLE_LISTS[category];
      const currentIndex = list.findIndex((s) => s.key === prev[category]);
      const nextIndex = (currentIndex + direction + list.length) % list.length;
      return { ...prev, [category]: list[nextIndex].key };
    });
  }, []);

  const resetStyles = useCallback(() => {
    setStyles(DEFAULT_CARD_STYLE);
  }, []);

  const toggleDevMode = useCallback(() => {
    setIsDevMode((prev) => !prev);
  }, []);

  return (
    <CardStyleContext.Provider
      value={{ styles, setStyle, cycleStyle, resetStyles, isDevMode, toggleDevMode }}
    >
      {children}
    </CardStyleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCardStyles = () => {
  const context = useContext(CardStyleContext);
  if (!context) {
    throw new Error("useCardStyles must be used within a CardStyleProvider");
  }
  return context;
};
