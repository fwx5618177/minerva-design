# WeekStrip 週ストリップ

1 週間の 7 日を横一列に並べます。日付を選択し、今日をひと目で確認し、タスクのある日にマークを付け、週を切り替えられます。

Package: minerva-design@1.23.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/week-strip",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "week",
    "typeText": "Date | undefined",
    "attribute": "week",
    "required": false
  },
  {
    "name": "firstDayOfWeek",
    "typeText": "number",
    "attribute": "first-day-of-week",
    "required": false
  },
  {
    "name": "today",
    "typeText": "string | undefined",
    "attribute": "today",
    "required": false
  },
  {
    "name": "showNavigation",
    "typeText": "boolean",
    "attribute": "show-navigation",
    "required": false
  },
  {
    "name": "previousWeekLabel",
    "typeText": "string | undefined",
    "attribute": "previous-week-label",
    "required": false
  },
  {
    "name": "nextWeekLabel",
    "typeText": "string | undefined",
    "attribute": "next-week-label",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "markers",
    "typeText": "Readonly<Record<string, WeekStripMarker>> | undefined",
    "required": false
  },
  {
    "name": "weekdayLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "getDayLabel",
    "typeText": "(day: string, marker: WeekStripMarker | undefined) => string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:9803c940c79eb6bf3f06"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected a day (`detail: { value }`, \"YYYY-MM-DD\")"
  },
  {
    "name": "minerva-week-change",
    "typeText": "CustomEvent<{ week: Date; }>",
    "detailType": {
      "typeText": "{ week: Date; }",
      "typeRef": "type:fbcc1376f784f90c364a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user displayed another week (`detail: { week }`, its first day at local midnight)"
  }
]
```

## API

```json
{
  "wc:minerva-week-strip": {
    "kind": "element",
    "source": "web-components/src/components/week-strip/week-strip.ts",
    "className": "MinervaWeekStrip",
    "summary": "A week of selectable days with today, markers and week navigation.",
    "description": "The seven days of a week in a row (`<WeekStrip>` of React): a horizontal `listbox` of day `option`s. Select a day by click, Enter or Space; today carries `aria-current=\"date\"`; days can show a count badge or a dot (`markers`). Keyboard: one tab stop (roving `tabindex`), ArrowLeft / ArrowRight move by a day (into the previous / next week; RTL swaps them), Home / End jump to the ends of the week, PageUp / PageDown move by a week. `show-navigation` adds previous / next week buttons around the month of the week. User navigation updates `week` / `value` and fires `minerva-week-change` / `minerva-change`. Setting `value` also displays its week.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string | undefined",
        "description": "Selected day, \"YYYY-MM-DD\""
      },
      {
        "name": "week",
        "attribute": "week",
        "type": "Date | undefined",
        "description": "Displayed week (any day of it; attribute \"YYYY-MM-DD\"); defaults to the week of the selected day, else of today"
      },
      {
        "name": "firstDayOfWeek",
        "attribute": "first-day-of-week",
        "type": "number",
        "default": "1",
        "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday"
      },
      {
        "name": "today",
        "attribute": "today",
        "type": "string | undefined",
        "description": "The day marked as today, \"YYYY-MM-DD\"; defaults to the current local day"
      },
      {
        "name": "showNavigation",
        "attribute": "show-navigation",
        "type": "boolean",
        "default": "false",
        "description": "Shows previous / next week buttons around the month of the week"
      },
      {
        "name": "previousWeekLabel",
        "attribute": "previous-week-label",
        "type": "string | undefined",
        "description": "Label of the previous-week button (default: localized)"
      },
      {
        "name": "nextWeekLabel",
        "attribute": "next-week-label",
        "type": "string | undefined",
        "description": "Label of the next-week button (default: localized)"
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "string | undefined",
        "description": "Locale of the dates (Intl.DateTimeFormat); default: the library language"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Blocks selection and navigation"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
      },
      {
        "name": "markers",
        "type": "Readonly<Record<string, WeekStripMarker>> | undefined",
        "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge (99+ above 99), true shows a dot"
      },
      {
        "name": "weekdayLabels",
        "type": "readonly string[] | undefined",
        "description": "Weekday names, Monday first (7 labels), whatever `first-day-of-week` is"
      },
      {
        "name": "getDayLabel",
        "type": "(day: string, marker: WeekStripMarker | undefined) => string | undefined",
        "description": "Accessible label of a day, from the day (\"YYYY-MM-DD\") and its marker"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user selected a day (`detail: { value }`, \"YYYY-MM-DD\")"
      },
      {
        "name": "minerva-week-change",
        "description": "The user displayed another week (`detail: { week }`, its first day at local midnight)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element"
      },
      {
        "name": "heading",
        "description": "The month of the week (with `show-navigation`)"
      },
      {
        "name": "nav-button",
        "description": "The previous / next week buttons (with `show-navigation`)"
      },
      {
        "name": "list",
        "description": "The `role=listbox` element holding the days"
      },
      {
        "name": "day",
        "description": "A day (`role=option`)"
      },
      {
        "name": "day--selected",
        "description": "Item state of `day`: selected"
      },
      {
        "name": "day--today",
        "description": "Item state of `day`: today"
      },
      {
        "name": "day--disabled",
        "description": "Item state of `day`: disabled"
      },
      {
        "name": "indicator",
        "description": "The marker of a day: empty, a count badge or a dot"
      }
    ],
    "cssProperties": [
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

## Example: 基本的な使い方

value（"YYYY-MM-DD"）は属性で、minerva-change が選択された日を通知します。タブストップは 1 つで、矢印キー、Home / End、PageUp / PageDown で日付を移動します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/wc/basic.html

```html
<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip id="strip" aria-label="Study days"></minerva-week-strip>
  <output id="selected">Select a day.</output>
</div>

```

### apps/docs/src/docs/pages/week-strip/wc/basic.ts

```tsx
// value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
// day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement>("#strip")!;
  const output = root.querySelector<HTMLOutputElement>("#selected")!;
  strip.setAttribute("value", key(new Date()));
  output.value = `Selected: ${key(new Date())}`;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Selected: ${value}`;
  };
  strip.addEventListener("minerva-change", onChange);
  return () => strip.removeEventListener("minerva-change", onChange);
}

```

## Example: マーカー

markers は日付を数値（件数バッジ、99 を超えると 99+）または true（ドット）に対応付けるプロパティです。first-day-of-week で最初の列を選び、getDayLabel プロパティでアクセシブルな名前をカスタマイズできます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/wc/markers.html

```html
<div style="display: grid; gap: 24px; max-width: 480px">
  <minerva-week-strip id="tasks"></minerva-week-strip>
  <minerva-week-strip
    id="sunday"
    first-day-of-week="0"
    aria-label="Tasks this week (Sunday first)"
  ></minerva-week-strip>
</div>

```

### apps/docs/src/docs/pages/week-strip/wc/markers.ts

```tsx
// markers is a property: a number shows a count badge (99+ above 99), true
// a dot. getDayLabel (a property too) customizes the accessible names.
type Marker = number | boolean;
type WeekStripElement = HTMLElement & {
  value?: string;
  markers?: Record<string, Marker>;
  getDayLabel?: (day: string, marker: Marker | undefined) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export function setup(root: HTMLElement) {
  const markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  const tasks = root.querySelector<WeekStripElement>("#tasks")!;
  const sunday = root.querySelector<WeekStripElement>("#sunday")!;
  for (const strip of [tasks, sunday]) {
    strip.value = inDays(0);
    strip.markers = markers;
  }
  sunday.getDayLabel = (day, marker) =>
    typeof marker === "number"
      ? `${day}: ${marker} tasks`
      : marker
        ? `${day}: reminder`
        : day;
}

```

## Example: 週の切り替え

show-navigation で前週 / 翌週ボタンと週の月を表示します。minerva-week-change は表示中の週の初日を通知し、矢印キーで隣の週に移ったときも発火します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/wc/navigation.html

```html
<div style="display: grid; gap: 12px; max-width: 480px">
  <minerva-week-strip id="strip" show-navigation></minerva-week-strip>
  <output id="log">Change week or select a day.</output>
</div>

```

### apps/docs/src/docs/pages/week-strip/wc/navigation.ts

```tsx
// show-navigation adds previous / next week buttons; minerva-week-change
// reports the first day of the displayed week (also on keyboard moves into
// the neighbouring weeks), minerva-change the selected day.
export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement>("#strip")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onWeek = (e: Event) => {
    const { week } = (e as CustomEvent<{ week: Date }>).detail;
    log.value = `Week of ${week.toLocaleDateString()}`;
  };
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    log.value = `Selected ${value}`;
  };
  strip.addEventListener("minerva-week-change", onWeek);
  strip.addEventListener("minerva-change", onChange);
  return () => {
    strip.removeEventListener("minerva-week-change", onWeek);
    strip.removeEventListener("minerva-change", onChange);
  };
}

```

## Example: サイズと無効状態

3 種類の密度（size="small" では件数がドットになります。:state(size-small) などのカスタムステートもあります）と無効なストリップ。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/wc/sizes.html

```html
<div style="display: grid; gap: 24px; max-width: 480px">
  <minerva-week-strip size="small" aria-label="Small week"></minerva-week-strip>
  <minerva-week-strip aria-label="Medium week"></minerva-week-strip>
  <minerva-week-strip size="large" aria-label="Large week"></minerva-week-strip>
  <minerva-week-strip disabled aria-label="Disabled week"></minerva-week-strip>
</div>

```

### apps/docs/src/docs/pages/week-strip/wc/sizes.ts

```tsx
// size="small" turns the count badges into dots (also the :state(size-small)
// ... custom states); disabled blocks selection and navigation.
type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

export function setup(root: HTMLElement) {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  for (const strip of root.querySelectorAll<WeekStripElement>(
    "minerva-week-strip",
  )) {
    strip.markers = { [today]: 4 };
  }
}

```
