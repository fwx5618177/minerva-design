import { describe, expect, it } from "vitest";
import {
  AUDIO_PROBE_MIN_PLAYED_SECONDS,
  clampVolume,
  detectAudioTrack,
  nextAudioTrackState,
  playedSeconds,
} from "../src";

function ranges(...spans: [number, number][]) {
  return {
    length: spans.length,
    start: (index: number) => spans[index]?.[0] ?? 0,
    end: (index: number) => spans[index]?.[1] ?? 0,
  };
}

describe("detectAudioTrack", () => {
  it("audioTracks（规范 API）优先", () => {
    expect(detectAudioTrack({ audioTracks: { length: 1 } })).toBe("present");
    expect(
      detectAudioTrack({
        audioTracks: { length: 0 },
        webkitAudioDecodedByteCount: 99,
      }),
    ).toBe("absent");
  });

  it("mozHasAudio（Firefox）", () => {
    expect(detectAudioTrack({ mozHasAudio: true })).toBe("present");
    expect(detectAudioTrack({ mozHasAudio: false })).toBe("absent");
  });

  it("webkitAudioDecodedByteCount：大于 0 即有；播放够久仍为 0 才判定没有", () => {
    expect(detectAudioTrack({ webkitAudioDecodedByteCount: 10 })).toBe(
      "present",
    );
    expect(detectAudioTrack({ webkitAudioDecodedByteCount: 0 })).toBe(
      "unknown",
    );
    expect(detectAudioTrack({ webkitAudioDecodedByteCount: 0 }, 0.5)).toBe(
      "unknown",
    );
    expect(
      detectAudioTrack(
        { webkitAudioDecodedByteCount: 0 },
        AUDIO_PROBE_MIN_PLAYED_SECONDS,
      ),
    ).toBe("absent");
    expect(
      detectAudioTrack({ webkitAudioDecodedByteCount: Number.NaN }, 5),
    ).toBe("unknown");
  });

  it("还没读到元数据时为 unknown", () => {
    expect(detectAudioTrack({ readyState: 0, mozHasAudio: false }, 10)).toBe(
      "unknown",
    );
    expect(detectAudioTrack({ readyState: 1, mozHasAudio: false }, 10)).toBe(
      "absent",
    );
  });

  it("都不可用时为 unknown（按有声音处理）", () => {
    expect(detectAudioTrack({}, 100)).toBe("unknown");
    expect(detectAudioTrack({ audioTracks: null }, 100)).toBe("unknown");
  });

  it("nextAudioTrackState 只从 unknown 收敛", () => {
    expect(nextAudioTrackState("unknown", { mozHasAudio: true }, 0)).toBe(
      "present",
    );
    expect(nextAudioTrackState("present", { mozHasAudio: false }, 0)).toBe(
      "present",
    );
    expect(
      nextAudioTrackState("absent", { webkitAudioDecodedByteCount: 5 }, 0),
    ).toBe("absent");
  });
});

describe("playedSeconds / clampVolume", () => {
  it("累加已播放区间，忽略非法区间", () => {
    expect(playedSeconds(undefined)).toBe(0);
    expect(playedSeconds(null)).toBe(0);
    expect(playedSeconds(ranges([0, 1.5], [3, 4]))).toBe(2.5);
    expect(playedSeconds(ranges([2, 1], [0, Number.POSITIVE_INFINITY]))).toBe(
      0,
    );
  });

  it("音量限制在 0–1", () => {
    expect(clampVolume(0.5)).toBe(0.5);
    expect(clampVolume(-1)).toBe(0);
    expect(clampVolume(3)).toBe(1);
    expect(clampVolume(Number.NaN)).toBe(1);
  });
});
