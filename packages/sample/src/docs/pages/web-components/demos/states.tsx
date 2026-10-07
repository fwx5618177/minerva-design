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
      {/* React 19 sets booleans as properties: loading={false} turns it off */}
      <minerva-button loading={loading} onClick={save}>
        {loading ? "Saving" : "Save"}
      </minerva-button>
      <minerva-button disabled>Disabled</minerva-button>
      <minerva-button active variant="secondary">
        Active
      </minerva-button>
    </>
  );
}
