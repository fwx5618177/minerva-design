// Colored icons are drawn in layers: one per run of consecutive paths with the
// same color. An icon without colors is a single layer (itself), so it keeps
// its meshes and its draw calls.

import type { IconDefinition } from "./types";

/** Paths of an icon drawn in one color; `undefined` is the drawing color */
export interface IconLayer {
  icon: IconDefinition;
  color: string | undefined;
}

const layersOf = new WeakMap<IconDefinition, readonly IconLayer[]>();

/** The layers of an icon in painting order (cached per icon object) */
export function iconLayers(icon: IconDefinition): readonly IconLayer[] {
  let layers = layersOf.get(icon);
  if (!layers) {
    layers = splitLayers(icon);
    layersOf.set(icon, layers);
  }
  return layers;
}

const splitLayers = (icon: IconDefinition): readonly IconLayer[] => {
  const colors = icon.colors?.map((color) =>
    color && color.toLowerCase() !== "currentcolor" ? color : undefined,
  );
  if (!colors?.some((color) => color !== undefined)) {
    return [{ icon, color: undefined }];
  }
  const layers: IconLayer[] = [];
  icon.paths.forEach((d, i) => {
    const color = colors[i];
    const last = layers[layers.length - 1];
    if (last && last.color === color) {
      last.icon = { ...last.icon, paths: [...last.icon.paths, d] };
    } else {
      layers.push({
        icon: { name: icon.name, paths: [d] },
        color,
      });
    }
  });
  return layers;
};
