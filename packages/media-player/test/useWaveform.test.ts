// @vitest-environment happy-dom
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { loadWaveform } from "../src/peaks";
import { useWaveform } from "../src/useWaveform";
vi.mock("../src/peaks", async (original) => ({
  ...(await original<typeof import("../src/peaks")>()),
  loadWaveform: vi.fn(async () => ({ peaks: [1], duration: 1 })),
}));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it("requests credentialed waveform bytes and reloads when the CORS credential mode changes", async () => {
  const { result, rerender } = renderHook(
    ({ crossOrigin }) =>
      useWaveform({
        active: true,
        url: "https://audio.example/song.mp3",
        type: "audio",
        option: "auto",
        crossOrigin,
      }),
    { initialProps: { crossOrigin: "anonymous" } },
  );
  await waitFor(() => expect(result.current.state).toBe("decoded"));
  expect(loadWaveform).toHaveBeenLastCalledWith(
    "https://audio.example/song.mp3",
    { credentials: "same-origin" },
  );
  vi.mocked(loadWaveform).mockResolvedValueOnce({ peaks: [0.25], duration: 1 });
  rerender({ crossOrigin: "use-credentials" });
  expect(result.current.state).toBe("loading");
  await waitFor(() =>
    expect(loadWaveform).toHaveBeenLastCalledWith(
      "https://audio.example/song.mp3",
      { credentials: "include" },
    ),
  );
  await waitFor(() =>
    expect(result.current).toEqual({ state: "decoded", peaks: [0.25] }),
  );
});
