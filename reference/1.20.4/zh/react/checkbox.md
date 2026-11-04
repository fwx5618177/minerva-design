# Checkbox 复选框

允许用户选择一个或多个选项，支持半选、错误状态和自定义样式。

Package: minerva-design@1.20.4

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Checkbox

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Checkbox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Checked state (controlled)"
  },
  {
    "name": "defaultChecked",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial checked state (uncontrolled)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the checkbox. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "indeterminate",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the indeterminate (partially checked) state. Controlled: it stays applied until this prop changes, also after the user clicks"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the input, used in forms"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | \"rounded\" | undefined",
    "typeRef": "type:76849e9a145c5140e0b1",
    "default": "square",
    "required": false,
    "description": "Box shape"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Checkbox/types.ts",
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
    "description": "Checkbox size"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label content"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
    "typeRef": "type:55b92b1f55ce64573a84",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the checked / indeterminate box. For a custom look, set the CSS custom properties `--checkbox-checked-color`, `--checkbox-checkmark-color`, `--checkbox-box-color` and `--checkbox-border-color` on `className` or an ancestor"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the input (defaults to the enclosing FormControl's id)"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value submitted with the form when checked"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids of elements describing the checkbox (aria-describedby)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label, required when there is no visible label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the checkbox"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon shown when checked"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the input as required (inherited from an enclosing FormControl)"
  },
  {
    "name": "error",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)"
  },
  {
    "name": "errorIcon",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon shown before the helper text in the error state"
  },
  {
    "name": "helperText",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Helper or error text shown below the checkbox (linked with aria-describedby)"
  },
  {
    "name": "labelPlacement",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "end",
      "start",
      "top"
    ],
    "typeText": "\"start\" | \"end\" | \"top\" | \"bottom\" | undefined",
    "typeRef": "type:836915cb975032a1441f",
    "default": "end",
    "required": false,
    "description": "Position of the label relative to the box"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Checkbox/types.ts",
    "kind": "function",
    "typeText": "((checked: boolean, event: ChangeEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:6383d02ea10e84017bd2",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "event",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLInputElement, Element>",
        "typeRef": "type:2c785b2d98c38377d501"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new checked state and the change event"
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
  "CheckboxProps": {
    "source": "react/src/components/Checkbox/types.ts",
    "description": "`className`, `style` and `data-*` attributes go to the <label> wrapping the box; `id`, `name` and `aria-*` go to the native <input>.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Checked state (controlled)"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the checkbox. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the indeterminate (partially checked) state. Controlled: it stays applied until this prop changes, also after the user clicks"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the input, used in forms"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called with the new checked state and the change event"
      },
      {
        "name": "shape",
        "type": "\"square\" | \"circle\" | \"rounded\"",
        "required": false,
        "default": "\"square\"",
        "description": "Box shape"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Checkbox size"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content (alternative to `label`; used when `label` is not set)"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"success\" | \"info\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the checked / indeterminate box. For a custom look, set the CSS custom properties `--checkbox-checked-color`, `--checkbox-checkmark-color`, `--checkbox-box-color` and `--checkbox-border-color` on `className` or an ancestor"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the input (defaults to the enclosing FormControl's id)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value submitted with the form when checked"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids of elements describing the checkbox (aria-describedby)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label, required when there is no visible label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the checkbox"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name of the label element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the label element"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom icon shown when checked"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the input as required (inherited from an enclosing FormControl)"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the error state (also set by an invalid enclosing FormControl)"
      },
      {
        "name": "errorIcon",
        "type": "React.ReactNode",
        "required": false,
        "default": "a filled info-circle icon",
        "description": "Icon shown before the helper text in the error state"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Helper or error text shown below the checkbox (linked with aria-describedby)"
      },
      {
        "name": "labelPlacement",
        "type": "\"start\" | \"end\" | \"top\" | \"bottom\"",
        "required": false,
        "default": "\"end\"",
        "description": "Position of the label relative to the box"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the underlying <input> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Checkbox": {
    "kind": "cssVars",
    "source": "react/src/components/Checkbox",
    "vars": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

Remember me 初始未选中，Checked by default 初始选中；两个选项独立切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/basic.tsx

```tsx
import { Checkbox } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Checkbox label="Remember me" />
      <Checkbox label="Checked by default" defaultChecked />
    </>
  );
}

```

## Example: 颜色与 FormControl

color 设置选中时的语义色（primary、success、info、warning 或 danger）；children 可作为标签。在 FormControl 中会自动获取 id、描述、无效、必填与禁用状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/colors-and-form-control.tsx

```tsx
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "minerva-design";

export default function ColorsAndFormControlDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Checkbox defaultChecked>Primary</Checkbox>
        <Checkbox color="success" defaultChecked>
          Success
        </Checkbox>
        <Checkbox color="info" defaultChecked>
          Info
        </Checkbox>
        <Checkbox color="warning" defaultChecked>
          Warning
        </Checkbox>
        <Checkbox color="danger" defaultChecked>
          Danger
        </Checkbox>
      </div>
      <FormControl invalid required>
        <FormLabel>Terms</FormLabel>
        <Checkbox>I accept the terms</Checkbox>
        <FormErrorMessage>You must accept the terms</FormErrorMessage>
      </FormControl>
    </div>
  );
}

```

## Example: 受控模式

订阅选项初始选中；切换后，下方同步显示订阅状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Checkbox } from "minerva-design";

export default function ControlledDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Checkbox
        label="Subscribe to the newsletter"
        checked={checked}
        onChange={setChecked}
      />
      <span>{checked ? "Subscribed" : "Not subscribed"}</span>
    </>
  );
}

```

## Example: 自定义样式

通过 CSS 自定义属性 --checkbox-checked-color、--checkbox-checkmark-color、--checkbox-box-color 和 --checkbox-border-color（设置在 className 或祖先元素上）改变方框颜色，或在选中时显示自定义图标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/custom-style.tsx

```tsx
import type { CSSProperties } from "react";
import { Checkbox } from "minerva-design";
import { IoHeart } from "react-icons/io5";

// The --checkbox-* custom properties recolor the box; set them on className
// or on any ancestor (here an inline style on the wrapper).
const violet = {
  "--checkbox-checked-color": "#7c3aed",
  "--checkbox-checkmark-color": "#fde68a",
  "--checkbox-border-color": "#7c3aed",
} as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <>
      <span style={violet}>
        <Checkbox label="Custom colors" defaultChecked />
      </span>
      <Checkbox
        label="Custom icon"
        defaultChecked
        icon={<IoHeart color="#e11d48" />}
      />
    </>
  );
}

```

## Example: 错误状态

error 配合 helperText 突出显示需要处理的复选框。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/error.tsx

```tsx
import { useState } from "react";
import { Checkbox } from "minerva-design";

export default function ErrorDemo() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={setAccepted}
      error={!accepted}
      helperText={
        accepted ? "Thanks!" : "You must accept the terms to continue"
      }
    />
  );
}

```

## Example: 半选状态

初始仅选中 Apple，全选框显示部分选中；点击全选，再次点击清空。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/indeterminate.tsx

```tsx
import { useState } from "react";
import { Checkbox } from "minerva-design";

const fruits = ["Apple", "Banana", "Cherry"];

export default function IndeterminateDemo() {
  const [selected, setSelected] = useState<string[]>(["Apple"]);
  const allChecked = selected.length === fruits.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (fruit: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, fruit] : prev.filter((f) => f !== fruit),
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(checked) => setSelected(checked ? fruits : [])}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingLeft: 24,
        }}
      >
        {fruits.map((fruit) => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selected.includes(fruit)}
            onChange={(checked) => toggle(fruit, checked)}
          />
        ))}
      </div>
    </div>
  );
}

```

## Example: 标签位置

将标签放在方框的前面、后面（默认）、上方或下方。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/label-placement.tsx

```tsx
import { Checkbox } from "minerva-design";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Checkbox
          key={placement}
          label={placement}
          labelPlacement={placement}
        />
      ))}
    </>
  );
}

```

## Example: 尺寸与形状

三种尺寸和三种方框形状：square（默认）、rounded 和 circle。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/sizes-and-shapes.tsx

```tsx
import { Checkbox } from "minerva-design";

export default function SizesAndShapesDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Checkbox label="Small" size="small" defaultChecked />
        <Checkbox label="Medium" size="medium" defaultChecked />
        <Checkbox label="Large" size="large" defaultChecked />
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Checkbox label="Square" shape="square" defaultChecked />
        <Checkbox label="Rounded" shape="rounded" defaultChecked />
        <Checkbox label="Circle" shape="circle" defaultChecked />
      </div>
    </div>
  );
}

```

## Example: 状态

禁用的复选框，以及用于原生表单的 required。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/checkbox/demos/states.tsx

```tsx
import { Checkbox } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
      <Checkbox label="Required" name="terms" required />
    </>
  );
}

```
