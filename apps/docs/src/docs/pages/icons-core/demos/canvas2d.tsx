import { useEffect, useRef } from "react";
import {
  drawIcon,
  heartIcon,
  starIcon,
  sunIcon,
  zapIcon,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const WIDTH = 320;
const HEIGHT = 96;

// a plain 2D context (a game, a map, a mini-program canvas): native strokes,
// identical to the SVG
export default function Canvas2dDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    const icons = [sunIcon, starIcon, heartIcon, zapIcon];
    const colors = ["#f59e0b", "#eab308", "#ef4444", "#6366f1"];
    icons.forEach((icon, i) => {
      drawIcon(ctx, icon, {
        x: 16 + i * 76,
        y: 16,
        size: 64,
        color: colors[i],
        rotation: i * 12,
        strokeWidth: 1.5,
      });
    });
  }, []);
  return (
    <canvas
      ref={ref}
      className={styles.canvasFrame}
      style={{ width: WIDTH, height: HEIGHT }}
      role="img"
      aria-label="Sun, star, heart and lightning icons drawn with drawIcon"
    />
  );
}
