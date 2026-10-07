/**
 * @novel-isr/ui compatibility layer: "feedback" group
 * (Tooltip, Menu / ContextMenu, Toast, PageTabs).
 *
 * Exposes novel-isr-ui's exact export names and prop shapes on top of the
 * Minerva components.
 */
import type { ReactElement, ReactNode, Ref } from "react";
import MinervaTooltip from "../components/Tooltip/Tooltip";
import MinervaTooltipProvider from "../components/Tooltip/TooltipProvider";
import type {
  TooltipPlacement,
  TooltipVariant,
} from "../components/Tooltip/types";
import MinervaMenu from "../components/Menu/Menu";
import MinervaContextMenu from "../components/Menu/ContextMenu";
import type {
  MenuAction as MinervaMenuAction,
  MenuEntry as MinervaMenuEntry,
} from "../components/Menu/types";
import MinervaToastProvider, {
  useToast as minervaUseToast,
} from "../components/Toast/Toast";
import { toast as minervaToast, toastStore } from "../components/Toast/store";
import type {
  ToastOptions as MinervaToastOptions,
  ToastPosition as MinervaToastPosition,
  ToastStatus as MinervaToastStatus,
} from "../components/Toast/types";
import { PageTab as MinervaPageTab } from "../components/PageTabs/PageTabs";
import MinervaPageTabs from "../components/PageTabs/PageTabs";
import type { PageTabProps as MinervaPageTabProps } from "../components/PageTabs/types";
import type { PageTabsProps as MinervaPageTabsProps } from "../components/PageTabs/types";

// ─── Tooltip ────────────────────────────────────────────────────────────────

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipTone = "auto" | "dark" | "light" | "default" | "inverse";

export interface TooltipProps {
  /** 提示内容 */
  label: ReactNode;
  /** 包一层 trigger（必须能 forwardRef） */
  children: ReactElement;
  side?: TooltipSide;
  align?: TooltipAlign;
  /** 显示前等待 ms，默认 300 */
  delayDuration?: number;
  /** 渲染指向 trigger 的小三角 */
  showArrow?: boolean;
  /** auto 跟随主题；dark 黑底白字；light 白底黑字。default/inverse = auto/dark */
  tone?: TooltipTone;
  /** disabled 时不显示 */
  disabled?: boolean;
  /** 自定义 className（落到 content 上） */
  className?: string;
  /** Ref to the tooltip content element */
  ref?: Ref<HTMLDivElement>;
}

const TONE_VARIANT: Record<TooltipTone, TooltipVariant> = {
  auto: "auto",
  default: "auto",
  dark: "fixedDark",
  inverse: "fixedDark",
  light: "fixedLight",
};

/**
 * novel-isr-ui's per-tooltip hover delay. In novel each Tooltip passed this
 * default to Radix, overriding any TooltipProvider `delayDuration`; compat
 * keeps that exactly (Minerva's native Tooltip lets the provider win).
 */
const NOVEL_TOOLTIP_DELAY = 300;
/** novel-isr-ui distance between trigger and tooltip */
const NOVEL_TOOLTIP_OFFSET = 6;
/** novel-isr-ui tooltips sit above toasts: var(--z-toast) + 10 */
const NOVEL_TOOLTIP_Z_INDEX = 1710;

export function Tooltip({
  ref,
  label,
  children,
  side = "top",
  align = "center",
  delayDuration,
  showArrow = false,
  tone = "auto",
  disabled = false,
  className,
}: TooltipProps) {
  const placement = (
    align === "center" ? side : `${side}-${align}`
  ) as TooltipPlacement;
  const vertical = side === "top" || side === "bottom";
  return (
    <MinervaTooltip
      content={label}
      placement={placement}
      enterDelay={delayDuration ?? NOVEL_TOOLTIP_DELAY}
      offset={vertical ? [0, NOVEL_TOOLTIP_OFFSET] : [NOVEL_TOOLTIP_OFFSET, 0]}
      arrow={showArrow}
      variant={TONE_VARIANT[tone]}
      disabled={disabled}
      contentClassName={className}
      contentRef={ref}
      zIndex={NOVEL_TOOLTIP_Z_INDEX}
      asChild
    >
      {children}
    </MinervaTooltip>
  );
}

/** Shape of Radix TooltipProviderProps (what novel-isr-ui re-exported). */
export interface TooltipProviderProps {
  children: ReactNode;
  /** Hover delay of the tooltips inside, in ms */
  delayDuration?: number;
  /** Moving between tooltips within this time skips the delay */
  skipDelayDuration?: number;
  /** Accepted for compatibility; Minerva tooltips are never hoverable */
  disableHoverableContent?: boolean;
}

export function TooltipProvider({
  children,
  delayDuration,
  skipDelayDuration,
}: TooltipProviderProps) {
  return (
    <MinervaTooltipProvider
      enterDelay={delayDuration}
      skipDelay={skipDelayDuration}
    >
      {children}
    </MinervaTooltipProvider>
  );
}

// ─── Menu / ContextMenu ─────────────────────────────────────────────────────

export type MenuAction = MinervaMenuAction;
export type MenuEntry = MinervaMenuEntry;

export interface MenuProps {
  children: ReactElement;
  items: MenuEntry[];
  onSelect?: (item: MenuAction) => void;
  size?: "sm" | "md";
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const menuSize = (size: "sm" | "md" = "md") =>
  size === "sm" ? "small" : "medium";

export function Menu({ size, ...rest }: MenuProps) {
  return <MinervaMenu {...rest} size={menuSize(size)} />;
}

export type ContextMenuProps = Omit<MenuProps, "open" | "align" | "side">;

export function ContextMenu({ size, ...rest }: ContextMenuProps) {
  return <MinervaContextMenu {...rest} size={menuSize(size)} />;
}

// ─── Toast ──────────────────────────────────────────────────────────────────

export type ToastStatus = MinervaToastStatus;
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";
export type ToastOptions = MinervaToastOptions;

export interface ToastProviderProps {
  position?: ToastPosition;
  children: ReactNode;
}

const TOAST_POSITION: Record<ToastPosition, MinervaToastPosition> = {
  "top-right": "topRight",
  "top-left": "topLeft",
  "top-center": "topCenter",
  "bottom-right": "bottomRight",
  "bottom-left": "bottomLeft",
  "bottom-center": "bottomCenter",
};

/** novel-isr-ui's built-in strings (independent of lib-core's language) */
const NOVEL_TOAST_REGION_LABEL = "通知";
const NOVEL_TOAST_CLOSE_LABEL = "关闭";

export function ToastProvider({
  position = "top-right",
  children,
}: ToastProviderProps) {
  return (
    <MinervaToastProvider
      position={TOAST_POSITION[position]}
      ariaLabel={NOVEL_TOAST_REGION_LABEL}
      closeLabel={NOVEL_TOAST_CLOSE_LABEL}
    >
      {children}
    </MinervaToastProvider>
  );
}

export const toast = minervaToast;
export const useToast = minervaUseToast;
/** Toast store (peek / reset) for tests, as in novel-isr-ui */
export const __toastStoreForTesting = toastStore;

// ─── PageTabs ───────────────────────────────────────────────────────────────

export interface PageTabsProps extends Omit<
  MinervaPageTabsProps,
  "ariaLabel" | "scrollLeftLabel" | "scrollRightLabel"
> {
  /** aria-label of the nav */
  label: string;
  scrollLabels?: { left: string; right: string };
}

const NOVEL_SCROLL_LABELS = {
  left: "Scroll pages left",
  right: "Scroll pages right",
};

export function PageTabs({
  label,
  scrollLabels = NOVEL_SCROLL_LABELS,
  ...rest
}: PageTabsProps) {
  return (
    <MinervaPageTabs
      {...rest}
      ariaLabel={label}
      scrollLeftLabel={scrollLabels.left}
      scrollRightLabel={scrollLabels.right}
    />
  );
}

export type PageTabProps = MinervaPageTabProps;
export const PageTab = MinervaPageTab;
