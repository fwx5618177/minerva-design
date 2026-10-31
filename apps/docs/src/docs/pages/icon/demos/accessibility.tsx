import { IconButton } from "minerva-design";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  SettingsIcon,
} from "minerva-design/icons";

export default function AccessibilityDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {/* decorative: the text says it all (aria-hidden) */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <CheckCircleIcon size={18} color="var(--success-color)" />
        Saved
      </span>
      {/* meaningful on its own: a title makes it role="img" */}
      <AlertTriangleIcon color="var(--warning-color)" title="Warning" />
      {/* inside a control: the control carries the name */}
      <IconButton icon={<SettingsIcon size={18} />} aria-label="Settings" />
    </div>
  );
}
