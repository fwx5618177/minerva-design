import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { afterEach, describe, expect, it, vi } from "vitest";
import { queryPart } from "../../../test/queries";
import { MediaControls } from "./MediaControls";

describe("MediaControls (native)", () => {
  it("renders the labelled controls and the time", async () => {
    await render(
      <MediaControls
        title="Flower"
        currentTime={83}
        duration={296}
        onMutedChange={() => {}}
        onRateChange={() => {}}
        onFullscreenChange={() => {}}
      />,
    );
    expect(screen.getByText("Flower")).toBeTruthy();
    expect(screen.getByText("1:23 / 4:56")).toBeTruthy();
    for (const name of [
      "Play",
      "Back 10 seconds",
      "Forward 10 seconds",
      "Mute",
      "Playback speed 1×",
      "Full screen",
    ]) {
      expect(screen.getByRole("button", { name })).toBeTruthy();
    }
    const seek = screen.getByRole("adjustable", { name: "Seek" });
    expect(seek.props.accessibilityValue).toMatchObject({
      now: 83,
      max: 296,
      text: "1:23 of 4:56",
    });
  });

  it("hides the optional buttons without their callbacks", async () => {
    await render(<MediaControls duration={10} skipSeconds={0} />);
    expect(screen.queryByRole("button", { name: "Mute" })).toBeNull();
    expect(screen.queryByRole("button", { name: /Playback speed/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /seconds/ })).toBeNull();
  });

  it("reports play / pause, skips, seeks, mute, rate and fullscreen", async () => {
    const onPlayPause = vi.fn();
    const onSeek = vi.fn();
    const onMutedChange = vi.fn();
    const onRateChange = vi.fn();
    const onFullscreenChange = vi.fn();
    await render(
      <MediaControls
        playing
        currentTime={50}
        duration={100}
        playbackRate={1.5}
        onPlayPause={onPlayPause}
        onSeek={onSeek}
        onMutedChange={onMutedChange}
        onRateChange={onRateChange}
        onFullscreenChange={onFullscreenChange}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Pause" }));
    expect(onPlayPause).toHaveBeenCalled();
    await fireEvent.press(
      screen.getByRole("button", { name: "Forward 10 seconds" }),
    );
    expect(onSeek).toHaveBeenLastCalledWith(60);
    await fireEvent.press(
      screen.getByRole("button", { name: "Back 10 seconds" }),
    );
    expect(onSeek).toHaveBeenLastCalledWith(40);
    await fireEvent(
      screen.getByRole("adjustable", { name: "Seek" }),
      "accessibilityAction",
      { nativeEvent: { actionName: "increment" } },
    );
    expect(onSeek).toHaveBeenLastCalledWith(60);
    await fireEvent.press(screen.getByRole("button", { name: "Mute" }));
    expect(onMutedChange).toHaveBeenCalledWith(true);
    await fireEvent.press(
      screen.getByRole("button", { name: "Playback speed 1.5×" }),
    );
    expect(onRateChange).toHaveBeenCalledWith(2);
    await fireEvent.press(screen.getByRole("button", { name: "Full screen" }));
    expect(onFullscreenChange).toHaveBeenCalledWith(true);
  });

  it("volume bar, loading and error", async () => {
    const onVolumeChange = vi.fn();
    await render(
      <MediaControls
        duration={10}
        volume={0.5}
        loading
        error
        onVolumeChange={onVolumeChange}
      />,
    );
    const volume = screen.getByRole("adjustable", { name: "Volume" });
    expect(volume.props.accessibilityValue).toMatchObject({ now: 50 });
    await fireEvent(volume, "accessibilityAction", {
      nativeEvent: { actionName: "increment" },
    });
    expect(onVolumeChange).toHaveBeenCalledWith(0.6);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This media can't be played",
    );
    expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
  });
});

describe("MediaControls captions (native)", () => {
  const VTT =
    "WEBVTT\n\n00:01.000 --> 00:03.000\nHello <b>there</b>\n\n00:05.000 --> 00:06.000\nBye\n";
  const SRT = "1\n00:00:01,000 --> 00:00:03,000\nBonjour\n";
  const tracks = [
    {
      src: `data:text/vtt,${encodeURIComponent(VTT)}`,
      srclang: "en",
      label: "English",
      default: true,
    },
    { src: "https://cdn.example.com/fr.srt", srclang: "fr", label: "Français" },
  ];
  const flush = () =>
    act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("draws the cue of the default track at currentTime", async () => {
    const view = await render(
      <MediaControls
        variant="video"
        duration={10}
        currentTime={0.5}
        tracks={tracks}
      />,
    );
    await flush();
    expect(screen.queryByText("Hello there")).toBeNull();
    await view.rerender(
      <MediaControls
        variant="video"
        duration={10}
        currentTime={1.5}
        tracks={tracks}
      />,
    );
    expect(screen.getByText("Hello there")).toBeTruthy();
    await view.rerender(
      <MediaControls
        variant="video"
        duration={10}
        currentTime={5.5}
        tracks={tracks}
      />,
    );
    expect(screen.queryByText("Hello there")).toBeNull();
    expect(screen.getByText("Bye")).toBeTruthy();
  });

  it("chooses a track with the CC button, fetching SRT files", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => SRT,
    }));
    vi.stubGlobal("fetch", fetchMock);
    const onTrackChange = vi.fn();
    await render(
      <MediaControls
        duration={10}
        currentTime={2}
        tracks={tracks}
        onTrackChange={onTrackChange}
      />,
    );
    await flush();
    expect(screen.getByText("Hello there")).toBeTruthy();
    const cc = screen.getByRole("button", { name: "Captions" });
    expect(cc).toBeSelected();
    await fireEvent.press(cc);
    expect(queryPart("captions-menu", "media-controls")).toBeTruthy();
    expect(queryPart("captions", "media-controls")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "English" })).toBeChecked();
    await fireEvent.press(screen.getByRole("radio", { name: "Français" }));
    expect(onTrackChange).toHaveBeenCalledWith({ index: 1, track: tracks[1] });
    expect(screen.queryByRole("radio")).toBeNull();
    await flush();
    expect(fetchMock).toHaveBeenCalledWith("https://cdn.example.com/fr.srt");
    expect(screen.getByText("Bonjour")).toBeTruthy();

    await fireEvent.press(cc);
    await fireEvent.press(screen.getByRole("radio", { name: "Off" }));
    expect(onTrackChange).toHaveBeenLastCalledWith({ index: -1, track: null });
    expect(screen.queryByText("Bonjour")).toBeNull();
    expect(screen.getByRole("button", { name: "Captions" })).not.toBeSelected();
  });

  it("follows a controlled trackIndex and has no CC button without tracks", async () => {
    const view = await render(
      <MediaControls
        duration={10}
        currentTime={2}
        tracks={tracks}
        trackIndex={-1}
      />,
    );
    await flush();
    expect(screen.queryByText("Hello there")).toBeNull();
    await view.rerender(
      <MediaControls
        duration={10}
        currentTime={2}
        tracks={tracks}
        trackIndex={0}
      />,
    );
    await flush();
    expect(screen.getByText("Hello there")).toBeTruthy();
    await view.rerender(<MediaControls duration={10} currentTime={2} />);
    expect(screen.queryByRole("button", { name: "Captions" })).toBeNull();
  });
});
