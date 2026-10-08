// React Native's `Modal` for the docs previews: a layer filling the phone
// screen of the closest PhoneFrame (portal into its overlay host), instead
// of react-native-web's body-level Modal. Escape requests a close like the
// Android back button (`onRequestClose`).
import React, { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

/** Element hosting the modals of a phone frame */
export const ModalHostContext = createContext<HTMLElement | null>(null);

export interface FramedModalProps {
  visible?: boolean;
  transparent?: boolean;
  animationType?: string;
  onRequestClose?: () => void;
  onShow?: () => void;
  testID?: string;
  children?: React.ReactNode;
  [prop: string]: unknown;
}

export function FramedModal({
  visible = true,
  onRequestClose,
  onShow,
  testID,
  children,
}: FramedModalProps) {
  const host = useContext(ModalHostContext);

  useEffect(() => {
    if (!visible) return;
    onShow?.();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onRequestClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // onShow / onRequestClose: latest props on each open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;
  const layer = (
    <div
      data-testid={testID}
      data-native-modal=""
      style={{
        position: host ? "absolute" : "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
  return createPortal(layer, host ?? document.body);
}
