// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearWaveformCache, loadWaveform } from "../src/peaks";

const audio = {
  numberOfChannels: 1,
  length: 4,
  duration: 1,
  getChannelData: () => new Float32Array([0, 1, 0.5, 0]),
};

afterEach(() => {
  clearWaveformCache();
  vi.unstubAllGlobals();
});

function defaults() {
  const decode = vi.fn(async () => audio);
  vi.stubGlobal(
    "OfflineAudioContext",
    class {
      decodeAudioData = decode;
    },
  );
  const fetcher = vi.fn(async () => new Response(new Uint8Array(8)));
  vi.stubGlobal("fetch", fetcher);
  return { fetcher, decode };
}

describe("waveform request ownership", () => {
  it("cancels an unknown-length stream as soon as its bytes exceed the limit", async () => {
    const cancel = vi.fn();
    let pulls = 0;
    const body = new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          pulls += 1;
          controller.enqueue(new Uint8Array(4));
          if (pulls === 100) controller.close();
        },
        cancel,
      },
      { highWaterMark: 0 },
    );
    const decoder = vi.fn(async () => audio);
    await expect(
      loadWaveform("stream.mp3", {
        fetcher: async () => new Response(body),
        decoder,
        maxBytes: 5,
      }),
    ).rejects.toThrow(/太大/);
    expect(cancel).toHaveBeenCalledOnce();
    expect(pulls).toBe(2);
    expect(decoder).not.toHaveBeenCalled();
  });

  it("cancels a declared oversized response without reading or decoding it", async () => {
    const cancel = vi.fn();
    const pull = vi.fn();
    const body = new ReadableStream<Uint8Array>(
      { pull, cancel },
      { highWaterMark: 0 },
    );
    const decoder = vi.fn(async () => audio);
    await expect(
      loadWaveform("declared.mp3", {
        fetcher: async () =>
          new Response(body, { headers: { "content-length": "20" } }),
        decoder,
        maxBytes: 5,
      }),
    ).rejects.toThrow(/太大/);
    expect(cancel).toHaveBeenCalledOnce();
    expect(pull).not.toHaveBeenCalled();
    expect(decoder).not.toHaveBeenCalled();
  });

  it("retains the default URL cache for equivalent default requests", async () => {
    const { fetcher } = defaults();
    const first = await loadWaveform("plain.mp3");
    expect(await loadWaveform("plain.mp3")).toBe(first);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it("shares default requests only when resolution, byte limit and credentials agree", async () => {
    const { fetcher, decode } = defaults();
    const first = await loadWaveform("default.mp3", {
      resolution: 2,
      maxBytes: 8,
    });
    expect(
      await loadWaveform("default.mp3", { resolution: 2, maxBytes: 8 }),
    ).toBe(first);
    expect(fetcher).toHaveBeenCalledOnce();
    expect(
      (await loadWaveform("default.mp3", { resolution: 4, maxBytes: 8 })).peaks,
    ).toHaveLength(4);
    await expect(
      loadWaveform("default.mp3", { resolution: 2, maxBytes: 4 }),
    ).rejects.toThrow(/太大/);
    await loadWaveform("default.mp3", {
      resolution: 2,
      maxBytes: 8,
      credentials: "include",
    });
    expect(fetcher).toHaveBeenLastCalledWith("default.mp3", {
      credentials: "include",
    });
    expect(decode).toHaveBeenCalledTimes(3);
  });

  it("does not share results between explicitly supplied producers", async () => {
    const { fetcher } = defaults();
    const first = vi.fn(async () => audio);
    const second = vi.fn(async () => ({ ...audio, duration: 9 }));
    await loadWaveform("custom.mp3", { decoder: first });
    expect(
      (await loadWaveform("custom.mp3", { decoder: second })).duration,
    ).toBe(9);
    const customFetcher = vi.fn(async () => new Response(new Uint8Array(4)));
    await loadWaveform("custom.mp3", { fetcher: customFetcher });
    expect(customFetcher).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
