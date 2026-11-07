/**
 * 音频编码的兼容性（纯数据 + 纯函数）：
 * - `AUDIO_CODECS`：常见音频编码与探测用的 MIME（渐进式文件用 canPlayType，HLS / DASH 等流媒体用 MSE isTypeSupported）
 * - `audioCodecName`：从 MIME 的 codecs 参数或扩展名认出编码 / 容器名称（给人看）
 * - `audioUnsupportedHint`：浏览器解不了的音频（ALAC / AMR / WMA / AIFF / AC-3 …）给出转码建议
 * 规则只用 ASCII 字符的正则。
 */

export interface AudioCodecSpec {
  /** 显示名 */
  label: string;
  /** codecs 参数里的标识（小写，前缀匹配） */
  ids: string[];
  /** 渐进式文件的探测 MIME（canPlayType） */
  native: string;
  /** 流媒体分片的探测 MIME（MSE isTypeSupported）；没有时不能用于 HLS / DASH */
  mse?: string;
}

/** 常见音频编码（顺序即展示顺序） */
export const AUDIO_CODECS: readonly AudioCodecSpec[] = [
  {
    label: "MP3",
    ids: ["mp3", "mp4a.6b", "mp4a.69"],
    native: "audio/mpeg",
    mse: "audio/mpeg",
  },
  {
    label: "AAC",
    ids: ["mp4a.40.2", "mp4a.40", "aac"],
    native: 'audio/mp4; codecs="mp4a.40.2"',
    mse: 'audio/mp4; codecs="mp4a.40.2"',
  },
  {
    label: "HE-AAC",
    ids: ["mp4a.40.5", "mp4a.40.29"],
    native: 'audio/mp4; codecs="mp4a.40.5"',
    mse: 'audio/mp4; codecs="mp4a.40.5"',
  },
  {
    label: "Opus",
    ids: ["opus"],
    native: 'audio/ogg; codecs="opus"',
    mse: 'audio/webm; codecs="opus"',
  },
  {
    label: "Vorbis",
    ids: ["vorbis"],
    native: 'audio/ogg; codecs="vorbis"',
    mse: 'audio/webm; codecs="vorbis"',
  },
  {
    label: "FLAC",
    ids: ["flac"],
    native: "audio/flac",
    mse: 'audio/mp4; codecs="flac"',
  },
  { label: "WAV（PCM）", ids: ["1", "pcm"], native: 'audio/wav; codecs="1"' },
  { label: "ALAC", ids: ["alac"], native: 'audio/mp4; codecs="alac"' },
  {
    label: "AC-3 / E-AC-3",
    ids: ["ac-3", "ec-3"],
    native: 'audio/mp4; codecs="ac-3"',
    mse: 'audio/mp4; codecs="ec-3"',
  },
  { label: "AMR", ids: ["samr", "sawb"], native: "audio/amr" },
];

/** 扩展名 → 容器 / 编码名称（浏览器普遍不支持、需要转码的格式） */
const LEGACY_AUDIO_EXTENSIONS: Readonly<Record<string, string>> = {
  amr: "AMR",
  awb: "AMR-WB",
  wma: "WMA",
  aif: "AIFF",
  aiff: "AIFF",
  caf: "CAF",
  ape: "APE",
  ac3: "AC-3",
  mka: "MKA",
};

/** MIME 里 codecs 参数的各项（小写，去掉引号与空白） */
export function codecsOfMime(mimeType: string | undefined): string[] {
  const match = /codecs\s*=\s*"?([^";]*)"?/i.exec(mimeType ?? "");
  if (!match) return [];
  return match[1]
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

/** codecs 参数 / 扩展名 → 编码名称；认不出来时 null */
export function audioCodecName(
  mimeType: string | undefined,
  extension: string,
): string | null {
  for (const codec of codecsOfMime(mimeType)) {
    const spec = AUDIO_CODECS.find((item) =>
      item.ids.some((id) => codec.startsWith(id)),
    );
    if (spec) return spec.label;
  }
  return LEGACY_AUDIO_EXTENSIONS[extension.toLowerCase()] ?? null;
}

/** 浏览器解不了的音频：说明 + 转码建议（附 FFmpeg 命令） */
export function audioUnsupportedHint(name: string | null): string {
  const what = name ? `${name} 音频` : "这种音频格式";
  return (
    `当前环境无法解码${what}（ALAC / AMR / WMA / AIFF / AC-3 等编码浏览器普遍不支持），` +
    "建议转码为 AAC（.m4a）、MP3 或 Opus，例如：ffmpeg -i 输入文件 -c:a aac -b:a 192k 输出.m4a"
  );
}

/** 编码探测结果 */
export interface AudioCodecSupport {
  label: string;
  mime: string;
  supported: boolean;
}

/** 当前环境支持哪些音频编码：渐进式用 canPlayType，流媒体用 MSE（没有对应 MSE 探测的编码视为不支持） */
export function audioCodecSupport(
  probe: {
    canPlayType(mime: string): string;
    isTypeSupported?(mime: string): boolean;
  },
  via: "native" | "mse",
): AudioCodecSupport[] {
  return AUDIO_CODECS.map((codec) => {
    if (via === "mse") {
      const mime = codec.mse;
      return {
        label: codec.label,
        mime: mime ?? codec.native,
        supported: !!mime && probe.isTypeSupported?.(mime) === true,
      };
    }
    return {
      label: codec.label,
      mime: codec.native,
      supported: probe.canPlayType(codec.native) !== "",
    };
  });
}
