/**
 * 判断视频有没有音轨（纯函数，便于测试）。浏览器没有统一的 API，按可用程度依次尝试：
 * 1. `audioTracks`（规范 API；Safari 默认开启，Chromium 需实验开关）：读到元数据后即可判断
 * 2. `mozHasAudio`（Firefox）：读到元数据后即可判断
 * 3. `webkitAudioDecodedByteCount`（Chromium / Electron）：已解码的音频字节数。大于 0 即有音轨；
 *    实际播放了至少 AUDIO_PROBE_MIN_PLAYED_SECONDS 秒仍为 0 才判定为没有音轨（静音播放也会解码）
 * 都不可用时为 unknown，播放器按「有声音」处理，绝不因为猜测而禁用声音。
 */

export type AudioTrackState = "unknown" | "present" | "absent";

/** 用于探测的最小接口（HTMLVideoElement 的非标准 / 可选字段） */
export interface AudioProbeTarget {
  /** HTMLMediaElement.readyState：小于 1（还没读到元数据）时一律为 unknown；缺省视为已读到 */
  readyState?: number;
  audioTracks?: { readonly length: number } | null;
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
}

/** 依据解码字节数判定「没有音轨」前至少要实际播放的时长（秒） */
export const AUDIO_PROBE_MIN_PLAYED_SECONDS = 1;

export function detectAudioTrack(
  target: AudioProbeTarget,
  playedSeconds = 0,
): AudioTrackState {
  if (typeof target.readyState === "number" && target.readyState < 1)
    return "unknown";
  const tracks = target.audioTracks;
  if (tracks && typeof tracks.length === "number") {
    return tracks.length > 0 ? "present" : "absent";
  }
  if (typeof target.mozHasAudio === "boolean") {
    return target.mozHasAudio ? "present" : "absent";
  }
  const decoded = target.webkitAudioDecodedByteCount;
  if (typeof decoded === "number" && Number.isFinite(decoded)) {
    if (decoded > 0) return "present";
    return playedSeconds >= AUDIO_PROBE_MIN_PLAYED_SECONDS
      ? "absent"
      : "unknown";
  }
  return "unknown";
}

/** TimeRanges（video.played）的总时长（秒）；没有时为 0 */
export function playedSeconds(
  ranges: Pick<TimeRanges, "length" | "start" | "end"> | null | undefined,
): number {
  if (!ranges) return 0;
  let total = 0;
  for (let index = 0; index < ranges.length; index += 1) {
    const span = ranges.end(index) - ranges.start(index);
    if (Number.isFinite(span) && span > 0) total += span;
  }
  return total;
}

/** 状态只从 unknown 收敛到确定值，确定之后不再改变（直到换片） */
export function nextAudioTrackState(
  previous: AudioTrackState,
  target: AudioProbeTarget,
  played: number,
): AudioTrackState {
  return previous === "unknown" ? detectAudioTrack(target, played) : previous;
}

/** 音量限制在 [0, 1]，非法值为 1 */
export function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}
