import { captureFrame } from "./screenshot.js";

/** 仅用于后台抽帧，不播放视频、不影响可见播放器的进度。 */
export function captureVideoThumbnail(
  src: string,
  signal?: AbortSignal,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    let settled = false;
    let capturing = false;
    const finish = (blob?: Blob, error?: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abort);
      video.onloadedmetadata = null;
      video.onseeked = null;
      video.onloadeddata = null;
      video.onerror = null;
      video.removeAttribute("src");
      video.load();
      if (blob) resolve(blob);
      else reject(error ?? new Error("无法读取视频封面"));
    };
    const abort = () =>
      finish(undefined, new DOMException("抽帧已取消", "AbortError"));
    const timeout = setTimeout(
      () => finish(undefined, new Error("读取视频封面超时")),
      15000,
    );
    const capture = () => {
      if (settled || capturing || video.seeking || video.readyState < 2) return;
      capturing = true;
      void captureFrame(video, {
        mimeType: "image/jpeg",
        quality: 0.8,
        maxWidth: 320,
      }).then(
        ({ blob }) => finish(blob),
        (error: unknown) => finish(undefined, error),
      );
    };
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.onerror = () => finish(undefined, new Error("视频格式无法解码"));
    video.onloadedmetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        finish(undefined, new Error("视频时长无效"));
        return;
      }
      // 避开片头片尾，在中间 60% 随机选择，缓存后保持封面稳定。
      video.currentTime = video.duration * (0.2 + Math.random() * 0.6);
      video.onloadeddata = capture;
      video.onseeked = capture;
    };
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    else video.src = src;
  });
}
