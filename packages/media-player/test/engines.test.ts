// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import {
  AUTO_QUALITY,
  PlayerError,
  createFlvEngine,
  createHlsEngine,
  detectSourceType,
  extensionOfUrl,
  hlsLevels,
  initialQualityId,
  nativeEngine,
  qualityOptionsFor,
  resolvePlayback,
  selectEngine,
  sortedQualities,
  type MediaEngineFactory,
} from "../src";
import type { HlsConstructorLike } from "../src/engines/hls";
import type { MpegtsModuleLike } from "../src/engines/flv";

function fakeVideo(canPlay: Record<string, string> = {}) {
  const video = document.createElement("video");
  video.canPlayType = (mime: string) =>
    (canPlay[mime] ?? "") as CanPlayTypeResult;
  return video;
}

describe("播放源格式推断", () => {
  it("显式 type 优先，其次 MIME，再看扩展名（忽略查询串）", () => {
    expect(detectSourceType("a.mp4", "hls")).toBe("hls");
    expect(
      detectSourceType("https://x/stream", "auto", "application/x-mpegURL"),
    ).toBe("hls");
    expect(detectSourceType("https://x/live", "auto", "video/x-flv")).toBe(
      "flv",
    );
    expect(detectSourceType("https://x/v/index.m3u8?token=1#t")).toBe("hls");
    expect(detectSourceType("https://x/v/live.flv?auth=abc")).toBe("flv");
    expect(detectSourceType("https://x/v/seg.ts")).toBe("mpegts");
    expect(detectSourceType("https://x/v/manifest.mpd")).toBe("dash");
    expect(detectSourceType("https://x/v/clip.webm")).toBe("webm");
    expect(detectSourceType("https://x/v/clip.MOV")).toBe("mov");
    expect(detectSourceType("https://x/play?format=m3u8")).toBe("hls");
    expect(detectSourceType("blob:https://x/123")).toBe("mp4");
    expect(detectSourceType("https://x/v/no-extension")).toBe("mp4");
    expect(extensionOfUrl("https://x/a.b/c.FLV?x=1.mp4")).toBe("flv");
  });

  it("清晰度：按高度排序、默认清晰度、按清晰度解析地址", () => {
    const source = {
      src: "https://x/fallback.mp4",
      qualities: [
        { id: "sd", label: "480P", src: "https://x/480.mp4", height: 480 },
        { id: "hd", label: "1080P", src: "https://x/1080.flv", height: 1080 },
      ],
    };
    expect(sortedQualities(source).map((q) => q.id)).toEqual(["hd", "sd"]);
    expect(initialQualityId(source)).toBe("sd");
    expect(initialQualityId({ ...source, defaultQuality: "hd" })).toBe("hd");
    expect(initialQualityId({ src: "a.mp4" })).toBe(AUTO_QUALITY);
    expect(resolvePlayback(source, "hd")).toEqual({
      url: "https://x/1080.flv",
      type: "flv",
    });
    expect(resolvePlayback(source, "missing")).toEqual({
      url: "https://x/fallback.mp4",
      type: "mp4",
    });
    expect(qualityOptionsFor(source, []).map((q) => q.label)).toEqual([
      "1080P",
      "480P",
    ]);
  });

  it("HLS 档位：多于一个时提供「自动」，按高度从高到低", () => {
    const levels = hlsLevels([
      { height: 360 },
      { height: 720 },
      { bitrate: 800_000 },
    ]);
    expect(levels.map((l) => l.label)).toEqual(["360p", "720p", "800 kbps"]);
    expect(
      qualityOptionsFor({ src: "a.m3u8" }, levels).map((q) => q.id),
    ).toEqual([AUTO_QUALITY, "1", "0", "2"]);
    expect(qualityOptionsFor({ src: "a.m3u8" }, levels.slice(0, 1))).toEqual(
      [],
    );
  });

  it("选择引擎：按顺序找处理该格式的引擎；都不处理时浏览器能原生播放就交给原生", () => {
    const custom: MediaEngineFactory = {
      kind: "dash",
      handles: (type) => type === "dash",
      attach: () => nativeEngine.attach(fakeVideo(), {} as never),
    };
    const video = fakeVideo({
      "application/vnd.apple.mpegurl": "maybe",
      "video/mp4": "maybe",
    });
    expect(selectEngine("dash", [custom, nativeEngine], video)?.kind).toBe(
      "dash",
    );
    expect(selectEngine("mp4", [custom], video)?.kind).toBe("native");
    expect(selectEngine("hls", [nativeEngine], video)?.kind).toBe("native");
    expect(selectEngine("flv", [nativeEngine], video)).toBeNull();
  });
});

/** 模拟 hls.js：记录调用、可手动触发事件 */
function mockHls(supported = true) {
  const instances: Array<{
    config?: unknown;
    listeners: Map<string, (event: string, data: unknown) => void>;
    loadSource: ReturnType<typeof vi.fn>;
    attachMedia: ReturnType<typeof vi.fn>;
    startLoad: ReturnType<typeof vi.fn>;
    recoverMediaError: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
    levels: Array<{ height: number }>;
    currentLevel: number;
    autoLevelEnabled: boolean;
  }> = [];
  class Hls {
    static isSupported = () => supported;
    static Events = { MANIFEST_PARSED: "hlsManifestParsed", ERROR: "hlsError" };
    static ErrorTypes = {
      NETWORK_ERROR: "networkError",
      MEDIA_ERROR: "mediaError",
    };
    listeners = new Map<string, (event: string, data: unknown) => void>();
    loadSource = vi.fn();
    attachMedia = vi.fn();
    startLoad = vi.fn();
    recoverMediaError = vi.fn();
    destroy = vi.fn();
    levels = [{ height: 360 }, { height: 720 }];
    private level = -1;
    autoLevelEnabled = true;
    constructor(public config?: unknown) {
      instances.push(this);
    }
    get currentLevel() {
      return this.level;
    }
    set currentLevel(value: number) {
      this.level = value;
      this.autoLevelEnabled = value < 0;
    }
    on(event: string, listener: (event: string, data: unknown) => void) {
      this.listeners.set(event, listener);
    }
  }
  return { Hls: Hls as unknown as HlsConstructorLike, instances };
}

describe("HLS 引擎（hls.js 适配）", () => {
  it("加载、档位、切换清晰度、自动、销毁", async () => {
    const { Hls, instances } = mockHls();
    const factory = createHlsEngine({
      load: async () => ({ default: Hls }),
      config: { lowLatencyMode: true },
    });
    const onLevels = vi.fn();
    const video = fakeVideo();
    const engine = await factory.attach(video, {
      source: { src: "a.m3u8" },
      url: "a.m3u8",
      type: "hls",
      onLevels,
    });
    const hls = instances[0];
    expect(engine.kind).toBe("hls");
    expect(hls.config).toEqual({ lowLatencyMode: true });
    expect(hls.loadSource).toHaveBeenCalledWith("a.m3u8");
    expect(hls.attachMedia).toHaveBeenCalledWith(video);
    hls.listeners.get("hlsManifestParsed")?.("hlsManifestParsed", {});
    expect(onLevels).toHaveBeenCalledWith([
      { id: "0", label: "360p", height: 360, bitrate: undefined },
      { id: "1", label: "720p", height: 720, bitrate: undefined },
    ]);
    expect(engine.currentLevel()).toBe(AUTO_QUALITY);
    engine.setLevel("1");
    expect(hls.currentLevel).toBe(1);
    expect(engine.currentLevel()).toBe("1");
    engine.setLevel(AUTO_QUALITY);
    expect(hls.currentLevel).toBe(-1);
    engine.destroy();
    engine.destroy();
    expect(hls.destroy).toHaveBeenCalledTimes(1);
    // 销毁后不再回调
    hls.listeners.get("hlsManifestParsed")?.("hlsManifestParsed", {});
    expect(onLevels).toHaveBeenCalledTimes(1);
  });

  it("致命错误：网络 / 媒体错误先各自恢复 2 次，之后才报告", async () => {
    const { Hls, instances } = mockHls();
    const onError = vi.fn();
    await createHlsEngine({ load: async () => Hls }).attach(fakeVideo(), {
      source: { src: "a.m3u8" },
      url: "a.m3u8",
      type: "hls",
      onError,
    });
    const fire = (data: unknown) =>
      instances[0].listeners.get("hlsError")?.("hlsError", data);
    fire({ fatal: false, type: "networkError" });
    fire({ fatal: true, type: "networkError" });
    fire({ fatal: true, type: "networkError" });
    expect(instances[0].startLoad).toHaveBeenCalledTimes(2);
    expect(onError).not.toHaveBeenCalled();
    fire({ fatal: true, type: "networkError", details: "manifestLoadError" });
    expect(onError).toHaveBeenCalledTimes(1);
    expect((onError.mock.calls[0][0] as PlayerError).code).toBe("network");
    fire({ fatal: true, type: "mediaError" });
    expect(instances[0].recoverMediaError).toHaveBeenCalledTimes(1);
  });

  it("没有安装 hls.js：能原生播放就退回原生，否则提示安装", async () => {
    const missing = createHlsEngine({
      load: () => Promise.reject(new Error("Cannot find module")),
    });
    const safari = fakeVideo({ "application/vnd.apple.mpegurl": "maybe" });
    const engine = await missing.attach(safari, {
      source: { src: "https://x/a.m3u8" },
      url: "https://x/a.m3u8",
      type: "hls",
    });
    expect(engine.kind).toBe("native");
    expect(safari.getAttribute("src")).toBe("https://x/a.m3u8");
    const error = await Promise.resolve(
      missing.attach(fakeVideo(), {
        source: { src: "a.m3u8" },
        url: "a.m3u8",
        type: "hls",
      }),
    ).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(PlayerError);
    expect((error as PlayerError).code).toBe("engine-missing");
    expect((error as PlayerError).message).toContain("hls.js");
  });

  it("不支持 MSE（例如 iOS）：原生能播就用原生；preferNative 时不加载 hls.js", async () => {
    const { Hls } = mockHls(false);
    const load = vi.fn(async () => Hls);
    const ios = fakeVideo({ "application/vnd.apple.mpegurl": "probably" });
    expect(
      (
        await createHlsEngine({ load }).attach(ios, {
          source: { src: "a" },
          url: "a",
          type: "hls",
        })
      ).kind,
    ).toBe("native");
    load.mockClear();
    await createHlsEngine({ load, preferNative: true }).attach(ios, {
      source: { src: "a" },
      url: "a",
      type: "hls",
    });
    expect(load).not.toHaveBeenCalled();
    await expect(
      Promise.resolve(
        createHlsEngine({ load }).attach(fakeVideo(), {
          source: { src: "a" },
          url: "a",
          type: "hls",
        }),
      ),
    ).rejects.toMatchObject({ code: "unsupported" });
  });
});

describe("FLV / MPEG-TS 引擎（mpegts.js 适配）", () => {
  function mockMpegts(supported = true) {
    const player = {
      attachMediaElement: vi.fn(),
      detachMediaElement: vi.fn(),
      load: vi.fn(),
      unload: vi.fn(),
      destroy: vi.fn(),
      listeners: new Map<string, (...args: unknown[]) => void>(),
      on(event: string, listener: (...args: unknown[]) => void) {
        this.listeners.set(event, listener);
      },
    };
    const mod: MpegtsModuleLike = {
      isSupported: () => supported,
      createPlayer: vi.fn(() => player),
      Events: { ERROR: "error" },
      ErrorTypes: { NETWORK_ERROR: "NetworkError", MEDIA_ERROR: "MediaError" },
    };
    return { mod, player };
  }

  it("创建播放器、接到 video、加载；销毁按 unload → detach → destroy 释放", async () => {
    const { mod, player } = mockMpegts();
    const video = fakeVideo();
    const onError = vi.fn();
    const engine = await createFlvEngine({
      load: async () => ({ default: mod }),
      config: { enableWorker: true },
    }).attach(video, {
      source: { src: "live.flv", isLive: true },
      url: "live.flv",
      type: "flv",
      onError,
    });
    expect(mod.createPlayer).toHaveBeenCalledWith(
      { type: "flv", url: "live.flv", isLive: true },
      { enableWorker: true },
    );
    expect(player.attachMediaElement).toHaveBeenCalledWith(video);
    expect(player.load).toHaveBeenCalled();
    player.listeners.get("error")?.("NetworkError", "HttpStatusCodeInvalid");
    expect(onError.mock.calls[0][0]).toMatchObject({ code: "network" });
    player.unload.mockImplementation(() => {
      throw new Error("already unloaded");
    });
    engine.destroy();
    expect(player.detachMediaElement).toHaveBeenCalled();
    expect(player.destroy).toHaveBeenCalledTimes(1);
    engine.destroy();
    expect(player.destroy).toHaveBeenCalledTimes(1);
  });

  it("MPEG-TS 使用 mpegts 类型；不支持 MSE 时报不支持；没有安装时提示 mpegts.js", async () => {
    const { mod } = mockMpegts();
    await createFlvEngine({ load: async () => mod }).attach(fakeVideo(), {
      source: { src: "a.ts" },
      url: "a.ts",
      type: "mpegts",
    });
    expect(mod.createPlayer).toHaveBeenCalledWith(
      { type: "mpegts", url: "a.ts", isLive: undefined },
      undefined,
    );
    const unsupported = mockMpegts(false);
    await expect(
      Promise.resolve(
        createFlvEngine({ load: async () => unsupported.mod }).attach(
          fakeVideo(),
          {
            source: { src: "a.flv" },
            url: "a.flv",
            type: "flv",
          },
        ),
      ),
    ).rejects.toMatchObject({ code: "unsupported" });
    await expect(
      Promise.resolve(
        createFlvEngine({
          load: () => Promise.reject(new Error("nope")),
        }).attach(fakeVideo(), {
          source: { src: "a.flv" },
          url: "a.flv",
          type: "flv",
        }),
      ),
    ).rejects.toMatchObject({
      code: "engine-missing",
      message: expect.stringContaining("mpegts.js"),
    });
  });
});
