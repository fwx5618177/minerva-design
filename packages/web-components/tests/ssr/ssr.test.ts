// @vitest-environment node
// The elements must be importable on the server (Node, SSR frameworks,
// static site generators): no DOM access at module evaluation. Lit resolves
// to its Node build here (DOM shim); registration is skipped or deferred
// where `customElements` does not exist.
import { describe, expect, it } from "vitest";

const entries = import.meta.glob("../../src/elements/*.ts");

describe("SSR / Node import", () => {
  it("runs without a DOM", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  // Cold source import transforms and coverage-instruments every element.
  // This checks SSR safety, not production import latency (covered in dist).
  // Keep a finite budget under concurrent CI workloads.
  it("imports the all-in-one entry", async () => {
    const mod = await import("../../src/index");
    expect(mod.MinervaButton.tagName).toBe("minerva-button");
    expect(typeof mod.defineElement).toBe("function");
  }, 30_000);

  it.each(Object.keys(entries).map((path) => [path.replace(/^.*\//, "")]))(
    "imports %s",
    async (file) => {
      const load = entries[`../../src/elements/${file}`];
      await expect(load()).resolves.toBeTypeOf("object");
    },
  );
});
