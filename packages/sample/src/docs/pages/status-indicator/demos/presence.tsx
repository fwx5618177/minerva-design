import { StatusIndicator } from "@minerva/lib-core";

const presences = ["online", "away", "busy", "offline"] as const;

export default function PresenceDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {presences.map((type) => (
        <span
          key={type}
          style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
        >
          <StatusIndicator type={type} size="small" ariaLabel={type} />
          {type}
        </span>
      ))}
    </div>
  );
}
