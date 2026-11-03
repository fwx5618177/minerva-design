# Input 输入框

单行文本输入框，支持尺寸、变体、前后缀内容、清除按钮、字数统计和密码显隐切换。放在 FormField 中即可获得标签、帮助文本和错误信息。

Package: minerva-design@1.20.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Input

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Input"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "enum",
    "values": [
      "filled",
      "outline",
      "unstyled"
    ],
    "typeText": "InputVariant | undefined",
    "typeRef": "type:96aed16188fe02a9be4b",
    "default": "outline",
    "required": false,
    "description": "Visual style"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "InputSize | undefined",
    "typeRef": "type:c0077139c9326e9e701f",
    "default": "medium",
    "required": false,
    "description": "Height and font size"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state (also set by an invalid FormControl); sets aria-invalid"
  },
  {
    "name": "prefix",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content before the text, e.g. an icon or \"@\""
  },
  {
    "name": "suffix",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content after the text, e.g. a unit, an icon or a button"
  },
  {
    "name": "clearable",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a clear button while the field has a value (not when disabled or read-only). Clearing fires onChange with an empty value and keeps focus in the field"
  },
  {
    "name": "clearLabel",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the clear button"
  },
  {
    "name": "showCharCount",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of characters (and maxLength, when set) after the text; the count is linked to the input with aria-describedby"
  },
  {
    "name": "showPasswordLabel",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the password visibility toggle (shown for type=\"password\") while the password is hidden"
  },
  {
    "name": "hidePasswordLabel",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the password visibility toggle while the password is visible"
  },
  {
    "name": "defaultValue",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | readonly string[] | undefined",
    "typeRef": "type:9d6f4fff8ef3f096d001",
    "required": false
  },
  {
    "name": "defaultChecked",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "autoFocus",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Identifies the element (or elements) that describes the object."
  },
  {
    "name": "aria-label",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Defines a string value that labels the current element."
  },
  {
    "name": "form",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "name",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "type",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "HTMLInputTypeAttribute | undefined",
    "typeRef": "type:bbb5e1f3decad2fa5436",
    "required": false
  },
  {
    "name": "value",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | readonly string[] | undefined",
    "typeRef": "type:9d6f4fff8ef3f096d001",
    "required": false
  },
  {
    "name": "pattern",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accept",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "autoComplete",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "HTMLInputAutoCompleteAttribute | undefined",
    "typeRef": "type:097f18cefc39c00ec4f9",
    "required": false
  },
  {
    "name": "checked",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "max",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
  },
  {
    "name": "maxLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "min",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
  },
  {
    "name": "minLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "multiple",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "placeholder",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "readOnly",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "required",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "step",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onClear",
    "source": "packages/react/src/components/Input/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:01b20187ac55ab339d3b",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after the clear button emptied the field"
  },
  {
    "name": "onChange",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined",
    "typeRef": "type:1552faf6d0bf90372711",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLInputElement, HTMLInputElement>",
        "typeRef": "type:ec55ed1c03063de2a819"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onFocus",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:6284782b01edc0ec9aeb",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onBlur",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:6284782b01edc0ec9aeb",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onInput",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "InputEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:c45b6e80d6c8f01c0ae2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "InputEvent<HTMLInputElement>",
        "typeRef": "type:c0b0762b46fe28f4edad"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyDown",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:a829ca15387965668126",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLInputElement>",
        "typeRef": "type:bb2eb244cd23c9a1b2fa"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyUp",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:a829ca15387965668126",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLInputElement>",
        "typeRef": "type:bb2eb244cd23c9a1b2fa"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClick",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "MouseEventHandler<HTMLInputElement> | undefined",
    "typeRef": "type:e951285332632d910fc7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLInputElement, MouseEvent>",
        "typeRef": "type:69803e823cc5b5d06844"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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
  "InputProps": {
    "source": "react/src/components/Input/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<InputHTMLAttributes<HTMLInputElement>, \"size\" | \"prefix\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "InputVariant",
        "required": false,
        "default": "\"outline\"",
        "description": "Visual style"
      },
      {
        "name": "size",
        "type": "InputSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Height and font size"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state (also set by an invalid FormControl); sets aria-invalid"
      },
      {
        "name": "prefix",
        "type": "ReactNode",
        "required": false,
        "description": "Content before the text, e.g. an icon or \"@\""
      },
      {
        "name": "suffix",
        "type": "ReactNode",
        "required": false,
        "description": "Content after the text, e.g. a unit, an icon or a button"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a clear button while the field has a value (not when disabled or read-only). Clearing fires onChange with an empty value and keeps focus in the field"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "required": false,
        "description": "Called after the clear button emptied the field"
      },
      {
        "name": "clearLabel",
        "type": "string",
        "required": false,
        "default": "\"Clear\" (localized)",
        "description": "Accessible label of the clear button"
      },
      {
        "name": "showCharCount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the number of characters (and maxLength, when set) after the text; the count is linked to the input with aria-describedby"
      },
      {
        "name": "showPasswordLabel",
        "type": "string",
        "required": false,
        "default": "\"Show password\" (localized)",
        "description": "Accessible label of the password visibility toggle (shown for type=\"password\") while the password is hidden"
      },
      {
        "name": "hidePasswordLabel",
        "type": "string",
        "required": false,
        "default": "\"Hide password\" (localized)",
        "description": "Accessible label of the password visibility toggle while the password is visible"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class name of the outer wrapper (not the <input>)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React controlled project form](/minerva-design/reference/1.20.0/recipes/react-form/README.md) — react; verified package 1.20.0

## Example: 前缀与后缀

图标、符号或单位等装饰内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/addons.tsx

```tsx
import { Input } from "minerva-design";
import { LuSearch } from "react-icons/lu";

export default function AddonsDemo() {
  return (
    <>
      <Input aria-label="Search" prefix={<LuSearch />} placeholder="Search" />
      <Input aria-label="Handle" prefix="@" defaultValue="minerva" />
      <Input aria-label="Price" prefix="$" suffix="USD" inputMode="decimal" />
    </>
  );
}

```

## Example: 基础用法

原生 input 属性与事件直接透传；className 作用于外层容器，ref 指向 <input>。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/basic.tsx

```tsx
import { Input } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input aria-label="Name" placeholder="Uncontrolled" />
      <Input
        aria-label="Controlled"
        placeholder="Controlled"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
}

```

## Example: 清除按钮与字数统计

clearable 会在有值时显示带标签的清除按钮；清除时以空值触发 onChange，并保持焦点在输入框中。showCharCount 显示字数（以及 maxLength），并与输入框关联。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/clearable-and-count.tsx

```tsx
import { Input } from "minerva-design";

export default function ClearableAndCountDemo() {
  return (
    <>
      <Input aria-label="Search" placeholder="Search" clearable />
      <Input
        aria-label="Short bio"
        defaultValue="Frontend developer"
        clearable
        showCharCount
        maxLength={40}
      />
    </>
  );
}

```

## Example: 密码

type="password" 会添加一个带本地化标签的显示 / 隐藏切换按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/password.tsx

```tsx
import { FormField, Input } from "minerva-design";
import { LuLock } from "react-icons/lu";

export default function PasswordDemo() {
  return (
    <FormField label="Password" helperText="At least 8 characters.">
      <Input
        type="password"
        prefix={<LuLock />}
        autoComplete="new-password"
        minLength={8}
      />
    </FormField>
  );
}

```

## Example: 尺寸与变体

三种尺寸以及 outline、filled、unstyled 变体。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/sizes-variants.tsx

```tsx
import { Input } from "minerva-design";

export default function SizesVariantsDemo() {
  return (
    <>
      <Input aria-label="Small" size="small" placeholder="small" />
      <Input aria-label="Medium" placeholder="medium (outline)" />
      <Input aria-label="Large" size="large" placeholder="large" />
      <Input aria-label="Filled" variant="filled" placeholder="filled" />
      <Input aria-label="Unstyled" variant="unstyled" placeholder="unstyled" />
    </>
  );
}

```

## Example: 状态

invalid、disabled 和 readOnly；在 FormField 内会继承状态。 只读字段统一使用 --readonly-surface-color，保持正常文字对比度，并可聚焦、选择和复制内容；隐藏编辑入口，错误边界仍然保留。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/states.tsx

```tsx
import { FormField, Input } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Input aria-label="Invalid" invalid defaultValue="Invalid" />
      <Input aria-label="Disabled" disabled defaultValue="Disabled" />
      <Input aria-label="Read-only" readOnly defaultValue="Project Atlas" />
      <FormField label="Inside a FormField" errorMessage="Inherits the error">
        <Input />
      </FormField>
    </>
  );
}

```

## Example: 校验

提交时校验，并通过 FormField 的 errorMessage 显示错误信息：输入框进入无效状态，并由该信息描述。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/input/demos/validation.tsx

```tsx
import { useState } from "react";
import { Button, FormField, Input } from "minerva-design";

export default function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  const submit = () => {
    setError(
      /^\S+@\S+\.\S+$/.test(email)
        ? undefined
        : "Please enter a valid email address",
    );
  };

  return (
    <>
      <FormField label="Email" errorMessage={error} required>
        <Input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(undefined);
          }}
          onKeyDown={(event) => event.key === "Enter" && submit()}
        />
      </FormField>
      <Button onClick={submit}>Submit</Button>
    </>
  );
}

```
