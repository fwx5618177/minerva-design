import Taro from "@tarojs/taro";
import { afterEach, expect, it, vi } from "vitest";
import { chartPixelRatio } from "./chart-pixel-ratio";

const api = Taro as unknown as Record<string, unknown>;
const systemInfo = api.getSystemInfoSync;

afterEach(() => {
  api.getSystemInfoSync = systemInfo;
  delete api.getWindowInfo;
  vi.unstubAllGlobals();
});

it("asks the mini-program APIs first", () => {
  vi.stubGlobal("devicePixelRatio", 1);
  api.getWindowInfo = () => ({ pixelRatio: 3 });
  expect(chartPixelRatio()).toBe(3);
  delete api.getWindowInfo;
  // the Taro mock answers 2
  expect(chartPixelRatio()).toBe(2);
});

it("uses the devicePixelRatio of the page without them (Taro H5)", () => {
  delete api.getSystemInfoSync;
  vi.stubGlobal("devicePixelRatio", 2.5);
  expect(chartPixelRatio()).toBe(2.5);
  // an API throwing or answering nothing usable
  api.getWindowInfo = () => {
    throw new Error("not supported");
  };
  expect(chartPixelRatio()).toBe(2.5);
  api.getWindowInfo = () => ({ pixelRatio: 0 });
  expect(chartPixelRatio()).toBe(2.5);
});

it("falls back to 1", () => {
  delete api.getSystemInfoSync;
  vi.stubGlobal("devicePixelRatio", undefined);
  expect(chartPixelRatio()).toBe(1);
});
