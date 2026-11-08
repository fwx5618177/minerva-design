import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Minimal CDP transport: rejects outstanding commands on disconnect and bounds every call.
export async function connectCdp(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  const listeners = new Set();
  let next = 1;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  const rejectPending = () => {
    for (const entry of pending.values())
      entry.reject(Error("Chrome CDP disconnected"));
    pending.clear();
  };
  socket.addEventListener("close", rejectPending);
  socket.addEventListener("error", rejectPending);
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (entry) {
      pending.delete(message.id);
      if (message.error) entry.reject(Error(message.error.message));
      else entry.resolve(message.result);
    } else for (const listener of listeners) listener(message);
  });
  return {
    send(method, params = {}, sessionId) {
      return new Promise((resolve, reject) => {
        const id = next++;
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(Error(`CDP timeout: ${method}`));
        }, 20000);
        pending.set(id, {
          resolve: (value) => {
            clearTimeout(timer);
            resolve(value);
          },
          reject: (error) => {
            clearTimeout(timer);
            reject(error);
          },
        });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
    on(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    close() {
      rejectPending();
      socket.close();
    },
  };
}

export async function launchChrome({
  width = 1280,
  height = 900,
  mobile = false,
  hasTouch = false,
} = {}) {
  const executable = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((p) => p && existsSync(p));
  if (!executable)
    throw Error(
      "Chrome/Chromium is required; set CHROME_PATH to its executable.",
    );
  const profile = await mkdtemp(join(tmpdir(), "minerva-cdp-"));
  let browser, cdp;
  const close = async () => {
    cdp?.close();
    if (
      browser?.pid &&
      browser.exitCode === null &&
      browser.signalCode === null
    ) {
      const exited = new Promise((resolve) => browser.once("exit", resolve));
      browser.kill("SIGKILL");
      await exited;
    }
    await rm(profile, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  };
  try {
    browser = spawn(
      executable,
      [
        "--headless=new",
        "--remote-debugging-port=0",
        "--remote-debugging-address=127.0.0.1",
        `--user-data-dir=${profile}`,
        "--no-first-run",
        "--disable-background-networking",
        "--disable-extensions",
        `--window-size=${width},${height}`,
        ...(process.platform === "linux" ? ["--no-sandbox"] : []),
        "about:blank",
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    const endpoint = await new Promise((resolve, reject) => {
      let output = "";
      const timer = setTimeout(
        () => reject(Error("Chrome launch timeout: " + output)),
        20000,
      );
      browser.stderr.on("data", (data) => {
        output += data;
        const match = output.match(/DevTools listening on (ws:\/\/\S+)/);
        if (match) {
          clearTimeout(timer);
          resolve(match[1]);
        }
      });
      browser.once("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      browser.once("exit", (code) => {
        clearTimeout(timer);
        reject(Error(`Chrome exited ${code}: ${output}`));
      });
    });
    cdp = await connectCdp(endpoint);
    const { targetId } = await cdp.send("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const call = (method, params = {}) => cdp.send(method, params, sessionId);
    const errors = [];
    cdp.on((message) => {
      if (
        message.sessionId === sessionId &&
        message.method === "Runtime.exceptionThrown"
      )
        errors.push(
          message.params.exceptionDetails.exception?.description ??
            message.params.exceptionDetails.text,
        );
    });
    await call("Page.enable");
    await call("Runtime.enable");
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    });
    await call("Emulation.setTouchEmulationEnabled", { enabled: hasTouch });
    const evaluate = async (expression) => {
      const result = await call("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      if (result.exceptionDetails)
        throw Error(
          result.exceptionDetails.exception?.description ??
            result.exceptionDetails.text,
        );
      return result.result.value;
    };
    const wait = async (expression, { timeout = 15000 } = {}) => {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        if (await evaluate(`Boolean(${expression})`)) return;
        await sleep(100);
      }
      throw Error(`Browser condition timed out: ${expression}`);
    };
    return {
      call,
      evaluate,
      wait,
      errors,
      close,
      // Resolve geometry in-page, then deliver trusted browser input for activation.
      async click(expression) {
        await wait(`(${expression})?.getBoundingClientRect().width > 0`);
        const point = await evaluate(
          `(()=>{const element=(${expression});element.scrollIntoView({block:'center',inline:'center'});const r=element.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
        );
        if (hasTouch) {
          await call("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: [point],
          });
          await call("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
          });
        } else {
          await call("Input.dispatchMouseEvent", {
            type: "mouseMoved",
            ...point,
          });
          await call("Input.dispatchMouseEvent", {
            type: "mousePressed",
            button: "left",
            clickCount: 1,
            ...point,
          });
          await call("Input.dispatchMouseEvent", {
            type: "mouseReleased",
            button: "left",
            clickCount: 1,
            ...point,
          });
        }
      },
      async navigate(url) {
        errors.length = 0;
        await call("Page.navigate", { url });
        await wait(
          `location.href === ${JSON.stringify(new URL(url).href)} && document.readyState === "complete"`,
        );
      },
      async screenshot(path) {
        const { data } = await call("Page.captureScreenshot", {
          format: "png",
        });
        await writeFile(path, Buffer.from(data, "base64"));
      },
    };
  } catch (error) {
    await close();
    throw error;
  }
}
