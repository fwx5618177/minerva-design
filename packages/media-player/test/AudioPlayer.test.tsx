// @vitest-environment happy-dom
import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import VideoPlayer, { waveformBars, type MediaEngineFactory } from "../src";

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

const originalRequestFullscreen = HTMLElement.prototype.requestFullscreen;
beforeAll(() => {
  HTMLElement.prototype.requestFullscreen = () => Promise.resolve();
});
afterAll(() => {
  HTMLElement.prototype.requestFullscreen = originalRequestFullscreen;
});

describe("waveformBars", () => {
  it("同一种子结果固定，高度在 0.22–1", () => {
    const bars = waveformBars("雨声");
    expect(bars).toHaveLength(64);
    expect(waveformBars("雨声")).toEqual(bars);
    expect(waveformBars("风声")).not.toEqual(bars);
    expect(bars.every((value) => value >= 0.22 && value <= 1)).toBe(true);
  });
});

describe("纯音频界面", () => {
  it("按扩展名一开始就是音频界面：波形、控制条常显，没有截图 / 录制 / 画中画 / 全屏", () => {
    render(<VideoPlayer src="https://x/rain.MP3?v=2" title="雨声" />);
    const group = screen.getByRole("group", { name: "音频 雨声" });
    expect(group.getAttribute("data-media")).toBe("audio");
    expect(screen.getByTestId("audio-visual")).toBeTruthy();
    expect(screen.getByText("雨声")).toBeTruthy();
    expect(
      group.querySelectorAll('[data-testid="audio-visual"] span[style]').length,
    ).toBe(64);
    for (const label of ["播放", "静音", "设置"]) {
      expect(screen.getByRole("button", { name: label })).toBeTruthy();
    }
    expect(screen.getByRole("slider", { name: "播放进度" })).toBeTruthy();
    for (const label of ["截图", "开始录制", "画中画", "全屏"]) {
      expect(screen.queryByRole("button", { name: label })).toBeNull();
    }
    // 音频界面不隐藏控制条
    expect(group.className).toMatch(/controlsVisible/);
  });

  it("读到元数据后没有画面 → 音频；有画面 → 视频（以实际为准）", () => {
    const { unmount } = render(
      <VideoPlayer src="blob:https://x/1" title="旁白" />,
    );
    const video = screen
      .getByRole("group", { name: "视频 旁白" })
      .querySelector("video")!;
    loadMetadata(video, 0, 0, 12);
    const group = screen.getByRole("group", { name: "音频 旁白" });
    expect(group.getAttribute("data-media")).toBe("audio");
    // 纯音频不跳到封面帧
    expect(video.currentTime).toBe(0);
    unmount();

    render(<VideoPlayer src="https://x/with-cover.ogg" title="带画面" />);
    const audioGroup = screen.getByRole("group", { name: "音频 带画面" });
    loadMetadata(audioGroup.querySelector("video")!, 640, 360, 5);
    expect(
      screen
        .getByRole("group", { name: "视频 带画面" })
        .getAttribute("data-media"),
    ).toBe("video");
  });

  it("显式 audioOnly / MIME；点击波形跳转，点击封面播放", () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    render(
      <VideoPlayer
        src={{ src: "blob:https://x/2", mimeType: "audio/wav" }}
        title="心跳"
        poster="cover.png"
      />,
    );
    const group = screen.getByRole("group", { name: "音频 心跳" });
    const video = group.querySelector("video")!;
    loadMetadata(video, 0, 0, 100);
    const wave = group.querySelector('[data-testid="audio-waveform"]');
    expect(wave).toBeTruthy();
    vi.spyOn(wave as HTMLElement, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 200,
      top: 0,
      height: 28,
      right: 200,
      bottom: 28,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    fireEvent.click(wave as HTMLElement, { clientX: 50 });
    expect(video.currentTime).toBe(25);
    const cover = group.querySelector('img[src="cover.png"]')!;
    fireEvent.click(cover.parentElement!);
    expect(play).toHaveBeenCalled();
    play.mockRestore();
  });

  it("解码失败时用「音频」措辞；RTMP 地址直接说明需要网关", async () => {
    const onError = vi.fn();
    const { unmount } = render(
      <VideoPlayer src="https://x/a.flac" title="无损" onError={onError} />,
    );
    const video = screen
      .getByRole("group", { name: "音频 无损" })
      .querySelector("video")!;
    Object.defineProperty(video, "error", {
      configurable: true,
      value: { code: 4 },
    });
    act(() => {
      video.dispatchEvent(new Event("error"));
    });
    expect(screen.getByRole("alert").textContent).toContain(
      "不支持这个音频格式",
    );
    unmount();

    render(
      <VideoPlayer
        src="rtmp://live.example.com/app/key"
        title="直播"
        onError={onError}
      />,
    );
    expect((await screen.findByRole("alert")).textContent).toContain("网关");
    expect(onError.mock.calls.at(-1)?.[0]).toMatchObject({
      code: "unsupported",
    });
  });

  it("MKV 解码失败给出转封装建议；DASH 走 dash 引擎，换片时销毁", async () => {
    const onError = vi.fn();
    const { unmount } = render(
      <VideoPlayer src="https://x/m.mkv" title="电影" onError={onError} />,
    );
    const video = screen
      .getByRole("group", { name: "视频 电影" })
      .querySelector("video")!;
    Object.defineProperty(video, "error", {
      configurable: true,
      value: { code: 4 },
    });
    act(() => {
      video.dispatchEvent(new Event("error"));
    });
    expect(onError.mock.calls[0][0].message).toContain("MKV");
    unmount();

    const destroy = vi.fn();
    const attach = vi.fn(() => ({
      kind: "dash",
      levels: () => [],
      currentLevel: () => "auto",
      setLevel: () => undefined,
      destroy,
    }));
    const dash: MediaEngineFactory = {
      kind: "dash",
      handles: (type) => type === "dash",
      attach,
    };
    const { rerender } = render(
      <VideoPlayer src="https://x/a.mpd" title="流" engines={[dash]} />,
    );
    expect(attach).toHaveBeenCalledTimes(1);
    expect(
      screen
        .getByRole("group", { name: "视频 流" })
        .getAttribute("data-engine"),
    ).toBe("dash");
    rerender(<VideoPlayer src="https://x/b.mpd" title="流" engines={[dash]} />);
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(attach).toHaveBeenCalledTimes(2);
  });
});
