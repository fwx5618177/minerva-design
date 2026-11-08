import { describe, expect, it, vi } from "vitest";
import {
  EMPTY_AB,
  MIN_AB_SPAN,
  abActive,
  abLoopTarget,
  applyAbCommand,
  canDecodeWaveform,
  canPlay,
  clearWaveformCache,
  computePeaks,
  computePeaksChunked,
  cycleAb,
  keyAction,
  loadWaveform,
  nextTrackIndex,
  previousTrackAction,
  resamplePeaks,
  sessionHandlerFor,
  setAbPoint,
  type CapabilityProbe,
  type DecodedAudio,
} from "../src";
import {
  runKeyAction,
  LONG_SEEK_SECONDS,
  type KeyActionContext,
} from "../src/keyboard";

/** 合成的 PCM：前一半振幅 0.25，后一半振幅 1（正弦） */
function syntheticPcm(length = 4000): Float32Array {
  const data = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    const amplitude = index < length / 2 ? 0.25 : 1;
    data[index] = amplitude * Math.sin((2 * Math.PI * index) / 40);
  }
  return data;
}

describe("波形峰值", () => {
  it("computePeaks：每段取绝对值最大值并按全曲最大值归一化", () => {
    const peaks = computePeaks([syntheticPcm()], 4);
    expect(peaks).toHaveLength(4);
    expect(peaks[0]).toBeCloseTo(0.25, 2);
    expect(peaks[1]).toBeCloseTo(0.25, 2);
    expect(peaks[2]).toBe(1);
    expect(peaks[3]).toBe(1);
  });

  it("多声道取最大；静音全 0；空输入不报错", () => {
    const left = new Float32Array([0.1, -0.1, 0, 0]);
    const right = new Float32Array([0, 0, -0.5, 0.2]);
    expect(computePeaks([left, right], 2)).toEqual([0.2, 1]);
    expect(computePeaks([new Float32Array(100)], 3)).toEqual([0, 0, 0]);
    expect(computePeaks([], 3)).toEqual([0, 0, 0]);
  });

  it("分块计算与同步计算结果相同，并在块之间让出主线程", async () => {
    const pcm = syntheticPcm(10_000);
    const yieldFn = vi.fn(() => Promise.resolve());
    const chunked = await computePeaksChunked([pcm], 50, {
      chunkSamples: 1024,
      yieldFn,
    });
    expect(chunked).toEqual(computePeaks([pcm], 50));
    expect(yieldFn).toHaveBeenCalledTimes(9);
  });

  it("分块计算可以取消", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      computePeaksChunked([syntheticPcm()], 10, { signal: controller.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
  });

  it("resamplePeaks：降采样取每组最大值，升采样按位置取值", () => {
    expect(resamplePeaks([0.1, 0.9, 0.2, 0.3], 2)).toEqual([0.9, 0.3]);
    expect(resamplePeaks([0.5, 1], 4)).toEqual([0.5, 0.5, 1, 1]);
    expect(resamplePeaks([], 3)).toEqual([0, 0, 0]);
  });

  it("canDecodeWaveform：blob / data / 相对 / 同源可以；跨域只有声明 CORS 时；其他协议不行", () => {
    const origin = "https://app.example.com";
    expect(canDecodeWaveform("blob:https://app.example.com/1")).toBe(true);
    expect(canDecodeWaveform("data:audio/wav;base64,AAAA")).toBe(true);
    expect(canDecodeWaveform("media/a.mp3", { origin })).toBe(true);
    expect(canDecodeWaveform("https://app.example.com/a.mp3", { origin })).toBe(
      true,
    );
    expect(canDecodeWaveform("https://cdn.example.com/a.mp3", { origin })).toBe(
      false,
    );
    expect(
      canDecodeWaveform("https://cdn.example.com/a.mp3", {
        origin,
        cors: true,
      }),
    ).toBe(true);
    expect(canDecodeWaveform("rtmp://x/live", { origin, cors: true })).toBe(
      false,
    );
    expect(canDecodeWaveform("")).toBe(false);
  });

  it("loadWaveform：取字节 → 解码 → 峰值；自定义解码不缓存；太大不解码", async () => {
    clearWaveformCache();
    const audio: DecodedAudio = {
      numberOfChannels: 1,
      length: 4000,
      duration: 2,
      getChannelData: () => syntheticPcm(),
    };
    const decoder = vi.fn(async () => audio);
    const fetcher = vi.fn(async () => new Response(new Uint8Array(16)));
    const options = {
      fetcher,
      decoder,
      resolution: 8,
      yieldFn: () => Promise.resolve(),
    };
    const first = await loadWaveform("blob:x/1", options);
    expect(first.duration).toBe(2);
    expect(first.peaks).toHaveLength(8);
    expect(Math.max(...first.peaks)).toBe(1);
    await loadWaveform("blob:x/1", options);
    expect(fetcher).toHaveBeenCalledTimes(2);

    const failing = vi.fn(async () => {
      throw new Error("bad");
    });
    await expect(
      loadWaveform("blob:x/2", { ...options, decoder: failing }),
    ).rejects.toThrow();
    await expect(loadWaveform("blob:x/2", options)).resolves.toBeTruthy();

    await expect(
      loadWaveform("blob:x/3", { ...options, maxBytes: 4 }),
    ).rejects.toThrow(/太大/);
    await expect(
      loadWaveform("blob:x/4", { ...options, decoder: null }),
    ).rejects.toThrow(/WebAudio/);
    clearWaveformCache();
  });
});

describe("A-B 循环（纯函数）", () => {
  it("设 A、设 B；B 早于 A 时交换；两点太近忽略", () => {
    const a = setAbPoint(EMPTY_AB, "a", 5, 60);
    expect(a).toEqual({ a: 5, b: null });
    expect(abActive(a)).toBe(false);
    expect(setAbPoint(a, "b", 9, 60)).toEqual({ a: 5, b: 9 });
    expect(setAbPoint(a, "b", 2, 60)).toEqual({ a: 2, b: 5 });
    expect(setAbPoint(a, "b", 5 + MIN_AB_SPAN / 2, 60)).toBe(a);
    // 越界限制在 [0, duration]
    expect(setAbPoint(EMPTY_AB, "a", 99, 60)).toEqual({ a: 60, b: null });
  });

  it("按钮循环：设 A → 设 B → 清除；越过 B 点跳回 A", () => {
    let range = cycleAb(EMPTY_AB, 3, 20);
    range = cycleAb(range, 6, 20);
    expect(range).toEqual({ a: 3, b: 6 });
    expect(abLoopTarget(range, 5.9)).toBeNull();
    expect(abLoopTarget(range, 6)).toBe(3);
    expect(abLoopTarget({ a: 3, b: null }, 100)).toBeNull();
    expect(cycleAb(range, 7, 20)).toEqual(EMPTY_AB);
    expect(applyAbCommand(range, "clear", 0, 20)).toEqual(EMPTY_AB);
    expect(applyAbCommand(EMPTY_AB, "set-b", 4, 20)).toEqual({ a: null, b: 4 });
  });
});

describe("播放列表（纯函数）", () => {
  it("上一首：超过 3 秒先回到开头；第一首回到开头；下一首到末尾为 null", () => {
    expect(previousTrackAction(2, 10, 3)).toEqual({ type: "restart" });
    expect(previousTrackAction(2, 1, 3)).toEqual({ type: "go", index: 1 });
    expect(previousTrackAction(0, 1, 3)).toEqual({ type: "restart" });
    expect(previousTrackAction(0, 0, 3)).toBeNull();
    expect(nextTrackIndex(0, 3)).toBe(1);
    expect(nextTrackIndex(2, 3)).toBeNull();
  });
});

describe("媒体会话动作映射", () => {
  it("快进快退默认 10 秒、seekto 用 seekTime；没有播放列表时不注册上一首 / 下一首", () => {
    const handlers = {
      play: vi.fn(),
      pause: vi.fn(),
      seekTo: vi.fn(),
      seekBy: vi.fn(),
    };
    sessionHandlerFor("seekbackward", handlers)?.({});
    expect(handlers.seekBy).toHaveBeenLastCalledWith(-10);
    sessionHandlerFor("seekforward", handlers)?.({ seekOffset: 30 });
    expect(handlers.seekBy).toHaveBeenLastCalledWith(30);
    sessionHandlerFor("seekto", handlers)?.({ seekTime: 42 });
    expect(handlers.seekTo).toHaveBeenCalledWith(42);
    sessionHandlerFor("stop", handlers)?.({});
    expect(handlers.pause).toHaveBeenCalled();
    expect(sessionHandlerFor("nexttrack", handlers)).toBeNull();
    expect(
      sessionHandlerFor("nexttrack", { ...handlers, next: vi.fn() }),
    ).toBeTypeOf("function");
  });
});

describe("快捷键（音频与视频一致）", () => {
  it("L 循环、[ ] \\ A-B、Shift+←/→ 15 秒、Shift+N/P 曲目；P 仍是画中画", () => {
    expect(keyAction({ key: "l" })).toBe("toggle-loop");
    expect(keyAction({ key: "[" })).toBe("ab-set-a");
    expect(keyAction({ key: "]" })).toBe("ab-set-b");
    expect(keyAction({ key: "\\" })).toBe("ab-clear");
    expect(keyAction({ key: "ArrowLeft", shiftKey: true })).toBe(
      "seek-back-long",
    );
    expect(keyAction({ key: "ArrowRight", shiftKey: true })).toBe(
      "seek-forward-long",
    );
    expect(keyAction({ key: "N", shiftKey: true })).toBe("next-track");
    expect(keyAction({ key: "P", shiftKey: true })).toBe("previous-track");
    expect(keyAction({ key: "p" })).toBe("toggle-pip");
  });

  it("可选能力不提供时不拦截按键", () => {
    const base = {
      show: {},
      hasSound: true,
      hasCaptions: false,
      togglePlay: vi.fn(),
      seekBy: vi.fn(),
      changeVolume: vi.fn(),
      toggleMute: vi.fn(),
      toggleFullscreen: vi.fn(),
      screenshot: vi.fn(),
      toggleRecord: vi.fn(),
      stepSpeed: vi.fn(),
      toggleCaptions: vi.fn(),
      togglePip: vi.fn(),
    } satisfies KeyActionContext;
    expect(runKeyAction("toggle-loop", base)).toBe(false);
    expect(runKeyAction("next-track", base)).toBe(false);
    expect(runKeyAction("seek-forward-long", base)).toBe(true);
    expect(base.seekBy).toHaveBeenLastCalledWith(LONG_SEEK_SECONDS);
    const abRepeat = vi.fn();
    expect(runKeyAction("ab-set-a", { ...base, abRepeat })).toBe(true);
    expect(abRepeat).toHaveBeenCalledWith("set-a");
  });
});

describe("canPlay：音频编码", () => {
  // 模拟 Chromium：认 MP3 / AAC / Opus / Vorbis / FLAC / WAV，不认 ALAC / AMR / AC-3
  const supported = new Set([
    "audio/mpeg",
    "audio/mp4",
    'audio/mp4; codecs="mp4a.40.2"',
    'audio/mp4; codecs="mp4a.40.5"',
    'audio/ogg; codecs="opus"',
    'audio/ogg; codecs="vorbis"',
    "audio/flac",
    "audio/wav",
    'audio/wav; codecs="1"',
  ]);
  const mse = new Set([
    'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
    'audio/mp4; codecs="mp4a.40.2"',
    'audio/webm; codecs="opus"',
  ]);
  const probe: CapabilityProbe = {
    canPlayType: (mime) => (supported.has(mime) ? "probably" : ""),
    isTypeSupported: (mime) => mse.has(mime),
  };
  const support = (result: ReturnType<typeof canPlay>, label: string) =>
    result.codecs?.find((codec) => codec.label === label)?.supported;

  it("渐进式音频：按 canPlayType 报告各编码", () => {
    const result = canPlay("https://x/a.m4a", { probe });
    expect(result).toMatchObject({
      playable: true,
      engine: "native",
      audioOnly: true,
    });
    expect(support(result, "MP3")).toBe(true);
    expect(support(result, "AAC")).toBe(true);
    expect(support(result, "Opus")).toBe(true);
    expect(support(result, "Vorbis")).toBe(true);
    expect(support(result, "FLAC")).toBe(true);
    expect(support(result, "ALAC")).toBe(false);
    // 视频源不带音频编码表
    expect(canPlay("https://x/a.mp4", { probe }).codecs).toBeUndefined();
  });

  it("声明 codecs 时精确探测：ALAC 不能播，并给出转码建议", () => {
    const alac = canPlay(
      { src: "https://x/a.m4a", mimeType: 'audio/mp4; codecs="alac"' },
      { probe },
    );
    expect(alac.playable).toBe(false);
    expect(alac.reason).toContain("ALAC");
    expect(alac.reason).toContain("ffmpeg");
    const aac = canPlay(
      { src: "https://x/a.m4a", mimeType: 'audio/mp4; codecs="mp4a.40.2"' },
      { probe },
    );
    expect(aac.playable).toBe(true);
  });

  it("AMR / WMA 按音频识别，不能播时说明原因与转码方法", () => {
    const amr = canPlay("https://x/voice.amr", { probe });
    expect(amr).toMatchObject({
      playable: false,
      type: "audio",
      audioOnly: true,
    });
    expect(amr.reason).toContain("AMR");
    expect(amr.reason).toMatch(/AAC/);
    expect(canPlay("https://x/old.wma", { probe }).reason).toContain("WMA");
  });

  it("纯音频 HLS / DASH：走流媒体引擎，按 MSE 报告音频编码", () => {
    const hls = canPlay(
      { src: "https://x/radio.m3u8", audioOnly: true },
      { probe },
    );
    expect(hls).toMatchObject({
      playable: true,
      engine: "hls",
      audioOnly: true,
    });
    expect(support(hls, "AAC")).toBe(true);
    expect(support(hls, "Opus")).toBe(true);
    expect(support(hls, "FLAC")).toBe(false);
    const dash = canPlay(
      { src: "https://x/podcast.mpd", audioOnly: true },
      { probe },
    );
    expect(dash).toMatchObject({
      playable: true,
      engine: "dash",
      audioOnly: true,
    });
    expect(dash.codecs?.length).toBeGreaterThan(0);
  });
});
