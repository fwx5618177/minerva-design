import { StatusIndicator } from "@minerva/lib-core";

const presences = ["online", "away", "busy", "offline"] as const;

export default function PresenceDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {presences.map((type) => (
        <StatusIndicator key={type} type={type} size="small" showLabel />
      ))}
    </div>
  );
}
