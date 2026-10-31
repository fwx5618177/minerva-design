import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import {
  cloudIcon,
  flattenIconPath,
  heartIcon,
  settingsIcon,
  tessellateIcon,
  type IconDefinition,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const ICONS: Record<string, IconDefinition> = {
  settings: settingsIcon,
  heart: heartIcon,
  cloud: cloudIcon,
};
const TOLERANCES = ["0.5", "0.1", "0.02"];
const SCALE = 12;
const SIDE = 24 * SCALE;

// what the GPU backends draw: the stroke as triangles (quads per segment,
// round joins and caps as fans), from curves flattened within a tolerance
export default function GeometryDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const ref = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("settings");
  const [tolerance, setTolerance] = useState("0.1");
  const icon = ICONS[name]!;

  const mesh = useMemo(
    () => tessellateIcon(icon, { tolerance: Number(tolerance) }),
    [icon, tolerance],
  );
  const lines = useMemo(
    () => icon.paths.flatMap((d) => flattenIconPath(d, Number(tolerance))),
    [icon, tolerance],
  );

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIDE * dpr;
    canvas.height = SIDE * dpr;
    ctx.setTransform(dpr * SCALE, 0, 0, dpr * SCALE, 0, 0);
    ctx.clearRect(0, 0, 24, 24);
    const style = getComputedStyle(canvas);
    ctx.lineWidth = 1 / SCALE;
    ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
    ctx.strokeStyle = "rgba(99, 102, 241, 0.75)";
    for (let i = 0; i < mesh.length; i += 6) {
      ctx.beginPath();
      ctx.moveTo(mesh[i]!, mesh[i + 1]!);
      ctx.lineTo(mesh[i + 2]!, mesh[i + 3]!);
      ctx.lineTo(mesh[i + 4]!, mesh[i + 5]!);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = style.color;
    for (const line of lines) {
      for (let i = 0; i < line.points.length; i += 2) {
        ctx.beginPath();
        ctx.arc(line.points[i]!, line.points[i + 1]!, 1.6 / SCALE, 0, 7);
        ctx.fill();
      }
    }
  }, [mesh, lines]);

  const points = lines.reduce((sum, line) => sum + line.points.length / 2, 0);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("icon")}
          value={name}
          onChange={setName}
        >
          {Object.keys(ICONS).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </Select>
        <RadioGroup
          aria-label={t("tolerance")}
          direction="horizontal"
          size="small"
          value={tolerance}
          onChange={(value) => setTolerance(String(value))}
        >
          {TOLERANCES.map((value) => (
            <Radio key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <canvas
          ref={ref}
          className={styles.canvasFrame}
          style={{ width: SIDE, height: SIDE, maxWidth: "100%" }}
          role="img"
          aria-label={t("geometryAria", { name })}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.kind}>
          {t("geometryStats", { triangles: mesh.length / 6, points })}
        </p>
      </div>
    </div>
  );
}
