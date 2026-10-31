import { useMemo } from "react";
import {
  checkCircleIcon,
  toSvg,
  toSvgDataUri,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

export default function SvgStringDemo() {
  const svg = useMemo(
    () => toSvg(checkCircleIcon, { size: 32, title: "Done", strokeWidth: 1.5 }),
    [],
  );
  // an <img>, a CSS background or a favicon: no currentColor there
  const uri = useMemo(
    () => toSvgDataUri(checkCircleIcon, { size: 48, color: "#16a34a" }),
    [],
  );
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div className={styles.row}>
        <img src={uri} width={48} height={48} alt="Done" />
        <code>toSvgDataUri(checkCircleIcon, …)</code>
      </div>
      <pre className={styles.code}>{svg}</pre>
    </div>
  );
}
