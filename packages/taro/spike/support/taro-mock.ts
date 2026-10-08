// Minimal stand-in for '@tarojs/taro' in unit tests.
// Real H5 builds alias '@tarojs/taro' -> '@tarojs/taro-h5'; in tests we only need
// spy-able no-op APIs. Extend as components start calling more APIs.
import { vi } from "vitest";

const ok = <T extends object>(extra?: T) =>
  Promise.resolve({ errMsg: "ok", ...extra });

const Taro = {
  ENV_TYPE: {
    WEAPP: "WEAPP",
    WEB: "WEB",
    RN: "RN",
    SWAN: "SWAN",
    ALIPAY: "ALIPAY",
    TT: "TT",
    QQ: "QQ",
    JD: "JD",
  },
  getEnv: vi.fn(() => "WEB"),
  showToast: vi.fn((_opts?: unknown) => ok()),
  hideToast: vi.fn(() => ok()),
  showLoading: vi.fn((_opts?: unknown) => ok()),
  hideLoading: vi.fn(() => ok()),
  showModal: vi.fn((_opts?: unknown) => ok({ confirm: true, cancel: false })),
  navigateTo: vi.fn((_opts?: unknown) => ok()),
  navigateBack: vi.fn((_opts?: unknown) => ok()),
  getSystemInfoSync: vi.fn(() => ({
    platform: "devtools",
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
  })),
  pxTransform: vi.fn((size: number) => `${size / 40}rem`),
  nextTick: (cb: () => void) => Promise.resolve().then(cb),
  eventCenter: { on: vi.fn(), off: vi.fn(), trigger: vi.fn() },
};

export default Taro;
export const {
  getEnv,
  showToast,
  hideToast,
  showLoading,
  hideLoading,
  showModal,
  navigateTo,
  navigateBack,
  getSystemInfoSync,
  pxTransform,
  nextTick,
  eventCenter,
  ENV_TYPE,
} = Taro;
