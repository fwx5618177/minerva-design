import type { DrawerProps } from "./drawer-types";
export interface ModalProps extends Omit<
  DrawerProps,
  "size" | "side" | "placement"
> {
  size?: "small" | "medium" | "large" | "xlarge" | "full";
}
export interface DialogSurfaceProps extends ModalProps {
  kind: "modal" | "drawer";
  side?: "left" | "right" | "top" | "bottom";
  placement?: string;
}
