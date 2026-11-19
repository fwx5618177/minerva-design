// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ControlBar, {
  resolveControls,
  type ControlBarProps,
} from "../src/ControlBar";
import { ErrorOverlay, LoadingOverlay } from "../src/Overlays";

afterEach(cleanup);
function props(): ControlBarProps {
  return {
    show: resolveControls(
      undefined,
      true,
      { screenshot: true, record: true, pip: true, fullscreen: true },
      { playlist: true, download: true },
    ),
    paused: true,
    current: 0,
    duration: 30,
    buffered: [],
    muted: false,
    volume: 1,
    audio: "present",
    loop: false,
    recordStatus: "idle",
    recordElapsed: 0,
    pipActive: false,
    fullscreen: false,
    qualityOptions: [],
    quality: "auto",
    rate: 1,
    captions: [],
    captionIndex: -1,
    hasPrevious: false,
    hasNext: true,
    onTogglePlay: vi.fn(),
    onSeek: vi.fn(),
    onDragChange: vi.fn(),
    onToggleMute: vi.fn(),
    onVolume: vi.fn(),
    onToggleLoop: vi.fn(),
    onScreenshot: vi.fn(),
    onToggleRecord: vi.fn(),
    onTogglePip: vi.fn(),
    onToggleFullscreen: vi.fn(),
    onQuality: vi.fn(),
    onRate: vi.fn(),
    onCaption: vi.fn(),
    onMenuOpenChange: vi.fn(),
    onPrevious: vi.fn(),
    onNext: vi.fn(),
    onDownload: vi.fn(),
  };
}
function glyph(label: string, icon: string) {
  const button = screen.getByRole("button", { name: label });
  const svg = button.querySelector("svg")!;
  expect(svg.getAttribute("data-icon")).toBe(icon);
  expect(svg.getAttribute("width")).toBe("1em");
  expect(svg.getAttribute("height")).toBe("1em");
  expect(svg.getAttribute("aria-hidden")).toBe("true");
  return button;
}
it("uses decorative Minerva control glyphs while preserving button actions and states", () => {
  const values = props();
  const { rerender } = render(<ControlBar {...values} />);
  fireEvent.click(glyph("播放", "play"));
  expect(values.onTogglePlay).toHaveBeenCalledOnce();
  expect(glyph("上一首", "skip-back").hasAttribute("disabled")).toBe(true);
  fireEvent.click(glyph("下一首", "skip-forward"));
  expect(values.onNext).toHaveBeenCalledOnce();
  glyph("静音", "volume");
  glyph("循环播放", "repeat");
  glyph("截图", "camera");
  glyph("开始录制", "circle");
  fireEvent.click(glyph("画中画", "picture-in-picture"));
  expect(values.onTogglePip).toHaveBeenCalledOnce();
  glyph("全屏", "maximize");
  fireEvent.click(glyph("下载", "download"));
  expect(values.onDownload).toHaveBeenCalledOnce();
  glyph("设置", "settings");
  rerender(
    <ControlBar
      {...values}
      paused={false}
      muted
      loop
      recordStatus="stopping"
      pipActive
      fullscreen
    />,
  );
  glyph("暂停", "pause");
  glyph("取消静音", "volume-off");
  expect(glyph("停止录制", "stop").hasAttribute("disabled")).toBe(true);
  expect(
    screen
      .getByRole("button", { name: "循环播放" })
      .getAttribute("aria-pressed"),
  ).toBe("true");
  expect(
    glyph("退出画中画", "picture-in-picture").getAttribute("aria-pressed"),
  ).toBe("true");
  glyph("退出全屏", "minimize");
});
it("keeps loading and retry feedback accessible with Minerva glyphs", () => {
  const retry = vi.fn();
  const { container } = render(
    <>
      <LoadingOverlay />
      <ErrorOverlay message="Playback failed" onRetry={retry} />
    </>,
  );
  expect(screen.getByRole("status", { name: "加载中" })).toBeTruthy();
  expect(screen.getByRole("alert").textContent).toContain("Playback failed");
  for (const name of ["loader", "alert-triangle", "refresh"]) {
    const icon = container.querySelector(`[data-icon="${name}"]`)!;
    expect(icon).not.toBeNull();
    expect(icon.getAttribute("width")).toBe("1em");
    expect(icon.getAttribute("aria-hidden")).toBe("true");
  }
  fireEvent.click(screen.getByRole("button", { name: "重试" }));
  expect(retry).toHaveBeenCalledOnce();
});
