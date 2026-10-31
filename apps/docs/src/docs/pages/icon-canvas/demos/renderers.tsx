import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
  type IconRendererPreference,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const BACKENDS: IconRendererPreference[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// the same 40 icons on every backend: the geometry is shared, only the
// rasterizer differs (MSAA triangles on the GPU, native strokes on Canvas2D)
const items: IconCanvasItem[] = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));

function Panel({ renderer }: { renderer: IconRendererPreference }) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  return (
    <figure style={{ margin: 0 }}>
      <IconCanvas
        className={styles.canvasFrame}
        items={items}
        renderer={renderer}
        width={256}
        height={160}
        onRendererChange={setDrawn}
        title={t("panelAria", { backend: renderer })}
      />
      <figcaption className={styles.cell} style={{ marginTop: 6 }}>
        <code>renderer=&quot;{renderer}&quot;</code>
        <span className={styles.kind}>
          {drawn === null
            ? t("starting")
            : drawn === renderer
              ? t("drawnBy", { backend: drawn })
              : t("fellBack", { backend: drawn })}
        </span>
      </figcaption>
    </figure>
  );
}

export default function RenderersDemo() {
  return (
    <div className={styles.row}>
      {BACKENDS.map((renderer) => (
        <Panel key={renderer} renderer={renderer} />
      ))}
    </div>
  );
}
