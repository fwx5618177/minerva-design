/**
 * 浏览器能力检测与带前缀的 API 兼容（全屏 / 画中画 / captureStream / MediaRecorder / requestVideoFrameCallback）。
 * 所有函数都在调用时才访问 window / document，导入本模块不会触碰浏览器全局对象（SSR 安全）。
 */

interface WebkitFullscreenElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
}

interface WebkitFullscreenDocument {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
}

interface WebkitVideo {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
  webkitSupportsPresentationMode?: (mode: string) => boolean;
  webkitSetPresentationMode?: (mode: string) => void;
  webkitPresentationMode?: string;
  captureStream?: (frameRate?: number) => MediaStream;
  mozCaptureStream?: (frameRate?: number) => MediaStream;
  requestVideoFrameCallback?: (callback: () => void) => number;
}

function hasDocument(): boolean {
  return typeof document !== "undefined";
}

/** 当前全屏元素（含 webkit 前缀） */
export function getFullscreenElement(
  doc: Document | undefined = hasDocument() ? document : undefined,
) {
  if (!doc) return null;
  return (
    doc.fullscreenElement ??
    (doc as WebkitFullscreenDocument).webkitFullscreenElement ??
    null
  );
}

/** 能否让任意元素全屏；不能时 iOS 可退回 video.webkitEnterFullscreen */
export function supportsElementFullscreen(element: Element | null): boolean {
  if (!element || !hasDocument()) return false;
  const doc = document as Document & WebkitFullscreenDocument;
  if (doc.fullscreenEnabled === false && doc.webkitFullscreenEnabled !== true)
    return false;
  return (
    typeof element.requestFullscreen === "function" ||
    typeof (element as WebkitFullscreenElement).webkitRequestFullscreen ===
      "function"
  );
}

export function supportsVideoFullscreen(
  video: HTMLVideoElement | null,
): boolean {
  return (
    !!video &&
    typeof (video as WebkitVideo).webkitEnterFullscreen === "function"
  );
}

function swallow(result: Promise<void> | void) {
  if (result && typeof (result as Promise<void>).catch === "function") {
    (result as Promise<void>).catch(() => undefined);
  }
}

/** 进入全屏：优先整个播放器（控制条一起），否则 iOS 的视频全屏 */
export function enterFullscreen(
  root: Element,
  video: HTMLVideoElement | null,
): void {
  if (typeof root.requestFullscreen === "function") {
    swallow(root.requestFullscreen());
    return;
  }
  const webkit = (root as WebkitFullscreenElement).webkitRequestFullscreen;
  if (typeof webkit === "function") {
    swallow(webkit.call(root));
    return;
  }
  const videoFullscreen = video
    ? (video as WebkitVideo).webkitEnterFullscreen
    : undefined;
  if (video && typeof videoFullscreen === "function")
    videoFullscreen.call(video);
}

export function exitFullscreen(): void {
  if (!hasDocument()) return;
  const doc = document as Document & WebkitFullscreenDocument;
  if (typeof doc.exitFullscreen === "function") swallow(doc.exitFullscreen());
  else if (typeof doc.webkitExitFullscreen === "function")
    swallow(doc.webkitExitFullscreen());
}

export const FULLSCREEN_EVENTS = [
  "fullscreenchange",
  "webkitfullscreenchange",
] as const;

/** 画中画：标准 API 或 Safari 的 presentation mode */
export function supportsPictureInPicture(
  video: HTMLVideoElement | null,
): boolean {
  if (!video || !hasDocument()) return false;
  if (video.disablePictureInPicture) return false;
  if (
    document.pictureInPictureEnabled &&
    typeof video.requestPictureInPicture === "function"
  ) {
    return true;
  }
  const webkit = video as HTMLVideoElement & WebkitVideo;
  return (
    typeof webkit.webkitSupportsPresentationMode === "function" &&
    webkit.webkitSupportsPresentationMode("picture-in-picture")
  );
}

export function isPictureInPicture(video: HTMLVideoElement | null): boolean {
  if (!video || !hasDocument()) return false;
  if (document.pictureInPictureElement === video) return true;
  return (video as WebkitVideo).webkitPresentationMode === "picture-in-picture";
}

export async function togglePictureInPicture(
  video: HTMLVideoElement,
): Promise<void> {
  const webkit = video as HTMLVideoElement & WebkitVideo;
  if (isPictureInPicture(video)) {
    if (document.pictureInPictureElement === video)
      await document.exitPictureInPicture();
    else webkit.webkitSetPresentationMode?.("inline");
    return;
  }
  if (
    typeof video.requestPictureInPicture === "function" &&
    document.pictureInPictureEnabled
  ) {
    await video.requestPictureInPicture();
  } else {
    webkit.webkitSetPresentationMode?.("picture-in-picture");
  }
}

/** video.captureStream（Firefox 为 mozCaptureStream）；不支持时返回 null */
export function getCaptureStream(
  video: HTMLVideoElement | null,
): ((frameRate?: number) => MediaStream) | null {
  if (!video) return null;
  const webkit = video as WebkitVideo;
  const fn = webkit.captureStream ?? webkit.mozCaptureStream;
  return typeof fn === "function" ? fn.bind(video) : null;
}

/** MediaRecorder 的最小静态接口（便于测试替换） */
export interface MediaRecorderStatics {
  isTypeSupported?: (mimeType: string) => boolean;
}

export function getMediaRecorder():
  (typeof MediaRecorder & MediaRecorderStatics) | null {
  if (typeof globalThis === "undefined") return null;
  const ctor = (globalThis as { MediaRecorder?: typeof MediaRecorder })
    .MediaRecorder;
  return typeof ctor === "function" ? ctor : null;
}

/** 录屏可用：能 captureStream 且有 MediaRecorder */
export function supportsRecording(video: HTMLVideoElement | null): boolean {
  return !!getCaptureStream(video) && !!getMediaRecorder();
}

/** 截图可用：能创建 2D canvas */
export function supportsScreenshot(): boolean {
  if (!hasDocument()) return false;
  try {
    const canvas = document.createElement("canvas");
    return (
      typeof canvas.toBlob === "function" ||
      typeof canvas.toDataURL === "function"
    );
  } catch {
    return false;
  }
}

/**
 * 等下一帧画面：有 requestVideoFrameCallback 用它，否则 requestAnimationFrame；
 * 最多等 timeoutMs（暂停 / 结束时不会有新帧）
 */
export function nextVideoFrame(
  video: HTMLVideoElement,
  timeoutMs = 400,
): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    const done = () => {
      clearTimeout(timer);
      resolve();
    };
    const rvfc = (video as WebkitVideo).requestVideoFrameCallback;
    if (typeof rvfc === "function" && !video.paused) rvfc.call(video, done);
    else if (typeof requestAnimationFrame === "function")
      requestAnimationFrame(done);
  });
}
