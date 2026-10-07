import { useState } from "react";
// Registers every <minerva-*> element (later imports are no-ops). Typings:
// /// <reference types="@minerva/lib-web-components/react" /> in global.d.ts
import "@minerva/lib-web-components";

type ValueEvent = CustomEvent<{ value: string }>;
type CheckedEvent = CustomEvent<{ checked: boolean }>;

export default function ReactDemo() {
  const [name, setName] = useState("Ada");
  const [plan, setPlan] = useState("pro");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState("");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      {/* React 19 sets value / checked / disabled as properties */}
      <minerva-input
        aria-label="Name"
        value={name}
        clearable
        onminerva-input={(e: ValueEvent) => setName(e.detail.value)}
      />
      <minerva-select
        aria-label="Plan"
        value={plan}
        onminerva-change={(e: ValueEvent) => setPlan(e.detail.value)}
      >
        <minerva-option value="free">Free</minerva-option>
        <minerva-option value="pro">Pro</minerva-option>
        <minerva-option value="team">Team</minerva-option>
      </minerva-select>
      <minerva-switch
        label="Email notifications"
        checked={notify}
        onminerva-change={(e: CheckedEvent) => setNotify(e.detail.checked)}
      />
      <minerva-button
        disabled={!name.trim()}
        onClick={() =>
          setSaved(`${name} · ${plan} · ${notify ? "emails on" : "emails off"}`)
        }
      >
        Save
      </minerva-button>
      <output aria-live="polite">{saved || "Nothing saved yet"}</output>
    </div>
  );
}
