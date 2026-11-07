// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import {
  AUTO_QUALITY,
  PlayerError,
  createDashEngine,
  dashError,
  dashLevels,
  qualityOptionsFor,
  type DashModuleLike,
} from "../src";

interface FakeDashPlayer {
  listeners: Map<string, (event: unknown) => void>;
  initialize: ReturnType<typeof vi.fn>;
  updateSettings: ReturnType<typeof vi.fn>;
  reset: ReturnType<typeof vi.fn>;
  destroy?: ReturnType<typeof vi.fn>;
  setRepresentationForTypeById?: ReturnType<typeof vi.fn>;
  setQualityFor?: ReturnType<typeof vi.fn>;
  emit(event: string, payload?: unknown): void;
}

/** 模拟 dash.js：v5（Representation + destroy）或 v4（BitrateInfo + setQualityFor） */
function mockDash(
  options: { version?: 4 | 5; supported?: boolean; audioOnly?: boolean } = {},
) {
  const version = options.version ?? 5;
  const players: FakeDashPlayer[] = [];
  const video = options.audioOnly
    ? []
    : [
        { id: "v360", height: 360, bandwidth: 800_000, bitrate: 800_000 },
        { id: "v1080", height: 1080, bandwidth: 5_000_000, bitrate: 5_000_000 },
      ];
  const audio: Array<{
    id: string;
    height?: number;
    bandwidth: number;
    bitrate: number;
  }> = [{ id: "a128", bandwidth: 128_000, bitrate: 128_000 }];
  const list = (type: string) => (type === "video" ? video : audio);
  const create = () => {
    const listeners = new Map<string, (event: unknown) => void>();
    const player: FakeDashPlayer & Record<string, unknown> = {
      listeners,
      initialize: vi.fn(),
      updateSettings: vi.fn(),
      reset: vi.fn(),
      on: (event: string, listener: (event: unknown) => void) =>
        listeners.set(event, listener),
      emit: (event, payload) => listeners.get(event)?.(payload),
    };
    if (version === 5) {
      player.destroy = vi.fn();
      player.getRepresentationsByType = list;
      player.setRepresentationForTypeById = vi.fn();
    } else {
      player.getBitrateInfoListFor = (type: string) =>
        list(type).map(({ height, bitrate }) => ({ height, bitrate }));
      player.setQualityFor = vi.fn();
    }
    players.push(player);
    return player;
  };
  const MediaPlayer = Object.assign(() => ({ create }), {
    events: { STREAM_INITIALIZED: "streamInitialized", ERROR: "error" },
  });
  const mod = {
    MediaPlayer,
    supportsMediaSource: () => options.supported ?? true,
  } as unknown as DashModuleLike;
  return { mod, players };
}

describe("DASH 引擎（dash.js 适配）", () => {
  it("v5：加载、档位、手动切换（关闭 ABR）、自动、错误、销毁", async () => {
    const { mod, players } = mockDash();
    const factory = createDashEngine({
      load: async () => ({ default: mod }),
      settings: { streaming: { delay: { liveDelay: 4 } } },
    });
    expect(factory.handles("dash")).toBe(true);
    expect(factory.handles("hls")).toBe(false);
    const onLevels = vi.fn();
    const onError = vi.fn();
    const video = document.createElement("video");
    video.autoplay = true;
    const engine = await factory.attach(video, {
      source: { src: "https://x/live.mpd" },
      url: "https://x/live.mpd",
      type: "dash",
      onLevels,
      onError,
    });
    const player = players[0];
    expect(engine.kind).toBe("dash");
    expect(player.updateSettings).toHaveBeenCalledWith({
      streaming: { delay: { liveDelay: 4 } },
    });
    expect(player.initialize).toHaveBeenCalledWith(
      video,
      "https://x/live.mpd",
      true,
    );

    player.emit("streamInitialized");
    const levels = onLevels.mock.calls[0][0];
    expect(levels.map((level: { label: string }) => level.label)).toEqual([
      "360p",
      "1080p",
    ]);
    expect(
      qualityOptionsFor({ src: "a.mpd" }, levels).map((q) => q.id),
    ).toEqual([AUTO_QUALITY, "1", "0"]);

    expect(engine.currentLevel()).toBe(AUTO_QUALITY);
    engine.setLevel("1");
    expect(player.updateSettings).toHaveBeenLastCalledWith({
      streaming: { abr: { autoSwitchBitrate: { video: false } } },
    });
    expect(player.setRepresentationForTypeById).toHaveBeenCalledWith(
      "video",
      "v1080",
      true,
    );
    expect(engine.currentLevel()).toBe("1");
    engine.setLevel("9");
    expect(engine.currentLevel()).toBe("1");
    engine.setLevel(AUTO_QUALITY);
    expect(player.updateSettings).toHaveBeenLastCalledWith({
      streaming: { abr: { autoSwitchBitrate: { video: true } } },
    });
    expect(engine.currentLevel()).toBe(AUTO_QUALITY);

    player.emit("error", { error: { code: 17, message: "segment 404" } });
    expect(onError.mock.calls[0][0]).toMatchObject({ code: "network" });

    engine.destroy();
    engine.destroy();
    expect(player.destroy).toHaveBeenCalledTimes(1);
    // 销毁后不再回调
    player.emit("error", { error: { code: 11 } });
    player.emit("streamInitialized");
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onLevels).toHaveBeenCalledTimes(1);
  });

  it("v4 接口：BitrateInfo + setQualityFor，reset 释放；纯音频 DASH 用音频档位", async () => {
    const { mod, players } = mockDash({ version: 4 });
    const engine = await createDashEngine({ load: async () => mod }).attach(
      document.createElement("video"),
      { source: { src: "a.mpd" }, url: "a.mpd", type: "dash" },
    );
    expect(engine.levels().map((level) => level.label)).toEqual([
      "360p",
      "1080p",
    ]);
    engine.setLevel("0");
    expect(players[0].setQualityFor).toHaveBeenCalledWith("video", 0, true);
    engine.destroy();
    expect(players[0].reset).toHaveBeenCalledTimes(1);

    const audio = mockDash({ audioOnly: true });
    const audioEngine = await createDashEngine({
      load: async () => audio.mod,
    }).attach(document.createElement("video"), {
      source: { src: "radio.mpd" },
      url: "radio.mpd",
      type: "dash",
    });
    expect(audioEngine.levels().map((level) => level.label)).toEqual([
      "128 kbps",
    ]);
    audioEngine.setLevel("0");
    expect(audio.players[0].setRepresentationForTypeById).toHaveBeenCalledWith(
      "audio",
      "a128",
      true,
    );
  });

  it("换片：旧引擎销毁后新引擎独立工作", async () => {
    const { mod, players } = mockDash();
    const factory = createDashEngine({ load: async () => mod });
    const video = document.createElement("video");
    const first = await factory.attach(video, {
      source: { src: "a.mpd" },
      url: "a.mpd",
      type: "dash",
    });
    first.destroy();
    const second = await factory.attach(video, {
      source: { src: "b.mpd" },
      url: "b.mpd",
      type: "dash",
    });
    expect(players).toHaveLength(2);
    expect(players[0].destroy).toHaveBeenCalledTimes(1);
    expect(players[1].destroy).not.toHaveBeenCalled();
    expect(players[1].initialize).toHaveBeenCalledWith(video, "b.mpd", false);
    second.destroy();
  });

  it("没有安装 dashjs / 不支持 MSE：给出明确错误", async () => {
    const video = document.createElement("video");
    const options = {
      source: { src: "a.mpd" },
      url: "a.mpd",
      type: "dash" as const,
    };
    const missing = createDashEngine({
      load: async () => {
        throw new Error("Cannot find module dashjs");
      },
    });
    await expect(missing.attach(video, options)).rejects.toMatchObject({
      code: "engine-missing",
      message: expect.stringContaining("dashjs"),
    });
    const empty = createDashEngine({ load: async () => ({}) });
    await expect(empty.attach(video, options)).rejects.toMatchObject({
      code: "engine-missing",
    });
    const noMse = createDashEngine({
      load: async () => mockDash({ supported: false }).mod,
    });
    await expect(noMse.attach(video, options)).rejects.toMatchObject({
      code: "unsupported",
    });
  });

  it("错误映射：网络 / 内容 / MSE / DRM / v4 旧格式", () => {
    const cases: Array<[unknown, string]> = [
      [{ error: { code: 11, message: "manifest 404" } }, "network"],
      [{ error: { code: 10 } }, "media"],
      [{ error: { code: 20 } }, "media"],
      [{ error: { code: 23 } }, "unsupported"],
      [{ error: { code: 24 } }, "unsupported"],
      [{ error: { code: 112 } }, "unsupported"],
      [{ error: "download" }, "network"],
      [{ error: "mediasource" }, "media"],
      [undefined, "media"],
    ];
    for (const [raw, code] of cases) {
      const error = dashError(raw);
      expect(error).toBeInstanceOf(PlayerError);
      expect(error.code).toBe(code);
    }
    expect(
      dashError({ error: { code: 11, message: "manifest 404" } }).message,
    ).toContain("manifest 404");
    expect(dashError({ error: { code: 112 } }).message).toContain("DRM");
    expect(
      dashLevels([{ bandwidth: 64_000 }]).map((level) => level.label),
    ).toEqual(["64 kbps"]);
  });
});
