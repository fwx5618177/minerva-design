/** Kind of media a MediaPlayer renders */
export type MediaPlayerType = "audio" | "video";

/** How much of the media the browser loads before playback */
export type MediaPlayerPreload = "none" | "metadata" | "auto";

/** CORS mode of the media request */
export type MediaPlayerCrossOrigin = "anonymous" | "use-credentials";

/** Exposed instance of a MediaPlayer (template ref) */
export interface MediaPlayerExpose {
  /** Starts playback (the promise of `HTMLMediaElement.play()`) */
  play: () => Promise<void>;
  /** Pauses playback */
  pause: () => void;
  /** Moves the playhead to `seconds` (clamped to the duration) */
  seek: (seconds: number) => void;
  /** The rendered <audio> / <video> element (null before mount) */
  readonly element: HTMLMediaElement | null;
}

/** Payload of the `timeUpdate` event */
export interface MediaPlayerTimeDetail {
  /** Playhead position, in seconds */
  currentTime: number;
  /** Duration in seconds (0 while unknown) */
  duration: number;
}

/** Payload of the `volumeChange` event */
export interface MediaPlayerVolumeDetail {
  /** Volume, 0..1 */
  volume: number;
  /** Whether the media is muted */
  muted: boolean;
}

/** A captions / subtitles file of a MediaPlayer */
export interface MediaPlayerTrack {
  /** URL of the WebVTT (.vtt) or SubRip (.srt) file; data: URLs work */
  src: string;
  /** Language of the track (BCP 47: "en", "fr-CA") */
  srclang?: string;
  /** Name shown in the captions menu */
  label: string;
  /**
   * Kind of text track
   * @default "subtitles"
   */
  kind?: "subtitles" | "captions";
  /** Shown when the user has not chosen captions yet */
  default?: boolean;
}

/** Payload of the `trackChange` event */
export interface MediaPlayerTrackChangeDetail {
  /** Index of the chosen track in `tracks`, -1 for Off */
  index: number;
  /** The chosen track, null for Off */
  track: MediaPlayerTrack | null;
}

/**
 * Props of `MediaPlayer` (same names and defaults as the React
 * `MediaPlayerProps`; the callbacks are events: `timeUpdate`, `ended`,
 * `play`, `pause`, `loadedMetadata`, `error`, `rateChange`,
 * `volumeChange`, `trackChange`). A `title` slot can replace the `title` prop. Attributes
 * fall through to the root `<div>`.
 */
export interface MediaPlayerProps {
  /** URL of the media */
  src?: string;
  /**
   * Kind of media
   * @default inferred from mimeType, else from the file extension of src, else "video"
   */
  type?: MediaPlayerType;
  /** MIME type of the media ("audio/mpeg", "video/mp4"...), used to infer type */
  mimeType?: string;
  /** Image shown before a video plays */
  poster?: string;
  /** Title of the media, shown in the audio bar / over the video */
  title?: string;
  /**
   * Starts playing as soon as possible (browsers only allow muted autoplay
   * without a user gesture)
   * @default false
   */
  autoPlay?: boolean;
  /**
   * Restarts at the end
   * @default false
   */
  loop?: boolean;
  /**
   * Mutes the media; applied whenever it changes (the mute button still
   * toggles the sound)
   */
  muted?: boolean;
  /** Initially muted (uncontrolled) */
  defaultMuted?: boolean;
  /**
   * How much of the media the browser loads before playback
   * @default "metadata"
   */
  preload?: MediaPlayerPreload;
  /**
   * CORS mode of the media request (cross-origin caption files need it too,
   * plus CORS headers on their server)
   */
  crossOrigin?: MediaPlayerCrossOrigin;
  /**
   * Resume position in seconds, applied once when the metadata loads (and
   * again when src changes)
   */
  startTime?: number;
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
  /**
   * Shows the custom control bar; false renders the bare media element
   * (drive it through the template ref)
   * @default true
   */
  controls?: boolean;
  /** Height of a video player (number: pixels); overrides aspectRatio */
  height?: number | string;
  /**
   * Aspect ratio of a video player (CSS aspect-ratio)
   * @default "16 / 9"
   */
  aspectRatio?: string;
  /**
   * Shows a picture-in-picture button (video, where the browser supports it)
   * @default false
   */
  pictureInPicture?: boolean;
  /**
   * Captions / subtitles (WebVTT or SRT files): rendered as <track> children
   * and drawn by the player over the video (below the title for audio), with
   * a captions menu in the control bar. The choice is remembered
   * (localStorage); a `default` track shows until the user chooses
   * @default []
   */
  tracks?: readonly MediaPlayerTrack[];
  /**
   * Accessible label of the player
   * @default title, else "Media player" (translated)
   */
  "aria-label"?: string;
}
