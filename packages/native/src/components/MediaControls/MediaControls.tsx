import { useRef, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type AccessibilityActionEvent,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  DEFAULT_PLAYBACK_RATES,
  DEFAULT_SKIP_SECONDS,
  clampMediaTime,
  clampVolume,
  formatMediaTime,
  formatPlaybackRate,
  mediaProgress,
  nextPlaybackRate,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";

/** Look of the control bar: over a video (dark overlay) or an audio bar (surface) */
export type MediaControlsVariant = "video" | "audio";

export interface MediaControlsProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** Whether the media is playing (drives the play / pause button) */
  playing?: boolean;
  /** Playhead position, in seconds */
  currentTime?: number;
  /** Duration in seconds (0 while unknown: the seek bar is disabled) */
  duration?: number;
  /** Buffered position, in seconds (shown on the seek bar) */
  buffered?: number;
  /** Whether the media is muted (shows the mute button when onMutedChange is set) */
  muted?: boolean;
  /** Volume 0..1 (shows the volume bar when onVolumeChange is set) */
  volume?: number;
  /**
   * Current playback speed (shows the speed button when onRateChange is set)
   * @default 1
   */
  playbackRate?: number;
  /**
   * Speeds the speed button cycles through
   * @default [0.5, 0.75, 1, 1.25, 1.5, 2]
   */
  playbackRates?: readonly number[];
  /**
   * Step of the skip back / forward buttons, in seconds (0 hides them)
   * @default 10
   */
  skipSeconds?: number;
  /** Title of the media, shown above the controls */
  title?: string;
  /**
   * Shows the loading spinner (buffering)
   * @default false
   */
  loading?: boolean;
  /**
   * Shows the translated error message ("This media can't be played") and disables the play buttons
   * @default false
   */
  error?: boolean;
  /** Whether the player is fullscreen (shows the fullscreen button when onFullscreenChange is set) */
  fullscreen?: boolean;
  /**
   * Overlay over a video (dark translucent) or audio bar (surface)
   * @default "audio"
   */
  variant?: MediaControlsVariant;
  /** Called when the play / pause button is pressed */
  onPlayPause?: () => void;
  /** Called with the requested playhead position (seek bar, skip buttons, screen reader actions) */
  onSeek?: (seconds: number) => void;
  /** Called with the requested muted state */
  onMutedChange?: (muted: boolean) => void;
  /** Called with the requested volume (0..1) */
  onVolumeChange?: (volume: number) => void;
  /** Called with the next playback speed */
  onRateChange?: (rate: number) => void;
  /** Called with the requested fullscreen state */
  onFullscreenChange?: (fullscreen: boolean) => void;
  /** Style of the bar */
  style?: StyleProp<ViewStyle>;
}

const BUTTON = 36;

/** A touch track: reports the touched fraction (0..1) while dragging */
function Track({
  fraction,
  buffered,
  accent,
  color,
  disabled,
  onFraction,
  ...accessibility
}: {
  fraction: number;
  buffered?: number;
  accent: string;
  color: string;
  disabled?: boolean;
  onFraction: (fraction: number) => void;
} & ViewProps) {
  const width = useRef(0);
  const report = (event: GestureResponderEvent) => {
    if (disabled || width.current <= 0) return;
    const x = event.nativeEvent.locationX;
    onFraction(Math.min(1, Math.max(0, x / width.current)));
  };
  const pct = (value: number) => `${Math.min(1, Math.max(0, value)) * 100}%`;
  return (
    <View
      accessible
      {...accessibility}
      onLayout={(event: LayoutChangeEvent) => {
        width.current = event.nativeEvent.layout.width;
      }}
      onStartShouldSetResponder={() => !disabled}
      onMoveShouldSetResponder={() => !disabled}
      onResponderGrant={report}
      onResponderMove={report}
      style={{
        height: BUTTON,
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <View
        pointerEvents="none"
        style={{
          height: 4,
          borderRadius: 2,
          backgroundColor: color,
          opacity: 0.25,
        }}
      />
      {buffered !== undefined && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            height: 4,
            borderRadius: 2,
            width: pct(buffered) as `${number}%`,
            backgroundColor: color,
            opacity: 0.4,
          }}
        />
      )}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          height: 4,
          borderRadius: 2,
          width: pct(fraction) as `${number}%`,
          backgroundColor: accent,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: pct(fraction) as `${number}%`,
          width: 12,
          height: 12,
          marginLeft: -6,
          borderRadius: 6,
          backgroundColor: accent,
        }}
      />
    </View>
  );
}

/** Play triangle / pause bars drawn with views */
function PlayGlyph({ playing, color }: { playing: boolean; color: string }) {
  if (playing)
    return (
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View style={{ width: 4, height: 14, backgroundColor: color }} />
        <View style={{ width: 4, height: 14, backgroundColor: color }} />
      </View>
    );
  return (
    <View
      style={{
        marginLeft: 3,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderLeftWidth: 13,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: color,
      }}
    />
  );
}

/**
 * MediaControls: the themed control bar of MediaPlayer for React Native,
 * driven by props. Core React Native has no media element: render the
 * video / audio with expo-video, expo-audio or react-native-video and wire
 * its state (`playing`, `currentTime`, `duration`...) and commands
 * (`onPlayPause`, `onSeek`...) to these controls. Play / pause, skip back /
 * forward, a seek bar (adjustable for screen readers), the time, mute and
 * volume, the playback speed and fullscreen, plus a loading spinner and an
 * error message. Optional buttons only show when their callback is set.
 */
export function MediaControls({
  playing = false,
  currentTime = 0,
  duration = 0,
  buffered,
  muted = false,
  volume = 1,
  playbackRate = 1,
  playbackRates = DEFAULT_PLAYBACK_RATES,
  skipSeconds = DEFAULT_SKIP_SECONDS,
  title,
  loading = false,
  error = false,
  fullscreen = false,
  variant = "audio",
  onPlayPause,
  onSeek,
  onMutedChange,
  onVolumeChange,
  onRateChange,
  onFullscreenChange,
  style,
  accessibilityLabel,
  ...rest
}: MediaControlsProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const video = variant === "video";
  const color = video ? "#ffffff" : t.colors["text-color"];
  const accent = t.colors["primary-color"];
  const shownTime = currentTime;
  const seek = (seconds: number) => {
    if (duration) onSeek?.(clampMediaTime(seconds, duration));
  };
  const text = [textStyle(t, "sm", fonts.sans), { color }];
  const shownVolume = muted ? 0 : clampVolume(volume);

  const button = (
    label: string,
    content: ReactNode,
    onPress: (() => void) | undefined,
    options: { disabled?: boolean; selected?: boolean; name?: string } = {},
  ) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: !!options.disabled,
        ...(options.selected === undefined
          ? null
          : { selected: options.selected }),
      }}
      disabled={options.disabled}
      hitSlop={hitSlopFor(t, BUTTON, BUTTON)}
      onPress={onPress}
      style={({ pressed }) => ({
        minWidth: BUTTON,
        height: BUTTON,
        paddingHorizontal: t.space["1"],
        borderRadius: t.radius.md,
        alignItems: "center",
        justifyContent: "center",
        opacity: options.disabled ? 0.5 : 1,
        backgroundColor: pressed
          ? video
            ? "rgba(255,255,255,0.15)"
            : t.colors["surface-muted-color"]
          : "transparent",
      })}
      {...part(
        "media-controls",
        "button",
        options.name ? { name: options.name } : undefined,
      )}
    >
      {content}
    </Pressable>
  );

  const seekText = translate("mediaPlayer.timeOf", {
    current: formatMediaTime(shownTime, duration),
    duration: formatMediaTime(duration),
  });

  return (
    <View
      accessibilityRole="toolbar"
      accessibilityLabel={
        accessibilityLabel ?? title ?? translate("mediaPlayer.label")
      }
      {...part("media-controls", "root", {
        variant,
        status: playing ? "playing" : "paused",
        loading,
        invalid: error,
      })}
      {...rest}
      style={[
        {
          gap: t.space["1"],
          paddingHorizontal: t.space["3"],
          paddingVertical: t.space["2"],
          borderRadius: video ? 0 : t.radius.lg,
          backgroundColor: video
            ? t.colors["overlay-color"]
            : t.colors["surface-color"],
          borderWidth: video ? 0 : 1,
          borderColor: t.colors["border-color"],
        },
        style,
      ]}
    >
      {title ? (
        <Text
          numberOfLines={1}
          style={[text, { fontWeight: weight(t, "semibold") }]}
          {...part("media-controls", "title")}
        >
          {title}
        </Text>
      ) : null}
      {error ? (
        <Text
          accessibilityRole="alert"
          style={[text, { color: video ? color : t.colors["danger-color"] }]}
          {...part("media-controls", "error")}
        >
          {translate("mediaPlayer.error")}
        </Text>
      ) : null}
      <Track
        accessibilityRole="adjustable"
        accessibilityLabel={translate("mediaPlayer.seek")}
        accessibilityState={{ disabled: !duration }}
        accessibilityValue={{
          min: 0,
          max: Math.round(duration),
          now: Math.round(shownTime),
          text: seekText,
        }}
        accessibilityActions={
          duration ? [{ name: "increment" }, { name: "decrement" }] : undefined
        }
        onAccessibilityAction={(event: AccessibilityActionEvent) => {
          const step = skipSeconds || 10;
          if (event.nativeEvent.actionName === "increment")
            seek(currentTime + step);
          else if (event.nativeEvent.actionName === "decrement")
            seek(currentTime - step);
        }}
        fraction={mediaProgress(shownTime, duration)}
        buffered={
          buffered === undefined ? undefined : mediaProgress(buffered, duration)
        }
        accent={accent}
        color={color}
        disabled={!duration}
        onFraction={(fraction) => seek(fraction * duration)}
        {...part("media-controls", "seek")}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["1"],
        }}
      >
        {button(
          playing
            ? translate("mediaPlayer.pause")
            : translate("mediaPlayer.play"),
          <PlayGlyph playing={playing} color={color} />,
          onPlayPause,
          { disabled: error, name: "play" },
        )}
        {skipSeconds > 0 &&
          button(
            translate("mediaPlayer.skipBack", { count: skipSeconds }),
            <Text style={text}>−{skipSeconds}</Text>,
            () => seek(currentTime - skipSeconds),
            { disabled: error || !duration, name: "skip-back" },
          )}
        {skipSeconds > 0 &&
          button(
            translate("mediaPlayer.skipForward", { count: skipSeconds }),
            <Text style={text}>+{skipSeconds}</Text>,
            () => seek(currentTime + skipSeconds),
            { disabled: error || !duration, name: "skip-forward" },
          )}
        {loading && !error ? (
          <ActivityIndicator
            size="small"
            color={color}
            accessibilityLabel={translate("mediaPlayer.loading")}
            {...part("media-controls", "spinner")}
          />
        ) : null}
        <Text
          style={[text, { fontVariant: ["tabular-nums"] }]}
          {...part("media-controls", "time")}
        >
          {`${formatMediaTime(shownTime, duration)} / ${formatMediaTime(duration)}`}
        </Text>
        <View style={{ flex: 1 }} />
        {onMutedChange &&
          button(
            muted
              ? translate("mediaPlayer.unmute")
              : translate("mediaPlayer.mute"),
            <Text style={text}>{muted ? "🔇\uFE0E" : "🔊\uFE0E"}</Text>,
            () => onMutedChange(!muted),
            { selected: muted, name: "mute" },
          )}
        {onVolumeChange ? (
          <View style={{ width: 72 }}>
            <Track
              accessibilityRole="adjustable"
              accessibilityLabel={translate("mediaPlayer.volume")}
              accessibilityValue={{
                min: 0,
                max: 100,
                now: Math.round(shownVolume * 100),
                text: `${Math.round(shownVolume * 100)}%`,
              }}
              accessibilityActions={[
                { name: "increment" },
                { name: "decrement" },
              ]}
              onAccessibilityAction={(event: AccessibilityActionEvent) =>
                onVolumeChange(
                  clampVolume(
                    shownVolume +
                      (event.nativeEvent.actionName === "increment"
                        ? 0.1
                        : -0.1),
                  ),
                )
              }
              fraction={shownVolume}
              accent={accent}
              color={color}
              onFraction={(fraction) => onVolumeChange(clampVolume(fraction))}
              {...part("media-controls", "volume")}
            />
          </View>
        ) : null}
        {onRateChange && playbackRates.length > 1
          ? button(
              translate("mediaPlayer.playbackRate", {
                rate: formatPlaybackRate(playbackRate),
              }),
              <Text style={[text, { fontWeight: weight(t, "semibold") }]}>
                {formatPlaybackRate(playbackRate)}
              </Text>,
              () => onRateChange(nextPlaybackRate(playbackRate, playbackRates)),
              { name: "rate" },
            )
          : null}
        {onFullscreenChange
          ? button(
              fullscreen
                ? translate("mediaPlayer.exitFullscreen")
                : translate("mediaPlayer.fullscreen"),
              <Text style={text}>⤢</Text>,
              () => onFullscreenChange(!fullscreen),
              { selected: fullscreen, name: "fullscreen" },
            )
          : null}
      </View>
    </View>
  );
}
