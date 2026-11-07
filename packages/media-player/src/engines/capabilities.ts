/**
 * 兼容矩阵与播放能力判断：
 * - `getCapabilities()`：当前环境对各主流格式 / 编码的支持情况（原生 canPlayType + MSE isTypeSupported）
 * - `canPlay(source)`：某个播放源能不能播、由哪个引擎播、为什么
 * 探测函数可注入（`probe`），便于测试与 SSR；默认探测只在调用时访问 document / window。
 */
import {
  initialQualityId,
  normalizeSource,
  resolvePlayback,
} from "./detect.js";
import {
  extensionOfUrl,
  isAudioSource,
  probeMimeFor,
  protocolHint,
  unsupportedProtocol,
  type ResolvedSourceType,
} from "./formats.js";
import type { MediaEngineFactory, PlayerSource } from "./types.js";
import {
  audioCodecName,
  audioCodecSupport,
  audioUnsupportedHint,
  type AudioCodecSupport,
} from "./audioCodecs.js";

/** 能力探测：原生播放（canPlayType）与 MSE（MediaSource / ManagedMediaSource 的 isTypeSupported） */
export interface CapabilityProbe {
  canPlayType(mime: string): string;
  /** 没有 MSE 时省略 */
  isTypeSupported?(mime: string): boolean;
}

export type PlayConfidence = "probably" | "maybe" | "no";

interface MseLike {
  isTypeSupported?(mime: string): boolean;
}

/** 浏览器探测；没有 DOM（SSR / Node）时什么都不支持 */
export function browserProbe(): CapabilityProbe {
  const video =
    typeof document !== "undefined" ? document.createElement("video") : null;
  const scope = (typeof window !== "undefined" ? window : {}) as {
    MediaSource?: MseLike;
    ManagedMediaSource?: MseLike;
    WebKitMediaSource?: MseLike;
  };
  // iOS 17.1+ 的 Safari 只有 ManagedMediaSource（hls.js / dash.js 都支持）
  const mse =
    scope.MediaSource ?? scope.ManagedMediaSource ?? scope.WebKitMediaSource;
  const isTypeSupported = mse?.isTypeSupported?.bind(mse);
  return {
    canPlayType: (mime) =>
      video && typeof video.canPlayType === "function"
        ? video.canPlayType(mime)
        : "",
    isTypeSupported: isTypeSupported
      ? (mime) => {
          try {
            return isTypeSupported(mime);
          } catch {
            return false;
          }
        }
      : undefined,
  };
}

interface CodecProbe {
  label: string;
  mime: string;
  /** native：canPlayType；mse：isTypeSupported */
  via: "native" | "mse";
}

interface FormatSpec {
  type: ResolvedSourceType;
  label: string;
  extensions: string[];
  /** 处理它的引擎 kind */
  engine: "native" | "hls" | "dash" | "flv";
  /** 需要安装的可选依赖 */
  requires?: string;
  live?: boolean;
  /** 原生探测用的 MIME */
  mime: string;
  /** canPlayType 不认识但通常能播：再用这个 MIME 试（MOV → MP4，MKV → WebM） */
  fallbackMime?: string;
  codecs: CodecProbe[];
}

const H264 = "avc1.42E01E";
const HEVC = "hvc1.1.6.L93.B0";
const AV1 = "av01.0.05M.08";
const VP9 = "vp09.00.10.08";
const AAC = "mp4a.40.2";
/** 流媒体引擎（hls.js / dash.js / mpegts.js）都需要 MSE 支持 H.264 + AAC 的 fMP4 */
const MSE_BASELINE = `video/mp4; codecs="${H264},${AAC}"`;

const mse = (label: string, mime: string): CodecProbe => ({
  label,
  mime,
  via: "mse",
});
const native = (label: string, mime: string): CodecProbe => ({
  label,
  mime,
  via: "native",
});

/** 兼容矩阵（顺序即展示顺序） */
export const FORMAT_MATRIX: readonly FormatSpec[] = [
  {
    type: "mp4",
    label: "MP4 / M4V",
    extensions: ["mp4", "m4v"],
    engine: "native",
    mime: "video/mp4",
    codecs: [
      native("H.264", `video/mp4; codecs="${H264}, ${AAC}"`),
      native("H.265 / HEVC", `video/mp4; codecs="${HEVC}"`),
      native("AV1", `video/mp4; codecs="${AV1}"`),
    ],
  },
  {
    type: "mov",
    label: "MOV",
    extensions: ["mov"],
    engine: "native",
    mime: "video/quicktime",
    fallbackMime: "video/mp4",
    codecs: [
      native("H.264", `video/mp4; codecs="${H264}"`),
      native("H.265 / HEVC", `video/mp4; codecs="${HEVC}"`),
    ],
  },
  {
    type: "webm",
    label: "WebM",
    extensions: ["webm"],
    engine: "native",
    mime: "video/webm",
    codecs: [
      native("VP8", 'video/webm; codecs="vp8, vorbis"'),
      native("VP9", `video/webm; codecs="${VP9}, opus"`),
      native("AV1", `video/webm; codecs="${AV1}, opus"`),
    ],
  },
  {
    type: "ogg",
    label: "Ogg / OGV",
    extensions: ["ogv"],
    engine: "native",
    mime: "video/ogg",
    codecs: [native("Theora", 'video/ogg; codecs="theora, vorbis"')],
  },
  {
    type: "mkv",
    label: "MKV",
    extensions: ["mkv"],
    engine: "native",
    mime: "video/x-matroska",
    fallbackMime: "video/webm",
    codecs: [],
  },
  {
    type: "audio",
    label: "音频",
    extensions: [
      "mp3",
      "aac",
      "m4a",
      "ogg",
      "oga",
      "opus",
      "weba",
      "wav",
      "flac",
    ],
    engine: "native",
    mime: "audio/mpeg",
    codecs: [
      native("MP3", "audio/mpeg"),
      native("AAC", `audio/mp4; codecs="${AAC}"`),
      native("Opus", 'audio/ogg; codecs="opus"'),
      native("Vorbis", 'audio/ogg; codecs="vorbis"'),
      native("WAV", "audio/wav"),
      native("FLAC", "audio/flac"),
    ],
  },
  {
    type: "hls",
    label: "HLS",
    extensions: ["m3u8"],
    engine: "hls",
    requires: "hls.js",
    live: true,
    mime: "application/vnd.apple.mpegurl",
    codecs: [
      mse("H.264（TS / fMP4 分片）", MSE_BASELINE),
      mse("H.265 / HEVC", `video/mp4; codecs="${HEVC}"`),
    ],
  },
  {
    type: "dash",
    label: "DASH",
    extensions: ["mpd"],
    engine: "dash",
    requires: "dashjs",
    live: true,
    mime: "application/dash+xml",
    codecs: [
      mse("H.264", MSE_BASELINE),
      mse("H.265 / HEVC", `video/mp4; codecs="${HEVC}"`),
      mse("VP9", `video/webm; codecs="${VP9}"`),
      mse("AV1", `video/mp4; codecs="${AV1}"`),
    ],
  },
  {
    type: "flv",
    label: "FLV（含 HTTP-FLV / WebSocket-FLV 直播）",
    extensions: ["flv"],
    engine: "flv",
    requires: "mpegts.js",
    live: true,
    mime: "video/x-flv",
    codecs: [mse("H.264 + AAC", MSE_BASELINE)],
  },
  {
    type: "mpegts",
    label: "MPEG-TS",
    extensions: ["ts", "m2ts", "mts"],
    engine: "flv",
    requires: "mpegts.js",
    live: true,
    mime: "video/mp2t",
    codecs: [mse("H.264 + AAC", MSE_BASELINE)],
  },
];

export interface CodecCapability {
  label: string;
  mime: string;
  supported: boolean;
}

export interface FormatCapability {
  type: ResolvedSourceType;
  label: string;
  extensions: string[];
  engine: string;
  requires?: string;
  live: boolean;
  playable: boolean;
  confidence: PlayConfidence;
  codecs: CodecCapability[];
  /** 说明（给人看） */
  note: string;
}

export interface Capabilities {
  /** 有 MSE（hls.js / dash.js / mpegts.js 的前提） */
  mse: boolean;
  formats: FormatCapability[];
}

function confidenceOf(result: string): PlayConfidence {
  return result === "probably"
    ? "probably"
    : result === "maybe"
      ? "maybe"
      : "no";
}

function codecSupported(probe: CapabilityProbe, codec: CodecProbe): boolean {
  if (codec.via === "mse") return probe.isTypeSupported?.(codec.mime) === true;
  return probe.canPlayType(codec.mime) !== "";
}

function hasMse(probe: CapabilityProbe): boolean {
  return probe.isTypeSupported?.(MSE_BASELINE) === true;
}

/** 一种格式在当前环境的支持情况 */
function evaluateFormat(
  spec: FormatSpec,
  probe: CapabilityProbe,
  mime = spec.mime,
) {
  if (spec.engine !== "native") {
    if (hasMse(probe)) {
      return {
        playable: true,
        engine: spec.engine,
        confidence: "probably" as PlayConfidence,
        note: `通过 MSE 播放（需要 ${spec.requires}）`,
      };
    }
    // Safari / iOS：没有 MSE 时 HLS 可以原生播放
    const nativeResult = probe.canPlayType(spec.mime);
    if (nativeResult !== "") {
      return {
        playable: true,
        engine: "native",
        confidence: confidenceOf(nativeResult),
        note: "浏览器原生播放",
      };
    }
    return {
      playable: false,
      engine: null,
      confidence: "no" as PlayConfidence,
      note: `当前环境没有 MSE，无法播放 ${spec.label}`,
    };
  }
  const result = probe.canPlayType(mime);
  if (result !== "") {
    return {
      playable: true,
      engine: "native",
      confidence: confidenceOf(result),
      note: "浏览器原生播放",
    };
  }
  if (spec.fallbackMime && probe.canPlayType(spec.fallbackMime) !== "") {
    return {
      playable: true,
      engine: "native",
      confidence: "maybe" as PlayConfidence,
      note: `尝试原生播放：编码为浏览器支持的格式（H.264 / VP9 / AV1 + AAC / Opus）时通常能播，否则会报错，建议转封装为 MP4 / WebM`,
    };
  }
  return {
    playable: false,
    engine: null,
    confidence: "no" as PlayConfidence,
    note: `当前浏览器不支持 ${spec.label}`,
  };
}

/** 当前环境的兼容矩阵 */
export function getCapabilities(
  probe: CapabilityProbe = browserProbe(),
): Capabilities {
  return {
    mse: hasMse(probe),
    formats: FORMAT_MATRIX.map((spec) => {
      const codecs = spec.codecs.map((codec) => ({
        label: codec.label,
        mime: codec.mime,
        supported: codecSupported(probe, codec),
      }));
      // 纯音频 / 带编码的格式：任一编码可播即可播
      const anyCodec =
        spec.engine === "native" && codecs.some((codec) => codec.supported);
      const verdict = evaluateFormat(spec, probe);
      const playable = verdict.playable || anyCodec;
      return {
        type: spec.type,
        label: spec.label,
        extensions: spec.extensions,
        engine: spec.engine,
        requires: spec.requires,
        live: spec.live === true,
        playable,
        confidence: verdict.playable
          ? verdict.confidence
          : anyCodec
            ? "maybe"
            : "no",
        codecs,
        note:
          playable && !verdict.playable ? "部分编码可以原生播放" : verdict.note,
      };
    }),
  };
}

export interface CanPlayResult {
  playable: boolean;
  /** 会使用的引擎 kind（native / hls / dash / flv / 自定义）；不能播时为 null */
  engine: string | null;
  /** 推断出的格式；协议不支持时为 null */
  type: ResolvedSourceType | null;
  confidence: PlayConfidence;
  /** 只有声音（显示音频界面） */
  audioOnly: boolean;
  /** 需要安装的可选依赖 */
  requires?: string;
  /** 说明（给人看） */
  reason: string;
  /**
   * 纯音频源：当前环境各音频编码（MP3 / AAC / Opus / Vorbis / FLAC / WAV / ALAC / AC-3 / AMR）能不能解码；
   * 渐进式文件按 canPlayType，HLS / DASH 等流媒体按 MSE
   */
  codecs?: AudioCodecSupport[];
}

export interface CanPlayOptions {
  probe?: CapabilityProbe;
  /** 使用方自定义的引擎（与播放器的 engines 属性相同）：处理该格式的自定义引擎优先 */
  engines?: readonly MediaEngineFactory[];
}

const BUILTIN_ENGINES = new Set(["native", "hls", "dash", "flv"]);

/** 某个播放源能不能播、由哪个引擎播、为什么（不发网络请求，只看地址 / 类型与环境能力） */
export function canPlay(
  src: string | PlayerSource,
  options: CanPlayOptions = {},
): CanPlayResult {
  const source = normalizeSource(src);
  const { url, type } = resolvePlayback(source, initialQualityId(source));
  const protocol = unsupportedProtocol(url);
  if (protocol) {
    return {
      playable: false,
      engine: null,
      type: null,
      confidence: "no",
      audioOnly: false,
      reason: protocolHint(protocol),
    };
  }
  const audioOnly = isAudioSource({
    url,
    type: source.type,
    mimeType: source.mimeType,
    audioOnly: source.audioOnly,
  });
  const custom = options.engines?.find((engine) => engine.handles(type));
  if (custom && !BUILTIN_ENGINES.has(custom.kind)) {
    return {
      playable: true,
      engine: custom.kind,
      type,
      confidence: "maybe",
      audioOnly,
      reason: `由自定义引擎 ${custom.kind} 处理`,
    };
  }
  const spec = FORMAT_MATRIX.find((item) => item.type === type);
  if (!spec) {
    return {
      playable: false,
      engine: null,
      type,
      confidence: "no",
      audioOnly,
      reason: `不认识的格式 ${type}`,
    };
  }
  const probe = options.probe ?? browserProbe();
  if (/^blob:/i.test(url) && !source.type && !source.mimeType) {
    return {
      playable: true,
      engine: "native",
      type,
      confidence: "maybe",
      audioOnly,
      reason:
        "没有声明类型的 blob 地址交给原生播放，能否解码取决于内容（建议传 mimeType）",
    };
  }
  const mime = probeMimeFor(url, type, source.mimeType) ?? spec.mime;
  const verdict = evaluateFormat(spec, probe, mime);
  const audioReason =
    type === "audio" && !verdict.playable
      ? audioUnsupportedHint(audioCodecName(mime, extensionOfUrl(url)))
      : null;
  return {
    playable: verdict.playable,
    engine: verdict.engine,
    type,
    confidence: verdict.confidence,
    audioOnly,
    requires: verdict.engine === spec.engine ? spec.requires : undefined,
    reason: audioReason ?? verdict.note,
    ...(audioOnly
      ? {
          codecs: audioCodecSupport(
            probe,
            verdict.engine === "native" || !verdict.engine ? "native" : "mse",
          ),
        }
      : {}),
  };
}
