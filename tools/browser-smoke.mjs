#!/usr/bin/env node
// Fast browser smoke check of the docs: drives the installed Chrome through
// the DevTools protocol (no Playwright runner, no docs build) and checks that
// every requested page mounts its charts without console errors. Meant for
// the edit loop; the Playwright suite stays the thorough E2E check.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const PORT = Number(value("--port", 5391));
const ORIGIN = `http://127.0.0.1:${PORT}/minerva-design/`;
const CONCURRENCY = Number(value("--concurrency", 3));
const TIMEOUT = Number(value("--timeout", 30000));
const SHOTS = value("--shots", "");
// use a docs dev server already listening on --port instead of starting one
const REUSE = flag("--reuse");

const ROUTES = value("--routes", "")
  ? value("--routes")
      .split(",")
      .map((route) => route.trim())
      .filter(Boolean)
  : [
      "line-chart",
      "area-chart",
      "bar-chart",
      "scatter-chart",
      "bubble-chart",
      "pie-chart",
      "radial-bar-chart",
      "heatmap-chart",
      "candlestick-chart",
      "trading-chart",
      "order-book",
      "order-book-heatmap",
      "depth-chart",
      "time-and-sales",
      "graph-chart",
      "dependency-graph",
      "tree-chart",
      "chord-chart",
      "sankey-chart",
      "gantt-chart",
      "scatter-3d-chart",
      "surface-3d-chart",
      "bar-3d-chart",
      "icon",
      "icon-canvas",
      "icons-core",
    ];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chromePath = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!chromePath) {
  console.error(
    "No Chrome found: set CHROME_PATH to a Chrome or Chromium binary",
  );
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Kills a detached child with its process group (npx spawns vite) */
const killTree = (child) => {
  if (!child || child.exitCode !== null) return;
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    child.kill("SIGKILL");
  }
};

/** A minimal CDP session over one browser target */
const connect = async (url) => {
  const socket = new WebSocket(url);
  const pending = new Map();
  const listeners = [];
  let next = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    for (const listener of listeners) listener(message);
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = next++;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
  return {
    send,
    on: (listener) => listeners.push(listener),
    close: () => socket.close(),
  };
};

const startServer = async () => {
  const child = spawn(
    "npx",
    ["vite", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
    {
      cwd: new URL("../apps/docs", import.meta.url).pathname,
      env: {
        ...process.env,
        DOCS_SOURCE_CHARTS: "1",
        DOCS_SOURCE_FRAMEWORKS: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
    },
  );
  child.stdout.on("data", () => {});
  child.stderr.on("data", () => {});
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return child;
    } catch {
      // not ready
    }
    await sleep(150);
  }
  killTree(child);
  throw new Error("The docs dev server did not start");
};

/** Runs one page: mounts, collects console errors and the renderers */
const checkPage = async (cdp, route) => {
  const { targetId } = await cdp.send("Target.createTarget", {
    url: "about:blank",
  });
  const { sessionId } = await cdp.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  const call = (method, params) => cdp.send(method, params, sessionId);
  const errors = [];
  // dev-only noise: the HMR socket of the vite preview
  const noise = /\[vite\] failed to connect to websocket|\[vite\] connecting/;
  cdp.on((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Runtime.exceptionThrown") {
      const text =
        message.params.exceptionDetails?.exception?.description ??
        message.params.exceptionDetails?.text ??
        "uncaught exception";
      if (!noise.test(text)) errors.push(text);
    }
    if (
      message.method === "Runtime.consoleAPICalled" &&
      message.params.type === "error"
    ) {
      const text = message.params.args
        .map((arg) => arg.value ?? arg.description ?? "")
        .join(" ");
      if (!noise.test(text)) errors.push(text);
    }
  });
  try {
    await call("Runtime.enable");
    await call("Page.enable");
    await call("Page.navigate", { url: `${ORIGIN}#/${route}` });
    const deadline = Date.now() + TIMEOUT;
    let renderers = [];
    let canvases = 0;
    while (Date.now() < deadline) {
      const { result } = await call("Runtime.evaluate", {
        expression: `({
          kinds: [...document.querySelectorAll("[data-renderer]")].map((el) => el.dataset.renderer),
          canvases: document.querySelectorAll("canvas").length,
        })`,
        returnByValue: true,
      });
      const value = result.value ?? {};
      renderers = Array.isArray(value.kinds) ? value.kinds : [];
      canvases = value.canvases ?? 0;
      if (renderers.length || canvases > 0) break;
      await sleep(150);
    }
    if (!renderers.length && canvases === 0) {
      const { result } = await call("Runtime.evaluate", {
        expression: `document.querySelector("h1")?.textContent ?? ""`,
        returnByValue: true,
      });
      const heading = String(result.value ?? "");
      return {
        route,
        ok: false,
        errors,
        note: /not found|404/i.test(heading)
          ? `page not found (${heading})`
          : "no chart mounted a renderer",
      };
    }
    // let the demos paint one frame before the screenshot
    if (SHOTS) {
      await sleep(1500);
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(join(SHOTS, `${route}.png`), Buffer.from(data, "base64"));
    }
    return {
      route,
      ok: errors.length === 0,
      errors,
      kinds: renderers.length
        ? [...new Set(renderers)].join(",")
        : `${canvases} canvas`,
    };
  } catch (error) {
    return { route, ok: false, errors: [String(error)] };
  } finally {
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
};

const main = async () => {
  if (SHOTS) await mkdir(SHOTS, { recursive: true });
  const profile = await mkdtemp(join(tmpdir(), "minerva-smoke-"));
  const server = REUSE ? null : await startServer();
  const browser = spawn(
    chromePath,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      "--remote-debugging-address=127.0.0.1",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--disable-extensions",
      "--hide-scrollbars",
      "--window-size=1280,900",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const cleanup = async () => {
    browser.kill("SIGKILL");
    killTree(server);
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };
  process.once("SIGINT", () => cleanup().then(() => process.exit(130)));
  try {
    await run(browser);
  } finally {
    await cleanup();
  }
};

const run = async (browser) => {
  // Chrome writes the WebSocket endpoint on stderr ("DevTools listening on ws://…")
  const endpoint = await new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(
      () => reject(new Error("Chrome did not report its DevTools endpoint")),
      20_000,
    );
    browser.stderr.on("data", (chunk) => {
      buffer += chunk.toString();
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    browser.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited with code ${code}`));
    });
  });
  const cdp = await connect(endpoint);
  // warm the dev server (module graph, dep optimizer) before the workers
  await checkPage(cdp, "charts").catch(() => {});
  const started = Date.now();
  const results = [];
  let next = 0;
  const worker = async () => {
    while (next < ROUTES.length) {
      const route = ROUTES[next++];
      results.push(await checkPage(cdp, route));
    }
  };
  await Promise.all(
    Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker()),
  );
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  const failed = results.filter((result) => !result.ok);
  for (const result of results.sort((a, b) => a.route.localeCompare(b.route)))
    console.log(
      `${result.ok ? "ok  " : "FAIL"} ${result.route.padEnd(24)} ${
        result.note ?? result.kinds ?? ""
      }`,
    );
  console.log(
    `\n${results.length - failed.length}/${results.length} pages in ${elapsed}s`,
  );
  cdp.close();
  if (failed.length) {
    for (const result of failed)
      console.error(`\n${result.route}:\n  ${result.errors.join("\n  ")}`);
    process.exitCode = 1;
  }
};

await main();
