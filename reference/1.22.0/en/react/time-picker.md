# TimePicker

Picks a time of day from hour, minute and second columns, or by typing it.

Package: minerva-design@1.22.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the panel; clicking outside closes it.

Each column (Hours, Minutes, Seconds, AM/PM) is a listbox: Arrow Up / Arrow Down, Home and End move within it, Arrow Left / Arrow Right switch columns.

Enter or Space picks the focused option.

Escape closes the panel and returns focus to the input. Tab past the last column closes it and moves on to the next field; Shift+Tab before the first column closes it and returns to the input.

Typed text is committed only once it is a complete, valid time. On blur a more lenient parse is applied; empty text clears the value and unparsable text restores the previous one.

## TimePicker

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "TimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "object",
    "typeText": "Date | null | undefined",
    "typeRef": "type:4b2ab921fe33ea9fd1a2",
    "required": false,
    "description": "Selected time (controlled; pair with onChange). `null` means \"no time\" while staying controlled; `undefined` makes the picker uncontrolled."
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Initially selected time (uncontrolled)"
  },
  {
    "name": "format",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "HH:mm:ss",
    "required": false,
    "description": "Display format: \"HH:mm:ss\", \"HH:mm\", \"hh:mm:ss a\" or \"hh:mm a\""
  },
  {
    "name": "use12Hours",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Uses a 12-hour clock with an AM/PM column"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label of the input; without it the input is labelled \"Time\" (localized)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input when no visible label is shown"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required; defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "time-picker",
    "required": false,
    "description": "Name of the input"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the picker; defaults to the enclosing FormControl's state"
  },
  {
    "name": "clearable",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Allows clearing the value with the suffix button"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Size of the input and panel"
  },
  {
    "name": "minTime",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Earliest selectable time; earlier options are disabled"
  },
  {
    "name": "maxTime",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Latest selectable time; later options are disabled"
  },
  {
    "name": "showSecond",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows seconds. `false` also removes the seconds token from `format` (\"HH:mm:ss\" -> \"HH:mm\"): the format in use is the single source of truth of the seconds column, the displayed text and parsing"
  },
  {
    "name": "hourStep",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Interval between hour options"
  },
  {
    "name": "minuteStep",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Interval between minute options"
  },
  {
    "name": "secondStep",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Interval between second options"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "function",
    "typeText": "((date: Date | undefined) => void) | undefined",
    "typeRef": "type:fc34ff432dc0b24a55a5",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date | undefined",
        "typeRef": "type:007ea92938c0789e072e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new time, or `undefined` when the value is cleared"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/TimePicker/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:68543af5b4949b5685ab",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the panel opens or closes"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "TimePickerProps": {
    "source": "react/src/components/TimePicker/types.ts",
    "description": "Props of TimePicker; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
      },
      {
        "name": "value",
        "type": "Date | null",
        "required": false,
        "description": "Selected time (controlled; pair with onChange). `null` means \"no time\" while staying controlled; `undefined` makes the picker uncontrolled."
      },
      {
        "name": "defaultValue",
        "type": "Date",
        "required": false,
        "description": "Initially selected time (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(date: Date | undefined) => void",
        "required": false,
        "description": "Called with the new time, or `undefined` when the value is cleared"
      },
      {
        "name": "format",
        "type": "string",
        "required": false,
        "default": "\"HH:mm:ss\"",
        "description": "Display format: \"HH:mm:ss\", \"HH:mm\", \"hh:mm:ss a\" or \"hh:mm a\""
      },
      {
        "name": "use12Hours",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Uses a 12-hour clock with an AM/PM column"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Select time\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label of the input; without it the input is labelled \"Time\" (localized)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input when no visible label is shown"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the input; defaults to the id of an enclosing FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as required; defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"time-picker\"",
        "description": "Name of the input"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the panel opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the picker; defaults to the enclosing FormControl's state"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Allows clearing the value with the suffix button"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the input and panel"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "minTime",
        "type": "Date",
        "required": false,
        "description": "Earliest selectable time; earlier options are disabled"
      },
      {
        "name": "maxTime",
        "type": "Date",
        "required": false,
        "description": "Latest selectable time; later options are disabled"
      },
      {
        "name": "showSecond",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows seconds. `false` also removes the seconds token from `format` (\"HH:mm:ss\" -> \"HH:mm\"): the format in use is the single source of truth of the seconds column, the displayed text and parsing"
      },
      {
        "name": "hourStep",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Interval between hour options"
      },
      {
        "name": "minuteStep",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Interval between minute options"
      },
      {
        "name": "secondStep",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Interval between second options"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Click the input (or press Arrow Down) to open the panel. onChange receives a Date, or undefined when cleared. Without label, the input is named "Time".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/basic.tsx

```tsx
import { useState } from "react";
import { TimePicker } from "minerva-design";

export default function BasicDemo() {
  const [time, setTime] = useState<Date>();

  return (
    <div>
      <TimePicker onChange={setTime} />
      <p>Selected: {time ? time.toLocaleTimeString() : "none"}</p>
    </div>
  );
}

```

## Example: Controlled

Pass value and update it in onChange. null keeps the picker controlled but empty, while undefined makes it uncontrolled. label gives the input a visible label.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, TimePicker } from "minerva-design";

const noon = () => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  return date;
};

export default function ControlledDemo() {
  // null keeps the picker controlled while it is empty
  const [time, setTime] = useState<Date | null>(null);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <TimePicker
        label="Meeting time"
        value={time}
        onChange={(date) => setTime(date ?? null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setTime(noon())}>
          Set to noon
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setTime(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {time ? time.toLocaleTimeString() : "null"}</p>
    </div>
  );
}

```

## Example: Default value and clearing

defaultValue sets the initial time. The clear button is labelled "Clear time"; set clearable={false} to hide it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/default-value.tsx

```tsx
import { TimePicker } from "minerva-design";

const nineThirty = new Date();
nineThirty.setHours(9, 30, 0);

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker defaultValue={nineThirty} />
      <TimePicker defaultValue={nineThirty} clearable={false} />
    </div>
  );
}

```

## Example: Disabled

A disabled picker cannot be opened or edited.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/disabled.tsx

```tsx
import { TimePicker } from "minerva-design";

const noon = new Date();
noon.setHours(12, 0, 0);

export default function DisabledDemo() {
  return <TimePicker defaultValue={noon} disabled />;
}

```

## Example: Formats

Supported formats are HH:mm:ss and HH:mm (plus their 12-hour variants). Hide the seconds column with showSecond={false}.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/formats.tsx

```tsx
import { TimePicker } from "minerva-design";

const now = new Date();

export default function FormatsDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker defaultValue={now} format="HH:mm:ss" />
      <TimePicker defaultValue={now} format="HH:mm" showSecond={false} />
    </div>
  );
}

```

## Example: Sizes

Three sizes: small, medium (default) and large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/sizes.tsx

```tsx
import { TimePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker size="small" placeholder="Small" />
      <TimePicker size="medium" placeholder="Medium" />
      <TimePicker size="large" placeholder="Large" />
    </div>
  );
}

```

## Example: Steps

hourStep, minuteStep and secondStep set the interval between options.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/steps.tsx

```tsx
import { TimePicker } from "minerva-design";

export default function StepsDemo() {
  return (
    <TimePicker
      format="HH:mm"
      showSecond={false}
      hourStep={2}
      minuteStep={15}
      placeholder="Every 2 h / 15 min"
    />
  );
}

```

## Example: Time range

minTime and maxTime disable the options outside the allowed range.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/time-range.tsx

```tsx
import { TimePicker } from "minerva-design";

const at = (hours: number, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export default function TimeRangeDemo() {
  return (
    <TimePicker
      format="HH:mm"
      showSecond={false}
      minTime={at(9)}
      maxTime={at(17, 30)}
      placeholder="Office hours 09:00–17:30"
    />
  );
}

```

## Example: 12-hour clock

use12Hours adds an AM/PM column; combine it with the hh:mm:ss a or hh:mm a format.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/demos/twelve-hour.tsx

```tsx
import { TimePicker } from "minerva-design";

export default function TwelveHourDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <TimePicker use12Hours format="hh:mm:ss a" placeholder="hh:mm:ss AM" />
      <TimePicker
        use12Hours
        format="hh:mm a"
        showSecond={false}
        placeholder="hh:mm AM"
      />
    </div>
  );
}

```
