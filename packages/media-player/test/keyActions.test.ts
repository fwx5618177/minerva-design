import { describe, expect, it, vi } from "vitest";
import {
  KEY_SEEK_SECONDS,
  VOLUME_STEP,
  runKeyAction,
  type KeyActionContext,
} from "../src/keyboard";
import { playerRootClass } from "../src/layout";

function context(overrides: Partial<KeyActionContext> = {}): KeyActionContext {
  return {
    show: {
      fullscreen: true,
      screenshot: true,
      record: true,
      speed: true,
      captions: true,
      pip: true,
    },
    hasSound: true,
    hasCaptions: true,
    togglePlay: vi.fn(),
    seekBy: vi.fn(),
    changeVolume: vi.fn(),
    toggleMute: vi.fn(),
    toggleFullscreen: vi.fn(),
    screenshot: vi.fn(),
    toggleRecord: vi.fn(),
    stepSpeed: vi.fn(),
    toggleCaptions: vi.fn(),
    togglePip: vi.fn(),
    ...overrides,
  };
}

describe("runKeyAction", () => {
  it("可用的动作执行并返回 true；方向与步长正确", () => {
    const ctx = context();
    expect(runKeyAction("seek-back", ctx)).toBe(true);
    expect(ctx.seekBy).toHaveBeenLastCalledWith(-KEY_SEEK_SECONDS);
    expect(runKeyAction("seek-forward", ctx)).toBe(true);
    expect(ctx.seekBy).toHaveBeenLastCalledWith(KEY_SEEK_SECONDS);
    expect(runKeyAction("volume-down", ctx)).toBe(true);
    expect(ctx.changeVolume).toHaveBeenLastCalledWith(-VOLUME_STEP);
    expect(runKeyAction("speed-up", ctx)).toBe(true);
    expect(ctx.stepSpeed).toHaveBeenLastCalledWith(1);
    expect(runKeyAction("toggle-play", ctx)).toBe(true);
    expect(ctx.togglePlay).toHaveBeenCalled();
  });

  it("不可用时返回 false 且不执行（没有声音 / 按钮隐藏 / 没有字幕）", () => {
    const ctx = context({
      hasSound: false,
      hasCaptions: false,
      show: {
        fullscreen: false,
        screenshot: false,
        record: false,
        speed: false,
        pip: false,
        captions: true,
      },
    });
    for (const action of [
      "volume-up",
      "toggle-mute",
      "toggle-fullscreen",
      "screenshot",
      "toggle-record",
      "speed-down",
      "toggle-captions",
      "toggle-pip",
    ] as const) {
      expect(runKeyAction(action, ctx)).toBe(false);
    }
    expect(ctx.changeVolume).not.toHaveBeenCalled();
    expect(ctx.toggleFullscreen).not.toHaveBeenCalled();
    expect(ctx.toggleCaptions).not.toHaveBeenCalled();
  });
});

describe("playerRootClass", () => {
  const styles = {
    player: "p",
    compact: "c",
    controlsVisible: "v",
    audioMode: "a",
    pending: "w",
  };

  it("按状态拼接类名，自定义类名放最后", () => {
    expect(
      playerRootClass(styles, {
        compact: true,
        showControls: true,
        audioOnly: false,
        pending: true,
        className: "x",
      }),
    ).toBe("p c v w x");
    expect(
      playerRootClass(styles, {
        compact: false,
        showControls: false,
        audioOnly: true,
        pending: false,
      }),
    ).toBe("p a");
  });
});
