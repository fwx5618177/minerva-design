# WeekStrip 周日期条

将一周七天排成一行：选择日期、一眼看到今天、标记有任务的日期，并可逐周切换。

Package: minerva-design@1.19.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "WeekStrip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Selected day, \"YYYY-MM-DD\" (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)"
  },
  {
    "name": "week",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Displayed week (controlled; any day of the week; pair with onWeekChange)"
  },
  {
    "name": "defaultWeek",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Initially displayed week (uncontrolled; any day of the week). While the week is uncontrolled it follows the selected day."
  },
  {
    "name": "firstDayOfWeek",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday"
  },
  {
    "name": "today",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "The day marked as today, \"YYYY-MM-DD\" (e.g. a server date or a fixed date in tests)"
  },
  {
    "name": "markers",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "object",
    "typeText": "Readonly<Record<string, WeekStripMarker>> | undefined",
    "typeRef": "type:d11f5cb61f8953da6812",
    "required": false,
    "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge (99+ above 99), true shows a dot"
  },
  {
    "name": "getDayLabel",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "function",
    "typeText": "((day: string, marker: WeekStripMarker | undefined) => string) | undefined",
    "typeRef": "type:2226d45ea052c0562f6c",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "marker",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "WeekStripMarker | undefined",
        "typeRef": "type:79dbfc6bde69547185d9"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of a day; receives the day (\"YYYY-MM-DD\") and its marker"
  },
  {
    "name": "showNavigation",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows previous / next week buttons around the month of the week"
  },
  {
    "name": "previousWeekLabel",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the previous-week button"
  },
  {
    "name": "nextWeekLabel",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the next-week button"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Weekday names, Monday first (7 labels), whatever firstDayOfWeek is"
  },
  {
    "name": "locale",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the dates (Intl.DateTimeFormat)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks selection and navigation"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "WeekStripSize | undefined",
    "typeRef": "type:a1b36c68bdbfedde2f8f",
    "default": "medium",
    "required": false,
    "description": "Cell density"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the day list"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "function",
    "typeText": "((day: string) => void) | undefined",
    "typeRef": "type:ff4c7583e2f17527f39a",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the selected day (\"YYYY-MM-DD\")"
  },
  {
    "name": "onWeekChange",
    "source": "packages/react/src/components/WeekStrip/types.ts",
    "kind": "function",
    "typeText": "((weekStart: Date) => void) | undefined",
    "typeRef": "type:e2093f73f9aedfd0849d",
    "parameters": [
      {
        "name": "weekStart",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date",
        "typeRef": "type:db6c47a950e394a72434"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the first day of the requested week, at local midnight"
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
  },
  {
    "prop": "week",
    "event": "onWeekChange",
    "syntax": "week={week} onWeekChange={handler}"
  }
]
```

## API

```json
{
  "WeekStripProps": {
    "source": "react/src/components/WeekStrip/types.ts",
    "description": "Props of the WeekStrip component: the seven days of a week in a row, with a selected day, today marked, optional per-day markers and optional previous / next week navigation",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected day, \"YYYY-MM-DD\" (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(day: string) => void",
        "required": false,
        "description": "Called with the selected day (\"YYYY-MM-DD\")"
      },
      {
        "name": "week",
        "type": "Date",
        "required": false,
        "description": "Displayed week (controlled; any day of the week; pair with onWeekChange)"
      },
      {
        "name": "defaultWeek",
        "type": "Date",
        "required": false,
        "default": "the week of the selected day, else of today",
        "description": "Initially displayed week (uncontrolled; any day of the week). While the week is uncontrolled it follows the selected day."
      },
      {
        "name": "onWeekChange",
        "type": "(weekStart: Date) => void",
        "required": false,
        "description": "Called with the first day of the requested week, at local midnight"
      },
      {
        "name": "firstDayOfWeek",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday"
      },
      {
        "name": "today",
        "type": "string",
        "required": false,
        "default": "the current local day",
        "description": "The day marked as today, \"YYYY-MM-DD\" (e.g. a server date or a fixed date in tests)"
      },
      {
        "name": "markers",
        "type": "Readonly<Record<string, WeekStripMarker>>",
        "required": false,
        "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge (99+ above 99), true shows a dot"
      },
      {
        "name": "getDayLabel",
        "type": "(day: string, marker: WeekStripMarker | undefined) => string",
        "required": false,
        "default": "\"<long date>, <n> items\" (translated)",
        "description": "Accessible label of a day; receives the day (\"YYYY-MM-DD\") and its marker"
      },
      {
        "name": "showNavigation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows previous / next week buttons around the month of the week"
      },
      {
        "name": "previousWeekLabel",
        "type": "string",
        "required": false,
        "default": "\"Previous week\" (translated)",
        "description": "Label of the previous-week button"
      },
      {
        "name": "nextWeekLabel",
        "type": "string",
        "required": false,
        "default": "\"Next week\" (translated)",
        "description": "Label of the next-week button"
      },
      {
        "name": "weekdayLabels",
        "type": "readonly string[]",
        "required": false,
        "default": "\"Mon\" ... \"Sun\" (translated)",
        "description": "Weekday names, Monday first (7 labels), whatever firstDayOfWeek is"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the library language",
        "description": "Locale of the dates (Intl.DateTimeFormat)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks selection and navigation"
      },
      {
        "name": "size",
        "type": "WeekStripSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Cell density"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Week\" (translated)",
        "description": "Accessible label of the day list"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div>"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:WeekStrip": {
    "kind": "cssVars",
    "source": "react/src/components/WeekStrip",
    "vars": [
      {
        "name": "--week-strip-gap",
        "description": "Space between the day cells"
      },
      {
        "name": "--week-strip-day-height",
        "description": "Minimum height of a day cell (defaults to 3.5rem; 2.75rem with size=\"small\", 4.5rem with size=\"large\"); cells grow to fit a count badge"
      },
      {
        "name": "--week-strip-radius",
        "description": "Corner radius of the day cells and buttons (defaults to --radius-md)"
      },
      {
        "name": "--week-strip-hover-background",
        "description": "Background of a hovered day"
      },
      {
        "name": "--week-strip-selected-background",
        "description": "Background of the selected day (defaults to --primary-color)"
      },
      {
        "name": "--week-strip-selected-color",
        "description": "Text color of the selected day"
      },
      {
        "name": "--week-strip-today-color",
        "description": "Ring and number color marking today"
      },
      {
        "name": "--week-strip-weekday-color",
        "description": "Text color of the weekday names"
      },
      {
        "name": "--week-strip-marker-background",
        "description": "Background of the count badge"
      },
      {
        "name": "--week-strip-marker-color",
        "description": "Text color of the count badge (and color of the dot)"
      },
      {
        "name": "--week-strip-nav-height",
        "description": "Size of the previous / next week buttons (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

受控的选中日期（"YYYY-MM-DD"）。今天带有描边并标注 aria-current="date"；日期条是水平 listbox，可用方向键、Home / End 和 PageUp / PageDown 操作。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/demos/basic.tsx

```tsx
import { useState } from "react";
import { WeekStrip } from "minerva-design";

const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

export default function BasicDemo() {
  const [value, setValue] = useState(today);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <WeekStrip value={value} onChange={setValue} aria-label="Study days" />
      <p style={{ margin: 0 }}>Selected: {value}</p>
    </div>
  );
}

```

## Example: 标记

markers 将日期映射为数字（计数徽标，超过 99 显示 99+）或 true（圆点）。firstDayOfWeek 决定第一列；getDayLabel 自定义无障碍名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/demos/markers.tsx

```tsx
import { WeekStrip } from "minerva-design";

const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return key(date);
};

// A number shows a count badge, true shows a dot
const markers = {
  [inDays(-1)]: 2,
  [inDays(0)]: 3,
  [inDays(1)]: true,
  [inDays(3)]: 1,
};

export default function MarkersDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <WeekStrip defaultValue={inDays(0)} markers={markers} />
      <WeekStrip
        defaultValue={inDays(0)}
        markers={markers}
        firstDayOfWeek={0}
        getDayLabel={(day, marker) =>
          typeof marker === "number"
            ? `${day}: ${marker} tasks`
            : marker
              ? `${day}: reminder`
              : day
        }
        aria-label="Tasks this week (Sunday first)"
      />
    </div>
  );
}

```

## Example: 周切换

showNavigation 添加上一周 / 下一周按钮以及该周所在月份。用 week / onWeekChange 控制显示的周；方向键也可跨入相邻的周。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/demos/navigation.tsx

```tsx
import { useState } from "react";
import { WeekStrip } from "minerva-design";

export default function NavigationDemo() {
  const [value, setValue] = useState<string>();
  const [week, setWeek] = useState(() => new Date());

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <WeekStrip
        showNavigation
        value={value}
        onChange={setValue}
        week={week}
        onWeekChange={setWeek}
      />
      <p style={{ margin: 0 }}>
        Week of {week.toLocaleDateString()}
        {value ? ` · selected ${value}` : ""}
      </p>
    </div>
  );
}

```

## Example: 尺寸与禁用

三种密度（small 尺寸下计数显示为圆点），以及禁用状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/demos/sizes.tsx

```tsx
import { WeekStrip } from "minerva-design";

const markers = (() => {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    [`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`]: 4,
  };
})();

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <WeekStrip size="small" markers={markers} aria-label="Small week" />
      <WeekStrip markers={markers} aria-label="Medium week" />
      <WeekStrip size="large" markers={markers} aria-label="Large week" />
      <WeekStrip disabled markers={markers} aria-label="Disabled week" />
    </div>
  );
}

```
