import { WebView } from "react-native-webview";
import type { HtmlPreviewDocumentProps } from "minerva-design/native";
/** The native WebView owns HTML layout; all navigation is checked by HtmlPreview. */
export function HtmlDocument({ title, ...props }: HtmlPreviewDocumentProps) {
  return (
    <WebView
      {...props}
      startInLoadingState
      accessibilityLabel={title}
      allowsInlineMediaPlayback={false}
      mediaPlaybackRequiresUserAction
    />
  );
}
