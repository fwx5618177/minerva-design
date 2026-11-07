/**
 * 录屏（录制播放器里的视频画面与声音）：`video.captureStream()` + `MediaRecorder`。
 * - 浏览器支持 `video/mp4` 时输出 MP4，否则 WebM（VP9 / VP8 + Opus）
 * - 视频有音轨时一起录制；跨域视频没有 CORS 授权时浏览器禁止捕获，给出明确错误
 * - 状态机是纯函数（nextRecordingStatus），便于测试
 */
import { getCaptureStream, getMediaRecorder } from "./features.js";
import { PlayerError } from "./engines/types.js";
import { mediaFileName } from "./screenshot.js";

export type RecordingStatus = "idle" | "starting" | "recording" | "stopping";

export type RecordingEvent =
  | { type: "start" }
  | { type: "started" }
  | { type: "stop" }
  | { type: "finished" }
  | { type: "error" };

/** 录制状态机：idle → starting → recording → stopping → idle；出错回到 idle；非法事件保持不变 */
export function nextRecordingStatus(
  status: RecordingStatus,
  event: RecordingEvent,
): RecordingStatus {
  switch (event.type) {
    case "start":
      return status === "idle" ? "starting" : status;
    case "started":
      return status === "starting" ? "recording" : status;
    case "stop":
      return status === "recording" ? "stopping" : status;
    case "finished":
      return status === "recording" || status === "stopping" ? "idle" : status;
    case "error":
      return "idle";
    default:
      return status;
  }
}

/** 候选格式：MP4 优先（更通用），其次 WebM */
export const RECORDER_MIME_CANDIDATES = [
  "video/mp4;codecs=avc1,mp4a",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
] as const;

/** 选出浏览器支持的录制格式；isTypeSupported 不可用时交给浏览器默认（空字符串） */
export function pickRecorderMimeType(
  isTypeSupported: ((mimeType: string) => boolean) | undefined,
  prefer: "mp4" | "webm" = "mp4",
): string {
  if (typeof isTypeSupported !== "function") return "";
  const ordered =
    prefer === "webm"
      ? [
          ...RECORDER_MIME_CANDIDATES.filter((m) => m.startsWith("video/webm")),
          ...RECORDER_MIME_CANDIDATES,
        ]
      : [...RECORDER_MIME_CANDIDATES];
  for (const candidate of ordered) {
    try {
      if (isTypeSupported(candidate)) return candidate;
    } catch {
      // 个别实现对未知格式抛错，视为不支持
    }
  }
  return "";
}

export function recordingExtension(mimeType: string): "mp4" | "webm" {
  return /^video\/mp4/i.test(mimeType) ? "mp4" : "webm";
}

export interface RecordingMeta {
  /** 录制时长（秒） */
  duration: number;
  mimeType: string;
  extension: "mp4" | "webm";
  fileName: string;
  hasAudio: boolean;
  /** 开始录制时的播放位置（秒） */
  startTime: number;
}

export interface RecordingResult {
  blob: Blob;
  meta: RecordingMeta;
}

export interface RecordingOptions {
  baseName?: string;
  /** 最长录制时长（秒），到时自动停止；0 / 省略表示不限制 */
  maxDurationSeconds?: number;
  prefer?: "mp4" | "webm";
  videoBitsPerSecond?: number;
  /** 便于测试注入的时钟 */
  now?: () => number;
}

export interface RecordingSession {
  readonly mimeType: string;
  readonly startedAt: number;
  /** 录制结束（手动停止、到达最长时长、出错）时完成 */
  readonly result: Promise<RecordingResult>;
  stop(): Promise<RecordingResult>;
}

function isSecurityError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    (error as { name?: unknown }).name === "SecurityError"
  );
}

/** 开始录制；不支持或无法捕获时抛出 PlayerError */
export function startRecordingSession(
  video: HTMLVideoElement,
  options: RecordingOptions = {},
): RecordingSession {
  const capture = getCaptureStream(video);
  const Recorder = getMediaRecorder();
  if (!capture || !Recorder)
    throw new PlayerError("unsupported", "当前浏览器不支持录制视频");
  let stream: MediaStream;
  try {
    stream = capture();
  } catch (error) {
    if (isSecurityError(error)) {
      throw new PlayerError(
        "tainted",
        "无法录制跨域视频：需要视频服务器允许跨域（CORS）",
      );
    }
    throw new PlayerError("unsupported", "无法捕获视频画面");
  }
  const requested = pickRecorderMimeType(
    typeof Recorder.isTypeSupported === "function"
      ? Recorder.isTypeSupported.bind(Recorder)
      : undefined,
    options.prefer,
  );
  const recorderOptions: MediaRecorderOptions = {};
  if (requested) recorderOptions.mimeType = requested;
  if (options.videoBitsPerSecond)
    recorderOptions.videoBitsPerSecond = options.videoBitsPerSecond;
  const recorder = new Recorder(stream, recorderOptions);
  const now = options.now ?? (() => Date.now());
  const startedAt = now();
  const startTime = video.currentTime;
  const chunks: Blob[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const releaseStream = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    for (const track of stream.getTracks?.() ?? []) track.stop();
  };

  const result = new Promise<RecordingResult>((resolve, reject) => {
    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      releaseStream();
      const mimeType = (recorder.mimeType || requested || "video/webm").split(
        ";",
      )[0];
      const extension = recordingExtension(mimeType);
      const blob = new Blob(chunks, { type: mimeType });
      resolve({
        blob,
        meta: {
          duration: Math.max(0, (now() - startedAt) / 1000),
          mimeType,
          extension,
          fileName: mediaFileName(options.baseName, startTime, extension),
          hasAudio: (stream.getAudioTracks?.() ?? []).length > 0,
          startTime,
        },
      });
    };
    recorder.onerror = () => {
      releaseStream();
      reject(new PlayerError("unknown", "录制失败"));
    };
  });
  // 先挂上 catch，避免没人等待时出现未处理的 rejection；调用方仍可 await result 拿到错误
  result.catch(() => undefined);

  const stop = () => {
    if (recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        releaseStream();
      }
    }
    return result;
  };

  // 每秒取一次数据，长时间录制也不会把全部内容压在最后一次回调里
  recorder.start(1000);
  const max = options.maxDurationSeconds ?? 0;
  if (max > 0) timer = setTimeout(() => void stop(), max * 1000);

  return { mimeType: requested, startedAt, result, stop };
}
