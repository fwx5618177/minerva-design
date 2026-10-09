import { useState } from "react";
import { Button, HtmlPreview } from "minerva-design/native";
import { HtmlDocument } from "../adapters/HtmlDocument";
import { Paragraph, Screen } from "../ui";

export function DocumentPreviewScreen() {
  const [updated, setUpdated] = useState(false);
  return (
    <Screen title="Document preview">
      <Paragraph>
        Local HTML rendered by WebView on iOS/Android and a sandboxed iframe on
        web. Scripts, network requests and external navigation are disabled.
      </Paragraph>
      <Button onPress={() => setUpdated((value) => !value)}>
        Update document
      </Button>
      <HtmlPreview
        title="Local document"
        height={300}
        renderDocument={HtmlDocument}
        html={`<main style="font:18px system-ui;padding:16px;color:#17202a;background:#fff"><h1>${updated ? "Updated document" : "Preview loaded"}</h1><p>This content is rendered by the platform document host.</p><a href="https://example.com/">Blocked external navigation</a></main>`}
      />
    </Screen>
  );
}
