// @novel-isr/ui compatibility: overlays group.
//
// Modal / Confirm / Drawer / Command / Popover were ported as Minerva
// components with Minerva naming (`open` / `onOpenChange`, `loading`,
// `arrow`, sizes "small" | "medium" | "large" ...). The adapters below restore
// novel-isr-ui's exact names and prop shapes (`isOpen` / `onClose`,
// `isConfirming`, `showArrow`, sizes "sm" | "md" | "lg" ...). The compound
// parts whose API is unchanged (Radix-shaped roots, triggers, sections) are
// re-exported directly. All render the same `ui-*` class hooks.
//
// Built-in texts: the adapters pass @novel-isr/ui's original (Chinese)
// defaults explicitly, so the compat layer never depends on lib-core's
// active language. Consumer props still override them.
import { useMemo, type ReactNode } from "react";
import {
  Modal as MinervaModal,
  ModalContent as MinervaModalContent,
  type ModalContentProps as MinervaModalContentProps,
  type ModalSize as MinervaModalSize,
} from "../components/Modal";
import {
  ConfirmDialog as MinervaConfirmDialog,
  confirm as minervaConfirm,
  useConfirm as useMinervaConfirm,
  type ConfirmIntent,
  type ConfirmOptions as MinervaConfirmOptions,
} from "../components/Confirm";
import {
  Drawer as MinervaDrawer,
  DrawerContent as MinervaDrawerContent,
  type DrawerContentProps as MinervaDrawerContentProps,
  type DrawerSide,
  type DrawerSize as MinervaDrawerSize,
} from "../components/Drawer";
import {
  CommandDialog as MinervaCommandDialog,
  type CommandItem,
} from "../components/Command";
import {
  PopoverContent as MinervaPopoverContent,
  type PopoverContentProps as MinervaPopoverContentProps,
} from "../components/Popover";

/** @novel-isr/ui's built-in texts. */
const NOVEL_TEXT = {
  close: "关闭",
  cancel: "取消",
  confirm: "确定",
  delete: "删除",
  drawerDescription: "Drawer content",
  commandTitle: "命令面板",
  commandDescription: "搜索并跳转到后台模块、配置页或操作入口。",
  commandPlaceholder: "搜索命令、路径或关键字",
  commandEmpty: "没有匹配结果",
  commandResults: "命令结果",
  commandEnter: "Enter",
} as const;

// ---- Modal ----

export {
  ModalRoot,
  ModalTrigger,
  ModalClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/Modal";
export type {
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "../components/Modal";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const MODAL_SIZE: Record<ModalSize, MinervaModalSize> = {
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "xlarge",
  full: "full",
};

export interface ModalContentProps extends Omit<
  MinervaModalContentProps,
  "size"
> {
  size?: ModalSize;
  /** 不渲染右上角 × 关闭按钮 */
  hideCloseButton?: boolean;
  /** a11y 描述；不传时会渲染 visually-hidden 描述 */
  description?: ReactNode;
}

export const ModalContent = ({
  size = "md",
  closeLabel = NOVEL_TEXT.close,
  ...props
}: ModalContentProps) => (
  <MinervaModalContent
    size={MODAL_SIZE[size]}
    closeLabel={closeLabel}
    {...props}
  />
);

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  size?: ModalSize;
  hideCloseButton?: boolean;
  children: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  size = "md",
  ...props
}: ModalProps) => (
  <MinervaModal
    open={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
    size={MODAL_SIZE[size]}
    closeLabel={NOVEL_TEXT.close}
    {...props}
  />
);

// ---- Confirm ----

export type { ConfirmIntent };

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: ReactNode;
  description?: ReactNode;
  /** 确认按钮文案，默认「确定」；danger intent 默认「删除」 */
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  /** 默认 primary；危险操作给 danger（红色按钮） */
  intent?: ConfirmIntent;
  /** 确认按钮 loading 态 */
  isConfirming?: boolean;
}

export type ConfirmOptions = Omit<
  ConfirmDialogProps,
  "isOpen" | "onClose" | "onConfirm"
>;

type ConfirmRequestFn = (options: ConfirmOptions) => Promise<boolean>;

const toMinervaOptions = ({
  isConfirming,
  confirmLabel,
  cancelLabel = NOVEL_TEXT.cancel,
  ...options
}: ConfirmOptions): MinervaConfirmOptions => ({
  ...options,
  closeLabel: NOVEL_TEXT.close,
  confirmLabel:
    confirmLabel ??
    (options.intent === "danger" ? NOVEL_TEXT.delete : NOVEL_TEXT.confirm),
  cancelLabel,
  loading: isConfirming,
  // novel's Button set the native `disabled` while loading.
  confirmDisabled: isConfirming,
});

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  ...options
}: ConfirmDialogProps) => (
  <MinervaConfirmDialog
    open={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
    onConfirm={onConfirm}
    {...toMinervaOptions(options)}
  />
);

/** Global imperative confirm (provider first, standalone host otherwise, false on the server). */
export const confirm: ConfirmRequestFn = (options) =>
  minervaConfirm(toMinervaOptions(options));

/** The nearest ConfirmProvider's confirm, or the global `confirm` outside one. */
export const useConfirm = (): ConfirmRequestFn => {
  const ask = useMinervaConfirm();
  return useMemo(
    () =>
      ask === minervaConfirm
        ? confirm
        : (options: ConfirmOptions) => ask(toMinervaOptions(options)),
    [ask],
  );
};

export { ConfirmProvider } from "../components/Confirm";

// ---- Drawer ----

export {
  DrawerRoot,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "../components/Drawer";
export type { DrawerSide };

export type DrawerSize = "sm" | "md" | "lg" | "full";

const DRAWER_SIZE: Record<DrawerSize, MinervaDrawerSize> = {
  sm: "small",
  md: "medium",
  lg: "large",
  full: "full",
};

export interface DrawerContentProps extends Omit<
  MinervaDrawerContentProps,
  "size"
> {
  side?: DrawerSide;
  size?: DrawerSize;
  hideCloseButton?: boolean;
  closeLabel?: string;
  description?: ReactNode;
}

export const DrawerContent = ({
  size = "md",
  closeLabel = NOVEL_TEXT.close,
  hiddenDescription = NOVEL_TEXT.drawerDescription,
  ...props
}: DrawerContentProps) => (
  <MinervaDrawerContent
    size={DRAWER_SIZE[size]}
    closeLabel={closeLabel}
    hiddenDescription={hiddenDescription}
    {...props}
  />
);

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: ReactNode;
  description?: ReactNode;
  hideCloseButton?: boolean;
  children: ReactNode;
}

export const Drawer = ({
  isOpen,
  onClose,
  size = "md",
  ...props
}: DrawerProps) => (
  <MinervaDrawer
    open={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
    size={DRAWER_SIZE[size]}
    closeLabel={NOVEL_TEXT.close}
    hiddenDescription={NOVEL_TEXT.drawerDescription}
    {...props}
  />
);

// ---- Command ----

export { normalizeShortcuts, matchesShortcut } from "../components/Command";
export type { CommandItem };

export interface CommandDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  title?: ReactNode;
  /** a11y 描述，供屏幕阅读器说明这个命令面板的用途。 */
  description?: ReactNode;
  placeholder?: string;
  emptyText?: ReactNode;
  shortcutLabel?: ReactNode;
  /**
   * Global keyboard shortcut handled by the component itself.
   * Example: "mod+k" means Cmd+K on macOS and Ctrl+K elsewhere.
   */
  shortcut?: string | string[];
  maxResults?: number;
  className?: string;
}

/** @novel-isr/ui used each item's id as its option's DOM id. */
const novelOptionId = (item: CommandItem) => item.id;

export const CommandDialog = ({
  isOpen,
  title = NOVEL_TEXT.commandTitle,
  description = NOVEL_TEXT.commandDescription,
  placeholder = NOVEL_TEXT.commandPlaceholder,
  emptyText = NOVEL_TEXT.commandEmpty,
  ...props
}: CommandDialogProps) => (
  <MinervaCommandDialog
    open={isOpen}
    title={title}
    description={description}
    placeholder={placeholder}
    emptyText={emptyText}
    resultsLabel={NOVEL_TEXT.commandResults}
    enterLabel={NOVEL_TEXT.commandEnter}
    getOptionId={novelOptionId}
    {...props}
  />
);

// ---- Popover ----

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
} from "../components/Popover";
export type { PopoverSide, PopoverAlign } from "../components/Popover";

export interface PopoverContentProps extends Omit<
  MinervaPopoverContentProps,
  "arrow"
> {
  showArrow?: boolean;
}

export const PopoverContent = ({
  showArrow = false,
  ...props
}: PopoverContentProps) => (
  <MinervaPopoverContent arrow={showArrow} {...props} />
);
