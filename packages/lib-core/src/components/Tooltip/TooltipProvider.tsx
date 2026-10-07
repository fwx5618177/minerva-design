import { createContext, useContext, useMemo, useRef } from "react";
import type { TooltipProviderProps } from "./types";

export interface TooltipConfig {
  enterDelay?: number;
  leaveDelay?: number;
  /** Records that a tooltip of the provider just closed */
  markClosed: () => void;
  /** Whether a tooltip closed recently enough to open the next instantly */
  shouldSkipDelay: () => boolean;
}

export const TooltipConfigContext = createContext<TooltipConfig | null>(null);

/** Shared configuration of the Tooltips inside the provider, if any. */
export const useTooltipConfig = () => useContext(TooltipConfigContext);

/**
 * Optional provider giving every Tooltip inside default delays. Moving from
 * one tooltip to the next within `skipDelay` opens it immediately. Tooltips
 * work without it.
 */
const TooltipProvider = ({
  enterDelay,
  leaveDelay,
  skipDelay = 300,
  children,
}: TooltipProviderProps) => {
  const lastClosedAt = useRef(0);
  const value = useMemo<TooltipConfig>(
    () => ({
      enterDelay,
      leaveDelay,
      markClosed: () => {
        lastClosedAt.current = Date.now();
      },
      shouldSkipDelay: () => Date.now() - lastClosedAt.current < skipDelay,
    }),
    [enterDelay, leaveDelay, skipDelay],
  );
  return (
    <TooltipConfigContext.Provider value={value}>
      {children}
    </TooltipConfigContext.Provider>
  );
};

export default TooltipProvider;
