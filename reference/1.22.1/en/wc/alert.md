# Alert

Displays an important message inline, such as system notices or the result of an action.

Package: minerva-design@1.22.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Alert

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/alert",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "color",
    "typeText": "AlertColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "heading",
    "typeText": "string",
    "attribute": "heading",
    "required": false
  },
  {
    "name": "hideIcon",
    "typeText": "boolean",
    "attribute": "hide-icon",
    "required": false
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "attribute": "closable",
    "required": false
  },
  {
    "name": "noAnimation",
    "typeText": "boolean",
    "attribute": "no-animation",
    "required": false
  },
  {
    "name": "animationName",
    "typeText": "\"slideIn\" | \"fadeIn\" | \"bounce\" | \"zoom\"",
    "attribute": "animation-name",
    "required": false
  },
  {
    "name": "banner",
    "typeText": "boolean",
    "attribute": "banner",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "attribute": "elevation",
    "required": false
  },
  {
    "name": "square",
    "typeText": "boolean",
    "attribute": "square",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | number | undefined",
    "attribute": "border-radius",
    "required": false
  },
  {
    "name": "collapsible",
    "typeText": "boolean",
    "attribute": "collapsible",
    "required": false
  },
  {
    "name": "collapsed",
    "typeText": "boolean",
    "attribute": "collapsed",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "expandLabel",
    "typeText": "string | undefined",
    "attribute": "expand-label",
    "required": false
  },
  {
    "name": "collapseLabel",
    "typeText": "string | undefined",
    "attribute": "collapse-label",
    "required": false
  },
  {
    "name": "iconLabel",
    "typeText": "string | undefined",
    "attribute": "icon-label",
    "required": false
  },
  {
    "name": "alertRole",
    "typeText": "string | undefined",
    "attribute": "alert-role",
    "required": false
  },
  {
    "name": "returnFocus",
    "typeText": "AlertFocusTarget | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-close",
    "typeText": "CustomEvent<{}>",
    "detailType": {
      "typeText": "{}",
      "typeRef": "type:fa4d5ddec3d3162d12a7"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The close button was activated; cancelable: `preventDefault()` keeps the alert visible"
  },
  {
    "name": "minerva-expanded-change",
    "typeText": "CustomEvent<{ expanded: boolean; }>",
    "detailType": {
      "typeText": "{ expanded: boolean; }",
      "typeRef": "type:81161d69ee006e66b2fe"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user expanded / collapsed the message (`detail: { expanded }`); cancelable"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Message"
  },
  {
    "name": "heading",
    "description": "Title (alternative to the `heading` attribute)"
  },
  {
    "name": "icon",
    "description": "Custom icon replacing the status icon"
  },
  {
    "name": "action",
    "description": "Action area (e.g. buttons) at the end"
  },
  {
    "name": "close-icon",
    "description": "Custom close icon"
  }
]
```

## API

```json
{
  "wc:minerva-alert": {
    "kind": "element",
    "source": "web-components/src/components/alert/alert.ts",
    "className": "MinervaAlert",
    "summary": "Inline status message with icon, actions, dismissal and collapse.",
    "description": "Important messages: system notices, operation feedback (`<Alert>` of React). Danger / warning alerts interrupt (`role=\"alert\"`), info / success ones are polite (`role=\"status\"`). With `closable`, the close button fires a cancelable `minerva-close`; unless prevented, focus first moves out of the alert (to `returnFocus`, else the next focusable element after it, else the previous one, else its container — never `<body>`) and the element then hides itself (`hidden` attribute; remove it from the DOM in the listener or set `hidden = false` to show it again). With `collapsible` (and a heading) a toggle in the heading expands / collapses the message.",
    "properties": [
      {
        "name": "color",
        "attribute": "color",
        "type": "AlertColor",
        "default": "\"info\"",
        "description": "Semantic (status) color; also sets the default icon and role"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "default": "\"subtle\"",
        "description": "Visual style: subtle (tinted), outline (bordered) or solid (filled)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Alert size"
      },
      {
        "name": "heading",
        "attribute": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Title text (or use the `heading` slot)"
      },
      {
        "name": "hideIcon",
        "attribute": "hide-icon",
        "type": "boolean",
        "default": "false",
        "description": "Hides the status icon"
      },
      {
        "name": "closable",
        "attribute": "closable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a close button"
      },
      {
        "name": "noAnimation",
        "attribute": "no-animation",
        "type": "boolean",
        "default": "false",
        "description": "Disables the entrance animation"
      },
      {
        "name": "animationName",
        "attribute": "animation-name",
        "type": "\"slideIn\" | \"fadeIn\" | \"bounce\" | \"zoom\"",
        "default": "\"slideIn\"",
        "description": "Entrance animation"
      },
      {
        "name": "banner",
        "attribute": "banner",
        "type": "boolean",
        "default": "false",
        "description": "Banner mode (page-level notices at the top of a page)"
      },
      {
        "name": "elevation",
        "attribute": "elevation",
        "type": "boolean",
        "default": "false",
        "description": "Adds a drop shadow"
      },
      {
        "name": "square",
        "attribute": "square",
        "type": "boolean",
        "default": "false",
        "description": "Square corners (the React library's `rounded={false}`)"
      },
      {
        "name": "borderRadius",
        "attribute": "border-radius",
        "type": "string | number | undefined",
        "description": "Custom corner radius (CSS value, numbers are pixels)"
      },
      {
        "name": "collapsible",
        "attribute": "collapsible",
        "type": "boolean",
        "default": "false",
        "description": "Lets the message be expanded / collapsed (requires a heading)"
      },
      {
        "name": "collapsed",
        "attribute": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "Whether the message is collapsed (the React library's `expanded={false}`)"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default: localized \"Close\")"
      },
      {
        "name": "expandLabel",
        "attribute": "expand-label",
        "type": "string | undefined",
        "description": "Accessible label of the toggle while collapsed (default: localized \"Expand\")"
      },
      {
        "name": "collapseLabel",
        "attribute": "collapse-label",
        "type": "string | undefined",
        "description": "Accessible label of the toggle while expanded (default: localized \"Collapse\")"
      },
      {
        "name": "iconLabel",
        "attribute": "icon-label",
        "type": "string | undefined",
        "description": "Accessible label of the status icon (default: localized \"{color} icon\")"
      },
      {
        "name": "alertRole",
        "attribute": "alert-role",
        "type": "string | undefined",
        "description": "ARIA role (default: \"alert\" for danger / warning, \"status\" otherwise)"
      },
      {
        "name": "returnFocus",
        "type": "AlertFocusTarget | undefined",
        "description": "Element (or getter) focused after the alert is closed with its close button"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-close",
        "description": "The close button was activated; cancelable: `preventDefault()` keeps the alert visible"
      },
      {
        "name": "minerva-expanded-change",
        "description": "The user expanded / collapsed the message (`detail: { expanded }`); cancelable"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Message"
      },
      {
        "name": "heading",
        "description": "Title (alternative to the `heading` attribute)"
      },
      {
        "name": "icon",
        "description": "Custom icon replacing the status icon"
      },
      {
        "name": "action",
        "description": "Action area (e.g. buttons) at the end"
      },
      {
        "name": "close-icon",
        "description": "Custom close icon"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The alert (role=alert for danger / warning, status otherwise); state open / closed only while collapsible"
      },
      {
        "name": "icon",
        "description": "The icon (role=img)"
      },
      {
        "name": "title",
        "description": "The title (holds the collapse button)"
      },
      {
        "name": "trigger",
        "description": "The expand / collapse button of a collapsible alert"
      },
      {
        "name": "description",
        "description": "The message"
      },
      {
        "name": "action",
        "description": "The action wrapper"
      },
      {
        "name": "close-button",
        "description": "The close button"
      }
    ],
    "cssProperties": [
      {
        "name": "--alert-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--alert-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg when rounded)"
      },
      {
        "name": "--alert-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--alert-icon-size",
        "description": "Size of the status icon (every size)"
      },
      {
        "name": "--alert-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--alert-shadow",
        "description": "Shadow of the elevated alert (defaults to --shadow-sm)"
      },
      {
        "name": "--alert-margin-bottom",
        "description": "Space below the alert"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Alert": {
    "kind": "cssVars",
    "source": "react/src/components/Alert",
    "vars": [
      {
        "name": "--alert-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--alert-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg when rounded)"
      },
      {
        "name": "--alert-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--alert-icon-size",
        "description": "Size of the status icon (every size)"
      },
      {
        "name": "--alert-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--alert-shadow",
        "description": "Shadow of the elevated alert (defaults to --shadow-sm)"
      },
      {
        "name": "--alert-margin-bottom",
        "description": "Space below the alert"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Four status colors with a heading. Danger and warning alerts use role="alert", info and success role="status".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/alert/wc/basic.html

```html
<div style="display: grid; gap: 12px">
  <minerva-alert color="info" heading="Heads up"
    >A new version is available.</minerva-alert
  >
  <minerva-alert color="success" heading="Saved"
    >Your changes have been saved.</minerva-alert
  >
  <minerva-alert color="warning" heading="Storage almost full"
    >You have used 90% of your quota.</minerva-alert
  >
  <minerva-alert color="danger" heading="Payment failed"
    >Check your card details and try again.</minerva-alert
  >
</div>

```

## Example: Closable

closable fires a cancelable minerva-close: preventDefault() keeps the alert, otherwise it moves focus out and hides itself. The action slot holds buttons.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/alert/wc/closable.html

```html
<div style="display: grid; gap: 12px">
  <minerva-alert id="cookies" closable color="info">
    <span slot="heading">Cookies</span>
    We use cookies to improve your experience.
    <minerva-button slot="action" size="small" id="accept"
      >Accept</minerva-button
    >
  </minerva-alert>
  <minerva-alert
    id="sticky"
    closable
    color="warning"
    close-label="Dismiss warning"
  >
    This warning stays while "Keep the warning" is checked.
  </minerva-alert>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
    <label><input id="keep" type="checkbox" checked /> Keep the warning</label>
    <minerva-button id="show" size="small" variant="outline"
      >Show alerts again</minerva-button
    >
    <output id="log"></output>
  </div>
</div>

```

### apps/docs/src/docs/pages/alert/wc/closable.ts

```tsx
// The close button fires a cancelable `minerva-close`; unless prevented, the
// alert moves focus out and sets its `hidden` attribute.
export function setup(root: HTMLElement) {
  const cookies = root.querySelector<HTMLElement>("#cookies")!;
  const sticky = root.querySelector<HTMLElement>("#sticky")!;
  const accept = root.querySelector<HTMLElement>("#accept")!;
  const keep = root.querySelector<HTMLInputElement>("#keep")!;
  const show = root.querySelector<HTMLElement>("#show")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onStickyClose = (event: Event) => {
    if (keep.checked) {
      event.preventDefault();
      log.value = "Close prevented";
    }
  };
  const onAccept = () => {
    log.value = "Cookies accepted";
    show.focus();
    cookies.hidden = true;
  };
  const onShow = () => {
    cookies.hidden = false;
    sticky.hidden = false;
    log.value = "";
  };
  sticky.addEventListener("minerva-close", onStickyClose);
  accept.addEventListener("click", onAccept);
  show.addEventListener("click", onShow);
  return () => {
    sticky.removeEventListener("minerva-close", onStickyClose);
    accept.removeEventListener("click", onAccept);
    show.removeEventListener("click", onShow);
  };
}

```

## Example: Collapsible

collapsible (with a heading) adds a toggle; collapsed sets the initial state and minerva-expanded-change reports each change.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/alert/wc/collapsible.html

```html
<div style="display: grid; gap: 8px">
  <minerva-alert
    id="details"
    collapsible
    collapsed
    color="danger"
    heading="3 fields need your attention"
    expand-label="Show errors"
    collapse-label="Hide errors"
  >
    <ul style="margin: 0; padding-inline-start: 20px">
      <li>Email is required.</li>
      <li>Password must be at least 8 characters.</li>
      <li>Accept the terms to continue.</li>
    </ul>
  </minerva-alert>
  <output id="state">Collapsed</output>
</div>

```

### apps/docs/src/docs/pages/alert/wc/collapsible.ts

```tsx
// The toggle in the heading fires `minerva-expanded-change` (cancelable)
// before flipping the `collapsed` property.
export function setup(root: HTMLElement) {
  const details = root.querySelector<HTMLElement>("#details")!;
  const state = root.querySelector<HTMLOutputElement>("#state")!;
  const onChange = (event: Event) => {
    const { expanded } = (event as CustomEvent<{ expanded: boolean }>).detail;
    state.value = expanded ? "Expanded" : "Collapsed";
  };
  details.addEventListener("minerva-expanded-change", onChange);
  return () => details.removeEventListener("minerva-expanded-change", onChange);
}

```

## Example: Variants, sizes and appearance

Three variants and sizes, hide-icon, elevation, square corners, animation-name / no-animation, a custom icon slot and banner mode.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/alert/wc/variants-sizes.html

```html
<div style="display: grid; gap: 12px">
  <minerva-alert variant="subtle" color="success"
    >Subtle (default)</minerva-alert
  >
  <minerva-alert variant="outline" color="success">Outline</minerva-alert>
  <minerva-alert variant="solid" color="success">Solid</minerva-alert>
  <minerva-alert size="small" hide-icon>Small, without icon</minerva-alert>
  <minerva-alert size="large" elevation square animation-name="fadeIn"
    >Large, elevated, square corners, fade-in</minerva-alert
  >
  <minerva-alert banner color="warning" no-animation>
    <span slot="icon" aria-hidden="true">🛠</span>
    Banner: scheduled maintenance on Sunday 02:00 UTC.
  </minerva-alert>
</div>

```
