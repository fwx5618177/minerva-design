export interface EmptyProps {
  /** Custom icon, replacing the default one */
  icon?: React.ReactNode;
  /**
   * Description text
   * @default "No Data"
   */
  description?: React.ReactNode;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Footer content, e.g. an action button */
  children?: React.ReactNode;
  /**
   * Uses the built-in SVG illustration instead of the default icon
   * @default false
   */
  useSvg?: boolean;
  /** Width of the container */
  width?: string | number;
  /** Height of the container */
  height?: string | number;
  /** Background color */
  backgroundColor?: string;
  /**
   * Adds a drop shadow
   * @default false
   */
  showShadow?: boolean;
  /** Text color */
  color?: string;
}
