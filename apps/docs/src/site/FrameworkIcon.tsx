import { frameworkBrands, type FrameworkBrand } from "./frameworkBranding";

export function FrameworkIcon({
  id,
  size = 16,
}: {
  id: FrameworkBrand;
  size?: number;
}) {
  const { Icon, color } = frameworkBrands[id];
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      data-framework-icon={id}
      size={size}
      style={{ color, width: size, height: size, flexShrink: 0 }}
    />
  );
}
