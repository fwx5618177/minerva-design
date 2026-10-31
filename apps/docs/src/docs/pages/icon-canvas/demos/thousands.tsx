import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const COUNTS = [1000, 5000, 20000];
const HEIGHT = 360;
const PICKED = icons.filter((_, i) => i % 8 === 0);
// a few dozen distinct colors: resolved once each, not once per icon
const HUES = Array.from({ length: 36 }, (_, i) => `hsl(${i * 10} 70% 55%)`);

/** Icons grouped by kind so each kind is one instanced draw */
const layout = (count: number, width: number, time: number) => {
  const cell = Math.max(6, Math.sqrt((width * HEIGHT) / count));
  const columns = Math.max(1, Math.floor(width / cell));
  const size = cell * 0.8;
  const items: IconCanvasItem[] = [];
  const perKind = Math.ceil(count / PICKED.length);
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(i / perKind);
    const slot = (i % perKind) * PICKED.length + kind;
    const column = slot % columns;
    const row = Math.floor(slot / columns);
    const wave = Math.sin(time * 2 + column * 0.25 + row * 0.35);
    items.push({
      icon: PICKED[kind]!,
      x: column * cell + (cell - size) / 2,
      y: row * cell + (cell - size) / 2,
      size: size * (0.85 + 0.15 * wave),
      rotation: wave * 25,
      color: HUES[(column + row) % HUES.length],
      opacity: 0.55 + 0.45 * wave * wave,
    });
  }
  return items;
};

export default function ThousandsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5000);
  const [running, setRunning] = useState(true);
  const [width, setWidth] = useState(640);
  const [time, setTime] = useState(0);
  const [fps, setFps] = useState<number | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(() =>
      setWidth(element.clientWidth || 640),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let frames = 0;
    let since = performance.now();
    const tick = (now: number) => {
      setTime(now / 1000);
      frames++;
      if (now - since >= 500) {
        setFps(Math.round((frames * 1000) / (now - since)));
        frames = 0;
        since = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const items = useMemo(() => layout(count, width, time), [count, width, time]);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("count")}
          direction="horizontal"
          size="small"
          value={String(count)}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS.map((value) => (
            <Radio
              key={value}
              value={String(value)}
              label={value.toLocaleString()}
            />
          ))}
        </RadioGroup>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("play")}
        </Button>
      </div>
      <div ref={host}>
        <IconCanvas
          items={items}
          height={HEIGHT}
          onRendererChange={setDrawn}
          title={t("aria", { n: count.toLocaleString() })}
        />
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <p className={styles.kind}>
          {running && fps !== null ? t("fps", { fps }) : t("paused")}
        </p>
      </div>
    </div>
  );
}
