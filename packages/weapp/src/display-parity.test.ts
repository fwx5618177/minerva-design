import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import {
  avatar,
  avatarGroup,
  badge,
  card,
  tag,
  progressIndicator,
} from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(control: typeof avatar, props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "display-case",
    template: control.template,
    ...control.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("Avatar maps named sizes, CJK initials and retries changed sources after native image failure", async () => {
  const w = mount(avatar, {
    name: "张三",
    src: "bad.png",
    size: "xlarge",
    shape: "rounded",
  });
  expect(w.data.pixelSize).toBe(80);
  w.querySelector(".mn-avatar-image")!.dispatchEvent("error");
  await tick();
  expect(w.dom!.textContent).toContain("张");
  expect(w.dom!.textContent).not.toContain("张三");
  w.setData({ src: "next.png", size: 35 });
  expect(w.querySelector(".mn-avatar-image")).toBeTruthy();
  expect(w.data.pixelSize).toBe(35);
});
it("AvatarGroup counts hidden and explicit members and isolates failed-image fallbacks", async () => {
  const w = mount(avatarGroup, {
    items: [
      { name: "Ada Lovelace", src: "a.png" },
      { name: "Grace Hopper", src: "g.png" },
      { name: "张三" },
    ],
    max: 2,
    count: 3,
    size: "small",
  });
  expect(w.data.overflowCount).toBe(4);
  expect(w.data.pixelSize).toBe(32);
  w.querySelectorAll(".mn-avatar-image")[0].dispatchEvent("error");
  await tick();
  expect(w.querySelectorAll(".mn-avatar-image")).toHaveLength(1);
  expect(w.dom!.textContent).toContain("AL");
  w.setData({ items: [{ name: "Ada Lovelace", src: "new.png" }] });
  expect(w.querySelectorAll(".mn-avatar-image")).toHaveLength(1);
});
it("Badge content and all visual axes reach its native indicator", () => {
  const w = mount(badge, {
    content: "Ready",
    color: "success",
    variant: "outline",
    size: "large",
    position: "bottom-left",
    icon: "✓",
    borderRadius: 8,
    borderWidth: 2,
  });
  expect(w.dom!.textContent).toContain("Ready");
  expect(w.querySelector(".mn-badge-indicator")!.dom!.className).toContain(
    "mn-badge-inline",
  );
  const node = w.querySelector(".mn-badge-indicator")!.dom!;
  expect(node.className).toContain("mn-color-success");
  expect(node.className).toContain("mn-badge-bottom-left");
  expect(node.getAttribute("style")).toContain("8px");
});
it("Tag guards click/close during loading and disabled while exposing pressed and shape styles", async () => {
  const w = mount(tag, {
    label: "Filter",
    clickable: true,
    pressed: true,
    closable: true,
    loading: true,
    color: "danger",
    shape: "circle",
    size: "large",
  });
  const clicks: unknown[] = [],
    closed: unknown[] = [];
  w.addEventListener("click", (e) => clicks.push(e.detail));
  w.addEventListener("close", (e) => closed.push(e.detail));
  w.querySelector(".mn-tag")!.dispatchEvent("tap");
  await tick();
  expect(clicks).toHaveLength(0);
  expect(w.querySelector(".mn-close")).toBeFalsy();
  w.setData({ loading: false });
  w.querySelector(".mn-tag")!.dispatchEvent("tap");
  await tick();
  expect(clicks).toHaveLength(1);
  w.querySelector(".mn-close")!.dispatchEvent("tap");
  await tick();
  expect(closed).toHaveLength(1);
  expect(clicks).toHaveLength(1);
  w.setData({ disabled: true });
  w.querySelector(".mn-close")!.dispatchEvent("tap");
  await tick();
  expect(closed).toHaveLength(1);
});
it("Card applies root and section padding and blocks disabled interactive actions", async () => {
  const w = mount(card, {
    interactive: true,
    padding: "large",
    headerPadding: "none",
    contentPadding: "small",
    variant: "filled",
  });
  expect(w.querySelector(".mn-card-footer")!.dom!.className).toContain(
    "mn-pad-none",
  );
  let calls = 0;
  w.addEventListener("click", () => calls++);
  expect(w.querySelector(".mn-card")!.dom!.className).toContain("mn-pad-large");
  expect(w.querySelector(".mn-card-header")!.dom!.className).toContain(
    "mn-pad-none",
  );
  w.querySelector(".mn-card")!.dispatchEvent("tap");
  await tick();
  expect(calls).toBe(1);
  w.setData({ disabled: true });
  w.querySelector(".mn-card")!.dispatchEvent("tap");
  await tick();
  expect(calls).toBe(1);
});
it("Progress renders native circle and all indeterminate variants, clamping numeric progress", () => {
  const w = mount(progressIndicator, {
    variant: "circle",
    value: 75,
    size: "lg",
    label: "Uploading",
  });
  expect(w.data.pixelSize).toBe(32);
  expect(w.data.percent).toBe(75);
  expect(w.querySelector(".mn-progress-circle")).toBeTruthy();
  expect(w.dom!.textContent).toContain("Uploading");
  w.setData({ value: 200 });
  expect(w.data.percent).toBe(100);
  w.setData({ value: null, variant: "wave" });
  expect(w.data.isIndeterminate).toBe(true);
  expect(w.querySelectorAll(".mn-progress-wave-segment")).toHaveLength(5);
  w.setData({ variant: "dottedBar" });
  expect(w.querySelectorAll(".mn-progress-dot")).toHaveLength(5);
  w.setData({ variant: "spinner" });
  expect(w.querySelector(".mn-progress-spinner")).toBeTruthy();
});
