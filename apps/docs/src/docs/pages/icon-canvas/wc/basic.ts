// `items` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

export function setup(root: HTMLElement) {
  const canvas = root.querySelector<MinervaIconCanvas>("#icons")!;
  const status = root.querySelector<HTMLElement>("#status")!;
  canvas.items = [
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
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    status.textContent = `Drawn with ${renderer}`;
  };
  canvas.addEventListener("minerva-renderer-change", onChange);
  return () => canvas.removeEventListener("minerva-renderer-change", onChange);
}
