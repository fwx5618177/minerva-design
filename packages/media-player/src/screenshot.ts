/**
 * 截图：把当前画面画到 canvas，输出 PNG（或 JPEG / WebP）Blob。
 * 本地文件、blob: 地址与同源视频都能截；跨域视频没有 CORS 授权时 canvas 被「污染」，
 * 浏览器禁止读取像素，这里给出明确的错误（需要服务器返回 CORS 头并设置 crossOrigin 属性）。
 */
import { PlayerError } from "./engines/types.js";

export interface ScreenshotMeta {
  /** 截图时的播放位置（秒） */
  time: number;
  width: number;
  height: number;
  mimeType: string;
  /** 建议的文件名（不含目录） */
  fileName: string;
}

export interface ScreenshotOptions {
  mimeType?: "image/png" | "image/jpeg" | "image/webp";
  /** JPEG / WebP 质量 0–1 */
  quality?: number;
  /** 文件名前缀（通常是视频标题） */
  baseName?: string;
  /** 缩略图可限制输出宽度；默认保留原始分辨率。 */
  maxWidth?: number;
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

/** 文件名里不能出现的字符换成横线，时间写成 1m05s */
export function mediaFileName(
  baseName: string | undefined,
  time: number,
  ext: string,
): string {
  const base =
    Array.from(baseName ?? "")
      .map((char) =>
        (char.codePointAt(0) ?? 0) < 0x20 || '\\/:*?"<>|'.includes(char)
          ? "-"
          : char,
      )
      .join("")
      .trim() || "video";
  const total = Math.max(0, Math.floor(Number.isFinite(time) ? time : 0));
  const stamp = `${Math.floor(total / 60)}m${String(total % 60).padStart(2, "0")}s`;
  return `${base}-${stamp}.${ext}`;
}

function isSecurityError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "name" in error &&
    (error as { name: unknown }).name === "SecurityError"
  );
}

function taintedError(): PlayerError {
  return new PlayerError(
    "tainted",
    "无法截取跨域视频：需要视频服务器允许跨域（CORS），并给播放器设置 crossOrigin",
  );
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new PlayerError("unknown", "截图失败")),
        mimeType,
        quality,
      );
    } catch (error) {
      reject(isSecurityError(error) ? taintedError() : error);
    }
  });
}

/** 截取当前画面 */
export async function captureFrame(
  video: HTMLVideoElement,
  options: ScreenshotOptions = {},
): Promise<{ blob: Blob; meta: ScreenshotMeta }> {
  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;
  if (!sourceWidth || !sourceHeight || video.readyState < 2) {
    throw new PlayerError("not-ready", "视频画面还没有加载好，稍后再截图");
  }
  const scale =
    options.maxWidth &&
    Number.isFinite(options.maxWidth) &&
    options.maxWidth > 0
      ? Math.min(1, options.maxWidth / sourceWidth)
      : 1;
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const mimeType = options.mimeType ?? "image/png";
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new PlayerError("unsupported", "当前环境不支持截图");
  try {
    context.drawImage(video, 0, 0, width, height);
  } catch (error) {
    throw isSecurityError(error) ? taintedError() : error;
  }
  const blob = await canvasToBlob(canvas, mimeType, options.quality);
  const time = video.currentTime;
  return {
    blob,
    meta: {
      time,
      width,
      height,
      mimeType: blob.type || mimeType,
      fileName: mediaFileName(
        options.baseName,
        time,
        EXTENSIONS[mimeType] ?? "png",
      ),
    },
  };
}

/** 默认的保存方式：触发浏览器下载 */
export function downloadBlob(blob: Blob, fileName: string): void {
  if (
    typeof document === "undefined" ||
    typeof URL.createObjectURL !== "function"
  )
    return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
