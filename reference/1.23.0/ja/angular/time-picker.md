# TimePicker 時刻選択

時・分・秒の列から時刻を選択するか、直接入力します。

Package: minerva-design@1.23.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### キーボードとアクセシビリティ

入力欄で下矢印キーを押すとパネルが開きます。外側をクリックすると閉じます。

各列（時・分・秒・午前/午後）は listbox です。上下矢印キー、Home、End で列内を移動し、左右矢印キーで列を切り替えます。

Enter または Space でフォーカス中の選択肢を選びます。

Escape でパネルを閉じてフォーカスを入力欄に戻します。最後の列で Tab を押すとパネルが閉じて次のフィールドへ、最初の列で Shift+Tab を押すとパネルが閉じて入力欄に戻ります。

入力したテキストは、完全で有効な時刻になったときだけ確定されます。フォーカスが外れると緩やかな解析が行われ、空のテキストは値をクリアし、解析できないテキストは元の値に戻ります。

## TimePicker

Support: beta

Native Angular: MnTimePicker. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "Date | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "Date | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "format",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "size",
    "typeText": "TimePickerSize",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "minTime",
    "typeText": "Date | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "maxTime",
    "typeText": "Date | undefined",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "showSecond",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/time-picker/time-picker.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "Date | null | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
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

## Example: Choose a time

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimePicker],
  template: `
<mn-time-picker label="Start time" [(value)]="time"/><output>{{time}}</output>
  `,
})
export class Example {
  time = null;
}

```

## Example: Disabled time

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimePicker],
  template: `
<mn-time-picker label="Unavailable time" disabled/>
  `,
})
export class Example {

}

```
