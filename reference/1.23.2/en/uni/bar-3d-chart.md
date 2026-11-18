# 3D bar chart

Bars over an x × y category grid: lit boxes, per-series colors, stacking across series, colors from a color scale by height or by another value, legend and color bar.

Package: minerva-design@1.23.2

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Sales

Region

Month

North

South

East

West

Central

Monthly sales of five regions

Quarter

Q1

Q2

Q3

Q4

Market

Americas

Europe

Asia

Oceania

Hardware

Software

Services

Revenue

Quarterly revenue of three product lines in four markets, stacked

Women

Men

Age

{{from}}–{{to}}

{{from}}+

Census year

Population

{{value}} M

Population by age group and sex in four census years

Visits

Hour

Day

Website visits per hour of the week

Product

Laptops

Phones

Tablets

Watches

Audio

Margin

Revenue and margin of five products in four markets

In stock

Low stock

{{value}} units

Live updates

Aisle

Aisle {{id}}

Shelf level

Level {{n}}

Units

Units left in each warehouse bin by aisle and shelf level, updated live

{{total}} units in stock · low bins: {{low}} of {{bins}} · bins restocked: {{restocked}}.

Retention

Months since signup

M{{n}}

Signup month

Retention of monthly signup cohorts by months since signup

{{cohort}} cohort, month {{n}}: {{retention}} still active ({{users}} of {{total}} users).

Click a bar to read the retention of a cohort.

Engineering

Sales

Marketing

Operations

Support

Finance

Actual spend

Fiscal year

Variance to budget

Department

Quarterly spend and variance to budget of six departments in {{year}}

{{department}}, {{quarter}}: spent {{actual}} for a budget of {{budget}} ({{variance}}).

{{year}}: spent {{actual}} for a budget of {{budget}} ({{variance}}). Largest overrun: {{department}}, {{quarter}} ({{worst}}).

{{value}} kW

Inlet temperature

Dark theme

3D view

Floor plan

Rack

Row

Row {{id}}

Power draw

Server racks by row and position, with power draw as height and inlet temperature as color

Rack {{rack}}: {{power}}, inlet {{inlet}}, above the {{limit}} limit.

Rack {{rack}}: {{power}}, inlet {{inlet}}, within the {{limit}} limit.

Racks above {{limit}} at the inlet: {{hot}} of {{total}} ({{racks}}). Click a rack for its readings.

## Bar3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
