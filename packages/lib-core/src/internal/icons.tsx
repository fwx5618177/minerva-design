/**
 * Internal inline-SVG icon set (not part of the public API).
 *
 * Stroke icons are drawn on a 24x24 grid at `1em` and follow `currentColor`,
 * so they size with the surrounding `font-size` (or the `size` prop) and
 * recolor with `color`. They are decorative by default (`aria-hidden`,
 * not focusable); every SVG attribute can be overridden through props.
 *
 * Much of the stroke geometry comes from Lucide (https://lucide.dev):
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as
 * part of Feather (MIT). All other copyright (c) for Lucide are held by
 * Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import type { ReactNode, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Width and height; a number is in px. @default "1em" */
  size?: number | string;
}

interface BaseProps extends IconProps {
  children: ReactNode;
}

/** Outline icon: stroked with `currentColor`. */
function StrokeIcon({ size = "1em", children, ...props }: BaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Solid icon: filled with `currentColor`, inner marks cut out (even-odd). */
function FillIcon({ size = "1em", children, ...props }: BaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      stroke="none"
      strokeWidth={0}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

export function IconX(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </StrokeIcon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </StrokeIcon>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </StrokeIcon>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </StrokeIcon>
  );
}

export function IconEllipsis(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </StrokeIcon>
  );
}

export function IconRotateCw(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </StrokeIcon>
  );
}

export function IconRefreshCw(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </StrokeIcon>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3v12" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </StrokeIcon>
  );
}

export function IconBraces(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </StrokeIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Chevrons                                                            */
/* ------------------------------------------------------------------ */

export function IconChevronDown(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </StrokeIcon>
  );
}

export function IconChevronUp(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m18 15-6-6-6 6" />
    </StrokeIcon>
  );
}

export function IconChevronsUpDown(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </StrokeIcon>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </StrokeIcon>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </StrokeIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Status (outline)                                                    */
/* ------------------------------------------------------------------ */

export function IconInfo(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </StrokeIcon>
  );
}

export function IconCircleCheck(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </StrokeIcon>
  );
}

export function IconCircleX(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </StrokeIcon>
  );
}

export function IconCircleAlert(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </StrokeIcon>
  );
}

export function IconTriangleAlert(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </StrokeIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Status (solid) — Alert's filled look, form error marks              */
/* ------------------------------------------------------------------ */

const CIRCLE = "M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Z";

export function IconCircleInfoFilled(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path
        d={`${CIRCLE}M11 10.5h2V17h-2ZM12 6.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5Z`}
      />
    </FillIcon>
  );
}

export function IconCircleCheckFilled(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d={`${CIRCLE}M7.3 12.3l1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-5.9 5.9Z`} />
    </FillIcon>
  );
}

export function IconCircleXFilled(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path
        d={`${CIRCLE}M14.55 8.04 15.96 9.45 13.41 12 15.96 14.55 14.55 15.96 12 13.41 9.45 15.96 8.04 14.55 10.59 12 8.04 9.45 9.45 8.04 12 10.59Z`}
      />
    </FillIcon>
  );
}

export function IconTriangleAlertFilled(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M10.27 3a2 2 0 0 1 3.46 0l8.66 15a2 2 0 0 1-1.73 3H3.34a2 2 0 0 1-1.73-3ZM11 9h2v5h-2ZM12 15.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5Z" />
    </FillIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Rating                                                              */
/* ------------------------------------------------------------------ */

export function IconStar(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </StrokeIcon>
  );
}

export function IconStarHalf(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2" />
    </StrokeIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Objects                                                             */
/* ------------------------------------------------------------------ */

export function IconCalendar(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </StrokeIcon>
  );
}

export function IconClock(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </StrokeIcon>
  );
}

export function IconEye(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </StrokeIcon>
  );
}

export function IconEyeOff(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </StrokeIcon>
  );
}

export function IconPanelLeftClose(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </StrokeIcon>
  );
}

export function IconPanelLeftOpen(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
    </StrokeIcon>
  );
}

export function IconPin(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </StrokeIcon>
  );
}

export function IconPinOff(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 17v5" />
      <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
      <path d="m2 2 20 20" />
      <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
    </StrokeIcon>
  );
}

/**
 * Inbox tray, drawn as a solid outline so it renders the same when a
 * stylesheet forces `fill`/`stroke` to `currentColor` (see Empty).
 */
export function IconInbox(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" />
    </FillIcon>
  );
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

/** Eight-spoke spinner (rotate it with CSS). */
export function IconSpinner(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </StrokeIcon>
  );
}

/** Open ring (rotate it with CSS). */
export function IconCircleNotch(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </StrokeIcon>
  );
}

/** Square wave. */
export function IconWaveSquare(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M2 12h3V6h5v12h5V6h5v6h2" />
    </StrokeIcon>
  );
}
