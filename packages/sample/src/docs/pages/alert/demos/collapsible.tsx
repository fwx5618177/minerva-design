import { useState } from "react";
import { Alert } from "@minerva/lib-core";

export default function CollapsibleDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Alert
      variant="info"
      title={`Release notes (${expanded ? "expanded" : "collapsed"})`}
      collapsible
      defaultExpanded={false}
      onExpand={setExpanded}
    >
      Added dark mode, improved keyboard navigation and fixed several layout
      issues on small screens.
    </Alert>
  );
}
