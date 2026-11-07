/** 测试用的浏览器媒体能力替身（happy-dom 没有 canvas 绘制、MediaRecorder、captureStream 的真实实现） */
import { vi } from "vitest";

/** 已读到画面的 video（尺寸、时长、当前时间、readyState） */
export function readyVideo(
  width: number,
  height: number,
  time: number,
): HTMLVideoElement {
  const video = document.createElement("video");
  Object.defineProperty(video, "videoWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(video, "videoHeight", {
    configurable: true,
    value: height,
  });
  Object.defineProperty(video, "readyState", { configurable: true, value: 4 });
  video.currentTime = time;
  return video;
}

/** canvas：drawImage 记录调用；toBlob 输出 PNG；taint 时 toBlob 抛 SecurityError */
export function installCanvasMock(options: { taint?: boolean } = {}) {
  const drawImage = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () => ({ drawImage }) as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(
    function toBlob(callback: BlobCallback, type?: string) {
      if (options.taint) {
        const error = new Error(
          "The canvas has been tainted by cross-origin data.",
        );
        error.name = "SecurityError";
        throw error;
      }
      callback(
        new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], {
          type: type ?? "image/png",
        }),
      );
    },
  );
  return { drawImage };
}

interface FakeRecorderInstance {
  mimeType: string;
  state: "inactive" | "recording";
}

/** MediaRecorder + captureStream：stop 时产出一段数据并触发 onstop */
export function installRecorderMock(options: {
  supported: string[];
  captureThrows?: boolean;
}) {
  const instances: FakeRecorderInstance[] = [];
  const trackStop = vi.fn();
  class FakeRecorder {
    static isTypeSupported = (mime: string) => options.supported.includes(mime);
    mimeType: string;
    state: "inactive" | "recording" = "inactive";
    ondataavailable: ((event: { data: Blob }) => void) | null = null;
    onstop: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor(_stream: MediaStream, recorderOptions?: MediaRecorderOptions) {
      this.mimeType = recorderOptions?.mimeType ?? "";
      instances.push(this);
    }
    start() {
      this.state = "recording";
    }
    stop() {
      this.state = "inactive";
      this.ondataavailable?.({
        data: new Blob([new Uint8Array([0x1a, 0x45, 0xdf, 0xa3])]),
      });
      this.onstop?.();
    }
  }
  vi.stubGlobal("MediaRecorder", FakeRecorder);
  const track = { stop: trackStop, kind: "audio" };
  const stream = { getTracks: () => [track], getAudioTracks: () => [track] };
  Object.defineProperty(HTMLMediaElement.prototype, "captureStream", {
    configurable: true,
    writable: true,
    value: () => {
      if (options.captureThrows) {
        const error = new Error("cross-origin");
        error.name = "SecurityError";
        throw error;
      }
      return stream;
    },
  });
  return { instances, trackStop };
}
