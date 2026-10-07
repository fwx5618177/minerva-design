import React from "react";
import DocPage from "@/docs/components/DocPage";
import { collectDemos } from "@/docs/demos";

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const TextFieldDoc: React.FC = () => <DocPage id="textfield" demos={demos} />;

export default TextFieldDoc;
