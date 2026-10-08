// Runs in Node without a DOM: every runtime entry of the installed package
// (ESM and CJS), the server-rendered app and the web components.
import { createRequire } from "node:module";
import { render, themeScript } from "./dist-ssr/entry-server.js";

const require = createRequire(import.meta.url);
const esm = await import("minerva-design");
const cjs = require("minerva-design");
const wc = await import("minerva-design/web-components");
const button = await import("minerva-design/web-components/button");

console.log(
  JSON.stringify({
    html: render(),
    themeScript: typeof themeScript,
    esmButton: typeof esm.Button,
    cjsButton: typeof cjs.Button,
    utils: typeof require("minerva-design/utils").cn,
    core: typeof (await import("minerva-design/core")).createFocusScope,
    coreCjs: typeof require("minerva-design/core").createFocusScope,
    wcExports: Object.keys(wc).length,
    wcButton: typeof button.MinervaButton,
    defined: Boolean(globalThis.customElements?.get("minerva-button")),
  }),
);
