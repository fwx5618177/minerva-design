import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import simulate from "miniprogram-simulate";

const dir = path.dirname(fileURLToPath(import.meta.url));
const compPath = path.resolve(dir, "./fixtures/mn-button/index"); // no extension

describe.each(["simulate", "official"] as const)(
  "mn-button (path-based load, compiler=%s)",
  (compiler) => {
    it("loads js/wxml/wxss/json, emits press, respects disabled", async () => {
      const id = simulate.load(compPath, "mn-button", { compiler });
      const comp = simulate.render(id, { label: "Path" });
      comp.attach(document.createElement("parent-wrapper"));

      // wxss is class-prefixed with tagName and injected into <head>, rpx -> px
      const style = document.querySelector(`style#${id}`)!;
      expect(style.innerHTML).toContain(".mn-button--mn-button");
      expect(style.innerHTML).toContain("16px");

      // path-based load applies classPrefix = tagName to class attributes
      expect(comp.dom!.innerHTML).toBe(
        '<wx-view class="mn-button--mn-button">Path</wx-view>',
      );

      const got: number[] = [];
      comp.addEventListener("press", (e: any) => got.push(e.detail.count));
      comp.querySelector(".mn-button")!.dispatchEvent("tap");
      await simulate.sleep(10);
      expect(got).toEqual([1]);

      comp.setData({ disabled: true });
      comp.querySelector(".mn-button")!.dispatchEvent("tap");
      await simulate.sleep(10);
      expect(got).toEqual([1]);
      expect(comp.dom!.innerHTML).toContain("mn-button--mn-button--disabled");
    });
  },
);
