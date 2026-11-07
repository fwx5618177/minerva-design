// @vitest-environment happy-dom
import React from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import VideoPlayer, {
  applyCaptionMode,
  type RenderTooltip,
  type TooltipContext,
  type VideoPlayerHandle,
} from "../src";
import { installCanvasMock, installRecorderMock } from "./media-mocks";

// hls.js 只在播放 .m3u8 时动态加载：这里替换成可控的假实现
const hlsState = vi.hoisted(() => ({
  instances: [] as Array<{
    fire: (event: string) => void;
    currentLevel: number;
    destroyed: boolean;
  }>,
}));
vi.mock("hls.js", () => {
  class Hls {
    static isSupported = () => true;
    static Events = { MANIFEST_PARSED: "parsed", ERROR: "error" };
    static ErrorTypes = { NETWORK_ERROR: "net", MEDIA_ERROR: "media" };
    levels = [{ height: 480 }, { height: 1080 }];
    currentLevel = -1;
    autoLevelEnabled = true;
    destroyed = false;
    private listeners = new Map<
      string,
      (event: string, data: unknown) => void
    >();
    constructor() {
      hlsState.instances.push(this);
    }
    on(event: string, listener: (event: string, data: unknown) => void) {
      this.listeners.set(event, listener);
    }
    fire(event: string) {
      this.listeners.get(event)?.(event, {});
    }
    loadSource() {}
    attachMedia() {}
    startLoad() {}
    recoverMediaError() {}
    destroy() {
      this.destroyed = true;
    }
  }
  return { default: Hls };
});

function loadMetadata(
  video: HTMLVideoElement,
  width = 640,
  height = 360,
  duration = 30,
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
  Object.defineProperty(video, "readyState", { configurable: true, value: 4 });
  act(() => {
    video.dispatchEvent(new Event("durationchange"));
    video.dispatchEvent(new Event("loadedmetadata"));
  });
}

function setup(props: Partial<React.ComponentProps<typeof VideoPlayer>> = {}) {
  const utils = render(<VideoPlayer src="blob:v" title="离港" {...props} />);
  const group = screen.getByRole("group", { name: "视频 离港" });
  const video = group.querySelector("video") as HTMLVideoElement;
  return { ...utils, group, video };
}

async function openMenu(section: string) {
  fireEvent.click(screen.getByRole("button", { name: "设置" }));
  fireEvent.click(
    await screen.findByRole("menuitem", { name: new RegExp(section) }),
  );
}

const originalRequestFullscreen = HTMLElement.prototype.requestFullscreen;
beforeAll(() => {
  HTMLElement.prototype.requestFullscreen = () => Promise.resolve();
});
afterAll(() => {
  HTMLElement.prototype.requestFullscreen = originalRequestFullscreen;
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(HTMLMediaElement.prototype, "captureStream");
});

describe("清晰度与播放速度", () => {
  it("多地址清晰度：切换后换地址，并回到原来的位置与播放状态", async () => {
    const onQualityChange = vi.fn();
    const { video } = setup({
      src: {
        src: "https://x/fallback.mp4",
        qualities: [
          { id: "720", label: "720P", src: "https://x/720.mp4", height: 720 },
          {
            id: "1080",
            label: "1080P",
            src: "https://x/1080.mp4",
            height: 1080,
          },
        ],
      },
      onQualityChange,
    });
    expect(video.getAttribute("src")).toBe("https://x/720.mp4");
    loadMetadata(video);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "播放" }));
    });
    video.currentTime = 7;
    await openMenu("清晰度");
    expect(
      screen
        .getByRole("menuitemradio", { name: "720P" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("menuitemradio", { name: "1080P" }));
    expect(onQualityChange).toHaveBeenCalledWith("1080");
    expect(video.getAttribute("src")).toBe("https://x/1080.mp4");
    loadMetadata(video);
    expect(video.currentTime).toBe(7);
    expect(video.paused).toBe(false);
    // 菜单关闭，焦点回到齿轮
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("HLS：动态加载 hls.js，档位进入清晰度菜单（含「自动」），切换交给 hls.js；卸载时销毁", async () => {
    const { group, unmount } = setup({ src: "https://x/live/index.m3u8" });
    await waitFor(() => expect(group.getAttribute("data-engine")).toBe("hls"));
    const hls = hlsState.instances[hlsState.instances.length - 1];
    act(() => hls.fire("parsed"));
    await openMenu("清晰度");
    const options = screen
      .getAllByRole("menuitemradio")
      .map((item) => item.textContent);
    expect(options).toEqual(["自动", "1080p", "480p"]);
    fireEvent.click(screen.getByRole("menuitemradio", { name: "1080p" }));
    expect(hls.currentLevel).toBe(1);
    unmount();
    expect(hls.destroyed).toBe(true);
  });

  it("播放速度：菜单选择与 < / > 快捷键", async () => {
    const { group, video } = setup();
    await openMenu("播放速度");
    fireEvent.click(screen.getByRole("menuitemradio", { name: "1.5x" }));
    expect(video.playbackRate).toBe(1.5);
    fireEvent.keyDown(group, { key: ">" });
    expect(video.playbackRate).toBe(1.75);
    expect(screen.getByTestId("video-notice").textContent).toBe(
      "播放速度 1.75x",
    );
    fireEvent.keyDown(group, { key: "<" });
    fireEvent.keyDown(group, { key: "<" });
    expect(video.playbackRate).toBe(1.25);
  });
});

describe("截图与录制", () => {
  it("截图按钮与 S 键：回调 Blob 与元信息，并提示「已截图」", async () => {
    installCanvasMock();
    const onScreenshot = vi.fn();
    const { group, video } = setup({ onScreenshot });
    loadMetadata(video, 1280, 720, 30);
    video.currentTime = 3;
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "截图" }));
    });
    expect(onScreenshot).toHaveBeenCalledTimes(1);
    const [blob, meta] = onScreenshot.mock.calls[0];
    expect((blob as Blob).type).toBe("image/png");
    expect(meta).toMatchObject({
      width: 1280,
      height: 720,
      fileName: "离港-0m03s.png",
    });
    expect(screen.getByTestId("video-notice").textContent).toBe("已截图");
    await act(async () => {
      fireEvent.keyDown(group, { key: "s" });
    });
    expect(onScreenshot).toHaveBeenCalledTimes(2);
  });

  it("onScreenshot 返回 false（例如作者取消保存）时不提示「已截图」", async () => {
    installCanvasMock();
    const { video } = setup({ onScreenshot: async () => false });
    loadMetadata(video);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "截图" }));
    });
    expect(screen.queryByTestId("video-notice")).toBeNull();
  });

  it("不传 onScreenshot 时直接下载；跨域截图失败时提示原因并回调 onError", async () => {
    installCanvasMock();
    const createUrl = vi.fn(() => "blob:shot");
    vi.stubGlobal(
      "URL",
      Object.assign(URL, {
        createObjectURL: createUrl,
        revokeObjectURL: vi.fn(),
      }),
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);
    const { video, unmount } = setup();
    loadMetadata(video);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "截图" }));
    });
    expect(createUrl).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    unmount();

    vi.restoreAllMocks();
    installCanvasMock({ taint: true });
    const onError = vi.fn();
    const second = setup({ onError, onScreenshot: vi.fn() });
    loadMetadata(second.video);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "截图" }));
    });
    expect(onError.mock.calls[0][0]).toMatchObject({ code: "tainted" });
    expect(screen.getByRole("alert").textContent).toContain("跨域");
  });

  it("录制：开始（暂停时自动播放）→ 显示计时与 REC → 停止后回调 Blob；R 键切换", async () => {
    installRecorderMock({ supported: ["video/webm;codecs=vp9,opus"] });
    const onRecording = vi.fn();
    const { group, video } = setup({ onRecording });
    loadMetadata(video);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "开始录制" }));
    });
    const stopButton = await screen.findByRole("button", { name: "停止录制" });
    expect(video.paused).toBe(false);
    expect(group.getAttribute("data-recording")).toBe("true");
    expect(screen.getByTestId("video-record-time").textContent).toBe("0:00");
    await act(async () => {
      fireEvent.click(stopButton);
    });
    await waitFor(() => expect(onRecording).toHaveBeenCalledTimes(1));
    const [blob, meta] = onRecording.mock.calls[0];
    expect((blob as Blob).type).toBe("video/webm");
    expect(meta).toMatchObject({ extension: "webm", hasAudio: true });
    expect(screen.getByRole("button", { name: "开始录制" })).toBeTruthy();
    // R 键：开始再停止
    await act(async () => {
      fireEvent.keyDown(group, { key: "r" });
    });
    await screen.findByRole("button", { name: "停止录制" });
    await act(async () => {
      fireEvent.keyDown(group, { key: "r" });
    });
    await waitFor(() => expect(onRecording).toHaveBeenCalledTimes(2));
  });

  it("通过 ref 控制：seek / 速度 / 截图 / 录制", async () => {
    installCanvasMock();
    installRecorderMock({ supported: ["video/mp4"] });
    const ref = React.createRef<VideoPlayerHandle>();
    const onScreenshot = vi.fn();
    const onRecording = vi.fn();
    const { video } = setup({ ref, onScreenshot, onRecording } as Partial<
      React.ComponentProps<typeof VideoPlayer>
    >);
    loadMetadata(video);
    act(() => ref.current?.seek(12));
    expect(video.currentTime).toBe(12);
    act(() => ref.current?.setPlaybackRate(2));
    expect(video.playbackRate).toBe(2);
    let shot: Blob | undefined;
    await act(async () => {
      shot = await ref.current?.screenshot();
    });
    expect(shot?.type).toBe("image/png");
    await act(async () => {
      expect(await ref.current?.startRecording()).toBe(true);
    });
    let recorded: Blob | null | undefined;
    await act(async () => {
      recorded = await ref.current?.stopRecording();
    });
    expect(recorded?.type).toBe("video/mp4");
    expect(ref.current?.video).toBe(video);
  });
});

describe("全屏、能力降级与控制项", () => {
  it("全屏时提示的挂载容器是播放器根元素（挂到 body 的提示在全屏时看不见）", () => {
    const contexts: TooltipContext[] = [];
    const renderTooltip: RenderTooltip = (content, control, context) => {
      contexts.push(context);
      return <span data-tip={content}>{control}</span>;
    };
    const { group } = setup({ renderTooltip });
    expect(contexts[contexts.length - 1]).toEqual({
      container: null,
      fullscreen: false,
    });
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: group,
    });
    act(() => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });
    try {
      expect(group.getAttribute("data-fullscreen")).toBe("true");
      expect(screen.getByRole("button", { name: "退出全屏" })).toBeTruthy();
      expect(contexts[contexts.length - 1]).toEqual({
        container: group,
        fullscreen: true,
      });
    } finally {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: null,
      });
      act(() => {
        document.dispatchEvent(new Event("fullscreenchange"));
      });
    }
    expect(contexts[contexts.length - 1].container).toBeNull();
  });

  it("设置菜单渲染在播放器内部（全屏时同样可见），Esc 关闭", async () => {
    const { group } = setup();
    fireEvent.click(screen.getByRole("button", { name: "设置" }));
    const menu = screen.getByRole("menu", { name: "播放设置" });
    expect(group.contains(menu)).toBe(true);
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("不支持的能力隐藏按钮：没有画中画 / 录制 / 全屏 API 时不显示", () => {
    HTMLElement.prototype.requestFullscreen =
      undefined as unknown as HTMLElement["requestFullscreen"];
    try {
      setup();
      expect(screen.queryByRole("button", { name: "画中画" })).toBeNull();
      expect(screen.queryByRole("button", { name: "开始录制" })).toBeNull();
      expect(screen.queryByRole("button", { name: "全屏" })).toBeNull();
      // 截图只需要 canvas
      expect(screen.getByRole("button", { name: "截图" })).toBeTruthy();
    } finally {
      HTMLElement.prototype.requestFullscreen = () => Promise.resolve();
    }
  });

  it("Safari 画中画（presentation mode）可用时显示按钮，P 键切换", () => {
    const setMode = vi.fn();
    Object.assign(HTMLVideoElement.prototype, {
      webkitSupportsPresentationMode: () => true,
      webkitSetPresentationMode: setMode,
    });
    try {
      const { group } = setup();
      fireEvent.click(screen.getByRole("button", { name: "画中画" }));
      expect(setMode).toHaveBeenCalledWith("picture-in-picture");
      fireEvent.keyDown(group, { key: "p" });
      expect(setMode).toHaveBeenCalledTimes(2);
    } finally {
      Reflect.deleteProperty(
        HTMLVideoElement.prototype,
        "webkitSupportsPresentationMode",
      );
      Reflect.deleteProperty(
        HTMLVideoElement.prototype,
        "webkitSetPresentationMode",
      );
    }
  });

  it("controls 隐藏指定按钮", () => {
    installRecorderMock({ supported: ["video/webm"] });
    setup({
      controls: {
        screenshot: false,
        record: false,
        settings: false,
        fullscreen: false,
      },
    });
    expect(screen.queryByRole("button", { name: "截图" })).toBeNull();
    expect(screen.queryByRole("button", { name: "开始录制" })).toBeNull();
    expect(screen.queryByRole("button", { name: "设置" })).toBeNull();
    expect(screen.queryByRole("button", { name: "全屏" })).toBeNull();
    expect(screen.getByRole("button", { name: "播放" })).toBeTruthy();
  });
});

describe("状态浮层与其他属性", () => {
  it("错误浮层：显示原因，「重试」重新加载并回到原位置", () => {
    const onError = vi.fn();
    const { video } = setup({ onError });
    loadMetadata(video);
    video.currentTime = 9;
    Object.defineProperty(video, "error", {
      configurable: true,
      value: { code: 2 },
    });
    act(() => {
      video.dispatchEvent(new Event("error"));
    });
    expect(screen.getByRole("alert").textContent).toContain("网络错误");
    expect(onError.mock.calls[0][0]).toMatchObject({ code: "network" });
    Object.defineProperty(video, "error", { configurable: true, value: null });
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(video.getAttribute("src")).toBe("blob:v");
    loadMetadata(video);
    expect(video.currentTime).toBe(9);
  });

  it("等待数据时显示加载中，开始播放后消失", async () => {
    const { video } = setup();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "播放" }));
    });
    act(() => {
      video.dispatchEvent(new Event("waiting"));
    });
    expect(screen.getByTestId("video-loading")).toBeTruthy();
    act(() => {
      video.dispatchEvent(new Event("playing"));
    });
    expect(screen.queryByTestId("video-loading")).toBeNull();
  });

  it("进度条显示已缓冲区间与悬停时间", () => {
    const { video } = setup();
    loadMetadata(video, 640, 360, 100);
    Object.defineProperty(video, "buffered", {
      configurable: true,
      value: { length: 1, start: () => 0, end: () => 40 },
    });
    act(() => {
      video.dispatchEvent(new Event("progress"));
    });
    expect(
      (screen.getByTestId("video-buffered") as HTMLElement).style.width,
    ).toBe("40%");
    const slider = screen.getByRole("slider", { name: "播放进度" });
    vi.spyOn(slider, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 200,
      top: 0,
      right: 200,
      bottom: 10,
      height: 10,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    fireEvent.pointerMove(slider, { clientX: 50 });
    expect(screen.getByTestId("video-hover-time").textContent).toBe("0:25");
    fireEvent.pointerLeave(slider);
    expect(screen.queryByTestId("video-hover-time")).toBeNull();
  });

  it("poster 时不跳到第一帧；startTime 从指定位置开始；回调 onTimeUpdate / onEnded", () => {
    const onTimeUpdate = vi.fn();
    const onEnded = vi.fn();
    const { video } = setup({
      poster: "cover.png",
      startTime: 6,
      onTimeUpdate,
      onEnded,
    });
    expect(video.getAttribute("poster")).toBe("cover.png");
    loadMetadata(video);
    expect(video.currentTime).toBe(6);
    act(() => {
      video.dispatchEvent(new Event("timeupdate"));
      video.dispatchEvent(new Event("ended"));
    });
    expect(onTimeUpdate).toHaveBeenCalledWith(6, 30);
    expect(onEnded).toHaveBeenCalledTimes(1);
  });

  it("字幕：渲染 track，菜单与 C 键切换", async () => {
    const { group, video } = setup({
      tracks: [
        { src: "data:text/vtt,WEBVTT%0A%0A#zh", srclang: "zh", label: "中文" },
        {
          src: "data:text/vtt,WEBVTT%0A%0A#en",
          srclang: "en",
          label: "English",
        },
      ],
    });
    expect(video.querySelectorAll("track")).toHaveLength(2);
    await openMenu("字幕");
    fireEvent.click(screen.getByRole("menuitemradio", { name: "English" }));
    fireEvent.keyDown(group, { key: "c" });
    await openMenu("字幕");
    expect(
      screen
        .getByRole("menuitemradio", { name: "关闭" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    // 子菜单里 Esc 先回到上一级，再按一次关闭
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    fireEvent.keyDown(group, { key: "c" });
    await openMenu("字幕");
    expect(
      screen
        .getByRole("menuitemradio", { name: "English" })
        .getAttribute("aria-checked"),
    ).toBe("true");
  });

  it("applyCaptionMode：只显示选中的字幕", () => {
    const list = { length: 2, 0: { mode: "showing" }, 1: { mode: "disabled" } };
    applyCaptionMode(list, 1);
    expect([list[0].mode, list[1].mode]).toEqual(["disabled", "showing"]);
    applyCaptionMode(list, -1);
    expect([list[0].mode, list[1].mode]).toEqual(["disabled", "disabled"]);
  });
});
