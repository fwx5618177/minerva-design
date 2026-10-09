import { createApp } from "vue";
import App from "./App.vue";
import { uniBuiltIns } from "../support/uni-built-ins";
import "../../../minerva-design/dist/core/tokens.mini.css";
import "../../../../tools/styles/mini-controls.css";
import "../../../../tools/styles/uni-components.css";
import "../../../../tools/styles/uni-primitives.css";
import "../../../../tools/styles/uni-dialogs.css";
type ResizeHandler = (event: { size: { windowWidth: number } }) => void;
const resizeHandlers = new Map<ResizeHandler, () => void>();
(globalThis as any).uni = {
  getSystemInfoSync: () => ({
    windowWidth: window.innerWidth,
    theme: matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  }),
  onWindowResize: (handler: ResizeHandler) => {
    const listener = () =>
      handler({ size: { windowWidth: window.innerWidth } });
    resizeHandlers.set(handler, listener);
    window.addEventListener("resize", listener);
  },
  offWindowResize: (handler: ResizeHandler) => {
    const listener = resizeHandlers.get(handler);
    if (listener) window.removeEventListener("resize", listener);
    resizeHandlers.delete(handler);
  },
  onThemeChange() {},
  offThemeChange() {},
  navigateTo() {},
  pageScrollTo() {},
};
const app = createApp(App);
for (const [name, component] of Object.entries(uniBuiltIns))
  app.component(name, component);
app.mount("#app");
