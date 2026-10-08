import React from "react";
import styles from "./site.module.scss";

/** Keyboard key hint, e.g. <Kbd>⌘K</Kbd> */
const Kbd: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <kbd className={className ? `${styles.kbd} ${className}` : styles.kbd}>
    {children}
  </kbd>
);

export default Kbd;
