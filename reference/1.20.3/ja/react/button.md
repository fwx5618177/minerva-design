# Button ボタン

フォーム送信やダイアログを開くなど、アクションやイベントを実行します。

Package: minerva-design@1.20.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Button"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "type",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "enum",
    "values": [
      "button",
      "reset",
      "submit"
    ],
    "typeText": "\"button\" | \"submit\" | \"reset\" | undefined",
    "typeRef": "type:212fa332b39b336d0842",
    "default": "button",
    "required": false,
    "description": "Native button type. Defaults to \"button\" (unlike the HTML default \"submit\"), so a Button in a form never submits it by accident: use `type=\"submit\"` for submit buttons and `\"reset\"` for reset buttons"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ColorScheme | undefined",
    "typeRef": "type:67f905b25ade366da2d8",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "enum",
    "values": [
      "ghost",
      "link",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"link\" | \"ghost\" | undefined",
    "typeRef": "type:94370cdec6c327cad42c",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent until hovered) or `link` (text link look)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\" | undefined",
    "typeRef": "type:39b57548678a1a395d43",
    "default": "medium",
    "required": false,
    "description": "Button size"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label, required when the button only contains an icon"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner and blocks activation (aria-busy / aria-disabled). The button stays focusable so keyboard focus is not lost"
  },
  {
    "name": "loadingText",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown instead of the content (and icons) while loading"
  },
  {
    "name": "startIcon",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon rendered before the content (hidden from assistive technologies by the caller)"
  },
  {
    "name": "endIcon",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon rendered after the content"
  },
  {
    "name": "fullWidth",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the button to the full width of its container"
  },
  {
    "name": "active",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the button in its pressed/active state"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | \"rounded\" | undefined",
    "typeRef": "type:76849e9a145c5140e0b1",
    "required": false,
    "description": "Preset shape of the button"
  },
  {
    "name": "borderRadius",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "union",
    "typeText": "number | \"circle\" | \"square\" | \"small\" | \"medium\" | \"large\" | \"none\" | undefined",
    "typeRef": "type:f5b966cc4d173931d815",
    "required": false,
    "description": "Corner radius: a preset or a number of pixels. The theme radius (`--radius-md`) is used when omitted"
  }
]
```

### events

```json
[
  {
    "name": "onClick",
    "source": "packages/react/src/components/Button/types.ts",
    "kind": "function",
    "typeText": "((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:16ad5c8e1c8f1524da71",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLButtonElement, MouseEvent>",
        "typeRef": "type:fecbcb60a5c2a879de00"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the button is clicked (not called while disabled)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "ButtonProps": {
    "source": "react/src/components/Button/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"children\" | \"color\">"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "required": false,
        "default": "\"button\"",
        "description": "Native button type. Defaults to \"button\" (unlike the HTML default \"submit\"), so a Button in a form never submits it by accident: use `type=\"submit\"` for submit buttons and `\"reset\"` for reset buttons"
      },
      {
        "name": "onClick",
        "type": "(event: React.MouseEvent<HTMLButtonElement>) => void",
        "required": false,
        "description": "Called when the button is clicked (not called while disabled)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Button content"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the button"
      },
      {
        "name": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\" | \"link\"",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent until hovered) or `link` (text link look)"
      },
      {
        "name": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Button size"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label, required when the button only contains an icon"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the button"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner and blocks activation (aria-busy / aria-disabled). The button stays focusable so keyboard focus is not lost"
      },
      {
        "name": "loadingText",
        "type": "React.ReactNode",
        "required": false,
        "description": "Text shown instead of the content (and icons) while loading"
      },
      {
        "name": "startIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon rendered before the content (hidden from assistive technologies by the caller)"
      },
      {
        "name": "endIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon rendered after the content"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stretches the button to the full width of its container"
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the button in its pressed/active state"
      },
      {
        "name": "shape",
        "type": "\"square\" | \"rounded\" | \"circle\"",
        "required": false,
        "description": "Preset shape of the button"
      },
      {
        "name": "borderRadius",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | \"circle\" | \"square\" | number",
        "required": false,
        "description": "Corner radius: a preset or a number of pixels. The theme radius (`--radius-md`) is used when omitted"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the <button> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React controlled project form](/minerva-design/reference/1.20.3/recipes/react-form/README.md) — react; verified package 1.20.3

## Example: 基本的な使い方

ボタンを押すたびに表示される回数が 1 増えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/basic.tsx

```tsx
import { useState } from "react";
import { Button, HStack } from "minerva-design";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} wrap>
      <Button onClick={() => setCount((value) => value + 1)}>Click me</Button>
      <output aria-live="polite">Clicked {count} times</output>
    </HStack>
  );
}

```

## Example: カラー

color でセマンティックカラーを指定します：primary（デフォルト）、neutral、success、warning、danger、info。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/colors.tsx

```tsx
import { Button } from "minerva-design";

export default function ColorsDemo() {
  return (
    <>
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
    </>
  );
}

```

## Example: フォーム内の type

Button の既定は type="button" なので、<form> 内のボタン（プレビュー、行の追加、ダイアログを開くなど）が誤ってフォームを送信することはありません。送信ボタンには type="submit"、リセットには type="reset" を明示してください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/form.tsx

```tsx
import { useState } from "react";
import { Button, Input } from "minerva-design";

export default function FormDemo() {
  const [log, setLog] = useState("Nothing yet");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = new FormData(event.currentTarget).get("title");
        setLog(`Submitted "${String(title)}"`);
      }}
      onReset={() => setLog("Reset")}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Input name="title" aria-label="Title" defaultValue="Draft" />
      {/* No type: defaults to "button", so it never submits the form */}
      <Button
        color="neutral"
        variant="outline"
        onClick={() => setLog("Preview opened (form not submitted)")}
      >
        Preview
      </Button>
      <Button type="reset" color="neutral" variant="ghost">
        Reset
      </Button>
      <Button type="submit">Save</Button>
      <output style={{ flexBasis: "100%" }}>{log}</output>
    </form>
  );
}

```

## Example: アイコン・読み込みテキスト・全幅

startIcon / endIcon でラベルの前後にアイコンを表示し、loadingText は読み込み中に内容を置き換え、fullWidth でボタンを全幅にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/icons-loading.tsx

```tsx
import { useState } from "react";
import { Button } from "minerva-design";
import { IoAdd, IoArrowForward } from "react-icons/io5";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Button startIcon={<IoAdd aria-hidden />}>Add item</Button>
      <Button variant="outline" endIcon={<IoArrowForward aria-hidden />}>
        Continue
      </Button>
      <Button
        color="success"
        fullWidth
        loading={saving}
        loadingText="Saving..."
        onClick={save}
      >
        Save
      </Button>
    </div>
  );
}

```

## Example: 形状と角丸

プリセットの形状、または borderRadius のプリセット / ピクセル値で角丸を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/shapes.tsx

```tsx
import { Button } from "minerva-design";

export default function ShapesDemo() {
  return (
    <>
      <Button shape="square">Square</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="circle" aria-label="Add">
        +
      </Button>
      <Button borderRadius="none">No radius</Button>
      <Button borderRadius={12}>12px radius</Button>
    </>
  );
}

```

## Example: サイズ

xsmall、small、medium（デフォルト）、large、xlarge の 5 種類。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/sizes.tsx

```tsx
import { Button } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Button size="xsmall">XSmall</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>
    </>
  );
}

```

## Example: 状態

読み込み中・無効・アクティブ状態。読み込み中は処理の実行中にクリック（およびフォーム送信）をブロックしますが、キーボードフォーカスはボタンに残ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/states.tsx

```tsx
import { useState } from "react";
import { Button } from "minerva-design";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <Button loading={loading} onClick={save}>
        {loading ? "Saving…" : "Save"}
      </Button>
      <Button disabled>Disabled</Button>
      <Button active>Active</Button>
    </>
  );
}

```

## Example: バリアント

variant で見た目のスタイルを指定します：solid（デフォルト）、outline、ghost、link。どの色とも組み合わせられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/variants.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";

const variants = ["solid", "outline", "ghost", "link"] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {(["primary", "neutral", "danger"] as const).map((color) => (
        <HStack key={color} gap={2} wrap>
          {variants.map((variant) => (
            <Button key={variant} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

```

## Example: アイコン付き

startIcon / endIcon でテキストとアイコンを組み合わせます（例：danger の再試行ボタン、neutral の ghost の戻るボタン）。アイコンのみのボタンには aria-label を指定してください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/button/demos/with-icon.tsx

```tsx
import { Button } from "minerva-design";
import { IoAdd, IoArrowBack, IoRefresh, IoTrash } from "react-icons/io5";

export default function WithIconDemo() {
  return (
    <>
      <Button startIcon={<IoAdd aria-hidden />}>Add</Button>
      <Button color="danger" startIcon={<IoRefresh aria-hidden />}>
        Retry
      </Button>
      <Button
        color="neutral"
        variant="ghost"
        startIcon={<IoArrowBack aria-hidden />}
      >
        Back
      </Button>
      <Button color="danger" variant="outline" aria-label="Delete item">
        <IoTrash aria-hidden />
      </Button>
    </>
  );
}

```
