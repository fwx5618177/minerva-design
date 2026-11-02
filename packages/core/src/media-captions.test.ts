import { describe, expect, it } from "vitest";
import {
  activeCueText,
  captionsPreference,
  cueText,
  decodeDataUrl,
  isSrtSource,
  loadCaptions,
  MEDIA_CAPTIONS_STORAGE_KEY,
  parseCaptions,
  parseCueTime,
  parseSrt,
  parseVtt,
  pickCaptionsTrack,
  readCaptionsPreference,
  toggledCaptionsTrack,
  writeCaptionsPreference,
  type MediaTrack,
} from "./media-captions";
import { mediaKeyAction, MEDIA_ICON_PATHS } from "./media-player";

const VTT = `WEBVTT
Kind: captions
Language: en

NOTE This is a comment
spanning --> two lines? no

STYLE
::cue { color: yellow }

intro
00:00:01.000 --> 00:00:04.000 align:start position:10%
<v Roger>Hello &amp; <b>welcome</b></v>

00:05.500 --> 00:08.000
Line one
<i>Line two</i>

00:07.000 --> 00:09.000
Overlap <00:07.500>karaoke
`;

const SRT = `1
00:00:01,000 --> 00:00:04,000
{\\an8}<font color="#fff">Bonjour</font>

2
00:00:05,500 --> 00:00:08,000
Ligne un
Ligne deux
`;

describe("parseCueTime", () => {
  it("reads hh:mm:ss.mmm, mm:ss.mmm and SRT commas", () => {
    expect(parseCueTime("01:02:03.500")).toBe(3723.5);
    expect(parseCueTime("02:03.250")).toBe(123.25);
    expect(parseCueTime("00:00:01,5")).toBe(1.5);
    expect(parseCueTime("bad")).toBeNaN();
    expect(parseCueTime("1:2:3:4")).toBeNaN();
  });
});

describe("cueText", () => {
  it("strips markup and decodes entities", () => {
    expect(cueText("<v Roger>Hi &lt;3 &#233;&#x41;</v>")).toBe("Hi <3 éA");
    expect(cueText("<c.yellow>a</c>\r\n  <i>b</i>  ")).toBe("a\nb");
    expect(cueText("{\\an8}top &unknown;")).toBe("top &unknown;");
  });
});

describe("parseVtt", () => {
  it("parses cues and skips header, NOTE and STYLE blocks", () => {
    expect(parseVtt(VTT)).toEqual([
      { start: 1, end: 4, text: "Hello & welcome" },
      { start: 5.5, end: 8, text: "Line one\nLine two" },
      { start: 7, end: 9, text: "Overlap karaoke" },
    ]);
  });

  it("handles CRLF, a BOM and malformed cues", () => {
    const text =
      "\uFEFFWEBVTT\r\n\r\n00:01.000 --> 00:02.000\r\nA\r\n\r\n00:03.000 --> 00:02.000\r\nbackwards\r\n\r\nnot a cue\r\n";
    expect(parseVtt(text)).toEqual([{ start: 1, end: 2, text: "A" }]);
  });

  it("returns nothing for empty input", () => {
    expect(parseVtt("")).toEqual([]);
    expect(parseVtt("WEBVTT")).toEqual([]);
  });
});

describe("parseSrt / parseCaptions", () => {
  it("parses SubRip files", () => {
    expect(parseSrt(SRT)).toEqual([
      { start: 1, end: 4, text: "Bonjour" },
      { start: 5.5, end: 8, text: "Ligne un\nLigne deux" },
    ]);
  });

  it("detects the format", () => {
    expect(parseCaptions(SRT)).toEqual(parseSrt(SRT));
    expect(parseCaptions(VTT)).toEqual(parseVtt(VTT));
  });
});

describe("activeCueText", () => {
  const cues = parseVtt(VTT);
  it("returns the cues shown at a time", () => {
    expect(activeCueText(cues, 0.5)).toBe("");
    expect(activeCueText(cues, 1)).toBe("Hello & welcome");
    expect(activeCueText(cues, 4)).toBe("");
    expect(activeCueText(cues, 7.5)).toBe(
      "Line one\nLine two\nOverlap karaoke",
    );
    expect(activeCueText(cues, Number.NaN)).toBe("");
  });
});

describe("data: URLs and sources", () => {
  it("decodes percent-encoded and base64 data URLs", () => {
    expect(decodeDataUrl("data:text/vtt,WEBVTT%0A%0Aé")).toBe("WEBVTT\n\né");
    // "WEBVTT\n\nCafé" in UTF-8, base64.
    expect(decodeDataUrl("data:text/vtt;base64,V0VCVlRUCgpDYWbDqQ==")).toBe(
      "WEBVTT\n\nCafé",
    );
    expect(decodeDataUrl("/subs/en.vtt")).toBeNull();
  });

  it("recognises SubRip sources", () => {
    expect(isSrtSource("/subs/en.srt?v=2")).toBe(true);
    expect(isSrtSource("data:application/x-subrip,1")).toBe(true);
    expect(isSrtSource("/subs/en.vtt")).toBe(false);
    expect(isSrtSource("data:text/vtt,WEBVTT")).toBe(false);
  });

  it("loads data URLs in place and fetches other URLs", async () => {
    const fetched: string[] = [];
    const fetchText = async (url: string) => {
      fetched.push(url);
      return SRT;
    };
    expect(
      await loadCaptions(`data:text/vtt,${encodeURIComponent(VTT)}`, fetchText),
    ).toHaveLength(3);
    expect(await loadCaptions("/fr.srt", fetchText)).toHaveLength(2);
    expect(fetched).toEqual(["/fr.srt"]);
  });
});

describe("track choice", () => {
  const tracks: MediaTrack[] = [
    { src: "en.vtt", srclang: "en-US", label: "English" },
    { src: "fr.vtt", srclang: "fr", label: "Français", default: true },
    { src: "x.vtt", label: "Commentary" },
  ];

  it("picks the remembered track, then the default one", () => {
    expect(pickCaptionsTrack(tracks, null)).toBe(1);
    expect(pickCaptionsTrack(tracks, "off")).toBe(-1);
    expect(pickCaptionsTrack(tracks, "en-us")).toBe(0);
    expect(pickCaptionsTrack(tracks, "en-GB")).toBe(0);
    expect(pickCaptionsTrack(tracks, "Commentary")).toBe(2);
    expect(pickCaptionsTrack(tracks, "de")).toBe(1);
    expect(pickCaptionsTrack([], "en")).toBe(-1);
    expect(pickCaptionsTrack([{ src: "a", label: "A" }], null)).toBe(-1);
  });

  it("remembers the choice in an injected storage", () => {
    const map = new Map<string, string>();
    const storage = {
      getItem: (key: string) => map.get(key) ?? null,
      setItem: (key: string, value: string) => void map.set(key, value),
    };
    expect(readCaptionsPreference(storage)).toBeNull();
    writeCaptionsPreference(storage, tracks[0] ?? null);
    expect(map.get(MEDIA_CAPTIONS_STORAGE_KEY)).toBe("en-US");
    writeCaptionsPreference(storage, null);
    expect(readCaptionsPreference(storage)).toBe("off");
    expect(captionsPreference(tracks[2] ?? null)).toBe("Commentary");

    const broken = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    };
    expect(readCaptionsPreference(broken)).toBeNull();
    expect(() => writeCaptionsPreference(broken, null)).not.toThrow();
    expect(readCaptionsPreference(undefined)).toBeNull();
  });

  it("toggles captions with the C key", () => {
    expect(mediaKeyAction("c")).toEqual({ type: "captions" });
    expect(mediaKeyAction("C", { ctrlKey: true })).toBeNull();
    expect(MEDIA_ICON_PATHS.captions).toMatch(/^M/);
    expect(toggledCaptionsTrack([], -1, -1)).toBeNull();
    expect(toggledCaptionsTrack(tracks, 1, -1)).toBe(-1);
    expect(toggledCaptionsTrack(tracks, -1, 2)).toBe(2);
    expect(toggledCaptionsTrack(tracks, -1, -1)).toBe(0);
  });
});
