import { useMemo, useSyncExternalStore } from "react";
import { previewDocument } from "minerva-design/utils";
import {
  HtmlPreview,
  type HtmlPreviewDocumentProps,
} from "minerva-design/native";
export default function Basic() {
  return (
    <HtmlPreview
      title="Document preview"
      height={200}
      html="<h1>Preview</h1><p>Isolated HTML document.</p>"
      renderDocument={BrowserDocument}
    />
  );
}
const subscribe = () => () => {};
const serverDocument = () => previewDocument();
// Browser documentation host. For iOS/Android use the react-native-webview adapter in apps/expo-example.
function BrowserDocument({ source, title, style }: HtmlPreviewDocumentProps) {
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
