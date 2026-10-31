import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
} from "minerva-design/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

// one canvas, one GPU draw per run of identical icons; positions in CSS px
const items: IconCanvasItem[] = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];

export default function BasicDemo() {
  return (
    <IconCanvas items={items} height={160} title="Six icons, three ways" />
  );
}
