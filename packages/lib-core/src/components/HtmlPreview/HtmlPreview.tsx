import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { previewDocument } from "./previewDocument";
import type { HtmlPreviewProps } from "./types";
import styles from "./htmlPreview.module.scss";

/**
 * HtmlPreview: previews untrusted HTML (e.g. an email template) in a fully
 * sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and
 * rendered behind a Content-Security-Policy that blocks scripts and network
 * access; only inline styles and data: images are allowed.
 */
export const HtmlPreview = ({
  html,
  title,
  viewport = "desktop",
  mobileWidth = 375,
  height = 600,
  className,
  style,
  ref,
  ...rest
}: HtmlPreviewProps) => {
  const [doc, setDoc] = useState(() => previewDocument());
  // Deliberately two-phase: the server and the first client render both use
  // the empty shell (DOMPurify only runs in the browser and hydration must
  // match); after commit the HTML is sanitized and the iframe replaced.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDoc(previewDocument(html)), [html]);
  const width =
    Number.isFinite(mobileWidth) && mobileWidth > 0 ? mobileWidth : 375;
  const frameHeight = Number.isFinite(height) && height > 0 ? height : 600;

  return (
    <div
      {...pickDataAttributes(rest)}
      ref={ref}
      className={cn(styles.preview, className)}
      style={style}
    >
      {/* A new key replaces the browsing context, so an initial empty srcdoc
          can never finish loading after the real document. */}
      <iframe
        key={doc}
        title={title}
        sandbox=""
        referrerPolicy="no-referrer"
        srcDoc={doc}
        className={styles.frame}
        style={{
          width: viewport === "mobile" ? width : "100%",
          height: frameHeight,
        }}
      />
    </div>
  );
};
