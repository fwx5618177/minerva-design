import { useState } from "react";
import "@minerva/lib-web-components";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      {/* React 18 sets attributes as strings, and loading="false" would still
          be "on": pass true, or undefined to remove the attribute */}
      <minerva-button loading={loading || undefined} onClick={save}>
        {loading ? "Saving" : "Save"}
      </minerva-button>
      <minerva-button disabled>Disabled</minerva-button>
      <minerva-button active variant="secondary">
        Active
      </minerva-button>
    </>
  );
}
