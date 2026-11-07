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
import { act, fireEvent, render, screen } from "@testing-library/react";
import VideoPlayer, {
  clampTime,
  formatTime,
  frameWidth,
  ratioFromPointer,
} from "../src";

/** 模拟浏览器读到元数据：设置尺寸与时长并派发 loadedmetadata */
function loadMetadata(
  video: HTMLVideoElement,
  width: number,
  height: number,
  duration: number,
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

function setup(props: Partial<React.ComponentProps<typeof VideoPlayer>> = {}) {
  const utils = render(
    <VideoPlayer
      src="blob:v"
      title="离港"
      videoClassName="my-video"
      {...props}
    />,
  );
  const group = screen.getByRole("group", { name: "视频 离港" });
  const video = group.querySelector("video") as HTMLVideoElement;
  return { ...utils, group, video };
}

// happy-dom 没有全屏 API：补一个，否则全屏按钮按「不支持」隐藏
const originalRequestFullscreen = HTMLElement.prototype.requestFullscreen;
beforeAll(() => {
  HTMLElement.prototype.requestFullscreen = () => Promise.resolve();
});
afterAll(() => {
  HTMLElement.prototype.requestFullscreen = originalRequestFullscreen;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("VideoPlayer 纯函数", () => {
  it("formatTime：m:ss / h:mm:ss，非法值为 0:00", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(5.9)).toBe("0:05");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(3725)).toBe("1:02:05");
    expect(formatTime(Number.NaN)).toBe("0:00");
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe("0:00");
    expect(formatTime(-3)).toBe("0:00");
  });

  it("clampTime / ratioFromPointer：限制范围", () => {
    expect(clampTime(-2, 10)).toBe(0);
    expect(clampTime(12, 10)).toBe(10);
    expect(clampTime(12, Number.NaN)).toBe(12);
    expect(clampTime(Number.NaN, 10)).toBe(0);
    expect(ratioFromPointer(150, 100, 200)).toBe(0.25);
    expect(ratioFromPointer(0, 100, 200)).toBe(0);
    expect(ratioFromPointer(900, 100, 200)).toBe(1);
    expect(ratioFromPointer(10, 0, 0)).toBe(0);
  });

  it("frameWidth：按比例收窄，不超过父容器 / 最大宽度 / 最大高度", () => {
    expect(frameWidth(2)).toBe("100%");
    expect(frameWidth(2, 640)).toBe("min(100%, 640px)");
    expect(frameWidth(2, 640, 420)).toBe("min(100%, 640px, calc(420px * 2))");
    expect(frameWidth(0.5, undefined, "60vh")).toBe(
      "min(100%, calc(60vh * 0.5))",
    );
  });
});

describe("VideoPlayer 组件", () => {
  it("无障碍：分组标签、内部 video 带类名、不使用原生控制条", () => {
    const { group, video } = setup();
    expect(group.getAttribute("tabindex")).toBe("0");
    expect(video.classList.contains("my-video")).toBe(true);
    expect(video.controls).toBe(false);
    expect(video.getAttribute("preload")).toBe("metadata");
    expect(screen.getByRole("button", { name: "播放" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "静音" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "全屏" })).toBeTruthy();
    expect(screen.getByText("离港")).toBeTruthy();
  });

  it("读到元数据后容器贴合视频宽高比，并回调尺寸 / 时长与布局变化；不自动播放时停在第一帧附近", () => {
    const onMetadata = vi.fn();
    const onLayoutChange = vi.fn();
    const { group, video } = setup({
      maxWidth: 640,
      maxHeight: 420,
      onMetadata,
      onLayoutChange,
    });
    expect(group.getAttribute("data-aspect")).toBeNull();
    loadMetadata(video, 1280, 720, 12);
    expect(group.getAttribute("data-aspect")).toBe(
      String(Number((1280 / 720).toFixed(4))),
    );
    expect(onMetadata).toHaveBeenCalledWith({
      width: 1280,
      height: 720,
      duration: 12,
    });
    expect(onLayoutChange).toHaveBeenCalled();
    expect(video.currentTime).toBeCloseTo(0.1);
    expect(screen.getByTestId("video-time").textContent).toBe("0:00 / 0:12");
  });

  it("播放 / 暂停：按钮、点击画面、空格与 K 键", async () => {
    const { group, video } = setup();
    expect(video.paused).toBe(true);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "播放" }));
    });
    expect(video.paused).toBe(false);
    expect(group.getAttribute("data-paused")).toBe("false");
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "暂停" }));
    });
    expect(video.paused).toBe(true);
    await act(async () => {
      fireEvent.keyDown(group, { key: " " });
    });
    expect(video.paused).toBe(false);
    await act(async () => {
      fireEvent.keyDown(group, { key: "k" });
    });
    expect(video.paused).toBe(true);
    // 点击画面
    const surface = group.querySelector('[aria-hidden="true"]') as HTMLElement;
    await act(async () => {
      fireEvent.click(surface);
    });
    expect(video.paused).toBe(false);
  });

  it("进度条：点击跳转、键盘 ← / → 5 秒、Home / End，aria 值同步", () => {
    const { video } = setup();
    loadMetadata(video, 640, 360, 20);
    const slider = screen.getByRole("slider", { name: "播放进度" });
    expect(slider.getAttribute("aria-valuemax")).toBe("20");
    vi.spyOn(slider, "getBoundingClientRect").mockReturnValue({
      left: 100,
      width: 200,
      top: 0,
      right: 300,
      bottom: 10,
      height: 10,
      x: 100,
      y: 0,
      toJSON: () => ({}),
    });
    fireEvent.pointerDown(slider, { clientX: 150, pointerId: 1 });
    fireEvent.pointerUp(slider, { pointerId: 1 });
    expect(video.currentTime).toBe(5);
    expect(slider.getAttribute("aria-valuenow")).toBe("5");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(video.currentTime).toBe(10);
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(video.currentTime).toBe(0);
    fireEvent.keyDown(slider, { key: "End" });
    expect(video.currentTime).toBe(20);
    expect(slider.getAttribute("aria-valuetext")).toBe("0:20 / 0:20");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(video.currentTime).toBe(0);
  });

  it("聚焦播放器时 ← / → 也能快退快进", () => {
    const { group, video } = setup();
    loadMetadata(video, 640, 360, 30);
    fireEvent.keyDown(group, { key: "ArrowRight" });
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(video.currentTime).toBe(10);
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(video.currentTime).toBe(5);
  });

  it("静音切换（按钮与 M 键），默认静音时显示「取消静音」", () => {
    const { group, video } = setup({ defaultMuted: true });
    expect(video.muted).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "取消静音" }));
    expect(video.muted).toBe(false);
    expect(screen.getByRole("button", { name: "静音" })).toBeTruthy();
    fireEvent.keyDown(group, { key: "m" });
    expect(video.muted).toBe(true);
  });

  it("循环开关（可选）", () => {
    const { video } = setup({ showLoopToggle: true, defaultLoop: true });
    const toggle = screen.getByRole("button", { name: "循环播放" });
    expect(video.loop).toBe(true);
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(toggle);
    expect(video.loop).toBe(false);
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
  });

  it("全屏按钮调用 requestFullscreen", () => {
    const { group } = setup();
    const request = vi.fn(() => Promise.resolve());
    Object.assign(group, { requestFullscreen: request });
    fireEvent.click(screen.getByRole("button", { name: "全屏" }));
    expect(request).toHaveBeenCalledTimes(1);
  });

  it("额外操作插槽显示在播放器里，点击不触发播放", async () => {
    const onBeside = vi.fn();
    const { video } = setup({
      actions: (
        <button type="button" aria-label="在旁边看 离港" onClick={onBeside}>
          看
        </button>
      ),
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "在旁边看 离港" }));
    });
    expect(onBeside).toHaveBeenCalledTimes(1);
    expect(video.paused).toBe(true);
  });

  it("compact：静音、循环、自动播放，没有控制条，只有「开启声音」图标", () => {
    const { video, group } = setup({ variant: "compact" });
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(group.getAttribute("tabindex")).toBe("-1");
    expect(screen.queryByRole("slider")).toBeNull();
    expect(screen.queryByRole("button", { name: "播放" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "开启声音" }));
    expect(video.muted).toBe(false);
    expect(screen.queryByRole("button", { name: "开启声音" })).toBeNull();
  });
});

describe("VideoPlayer 声音", () => {
  /** 模拟 Chromium：只有 webkitAudioDecodedByteCount，播放了一段时间 */
  function decodeBytes(video: HTMLVideoElement, bytes: number, played: number) {
    Object.defineProperty(video, "readyState", {
      configurable: true,
      value: 4,
    });
    Object.defineProperty(video, "webkitAudioDecodedByteCount", {
      configurable: true,
      value: bytes,
    });
    Object.defineProperty(video, "played", {
      configurable: true,
      value: { length: 1, start: () => 0, end: () => played },
    });
    act(() => {
      video.dispatchEvent(new Event("timeupdate"));
    });
  }

  it("用户发起的播放默认有声，不显示「开启声音」", () => {
    const { video } = setup();
    expect(video.muted).toBe(false);
    expect(screen.queryByRole("button", { name: "开启声音" })).toBeNull();
  });

  it("自动播放静音起播并显示「开启声音」；点它恢复声音", () => {
    const { video, group } = setup({ autoPlay: true });
    expect(video.muted).toBe(true);
    expect(group.getAttribute("data-muted")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "开启声音" }));
    expect(video.muted).toBe(false);
    expect(screen.queryByRole("button", { name: "开启声音" })).toBeNull();
  });

  it("自动播放后用户主动播放时恢复声音", async () => {
    const { video } = setup({ autoPlay: true });
    expect(video.muted).toBe(true);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "播放" }));
    });
    expect(video.paused).toBe(false);
    expect(video.muted).toBe(false);
  });

  it("确定没有音轨：静音按钮显示「无音轨」且不可切换，不显示「开启声音」，回调一次", () => {
    const onAudioTrack = vi.fn();
    const { video, group } = setup({ autoPlay: true, onAudioTrack });
    decodeBytes(video, 0, 0.3);
    // 播放太短还不能下结论
    expect(group.getAttribute("data-audio")).toBe("unknown");
    decodeBytes(video, 0, 2);
    expect(group.getAttribute("data-audio")).toBe("absent");
    const button = screen.getByRole("button", { name: "无音轨" });
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(screen.queryByRole("button", { name: "开启声音" })).toBeNull();
    expect(screen.queryByRole("slider", { name: "音量" })).toBeNull();
    fireEvent.keyDown(group, { key: "m" });
    expect(video.muted).toBe(true);
    expect(onAudioTrack).toHaveBeenCalledTimes(1);
    expect(onAudioTrack).toHaveBeenCalledWith("absent");
  });

  it("有音轨：解码字节数大于 0 即判定，换片后重新判断", () => {
    const onAudioTrack = vi.fn();
    const { video, group, rerender } = setup({ onAudioTrack });
    decodeBytes(video, 2048, 0.1);
    expect(group.getAttribute("data-audio")).toBe("present");
    expect(onAudioTrack).toHaveBeenCalledWith("present");
    rerender(
      <VideoPlayer src="blob:other" title="离港" onAudioTrack={onAudioTrack} />,
    );
    expect(group.getAttribute("data-audio")).toBe("unknown");
  });

  it("音量滑块与 ↑ / ↓：调到 0 即静音，再调大恢复", () => {
    const { video, group } = setup();
    const slider = screen.getByRole("slider", {
      name: "音量",
    }) as HTMLInputElement;
    expect(slider.value).toBe("100");
    fireEvent.change(slider, { target: { value: "40" } });
    expect(video.volume).toBeCloseTo(0.4);
    expect(video.muted).toBe(false);
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(video.volume).toBeCloseTo(0.3);
    fireEvent.change(slider, { target: { value: "0" } });
    expect(video.muted).toBe(true);
    fireEvent.keyDown(group, { key: "ArrowUp" });
    expect(video.muted).toBe(false);
    expect(video.volume).toBeCloseTo(0.1);
  });

  it("defaultVolume 初始音量；取消静音时音量为 0 则恢复到 100%", () => {
    const { video } = setup({ defaultVolume: 0, defaultMuted: true });
    expect(video.volume).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "取消静音" }));
    expect(video.muted).toBe(false);
    expect(video.volume).toBe(1);
  });

  it("提示：默认用原生 title；传入 renderTooltip 时改用使用方的提示组件", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "播放" }).getAttribute("title"),
    ).toBe("播放（空格）");
  });

  it("renderTooltip 包裹每个控制按钮且不再设置 title", () => {
    const renderTooltip = vi.fn(
      (content: string, control: React.ReactElement) => (
        <span data-tip={content}>{control}</span>
      ),
    );
    setup({ renderTooltip, showLoopToggle: true });
    const play = screen.getByRole("button", { name: "播放" });
    expect(play.getAttribute("title")).toBeNull();
    expect(play.parentElement?.getAttribute("data-tip")).toBe("播放（空格）");
    expect(renderTooltip.mock.calls.map((call) => call[0])).toEqual(
      expect.arrayContaining([
        "播放（空格）",
        "静音（M）",
        "循环播放",
        "全屏（F）",
      ]),
    );
  });
});
