import { createIcon, defineIcon, Icon } from "minerva-design/icons";

// a custom icon on the same 24×24 grid (strokes only, round caps and joins)
const rocketIcon = defineIcon({
  name: "rocket",
  category: "custom",
  tags: ["launch", "ship"],
  paths: [
    "M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z",
    "M12 9.5h.01",
    "M7 13l-3 3v3h3",
    "M17 13l3 3v3h-3",
    "M10 19.5l2 1.5 2-1.5",
  ],
});

// a component like the built-in ones
const RocketIcon = createIcon(rocketIcon);

export default function CustomDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <RocketIcon />
      <RocketIcon size={40} color="var(--primary-color)" />
      {/* or through the generic Icon, on any renderer */}
      <Icon icon={rocketIcon} size={40} renderer="auto" />
    </div>
  );
}
