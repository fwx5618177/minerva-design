import {
  InteractiveIconButton,
  interactiveIconsMap,
  type InteractiveIconType,
} from "@minerva/lib-core";

const types = Object.keys(interactiveIconsMap) as InteractiveIconType[];

export default function InteractiveTypesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {types.map((type) => (
        <div
          key={type}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <InteractiveIconButton type={type} />
          <code>{type}</code>
        </div>
      ))}
    </div>
  );
}
