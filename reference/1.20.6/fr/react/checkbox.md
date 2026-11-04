# Checkbox

Permet de sélectionner une ou plusieurs options, avec prise en charge de l'état indéterminé, des erreurs et des styles personnalisés.

Package: minerva-design@1.20.6

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

## Example: Utilisation de base

Remember me est décoché au départ, Checked by default est coché. Chaque case se modifie indépendamment.

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

## Example: Couleurs et FormControl

color définit la couleur sémantique cochée (primary, success, info, warning ou danger) ; children peut servir de libellé. Dans un FormControl, la case reprend l’id, la description et les états invalide, requis et désactivé.

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

## Example: Contrôlé

L’abonnement est actif au départ. La case met à jour le statut affiché dessous.

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

## Example: Style personnalisé

Recolorez la case avec les propriétés personnalisées CSS --checkbox-checked-color, --checkbox-checkmark-color, --checkbox-box-color et --checkbox-border-color (sur className ou un ancêtre), ou affichez une icône personnalisée lorsque la case est cochée.

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

## Example: État d'erreur

error avec helperText met en évidence une case qui nécessite une action.

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

## Example: Indéterminé

Seule Apple est cochée au départ. Select all coche tous les fruits, puis les décoche au clic suivant.

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

## Example: Position du libellé

Placez le libellé avant, après (par défaut), au-dessus ou au-dessous de la case.

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

## Example: Tailles et formes

Trois tailles et trois formes de case : square (par défaut), rounded et circle.

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

## Example: États

Cases désactivées, et required pour une utilisation dans les formulaires natifs.

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
