import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type RefreshControlProps,
  type ScrollViewProps,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { textStyle } from "../../internal/styles";

/** Status of a pull to refresh */
export type PullRefreshStatus =
  "idle" | "pulling" | "loosing" | "loading" | "success";

/** Pull distance (dp) past which releasing refreshes (iOS overscroll) */
const LOOSE_DISTANCE = 64;

export interface UsePullRefreshOptions {
  /** Controlled refreshing state (unset: follows the `onRefresh` promise) */
  refreshing?: boolean;
  /** Disables the pull @default false */
  disabled?: boolean;
  /** How long the success status stays, in ms (0: none) @default 500 */
  successDuration?: number;
}

export interface UsePullRefreshResult {
  /** Whether a refresh is running */
  refreshing: boolean;
  /** Current status ("success" for `successDuration` after a refresh) */
  status: Exclude<PullRefreshStatus, "pulling" | "loosing">;
  /** Starts a refresh (what a pull does) */
  refresh: () => void;
  /**
   * A themed `RefreshControl`: pass it as the `refreshControl` of a
   * `FlatList`, `SectionList` or `ScrollView`
   */
  refreshControl: ReactElement<RefreshControlProps>;
}

const isThenable = (value: unknown): value is PromiseLike<unknown> =>
  typeof (value as PromiseLike<unknown> | undefined)?.then === "function";

/**
 * Pull-to-refresh state for any scrollable: calls `onRefresh` on a pull,
 * keeps `refreshing` true while the promise it returns is pending (or
 * follows the controlled `refreshing`), then reports "success" for
 * `successDuration`. Returns a token-colored `RefreshControl`.
 *
 *   const { refreshControl } = usePullRefresh(reload);
 *   <FlatList refreshControl={refreshControl} ... />
 */
export function usePullRefresh(
  onRefresh?: () => unknown,
  {
    refreshing,
    disabled = false,
    successDuration = 500,
  }: UsePullRefreshOptions = {},
): UsePullRefreshResult {
  const { tokens: t } = useTheme();
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const busy = refreshing ?? pending;
  // the end of a refresh (controlled or not) shows the success status
  const [wasBusy, setWasBusy] = useState(busy);
  if (wasBusy !== busy) {
    setWasBusy(busy);
    setSuccess(!busy && successDuration > 0);
  }
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), successDuration);
    return () => clearTimeout(timer);
  }, [success, successDuration]);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const handler = useRef(onRefresh);
  useEffect(() => {
    handler.current = onRefresh;
  });
  const controlled = refreshing !== undefined;
  const refresh = useCallback(() => {
    if (disabled || busy) return;
    const result = handler.current?.();
    if (controlled || !isThenable(result)) return;
    setPending(true);
    const done = () => {
      if (mounted.current) setPending(false);
    };
    result.then(done, done);
  }, [disabled, busy, controlled]);

  const refreshControl = (
    <RefreshControl
      refreshing={busy}
      onRefresh={refresh}
      enabled={!disabled}
      tintColor={t.colors["primary-color"]}
      colors={[t.colors["primary-color"]]}
      progressBackgroundColor={t.colors["surface-elevated-color"]}
      titleColor={t.colors["text-muted-color"]}
    />
  );

  return {
    refreshing: busy,
    status: busy ? "loading" : success ? "success" : "idle",
    refresh,
    refreshControl,
  };
}

export interface PullRefreshProps extends Omit<
  ScrollViewProps,
  "refreshControl" | "children"
> {
  /**
   * Controlled refreshing state; unset, it follows the promise returned by
   * `onRefresh`
   */
  refreshing?: boolean;
  /** Called on a pull; may return a promise (refreshing until it settles) */
  onRefresh?: () => unknown;
  /**
   * Disables the pull
   * @default false
   */
  disabled?: boolean;
  /** Text while pulling (iOS) @default the "pullRefresh.pulling" message */
  pullingText?: string;
  /**
   * Text when releasing would refresh (iOS)
   * @default the "pullRefresh.loosing" message
   */
  loosingText?: string;
  /** Text while refreshing @default the "pullRefresh.loading" message */
  loadingText?: string;
  /** Text after a refresh @default the "pullRefresh.success" message */
  successText?: string;
  /**
   * How long the success text stays, in ms (0: none)
   * @default 500
   */
  successDuration?: number;
  /** Scrollable content */
  children?: ReactNode;
}

/**
 * A `ScrollView` with pull to refresh: the platform `RefreshControl` in
 * the theme colors, a status line (refreshing / refreshed) announced to
 * screen readers, and `refreshing` managed from the promise `onRefresh`
 * returns. For lists, use `usePullRefresh` with a `FlatList`.
 */
export function PullRefresh({
  refreshing,
  onRefresh,
  disabled = false,
  pullingText,
  loosingText,
  loadingText,
  successText,
  successDuration = 500,
  children,
  onScroll,
  scrollEventThrottle,
  ...rest
}: PullRefreshProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const pull = usePullRefresh(onRefresh, {
    refreshing,
    disabled,
    successDuration,
  });
  const [pullStatus, setPullStatus] = useState<"idle" | "pulling" | "loosing">(
    "idle",
  );
  const status: PullRefreshStatus =
    pull.status === "idle" ? pullStatus : pull.status;
  const texts: Record<PullRefreshStatus, string> = {
    idle: "",
    pulling: pullingText ?? translate("pullRefresh.pulling"),
    loosing: loosingText ?? translate("pullRefresh.loosing"),
    loading: loadingText ?? translate("pullRefresh.loading"),
    success: successText ?? translate("pullRefresh.success"),
  };
  const announced = status === "loading" || status === "success";

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll?.(event);
    const y = event.nativeEvent.contentOffset.y;
    const next =
      disabled || pull.refreshing || y >= 0
        ? "idle"
        : y <= -LOOSE_DISTANCE
          ? "loosing"
          : "pulling";
    if (next !== pullStatus) setPullStatus(next);
  };

  return (
    <ScrollView
      {...part("pull-refresh", "root", { status })}
      accessibilityState={{ busy: pull.refreshing }}
      {...rest}
      onScroll={handleScroll}
      scrollEventThrottle={scrollEventThrottle ?? 16}
      refreshControl={
        <RefreshControl
          {...pull.refreshControl.props}
          title={
            pullStatus !== "idle" && !pull.refreshing
              ? texts[pullStatus]
              : undefined
          }
        />
      }
    >
      <View
        accessibilityLiveRegion="polite"
        aria-live="polite"
        style={{
          height: announced ? t.space["10"] : 0,
          overflow: "hidden",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...part("pull-refresh", "status")}
      >
        {announced && (
          <Text
            style={[
              textStyle(t, "sm", fonts.sans),
              { color: t.colors["text-muted-color"] },
            ]}
          >
            {texts[status]}
          </Text>
        )}
      </View>
      {children}
    </ScrollView>
  );
}
