import Taro from "@tarojs/taro";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as M from "./index";

// The test Taro mock has no media APIs: install fakes of the video context
// and of the InnerAudioContext, and fire the host events by hand.
type Listener = (payload?: unknown) => void;
const videoContext = {
  play: vi.fn(),
  pause: vi.fn(),
  seek: vi.fn(),
  playbackRate: vi.fn(),
  requestFullScreen: vi.fn(),
  exitFullScreen: vi.fn(),
};
let audio: ReturnType<typeof fakeAudio>;
function fakeAudio() {
  const listeners: Record<string, Listener> = {};
  const on = (name: string) => (cb: Listener) => {
    listeners[name] = cb;
  };
  return {
    listeners,
    src: "",
    autoplay: false,
    loop: false,
    startTime: 0,
    volume: 1,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    play: vi.fn(),
    pause: vi.fn(),
    seek: vi.fn(),
    destroy: vi.fn(),
    onPlay: on("play"),
    onPause: on("pause"),
    onStop: on("stop"),
    onEnded: on("ended"),
    onWaiting: on("waiting"),
    onCanplay: on("canplay"),
    onTimeUpdate: on("timeupdate"),
    onError: on("error"),
    emit(name: string, payload?: unknown) {
      act(() => listeners[name]?.(payload));
    },
  };
}

const mock = Taro as unknown as Record<string, unknown>;
beforeEach(() => {
  mock.createVideoContext = vi.fn(() => videoContext);
  mock.createInnerAudioContext = vi.fn(() => (audio = fakeAudio()));
});
afterEach(() => {
  delete mock.createVideoContext;
  delete mock.createInnerAudioContext;
  vi.clearAllMocks();
});

const video = () => document.querySelector("taro-video-core")!;
const fireVideo = (name: string, detail: unknown = {}) =>
  act(() => {
    video().dispatchEvent(new CustomEvent(name, { detail }));
  });

describe("Taro MediaPlayer", () => {
  it("renders a video with its own controls off and the themed bar", () => {
    render(<M.MediaPlayer src="/clip.mp4" title="Flower" startTime={30} />);
    const root = screen.getByRole("group", { name: "Flower" });
    expect(root).toHaveAttribute("data-minerva", "media-player");
    expect(root).toHaveClass("mn-variant-video");
    expect(root).toHaveAttribute("data-status", "paused");
    expect(video()).toHaveAttribute("controls", "false");
    expect(screen.getByText("Flower")).toHaveClass("mn-media-player__title");
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
    expect(screen.queryByRole("slider", { name: "Volume" })).toBeNull();
  });

  it("drives the video context and follows the host events", () => {
    const onPlay = vi.fn();
    const onTimeUpdate = vi.fn();
    const onLoadedMetadata = vi.fn();
    const onEnded = vi.fn();
    const onRateChange = vi.fn();
    render(
      <M.MediaPlayer
        src="/clip.mp4"
        onPlay={onPlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        onRateChange={onRateChange}
      />,
    );
    fireVideo("loadedmetadata", { duration: 296, width: 640, height: 360 });
    expect(onLoadedMetadata).toHaveBeenCalledWith({ duration: 296 });
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(videoContext.play).toHaveBeenCalled();
    fireVideo("play");
    expect(onPlay).toHaveBeenCalled();
    expect(screen.getByRole("group")).toHaveAttribute("data-status", "playing");
    fireVideo("timeupdate", { currentTime: 83, duration: 296 });
    expect(onTimeUpdate).toHaveBeenCalledWith({
      currentTime: 83,
      duration: 296,
    });
    expect(screen.getByRole("slider", { name: "Seek" })).toHaveAttribute(
      "aria-valuetext",
      "1:23 of 4:56",
    );
    fireEvent.click(screen.getByRole("button", { name: "Forward 10 seconds" }));
    expect(videoContext.seek).toHaveBeenCalledWith(93);
    fireEvent.click(screen.getByRole("button", { name: "Playback speed 1×" }));
    expect(videoContext.playbackRate).toHaveBeenCalledWith(1.25);
    expect(onRateChange).toHaveBeenCalledWith(1.25);
    fireEvent.click(screen.getByRole("button", { name: "Full screen" }));
    expect(videoContext.requestFullScreen).toHaveBeenCalled();
    fireVideo("ended");
    expect(onEnded).toHaveBeenCalled();
    expect(screen.getByRole("group")).toHaveAttribute("data-status", "ended");
  });

  it("plays audio through an InnerAudioContext with a volume bar", () => {
    const onVolumeChange = vi.fn();
    const ref = createRef<M.MediaPlayerHandle>();
    const { unmount } = render(
      <M.MediaPlayer
        ref={ref}
        src="/song.mp3"
        startTime={12}
        onVolumeChange={onVolumeChange}
      />,
    );
    expect(screen.getByRole("group")).toHaveClass("mn-variant-audio");
    expect(audio.src).toBe("/song.mp3");
    expect(audio.startTime).toBe(12);
    expect(ref.current!.context).toBe(audio);
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(audio.play).toHaveBeenCalled();
    audio.emit("play");
    audio.currentTime = 20;
    audio.duration = 100;
    audio.emit("timeupdate");
    expect(screen.getByText("0:20 / 1:40")).toBeInTheDocument();
    act(() => ref.current!.seek(500));
    expect(audio.seek).toHaveBeenCalledWith(100);
    fireEvent.click(screen.getByRole("button", { name: "Mute" }));
    expect(audio.volume).toBe(0);
    expect(onVolumeChange).toHaveBeenCalledWith({ volume: 1, muted: true });
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    unmount();
    expect(audio.destroy).toHaveBeenCalled();
  });

  it("shows the spinner and the error state", () => {
    const onError = vi.fn();
    render(<M.MediaPlayer src="/song.mp3" onError={onError} />);
    audio.emit("waiting");
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("data-loading", "");
    audio.emit("error", { errCode: 10004 });
    expect(onError).toHaveBeenCalledWith({ errCode: 10004 });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This media can't be played",
    );
    expect(screen.getByRole("group")).toHaveClass("mn-invalid");
  });

  it("controls={false} hands the video to the host controls", () => {
    render(<M.MediaPlayer src="/clip.mp4" controls={false} />);
    expect(video()).toHaveAttribute("controls", "true");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
