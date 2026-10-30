import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
