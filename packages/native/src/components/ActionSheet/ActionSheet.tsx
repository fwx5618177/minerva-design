import { Fragment, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { part } from "../../internal/parts";
import { colorRole, textStyle, weight } from "../../internal/styles";
import { useOverlay } from "../../internal/useOverlay";

/** Why an action sheet closed */
export type ActionSheetCloseReason = OverlayCloseReason;

/** An entry of the sheet */
export interface ActionSheetAction {
  /** Visible name (also the accessible name) */
  name: string;
  /** Secondary text under the name */
  subname?: string;
  /** Text color of the name (`danger` for destructive actions) */
  color?: "primary" | "success" | "warning" | "danger" | "info";
  /** Disables the entry */
  disabled?: boolean;
  /** Shows a spinner instead of the name and ignores presses */
  loading?: boolean;
  /** Element rendered before the name */
  icon?: ReactNode;
}

export interface ActionSheetProps {
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("action", "cancel", "mask", "back")
   */
  onOpenChange?: (open: boolean, reason?: ActionSheetCloseReason) => void;
  /** Title above the actions (also the accessible name of the sheet) */
  title?: ReactNode;
  /** Description under the title */
  description?: ReactNode;
  /**
   * The entries
   * @default []
   */
  actions?: ActionSheetAction[];
  /** Called with the pressed action and its index */
  onSelect?: (action: ActionSheetAction, index: number) => void;
  /**
   * Closes the sheet after an action is pressed
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Text of the cancel button; `null` hides it
   * @default the "actionSheet.cancel" message
   */
  cancelText?: ReactNode | null;
  /** Called by the cancel button */
  onCancel?: () => void;
  /**
   * Closes on a press on the mask
   * @default true
   */
  closeOnMaskPress?: boolean;
  /**
   * Pads the sheet with the bottom safe-area inset (home indicator)
   * @default true
   */
  safeArea?: boolean;
  /** Custom content rendered instead of the actions */
  children?: ReactNode;
  /** Style of the sheet */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * An iOS-style action sheet sliding up from the bottom: optional title and
 * description, a list of actions (subname, color, icon, disabled, loading)
 * and a cancel button, padded for the home indicator. Runs on the
 * disclosure machine of @minerva/core (controlled or not).
 */
export function ActionSheet({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  actions = [],
  onSelect,
  closeOnSelect = true,
  cancelText,
  onCancel,
  closeOnMaskPress = true,
  safeArea = true,
  children,
  style,
  testID,
}: ActionSheetProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  if (overlay.state.phase === "closed") return null;

  const cancel =
    cancelText === undefined ? translate("actionSheet.cancel") : cancelText;
  const rowHeight = Math.max(t.touchTargetMin, 44) + t.space["2"];
  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const hasHeader =
    (title !== undefined && title !== null) ||
    (description !== undefined && description !== null);
  const divider = {
    height: 1,
    backgroundColor: t.colors["border-color"],
    marginHorizontal: 0,
  } as const;
  const rowStyle = (pressed: boolean, inactive: boolean): ViewStyle => ({
    minHeight: rowHeight,
    paddingHorizontal: t.space["4"],
    paddingVertical: t.space["2-5"],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      pressed && !inactive ? t.colors["surface-muted-color"] : "transparent",
  });

  return (
    <Overlay
      component="action-sheet"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      placement="bottom"
      closeOnMaskPress={closeOnMaskPress}
      safeArea={safeArea}
      testID={testID}
      panelProps={{ role: "dialog", accessibilityLabel: titleText }}
      panelStyle={[{ overflow: "hidden" }, style]}
    >
      {hasHeader && (
        <View
          style={{
            paddingHorizontal: t.space["5"],
            paddingVertical: t.space["4"],
            gap: t.space["1"],
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: t.colors["border-color"],
          }}
          {...part("action-sheet", "header")}
        >
          {title !== undefined && title !== null && (
            <Text
              accessibilityRole="header"
              style={[
                textStyle(t, "md", fonts.sans),
                { fontWeight: weight(t, "semibold"), textAlign: "center" },
              ]}
              {...part("action-sheet", "title")}
            >
              {title}
            </Text>
          )}
          {description !== undefined && description !== null && (
            <Text
              style={[
                textStyle(t, "sm", fonts.sans),
                { color: t.colors["text-muted-color"], textAlign: "center" },
              ]}
              {...part("action-sheet", "description")}
            >
              {description}
            </Text>
          )}
        </View>
      )}
      {children ?? (
        <ScrollView style={{ flexGrow: 0 }} {...part("action-sheet", "list")}>
          {actions.map((action, index) => {
            const inactive = !!action.disabled || !!action.loading;
            const tint = action.disabled
              ? t.colors["text-disabled-color"]
              : action.color
                ? colorRole(t, action.color).solid
                : t.colors["text-color"];
            return (
              <Fragment key={`${action.name}-${index}`}>
                {index > 0 && <View style={divider} />}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    action.subname
                      ? `${action.name}, ${action.subname}`
                      : action.name
                  }
                  accessibilityState={{
                    disabled: inactive,
                    busy: !!action.loading,
                  }}
                  aria-busy={!!action.loading}
                  disabled={inactive}
                  onPress={() => {
                    onSelect?.(action, index);
                    if (closeOnSelect) overlay.close("action");
                  }}
                  style={({ pressed }) => rowStyle(pressed, inactive)}
                  {...part("action-sheet", "item", {
                    disabled: !!action.disabled,
                    loading: !!action.loading,
                    color: action.color,
                  })}
                >
                  {action.loading ? (
                    <ActivityIndicator
                      size="small"
                      color={t.colors["text-muted-color"]}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: t.space["2"],
                        }}
                      >
                        {action.icon}
                        <Text
                          style={[
                            textStyle(t, "lg", fonts.sans),
                            { color: tint, textAlign: "center" },
                          ]}
                          {...part("action-sheet", "name")}
                        >
                          {action.name}
                        </Text>
                      </View>
                      {action.subname !== undefined && (
                        <Text
                          style={[
                            textStyle(t, "xs", fonts.sans),
                            {
                              color: t.colors["text-muted-color"],
                              marginTop: t.space["0-5"],
                              textAlign: "center",
                            },
                          ]}
                          {...part("action-sheet", "subname")}
                        >
                          {action.subname}
                        </Text>
                      )}
                    </>
                  )}
                </Pressable>
              </Fragment>
            );
          })}
        </ScrollView>
      )}
      {cancel !== null && cancel !== false && (
        <>
          <View
            style={{
              height: t.space["2"],
              backgroundColor: t.colors["surface-muted-color"],
            }}
            {...part("action-sheet", "gap")}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              onCancel?.();
              overlay.close("cancel");
            }}
            style={({ pressed }) => rowStyle(pressed, false)}
            {...part("action-sheet", "cancel")}
          >
            {typeof cancel === "string" || typeof cancel === "number" ? (
              <Text
                style={[
                  textStyle(t, "lg", fonts.sans),
                  {
                    color: t.colors["text-secondary-color"],
                    fontWeight: weight(t, "medium"),
                  },
                ]}
              >
                {cancel}
              </Text>
            ) : (
              cancel
            )}
          </Pressable>
        </>
      )}
    </Overlay>
  );
}
