import { forwardRef, type SVGProps } from "react";
import * as marks from "./brand-marks";

/** Filled brand artwork, rendered as SVG to retain its original shape and proportions. */
export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  /** Width and height; use "1em" for text-sized marks. @default 24 */
  size?: number | string;
  /** Fill color. @default "currentColor" */
  color?: string;
  /** Accessible name; unnamed marks are decorative. */
  title?: string;
}
interface BrandMark {
  readonly name: string;
  readonly viewBox: string;
  readonly paths: readonly string[];
}
function createBrandIcon(mark: BrandMark) {
  const Brand = forwardRef<SVGSVGElement, BrandIconProps>(
    function BrandMarkIcon(
      { size = 24, color = "currentColor", title, ...attributes },
      ref,
    ) {
      const labelled = Boolean(
        title || attributes["aria-label"] || attributes["aria-labelledby"],
      );
      return (
        <svg
          width={size}
          height={size}
          viewBox={mark.viewBox}
          fill={color}
          role={labelled ? "img" : undefined}
          aria-hidden={labelled ? undefined : true}
          focusable="false"
          data-icon={mark.name}
          {...attributes}
          ref={ref}
        >
          {title ? <title>{title}</title> : null}
          {mark.paths.map((path, index) => (
            <path key={index} d={path} />
          ))}
        </svg>
      );
    },
  );
  Brand.displayName = mark.name;
  return Brand;
}

export const BrandGithubIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandGithubMark,
);

export const BrandReactIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandReactMark,
);

export const BrandVueIcon = /* @__PURE__ */ createBrandIcon(marks.brandVueMark);

export const BrandAngularIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandAngularMark,
);

export const BrandWechatIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandWechatMark,
);

export const BrandSvelteIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandSvelteMark,
);

export const BrandSolidIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandSolidMark,
);

export const BrandHtml5Icon = /* @__PURE__ */ createBrandIcon(
  marks.brandHtml5Mark,
);

export const BrandAppleIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandAppleMark,
);

export const BrandAndroidIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandAndroidMark,
);

export const BrandLinuxIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandLinuxMark,
);

export const BrandWindowsIcon = /* @__PURE__ */ createBrandIcon(
  marks.brandWindowsMark,
);
