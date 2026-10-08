import { useState } from "react";
import { Switch } from "minerva-design";

export default function ControlledDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Switch
        label="Email notifications"
        checked={enabled}
        onChange={(checked) => setEnabled(checked)}
      />
      <span>Notifications are {enabled ? "on" : "off"}</span>
    </>
  );
}
