import { useEffect, useRef } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type AccessibilityActionEvent,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { createDisclosureMachine } from "@minerva/core";
import {
  MinervaProvider,
  useI18n,
  useInsets,
  useTheme,
} from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { useMachine } from "../../internal/useMachine";

/** An image of `ImagePreview`: a URI or an `Image` source */
export type ImagePreviewImage = string | ImageSourcePropType;

/** Why the preview closed */
export type ImagePreviewCloseReason = "close-button" | "image" | "back";

export interface ImagePreviewProps {
  /** Images to page through */
  images: readonly ImagePreviewImage[];
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("close-button", "image" for a press on the image, "back")
   */
  onOpenChange?: (open: boolean, reason?: ImagePreviewCloseReason) => void;
  /** Index of the shown image (controlled; pair with `onChange`) */
  index?: number;
  /**
   * Index of the image shown first (uncontrolled)
   * @default 0
   */
  defaultIndex?: number;
  /** Called with the index of the image paged to */
  onChange?: (index: number) => void;
  /**
   * Closes on a press on the image
   * @default true
   */
  closeOnPress?: boolean;
  /**
   * Shows the "index / total" counter
   * @default true
   */
  showIndex?: boolean;
  /**
   * Shows the close button
   * @default true
   */
  closeable?: boolean;
  /** Accessible label of the viewer @default the "imagePreview.label" message */
  accessibilityLabel?: string;
  /** Accessible label of the close button @default the "imagePreview.close" message */
  closeLabel?: string;
  /** Style of the full-screen container */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const sourceOf = (image: ImagePreviewImage): ImageSourcePropType =>
  typeof image === "string" ? { uri: image } : image;

const clampIndex = (value: number, total: number) =>
  Math.max(0, Math.min(total - 1, Math.round(value)));

/**
 * Full-screen image viewer: swipes between images (paging), shows an
 * "index / total" counter and a close button, closes on a press on the
 * image or the Android back button. Always dark (a nested dark
 * `MinervaProvider`). For screen readers the viewer is one adjustable
 * element: swipe up / down to change the image.
 */
export function ImagePreview(props: ImagePreviewProps) {
  const reason = useRef<ImagePreviewCloseReason | undefined>(undefined);
  const [state, send] = useMachine(createDisclosureMachine, {
    open: props.open,
    defaultOpen: props.defaultOpen ?? false,
    animated: false,
    onOpenChange: (next: boolean) =>
      props.onOpenChange?.(next, next ? undefined : reason.current),
  });
  const close = (why: ImagePreviewCloseReason) => {
    reason.current = why;
    send({ type: "CLOSE" });
  };
  const { reducedMotion } = useTheme();

  return (
    <Modal
      visible={state.open}
      transparent
      animationType={reducedMotion ? "none" : "fade"}
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => close("back")}
      testID={props.testID}
    >
      {state.open && (
        <MinervaProvider theme="dark">
          <Viewer {...props} onClose={close} />
        </MinervaProvider>
      )}
    </Modal>
  );
}

function Viewer({
  images,
  index,
  defaultIndex = 0,
  onChange,
  closeOnPress = true,
  showIndex = true,
  closeable = true,
  accessibilityLabel,
  closeLabel,
  style,
  onClose,
}: ImagePreviewProps & {
  onClose: (reason: ImagePreviewCloseReason) => void;
}) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const insets = useInsets();
  const { width, height } = useWindowDimensions();
  const total = images.length;
  const [current, setCurrent] = useControllable(index, defaultIndex, onChange);
  const shown = total ? clampIndex(current, total) : 0;
  const scroller = useRef<ScrollView>(null);
  const page = useRef(shown);

  // follow index changes made outside the pager (controlled prop, actions)
  useEffect(() => {
    if (page.current === shown) return;
    page.current = shown;
    scroller.current?.scrollTo({ x: shown * width, animated: true });
  }, [shown, width]);

  const go = (next: number) => {
    const target = clampIndex(next, total);
    if (target !== shown) setCurrent(target);
  };
  const onPageEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageWidth = event.nativeEvent.layoutMeasurement?.width || width;
    const next = clampIndex(
      event.nativeEvent.contentOffset.x / pageWidth,
      total,
    );
    page.current = next;
    if (next !== shown) setCurrent(next);
  };
  const counter = translate("imagePreview.counter", {
    index: shown + 1,
    total,
  });
  const onAction = (event: AccessibilityActionEvent) => {
    switch (event.nativeEvent.actionName) {
      case "increment":
        go(shown + 1);
        break;
      case "decrement":
        go(shown - 1);
        break;
      case "activate":
        if (closeOnPress) onClose("image");
        break;
    }
  };
  const light = t.colors["text-color"];
  const buttonSize = 36;

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: t.colors["background-color"] },
        style,
      ]}
      {...part("image-preview", "root")}
    >
      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={
          accessibilityLabel ?? translate("imagePreview.label")
        }
        accessibilityValue={{ text: counter }}
        accessibilityActions={[
          { name: "increment" },
          { name: "decrement" },
          ...(closeOnPress ? [{ name: "activate" }] : []),
        ]}
        onAccessibilityAction={onAction}
        style={StyleSheet.absoluteFill}
      >
        <ScrollView
          ref={scroller}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: shown * width, y: 0 }}
          onMomentumScrollEnd={onPageEnd}
          {...part("image-preview", "track")}
        >
          {images.map((image, i) => (
            <Pressable
              key={i}
              accessible={false}
              disabled={!closeOnPress}
              onPress={() => onClose("image")}
              style={{ width, height, justifyContent: "center" }}
              {...part("image-preview", "item", { active: i === shown })}
            >
              <Image
                source={sourceOf(image)}
                resizeMode="contain"
                style={{ width, height }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top + t.space["2"],
          paddingHorizontal: t.space["4"],
          minHeight: buttonSize,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showIndex && total > 0 && (
          <Text
            accessible={false}
            importantForAccessibility="no"
            style={[
              textStyle(t, "md", fonts.sans),
              { color: light, fontWeight: weight(t, "medium") },
            ]}
            {...part("image-preview", "index")}
          >
            {counter}
          </Text>
        )}
        {closeable && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={closeLabel ?? translate("imagePreview.close")}
            hitSlop={hitSlopFor(t, buttonSize, buttonSize)}
            onPress={() => onClose("close-button")}
            style={({ pressed }) => ({
              position: "absolute",
              top: insets.top + t.space["2"],
              right: t.space["4"],
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed
                ? t.colors["surface-muted-color"]
                : t.colors["overlay-color"],
            })}
            {...part("image-preview", "close")}
          >
            <Icon name="close" size={16} color={light} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
