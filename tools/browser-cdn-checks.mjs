// Plain HTML page without a build step: the self-contained CDN files of
// dist/web-components/cdn/ loaded with <script type="module" src>, the
// all-in-one minerva.js next to the optional chart, quadrant task board and
// icon files (they share some elements: each tag keeps its first definition).
// Served from the built package by a local static server.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { DIST_DIR } from "./paths.mjs";

const TYPES = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".map": "application/json",
  ".html": "text/html",
};

const PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script>
      window.__errors = [];
      addEventListener("error", (e) => __errors.push(String(e.message ?? e)));
      addEventListener("unhandledrejection", (e) => __errors.push(String(e.reason)));
    </script>
    <link rel="stylesheet" href="/dist/core/tokens.css" />
    <script type="module" src="/dist/web-components/cdn/minerva.js"></script>
    <script type="module" src="/dist/web-components/cdn/chart.js"></script>
    <script type="module" src="/dist/web-components/cdn/quadrant-task-board.js"></script>
    <script type="module" src="/dist/web-components/cdn/icon.js"></script>
  </head>
  <body>
    <minerva-config theme="light" locale="en" root>
      <minerva-button id="button">Create account</minerva-button>
      <minerva-icon id="icon" name="search" label="Search"></minerva-icon>
      <minerva-chart id="mixed" height="300"></minerva-chart>
      <minerva-quadrant-task-board id="board"></minerva-quadrant-task-board>
    </minerva-config>
    <script type="module">
      document.querySelector("#mixed").options = {
        series: [
          { name: "Revenue", type: "bar", data: [42, 51, 48, 63, 72, 80] },
          { name: "Target", type: "line", curve: "smooth", data: [45, 50, 55, 60, 65, 70] },
        ],
        xAxis: { type: "category", categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      };
    </script>
  </body>
</html>`;

/** Serves `/` (the page) and `/dist/*` (the built package) on a free port */
async function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path === "/") {
      res.writeHead(200, { "content-type": TYPES[".html"] });
      res.end(PAGE);
      return;
    }
    const file = normalize(join(DIST_DIR, path.replace(/^\/dist\//, "")));
    if (
      !path.startsWith("/dist/") ||
      !file.startsWith(DIST_DIR.replace(/[\\/]$/, "") + sep)
    ) {
      res.writeHead(404).end();
      return;
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, {
        "content-type": TYPES[extname(file)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return server;
}

export async function checkCdnFiles({ call, evaluate, wait, results }) {
  const server = await serve();
  try {
    const { port } = server.address();
    await call("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await call("Page.navigate", { url: `http://127.0.0.1:${port}/` });
    await wait(
      `["minerva-button","minerva-chart","minerva-quadrant-task-board","minerva-icon"].every(t=>customElements.get(t))`,
    );
    // the chart engine reports its backend once it drew
    await wait(`document.querySelector("#mixed").getRenderer?.()`);
    await evaluate(
      `new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))`,
    );
    const data = await evaluate(`(()=>{
      const size=e=>{const r=e.getBoundingClientRect();return {width:Math.round(r.width),height:Math.round(r.height)};};
      const chart=document.querySelector("#mixed");
      const canvases=[...chart.shadowRoot.querySelectorAll("canvas")].map(size);
      const icon=document.querySelector("#icon");
      return {
        errors: window.__errors,
        renderer: chart.getRenderer(),
        chart: size(chart),
        canvases,
        button: size(document.querySelector("#button")),
        board: size(document.querySelector("#board")),
        iconSvg: Boolean(icon.shadowRoot?.querySelector("svg")),
      };
    })()`);
    assert.deepEqual(data.errors, [], JSON.stringify(data));
    assert.ok(
      data.chart.width > 0 && data.chart.height === 300,
      JSON.stringify(data),
    );
    assert.ok(
      data.canvases.some((c) => c.width > 0 && c.height > 0),
      JSON.stringify(data),
    );
    assert.ok(
      data.button.width > 0 && data.button.height > 0,
      JSON.stringify(data),
    );
    assert.ok(
      data.board.width > 0 && data.board.height > 0,
      JSON.stringify(data),
    );
    assert.ok(data.iconSvg, JSON.stringify(data));
    results.push({ check: "cdn-files-plain-html", ...data });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
