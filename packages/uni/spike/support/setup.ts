import { beforeEach, vi } from "vitest";
import { config } from "@vue/test-utils";
import { uniBuiltIns } from "./uni-built-ins";

// uni built-ins available to every mount()
config.global.components = { ...config.global.components, ...uniBuiltIns };

// global `uni` API mock (typed by @dcloudio/types)
export const uniMock = {
  showToast: vi.fn(),
  hideToast: vi.fn(),
  showModal: vi.fn(),
  navigateTo: vi.fn(),
};

vi.stubGlobal("uni", uniMock);

beforeEach(() => {
  vi.clearAllMocks();
});
