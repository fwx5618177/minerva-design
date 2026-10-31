import { useEffect, useImperativeHandle, useRef } from "react";
import { createIconCanvas } from "../engine/icon-canvas";
import type { IconCanvasController } from "../engine/types";
import type { IconCanvasProps } from "./types";

const cssSize = (size: number | string) =>
  typeof size === "number" ? `${size}px` : size;

/**
 * Many icons on one canvas: one instanced GPU draw per run of identical
 * icons (WebGPU, WebGL2, WebGL) or Canvas2D. For dense pictures, maps,
 * particles, animations of thousands of icons; for icons in the UI, use
 * `Icon`. With `renderer` unset or "auto", it follows the global default
 * (`setDefaultIconRenderer`) live.
 */
export function IconCanvas(props: IconCanvasProps) {
  const {
    items,
    renderer,
    width = "100%",
    height = 240,
    pixelRatio,
    title,
    onRendererChange,
    ref,
    style,
    className,
    ...rest
  } = props;
  const container = useRef<HTMLDivElement>(null);
  const controller = useRef<IconCanvasController | null>(null);
  const callback = useRef(onRendererChange);
  // read by the mount effect; later changes go through setItems / setOptions
  const latest = useRef({ items, renderer, pixelRatio });

  useEffect(() => {
    callback.current = onRendererChange;
  }, [onRendererChange]);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    const instance = createIconCanvas(host, {
      ...latest.current,
      onRendererChange: (kind) => callback.current?.(kind),
    });
    controller.current = instance;
    return () => {
      instance.destroy();
      controller.current = null;
    };
  }, []);

  useEffect(() => {
    latest.current = { ...latest.current, renderer, pixelRatio };
    controller.current?.setOptions({ renderer, pixelRatio });
  }, [renderer, pixelRatio]);

  useEffect(() => {
    latest.current = { ...latest.current, items };
    controller.current?.setItems(items);
  }, [items]);

  useImperativeHandle(
    ref,
    () => ({
      getRenderer: () => controller.current?.renderer ?? null,
      getCanvas: () => controller.current?.canvas ?? null,
      ready: () =>
        controller.current?.ready() ??
        Promise.reject(new Error("IconCanvas is not mounted")),
    }),
    [],
  );

  const classes = className
    ? `minerva-icon-canvas ${className}`
    : "minerva-icon-canvas";
  const labelled = !!title || !!rest["aria-label"] || !!rest["aria-labelledby"];
  return (
    <div
      {...rest}
      ref={container}
      className={classes}
      {...(labelled
        ? { role: rest.role ?? "img", ...(title && { "aria-label": title }) }
        : { "aria-hidden": rest["aria-hidden"] ?? true })}
      style={{
        position: "relative",
        width: cssSize(width),
        height: cssSize(height),
        ...style,
      }}
    />
  );
}
