import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createIconCanvas,
  icons,
  type IconCanvasController,
  type IconRendererKind,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

// the framework-free controller under IconCanvas: any element, any framework
export default function ControllerDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<IconCanvasController | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!host.current) return;
    const instance = createIconCanvas(host.current, {
      height: 120,
      onRendererChange: setDrawn,
    });
    controller.current = instance;
    return () => instance.destroy();
  }, []);

  // new items: drawn on the next animation frame
  useEffect(() => {
    controller.current?.setItems(
      icons.slice(offset, offset + 30).map((icon, i) => ({
        icon,
        x: 12 + (i % 15) * 36,
        y: 16 + Math.floor(i / 15) * 48,
        size: 28,
        color: "currentColor",
      })),
    );
  }, [offset]);

  return (
    <div className={styles.stage}>
      <div
        ref={host}
        style={{ height: 120 }}
        role="img"
        aria-label={t("controllerAria")}
      />
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setOffset((value) => (value + 30) % icons.length)}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
