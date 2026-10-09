import { useMemo, useSyncExternalStore } from "react";
import { previewDocument } from "minerva-design/utils";
import type { HtmlPreviewDocumentProps } from "minerva-design/native";
const subscribe = () => () => {};
const serverDocument = () => previewDocument();
/** Sanitization strips navigation before a separate, fully sandboxed browsing context renders it. */
export function HtmlDocument({
  title,
  source,
  style,
}: HtmlPreviewDocumentProps) {
  const sanitized = useMemo(() => previewDocument(source.html), [source.html]);
  const document = useSyncExternalStore(
    subscribe,
    () => sanitized,
    serverDocument,
  );
  return (
    <iframe
      key={document}
      title={title}
      srcDoc={document}
      sandbox=""
      referrerPolicy="no-referrer"
      style={{ ...style, border: 0 }}
    />
  );
}
