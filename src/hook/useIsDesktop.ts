import { useSyncExternalStore } from "react";

// Detect desktop via pointer: fine (matches App.css pattern)
// pointer: fine = mouse/trackpad (desktop)
// pointer: coarse = touch (mobile/tablet)
const mediaQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(pointer: fine)")
    : null;

const subscribe = (callback: () => void) => {
  mediaQuery?.addEventListener("change", callback);
  return () => mediaQuery?.removeEventListener("change", callback);
};

const getIsDesktop = () => mediaQuery?.matches ?? true;

export const useIsDesktop = () =>
  useSyncExternalStore(subscribe, getIsDesktop, () => true);
