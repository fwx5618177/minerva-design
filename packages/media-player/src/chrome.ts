import type React from "react";
import type { PlayerError } from "./engines/types.js";
import type { PlayerTrack } from "./captions.js";
/** Presentation contract. Playback state and effects remain owned by the player. */
export interface PlayerChromeState {
  paused: boolean;
  current: number;
  duration: number;
  buffered: Array<[number, number]>;
  muted: boolean;
  volume: number;
  rate: number;
  loading: boolean;
  error: PlayerError | null;
  title: string;
  audioOnly: boolean;
  ended: boolean;
  captionIndex: number;
  captionText: string;
  tracks: readonly PlayerTrack[];
  root: HTMLDivElement | null;
  media: HTMLVideoElement | null;
  fullscreen: boolean;
  pipActive: boolean;
  pipSupported: boolean;
  fullscreenSupported: boolean;
  togglePlay(): void;
  seek(time: number): void;
  changeVolume(volume: number): void;
  toggleMute(): void;
  setRate(rate: number): void;
  selectCaption(index: number): void;
  toggleCaption(): void;
  toggleFullscreen(): void;
  togglePip(): void;
}
export type PlayerRootProps = React.HTMLAttributes<HTMLDivElement> & {
  [key: `data-${string}`]: unknown;
};
export type PlayerMediaProps = React.HTMLAttributes<HTMLMediaElement> & {
  [key: `data-${string}`]: unknown;
};
