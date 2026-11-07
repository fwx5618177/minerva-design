# 3D surface chart

Surfaces z = f(x, y) over a regular grid: lighting, built-in color maps (viridis, plasma, terrain…), wireframe, contour lines projected on the floor and transparency. Drag to rotate, Ctrl / ⌘ + wheel to zoom.

Package: minerva-design@1.23.0

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

Saddle

Function

3D surface of the {{name}} function

x

y

z

Island

{{value}} km

{{value}} m

East

North

Elevation

Terrain of a 20 km wide island

Implied volatility

{{value}}%

Strike (% of spot)

Days to expiry

{{value}} d

Implied volatility surface by strike and expiry

Faces

Wireframe

Contours on the floor

Contours on the surface

Peaks surface with wireframe and contour lines

Bowl

Tilted plane

A transparent bowl crossed by a transparent tilted plane

Wave

Animate

Amplitude

Animated ripples spreading from the center

Plate

Reset

cm

Temperature

Temperature of a metal plate heated by point sources

Heat sources: {{sources}} · hottest point {{max}} · average {{mean}}. Click the plate to add or remove a source.

Government bond yield

Maturity

Month

Yield

Government bond yields by maturity over 24 months

{{maturity}} yield in {{date}}: {{yield}}.

Hover the surface to read a yield.

In {{date}} the curve is inverted (10 yr − 2 yr: {{spread}}).

In {{date}} the curve slopes upward (10 yr − 2 yr: {{spread}}).

Loss

({{x}}, {{y}})

Color scale

Viridis

Plasma

Magma

Cividis

Turbo

Weight 1

Weight 2

log₁₀(1 + loss)

Loss landscape of Himmelblau's function with four minima

From {{start}} (loss {{loss}}), gradient descent reaches minimum {{n}} at {{minimum}} in {{steps}} steps.

Click the surface to start a gradient descent there.

{{value}} dBm

Signal

Access points

Lobby

Open space

Meeting rooms

Kitchen

3D view

Top view

Meters

Wi-Fi signal strength over an office floor

{{good}} of the floor gets {{goodLevel}} or better (video calls), {{usable}} gets {{usableLevel}} or better.

Every access point is off: no coverage.

## Surface3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
