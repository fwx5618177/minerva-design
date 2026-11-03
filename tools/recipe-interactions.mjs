// Copied into the isolated packed-package consumer by verify-recipes.mjs.
import assert from "node:assert/strict";
import { Window } from "happy-dom";
const window = new Window({ url: "http://localhost/" });
for (const name of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "Node",
  "SVGElement",
  "HTMLInputElement",
  "MutationObserver",
  "getComputedStyle",
  "Event",
  "MouseEvent",
  "CustomEvent",
])
  Object.defineProperty(globalThis, name, {
    value:
      typeof window[name] === "function" && name === "getComputedStyle"
        ? window[name].bind(window)
        : window[name],
    configurable: true,
  });
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
globalThis.ResizeObserver = window.ResizeObserver;
const id = process.argv[2];
const { default: App } = await import(
  `./${id}/${id === "vue-form" ? "dist-host" : "dist-ssr"}/App.js`
);
const host = document.createElement("div");
document.body.append(host);
let stop;
if (id === "vue-form") {
  const { createApp, nextTick } = await import("vue");
  const app = createApp(App);
  app.mount(host);
  stop = () => app.unmount();
  await nextTick();
} else {
  const { createElement, act } = await import("react");
  const { createRoot } = await import("react-dom/client");
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const root = createRoot(host);
  await act(async () => root.render(createElement(App)));
  stop = async () => act(async () => root.unmount());
}
async function update(action) {
  if (id === "react-form") {
    const { act } = await import("react");
    await act(async () => action());
  } else {
    action();
    const { nextTick } = await import("vue");
    await nextTick();
  }
}
const input = host.querySelector('input[name="project"]');
assert.ok(input, "project input rendered");
const button = () =>
  [...host.querySelectorAll("button")].find((el) =>
    el.textContent.includes("Save project"),
  );
assert.equal(button().disabled, true);
await update(() => {
  Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set.call(input, "Atlas");
  input.dispatchEvent(new window.Event("input", { bubbles: true }));
});
assert.equal(button().disabled, false, "controlled name enables Save");
await update(() => button().click());
assert.equal(
  host.querySelector("output").textContent,
  "Atlas",
  "saved result reflects actual packaged input",
);
await stop();
window.happyDOM.abort();
console.log(`${id} packaged interactions passed`);
