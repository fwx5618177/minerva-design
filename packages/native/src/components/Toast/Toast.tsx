import {
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  AccessibilityInfo,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  TOAST_DEFAULT_DURATION,
  TOAST_DEFAULT_EXIT_DURATION,
  createToastQueue,
  getToastOverflow,
  type ToastQueue,
  type ToastQueueId,
  type ToastQueueItem,
} from "@minerva/core";
import { useI18n, useInsets, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import {
  colorRole,
  duration as tokenDuration,
  hitSlopFor,
  shadowStyle,
  textStyle,
  weight,
} from "../../internal/styles";

export type ToastId = ToastQueueId;
export type ToastColor = "info" | "success" | "warning" | "danger";

/** Button rendered inside a toast; pressing it also closes the toast */
export interface ToastAction {
  /** Visible text of the button */
  label: ReactNode;
  /** Called when the button is pressed, before the toast closes */
  onClick: () => void;
}

/** Options of a toast */
export interface ToastOptions {
  /**
   * Identifier; showing a toast with the id of a visible one replaces it
   * (and restarts its timer). Generated when omitted
   */
  id?: ToastId;
  /** Semantic color: accent, icon and role ("alert" for danger / warning) */
  color?: ToastColor;
  /** Spinner instead of the icon; no auto-close by default */
  loading?: boolean;
  /** Main text (announced when the toast appears) */
  title?: ReactNode;
  /** Secondary text under the title */
  description?: ReactNode;
  /** Auto-close delay in ms; 0 keeps the toast open */
  duration?: number;
  /** Custom icon; `null` hides it */
  icon?: ReactNode | null;
  /** Shows the close button (default true) */
  closable?: boolean;
  /** Action button (e.g. "Undo") */
  action?: ToastAction;
  /** Called once with the id when the toast starts closing */
  onClose?: (id: ToastId) => void;
}

/** Messages of `toast.promise` */
export interface ToastPromiseMessages<T> {
  loading: ReactNode;
  success: ReactNode | ((value: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
}

/** The `toast` function and the API returned by `useToast()` */
export interface ToastApi {
  /** Shows a toast from options, or a title and options; returns its id */
  (titleOrOptions: ReactNode | ToastOptions, options?: ToastOptions): ToastId;
  info: (title: ReactNode, options?: ToastOptions) => ToastId;
  success: (title: ReactNode, options?: ToastOptions) => ToastId;
  warning: (title: ReactNode, options?: ToastOptions) => ToastId;
  danger: (title: ReactNode, options?: ToastOptions) => ToastId;
  /** Spinner toast without auto-close (update or dismiss it later) */
  loading: (title: ReactNode, options?: ToastOptions) => ToastId;
  /** Loading toast while the promise is pending, then success / danger */
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: Omit<ToastOptions, "color" | "loading" | "title">,
  ) => Promise<T>;
  /** Changes an open toast in place and restarts its timer */
  update: (id: ToastId, options: Omit<ToastOptions, "id">) => void;
  /** Closes a toast, or every toast when no id is given */
  dismiss: (id?: ToastId) => void;
  /** Closes every toast */
  dismissAll: () => void;
}

/** A toast queue of React nodes (`createToastQueue` of @minerva/core) */
export type NativeToastQueue = ToastQueue<ReactNode>;
type Item = ToastQueueItem<ReactNode>;

/** The default queue, shared by `toast` and every `ToastProvider` without `queue` */
export const toastQueue: NativeToastQueue = createToastQueue<ReactNode>();

/** Default durations set by the providers of each queue */
const providerDurations = new WeakMap<NativeToastQueue, number>();
const apis = new WeakMap<NativeToastQueue, ToastApi>();

const isOptions = (value: unknown): value is ToastOptions =>
  typeof value === "object" &&
  value !== null &&
  !isValidElement(value) &&
  !Array.isArray(value);

/** Builds the `toast` API over a queue */
export function createToastApi(queue: NativeToastQueue): ToastApi {
  const cached = apis.get(queue);
  if (cached) return cached;
  const show = (options: ToastOptions): ToastId => {
    const fallback = providerDurations.get(queue);
    return queue.add({
      ...options,
      duration:
        options.duration ??
        (options.loading || fallback === undefined ? undefined : fallback),
    });
  };
  const fn = ((
    titleOrOptions: ReactNode | ToastOptions,
    options?: ToastOptions,
  ) =>
    isOptions(titleOrOptions)
      ? show(titleOrOptions)
      : show({ ...options, title: titleOrOptions })) as ToastApi;
  fn.info = (title, opts) => show({ ...opts, title, color: "info" });
  fn.success = (title, opts) => show({ ...opts, title, color: "success" });
  fn.warning = (title, opts) => show({ ...opts, title, color: "warning" });
  fn.danger = (title, opts) => show({ ...opts, title, color: "danger" });
  fn.loading = (title, opts) => show({ ...opts, title, loading: true });
  fn.promise = (promise, messages, opts) => {
    const id = show({ ...opts, title: messages.loading, loading: true });
    const settle = (color: "success" | "danger", title: ReactNode) =>
      queue.update(id, { ...opts, title, color, loading: false });
    promise.then(
      (value) =>
        settle(
          "success",
          typeof messages.success === "function"
            ? messages.success(value)
            : messages.success,
        ),
      (error: unknown) =>
        settle(
          "danger",
          typeof messages.error === "function"
            ? messages.error(error)
            : messages.error,
        ),
    );
    return promise;
  };
  fn.update = (id, opts) => queue.update(id, opts);
  fn.dismiss = (id) =>
    id === undefined ? queue.dismissAll() : queue.dismiss(id);
  fn.dismissAll = () => queue.dismissAll();
  apis.set(queue, fn);
  return fn;
}

/**
 * Shows a toast from anywhere (no hook needed): `toast("Saved")`,
 * `toast({ title, description, color })`, `toast.success(title, options)`,
 * `toast.loading(title)`, `toast.update(id, options)`, `toast.dismiss(id)`,
 * `toast.dismissAll()`. A `ToastProvider` (without `queue`) renders them.
 */
export const toast: ToastApi = createToastApi(toastQueue);

const ToastContext = createContext<NativeToastQueue | null>(null);

/** The toast API bound to the queue of the nearest `ToastProvider` */
export function useToast(): ToastApi {
  const queue = useContext(ToastContext) ?? toastQueue;
  return useMemo(() => createToastApi(queue), [queue]);
}

/** Mobile positions, and the web contract's corners (mapped to top / bottom) */
export type ToastPosition =
  | "top"
  | "center"
  | "bottom"
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps {
  /** Application content; the toast layer is drawn over it */
  children?: ReactNode;
  /**
   * Where the toasts are stacked. Mobile default "top" (the web default is
   * "top-right"); the web corners map to "top" / "bottom" (toasts span the
   * screen width on phones)
   * @default "top"
   */
  position?: ToastPosition;
  /** Maximum number of toasts shown at once; the oldest close first ("overflow") */
  max?: number;
  /**
   * Default auto-close delay of the toasts shown without `duration` (ms;
   * 0 keeps them open)
   * @default 4000
   */
  duration?: number;
  /** Accessible label of the close buttons @default the "toast.close" message */
  closeLabel?: string;
  /** Accessible label of the toast layer @default the "toast.region" message */
  accessibilityLabel?: string;
  /**
   * Pauses the auto-close timer while a toast is pressed
   * @default true
   */
  pauseOnPress?: boolean;
  /** Queue rendered by this provider @default the shared `toastQueue` */
  queue?: NativeToastQueue;
  /** Style of the toast layer */
  style?: StyleProp<ViewStyle>;
}

const nativeDriver = Platform.OS !== "web";
const textual = (node: ReactNode): node is string | number =>
  typeof node === "string" || typeof node === "number";

interface ToastItemProps {
  item: Item;
  queue: NativeToastQueue;
  closeLabel: string;
  pauseOnPress: boolean;
  fromTop: boolean;
}

function ToastItem({
  item,
  queue,
  closeLabel,
  pauseOnPress,
  fromTop,
}: ToastItemProps) {
  const { tokens: t, fonts } = useTheme();
  const [progress] = useState(() => new Animated.Value(0));
  const ms = tokenDuration(t, "base");
  const exit = Math.min(ms, TOAST_DEFAULT_EXIT_DURATION);
  const closing = item.state === "closing";

  useEffect(() => {
    const to = closing ? 0 : 1;
    const time = closing ? exit : ms;
    if (time <= 0) {
      progress.setValue(to);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: to,
      duration: time,
      easing: closing ? Easing.in(Easing.cubic) : Easing.out(Easing.cubic),
      useNativeDriver: nativeDriver,
    });
    anim.start();
    return () => anim.stop();
  }, [closing, exit, ms, progress]);

  const titleText = textual(item.title) ? String(item.title) : undefined;
  const descriptionText = textual(item.description)
    ? String(item.description)
    : undefined;
  useEffect(() => {
    if (titleText) AccessibilityInfo.announceForAccessibility?.(titleText);
  }, [titleText]);

  const c = colorRole(t, item.color);
  const urgent =
    !item.loading && (item.color === "danger" || item.color === "warning");
  const iconSize = 20;
  const closeSize = 28;
  const icon =
    item.icon === null ? null : item.icon !== undefined ? (
      item.icon
    ) : item.loading ? (
      <ActivityIndicator size="small" color={c.solid} />
    ) : (
      <Icon
        name={item.color}
        size={iconSize}
        color={c.solid}
        contrast={c.onSolid}
      />
    );

  return (
    <Animated.View
      {...part("toast", "root", {
        color: item.color,
        state: item.state,
        loading: item.loading,
      })}
      style={{
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        opacity: progress,
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [fromTop ? -16 : 16, 0],
            }),
          },
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.97, 1],
            }),
          },
        ],
      }}
      pointerEvents={closing ? "none" : "box-none"}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["2"],
          paddingVertical: t.space["3"],
          paddingLeft: t.space["4"],
          paddingRight: item.closable ? t.space["2"] : t.space["4"],
          borderRadius: t.radius.lg,
          backgroundColor: t.colors["surface-elevated-color"],
          borderWidth: 1,
          borderColor: t.colors["border-color"],
          ...shadowStyle(t.shadows.lg),
        }}
      >
        <Pressable
          accessible
          role={urgent ? "alert" : "status"}
          accessibilityLiveRegion={urgent ? "assertive" : "polite"}
          accessibilityLabel={
            [titleText, descriptionText].filter(Boolean).join(". ") || undefined
          }
          accessibilityState={{ busy: item.loading || undefined }}
          aria-busy={item.loading || undefined}
          onPressIn={pauseOnPress ? () => queue.pause(item.id) : undefined}
          onPressOut={pauseOnPress ? () => queue.resume(item.id) : undefined}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: item.description ? "flex-start" : "center",
            gap: t.space["3"],
          }}
          {...part("toast", "content")}
        >
          {icon !== null && (
            <View
              style={{
                width: iconSize,
                minHeight: iconSize,
                alignItems: "center",
                justifyContent: "center",
                marginTop: item.description ? 1 : 0,
              }}
              {...part("toast", "icon")}
            >
              {icon}
            </View>
          )}
          <View style={{ flex: 1, gap: t.space["0-5"] }}>
            {item.title !== undefined &&
              item.title !== null &&
              (textual(item.title) ? (
                <Text
                  style={[
                    textStyle(t, "md", fonts.sans),
                    { fontWeight: weight(t, "semibold") },
                  ]}
                  {...part("toast", "title")}
                >
                  {item.title}
                </Text>
              ) : (
                item.title
              ))}
            {item.description !== undefined &&
              item.description !== null &&
              (textual(item.description) ? (
                <Text
                  style={[
                    textStyle(t, "sm", fonts.sans),
                    { color: t.colors["text-secondary-color"] },
                  ]}
                  {...part("toast", "description")}
                >
                  {item.description}
                </Text>
              ) : (
                item.description
              ))}
          </View>
        </Pressable>
        {item.action && (
          <Pressable
            accessibilityRole="button"
            hitSlop={hitSlopFor(t, 32)}
            onPress={() => {
              item.action?.onClick();
              queue.dismiss(item.id, "action");
            }}
            style={({ pressed }) => ({
              minHeight: 32,
              paddingHorizontal: t.space["3"],
              borderRadius: t.radius.md,
              justifyContent: "center",
              backgroundColor: pressed ? c.subtle : "transparent",
            })}
            {...part("toast", "action")}
          >
            {textual(item.action.label) ? (
              <Text
                style={[
                  textStyle(t, "sm", fonts.sans),
                  { color: c.text, fontWeight: weight(t, "semibold") },
                ]}
              >
                {item.action.label}
              </Text>
            ) : (
              item.action.label
            )}
          </Pressable>
        )}
        {item.closable && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
            hitSlop={hitSlopFor(t, closeSize, closeSize)}
            onPress={() => queue.dismiss(item.id, "close-button")}
            style={({ pressed }) => ({
              width: closeSize,
              height: closeSize,
              borderRadius: closeSize / 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed
                ? t.colors["surface-muted-color"]
                : "transparent",
            })}
            {...part("toast", "close")}
          >
            <Icon name="close" size={12} color={t.colors["text-muted-color"]} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const edgeOf = (position: ToastPosition): "top" | "center" | "bottom" =>
  position === "center"
    ? "center"
    : position.startsWith("bottom")
      ? "bottom"
      : "top";

/**
 * Renders the toasts of a queue (the shared `toastQueue` by default) as a
 * layer drawn over its children (not a Modal: the app stays interactive),
 * padded with the safe-area insets. Caps the visible toasts with `max`
 * (the oldest close with reason "overflow"), announces each new toast, and
 * pauses a toast's timer while it is pressed.
 */
export function ToastProvider({
  children,
  position = "top",
  max,
  duration = TOAST_DEFAULT_DURATION,
  closeLabel,
  accessibilityLabel,
  pauseOnPress = true,
  queue = toastQueue,
  style,
}: ToastProviderProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const insets = useInsets();
  const { toasts } = useSyncExternalStore(
    queue.subscribe,
    queue.getState,
    queue.getState,
  );

  useEffect(() => {
    providerDurations.set(queue, duration);
    return () => {
      if (providerDurations.get(queue) === duration)
        providerDurations.delete(queue);
    };
  }, [queue, duration]);

  useEffect(() => {
    if (max === undefined) return;
    for (const item of getToastOverflow(toasts, Math.max(0, max)))
      queue.dismiss(item.id, "overflow");
  }, [toasts, max, queue]);

  const edge = edgeOf(position);
  const shown = edge === "top" ? [...toasts].reverse() : toasts;
  const label = closeLabel ?? translate("toast.close");

  return (
    <ToastContext.Provider value={queue}>
      {children}
      {toasts.length > 0 && (
        <View
          pointerEvents="box-none"
          role="region"
          accessibilityLabel={accessibilityLabel ?? translate("toast.region")}
          {...part("toast", "region", { position: edge })}
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 1000,
              elevation: 1000,
              justifyContent:
                edge === "top"
                  ? "flex-start"
                  : edge === "bottom"
                    ? "flex-end"
                    : "center",
              paddingTop: insets.top + t.space["3"],
              paddingBottom: insets.bottom + t.space["3"],
              paddingLeft: insets.left + t.space["3"],
              paddingRight: insets.right + t.space["3"],
              gap: t.space["2"],
            },
            style,
          ]}
        >
          {shown.map((item) => (
            <ToastItem
              key={item.id}
              item={item}
              queue={queue}
              closeLabel={label}
              pauseOnPress={pauseOnPress}
              fromTop={edge !== "bottom"}
            />
          ))}
        </View>
      )}
    </ToastContext.Provider>
  );
}
