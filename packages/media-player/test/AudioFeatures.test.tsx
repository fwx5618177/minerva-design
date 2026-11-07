// @vitest-environment happy-dom
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  AudioPlayer,
  MediaPlayer,
  VideoPlayer,
  clearWaveformCache,
  type MediaPlayerHandle,
  type MediaSessionLike,
} from "../src";

function loadMetadata(
  video: HTMLVideoElement,
  duration: number,
  width = 0,
  height = 0,
) {
  Object.defineProperty(video, "videoWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(video, "videoHeight", {
    configurable: true,
    value: height,
  });
  Object.defineProperty(video, "duration", {
    configurable: true,
    value: duration,
  });
  act(() => {
    video.dispatchEvent(new Event("durationchange"));
    video.dispatchEvent(new Event("loadedmetadata"));
  });
}

function timeUpdate(video: HTMLVideoElement, time: number) {
  video.currentTime = time;
  act(() => {
    video.dispatchEvent(new Event("timeupdate"));
  });
}

function mockRect(element: Element, width = 200) {
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    left: 0,
    width,
    top: 0,
    height: 28,
    right: width,
    bottom: 28,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  clearWaveformCache();
});

describe("音频、视频是同一个播放器", () => {
  it("MediaPlayer / VideoPlayer 是同一个组件；AudioPlayer 强制音频界面", () => {
    expect(VideoPlayer).toBe(MediaPlayer);
    render(<AudioPlayer src="https://x/clip.mp4" title="片段" />);
    const group = screen.getByRole("group", { name: "音频 片段" });
    // 即使读到画面，kind="audio" 也保持音频界面
    loadMetadata(group.querySelector("video")!, 10, 640, 360);
    expect(
      screen
        .getByRole("group", { name: "音频 片段" })
        .getAttribute("data-media"),
    ).toBe("audio");
  });

  it('kind="video" 时没有画面也保持视频界面', () => {
    render(<MediaPlayer kind="video" src="https://x/a.mp3" title="旁白" />);
    const group = screen.getByRole("group", { name: "视频 旁白" });
    loadMetadata(group.querySelector("video")!, 10);
    expect(
      screen
        .getByRole("group", { name: "视频 旁白" })
        .getAttribute("data-media"),
    ).toBe("video");
  });
});

describe("真实波形", () => {
  it("blob 地址解码出真实波形；跨域地址用装饰波形", async () => {
    const pcm = new Float32Array(8000).map((_, index) =>
      index < 4000 ? 0.1 : 0.9,
    );
    const decode = vi.fn((_bytes: ArrayBuffer) => {
      void _bytes;
      return Promise.resolve({
        numberOfChannels: 1,
        length: 8000,
        duration: 1,
        getChannelData: () => pcm,
      });
    });
    vi.stubGlobal(
      "OfflineAudioContext",
      class {
        decodeAudioData(bytes: ArrayBuffer) {
          return decode(bytes);
        }
      },
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(new Uint8Array(32))),
    );
    const { unmount } = render(
      <AudioPlayer src="blob:https://x/voice" title="对白" />,
    );
    const wave = screen.getByTestId("audio-waveform");
    expect(wave.getAttribute("data-waveform")).toBe("loading");
    await waitFor(() =>
      expect(wave.getAttribute("data-waveform")).toBe("decoded"),
    );
    expect(decode).toHaveBeenCalledTimes(1);
    // 前半段安静、后半段响：柱子高度体现真实振幅
    const heights = Array.from(wave.querySelectorAll("span[style]")).map(
      (bar) => parseFloat((bar as HTMLElement).style.height),
    );
    expect(heights[0]).toBeLessThan(heights[heights.length - 1]);
    unmount();

    render(<AudioPlayer src="https://cdn.other.example/a.mp3" title="远程" />);
    expect(
      screen.getByTestId("audio-waveform").getAttribute("data-waveform"),
    ).toBe("decorative");
  });

  it("解码失败退回装饰波形；也可以直接给峰值", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 404 })),
    );
    const { unmount } = render(
      <AudioPlayer src="blob:https://x/missing" title="丢失" />,
    );
    await waitFor(() =>
      expect(
        screen.getByTestId("audio-waveform").getAttribute("data-waveform"),
      ).toBe("decorative"),
    );
    unmount();
    render(
      <AudioPlayer src="https://x/a.mp3" title="预算" waveform={[0, 0.5, 1]} />,
    );
    expect(
      screen.getByTestId("audio-waveform").getAttribute("data-waveform"),
    ).toBe("provided");
  });

  it("波形是进度滑块：点击跳转、键盘 ← / → / PageUp / End", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="雨声" />);
    const group = screen.getByRole("group", { name: "音频 雨声" });
    const video = group.querySelector("video")!;
    loadMetadata(video, 100);
    const slider = screen.getByRole("slider", { name: "播放进度" });
    expect(slider.getAttribute("data-testid")).toBe("audio-waveform");
    mockRect(slider);
    fireEvent.pointerDown(slider, { clientX: 100, pointerId: 1 });
    expect(video.currentTime).toBe(50);
    fireEvent.pointerUp(slider, { pointerId: 1 });
    expect(slider.getAttribute("aria-valuetext")).toBe("0:50 / 1:40");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(video.currentTime).toBe(55);
    fireEvent.keyDown(slider, { key: "PageDown" });
    expect(video.currentTime).toBe(40);
    fireEvent.keyDown(slider, { key: "End" });
    expect(video.currentTime).toBe(100);
    // 悬停时间
    fireEvent.pointerMove(slider, { clientX: 50 });
    expect(screen.getByTestId("audio-hover-time").textContent).toBe("0:25");
  });

  it("已缓冲区间显示在波形下方", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="缓冲" />);
    const video = screen
      .getByRole("group", { name: "音频 缓冲" })
      .querySelector("video")!;
    loadMetadata(video, 100);
    Object.defineProperty(video, "buffered", {
      configurable: true,
      value: { length: 1, start: () => 0, end: () => 30 },
    });
    act(() => {
      video.dispatchEvent(new Event("progress"));
    });
    expect(
      (screen.getByTestId("audio-buffered") as HTMLElement).style.width,
    ).toBe("30%");
  });
});

describe("音频界面的控制", () => {
  it("播放速度菜单与循环在音频界面可用（按钮与 L 键）", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="对白" />);
    const group = screen.getByRole("group", { name: "音频 对白" });
    const video = group.querySelector("video")!;
    loadMetadata(video, 60);
    fireEvent.click(screen.getByRole("button", { name: "设置" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /播放速度/ }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: "1.5x" }));
    expect(video.playbackRate).toBe(1.5);
    // 循环按钮在音频界面默认显示
    const loop = screen.getByRole("button", { name: "循环播放" });
    fireEvent.click(loop);
    expect(video.loop).toBe(true);
    fireEvent.keyDown(group, { key: "l" });
    expect(video.loop).toBe(false);
    fireEvent.keyDown(group, { key: ">" });
    expect(video.playbackRate).toBe(1.75);
  });

  it("快退 / 快进按钮（±5 / ±15 秒）与 Shift+方向键", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="播客" />);
    const group = screen.getByRole("group", { name: "音频 播客" });
    const video = group.querySelector("video")!;
    loadMetadata(video, 120);
    timeUpdate(video, 30);
    fireEvent.click(screen.getByRole("button", { name: "前进 15 秒" }));
    expect(video.currentTime).toBe(45);
    fireEvent.click(screen.getByRole("button", { name: "后退 5 秒" }));
    expect(video.currentTime).toBe(40);
    fireEvent.keyDown(group, { key: "ArrowLeft", shiftKey: true });
    expect(video.currentTime).toBe(25);
    for (const label of ["后退 15 秒", "前进 5 秒"]) {
      expect(screen.getByRole("button", { name: label })).toBeTruthy();
    }
  });

  it("时间显示可切换为剩余时间", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="时长" />);
    const video = screen
      .getByRole("group", { name: "音频 时长" })
      .querySelector("video")!;
    loadMetadata(video, 90);
    timeUpdate(video, 30);
    const time = screen.getByTestId("video-time");
    expect(time.textContent).toBe("0:30 / 1:30");
    fireEvent.click(time);
    expect(time.textContent).toBe("-1:00 / 1:30");
  });

  it("A-B 循环：[ / ] 设点，越过 B 点跳回 A；按钮清除", () => {
    render(<AudioPlayer src="https://x/a.mp3" title="台词" />);
    const group = screen.getByRole("group", { name: "音频 台词" });
    const video = group.querySelector("video")!;
    loadMetadata(video, 60);
    timeUpdate(video, 10);
    fireEvent.keyDown(group, { key: "[" });
    expect(group.getAttribute("data-ab")).toBe("a");
    timeUpdate(video, 14);
    fireEvent.keyDown(group, { key: "]" });
    expect(group.getAttribute("data-ab")).toBe("ab");
    expect(screen.getByTestId("audio-ab-range")).toBeTruthy();
    expect(screen.getByTestId("video-notice").textContent).toBe(
      "A-B 循环 0:10–0:14",
    );
    timeUpdate(video, 14.1);
    expect(video.currentTime).toBe(10);
    timeUpdate(video, 12);
    expect(video.currentTime).toBe(12);
    // 按钮：都设好时点一下清除
    fireEvent.click(screen.getByRole("button", { name: /清除 A-B 循环/ }));
    expect(group.getAttribute("data-ab")).toBe("none");
    timeUpdate(video, 20);
    expect(video.currentTime).toBe(20);
    // 按钮依次设 A、设 B
    fireEvent.click(
      screen.getByRole("button", { name: "设置 A 点（A-B 循环）" }),
    );
    timeUpdate(video, 25);
    fireEvent.click(screen.getByRole("button", { name: /设置 B 点/ }));
    expect(group.getAttribute("data-ab")).toBe("ab");
  });

  it("B 点在结尾：播完回到 A 点继续，不触发 onEnded", () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const onEnded = vi.fn();
    const ref = React.createRef<MediaPlayerHandle>();
    render(
      <AudioPlayer
        ref={ref}
        src="https://x/a.mp3"
        title="结尾"
        onEnded={onEnded}
      />,
    );
    const video = screen
      .getByRole("group", { name: "音频 结尾" })
      .querySelector("video")!;
    loadMetadata(video, 30);
    act(() => ref.current?.setAbRepeat(20, 30));
    video.currentTime = 30;
    act(() => {
      video.dispatchEvent(new Event("ended"));
    });
    expect(video.currentTime).toBe(20);
    expect(play).toHaveBeenCalled();
    expect(onEnded).not.toHaveBeenCalled();
  });

  it("下载按钮只在传了 onDownload 时出现，回调当前曲目", () => {
    const onDownload = vi.fn();
    render(
      <AudioPlayer
        src="https://x/a.mp3"
        title="配乐"
        onDownload={onDownload}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "下载" }));
    expect(onDownload).toHaveBeenCalledWith({
      src: "https://x/a.mp3",
      url: "https://x/a.mp3",
      title: "配乐",
    });
  });
});

describe("播放列表", () => {
  const playlist = [
    { src: "https://x/1.mp3", title: "第一首" },
    { src: "https://x/2.mp3", title: "第二首", artist: "作者" },
    { src: "https://x/3.mp3", title: "第三首" },
  ];

  it("上一首 / 下一首按钮与 Shift+N / Shift+P；播完自动下一首并播放", () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const onIndex = vi.fn();
    render(
      <AudioPlayer
        playlist={playlist}
        title="专辑"
        onPlaylistIndexChange={onIndex}
      />,
    );
    let group = screen.getByRole("group", { name: "音频 第一首" });
    const video = group.querySelector("video")!;
    expect(video.getAttribute("src")).toBe("https://x/1.mp3");
    expect(
      (screen.getByRole("button", { name: "上一首" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "下一首" }));
    group = screen.getByRole("group", { name: "音频 第二首" });
    expect(video.getAttribute("src")).toBe("https://x/2.mp3");
    expect(group.getAttribute("data-track")).toBe("1");
    expect(onIndex).toHaveBeenLastCalledWith(1);

    fireEvent.keyDown(group, { key: "N", shiftKey: true });
    expect(video.getAttribute("src")).toBe("https://x/3.mp3");
    expect(
      (screen.getByRole("button", { name: "下一首" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    // 上一首：开头 3 秒内切到上一首；超过 3 秒先回到开头
    loadMetadata(video, 50);
    timeUpdate(video, 10);
    fireEvent.click(screen.getByRole("button", { name: "上一首" }));
    expect(video.currentTime).toBe(0);
    expect(video.getAttribute("src")).toBe("https://x/3.mp3");
    fireEvent.keyDown(screen.getByRole("group", { name: "音频 第三首" }), {
      key: "P",
      shiftKey: true,
    });
    expect(video.getAttribute("src")).toBe("https://x/2.mp3");

    // 播完自动下一首，读到元数据后接着播放
    play.mockClear();
    act(() => {
      video.dispatchEvent(new Event("ended"));
    });
    expect(video.getAttribute("src")).toBe("https://x/3.mp3");
    loadMetadata(video, 40);
    expect(play).toHaveBeenCalled();
  });

  it("视频同样支持播放列表", () => {
    render(
      <VideoPlayer
        playlist={[
          { src: "https://x/a.mp4", title: "镜头一" },
          { src: "https://x/b.mp4", title: "镜头二" },
        ]}
        title="样片"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "下一首" }));
    expect(screen.getByRole("group", { name: "视频 镜头二" })).toBeTruthy();
  });
});

describe("媒体会话（系统媒体键）", () => {
  function installSession() {
    const handlers = new Map<string, ((details: object) => void) | null>();
    const session: MediaSessionLike & { positions: unknown[] } = {
      metadata: null,
      playbackState: "none",
      positions: [],
      setActionHandler: vi.fn((action, handler) => {
        handlers.set(action, handler as ((details: object) => void) | null);
      }),
      setPositionState(state) {
        session.positions.push(state);
      },
    };
    Object.defineProperty(navigator, "mediaSession", {
      configurable: true,
      value: session,
    });
    return { session, handlers };
  }

  afterEach(() => {
    Reflect.deleteProperty(navigator, "mediaSession");
  });

  it("开始播放时注册元数据与动作；动作控制播放器；卸载时清理", () => {
    const { session, handlers } = installSession();
    const { unmount } = render(
      <AudioPlayer
        src="https://x/a.mp3"
        title="清晨"
        artist="示例作品集"
        poster="cover.png"
        playlist={[
          { src: "https://x/a.mp3", title: "清晨" },
          { src: "https://x/b.mp3", title: "黄昏" },
        ]}
      />,
    );
    const video = screen
      .getByRole("group", { name: "音频 清晨" })
      .querySelector("video")!;
    loadMetadata(video, 60);
    // 暂停时不接管
    expect(handlers.size).toBe(0);
    act(() => {
      video.dispatchEvent(new Event("play"));
    });
    expect(session.metadata).toMatchObject({
      title: "清晨",
      artist: "示例作品集",
    });
    expect(session.playbackState).toBe("playing");
    for (const action of [
      "play",
      "pause",
      "seekto",
      "seekbackward",
      "seekforward",
      "nexttrack",
    ]) {
      expect(handlers.get(action)).toBeTypeOf("function");
    }
    act(() => handlers.get("seekto")?.({ seekTime: 42 }));
    expect(video.currentTime).toBe(42);
    const pause = vi.spyOn(video, "pause");
    act(() => handlers.get("pause")?.({}));
    expect(pause).toHaveBeenCalled();
    act(() => handlers.get("nexttrack")?.({}));
    expect(video.getAttribute("src")).toBe("https://x/b.mp3");
    unmount();
    expect(handlers.get("play")).toBeNull();
    expect(handlers.get("nexttrack")).toBeNull();
    expect(session.metadata).toBeNull();
  });

  it("没有播放列表时不注册上一首 / 下一首；静音自动播放的预览不接管", () => {
    const { handlers } = installSession();
    const { unmount } = render(
      <AudioPlayer src="https://x/a.mp3" title="单曲" />,
    );
    const video = screen
      .getByRole("group", { name: "音频 单曲" })
      .querySelector("video")!;
    act(() => {
      video.dispatchEvent(new Event("play"));
    });
    expect(handlers.get("play")).toBeTypeOf("function");
    expect(handlers.get("nexttrack")).toBeNull();
    unmount();
    handlers.clear();
    render(<VideoPlayer src="https://x/a.mp4" title="预览" autoPlay />);
    const preview = screen
      .getByRole("group", { name: "视频 预览" })
      .querySelector("video")!;
    act(() => {
      preview.dispatchEvent(new Event("play"));
    });
    expect(handlers.size).toBe(0);
  });
});
