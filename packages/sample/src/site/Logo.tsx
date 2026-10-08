import React from "react";

/** Minerva mark: a monochrome triangle (follows `currentColor`). */
const Logo: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2.5 22.5 21h-21L12 2.5Z" fill="currentColor" />
    <path
      d="M12 10.2 16.4 18H7.6L12 10.2Z"
      fill="var(--ds-bg, #fff)"
      opacity="0.9"
    />
  </svg>
);

export default Logo;
