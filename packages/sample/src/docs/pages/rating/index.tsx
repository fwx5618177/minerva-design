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

const RatingDoc: React.FC = () => <DocPage id="rating" demos={demos} />;

export default RatingDoc;
