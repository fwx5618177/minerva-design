// Runs a force simulation on the main thread (time-sliced: a few ms per
// animation frame) or in a Web Worker created from a Blob URL. Without
// worker support (CSP, old browsers, mini-programs) the worker version
// falls back to the main thread.

import { forceKernel, type ForceKernelInit } from "./force";

/** `worker: "auto"` uses a worker from this number of nodes */
export const WORKER_THRESHOLD = 2000;

/** Script of the simulation worker (the kernel is serialized into it) */
export const forceWorkerSource = (): string => `"use strict";
const createSim = (${forceKernel.toString()})();
let sim = null;
let timer = 0;
let stream = true;
const send = (type) => {
  const x = new Float64Array(sim.x);
  const y = new Float64Array(sim.y);
  self.postMessage({ type, x, y, alpha: sim.alpha() }, [x.buffer, y.buffer]);
};
const loop = () => {
  timer = 0;
  if (!sim) return;
  const start = performance.now();
  let hot = true;
  while (hot && performance.now() - start < 16) hot = sim.tick(1);
  if (hot) {
    if (stream) send("tick");
    timer = setTimeout(loop, 0);
  } else {
    sim.settle();
    send("end");
  }
};
const run = () => {
  if (!timer) timer = setTimeout(loop, 0);
};
self.onmessage = (event) => {
  const m = event.data;
  if (m.type === "init") {
    sim = createSim(m.init);
    stream = m.stream !== false;
    run();
  } else if (m.type === "stop") {
    if (timer) clearTimeout(timer);
    timer = 0;
    sim = null;
  } else if (sim) {
    if (m.type === "drag") sim.drag(m.index, m.x, m.y);
    else if (m.type === "release") sim.release(m.index, m.keep);
    else if (m.type === "reheat") sim.reheat(m.alpha);
    run();
  }
};
`;

/** A simulation running somewhere; positions are read from `x` / `y` */
export interface ForceRunner {
  readonly x: Float64Array;
  readonly y: Float64Array;
  /** Whether the simulation runs in a worker */
  threaded(): boolean;
  /** Main thread: ticks for about `budgetMs` (no-op in a worker) */
  step(budgetMs: number): void;
  /** Whether the simulation is still hot */
  running(): boolean;
  drag(index: number, x: number, y: number): void;
  release(index: number, keep: boolean): void;
  reheat(alpha: number): void;
  destroy(): void;
}

export interface ForceRunnerOptions {
  /** Tries a worker first */
  worker: boolean;
  /** Reports intermediate positions (else only the final ones) */
  stream: boolean;
  /** New positions are available */
  onTick: () => void;
  /** The simulation cooled down */
  onEnd: () => void;
  now: () => number;
}

const canUseWorkers = () =>
  typeof Worker === "function" &&
  typeof Blob === "function" &&
  typeof URL !== "undefined" &&
  typeof URL.createObjectURL === "function";

/**
 * Starts a simulation. Its positions are written into `init.x` / `init.y`
 * (the same arrays as the runner's `x` / `y`).
 */
export const createForceRunner = (
  init: ForceKernelInit,
  options: ForceRunnerOptions,
): ForceRunner => {
  const x = init.x;
  const y = init.y;
  let hot = true;
  let destroyed = false;
  let worker: Worker | null = null;
  let url = "";
  let sim: ReturnType<ReturnType<typeof forceKernel>> | null = null;
  let lastAlpha = init.alpha > 0 ? init.alpha : 1;

  const revoke = () => {
    if (url) URL.revokeObjectURL(url);
    url = "";
  };

  const startLocal = () => {
    sim = forceKernel()({ ...init, x, y, alpha: lastAlpha });
  };

  const fallback = () => {
    revoke();
    worker?.terminate();
    worker = null;
    if (destroyed || !hot) return;
    startLocal();
    options.onTick();
  };

  if (options.worker && canUseWorkers()) {
    try {
      url = URL.createObjectURL(
        new Blob([forceWorkerSource()], { type: "text/javascript" }),
      );
      worker = new Worker(url);
      worker.onmessage = (event: MessageEvent) => {
        revoke();
        const m = event.data as {
          type: "tick" | "end";
          x: Float64Array;
          y: Float64Array;
          alpha: number;
        };
        if (destroyed || !hot) return;
        if (m.x.length === x.length) {
          x.set(m.x);
          y.set(m.y);
        }
        lastAlpha = m.alpha;
        if (m.type === "end") {
          hot = false;
          options.onTick();
          options.onEnd();
        } else {
          options.onTick();
        }
      };
      worker.onerror = (event) => {
        event.preventDefault?.();
        fallback();
      };
      worker.postMessage({ type: "init", init, stream: options.stream });
    } catch {
      worker = null;
      revoke();
    }
  }
  if (!worker) startLocal();

  const post = (message: object) => {
    try {
      worker?.postMessage(message);
    } catch {
      fallback();
    }
  };

  return {
    x,
    y,
    threaded: () => !!worker,
    step(budgetMs) {
      if (!sim || !hot || destroyed) return;
      const start = options.now();
      let warm = sim.tick(1);
      while (warm && options.now() - start < budgetMs) warm = sim.tick(1);
      lastAlpha = sim.alpha();
      if (!warm) {
        hot = false;
        sim.settle();
        options.onEnd();
      }
    },
    running: () => hot && !destroyed,
    drag(index, px, py) {
      x[index] = px;
      y[index] = py;
      hot = true;
      if (worker) post({ type: "drag", index, x: px, y: py });
      else sim?.drag(index, px, py);
    },
    release(index, keep) {
      if (worker) post({ type: "release", index, keep });
      else sim?.release(index, keep);
    },
    reheat(alpha) {
      hot = true;
      if (worker) post({ type: "reheat", alpha });
      else sim?.reheat(alpha);
    },
    destroy() {
      destroyed = true;
      if (worker) {
        try {
          worker.postMessage({ type: "stop" });
        } catch {
          // already gone
        }
        worker.terminate();
      }
      worker = null;
      revoke();
      sim = null;
    },
  };
};
