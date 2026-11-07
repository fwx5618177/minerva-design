// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import {
  FORMAT_MATRIX,
  canPlay,
  getCapabilities,
  nativeEngine,
  type CapabilityProbe,
  type MediaEngineFactory,
} from "../src";

/** 探测替身：canPlayType 按 MIME 前缀匹配；isTypeSupported 只在 mse 为 true 时存在 */
function probe(options: {
  native?: Record<string, string>;
  mse?: string[] | false;
}): CapabilityProbe {
  const native = options.native ?? {};
  const mse = options.mse;
  const lookup = (mime: string) => {
    if (native[mime] !== undefined) return native[mime];
    const base = mime.split(";")[0].trim();
    return native[base] ?? "";
  };
  return {
    canPlayType: lookup,
    isTypeSupported:
      mse === false
        ? undefined
        : (mime) => (mse ?? []).some((prefix) => mime.startsWith(prefix)),
  };
}

/** 接近 Chromium / Electron：MSE 支持 H.264，原生支持 MP4 / WebM / Ogg / 常见音频，不认 MKV / MOV / HLS */
const CHROMIUM = probe({
  native: {
    "video/mp4": "maybe",
    "video/webm": "maybe",
    "video/ogg": "maybe",
    "audio/mpeg": "probably",
    "audio/mp4": "maybe",
    "audio/ogg": "maybe",
    "audio/wav": "maybe",
    "audio/flac": "probably",
    "audio/webm": "maybe",
    "audio/aac": "probably",
    'video/mp4; codecs="hvc1.1.6.L93.B0"': "",
  },
  mse: ['video/mp4; codecs="avc1', "video/webm"],
});

/** 接近 iOS Safari（旧版）：没有 MSE，原生 HLS 与 MP4 / MOV */
const IOS = probe({
  native: {
    "application/vnd.apple.mpegurl": "maybe",
    "video/mp4": "maybe",
    "video/quicktime": "maybe",
    "audio/mpeg": "maybe",
  },
  mse: false,
});

/** 什么都不支持（SSR / 精简环境） */
const NOTHING = probe({ mse: false });

describe("canPlay", () => {
  it("渐进式：原生能播 → native；带 codecs 的 MIME 精确判断", () => {
    expect(canPlay("https://x/a.mp4", { probe: CHROMIUM })).toMatchObject({
      playable: true,
      engine: "native",
      type: "mp4",
      confidence: "maybe",
      audioOnly: false,
    });
    expect(
      canPlay(
        {
          src: "https://x/a.mp4",
          mimeType: 'video/mp4; codecs="hvc1.1.6.L93.B0"',
        },
        { probe: CHROMIUM },
      ),
    ).toMatchObject({ playable: false, engine: null });
    expect(canPlay("https://x/a.webm", { probe: CHROMIUM }).playable).toBe(
      true,
    );
    expect(canPlay("https://x/a.ogv", { probe: CHROMIUM }).playable).toBe(true);
    expect(canPlay("https://x/a.webm", { probe: IOS })).toMatchObject({
      playable: false,
    });
  });

  it("MKV / MOV：canPlayType 不认识时按兼容封装「尝试原生」，并说明可能失败", () => {
    const mkv = canPlay("https://x/movie.MKV", { probe: CHROMIUM });
    expect(mkv).toMatchObject({
      playable: true,
      engine: "native",
      confidence: "maybe",
      type: "mkv",
    });
    expect(mkv.reason).toContain("MP4 / WebM");
    expect(canPlay("https://x/clip.mov", { probe: IOS })).toMatchObject({
      playable: true,
      confidence: "maybe",
    });
    expect(canPlay("https://x/movie.mkv", { probe: NOTHING })).toMatchObject({
      playable: false,
    });
  });

  it("纯音频：各扩展名按自己的 MIME 探测，audioOnly 为 true", () => {
    for (const ext of [
      "mp3",
      "aac",
      "m4a",
      "ogg",
      "opus",
      "wav",
      "flac",
      "weba",
    ]) {
      expect(
        canPlay(`https://x/a.${ext}?v=1`, { probe: CHROMIUM }),
      ).toMatchObject({
        playable: true,
        engine: "native",
        type: "audio",
        audioOnly: true,
      });
    }
    expect(canPlay("https://x/a.flac", { probe: IOS })).toMatchObject({
      playable: false,
    });
    expect(
      canPlay("data:audio/wav;base64,UklGRg==", { probe: CHROMIUM }),
    ).toMatchObject({
      playable: true,
      audioOnly: true,
    });
  });

  it("流媒体：有 MSE 走对应引擎（附带依赖名），没有 MSE 时 HLS 退回原生", () => {
    expect(canPlay("https://x/live.m3u8", { probe: CHROMIUM })).toMatchObject({
      playable: true,
      engine: "hls",
      requires: "hls.js",
    });
    expect(
      canPlay("https://x/manifest.mpd", { probe: CHROMIUM }),
    ).toMatchObject({
      playable: true,
      engine: "dash",
      requires: "dashjs",
    });
    expect(canPlay("https://x/live.flv", { probe: CHROMIUM })).toMatchObject({
      engine: "flv",
      requires: "mpegts.js",
    });
    expect(canPlay("wss://x/live/room", { probe: CHROMIUM })).toMatchObject({
      engine: "flv",
    });
    expect(canPlay("https://x/seg.ts", { probe: CHROMIUM })).toMatchObject({
      type: "mpegts",
      engine: "flv",
    });
    expect(canPlay("https://x/live.m3u8", { probe: IOS })).toMatchObject({
      playable: true,
      engine: "native",
      requires: undefined,
    });
    expect(canPlay("https://x/manifest.mpd", { probe: IOS })).toMatchObject({
      playable: false,
    });
    expect(canPlay("https://x/live.flv", { probe: NOTHING }).reason).toContain(
      "MSE",
    );
  });

  it("RTMP / RTSP：不可播放，说明需要服务端网关", () => {
    for (const url of [
      "rtmp://live.example.com/app/key",
      "rtsp://cam.local/stream",
    ]) {
      const result = canPlay(url, { probe: CHROMIUM });
      expect(result).toMatchObject({
        playable: false,
        engine: null,
        type: null,
      });
      expect(result.reason).toContain("HLS");
      expect(result.reason).toContain("WebRTC");
    }
  });

  it("blob：有 mimeType 按 MIME 判断，没有时交给原生（可能）", () => {
    expect(canPlay("blob:https://x/1", { probe: CHROMIUM })).toMatchObject({
      playable: true,
      engine: "native",
      confidence: "maybe",
    });
    expect(
      canPlay(
        { src: "blob:https://x/1", mimeType: "audio/wav" },
        { probe: CHROMIUM },
      ),
    ).toMatchObject({ playable: true, type: "audio", audioOnly: true });
    expect(
      canPlay(
        { src: "blob:https://x/1", mimeType: "application/x-mpegURL" },
        { probe: CHROMIUM },
      ),
    ).toMatchObject({ engine: "hls" });
  });

  it("自定义引擎优先（例如 WebRTC / WHEP）", () => {
    const whep: MediaEngineFactory = {
      kind: "whep",
      handles: (type) => type === "mp4",
      attach: () =>
        nativeEngine.attach(document.createElement("video"), {} as never),
    };
    expect(
      canPlay("https://x/whep/room", { probe: NOTHING, engines: [whep] }),
    ).toMatchObject({
      playable: true,
      engine: "whep",
    });
  });
});

describe("getCapabilities", () => {
  it("列出全部主流格式与编码；按探测结果给出可播放性", () => {
    const caps = getCapabilities(CHROMIUM);
    expect(caps.mse).toBe(true);
    expect(caps.formats.map((format) => format.type)).toEqual(
      FORMAT_MATRIX.map((spec) => spec.type),
    );
    const byType = Object.fromEntries(
      caps.formats.map((format) => [format.type, format]),
    );
    expect(
      byType.mp4.codecs.find((codec) => codec.label === "H.264")?.supported,
    ).toBe(true);
    expect(
      byType.mp4.codecs.find((codec) => codec.label.startsWith("H.265"))
        ?.supported,
    ).toBe(false);
    expect(byType.dash).toMatchObject({
      playable: true,
      engine: "dash",
      requires: "dashjs",
      live: true,
    });
    expect(byType.hls.playable).toBe(true);
    expect(byType.mkv).toMatchObject({ playable: true, confidence: "maybe" });
    expect(byType.audio.playable).toBe(true);
    expect(byType.audio.codecs.every((codec) => codec.supported)).toBe(true);
  });

  it("没有 MSE：流媒体只有原生 HLS 可播；什么都不支持时全部不可播", () => {
    const ios = Object.fromEntries(
      getCapabilities(IOS).formats.map((f) => [f.type, f]),
    );
    expect(getCapabilities(IOS).mse).toBe(false);
    expect(ios.hls).toMatchObject({ playable: true });
    expect(ios.dash.playable).toBe(false);
    expect(ios.flv.playable).toBe(false);
    expect(
      getCapabilities(NOTHING).formats.every((format) => !format.playable),
    ).toBe(true);
  });

  it("默认探测使用当前环境（不抛错）", () => {
    expect(() => getCapabilities()).not.toThrow();
    expect(() => canPlay("https://x/a.mp4")).not.toThrow();
  });
});
