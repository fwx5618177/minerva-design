import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { MediaPlayer, type MediaPlayerHandle } from ".";

// jsdom has no media pipeline: play / pause are stubbed to dispatch the
// events a browser would, and duration / currentTime are plain values.
let playSpy: ReturnType<typeof vi.spyOn>;
let pauseSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  playSpy = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, "paused", {
        configurable: true,
        value: false,
      });
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
  pauseSpy = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, "paused", {
        configurable: true,
        value: true,
      });
      this.dispatchEvent(new Event("pause"));
    });
});

afterEach(() => {
  vi.restoreAllMocks();
  act(() => {
    void i18n.changeLanguage("en");
  });
});

const media = () => document.querySelector<HTMLMediaElement>("audio, video")!;

let time = 0;
const loadMetadata = (duration = 296) => {
  const element = media();
  time = 0;
  Object.defineProperty(element, "duration", {
    configurable: true,
    value: duration,
  });
  Object.defineProperty(element, "currentTime", {
    configurable: true,
    get: () => time,
    set: (value: number) => {
      time = value;
    },
  });
  fireEvent(element, new Event("loadedmetadata"));
};

const tick = (seconds: number) => {
  time = seconds;
  fireEvent(media(), new Event("timeupdate"));
};

describe("MediaPlayer", () => {
  it("infers audio / video from the MIME type or the extension", () => {
    const { rerender, container } = render(<MediaPlayer src="/a.mp3" />);
    expect(container.querySelector("audio")).toBeInTheDocument();
    rerender(<MediaPlayer src="/a.mp4" />);
    expect(container.querySelector("video")).toBeInTheDocument();
    rerender(<MediaPlayer src="/stream" mimeType="audio/aac" />);
    expect(container.querySelector("audio")).toBeInTheDocument();
    rerender(<MediaPlayer src="/a.mp3" type="video" />);
    expect(container.querySelector("video")).toBeInTheDocument();
    rerender(<MediaPlayer src="/unknown" />);
    expect(container.querySelector("video")).toBeInTheDocument();
  });

  it("renders the control bar with translated labels and hooks", () => {
    render(<MediaPlayer src="/clip.mp4" title="Flower" />);
    const root = screen.getByRole("group", { name: "Flower" });
    expect(root).toHaveAttribute("data-minerva", "media-player");
    expect(root).toHaveAttribute("data-variant", "video");
    expect(root).toHaveAttribute("data-status", "paused");
    expect(root).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("Flower")).toHaveAttribute("data-part", "title");
    for (const name of [
      "Play",
      "Back 10 seconds",
      "Forward 10 seconds",
      "Mute",
      "Playback speed 1×",
      "Full screen",
    ]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
    expect(screen.getByRole("slider", { name: "Seek" })).toHaveAttribute(
      "aria-valuetext",
      "0:00 of 0:00",
    );
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("plays, pauses and reports the callbacks", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    const onPause = vi.fn();
    const onTimeUpdate = vi.fn();
    const onLoadedMetadata = vi.fn();
    const onEnded = vi.fn();
    render(
      <MediaPlayer
        src="/song.mp3"
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />,
    );
    loadMetadata(296);
    expect(onLoadedMetadata).toHaveBeenCalledWith({ duration: 296 });
    expect(screen.getByText("0:00 / 4:56")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Play" }));
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("group")).toHaveAttribute("data-status", "playing");

    tick(83);
    expect(onTimeUpdate).toHaveBeenLastCalledWith({
      currentTime: 83,
      duration: 296,
    });
    expect(screen.getByText("1:23 / 4:56")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Seek" })).toHaveAttribute(
      "aria-valuetext",
      "1:23 of 4:56",
    );

    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    expect(onPause).toHaveBeenCalledTimes(1);

    fireEvent(media(), new Event("ended"));
    expect(onEnded).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("group")).toHaveAttribute("data-status", "ended");
  });

  it("applies startTime once on loadedmetadata", () => {
    render(<MediaPlayer src="/clip.mp4" startTime={42} />);
    loadMetadata(100);
    expect(time).toBe(42);
    time = 60;
    fireEvent(media(), new Event("loadedmetadata"));
    expect(time).toBe(60);
  });

  it("skips and seeks with the buttons, the seek slider and the keyboard", async () => {
    const user = userEvent.setup();
    render(<MediaPlayer src="/clip.mp4" skipSeconds={15} />);
    loadMetadata(100);
    tick(50);
    await user.click(
      screen.getByRole("button", { name: "Forward 15 seconds" }),
    );
    expect(time).toBe(65);
    await user.click(screen.getByRole("button", { name: "Back 15 seconds" }));
    expect(time).toBe(50);

    const seek = screen.getByRole("slider", { name: "Seek" });
    seek.focus();
    await user.keyboard("{ArrowRight}");
    expect(time).toBe(55);
    await user.keyboard("{End}");
    expect(time).toBe(100);
    await user.keyboard("{Home}");
    expect(time).toBe(0);

    const root = screen.getByRole("group");
    root.focus();
    tick(30);
    await user.keyboard("{ArrowLeft}");
    expect(time).toBe(25);
    await user.keyboard("{ArrowRight}");
    expect(time).toBe(30);
  });

  it("handles Space / K, M and the volume keys on the focused player", async () => {
    const user = userEvent.setup();
    const onVolumeChange = vi.fn();
    render(<MediaPlayer src="/song.mp3" onVolumeChange={onVolumeChange} />);
    loadMetadata();
    const root = screen.getByRole("group");
    root.focus();
    await user.keyboard(" ");
    expect(playSpy).toHaveBeenCalledTimes(1);
    await user.keyboard("k");
    expect(pauseSpy).toHaveBeenCalledTimes(1);

    await user.keyboard("m");
    expect(media().muted).toBe(true);
    expect(screen.getByRole("button", { name: "Unmute" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.keyboard("m");
    expect(media().muted).toBe(false);

    await user.keyboard("{ArrowDown}");
    expect(media().volume).toBe(0.9);
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
      "aria-valuenow",
      "90",
    );
    fireEvent(media(), new Event("volumechange"));
    expect(onVolumeChange).toHaveBeenLastCalledWith({
      volume: 0.9,
      muted: false,
    });
  });

  it("does not toggle playback when Space activates a button", async () => {
    const user = userEvent.setup();
    render(<MediaPlayer src="/song.mp3" />);
    screen.getByRole("button", { name: "Mute" }).focus();
    await user.keyboard(" ");
    expect(playSpy).not.toHaveBeenCalled();
    expect(media().muted).toBe(true);
  });

  it("cycles the playback rates", async () => {
    const user = userEvent.setup();
    const onRateChange = vi.fn();
    render(
      <MediaPlayer
        src="/song.mp3"
        playbackRates={[1, 1.5, 2]}
        onRateChange={onRateChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Playback speed 1×" }));
    expect(media().playbackRate).toBe(1.5);
    expect(
      screen.getByRole("button", { name: "Playback speed 1.5×" }),
    ).toHaveTextContent("1.5×");
    fireEvent(media(), new Event("ratechange"));
    expect(onRateChange).toHaveBeenCalledWith(1.5);
  });

  it("shows the loading spinner and the error state", () => {
    const onError = vi.fn();
    render(<MediaPlayer src="/clip.mp4" onError={onError} />);
    fireEvent(media(), new Event("waiting"));
    expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute(
      "data-part",
      "spinner",
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-loading", "");
    fireEvent(media(), new Event("playing"));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    fireEvent(media(), new Event("error"));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This media can't be played",
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-invalid", "");
    expect(screen.getByRole("button", { name: "Play" })).toBeDisabled();
  });

  it("exposes play / pause / seek / element through the ref", async () => {
    const ref = createRef<MediaPlayerHandle>();
    render(<MediaPlayer ref={ref} src="/clip.mp4" />);
    loadMetadata(100);
    expect(ref.current!.element).toBe(media());
    await act(() => ref.current!.play());
    expect(playSpy).toHaveBeenCalled();
    act(() => ref.current!.pause());
    expect(pauseSpy).toHaveBeenCalled();
    act(() => ref.current!.seek(500));
    expect(time).toBe(100);
  });

  it("renders the bare media element without controls", () => {
    const { container } = render(
      <MediaPlayer src="/clip.mp4" controls={false} />,
    );
    expect(container.querySelector("video")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("applies muted and sizes the video", () => {
    const { rerender } = render(
      <MediaPlayer src="/clip.mp4" muted height={240} />,
    );
    expect(media().muted).toBe(true);
    expect(screen.getByRole("group").style.height).toBe("240px");
    rerender(<MediaPlayer src="/clip.mp4" muted={false} aspectRatio="4 / 3" />);
    expect(media().muted).toBe(false);
    expect(screen.getByRole("group").style.aspectRatio).toBe("4 / 3");
  });

  it("translates the labels", () => {
    act(() => {
      void i18n.changeLanguage("fr");
    });
    render(<MediaPlayer src="/clip.mp4" />);
    loadMetadata(83);
    expect(
      screen.getByRole("group", { name: "Lecteur multimédia" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Lecture" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reculer de 10 secondes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Position de lecture" }),
    ).toHaveAttribute("aria-valuetext", "0:00 sur 1:23");
  });
});
