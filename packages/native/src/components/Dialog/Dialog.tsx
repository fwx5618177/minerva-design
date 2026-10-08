import type { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useOverlay } from "../../internal/useOverlay";
import { Button } from "../Button";

/** Why a dialog closed */
export type DialogCloseReason = OverlayCloseReason;

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("mask", "back" for the Android back button, "close-button", "cancel",
   * "confirm")
   */
  onOpenChange?: (open: boolean, reason?: DialogCloseReason) => void;
  /** Title (also the accessible name of the dialog) */
  title?: ReactNode;
  /** Text under the title */
  description?: ReactNode;
  /** Body content */
  children?: ReactNode;
  /** Custom footer, replacing the confirm / cancel buttons */
  footer?: ReactNode;
  /** Label of the confirm button (shown when set or with `onConfirm`) */
  confirmLabel?: ReactNode;
  /** Label of the cancel button (shown when set or with `onCancel`) */
  cancelLabel?: ReactNode;
  /** Called by the confirm button; the dialog then closes unless `confirmLoading` */
  onConfirm?: () => void;
  /** Called by the cancel button; the dialog then closes */
  onCancel?: () => void;
  /**
   * Color of the confirm button
   * @default "primary"
   */
  confirmColor?: "primary" | "danger" | "warning" | "success";
  /**
   * Spinner on the confirm button; the dialog stays open
   * @default false
   */
  confirmLoading?: boolean;
  /**
   * Width preset (`full`: the whole screen)
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | "full";
  /**
   * Hides the close (×) button
   * @default false
   */
  hideCloseButton?: boolean;
  /** Accessible label of the close button @default the "modal.close" message */
  closeLabel?: string;
  /**
   * Closes on a press on the mask
   * @default true
   */
  closeOnMaskPress?: boolean;
  /**
   * `alertdialog` for confirmations that need an answer
   * @default "dialog"
   */
  role?: "dialog" | "alertdialog";
  /** Style of the panel */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const WIDTH = { small: 320, medium: 420, large: 560 } as const;

/**
 * A centered modal dialog (alias `Modal`): title, description, body, and
 * confirm / cancel buttons or a custom footer. Closes on the mask, the close
 * button and the Android back button; the open state runs on the disclosure
 * machine of @minerva/core (controlled or not).
 */
export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  children,
  footer,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmColor = "primary",
  confirmLoading = false,
  size = "medium",
  hideCloseButton = false,
  closeLabel,
  closeOnMaskPress = true,
  role = "dialog",
  style,
  testID,
}: DialogProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  if (overlay.state.phase === "closed") return null;

  const showConfirm = confirmLabel !== undefined || onConfirm !== undefined;
  const showCancel = cancelLabel !== undefined || onCancel !== undefined;
  const closeSize = 24;
  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const sans = fonts.sans;

  return (
    <Overlay
      component="modal"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      closeOnMaskPress={closeOnMaskPress}
      testID={testID}
      panelProps={{
        role,
        accessibilityLabel: titleText,
      }}
      panelStyle={[
        size === "full"
          ? { maxWidth: undefined, flex: 1, borderRadius: t.radius.lg }
          : { maxWidth: WIDTH[size] },
        style,
      ]}
    >
      <View
        style={{
          padding: t.space["6"],
          paddingBottom: t.space["4"],
          gap: t.space["2"],
        }}
        {...part("modal", "header")}
      >
        {title !== undefined && (
          <Text
            accessibilityRole="header"
            style={[
              textStyle(t, "lg", sans),
              {
                fontWeight: weight(t, "semibold"),
                textAlign: "center",
                paddingHorizontal: hideCloseButton ? 0 : closeSize,
              },
            ]}
            {...part("modal", "title")}
          >
            {title}
          </Text>
        )}
        {description !== undefined && (
          <Text
            style={[
              textStyle(t, "md", sans),
              {
                color: t.colors["text-secondary-color"],
                textAlign: "center",
              },
            ]}
            {...part("modal", "description")}
          >
            {description}
          </Text>
        )}
      </View>
      {children !== undefined && (
        <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: t.space["6"],
            paddingBottom: t.space["4"],
          }}
          {...part("modal", "body")}
        >
          {typeof children === "string" ? (
            <Text style={textStyle(t, "md", sans)}>{children}</Text>
          ) : (
            children
          )}
        </ScrollView>
      )}
      {footer !== undefined ? (
        <View
          style={{ padding: t.space["4"], paddingTop: 0 }}
          {...part("modal", "footer")}
        >
          {footer}
        </View>
      ) : showConfirm || showCancel ? (
        <View
          style={{
            flexDirection: "row",
            gap: t.space["3"],
            padding: t.space["4"],
            paddingTop: t.space["2"],
          }}
          {...part("modal", "footer")}
        >
          {showCancel && (
            <Button
              variant="outline"
              color="neutral"
              style={{ flex: 1 }}
              onPress={() => {
                onCancel?.();
                overlay.close("cancel");
              }}
            >
              {cancelLabel ?? translate("confirm.cancel")}
            </Button>
          )}
          {showConfirm && (
            <Button
              color={confirmColor}
              loading={confirmLoading}
              style={{ flex: 1 }}
              onPress={() => {
                onConfirm?.();
                if (!confirmLoading) overlay.close("confirm");
              }}
            >
              {confirmLabel ?? translate("confirm.confirm")}
            </Button>
          )}
        </View>
      ) : null}
      {!hideCloseButton && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={closeLabel ?? translate("modal.close")}
          hitSlop={hitSlopFor(t, closeSize, closeSize)}
          onPress={() => overlay.close("close-button")}
          style={({ pressed }) => ({
            position: "absolute",
            top: t.space["4"],
            right: t.space["4"],
            width: closeSize,
            height: closeSize,
            borderRadius: closeSize / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed
              ? t.colors["surface-muted-color"]
              : "transparent",
          })}
          {...part("modal", "close")}
        >
          <Icon name="close" size={14} color={t.colors["text-muted-color"]} />
        </Pressable>
      )}
    </Overlay>
  );
}

/** `Dialog` under the name of the web component library */
export const Modal = Dialog;
