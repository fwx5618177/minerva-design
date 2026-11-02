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

describe("Taro MediaPlayer captions", () => {
  const VTT =
    "WEBVTT\n\n00:01.000 --> 00:03.000\nHello <b>there</b>\n\n00:05.000 --> 00:06.000\nBye\n";
  const SRT = "1\n00:00:01,000 --> 00:00:03,000\nBonjour\n";
  const flush = () =>
    act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  const caption = () => document.querySelector('[data-part="captions"]');
  let stored: Record<string, unknown>;
  const original = {
    getStorageSync: mock.getStorageSync,
    setStorageSync: mock.setStorageSync,
  };

  beforeEach(() => {
    stored = {};
    mock.getStorageSync = vi.fn((key: string) => stored[key]);
    mock.setStorageSync = vi.fn((key: string, value: unknown) => {
      stored[key] = value;
    });
    mock.request = vi.fn(
      (options: {
        url: string;
        success: (result: { statusCode: number; data: unknown }) => void;
      }) =>
        options.success(
          options.url.endsWith(".srt")
            ? { statusCode: 200, data: SRT }
            : { statusCode: 404, data: "" },
        ),
    );
  });
  afterEach(() => {
    delete mock.request;
    Object.assign(mock, original);
  });

  const tracks = [
    {
      src: `data:text/vtt,${encodeURIComponent(VTT)}`,
      srclang: "en",
      label: "English",
      default: true,
    },
    { src: "https://cdn.example.com/fr.srt", srclang: "fr", label: "Français" },
  ];

  it("draws the active cue of the default track at the video time", async () => {
    render(<M.MediaPlayer src="/clip.mp4" tracks={tracks} />);
    await flush();
    expect(caption()).toBeNull();
    fireVideo("timeupdate", { currentTime: 1.5, duration: 10 });
    expect(caption()).toHaveTextContent("Hello there");
    fireVideo("timeupdate", { currentTime: 4, duration: 10 });
    expect(caption()).toBeNull();
    fireVideo("timeupdate", { currentTime: 5.2, duration: 10 });
    expect(caption()).toHaveTextContent("Bye");
  });

  it("chooses a track with the CC button, fetches it and remembers it", async () => {
    const onTrackChange = vi.fn();
    render(
      <M.MediaPlayer
        src="/clip.mp4"
        tracks={tracks}
        onTrackChange={onTrackChange}
      />,
    );
    const cc = screen.getByRole("button", { name: "Captions" });
    fireEvent.click(cc);
    const menu = document.querySelector('[data-part="captions-menu"]')!;
    expect(menu).toBeInTheDocument();
    const options = screen.getAllByRole("button", { pressed: false });
    expect(
      screen.getByRole("button", { name: "English", pressed: true }),
    ).toBeInTheDocument();
    expect(options.map((o) => o.textContent)).toContain("Off");
    fireEvent.click(screen.getByRole("button", { name: "Français" }));
    expect(onTrackChange).toHaveBeenCalledWith({ index: 1, track: tracks[1] });
    expect(document.querySelector('[data-part="captions-menu"]')).toBeNull();
    expect(stored["minerva-media-player-captions"]).toBe("fr");
    await flush();
    expect(mock.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://cdn.example.com/fr.srt",
        dataType: "text",
      }),
    );
    fireVideo("timeupdate", { currentTime: 2, duration: 10 });
    expect(caption()).toHaveTextContent("Bonjour");

    fireEvent.click(cc);
    fireEvent.click(screen.getByRole("button", { name: "Off" }));
    expect(onTrackChange).toHaveBeenLastCalledWith({ index: -1, track: null });
    expect(caption()).toBeNull();
  });

  it("starts on the remembered choice and shows audio cues under the title", async () => {
    stored["minerva-media-player-captions"] = "off";
    const { unmount } = render(
      <M.MediaPlayer src="/song.mp3" title="Talk" tracks={tracks} />,
    );
    await flush();
    expect(caption()).toBeNull();
    unmount();

    stored["minerva-media-player-captions"] = "en";
    render(<M.MediaPlayer src="/song.mp3" title="Talk" tracks={tracks} />);
    await flush();
    expect(caption()).toBeInTheDocument();
    audio.currentTime = 2;
    audio.emit("timeupdate");
    expect(caption()).toHaveTextContent("Hello there");
  });

  it("has no CC button without tracks", () => {
    render(<M.MediaPlayer src="/clip.mp4" />);
    expect(screen.queryByRole("button", { name: "Captions" })).toBeNull();
  });
});
