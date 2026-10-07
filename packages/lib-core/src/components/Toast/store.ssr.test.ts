import { describe, expect, it, vi } from "vitest";

vi.mock("../../internal/canUseDOM", () => ({ canUseDOM: false }));

describe("toast store during SSR", () => {
  it("returns ids but keeps nothing (no cross-request leak, no timers)", async () => {
    const { toast, toastStore } = await import("./store");
    const id = toast.success("server side", { duration: 1000 });
    expect(id).toBe(1);
    expect(toast({ id: "named" })).toBe("named");
    expect(toastStore.peek()).toHaveLength(0);
  });
});
