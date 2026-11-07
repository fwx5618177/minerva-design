/**
 * 截图 / 录制的按钮动作（只在视频界面显示；音频界面没有画面可截）：
 * 结果交给 onScreenshot / onRecording（默认下载），完成后提示；回调返回 false（例如取消保存）时不提示。
 */
import { useCallback, useRef } from "react";
import { useRecording } from "./hooks.js";
import {
  captureFrame,
  downloadBlob,
  type ScreenshotMeta,
} from "./screenshot.js";
import type { RecordingMeta } from "./recorder.js";
import { PlayerError, toPlayerError } from "./engines/types.js";

type SaveResult = void | boolean | Promise<void | boolean>;

export interface CaptureCallbacks {
  onScreenshot?: (blob: Blob, meta: ScreenshotMeta) => SaveResult;
  onRecording?: (blob: Blob, meta: RecordingMeta) => SaveResult;
  onError?: (error: PlayerError) => void;
}

export interface UseCaptureActionsOptions {
  title: string;
  screenshotType?: "image/png" | "image/jpeg" | "image/webp";
  maxRecordingSeconds: number;
  /** 总是读最新的回调 */
  callbacks: React.RefObject<CaptureCallbacks>;
  showNotice: (message: string, tone?: "info" | "error") => void;
  /** 开始录制前（例如从自动播放的静音状态恢复声音） */
  beforeRecord: () => void;
}

export function useCaptureActions(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options: UseCaptureActionsOptions,
) {
  const { title, screenshotType, maxRecordingSeconds, callbacks, showNotice } =
    options;
  const beforeRecordRef = useRef(options.beforeRecord);
  beforeRecordRef.current = options.beforeRecord;

  const recording = useRecording(videoRef, {
    baseName: title,
    maxDurationSeconds: maxRecordingSeconds,
    onResult: ({ blob, meta }) => {
      const handler = callbacks.current?.onRecording;
      Promise.resolve(
        handler ? handler(blob, meta) : downloadBlob(blob, meta.fileName),
      ).then(
        (handled) => {
          if (handled !== false)
            showNotice(`录制完成 ${Math.round(meta.duration)} 秒`);
        },
        (failure: unknown) =>
          showNotice(toPlayerError(failure, "保存录制失败").message, "error"),
      );
    },
    onError: (failure) => {
      showNotice(failure.message, "error");
      callbacks.current?.onError?.(failure);
    },
  });

  /** 截取当前画面（ref API 直接返回 Blob，不触发回调 / 下载） */
  const captureCurrent = useCallback(async () => {
    const video = videoRef.current;
    if (!video) throw new PlayerError("not-ready", "视频还没有加载");
    return captureFrame(video, { mimeType: screenshotType, baseName: title });
  }, [videoRef, screenshotType, title]);

  /** 按钮 / 快捷键：截图 → 交给 onScreenshot（默认下载）→ 提示 */
  const screenshotWithNotice = useCallback(() => {
    captureCurrent()
      .then(async ({ blob, meta }) => {
        const handler = callbacks.current?.onScreenshot;
        return handler
          ? handler(blob, meta)
          : downloadBlob(blob, meta.fileName);
      })
      .then(
        (handled) => {
          if (handled !== false) showNotice("已截图");
        },
        (failure: unknown) => {
          const playerError = toPlayerError(failure, "截图失败");
          showNotice(playerError.message, "error");
          callbacks.current?.onError?.(playerError);
        },
      );
  }, [captureCurrent, callbacks, showNotice]);

  const toggleRecord = useCallback(() => {
    if (recording.status === "recording") void recording.stop();
    else if (recording.status === "idle") {
      beforeRecordRef.current();
      void recording.start();
    }
  }, [recording]);

  return { recording, captureCurrent, screenshotWithNotice, toggleRecord };
}
