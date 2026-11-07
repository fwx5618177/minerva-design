// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PLAYBACK_RATES,
  captureFrame,
  keyAction,
  mediaFileName,
  nextRecordingStatus,
  pickRecorderMimeType,
  recordingExtension,
  startRecordingSession,
  stepPlaybackRate,
  supportsElementFullscreen,
  supportsPictureInPicture,
  supportsRecording,
  type RecordingStatus,
} from "../src";
import {
  installCanvasMock,
  installRecorderMock,
  readyVideo,
} from "./media-mocks";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("快捷键与播放速度", () => {
  it("按键 → 动作；修饰键不处理；按钮上的空格交给按钮", () => {
    expect(keyAction({ key: " " })).toBe("toggle-play");
    expect(keyAction({ key: " ", onButton: true })).toBeNull();
    expect(keyAction({ key: "K" })).toBe("toggle-play");
    expect(keyAction({ key: "s" })).toBe("screenshot");
    expect(keyAction({ key: "R" })).toBe("toggle-record");
    expect(keyAction({ key: "<" })).toBe("speed-down");
    expect(keyAction({ key: ">" })).toBe("speed-up");
    expect(keyAction({ key: "c" })).toBe("toggle-captions");
    expect(keyAction({ key: "p" })).toBe("toggle-pip");
    expect(keyAction({ key: "s", metaKey: true })).toBeNull();
    expect(keyAction({ key: "x" })).toBeNull();
  });

  it("播放速度 0.5–2x，到头不变，不在列表里时移到相邻一档", () => {
    expect(PLAYBACK_RATES[0]).toBe(0.5);
    expect(PLAYBACK_RATES[PLAYBACK_RATES.length - 1]).toBe(2);
    expect(stepPlaybackRate(1, 1)).toBe(1.25);
    expect(stepPlaybackRate(1, -1)).toBe(0.75);
    expect(stepPlaybackRate(2, 1)).toBe(2);
    expect(stepPlaybackRate(0.5, -1)).toBe(0.5);
    expect(stepPlaybackRate(1.1, 1)).toBe(1.25);
    expect(stepPlaybackRate(1.1, -1)).toBe(1);
  });
});

describe("截图", () => {
  it("当前画面 → PNG Blob，带时间与尺寸；文件名清洗非法字符", async () => {
    const { drawImage } = installCanvasMock();
    const video = readyVideo(640, 360, 65.4);
    const { blob, meta } = await captureFrame(video, {
      baseName: "离港/第1场",
    });
    expect(blob.type).toBe("image/png");
    expect(drawImage).toHaveBeenCalledWith(video, 0, 0, 640, 360);
    expect(meta).toMatchObject({
      width: 640,
      height: 360,
      time: 65.4,
      mimeType: "image/png",
    });
    expect(meta.fileName).toBe("离港-第1场-1m05s.png");
    expect(mediaFileName("", 3, "webm")).toBe("video-0m03s.webm");
  });

  it("跨域视频（canvas 被污染）给出明确错误；画面没加载好时提示稍后", async () => {
    installCanvasMock({ taint: true });
    await expect(captureFrame(readyVideo(640, 360, 1))).rejects.toMatchObject({
      code: "tainted",
      message: expect.stringContaining("CORS"),
    });
    const notReady = document.createElement("video");
    await expect(captureFrame(notReady)).rejects.toMatchObject({
      code: "not-ready",
    });
  });
});

describe("录制", () => {
  it("状态机：idle → starting → recording → stopping → idle；出错回到 idle；非法事件不变", () => {
    let status: RecordingStatus = "idle";
    status = nextRecordingStatus(status, { type: "stop" });
    expect(status).toBe("idle");
    status = nextRecordingStatus(status, { type: "start" });
    expect(status).toBe("starting");
    expect(nextRecordingStatus(status, { type: "start" })).toBe("starting");
    status = nextRecordingStatus(status, { type: "started" });
    expect(status).toBe("recording");
    status = nextRecordingStatus(status, { type: "stop" });
    expect(status).toBe("stopping");
    status = nextRecordingStatus(status, { type: "finished" });
    expect(status).toBe("idle");
    expect(nextRecordingStatus("recording", { type: "error" })).toBe("idle");
    expect(nextRecordingStatus("recording", { type: "finished" })).toBe("idle");
  });

  it("格式：支持 MP4 时优先 MP4，否则 WebM；isTypeSupported 不可用时交给浏览器", () => {
    expect(pickRecorderMimeType((m) => m.startsWith("video/mp4"))).toBe(
      "video/mp4;codecs=avc1,mp4a",
    );
    expect(
      pickRecorderMimeType(
        (m) => m === "video/webm;codecs=vp8,opus" || m === "video/webm",
      ),
    ).toBe("video/webm;codecs=vp8,opus");
    expect(pickRecorderMimeType((m) => m.startsWith("video/"), "webm")).toBe(
      "video/webm;codecs=vp9,opus",
    );
    expect(
      pickRecorderMimeType(() => {
        throw new Error("bad");
      }),
    ).toBe("");
    expect(pickRecorderMimeType(undefined)).toBe("");
    expect(recordingExtension("video/mp4")).toBe("mp4");
    expect(recordingExtension("video/webm;codecs=vp9")).toBe("webm");
  });

  it("captureStream + MediaRecorder：带音轨录制，停止后得到 Blob 与元信息，释放捕获流", async () => {
    const mock = installRecorderMock({
      supported: ["video/webm;codecs=vp9,opus"],
    });
    const video = readyVideo(320, 180, 12);
    let clock = 1000;
    const session = startRecordingSession(video, {
      baseName: "离港",
      now: () => clock,
    });
    expect(session.mimeType).toBe("video/webm;codecs=vp9,opus");
    expect(mock.instances[0]).toMatchObject({
      state: "recording",
      mimeType: session.mimeType,
    });
    clock += 2500;
    const { blob, meta } = await session.stop();
    expect(blob.size).toBeGreaterThan(0);
    expect(blob.type).toBe("video/webm");
    expect(meta).toMatchObject({
      duration: 2.5,
      extension: "webm",
      hasAudio: true,
      startTime: 12,
    });
    expect(meta.fileName).toBe("离港-0m12s.webm");
    expect(mock.trackStop).toHaveBeenCalled();
  });

  it("到达最长时长自动停止", async () => {
    vi.useFakeTimers();
    try {
      installRecorderMock({ supported: ["video/mp4"] });
      const session = startRecordingSession(readyVideo(320, 180, 0), {
        maxDurationSeconds: 3,
      });
      vi.advanceTimersByTime(3000);
      const { meta } = await session.result;
      expect(meta.extension).toBe("mp4");
    } finally {
      vi.useRealTimers();
    }
  });

  it("不支持 / 跨域时抛出明确错误", () => {
    const video = readyVideo(320, 180, 0);
    Object.defineProperty(video, "captureStream", {
      configurable: true,
      value: undefined,
    });
    vi.stubGlobal("MediaRecorder", undefined);
    expect(() => startRecordingSession(video)).toThrow(/不支持录制/);
    installRecorderMock({ supported: [], captureThrows: true });
    expect(() => startRecordingSession(readyVideo(320, 180, 0))).toThrow(
      /跨域/,
    );
  });
});

describe("能力检测（缺失时降级）", () => {
  it("全屏：标准 / webkit 前缀 / 都没有", () => {
    const plain = document.createElement("div");
    expect(supportsElementFullscreen(plain)).toBe(false);
    const webkit = document.createElement("div");
    Object.assign(webkit, { webkitRequestFullscreen: () => undefined });
    expect(supportsElementFullscreen(webkit)).toBe(true);
    expect(supportsElementFullscreen(null)).toBe(false);
  });

  it("画中画：标准 API、Safari presentation mode、disablePictureInPicture", () => {
    const video = document.createElement("video");
    expect(supportsPictureInPicture(video)).toBe(false);
    Object.assign(video, {
      webkitSupportsPresentationMode: (mode: string) =>
        mode === "picture-in-picture",
    });
    expect(supportsPictureInPicture(video)).toBe(true);
    video.disablePictureInPicture = true;
    expect(supportsPictureInPicture(video)).toBe(false);
  });

  it("录制：需要 captureStream 与 MediaRecorder 同时可用", () => {
    const video = document.createElement("video");
    vi.stubGlobal("MediaRecorder", undefined);
    expect(supportsRecording(video)).toBe(false);
    installRecorderMock({ supported: ["video/webm"] });
    expect(supportsRecording(video)).toBe(true);
  });
});
