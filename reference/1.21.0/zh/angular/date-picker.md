# DatePicker 日期选择器

从弹出式周一始月历网格中选择日期，或直接输入 YYYY-MM-DD 格式日期。

Package: minerva-design@1.21.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按向下箭头可打开弹出日历并将焦点移至当前活动日期单元格；点击外部关闭日历。

方向键、Home / End 与 PageUp / PageDown（按住 Shift 为一年）在日历网格中移动焦点。

Enter 或 Space 选择当前聚焦的日期并关闭弹出层。

Escape 关闭弹出日历并把焦点还给输入框。

输入的文本在构成完整且在范围内的 YYYY-MM-DD 日期时会立即提交；失焦时会自动规范化 YYYY/M/D 等宽松格式。

## DatePicker

Support: beta

Native Angular: MnDatePicker. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "size",
    "typeText": "DatePickerSize",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "minDate",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "maxDate",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "change",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/date-picker/date-picker.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
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
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## CSS variables

```json
{
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Choose a date

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker],
  template: `
<mn-date-picker label="Meeting date" [(value)]="date"/><output>{{date || 'No date selected'}}</output>
  `,
})
export class Example {
  date = null;
}

```

## Example: Date range

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker],
  template: `
<mn-date-picker label="October booking" [(value)]="date" minDate="2026-10-10" maxDate="2026-10-20"/><output>{{date}}</output>
  `,
})
export class Example {
  date = "2026-10-15";
}

```

## Example: Form field

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker, MnFormControl, MnFormLabel, MnFormHelperText } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker, MnFormControl, MnFormLabel, MnFormHelperText],
  template: `
<mn-form-control required><mn-form-label>Birthday</mn-form-label><mn-date-picker [(value)]="date"/><mn-form-helper-text>Type YYYY-MM-DD or choose a day from the calendar.</mn-form-helper-text></mn-form-control>
  `,
})
export class Example {
  date = null;
}

```

## Example: Disabled and read-only dates

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDatePicker, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDatePicker, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-date-picker label="Read-only date" defaultValue="2026-10-15" readOnly/><mn-date-picker label="Disabled date" defaultValue="2026-10-15" disabled/></mn-stack>
  `,
})
export class Example {

}

```
