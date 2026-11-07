# Slider スライダー

トラックに沿ってドラッグして数値を、または 2 つのつまみで範囲を選択します。ステップや目盛り、値ラベルとツールチップに対応し、ユーザーが指を離したときに別のイベントを発火します。

Package: minerva-design@1.22.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: beta

Native Angular: MnSlider. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSlider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "SliderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "SliderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "range",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "min",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "step",
    "typeText": "number | null",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "marks",
    "typeText": "boolean | SliderMark[]",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "snapToMarks",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "size",
    "typeText": "SliderSize",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "color",
    "typeText": "SliderColor",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "formatValue",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "orientation",
    "typeText": "SliderOrientation",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  },
  {
    "name": "getAriaValueText",
    "typeText": "((value: number, index: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "SliderValue",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "changeEnd",
    "typeText": "SliderValue",
    "required": false,
    "source": "packages/angular/src/components/slider/slider.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## CSS variables

```json
{
  "css:Slider": {
    "kind": "cssVars",
    "source": "react/src/components/Slider",
    "vars": [
      {
        "name": "--slider-accent",
        "description": "Color of the filled track and of the thumb border (defaults to the color prop's accent)"
      },
      {
        "name": "--slider-rail-color",
        "description": "Background of the empty track"
      },
      {
        "name": "--slider-thumb-color",
        "description": "Background of the thumbs"
      },
      {
        "name": "--slider-track-height",
        "description": "Thickness of the track (every size)"
      },
      {
        "name": "--slider-thumb-size",
        "description": "Width and height of the thumbs (every size)"
      },
      {
        "name": "--slider-length",
        "description": "Length of a vertical slider"
      },
      {
        "name": "--slider-min-length",
        "description": "Smallest length of a horizontal track, like the intrinsic size of a native range input (defaults to 10rem)"
      },
      {
        "name": "--slider-gap",
        "description": "Space between the track and the value label"
      },
      {
        "name": "--slider-value-font-size",
        "description": "Font size of the value label and of the mark labels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Pick a value

[(value)] follows the drag and the keys; (changeEnd) fires once on release (or after a key press): save there. Arrows step, PageUp / PageDown move by 10%, Home / End jump to the bounds.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSlider } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSlider],
  template: `
<mn-slider aria-label="Volume" [(value)]="volume" (changeEnd)="saved = $event" showValue tooltip/><output>Saved on release: {{saved}}</output>
  `,
})
export class Example {
  volume: import('minerva-design/angular').SliderValue = 40;
  saved: import('minerva-design/angular').SliderValue = 40;
}

```

## Example: Range and marks

range selects [start, end] with two thumbs that cannot cross; [marks]="true" draws a tick per step.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSlider } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSlider],
  template: `
<mn-slider aria-label="Price" range [(value)]="price" [step]="10" [marks]="true" color="success"/><output>{{price}}</output>
  `,
})
export class Example {
  price: import('minerva-design/angular').SliderValue = [20, 80];
}

```

## Example: Sizes, disabled and read-only

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSlider } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSlider],
  template: `
<mn-slider aria-label="Small" size="small" [defaultValue]="30"/><mn-slider aria-label="Large" size="large" color="warning" [defaultValue]="70"/><mn-slider aria-label="Disabled" disabled [defaultValue]="40"/><mn-slider aria-label="Read only" readOnly [defaultValue]="60" showValue/>
  `,
})
export class Example {

}

```
