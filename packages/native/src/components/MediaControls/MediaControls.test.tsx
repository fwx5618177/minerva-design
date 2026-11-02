import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
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
