# ProgressIndicator

Indique une progression : une progressbar indéterminée dessinée en spinner, cercle, vague, barre ou barre pointillée, ou — avec value — une barre ou un cercle déterminés.

Package: minerva-design@1.20.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ProgressIndicator"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "enum",
    "values": [
      "bar",
      "circle",
      "dottedBar",
      "spinner",
      "wave"
    ],
    "typeText": "ProgressIndicatorVariant | undefined",
    "typeRef": "type:7fb5a81e7711413428d7",
    "default": "spinner",
    "required": false,
    "description": "Indicator style"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "ProgressIndicatorSize | undefined",
    "typeRef": "type:e3c1daca1f6db59cd072",
    "default": "medium",
    "required": false,
    "description": "Indicator size"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "enum",
    "values": [
      "current",
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ProgressIndicatorColor | undefined",
    "typeRef": "type:a5bd80331c1ba22d93b9",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the indicator: theme primary, neutral gray or a status color (success / warning / danger / info). \"current\" is a special value that follows the surrounding text color (currentColor), e.g. inside buttons or colored containers"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Current progress. Setting it switches the bar and circle variants to determinate mode (a filled bar / arc and aria-valuenow); the value is clamped between 0 and max. Other variants ignore it and stay indeterminate."
  },
  {
    "name": "max",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Value that represents completion (determinate mode only); non-positive values fall back to 100"
  },
  {
    "name": "showValue",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the formatted value (a percentage by default) next to a determinate indicator"
  },
  {
    "name": "format",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "node",
    "typeText": "((value: number, max: number) => ReactNode) | undefined",
    "typeRef": "type:3706ad0737496d4ab37b",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "max",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Formats the value shown by showValue; a string or number result is also used as aria-valuetext"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the indicator"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible text shown next to the indicator; it also names the progressbar unless aria-label is set"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label describing what is loading (used when there is no visible label)"
  },
  {
    "name": "decorative",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Purely visual: drops the progressbar role and hides the indicator from assistive technologies. Use it when a surrounding element (a status region, a busy button) already conveys the loading state."
  },
  {
    "name": "width",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Custom width (ignored when full is set). Bars default to 200px; round indicators size to their content."
  },
  {
    "name": "full",
    "source": "packages/react/src/components/ProgressIndicator/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the indicator to the full width of its container"
  }
]
```

## API

```json
{
  "ProgressIndicatorProps": {
    "source": "react/src/components/ProgressIndicator/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"color\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "ProgressIndicatorVariant",
        "required": false,
        "default": "\"spinner\"",
        "description": "Indicator style"
      },
      {
        "name": "size",
        "type": "ProgressIndicatorSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Indicator size"
      },
      {
        "name": "color",
        "type": "ProgressIndicatorColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the indicator: theme primary, neutral gray or a status color (success / warning / danger / info). \"current\" is a special value that follows the surrounding text color (currentColor), e.g. inside buttons or colored containers"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Current progress. Setting it switches the bar and circle variants to determinate mode (a filled bar / arc and aria-valuenow); the value is clamped between 0 and max. Other variants ignore it and stay indeterminate."
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Value that represents completion (determinate mode only); non-positive values fall back to 100"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the formatted value (a percentage by default) next to a determinate indicator"
      },
      {
        "name": "format",
        "type": "(value: number, max: number) => ReactNode",
        "required": false,
        "default": "(value, max) => `${Math.round((value / max) * 100)}%`",
        "description": "Formats the value shown by showValue; a string or number result is also used as aria-valuetext"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the indicator"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Visible text shown next to the indicator; it also names the progressbar unless aria-label is set"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Loading\" (localized; \"Progress\" in determinate mode)",
        "description": "Accessible label describing what is loading (used when there is no visible label)"
      },
      {
        "name": "decorative",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Purely visual: drops the progressbar role and hides the indicator from assistive technologies. Use it when a surrounding element (a status region, a busy button) already conveys the loading state."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "width",
        "type": "string",
        "required": false,
        "description": "Custom width (ignored when full is set). Bars default to 200px; round indicators size to their content."
      },
      {
        "name": "full",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stretches the indicator to the full width of its container"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Couleurs

Couleur sémantique : primary (par défaut), neutral ou une couleur d’état (success, warning, danger, info) ; la valeur spéciale current suit la couleur du texte environnant (currentColor), par exemple dans un bouton.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/colors.tsx

```tsx
import { ProgressIndicator } from "minerva-design";

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <ProgressIndicator aria-label="Loading" />
      <ProgressIndicator color="neutral" aria-label="Refreshing" />
      <span style={{ color: "var(--success-color)" }}>
        <ProgressIndicator color="current" aria-label="Saving" />
      </span>
    </div>
  );
}

```

## Example: Déterminé

Définissez value (et éventuellement max) pour remplir la barre ou le cercle et exposer aria-valuenow ; showValue affiche un pourcentage, format le personnalise. Les couleurs d’état (success, warning, danger, info) traduisent l’état. Les autres variantes ignorent value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/determinate.tsx

```tsx
import { useState } from "react";
import { Button, ProgressIndicator } from "minerva-design";

export default function DeterminateDemo() {
  const [lessons, setLessons] = useState(2);
  return (
    <div style={{ display: "grid", gap: 20, width: "100%" }}>
      <ProgressIndicator
        variant="bar"
        full
        value={lessons}
        max={5}
        showValue
        format={(value, max) => `${value} / ${max}`}
        label="Lessons completed"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
        }}
      >
        <ProgressIndicator
          variant="circle"
          size="xlarge"
          value={(lessons / 5) * 100}
          showValue
          aria-label="Course progress"
        />
        <ProgressIndicator
          variant="bar"
          color="success"
          value={100}
          showValue
          aria-label="Done"
        />
        <ProgressIndicator
          variant="bar"
          color="warning"
          value={60}
          showValue
          aria-label="Due soon"
        />
        <ProgressIndicator
          variant="bar"
          color="danger"
          value={15}
          showValue
          aria-label="Overdue"
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          disabled={lessons === 0}
          onClick={() => setLessons((n) => Math.max(0, n - 1))}
        >
          Undo lesson
        </Button>
        <Button
          size="small"
          disabled={lessons === 5}
          onClick={() => setLessons((n) => Math.min(5, n + 1))}
        >
          Complete lesson
        </Button>
      </div>
    </div>
  );
}

```

## Example: Libellé visible

Un libellé visible s’affiche à côté de l’indicateur et nomme la progressbar.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/label.tsx

```tsx
import { ProgressIndicator } from "minerva-design";

export default function LabelDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator size="small" label="Syncing contacts…" />
      <ProgressIndicator variant="bar" full label="Uploading report.pdf" />
    </div>
  );
}

```

## Example: Tailles

Cinq tailles de xsmall à xlarge : le diamètre des indicateurs ronds ou l’épaisseur des barres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/sizes.tsx

```tsx
import { ProgressIndicator } from "minerva-design";

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {sizes.map((size) => (
          <ProgressIndicator key={size} size={size} aria-label="Loading" />
        ))}
      </div>
      {sizes.map((size) => (
        <ProgressIndicator
          key={size}
          variant="bar"
          size={size}
          full
          aria-label="Loading"
        />
      ))}
    </div>
  );
}

```

## Example: Variantes

variant choisit le style : spinner (par défaut), cercle, vague, barre ou barre pointillée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/variants.tsx

```tsx
import { ProgressIndicator } from "minerva-design";

const variants = ["spinner", "circle", "wave", "bar", "dottedBar"] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      {variants.map((variant) => (
        <ProgressIndicator
          key={variant}
          variant={variant}
          aria-label={`Loading (${variant})`}
        />
      ))}
    </div>
  );
}

```

## Example: Largeur

Définissez une largeur fixe, ou utilisez full pour remplir le conteneur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/width.tsx

```tsx
import { ProgressIndicator } from "minerva-design";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator variant="bar" width="160px" aria-label="Loading" />
      <ProgressIndicator variant="bar" full aria-label="Loading" />
      <ProgressIndicator variant="dottedBar" full aria-label="Loading" />
    </div>
  );
}

```

## Example: Avec icône

Affichez une icône avant l’indicateur. Décrivez toujours ce qui est en cours de chargement avec aria-label.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/progress/demos/with-icon.tsx

```tsx
import { ProgressIndicator } from "minerva-design";
import { FiUploadCloud } from "react-icons/fi";

export default function WithIconDemo() {
  return (
    <ProgressIndicator
      variant="bar"
      icon={<FiUploadCloud />}
      aria-label="Uploading files"
    />
  );
}

```
