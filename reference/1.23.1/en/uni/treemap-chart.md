# Treemap

Nested rectangles whose areas are proportional to the values: shows at a glance what takes up the most room in a hierarchy (disk usage, budgets, portfolios). Hover or use the arrow keys to highlight a cell; the tooltip shows its path.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Media

Videos

Photos

Music

Applications

Projects

System

Library

Caches

Logs

Downloads

Installers

Archives

Disk usage by folder

{{path}}: {{size}} ({{share}} of the disk)

Click a cell to see where it lives

Engineering

Sales

Marketing

Customer success

Operations

Finance

People

Legal

Annual budget by department

Technology

Finance

Health care

Energy

Consumer

Market cap: {{value}}

Stock market map by sector, colored by the change of the day

{{share}} of the bundle

JavaScript bundle size by module

Total {{size}}; dependencies over 100 KB: {{modules}}.

Electronics

Home

Fashion

Sports

Phones

Laptops

Audio

Kitchen

Furniture

Decor

Women

Men

Kids

Outdoor

Fitness

Catalog path

All categories

Quarterly revenue by category, subcategory and brand

{{category}} revenue by subcategory and brand

{{path}}: {{revenue}}, {{share}} of the category.

Click a category to open it.

Click a brand to read its revenue.

Compute

Databases

Storage

Network

Observability

{{share}} of the bill

Monthly cloud costs by service and resource

Shown: {{visible}}, {{share}} of the {{total}} bill.

Monthly bill: {{total}}.

Show all

Live updates

{{used}} of {{limit}} ({{share}})

Memory used by the pods of the cluster, by namespace

Above {{threshold}} of their memory limit: {{pods}}

Every pod is below {{threshold}} of its memory limit.

Europe

Americas

Asia-Pacific

Metric

Revenue

Orders

Profit

{{share}} of the total ({{metric}})

Yearly sales by region and country: {{metric}}

## TreemapChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TreemapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "headers",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
