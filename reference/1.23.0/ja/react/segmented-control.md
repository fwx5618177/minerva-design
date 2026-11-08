# SegmentedControl セグメントコントロール

モードやフィルターを切り替える単一選択のセグメントスイッチで、選択中のセグメントの下をサムがスライドします。各選択肢に独自のコンテンツパネルがある場合は Tabs を使用してください。

Package: minerva-design@1.23.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SegmentedControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "array",
    "typeText": "readonly SegmentedControlOption<NoInfer<T>>[]",
    "typeRef": "type:a602c82e323b3248e0aa",
    "required": true,
    "description": "The segments: strings or option objects"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Selected value (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "SegmentedControlSize | undefined",
    "typeRef": "type:aba180377d3532dc0a95",
    "default": "medium",
    "required": false,
    "description": "Segment density"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "enum",
    "values": [
      "neutral",
      "primary"
    ],
    "typeText": "SegmentedControlColor | undefined",
    "typeRef": "type:ba97261bfc73d42d6181",
    "default": "neutral",
    "required": false,
    "description": "Thumb color"
  },
  {
    "name": "fullWidth",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Fills the width of the container (the segments always share the width equally)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks every segment"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of a hidden input carrying the value in a form"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the group"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the element labelling the group"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Root id"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/SegmentedControl/types.ts",
    "kind": "function",
    "typeText": "((value: T) => void) | undefined",
    "typeRef": "type:6bdc65bbd537e289b41a",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:ef890c1cb48dd466d41d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the selected value"
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
  "SegmentedControlProps": {
    "source": "react/src/components/SegmentedControl/types.ts",
    "description": "Props of the SegmentedControl component: a single-choice segmented switch for modes and filters (use Tabs when each choice has a content panel). The value type `T` comes from `onChange` or an explicit type argument (`<SegmentedControl<View> ...>`), never from `options` / `value` / `defaultValue`, so literal values and mixed options do not narrow it.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "options",
        "type": "readonly SegmentedControlOption<NoInfer<T>>[]",
        "required": true,
        "description": "The segments: strings or option objects"
      },
      {
        "name": "value",
        "type": "NoInfer<T>",
        "required": false,
        "description": "Selected value (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "NoInfer<T>",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: T) => void",
        "required": false,
        "description": "Called with the selected value"
      },
      {
        "name": "size",
        "type": "SegmentedControlSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Segment density"
      },
      {
        "name": "color",
        "type": "SegmentedControlColor",
        "required": false,
        "default": "\"neutral\"",
        "description": "Thumb color"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Fills the width of the container (the segments always share the width equally)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks every segment"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of a hidden input carrying the value in a form"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the group"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id of the element labelling the group"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Root id"
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
        "description": "Ref to the root <div> (role=\"radiogroup\")"
      }
    ]
  },
  "SegmentedControlOptionObject": {
    "source": "react/src/components/SegmentedControl/types.ts",
    "description": "A segment of a SegmentedControl",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "T",
        "required": true,
        "description": "Value of the segment"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "default": "the value (unless an icon is given)",
        "description": "Visible label"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon shown before the label (alone for an icon-only segment)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks this segment"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible name; required for an icon-only segment"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

制御された値（value / onChange。値の型はジェネリック）。コントロールは radio セグメントからなる radiogroup で、タブストップは 1 つです。矢印キーで移動と選択（無効なセグメントはスキップし、端で折り返し）、Home / End で両端に移動します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/demos/basic.tsx

```tsx
import { useState } from "react";
import { SegmentedControl } from "minerva-design";

type View = "day" | "week" | "month";

export default function BasicDemo() {
  const [view, setView] = useState<View>("week");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <SegmentedControl<View>
        aria-label="Calendar view"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={view}
        onChange={setView}
      />
      <output>Showing the {view} view</output>
    </div>
  );
}

```

## Example: 色と無効化

neutral（既定）は控えめなトラック上に浮き上がったサムを、primary はプライマリカラーの塗りのサムを表示します。個々のセグメントまたはコントロール全体を無効化できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/demos/colors.tsx

```tsx
import { SegmentedControl } from "minerva-design";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System", disabled: true },
];

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Theme (neutral)"
        options={options}
        defaultValue="light"
      />
      <SegmentedControl
        color="primary"
        aria-label="Theme (primary)"
        options={options}
        defaultValue="dark"
      />
      <SegmentedControl
        disabled
        aria-label="Theme (disabled)"
        options={options}
        defaultValue="light"
      />
    </div>
  );
}

```

## Example: 全幅

fullWidth はコントロールをコンテナいっぱいに広げます。セグメントは常に幅を均等に分け合います。name を指定すると隠し入力が追加され、値がフォームと一緒に送信されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/demos/full-width.tsx

```tsx
import { SegmentedControl } from "minerva-design";

export default function FullWidthDemo() {
  return (
    <form
      style={{ display: "grid", gap: 12, maxWidth: 420 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <SegmentedControl
        fullWidth
        name="billing"
        aria-label="Billing period"
        defaultValue="yearly"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly (−20%)" },
        ]}
      />
      <SegmentedControl
        fullWidth
        aria-label="Status filter"
        defaultValue="all"
        options={["all", "open", "closed", "archived"]}
      />
    </form>
  );
}

```

## Example: アイコン

オプションはラベルの横にアイコンを表示することも、アイコンのみにすることもできます。アイコンのみのセグメントには aria-label が必要です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/demos/icons.tsx

```tsx
import { LuGrid2X2, LuList, LuMap } from "react-icons/lu";
import { SegmentedControl } from "minerva-design";

export default function IconsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Layout"
        defaultValue="list"
        options={[
          { value: "list", label: "List", icon: <LuList /> },
          { value: "grid", label: "Grid", icon: <LuGrid2X2 /> },
          { value: "map", label: "Map", icon: <LuMap /> },
        ]}
      />
      {/* Icon-only segments need an aria-label */}
      <SegmentedControl
        aria-label="Layout (compact)"
        defaultValue="grid"
        options={[
          { value: "list", icon: <LuList />, "aria-label": "List" },
          { value: "grid", icon: <LuGrid2X2 />, "aria-label": "Grid" },
          { value: "map", icon: <LuMap />, "aria-label": "Map" },
        ]}
      />
    </div>
  );
}

```

## Example: サイズ

コントロールの高さに従う 3 つの密度。文字列のオプションは値とラベルを兼ねます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/segmented-control/demos/sizes.tsx

```tsx
import { SegmentedControl } from "minerva-design";

const options = ["Daily", "Weekly", "Monthly"];

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        size="small"
        aria-label="Small"
        options={options}
        defaultValue="Daily"
      />
      <SegmentedControl
        aria-label="Medium"
        options={options}
        defaultValue="Weekly"
      />
      <SegmentedControl
        size="large"
        aria-label="Large"
        options={options}
        defaultValue="Monthly"
      />
    </div>
  );
}

```
