// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import {
  PROGRESSIVE_TYPES,
  defaultEngines,
  detectSourceType,
  formatOfMime,
  isAudioSource,
  nativeEngine,
  probeMimeFor,
  resolvePlayback,
  selectEngine,
  unsupportedProtocol,
  type ResolvedSourceType,
} from "../src";

/** 扩展名 → 格式 → 默认引擎 */
const EXTENSION_CASES: Array<[string, ResolvedSourceType, string]> = [
  ["mp4", "mp4", "native"],
  ["m4v", "mp4", "native"],
  ["mov", "mov", "native"],
  ["webm", "webm", "native"],
  ["ogv", "ogg", "native"],
  ["mkv", "mkv", "native"],
  ["mp3", "audio", "native"],
  ["aac", "audio", "native"],
  ["m4a", "audio", "native"],
  ["ogg", "audio", "native"],
  ["oga", "audio", "native"],
  ["opus", "audio", "native"],
  ["weba", "audio", "native"],
  ["wav", "audio", "native"],
  ["flac", "audio", "native"],
  ["m3u8", "hls", "hls"],
  ["m3u", "hls", "hls"],
  ["mpd", "dash", "dash"],
  ["flv", "flv", "flv"],
  ["ts", "mpegts", "flv"],
  ["m2ts", "mpegts", "flv"],
  ["mts", "mpegts", "flv"],
];

const video = document.createElement("video");

describe("格式推断：扩展名", () => {
  it.each(EXTENSION_CASES)(
    ".%s → %s（%s 引擎），忽略大小写、查询串与片段",
    (ext, type, engine) => {
      for (const url of [
        `https://cdn.example.com/media/clip.${ext}`,
        `https://cdn.example.com/media/clip.${ext.toUpperCase()}?token=a.b&exp=1#t=10`,
        `/Users/me/资料/clip.${ext}`,
        `file:///C:/media/clip.${ext}`,
      ]) {
        expect(detectSourceType(url)).toBe(type);
      }
      expect(selectEngine(type, defaultEngines(), video)?.kind).toBe(engine);
    },
  );

  it("查询串里的扩展名不算；没有扩展名时看地址提示，再不行交给原生", () => {
    expect(detectSourceType("https://x/a.b/c.FLV?x=1.mp4")).toBe("flv");
    expect(detectSourceType("https://x/watch?v=1.m3u8x")).toBe("mp4");
    expect(detectSourceType("https://x/play?format=m3u8")).toBe("hls");
    expect(detectSourceType("https://x/play?type=FLV&id=3")).toBe("flv");
    expect(detectSourceType("https://x/play?format=mpd")).toBe("dash");
    expect(detectSourceType("https://x/play?ext=dash")).toBe("dash");
    expect(detectSourceType("https://x/live/index.m3u8/variant")).toBe("hls");
    expect(detectSourceType("https://x/v/no-extension")).toBe("mp4");
  });

  it("WebSocket 地址按 FLV 直播处理", () => {
    expect(detectSourceType("wss://live.example.com/app/stream")).toBe("flv");
    expect(detectSourceType("ws://127.0.0.1:8080/live/room.flv")).toBe("flv");
  });
});

describe("格式推断：MIME / 显式类型 / blob / data", () => {
  const MIME_CASES: Array<[string, ResolvedSourceType]> = [
    ["application/x-mpegURL", "hls"],
    ["application/vnd.apple.mpegurl", "hls"],
    ["audio/mpegurl", "hls"],
    ["audio/x-mpegurl", "hls"],
    ["application/dash+xml", "dash"],
    ["video/x-flv", "flv"],
    ["video/flv", "flv"],
    ["video/MP2T", "mpegts"],
    ['video/mp4; codecs="hvc1.1.6.L93.B0"', "mp4"],
    ["video/x-m4v", "mp4"],
    ["video/quicktime", "mov"],
    ['video/webm; codecs="av01.0.05M.08"', "webm"],
    ["video/ogg", "ogg"],
    ["application/ogg", "ogg"],
    ["video/x-matroska", "mkv"],
    ["audio/mpeg", "audio"],
    ["audio/wav", "audio"],
    ["audio/flac", "audio"],
    ["audio/ogg; codecs=opus", "audio"],
  ];

  it.each(MIME_CASES)("MIME %s → %s（优先于扩展名）", (mime, type) => {
    expect(formatOfMime(mime)).toBe(type);
    expect(detectSourceType("https://x/stream.mp4", "auto", mime)).toBe(type);
  });

  it("显式 type 最优先；不认识的 MIME 回到扩展名", () => {
    expect(detectSourceType("a.mp4", "hls")).toBe("hls");
    expect(detectSourceType("a.mpd", "auto", "text/plain")).toBe("dash");
    expect(formatOfMime(undefined)).toBeNull();
  });

  it("blob: 没有类型时交给原生，带 mimeType 时按 MIME；data: 读自身 MIME", () => {
    expect(detectSourceType("blob:https://x/123")).toBe("mp4");
    expect(detectSourceType("blob:https://x/123", "auto", "audio/wav")).toBe(
      "audio",
    );
    expect(
      detectSourceType("blob:https://x/123", "auto", "application/dash+xml"),
    ).toBe("dash");
    expect(detectSourceType("data:audio/wav;base64,UklGRg==")).toBe("audio");
    expect(detectSourceType("data:video/webm;base64,GkXfow==")).toBe("webm");
    expect(detectSourceType("data:;base64,AAAA")).toBe("mp4");
  });

  it("多清晰度：每个清晰度可以有自己的格式", () => {
    const source = {
      src: "https://x/fallback.mp4",
      qualities: [
        { id: "dash", label: "自适应", src: "https://x/manifest.MPD?sig=1" },
        {
          id: "audio",
          label: "仅声音",
          src: "https://x/a",
          type: "audio" as const,
        },
      ],
    };
    expect(resolvePlayback(source, "dash").type).toBe("dash");
    expect(resolvePlayback(source, "audio").type).toBe("audio");
  });
});

describe("原生引擎 / 协议 / 音频判断", () => {
  it("渐进式格式都由原生引擎处理", () => {
    for (const type of PROGRESSIVE_TYPES)
      expect(nativeEngine.handles(type)).toBe(true);
    expect(nativeEngine.handles("dash")).toBe(false);
  });

  it("RTMP / RTSP 等推流协议：浏览器不能直接播放", () => {
    expect(unsupportedProtocol("rtmp://live.example.com/app/key")).toBe("rtmp");
    expect(unsupportedProtocol("RTSP://192.168.1.2:554/stream")).toBe("rtsp");
    expect(unsupportedProtocol("srt://host:9000")).toBe("srt");
    expect(unsupportedProtocol("https://x/live.flv")).toBeNull();
    expect(unsupportedProtocol("wss://x/live")).toBeNull();
  });

  it("isAudioSource：显式 audioOnly → MIME → 扩展名", () => {
    expect(isAudioSource({ url: "https://x/a.MP3?x=1" })).toBe(true);
    expect(isAudioSource({ url: "https://x/a.m4a" })).toBe(true);
    expect(isAudioSource({ url: "https://x/a.mp4" })).toBe(false);
    expect(isAudioSource({ url: "blob:x", mimeType: "audio/wav" })).toBe(true);
    expect(isAudioSource({ url: "data:audio/wav;base64,AA" })).toBe(true);
    // HLS 的 audio/mpegurl 不是纯音频
    expect(
      isAudioSource({ url: "https://x/a", mimeType: "audio/x-mpegurl" }),
    ).toBe(false);
    expect(isAudioSource({ url: "https://x/a.mp3", audioOnly: false })).toBe(
      false,
    );
    expect(
      isAudioSource({ url: "https://x/radio.m3u8", audioOnly: true }),
    ).toBe(true);
    expect(isAudioSource({ url: "https://x/a", type: "audio" })).toBe(true);
    expect(isAudioSource({ url: "https://x/a.mp3", type: "mp4" })).toBe(false);
  });

  it("probeMimeFor：显式 MIME（含 codecs）> data: MIME > 扩展名 > 默认", () => {
    expect(probeMimeFor("a.mp4", "mp4", 'video/mp4; codecs="hvc1"')).toBe(
      'video/mp4; codecs="hvc1"',
    );
    expect(probeMimeFor("data:audio/flac;base64,AA", "audio")).toBe(
      "audio/flac",
    );
    expect(probeMimeFor("https://x/a.WAV", "audio")).toBe("audio/wav");
    expect(probeMimeFor("https://x/a", "mkv")).toBe("video/x-matroska");
  });
});
