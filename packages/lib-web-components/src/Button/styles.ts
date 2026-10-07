import { css } from "lit";

export default css`
  /*
   * Colors come from the same design tokens (CSS custom properties) as
   * @minerva/lib-core. Custom properties inherit into the shadow root, so
   * ConfigProvider / applyThemeStyles theme changes apply here too. The
   * fallbacks match lib-core's light theme for pages without lib-core.
   *
   * Never declare the token names on :host: that would shadow the theme.
   */
  :host {
    display: inline-block;
    --_primary: var(--primary-color, #2563eb);
    --_primary-hover: var(
      --primary-color-hover,
      color-mix(in srgb, var(--_primary) 85%, #000)
    );
    --_secondary: var(--secondary-color, #475569);
    --_secondary-hover: var(
      --secondary-color-hover,
      color-mix(in srgb, var(--_secondary) 85%, #000)
    );
    --_success: var(--success-color, #15803d);
    --_success-hover: var(
      --success-color-hover,
      color-mix(in srgb, var(--_success) 85%, #000)
    );
    --_warning: var(--warning-color, #b45309);
    --_warning-hover: var(
      --warning-color-hover,
      color-mix(in srgb, var(--_warning) 85%, #000)
    );
    --_danger: var(--danger-color, #dc2626);
    --_danger-hover: var(
      --danger-color-hover,
      color-mix(in srgb, var(--_danger) 85%, #000)
    );
    --_info: var(--info-color, #0e7490);
    --_info-hover: var(
      --info-color-hover,
      color-mix(in srgb, var(--_info) 85%, #000)
    );
    --_on-color: var(--text-inverse-color, #ffffff);
    --_ghost-hover: var(--surface-muted-color, rgba(0, 0, 0, 0.05));
    --_disabled-bg: var(--surface-muted-color, #e5e7eb);
    --_disabled-text: var(--text-disabled-color, #9ca3af);
    --_focus-ring: var(
      --focus-ring-color,
      color-mix(in srgb, var(--_primary) 45%, transparent)
    );
    --_radius: var(--radius-md, 0.375rem);
    --_ripple: color-mix(in srgb, var(--_on-color) 70%, transparent);
  }

  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font: inherit;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    outline: none;
    user-select: none;
  }

  .button:focus-visible {
    outline: 2px solid var(--_focus-ring);
    outline-offset: 2px;
  }

  /* Variants */
  .variant-primary {
    background-color: var(--_primary);
    color: var(--_on-color);
  }

  .variant-primary:hover:not(:disabled) {
    background-color: var(--_primary-hover);
  }

  .variant-secondary,
  .variant-back {
    background-color: var(--_secondary);
    color: var(--_on-color);
  }

  .variant-secondary:hover:not(:disabled),
  .variant-back:hover:not(:disabled) {
    background-color: var(--_secondary-hover);
  }

  .variant-success {
    background-color: var(--_success);
    color: var(--_on-color);
  }

  .variant-success:hover:not(:disabled) {
    background-color: var(--_success-hover);
  }

  .variant-warning,
  .variant-retry {
    background-color: var(--_warning);
    color: var(--_on-color);
  }

  .variant-warning:hover:not(:disabled),
  .variant-retry:hover:not(:disabled) {
    background-color: var(--_warning-hover);
  }

  .variant-error {
    background-color: var(--_danger);
    color: var(--_on-color);
  }

  .variant-error:hover:not(:disabled) {
    background-color: var(--_danger-hover);
  }

  .variant-info {
    background-color: var(--_info);
    color: var(--_on-color);
  }

  .variant-info:hover:not(:disabled) {
    background-color: var(--_info-hover);
  }

  .variant-ghost {
    background-color: transparent;
    color: var(--_primary);
  }

  .variant-ghost:hover:not(:disabled) {
    background-color: var(--_ghost-hover);
  }

  /* Sizes */
  .size-tiny {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .size-small {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .size-medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .size-large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  /* Shapes */
  .shape-square {
    border-radius: 0;
  }

  .shape-rounded {
    border-radius: var(--_radius);
  }

  .shape-circle {
    border-radius: 9999px;
  }

  .shape-pill {
    border-radius: 9999px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  /* States */
  .disabled,
  :disabled {
    background-color: var(--_disabled-bg) !important;
    color: var(--_disabled-text) !important;
    cursor: not-allowed;
    pointer-events: none;
  }

  .loading {
    cursor: wait;
    pointer-events: none;
  }

  .active {
    transform: scale(0.98);
  }

  /* Modifiers */
  .block {
    width: 100%;
  }

  .elevation {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .elevation:hover:not(:disabled) {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .animation {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animation:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .outlined {
    background-color: transparent;
    border: 1px solid currentColor;
  }

  .gradient {
    background: linear-gradient(45deg, var(--_primary), var(--_info));
  }

  .transparent {
    background-color: transparent;
  }

  .borderless {
    border: none;
  }

  .compact {
    padding: 0.25rem 0.5rem;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .lowercase {
    text-transform: lowercase;
  }

  .capitalize {
    text-transform: capitalize;
  }

  /* Icons */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon.left {
    margin-right: 0.5rem;
  }

  .icon.right {
    margin-left: 0.5rem;
  }

  /* Loading Spinner */
  .loading-spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  /* Ripple Effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    background-color: var(--_ripple);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
