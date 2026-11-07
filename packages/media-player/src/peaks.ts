/**
 * 音频波形：
 * - `computePeaks` / `computePeaksChunked`：PCM 采样 → 每段的峰值（0–1，按全曲最大值归一化），纯函数
 * - `resamplePeaks`：高分辨率峰值 → 任意根数的柱子（取每组最大值，不丢掉瞬态）
 * - `loadWaveform`：取回字节 → WebAudio `decodeAudioData` 解码（浏览器在后台线程解码）→ 分块计算峰值
 *   （每块之间让出主线程），按地址缓存；只对能读到字节的地址（blob: / data: / 同源 / 声明了 CORS）解码
 * - `waveformBars`：读不到真实波形（流媒体、跨域）时的装饰图案，按种子生成、只表示进度
 * 导入本模块不访问任何浏览器全局对象（SSR 安全）。
 */

/** 缓存的峰值分辨率（之后按显示宽度再降采样） */
export const PEAK_RESOLUTION = 1024;
/** 超过这个大小不解码（解码后的 PCM 会大好几倍），退回装饰波形 */
export const MAX_WAVEFORM_BYTES = 48 * 1024 * 1024;
/** 每块处理的采样数：块之间让出主线程 */
export const PEAK_CHUNK_SAMPLES = 1 << 18;

const DECORATIVE_BAR_COUNT = 64;

/** 按种子生成固定的装饰波形高度（0.22–1），同一种子每次相同 */
export function waveformBars(
  seed: string,
  count = DECORATIVE_BAR_COUNT,
): number[] {
  // FNV-1a 散列 + xorshift 伪随机，结果只取决于种子
  let state = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    state ^= seed.charCodeAt(index);
    state = Math.imul(state, 16777619);
  }
  state = state >>> 0 || 1;
  const bars: number[] = [];
  for (let index = 0; index < count; index += 1) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    const noise = (state % 1000) / 1000;
    // 中间略高、两端略低，看起来像一段语音 / 音乐
    const envelope = 0.55 + 0.45 * Math.sin((Math.PI * (index + 0.5)) / count);
    bars.push(
      Number(
        Math.max(0.22, Math.min(1, envelope * (0.45 + noise * 0.55))).toFixed(
          3,
        ),
      ),
    );
  }
  return bars;
}

/** 解码结果的最小接口（AudioBuffer 的子集，便于测试） */
export interface DecodedAudio {
  readonly numberOfChannels: number;
  readonly length: number;
  readonly duration: number;
  getChannelData(channel: number): Float32Array;
}

/** 峰值数组归一化：除以最大值，保留三位小数；全静音时全部为 0 */
function normalize(raw: Float32Array): number[] {
  let max = 0;
  for (let index = 0; index < raw.length; index += 1)
    if (raw[index] > max) max = raw[index];
  const out = new Array<number>(raw.length);
  for (let index = 0; index < raw.length; index += 1) {
    out[index] = max > 0 ? Math.round((raw[index] / max) * 1000) / 1000 : 0;
  }
  return out;
}

/** 累加一段采样到各分段的峰值（多声道取绝对值最大） */
function accumulate(
  channels: readonly Float32Array[],
  raw: Float32Array,
  length: number,
  from: number,
  to: number,
): void {
  const buckets = raw.length;
  for (const data of channels) {
    for (let sample = from; sample < to; sample += 1) {
      const value = Math.abs(data[sample] ?? 0);
      const bucket = Math.min(
        buckets - 1,
        Math.floor((sample * buckets) / length),
      );
      if (value > raw[bucket]) raw[bucket] = value;
    }
  }
}

function sampleLength(channels: readonly Float32Array[]): number {
  return channels.reduce((max, data) => Math.max(max, data.length), 0);
}

/** 同步计算：每段取各声道绝对值的最大值，再按全曲最大值归一化到 0–1 */
export function computePeaks(
  channels: readonly Float32Array[],
  buckets: number,
): number[] {
  const count = Math.max(1, Math.floor(buckets));
  const length = sampleLength(channels);
  if (length === 0) return new Array<number>(count).fill(0);
  const raw = new Float32Array(count);
  accumulate(channels, raw, length, 0, length);
  return normalize(raw);
}

export interface ChunkedPeaksOptions {
  chunkSamples?: number;
  /** 块之间的让步（默认 setTimeout 0）；测试可替换 */
  yieldFn?: () => Promise<void>;
  signal?: AbortSignal;
}

const defaultYield = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

/** 分块计算（结果与 computePeaks 相同）：长音频不会长时间占住主线程 */
export async function computePeaksChunked(
  channels: readonly Float32Array[],
  buckets: number,
  options: ChunkedPeaksOptions = {},
): Promise<number[]> {
  const count = Math.max(1, Math.floor(buckets));
  const length = sampleLength(channels);
  if (length === 0) return new Array<number>(count).fill(0);
  const chunk = Math.max(1024, options.chunkSamples ?? PEAK_CHUNK_SAMPLES);
  const pause = options.yieldFn ?? defaultYield;
  const raw = new Float32Array(count);
  for (let from = 0; from < length; from += chunk) {
    if (options.signal?.aborted) throw abortError();
    accumulate(channels, raw, length, from, Math.min(length, from + chunk));
    if (from + chunk < length) await pause();
  }
  return normalize(raw);
}

/** 降采样到 count 根柱子：每组取最大值；count 大于峰值数时按位置取最近的值 */
export function resamplePeaks(
  peaks: readonly number[],
  count: number,
): number[] {
  const target = Math.max(1, Math.floor(count));
  if (peaks.length === 0) return new Array<number>(target).fill(0);
  const out: number[] = [];
  for (let index = 0; index < target; index += 1) {
    const start = Math.floor((index * peaks.length) / target);
    const end = Math.max(
      start + 1,
      Math.floor(((index + 1) * peaks.length) / target),
    );
    let max = 0;
    for (
      let cursor = start;
      cursor < end && cursor < peaks.length;
      cursor += 1
    ) {
      if (peaks[cursor] > max) max = peaks[cursor];
    }
    out.push(max);
  }
  return out;
}

/**
 * 能不能读到这个地址的字节来解码：blob: / data: / 相对地址 / 与页面同源一律可以；
 * 跨域地址只有声明了 CORS（crossOrigin）时才尝试；流媒体由调用方排除
 */
export function canDecodeWaveform(
  url: string,
  options: { origin?: string; cors?: boolean } = {},
) {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (/^(blob|data):/i.test(trimmed)) return true;
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(trimmed)?.[1]?.toLowerCase();
  if (!scheme) return true;
  if (scheme !== "http" && scheme !== "https" && scheme !== "file")
    return false;
  if (options.cors) return true;
  const origin = options.origin;
  if (!origin) return false;
  try {
    return new URL(trimmed, origin).origin === new URL(origin).origin;
  } catch {
    return false;
  }
}

function abortError(): Error {
  const error = new Error("aborted");
  error.name = "AbortError";
  return error;
}

/** 解码函数：字节 → PCM（默认用 OfflineAudioContext，不受自动播放策略限制） */
export type AudioDecoder = (bytes: ArrayBuffer) => Promise<DecodedAudio>;

interface OfflineContextLike {
  decodeAudioData(
    data: ArrayBuffer,
    success?: (buffer: DecodedAudio) => void,
    failure?: (error: unknown) => void,
  ): Promise<DecodedAudio> | void;
}

type OfflineContextCtor = new (
  channels: number,
  length: number,
  rate: number,
) => OfflineContextLike;

/** 共用的解码上下文（一个就够：decodeAudioData 可以反复调用） */
let sharedContext: {
  ctor: OfflineContextCtor;
  context: OfflineContextLike;
} | null = null;
/** 解码排队：一次只解码一个文件，打开含很多音频的文档时不会同时占满解码线程 */
let decodeQueue: Promise<unknown> = Promise.resolve();

/** 浏览器解码器；没有 WebAudio 时返回 null */
export function browserAudioDecoder(): AudioDecoder | null {
  const scope = globalThis as {
    OfflineAudioContext?: OfflineContextCtor;
    webkitOfflineAudioContext?: OfflineContextCtor;
  };
  const Ctor = scope.OfflineAudioContext ?? scope.webkitOfflineAudioContext;
  if (typeof Ctor !== "function") return null;
  const decodeOnce = (bytes: ArrayBuffer) =>
    new Promise<DecodedAudio>((resolve, reject) => {
      if (!sharedContext || sharedContext.ctor !== Ctor) {
        sharedContext = { ctor: Ctor, context: new Ctor(1, 1, 44100) };
      }
      // 旧版 Safari 只有回调形式；新版两种都支持（只会有一次结果）
      const result = sharedContext.context.decodeAudioData(
        bytes,
        resolve,
        reject,
      );
      if (result && typeof result.then === "function")
        result.then(resolve, reject);
    });
  return (bytes) => {
    const run = decodeQueue.then(
      () => decodeOnce(bytes),
      () => decodeOnce(bytes),
    );
    decodeQueue = run.catch(() => undefined);
    return run;
  };
}

export interface WaveformData {
  /** PEAK_RESOLUTION 个峰值（0–1） */
  peaks: number[];
  duration: number;
}

export interface LoadWaveformOptions {
  fetcher?: (url: string) => Promise<Response>;
  decoder?: AudioDecoder | null;
  maxBytes?: number;
  resolution?: number;
  yieldFn?: () => Promise<void>;
}

const CACHE_LIMIT = 24;
const cache = new Map<string, Promise<WaveformData>>();

/** 清空波形缓存（测试用；也可在内存紧张时调用） */
export function clearWaveformCache(): void {
  cache.clear();
}

async function readBytes(
  url: string,
  options: LoadWaveformOptions,
  maxBytes: number,
): Promise<ArrayBuffer> {
  const fetcher =
    options.fetcher ?? (typeof fetch === "function" ? fetch : null);
  if (!fetcher) throw new Error("没有 fetch");
  const response = await fetcher(url);
  if (!response.ok) throw new Error(`读取失败：${response.status}`);
  const declared = Number(response.headers?.get?.("content-length") ?? NaN);
  if (Number.isFinite(declared) && declared > maxBytes)
    throw new Error("文件太大，不解码波形");
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength > maxBytes) throw new Error("文件太大，不解码波形");
  return bytes;
}

async function decodeWaveform(
  url: string,
  options: LoadWaveformOptions,
): Promise<WaveformData> {
  const decoder =
    options.decoder === undefined ? browserAudioDecoder() : options.decoder;
  if (!decoder) throw new Error("当前环境不支持 WebAudio 解码");
  const bytes = await readBytes(
    url,
    options,
    options.maxBytes ?? MAX_WAVEFORM_BYTES,
  );
  const audio = await decoder(bytes);
  const channels: Float32Array[] = [];
  for (let channel = 0; channel < audio.numberOfChannels; channel += 1) {
    channels.push(audio.getChannelData(channel));
  }
  const peaks = await computePeaksChunked(
    channels,
    options.resolution ?? PEAK_RESOLUTION,
    {
      yieldFn: options.yieldFn,
    },
  );
  return { peaks, duration: audio.duration };
}

/**
 * 读取并解码真实波形，按地址缓存（同一地址的多个播放器共用一次解码，组件卸载也不中断，结果留给下次）；
 * 失败时不缓存
 */
export function loadWaveform(
  url: string,
  options: LoadWaveformOptions = {},
): Promise<WaveformData> {
  const cached = cache.get(url);
  if (cached) {
    // 刷新 LRU 顺序
    cache.delete(url);
    cache.set(url, cached);
    return cached;
  }
  const promise = decodeWaveform(url, options);
  cache.set(url, promise);
  promise.catch(() => {
    if (cache.get(url) === promise) cache.delete(url);
  });
  while (cache.size > CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
  return promise;
}
