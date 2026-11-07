/**
 * 字幕选择、偏好记忆与媒体错误文案。
 * 原生轨道负责能力回退；自绘 VTT/SRT 文本与原生画中画切换由 useCaptionDisplay 管理。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerError } from "./engines/types.js";
import type { CaptionOption } from "./SettingsMenu.js";

export interface PlayerTrack {
  /** WebVTT / SRT 地址 */
  src: string;
  /** 语言代码，例如 zh-CN */
  srclang?: string;
  /** 菜单里显示的名称 */
  label: string;
  kind?: "subtitles" | "captions";
  /** 默认打开 */
  default?: boolean;
}

/** 默认打开的字幕下标；没有时为 -1 */
export function defaultCaptionIndex(
  tracks: readonly PlayerTrack[] | undefined,
): number {
  return tracks?.findIndex((track) => track.default) ?? -1;
}

/** 按下标设置各字幕的显示状态 */
export function applyCaptionMode(
  textTracks:
    | { readonly length: number; [index: number]: { mode: string } }
    | null
    | undefined,
  index: number,
): void {
  if (!textTracks) return;
  for (let position = 0; position < textTracks.length; position += 1) {
    const track = textTracks[position];
    if (track) track.mode = position === index ? "showing" : "disabled";
  }
}

export function useCaptions(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  tracks: readonly PlayerTrack[] | undefined,
  onChange?: (detail: { index: number; track: PlayerTrack | null }) => void,
  storageKey = "media-player:caption-language",
  hostKey = "video",
) {
  const tracksKey = (tracks ?? [])
    .map((track) => `${track.src}|${track.label}`)
    .join("\n");
  const [index, setIndex] = useState(() => defaultCaptionIndex(tracks));
  const lastOn = useRef(Math.max(0, defaultCaptionIndex(tracks)));
  const changeRef = useRef(onChange);
  changeRef.current = onChange;
  let preference: string | null = null;
  try {
    if (typeof localStorage !== "undefined")
      preference = localStorage.getItem(storageKey);
  } catch {
    /* Storage may be denied. */
  }
  const wanted = preference?.toLowerCase();
  const primary = (value: string) => value.toLowerCase().split(/[-_]/)[0];
  let savedIndex = wanted
    ? (tracks?.findIndex((track) => track.srclang?.toLowerCase() === wanted) ??
      -1)
    : -1;
  if (wanted && savedIndex < 0)
    savedIndex =
      tracks?.findIndex(
        (track) => track.srclang && primary(track.srclang) === primary(wanted),
      ) ?? -1;
  if (wanted && savedIndex < 0)
    savedIndex =
      tracks?.findIndex((track) => track.label.toLowerCase() === wanted) ?? -1;
  const defaultIndex =
    preference === "off" || savedIndex >= 0
      ? savedIndex
      : defaultCaptionIndex(tracks);

  // 字幕列表变化：回到默认
  useEffect(() => {
    setIndex(defaultIndex);
    if (defaultIndex >= 0) lastOn.current = defaultIndex;
  }, [tracksKey, defaultIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const apply = () => applyCaptionMode(video.textTracks, index);
    apply();
    // 字幕轨道是异步加入的，读到元数据后再设置一次
    video.addEventListener("loadedmetadata", apply);
    return () => video.removeEventListener("loadedmetadata", apply);
  }, [videoRef, index, tracksKey, hostKey]);

  const options: CaptionOption[] = (tracks ?? []).map((track, position) => ({
    index: position,
    label: track.label,
  }));

  const select = useCallback(
    (next: number) => {
      if (next < -1 || next >= (tracks?.length ?? 0)) return;
      if (next >= 0) lastOn.current = next;
      setIndex(next);
      const track = tracks?.[next] ?? null;
      try {
        localStorage.setItem(
          storageKey,
          track ? track.srclang || track.label : "off",
        );
      } catch {
        /* Optional persistence. */
      }
      changeRef.current?.({ index: next, track });
    },
    [tracks, storageKey],
  );

  const toggle = useCallback(() => {
    select(
      index >= 0 ? -1 : Math.min(lastOn.current, (tracks?.length ?? 1) - 1),
    );
  }, [index, select, tracks]);

  return { options, index, select, toggle };
}

/** MediaError.code → 错误；传入格式时对 MKV / MOV / 音频给出更具体的说明 */
export function mediaErrorMessage(code: number, type?: string): PlayerError {
  const noun = type === "audio" ? "音频" : "视频";
  switch (code) {
    case 1:
      return new PlayerError("unknown", `${noun}加载被中止`);
    case 2:
      return new PlayerError("network", `网络错误，${noun}加载失败`);
    case 3:
      return new PlayerError("decode", `${noun}解码失败，文件可能已损坏`);
    case 4:
      if (type === "mkv" || type === "mov") {
        return new PlayerError(
          "unsupported",
          `浏览器无法解码这个 ${type.toUpperCase()} 文件（编码不受支持，例如 HEVC / AC-3 / DTS），建议转封装为 MP4（H.264 + AAC）或 WebM`,
        );
      }
      if (type === "audio") {
        return new PlayerError(
          "unsupported",
          "不支持这个音频格式或地址无法访问（ALAC / AMR / WMA / AIFF / AC-3 等编码浏览器无法解码，建议转码为 AAC（.m4a）、MP3 或 Opus）",
        );
      }
      return new PlayerError(
        "unsupported",
        `不支持这个${noun}格式或地址无法访问`,
      );
    default:
      return new PlayerError("unknown", `${noun}播放出错`);
  }
}
