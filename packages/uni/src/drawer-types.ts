import type { ComputedRef, Ref } from "vue";
export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  title?: string;
  description?: string;
  hiddenDescription?: string;
  closeOnOverlayClick?: boolean;
  disabled?: boolean;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  placement?: string;
  side?: "left" | "right" | "top" | "bottom";
  size?: "small" | "medium" | "large" | "full";
  hideCloseButton?: boolean;
  closeLabel?: string;
  forceMount?: boolean;
  modal?: boolean;
  role?: "dialog" | "alertdialog";
  overlayClassName?: string;
}
export interface DrawerContext {
  open: ComputedRef<boolean>;
  modal: ComputedRef<boolean>;
  setOpen: (open: boolean) => void;
  trigger: Ref<unknown>;
}
