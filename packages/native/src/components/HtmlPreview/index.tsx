import type { ComponentType } from "react";
import { View, type ViewProps } from "react-native";
/** Required capabilities passed to a WebView host; see the Expo example's platform adapters. */
export interface HtmlPreviewDocumentProps {
  source: { html: string };
  title: string;
  javaScriptEnabled: false;
  domStorageEnabled: false;
  allowFileAccess: false;
  allowUniversalAccessFromFileURLs: false;
  allowFileAccessFromFileURLs: false;
  javaScriptCanOpenWindowsAutomatically: false;
  setSupportMultipleWindows: false;
  originWhitelist: string[];
  mixedContentMode: "never";
  onShouldStartLoadWithRequest: (request: { url: string }) => boolean;
  style: { width: "100%" | number; height: number };
}
export interface HtmlPreviewProps extends ViewProps {
  html: string;
  title: string;
  /** @default "desktop" */
  viewport?: "desktop" | "mobile";
  /** @default 375 */
  mobileWidth?: number;
  /** @default 600 */
  height?: number;
  /** Platform host (react-native-webview on iOS/Android, sandboxed iframe on web). */ renderDocument: ComponentType<HtmlPreviewDocumentProps>;
}
/** An isolated, non-scriptable HTML document. No requests or external navigation are permitted. */
export function HtmlPreview({
  html,
  title,
  viewport = "desktop",
  mobileWidth = 375,
  height = 600,
  renderDocument: Document,
  style,
  ...props
}: HtmlPreviewProps) {
  const frameHeight = Number.isFinite(height) && height > 0 ? height : 600;
  const width =
    Number.isFinite(mobileWidth) && mobileWidth > 0 ? mobileWidth : 375;
  const policy =
    "default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
  const document = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${html}</body></html>`;
  return (
    <View
      {...props}
      accessibilityLabel={title}
      style={[
        { height: frameHeight, maxWidth: "100%", overflow: "hidden" },
        style,
      ]}
    >
      <Document
        source={{ html: document }}
        title={title}
        javaScriptEnabled={false}
        domStorageEnabled={false}
        allowFileAccess={false}
        allowUniversalAccessFromFileURLs={false}
        allowFileAccessFromFileURLs={false}
        javaScriptCanOpenWindowsAutomatically={false}
        setSupportMultipleWindows={false}
        originWhitelist={["*"]}
        mixedContentMode="never"
        onShouldStartLoadWithRequest={(request) =>
          request.url === "about:blank"
        }
        style={{
          height: frameHeight,
          width: viewport === "mobile" ? width : "100%",
        }}
      />
    </View>
  );
}
