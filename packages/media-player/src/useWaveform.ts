/**
 * 播放器取波形：能读到字节的渐进式音频（blob: / data: / 同源 / 声明了 CORS）解码出真实波形；
 * 流媒体（HLS / DASH / FLV / TS）、跨域、太大、解码失败时退回装饰波形。
 * 使用方也可以直接给峰值（例如服务端用 audiowaveform 预先算好），此时不解码。
 */
import { useEffect, useState } from "react";
import { canDecodeWaveform, loadWaveform } from "./peaks.js";

/** decoded：真实波形；provided：使用方给的峰值；loading：解码中（先显示装饰波形）；decorative：装饰 */
export type WaveformState = "decoded" | "provided" | "loading" | "decorative";

/** waveform 属性：auto（能解码就解码）/ decorative（只用装饰图案）/ 峰值数组（0–1） */
export type WaveformOption = "auto" | "decorative" | readonly number[];

const STREAM_TYPES = new Set(["hls", "dash", "flv", "mpegts"]);

function pageOrigin(): string | undefined {
  if (typeof location === "undefined") return undefined;
  // file:// 页面的 origin 是字符串 "null"，用完整地址作为相对地址的基准
  return location.origin && location.origin !== "null"
    ? location.origin
    : location.href;
}

export interface UseWaveformOptions {
  /** 只有显示音频界面时才取波形 */
  active: boolean;
  url: string;
  /** 播放格式（流媒体不解码） */
  type: string;
  option: WaveformOption;
  crossOrigin?: string;
}

export function useWaveform({
  active,
  url,
  type,
  option,
  crossOrigin,
}: UseWaveformOptions): {
  peaks: readonly number[] | null;
  state: WaveformState;
} {
  const provided = Array.isArray(option) ? (option as readonly number[]) : null;
  const decodable =
    active &&
    !provided &&
    option === "auto" &&
    !STREAM_TYPES.has(type) &&
    canDecodeWaveform(url, {
      origin: pageOrigin(),
      cors: crossOrigin !== undefined,
    });
  const [result, setResult] = useState<{
    url: string;
    peaks: number[] | null;
  } | null>(null);

  useEffect(() => {
    if (!decodable) return;
    let cancelled = false;
    loadWaveform(url).then(
      (data) => {
        if (!cancelled) setResult({ url, peaks: data.peaks });
      },
      () => {
        if (!cancelled) setResult({ url, peaks: null });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [decodable, url]);

  if (provided) return { peaks: provided, state: "provided" };
  if (!decodable) return { peaks: null, state: "decorative" };
  if (!result || result.url !== url) return { peaks: null, state: "loading" };
  return result.peaks
    ? { peaks: result.peaks, state: "decoded" }
    : { peaks: null, state: "decorative" };
}
