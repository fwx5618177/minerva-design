import React from "react";

/** The navigation mark and browser icon share the same SVG asset. */
const Logo: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <img
    src={`${import.meta.env.BASE_URL}favicon.svg`}
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    data-minerva-logo
    style={{ flexShrink: 0 }}
  />
);
export default Logo;
