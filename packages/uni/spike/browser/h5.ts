import { createApp } from "vue";
import Fixture from "./H5Fixture.vue";
import { uniBuiltIns } from "../support/uni-built-ins";
import "../../../minerva-design/dist/core/tokens.mini.css";
import "../../../../tools/styles/mini-controls.css";
import "../../../../tools/styles/uni-components.css";
import "../../../../tools/styles/uni-dialogs.css";
(globalThis as any).uni = {
  getSystemInfoSync: () => ({
    windowWidth: innerWidth,
    windowHeight: innerHeight,
  }),
  onWindowResize() {},
  offWindowResize() {},
};
const app = createApp(Fixture);
for (const [name, component] of Object.entries(uniBuiltIns))
  app.component(name, component);
app.mount("#app");
