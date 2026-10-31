import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CanvasHTMLAttributes,
  type Ref,
} from "react";
import type { IconRendererPreference, IconSurface } from "../engine/types";

type SurfaceFactory = typeof import("../engine/surface").createIconSurface;
import type { IconProps } from "./types";

const cssSize = (size: number | string) =>
  typeof size === "number" ? `${size}px` : size;

/** A canvas icon: drawn by the backend shared by every canvas icon of the page */
function CanvasIcon({
  icon,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  renderer,
  onRendererChange,
  canvasRef,
  style,
  attributes,
}: {
  icon: IconProps["icon"];
  size: number | string;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
  renderer: IconRendererPreference;
  onRendererChange: IconProps["onRendererChange"];
  canvasRef: Ref<HTMLCanvasElement> | undefined;
  style: IconProps["style"];
  attributes: CanvasHTMLAttributes<HTMLCanvasElement>;
}) {
  const element = useRef<HTMLCanvasElement | null>(null);
  const surface = useRef<IconSurface | null>(null);
  const callback = useRef(onRendererChange);
  // CSS sizes ("1em", "100%") are measured
  const [measured, setMeasured] = useState<number | null>(null);
  const pixels = typeof size === "number" ? size : measured;
  // the canvas renderers load with the first canvas icon: SVG icons never
  // download them
  const [factory, setFactory] = useState<{ create: SurfaceFactory } | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    void import("../engine/surface").then(({ createIconSurface }) => {
      if (!cancelled) setFactory({ create: createIconSurface });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useImperativeHandle(
    canvasRef,
    () => element.current as HTMLCanvasElement,
    [],
  );

  useEffect(() => {
    callback.current = onRendererChange;
  }, [onRendererChange]);

  useEffect(() => {
    const canvas = element.current;
    if (typeof size === "number" || !canvas) return;
    const measure = () => setMeasured(canvas.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver !== "function") return;
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [size]);

  useEffect(() => {
    if (!factory || !pixels || pixels <= 0 || !element.current) return;
    const options = {
      icon,
      size: pixels,
      color,
      strokeWidth: absoluteStrokeWidth
        ? (strokeWidth * 24) / pixels
        : strokeWidth,
      renderer,
      onRendererChange: (
        kind: Parameters<NonNullable<IconProps["onRendererChange"]>>[0],
      ) => callback.current?.(kind),
    };
    if (surface.current) surface.current.update(options);
    else surface.current = factory.create(element.current, options);
  }, [
    factory,
    icon,
    pixels,
    color,
    strokeWidth,
    absoluteStrokeWidth,
    renderer,
  ]);

  useEffect(
    () => () => {
      surface.current?.destroy();
      surface.current = null;
    },
    [],
  );

  return (
    <canvas
      {...attributes}
      ref={element}
      data-icon={icon.name}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        width: cssSize(size),
        height: cssSize(size),
        ...style,
      }}
    />
  );
}

/**
 * An icon of minerva-design/icons: inline SVG by default (crisp, styled by
 * CSS, server-rendered), or a canvas drawn with WebGPU, WebGL2, WebGL or
 * Canvas2D (`renderer`). The color follows the text color unless set.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    title,
    renderer = "svg",
    onRendererChange,
    ref,
    style,
    className,
    ...rest
  } = props;
  const labelled = !!title || !!rest["aria-label"] || !!rest["aria-labelledby"];
  const a11y = labelled
    ? { role: rest.role ?? "img" }
    : { "aria-hidden": rest["aria-hidden"] ?? true };
  const classes = className ? `minerva-icon ${className}` : "minerva-icon";

  if (renderer !== "svg") {
    return (
      <CanvasIcon
        icon={icon}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth={absoluteStrokeWidth}
        renderer={renderer}
        onRendererChange={onRendererChange}
        canvasRef={ref as Ref<HTMLCanvasElement> | undefined}
        style={style}
        attributes={{
          ...(rest as CanvasHTMLAttributes<HTMLCanvasElement>),
          ...a11y,
          ...(title && { "aria-label": title }),
          className: classes,
        }}
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-icon={icon.name}
      {...rest}
      {...a11y}
      className={classes}
      style={style}
      ref={ref as Ref<SVGSVGElement> | undefined}
    >
      {title && <title>{title}</title>}
      {icon.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          vectorEffect={absoluteStrokeWidth ? "non-scaling-stroke" : undefined}
        />
      ))}
    </svg>
  );
}
